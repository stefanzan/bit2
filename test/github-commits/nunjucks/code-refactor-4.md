bit2: x
url : https://github.com/lyzadanger/lyza-dot-11ty/commit/1312d923c8fdcbb5c5b934b0aa5cc2234b20fecd
file: src/_includes/components/post-summary.njk
desc: add if statement
diff: 
-      <h3 class="font-display text-xl">{{ post.data.title }}</h3>
+      {% if post.data.title %}
+        <h3 class="font-display text-xl">{{ post.data.title }}</h3>
+      {% endif %}