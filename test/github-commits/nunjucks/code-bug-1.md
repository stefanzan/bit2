bit2: x
url : https://github.com/williamzujkowski/williamzujkowski.github.io/commit/aed053c8bc1b318526b80e6e5d7d1ee136d55099
file: src/blog.njk
desc: a code bug in if condition
diff: 
   {% if page.url=""="pageUrl"%}aria-current="page"{% endif %}
   {% if page.url == pageUrl %}aria-current="page"{% endif %}