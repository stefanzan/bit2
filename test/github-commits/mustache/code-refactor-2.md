bit2: x
url: https://github.com/konpyutaika/nigoapi/commit/c5f89d80c7004db083ab54541048ff2a33c65ebf#diff-900bad2d0f810b1bef6a382082a87ca87d40a77e0bb63279567733456f4e9580
file: resources/client_gen/swagger_templates/api.mustache
desc: add if statement
diff: 
-    if localVarHttpResponse.StatusCode == {{{code}}} {
+		if localVarHttpResponse.StatusCode == {{^isWildcard}}{{code}}{{/isWildcard}}{{#isWildcard}}200{{/isWildcard}} {