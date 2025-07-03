bit2: √
url : https://github.com/orcc/orcc/commit/e18c8d1a3fadd1b47b526fa7989696f040166a98
file: eclipse/plugins/net.sf.orcc.backends/src/net/sf/orcc/backends/promela/InstancePrinter.xtend
desc: change return value of if statement.
diff: 
		if(needToWriteFile(content, file)) {
 			printFile(content, file)
- 			return false
+ 			return 0
 		} else {
- 			return true
+ 			return 1
 		}
 	}