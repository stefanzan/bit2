bit2: v
url:
file: 
desc: delete several constant text
diff: 
  <div class="form-row">
    {{ form.username.errors }}
-    <label for="id_username" class="required">{{ form.username.label }}:</label> {{ form.username }}
+    {{ form.username.label }} {{ form.username }}
  </div>

