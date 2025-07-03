bit2: x
url : https://github.com/gtgspot/open_api_gen/commit/c2884b7b1a9c7b839cc32f52647fac89a5d5a31e
file: modules/openapi-generator/src/main/resources/go-server/controller-api.mustache
desc: add if statement
diff: 
- result, err := c.service.{{nickname}}(r.Context(){{#allParams}}, {{paramName}}Param{{/allParams}})Add commentMore actions
+	result, err := c.service.{{nickname}}(r.Context(){{#allParams}}, {{#isNullable}}{{#isBodyParam}}&{{/isBodyParam}}{{/isNullable}}{{paramName}}Param{{/allParams}})