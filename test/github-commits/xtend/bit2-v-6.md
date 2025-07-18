bit2: √
url : https://github.com/orcc/orcc/commit/e18c8d1a3fadd1b47b526fa7989696f040166a98
file: eclipse/plugins/net.sf.orcc.backends/src/net/sf/orcc/backends/promela/InstancePrinter.xtend
desc: insert constant text
diff: 

 	def getInstanceFileContent() '''
 		/*state need to be global in order to reach it from never claims*/
 		int «instance.simpleName»_state;
 
+ 		/* Process */
 		proctype «instance.simpleName»(«instance.actor.parameters.join(", ", [declare])») {
 