bit2: p
url : https://github.com/RDEV-K/camel/commit/1d2d2b7f5ccbeb1777c31d65312bcaf83c384efb#diff-236f01c4a2de85898ebd8194d38cfc2ee5116d68ef7c9c3b44f942339e6fd67f
file: extensions/rest-openapi/deployment/src/main/resources/handlebars/Quarkus/modelEnum.mustache
desc: change expression
diff: 
-   {{^errorOnUnknownEnum}}return null;{{/errorOnUnknownEnum}}{{#errorOnUnknownEnum}}throw new IllegalArgumentException("Unexpected value '" + text + "' for '{{{classname}}}' enum.");{{/errorOnUnknownEnum}}
+   {{^errorOnUnknownEnum}}return null;{{/errorOnUnknownEnum}}{{#errorOnUnknownEnum}}throw new IllegalArgumentException("Unexpected value '" + input + "' for '{{{classname}}}' enum.");{{/errorOnUnknownEnum}}