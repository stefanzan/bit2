bit2: x
url : https://github.com/IT-solutions-django/TechnoTrans/commit/367edc76c99aae723df76a280ca81d01bdf3e5f3
file: universal_containers/templates/universal_containers/container.html
desc: change attribute access expression
diff: 
-    {% for image in container.images.all %}
+    {% for image in container.universal_images.all %}