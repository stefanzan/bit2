bit2: x
url : https://github.com/tomcounsell/django-project-template/commit/2ddd2b395ef93a43d712cfc12b206cabe9e6989b#diff-690b81fad8df2a1f1ce37c846641d9247e3472d244f17039d2910a5ed0c98d5e
file: templates/base.html
desc: refactorign template expression to constant, insert constant
diff: 
-    <div class="md:col-span-{% block content_width %}8{% endblock %}">
+    <div class="md:col-span-8 md:col-span-9 md:col-span-10 md:col-span-12">