bit2: x
url : https://github.com/Startr/WEB-Sage.Education/commit/68a7a60dac47950626ba10e05a23da079b042f6c
file: src/_includes/layouts/blog.njk
desc: change if condition
diff: 
-  {%- if previousPost %}<li>Previous: <a href="{{ previousPost.url }}">{{ previousPost.data.title }}</a></li>
+	 {%- if previousPost and previousPost.data.title %}<li>Previous: <a href="{{ previousPost.url }}">{{ previousPost.data.title }}</a></li>