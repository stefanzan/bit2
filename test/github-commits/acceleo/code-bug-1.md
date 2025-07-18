bit2: x
url : https://github.com/adisandro/MMINT/commit/20ecbb4103867c3f2e718481e7be93e618415d5d
desc: code bug, even cannot run to generate text output.
diff:

[comment encoding = UTF-8 /]
 [module UMLToLeanAcceleo('http://www.eclipse.org/uml2/5.0.0/UML')/]
 
 [query private sanitize(name : String, regexp : String) : String =
   name.replaceAll(regexp, '_')
 /]
 
 [query private portName(port : Port, regexp : String) : String =
   sanitize(port.name, regexp) + '_' + sanitize(port.eContainer(PackageableElement).name, regexp)
 /]
 
 
 [template private encodeMain(modelName : String)]
 [/template]
 
 [template private encodeModel(umlRoot : Model, modelName : String, sanitizeRegexp : String)]
 import architecture3
 
 @['['/]derive ['['/]fintype, decidable_eq[']'/][']'/]
 inductive PORTS
   [for (port : Port | Port.allInstances())]
 | [portName(port, sanitizeRegexp)/]
   [/for]
 open PORTS
 
   [for (class : Class | umlRoot.packagedElement->selectByType(Class))]
     [let ports : OrderedSet(Port) = class.ownedAttribute->selectByType(Port)]
 @['['/]reducible[']'/]
 def [sanitize(class.name, sanitizeRegexp)/] : Component PORTS := {
   ports := {
     val := ['['/]
     [for (port : Port | ports)]
       [portName(port, sanitizeRegexp)/][if (i <> ports->size())],[/if]
     [/for]
     [']'/],
     nodup := by {dec_trivial}
   }
 }
 
     [/let]
   [/for]
 
   [for (class : Class | umlRoot.packagedElement->selectByType(Class))]
     [let properties : OrderedSet(Property) = class.ownedAttribute->selectByType(Property)]
     [if (properties->size() > 0)]
 def [sanitize(class.name, sanitizeRegexp)/]_ARCH_MODEL : Architecture [sanitize(class.name, sanitizeRegexp)/] := {
   subs := ['['/]
       [for (property : Property | properties)]
     [sanitize(property.type.name, sanitizeRegexp)/][if (i <> properties->size())],[/if]
       [/for]
   [']'/],
   no_dup := by {simp, dec_trivial},
-   size := by_dec_trivial,
+   size := by dec_trivial,
   vars := by {intros U H, simp at *, repeat {my_arch_tac}}
 }
     [/if]
     [/let]
   [/for]
 [/template]
 
 [template public UMLToLean(umlRoot : Model, modelName : String, sanitizeRegexp : String)]
   [comment @main /]
   [file ('main.lean', false, 'UTF-8')]
 [encodeMain(sanitize(modelName, sanitizeRegexp))/]
   [/file]
   [file (modelName + '.lean', false, 'UTF-8')]
 [encodeModel(umlRoot, sanitize(modelName, sanitizeRegexp), sanitizeRegexp)/]
   [/file]
 [/template]