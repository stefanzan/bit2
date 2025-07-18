bit2: p
url : https://github.com/akoita/acceleo/commit/740688d9fbe46b9d3d93e240cc1fd26da7e3d6d3
file: plugins/org.eclipse.acceleo.ide.ui/src-gen/org/eclipse/acceleo/internal/ide/ui/generators/acceleoModule.mtl
desc: add ' can be done in BIT2
diff: 
- ['['/]module [anAcceleoModule.name/]([anAcceleoModule.metamodelURIs->sep(', ')/])[']'/]
+ ['['/]module [anAcceleoModule.name/]([anAcceleoModule.metamodelURIs->collect(uri : String | '\'' + uri + '\'')->sep(', ')/])[']'/]
 