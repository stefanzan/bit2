#!/bin/bash
APP_NAME="my-app"
NODE_VERSION="12.14.0"
NPM_VERSION="8.3.1"
PM2_VERSION="5.1.0"
YARN_VERSION="1.22.19"

# Project path
APP_DIR="../../../var/www"+$APP_NAME
LOG_DIR="../../../var/log"+$APP_NAME

nvm use $NPM_VERSION
echo "Updating npm and yarn..."
npm install -g npm@$NODE_VERSION
npm install -g yarn@$YARN_VERSION

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



