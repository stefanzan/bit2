bit2: √
url : https://github.com/opendaylight/yangtools/commit/54178ea70d5967b510900d37fcf960585f6b4234
file: binding/mdsal-binding-java-api-generator/src/main/java/org/opendaylight/yangtools/sal/java/api/generator/ClassTemplate.xtend
desc: replace context text
diff: 

-                        «generateStaticInicializationBlock»
+                        «generateStaticInitializationBlock»

-    def protected generateStaticInicializationBlock() '''
+    def protected generateStaticInitializationBlock() '''