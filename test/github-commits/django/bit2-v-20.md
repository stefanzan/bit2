bit2: √
url : https://github.com/onur-CK/BookLand/commit/914fea9a47b17ae7bcd2e49163265bee3b059277#diff-c303b4648ec0a7db238e54b195cb055a3d77e0b9e123d9e6a4b86488d2ac5c4b
file: templates/allauth/includes/main_nav.html
desc: delete constant text
diff: 
-        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger wishlist-count">
-          {% if request.user.is_authenticated %} {{ wishlist_count|default:"0"
-          }} {% endif %}
+        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
+          {% if request.user.is_authenticated %}
+            {{ wishlist_count|default:"0" }}
+          {% else %}
+            0
+          {% endif %}
        </span>