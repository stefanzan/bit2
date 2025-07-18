bit2: √
url : https://github.com/fraunhofer-iem/mechatronicuml-codegen-c/commit/e7b6565ae4f761a73b463fe4d46710deb473a743
file: org.muml.codegen.c/src/org/muml/codegen/c/actionlanguage/expression_queries.mtl
desc: replace constant text in import statement.
diff: 

[module expression_queries('http://www.fujaba.de/muml/connector/0.4.0', 'http://www.fujaba.de/muml/behavior/0.4.0',
 				'http://www.storydriven.org/core/0.3.1',
 				'http://www.fujaba.de/muml/actionlanguage/0.4.0',
 				'http://www.fujaba.de/muml/msgtype/0.4.0',
 				'http://www.fujaba.de/muml/types/0.4.0',
 				'http://www.fujaba.de/modelinstance/0.4.0',
 				'http://www.fujaba.de/muml/component/0.4.0',
 				'http://www.fujaba.de/muml/instance/0.4.0',
 				'http://www.fujaba.de/muml/realtimestatechart/0.4.0')/]
 
- [import org::muml::codegen::ca::queries::stringQueries]
+ [import org::muml::codegen::c::queries::stringQueries]
 [**
  * Returns the operator of a comparing operator
  * @param comparingOperator the comparing operator
 */]
 [query public getComparingOperator(comparingOperator : ComparingOperator) : String =
 	if comparingOperator = ComparingOperator::LESS then
 		'<'
 	else if comparingOperator = ComparingOperator::LESS_OR_EQUAL then
 		'<='
 	else if comparingOperator = ComparingOperator::GREATER then
 		'>'
 	else if comparingOperator = ComparingOperator::GREATER_OR_EQUAL then
 		'>='
 	else if comparingOperator = ComparingOperator::EQUAL then
 		'=='
 	else if comparingOperator = ComparingOperator::UNEQUAL then
 		'!='
 	else '/*UNSUPPORTED COMPARING OPERATOR*/'
 	endif
 	endif
 	endif
 	endif
 	endif
 	endif
 /]
 
 [**
  * Returns a corresponding modelica logic operator
  * @param logicOperator the logic operator
 */]
 [query public getLogicOperator(logicOperator : LogicOperator) : String =
 	if logicOperator = LogicOperator::AND then
 		'&&'
 	else if logicOperator = LogicOperator::OR then
 		'||'
 	else
 		'unsupported op'
 	endif
 	endif
 /]
 
 [**
  * Returns a corresponding modelica arithmetic operator
  * @param arithmeticOperator the arithmetic operator
 */]
 [query public getArithmeticOperator(arithmeticOperator : ArithmeticOperator) : String =
 	if arithmeticOperator = ArithmeticOperator::PLUS then
 		'+'
 	else if arithmeticOperator = ArithmeticOperator::MINUS then
 		'-'
 	else if arithmeticOperator = ArithmeticOperator::TIMES then
 		'*'
 	else if arithmeticOperator = ArithmeticOperator::DIVIDE then
 		'/'
 	else
 		'unsupported'
 	endif
 	endif
 	endif
 	endif
 /]
 
 [**
  * Returns a corresponding modelica unary operator
  * @param unaryOperator the unary operator
 */]
 [query public getUnaryOperator(unaryOperator : UnaryOperator) : String =
 	if unaryOperator = UnaryOperator::MINUS then
 		'-'
 	else if unaryOperator = UnaryOperator::INCREMENT then
 		'++'
 	else if unaryOperator = UnaryOperator::DECREMENT then
 		'--'
 	else if unaryOperator = UnaryOperator::NOT then
 		'!'
 	else
 		'unsupported'
 	endif
 	endif
 	endif
 	endif
 /]
 
 
 [**
  * Returns a corresponding C unary operator
  * @param unaryOperator the unary operator
 */]
 [query public getIncrementDecremetOperator(incdecOp : IncrementDecrementOperator) : String =
 	if incdecOp = IncrementDecrementOperator::INCREMENT then
 		'++'
 	else if incdecOp = IncrementDecrementOperator::DECREMENT then
 		'--'
 	else
 		'unsupported'
 	endif
 	endif
 /]
 
 [**
  * Returns the rtsc which contains the trigger message expression's
  * transition (that is the transition which contains the expression).
  * @param expression the trigger message expression 
 */]
 [query private getStatechart(expression : TriggerMessageExpression) : RealtimeStatechart =
 	expression.oclAsType(ecore::EObject)->asSet()->closure(e : ecore::EObject |
 		if not e.oclIsKindOf(Transition) then
 			e.eContainer()
 		else
 			e
 		endif
 	)->any(oclIsKindOf(Transition)).oclAsType(Transition).statechart
 /]
 
 [**
  * Returns the fully qualified name of the trigger message expression's parameter
  * variable. The variable is located in the port statechart.
  * @param expression the trigger message expression
 */]
 [query public getTriggerMessageEventParameterVariableFullyQualifiedName(expression : TriggerMessageExpression) : String =
 	'msg->'+expression.parameter.getProtoBuffVariableName()
 /]