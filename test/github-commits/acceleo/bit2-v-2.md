bit2: √
url : https://github.com/gobertm/HyDRa/commit/9ced25c163c8d86960b4197e659c4ca305b7a5f8
file: be.unamur.polystore.acceleo/src/be/unamur/polystore/acceleo/main/impl/insert/entitytype/generateSimpleInsertMethodsImpl.mtl
desc: delete comment text.
diff: 
 [if (struct.oclIsTypeOf(pml::Collection))]
- [comment]//Docdb ref support. Code written by copy pasting adapting above. Late writing. [/comment]
+ [comment]//Docdb ref support.  [/comment]
 // In insertRefStruct in MongoDB
 Bson filter = new Document();
 Bson updateOp;