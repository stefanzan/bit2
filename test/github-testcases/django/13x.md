bit2: x
url :
file: 
desc: change attribute access expression
diff: 
  <div class="form-row">
    {{ form.username.errors }}
-    {{ form.username.label }} {{ form.username }}
+    {{ form.username.label_tag }} {{ form.username }}
  </div>

