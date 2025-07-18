bit2: x
url : https://github.com/sculptor/sculptor/commit/91e3f9037abda38a436033312f3926b0f00026a3
file: sculptor-generator/src/main/java/org/sculptor/generator/template/common/ExceptionTmpl.xtend
desc: change if condition
diff: 

	def String throwsDecl(Operation it) {
 		'''
- 			«IF !it.getThrows()?.isEmpty»throws «FOR exc : it.exceptions SEPARATOR ", "»«exc»«ENDFOR»«ENDIF»
+ 			«IF !(it.getThrows() != null && it.getThrows().isEmpty)»throws «FOR exc : it.exceptions SEPARATOR ", "»«exc»«ENDFOR»«ENDIF»
 		'''
 	}