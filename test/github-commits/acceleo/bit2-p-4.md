bit2: p
url : https://github.com/elite-se/plantestic-team-4/commit/8ddbbdd6864a935351f3d0adf500608806efede6
file: core/src/main/resources/code-generation/generateCode.mtl
desc: Renaming class Name from Test to a concatennated name from an expression.
diff: 

- public class Test {
+ public class [ 'Test'.concat(testScenario.testScenarioName) /] {
