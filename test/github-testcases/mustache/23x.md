bit2: x
url : https://github.com/Adyen/adyen-go-api-library/commit/8518cc9068b31de6d1f2a43f0042ea78f2502725
file: templates/custom/model_simple.mustache
memo: add if statement
diff: 
- {{name}} {{^required}}{{^isNullable}}{{^isArray}}{{^isFreeFormObject}}*{{/isFreeFormObject}}{{/isArray}}{{/isNullable}}{{/required}}{{#isNullable}}common.{{/isNullable}}{{{dataType}}} `json:"{{baseName}}{{^required}},omitempty{{/required}}"{{#withXml}} xml:"{{baseName}}{{#isXmlAttribute}},attr{{/isXmlAttribute}}"{{/withXml}}{{#vendorExtensions.x-go-custom-tag}} {{{.}}}{{/vendorExtensions.x-go-custom-tag}}`
+	{{name}} {{^required}}{{^isNullable}}{{^isArray}}{{^isFreeFormObject}}*{{/isFreeFormObject}}{{/isArray}}{{/isNullable}}{{/required}}{{#isNullable}}{{#isPrimitiveType}}common.{{/isPrimitiveType}}{{/isNullable}}{{{dataType}}} `json:"{{baseName}}{{^required}},omitempty{{/required}}"{{#withXml}} xml:"{{baseName}}{{#isXmlAttribute}},attr{{/isXmlAttribute}}"{{/withXml}}{{#vendorExtensions.x-go-custom-tag}} {{{.}}}{{/vendorExtensions.x-go-custom-tag}}`