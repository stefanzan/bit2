bit2: √
url : https://github.com/saiteja032/My-maven/commit/8b652a8b3e433414ea7d5db65cd9f4f4ff91a0dd#diff-68d7287bad68950be910f40d1dfc63303f1d3c10533dd0b0de8d3b71566ef30a
file: src/mdo/model-v3.vm
desc: format code
diff: 
-    public ${class.name}()
-    {
-        this( ${packageModelV4}.${class.name}.newInstance() );
+    public ${class.name}() {
+        this(${packageModelV4}.${class.name}.newInstance());
    }