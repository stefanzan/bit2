bit2: x
url : https://github.com/Backbase/backbase-openapi-tools/commit/be1e48fb03a9d9056b35d5a480d33e6835d0ef85#diff-cd85a4ea7f6aa6aab8b4a9ecc1d0eb55cf662416e95c581231942f4d11b9372a
file: boat-scaffold/src/main/templates/boat-java/libraries/native/generatedAnnotation.mustache
desc: add if statement.
diff: 
- @javax.annotation.processing.Generated(value = "{{generatorClass}}"{{^hideGenerationTimestamp}}, date = "{{generatedDate}}"{{/hideGenerationTimestamp}})
+ @{{^useJakartaEe}}javax{{/useJakartaEe}}{{#useJakartaEe}}jakarta{{/useJakartaEe}}.annotation.Generated(value = "{{generatorClass}}"{{^hideGenerationTimestamp}}, date = "{{generatedDate}}"