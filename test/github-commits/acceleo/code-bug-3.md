bit2: x
url : https://github.com/afs202005277/TACS/commit/dc3a6c501acfb0beab3b8f1fbeaa1f1dfbce0d21
desc: it is code bug, not direct manipulation of output.
diff:
 [template private genPrimary(aTable : Table)]
- 	PRIMARY KEY([for (pk: PrimaryKey | aTable.primaryKeys) separator (', ')][pk.column.name/][/for])
+ 	PRIMARY KEY([for (pk: Column | aTable.primaryKey.columns) separator (', ')][pk.name/][/for])
 [/template]

Comment: change attribute access from aTable.primaryKey to aTable.primaryKey.columns, bit2 x.
 
