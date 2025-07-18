bit2: x
url : https://github.com/YounesB-McGill/modeling-assistant/commit/303d937140c2f42aac6d12d1497985119f704a65
file: modelingassistant.dsl.transformation/src/org/eclipse/acceleo/module/sample/main/generate.mtl
desc: change replaceAll's regular expression, but it is not output direct manipulation.
diff: 
  [let lhs : String = 'public static final MistakeType ' +
-    mT.name.replaceAll('\\s+', '_').replaceAll('\\((.+?)\\)', '').replaceAll('_+', '_').toUpper()
+    mT.name.replaceAll('/', '_').replaceAll('\\s+', '_').replaceAll('\\((.+?)\\)', '').replaceAll('_+', '_').toUpper()
  ]