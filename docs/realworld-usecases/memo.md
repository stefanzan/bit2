1. Generated code from template usually not well formatted, it is tedious to format template according to code. But in template, it is not so straight-forward to identity the indentation and aligment.
  - real example: https://github.com/Asana/python-asana/commit/d8bdaf0f7af2b2fb5c577ccd0bb23b34638b44c6

  Note, this can be done by Bit, right ?
  If using code-formatting tools, will it be correctly reflected back ?

2. README.mustache has iterations

For example, in [common_README.mustache](https://github.com/opsgenie/opsgenie-python-sdk/blob/0d20d2314522fc0fd8ca5f0faa16f7c96387e123/templates/common_README.mustache), there are lots of api endpoints and more than one documentation for models. 
The generated output is shown at [README.md](https://github.com/opsgenie/opsgenie-python-sdk/blob/0d20d2314522fc0fd8ca5f0faa16f7c96387e123/README.md).

```markdown
## Documentation for API Endpoints

All URIs are relative to *{{basePath}}*

Class | Method | HTTP request | Description
------------ | ------------- | ------------- | -------------
{{#apiInfo}}{{#apis}}{{#operations}}{{#operation}}*{{classname}}* | [**{{operationId}}**]({{apiDocPath}}{{classname}}.md#{{operationIdLowerCase}}) | **{{httpMethod}}** {{path}} | {{#summary}}{{summary}}{{/summary}}
{{/operation}}{{/operations}}{{/apis}}{{/apiInfo}}

## Documentation For Models

{{#models}}{{#model}} - [{{{classname}}}]({{modelDocPath}}{{{classname}}}.md)
{{/model}}{{/models}}
```

Another example of loops: https://github.com/damoeb/feedless/blob/52d57ee229026a5ffa6432e753bbe94328a7149b/README.mustache.md?plain=1#L4

