bit2: p
url : https://github.com/afs202005277/TACS/commit/dc3a6c501acfb0beab3b8f1fbeaa1f1dfbce0d21
desc: If inserting "UNIQUE" at the output, BIT2 can propagate back to template as text, not if statement. But it satisfies PUTGET property.
      The intended template updates is an if statement.
diff:
 [template private gen(col: Column)]
- [col.name/] [col.type.transform()/] [if not col.isNullable]NOT NULL[/if]
+ [col.name/] [col.type.transform()/] [if not col.isNullable]NOT NULL[/if][if col.isUnique]UNIQUE[/if]  -- Note: partial
 [/template]

Comment: add an if statement, bit2 x.
 
 [template private genCols(aTable : Table)]
 [for (column: Column | aTable.columns) separator (',\n')]
 	[column.gen()/][/for]
 [/template]
 
 [template private genPrimary(aTable : Table)]
- 	PRIMARY KEY([for (pk: PrimaryKey | aTable.primaryKeys) separator (', ')][pk.column.name/][/for])
+ 	PRIMARY KEY([for (pk: Column | aTable.primaryKey.columns) separator (', ')][pk.name/][/for])
 [/template]

Comment: change attribute access from aTable.primaryKey to aTable.primaryKey.columns, bit2 x.
 
 [template private genForeign(aTable : Table)]
 [for (fk: ForeignKey | aTable.foreignKeys)  separator (',\n')]
 	FOREIGN KEY([fk.sourceColumn.name/]) REFERENCES [fk.targetTable.name/]([fk.targetColumn.name/])[/for]
 [/template]
 
 
 
 [template public generateElement(aTable : Table)]
 [comment @main/]
 [file (aTable.name + '.sql', false, 'UTF-8')]
 CREATE TABLE [aTable.name/](
 [aTable.genCols()/],
 [aTable.genPrimary()/][if (aTable.foreignKeys->size() > 0)],
 [aTable.genForeign()/][/if]
 
 );
 [/file]
 [/template]