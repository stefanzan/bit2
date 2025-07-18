bit2: x
url : https://github.com/ftoral/EclipseUMLGenerators/commit/c19135e6ef460ef407bc45d36c9b1e2c6249e1c7
file: org.eclipse.umlgen.gen.c/plugins/org.eclipse.umlgen.gen.c/src/org/eclipse/umlgen/gen/c/files/common.mtl
desc: change if condition expression, not direct manipuation of the output.
diff: 

- if (not getProperty('UNITTEST').oclIsUndefined()) 
+ if (getProperty('UNITTEST') = 'true') 