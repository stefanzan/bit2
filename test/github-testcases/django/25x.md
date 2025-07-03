bit2: x
url : https://github.com/S73FF3N/buzzinga-website/commit/12f519b1efcfe746cd1218b4c74f9689c494cd2b
file: gameFiles/templates/index.html
desc: refactoring constant text to expression
diff: 
-        <li class="nav-item"><a class="nav-link" href="#">Home</a></li>
+        <li class="nav-item"><a class="nav-link" href="{% url 'home' %}">Home</a></li>