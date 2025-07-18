bit2: √
url : https://github.com/gtgspot/open_api_gen/commit/c4a6c4a542f413a3227badda31e57008103e7bab
file: modules/openapi-generator/src/main/resources/crystal/api.mustache
desc: add constant text
diff: 
  if @api_client.config.client_side_validation && {{^required}}!{{{paramName}}}.nil? && {{/required}}{{{paramName}}}.to_s.size < {{{minLength}}}
-   raise ArgumentError.new("invalid value for \"{{{paramName}}}\" when calling {{classname}}.{{operationId}}, the character length must be great than or equal to {{{minLength}}}.")
+   raise ArgumentError.new("invalid value for \"{{{paramName}}}\" when calling {{classname}}.{{operationId}}, the character length must be greater than or equal to {{{minLength}}}.")
 end