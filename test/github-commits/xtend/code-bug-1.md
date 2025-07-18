bit2: x
url:  https://github.com/sculptor/sculptor/commit/f8bc2c818726a3c991a632c2441b34362e342be0
file: sculptor-generator/sculptor-generator-core/src/main/java/org/sculptor/generator/template/rest/ResourceTmpl.xtend
desc: fix code bug by removing one space
diff: 
-		«val getOperation = resource.operations .findFirst(e | e.httpMethod == HttpMethod::GET && e.domainObjectType != null && e.domainObjectType == firstParam.domainObjectType && e.type == null && e.collectionType == null)»
+		«val getOperation = resource.operations.findFirst(e | e.httpMethod == HttpMethod::GET && e.domainObjectType != null && e.domainObjectType == firstParam.domainObjectType && e.type == null && e.collectionType == null)»