bit2: x
url : https://github.com/Kibibit/achievibit/commit/254be43f437f100c239ecfb9bdba2b0624acd193
file: views/blog.nunjucks
desc: change if condition
diff: 
-  {% if !user.organization and (!achievements or achievements.length === 0) %}
+  {% if (not user.organization) and ((not achievements) or achievements.length === 0) %}