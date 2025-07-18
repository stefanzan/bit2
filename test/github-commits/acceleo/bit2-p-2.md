bit2: p
url :https://github.com/gobertm/HyDRa/commit/9ced25c163c8d86960b4197e659c4ca305b7a5f8#diff-ff23d30da0c9ecab56a44e11cdd4a0d3d3e535eaf357a8a9517ee7933637d2fb 
file: be.unamur.polystore.acceleo/src/be/unamur/polystore/acceleo/main/impl/insert/relationshiptype/generateInsertMethodsImpl.mtl
desc: When inserting constant text, BIT2 can propgate to the right place in the template, satisfy PUTGET.
      real intention: insert an expression in between.
diff: 
-	[entityType.name.toUpperFirst()/] [entityType.name.toLowerFirst()/] = [rel.name.toLowerFirst()/].get[rolerel.name.toUpperFirst()/]();
+	[entityType.name.toUpperFirst()/] [rolerel.name.toLowerFirst()/]_[entityType.name.toLowerFirst()/] = [rel.name.toLowerFirst()/].get[rolerel.name.toUpperFirst()/]();
