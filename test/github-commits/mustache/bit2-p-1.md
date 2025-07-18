bit2: p
url : https://github.com/Pixuin/openapi-dto/commit/1ad171fbbc6e2180472413d459a5947f2e49dadb
file: templates/dto.mustache
desc: change expression
diff: 
-    public function get{{name|capitalize}}(): {{type}}
+    public function get{{name|ucfirst}}(): {{type}}