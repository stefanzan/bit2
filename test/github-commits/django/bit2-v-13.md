bit2: √ 
url : https://github.com/Kau4dev/wsBackend-Fabrica25.1/commit/85de2ff4d7f895d5822e0ecf2348e426e744ab7a
file: CineMark/users/templates/users/login.html
desc: add newline
diff: 
{% extends "base.html" %} {% block content %}
+
<form method="POST">
  {% csrf_token %} {{ form.as_p }}
  <button type="submit">Login</button>
</form>
+
{% endblock %}