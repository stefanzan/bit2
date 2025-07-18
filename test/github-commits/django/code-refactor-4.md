bit2: x
url : https://github.com/RamiSwa/AIFarming/commit/694607a176bb99077b1f7ad99fd43ee69f9d7d98
file: pages/templates/pages/blog_list.html
desc: refactoring function call to attribute access expression
diff: 
-      <img src="{{ post.get_image_url() }}" class="card-img-top" alt="{{ post.title }}">
-   {% else %}
-      <img src="/static/images/default-blog.jpg" class="card-img-top" alt="Default Blog Image">
-   {% endif %}
+       <img src="{{ post.get_image_url }}" class="card-img-top" alt="{{ post.title }}">
+   {% else %}
+       <img src="/static/images/default-blog.jpg" class="card-img-top" alt="Default Blog Image">
+   {% endif %}            