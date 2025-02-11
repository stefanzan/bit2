#!/bin/bash
APP_NAME="my-app"
APP_ENV=${1:-"production"} 
if [ "$APP_ENV" = "production" ]; then
  DB_HOST="192.168.1.10"           
  DB_PORT="5432"
  API_URL="http://192.168.1.20"   
  CACHE_SERVER="192.168.1.30"     
elif [ "$APP_ENV" = "test" ]; then
  DB_HOST="192.168.1.11"          
  DB_PORT="5432"                  
  API_URL="http://192.168.1.21"   
  CACHE_SERVER="192.168.1.31"     
elif [ "$APP_ENV" = "dev" ]; then
  DB_HOST="192.168.1.10"            
  DB_PORT="5432"
  API_URL="http://127.0.0.1:3000"
  CACHE_SERVER="127.0.0.1"      
fi

export DB_CONNECTION_STRING="postgresql://user:password@$DB_HOST:$DB_PORT/my_database"
export API_URL="$API_URL"
export CACHE_SERVER="$CACHE_SERVER"
export PORT=3000

# Project path
APP_DIR="/var/www"+$APP_NAME
LOG_DIR="/var/log"+$APP_NAME

# Create directory structure
echo "Creating directory structure..."
mkdir -p $APP_DIR
mkdir -p $LOG_DIR

# Clone code and install dependencies
echo "Cloning code and installing dependencies..."
cd $APP_DIR
git clone https://github.com/example/my-app.git .
git checkout main
git pull origin main

echo "Installing dependencies and building the project..."
yarn install
yarn build

# Start the application
echo "Starting the application..."
pm2 delete $APP_NAME || true
pm2 start dist/app.js --name "$APP_NAME" --log $LOG_DIR/output.log --error $LOG_DIR/error.log

# Configure Nginx
echo "Configuring Nginx..."
cat > /etc/nginx/sites-available/$APP_NAME <<EOL
server {
    listen 80;
    server_name example.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }

    error_log $LOG_DIR/nginx_error.log;
    access_log $LOG_DIR/nginx_access.log;
}
EOL

ln -s /etc/nginx/sites-available/$APP_NAME /etc/nginx/sites-enabled/

nginx -t && systemctl reload nginx

# Set up monitoring and alerting rules
echo "Setting up monitoring and alerting rules..."
PROMETHEUS_CONFIG="/etc/prometheus/prometheus.yml"
PAGERDUTY_SERVICE_KEY="your_pagerduty_key"

cat >> $PROMETHEUS_CONFIG <<EOL
groups:
  - name: alert.rules
    rules:
    - alert: HighCpuUsage
      expr: node_cpu_seconds_total > 80
      for: 5m
      labels:
        severity: warning
      annotations:
        summary: "High CPU usage"
        description: "CPU usage exceeds 80% for 5 minutes"
EOL

systemctl restart prometheus

echo "Configuring PagerDuty..."
curl -X POST -H 'Content-Type: application/json' \
-d '{
      "service_key": "'$PAGERDUTY_SERVICE_KEY'",
      "event_type": "trigger",
      "description": "Deployment completed alert test",
      "client": "'$APP_NAME'",
      "client_url": "https://example.com"
    }' \
https://events.pagerduty.com/generic/2010-04-15/create_event.json

# Deployment complete
echo "Deployment complete! Visit https://example.com to check the service status."
