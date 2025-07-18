bit2: x
url : https://github.com/ch4og/ch4.fun/commit/b117fa9ad123cd06ae53ba555055583615c2efd7#diff-c16994b7e60bb8a924692e9c7a475371a13cc2a908935e4dfb5319ebc1c6dd19
file: views/home.njk
desc: change if condition
diff: 
-      {% if gitHash -%}
+      {% if utils.gitHash -%}