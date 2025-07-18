# Acceleo Benchmark
The Acceleo benchmark consists of the examples in the official [Acceleo tutorial](https://wiki.eclipse.org/Acceleo/Getting_Started). The benchmark contains 2 Acceleo templates. We list these templates as follows.

## Template 1
The Acceleo template (25 lines of code) is as follows. The BIT implementation can be found at `src/edu/ustb/sei/bit/test/temp/Acceleo.bit`, consisting of 28 lines of code.

```mtl
 [comment encoding = UTF-8 /]
 [module generate('http://www.eclipse.org/uml2/5.0.0/UML')/]
 
 [template public generateElement(aClass : Class)] 
  [comment @main /]
 [file (aClass.name.concat('.java'), false)]
   public class [aClass.name.toUpperFirst()/] {
   [for (p: Property | aClass.attribute) separator('\n')]
     private [p.type.name/] [p.name/];
   [/for]
 
   [for (p: Property | aClass.attribute) separator('\n')]
     public [p.type.name/] get[p.name.toUpperFirst()/]() {
       return this.[p.name/];
     }
   [/for]
 
   [for (o: Operation | aClass.ownedOperation) separator('\n')]
     public [o.type.name/] [o.name/]() {
       // TODO should be implemented
     }
   [/for]
   }
 [/file]
 [/template]
```

This template is a comprehensive example in the Acceleo tutorial.

## Template 2
The Acceleo template (44 lines of code) is as follows. The BIT implementation can be found at `src/edu/ustb/sei/bit/test/temp/Acceleo.bit`, consisting of 38 lines of code.

```mtl
[comment encoding =UTF-8]
[module generate('http://www.eclipse.org/uml2/5.0.0/UML')]

[template public generateElement(aclass :class)]
[comment @main/]
[file(aclass.classFileName(),false,'UTF-8')]
package [aclass.containingPackages().name->sep('.')/];

//[protected('imports')]
//[/protected]

public class [aclass.name.toUpperFirst()/]{
  [for(p:Property|aclass.attribute) separator('\n')]
  private [p.type.name/] [p.name/];
  [/for]

  [for(p:Property : aclass.attribute) separator('\n')]
  public [p.type.name/] get[p.name.toUpperFirst()/](){
    return this.[p.name/];
  }
  [/for]

  [for(o:Operation : aClass.ownedOperation) separator('\n')]
  public [o.type.name/] [o.name/](){
    //[protected(o.name)]
    // TODO should be implemented
    // [/protected]
  }
  [/for]
}
[/file]
[/template]

[query public classFileName(aClass :Class):string =
  aClass.qualifiedName().replaceAll('\\.','/').concat('.java')
/]

[query public qualifiedName(aClass :Class):string =
  aClass.containingPackages(),name->sep('.')->including('.')->including(aClass.name)->toString()
/]

[query public containingPackages (aClass :Class): sequence(Package)=
  aClass.ancestors(Package)->reject(oclIsKindof(Model))->reverse()
/]
```

This template demonstrates the feature of **protected areas**. BIT use `final` and `default` to simulate the protected behavior.