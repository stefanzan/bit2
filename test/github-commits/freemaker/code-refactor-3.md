bit2: x
url: https://github.com/NERC-CEH/catalogue/commit/f4e841832205faae37cf0b08e39da3fcd3168bf4#diff-893abbb4d7b304bd7a813819b5d3cf1574b0d76796347250f951daca91809996
file: templates/html/skeleton.html.tpl
diff: add if statement

- <html>
+ <html <#if catalogue?has_content>data-catalogue=${catalogue.id}</#if>>
