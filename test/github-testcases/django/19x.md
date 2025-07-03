bit2: x
url: https://github.com/VovkOL/team-up/commit/0adf3963a077064323a8c419747d69144381806d
file: templates/includes/navigation.html
desc: refactoring text to function call, expression.
diff: 
-    href="/events" rel="tooltip" title="Designed and Coded by Creative Tim" data-placement="bottom">
+    href="{% url 'events:index' %}" rel="tooltip" title="Designed and Coded by Creative Tim" data-placement="bottom">