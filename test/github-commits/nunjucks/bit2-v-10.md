bit2: √
url : https://github.com/raml2html/raml2html/commit/7dbde0ab2ec8d28feac0492d759d8fb1e17db49e#diff-a37318f69d89ee630ea0c44700845d3a76c85a679f58d23cb9e78d34f6afbadd
file: lib/item.nunjucks
desc: formatting code
diff: 
-  {% markdown %}{{ item.description }}{% endmarkdown %}
+ {% markdown %}
+ {{ item.description }}
+ {% endmarkdown %}