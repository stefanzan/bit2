bit2: p
url : https://github.com/moekakiryu/personal-site/commit/de5703cebdbc750bf279c93c80a5bebb2f12ff94
file: apps/root/templates/root/base.html
desc: direct manipulation of output will change display_name's value, satisfy PUTGET.
diff: 
-  <title>{% block head.title %} {{ meta.current.display_name|default:"Page" }} {% endblock head.title %} | Raymond Lewandowski</title>
+  <title>{% block head.title %} {{ meta.current.name|default:"Page" }} {% endblock head.title %} | Raymond Lewandowski</title>