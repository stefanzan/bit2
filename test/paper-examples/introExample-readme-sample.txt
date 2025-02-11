{{var projectName="opsgenie-sdk"}}
{{var version="2.0.0"}}
......
- API version: {{version}}
...... 
{{version="2.0.0"}}
......
```sh
pip install {{projectName}}=={{version}}
```
......
{{var endpoints=[
  ......,
{classname:"AlertApi", operationId:"add_attachment", operationIdLowerCase:"add_attachment", httpMethod:"POST", path:"/v2/alerts/{identifier}/attachments", summary:"Add Alert Attachment"},
......
]}}
## Documentation for API Endpoints
All URIs are relative to *{{basePath}}*
{{basePath="https://github.com/opsgenie/opsgenie-python-sdk/blob/master/docs"}}
Class | Method | HTTP request | Description
------------ | ------------- | ------------- | -------------
{{#endpoints}}
*{{endpoint.classname}}* | [**{{endpoint.operationId}}**]({{basePath}}/{{endpoint.classname}}.md#{{endpoint.operationIdLowerCase}}) | **{{endpoint.httpMethod}}** {{endpoint.path}} | {{endpoint.summary}}{{/endpoints}}



