bit2: x
url : https://github.com/idsm-src/server/commit/bbd151c58fb0015ea9834028e1ae5cf389a0ee36
file: service/src/main/webapp/templates/page/base/Class.vm
desc: change expression in if condition
diff: 
-  #if($velocityCount > 1)<br/>#end
+  #if($foreach.count > 1)<br/>#end