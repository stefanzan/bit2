bit2: x
url : https://github.com/part4234/mdd-github-action/commit/b1770977dda74e62d491ac991566bcb4f71d33ed
file: uk.ac.kcl.inf.mdd.project.githubaction.xtext/uk.ac.kcl.inf.mdd.project.githubaction.xtext/src/uk/ac/kcl/inf/mdd/project/generator/GithubactionGenerator.xtend
desc: refactoring of code by changing function name
diff: 

-		«program.workflows.map[generateWorkFlowStmt(new Environment)].join('\n')»
 		
 	
+ 		«program.workflows.map[generateWorkflow(new Environment)].join('\n')»