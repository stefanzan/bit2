bit2: x
url : https://github.com/zakaria68K/ecore/commit/b981ae02f6d7f6d80f7b22116b2bf7c29205a46f
desc: this is kind of big change.
diff:

[comment encoding = UTF-8 /]
 [module main2('http://ezdevops2.com')/]
 
 [template public main2(dockerfile : Dockerfile)]
- 	
- 	[comment @main /]
- 	
- 	
+   [comment @main/]
+
+   [file ('src/DockerFile', false, 'UTF-8')]
+       [for (instruction : Instruction | dockerfile.instruction)]
+           [if (instruction.oclIsTypeOf(dockermetamodel::From))]
+               FROM [(instruction.oclAsType(dockermetamodel::From)).argument.value/]
+           [/if]
+       [/for]
+   [/file]
 [/template]