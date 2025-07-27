## BIT2
A bidirectional template engine that supports modifying templates by modifying output directly.


## Language Syntax

keywords: `var`, `if`, `endif`, `elseif`, `for`, `in`, `endfor`, `separator`, `front`, `rear`.

```
Fragment := Literal | Directive | Fragment Fragment
Directive := «var Name = Expr» | «Name = Expr» | «Expr»
          | «if Expr» Fragment ElseBranch «endif»
          | «for Name in Expr ForLitList» Fragment «endfor»
ElseBranch := «elseif Expr» Fragment ElseBranch
          | «else» Fragment 
ForLit := separator string | front string | rear string
Expr := basic arithmetic, relational, and boolean expressions
     | Expr . Name | Value
Name := identifiers
Value := record, list, tuple, string, integer, and boolean values
Literal := any char sequence that does not contain «
```
## Usage
Please install `LiveT` plugin in VSCode, and use it.

1. load `LiveT` plugin. 
2. write template in text editor using bit2 syntax.
2. click `forward` button to evaluates to text.
3. update output text through deletion, insertion, replacement (select text and right click, a popup shows a list of actions).
4. click `backward` button to reflect changes back to template

## Example

### 1. Assignment
```
«var no = 0»
Before: «no»
«no = no + 1»
After: «no»
```

### 2. Branch 
```
«var age=19»
«var count=1»
«if age>=18»
  Wow! An adult! «count» 
«else»
  Hi! A little boy! «count»
«endif»
«count»
```

### 3. Forloop

```
«var lst=[{head:"Modeling", text:"UML"},{head:"Programming", text:"Java"}]»
«for p in lst»
<h1>«p.head»</h1>
«endfor»
```

### 4. Mixed

```
«var paragraphs =[{head:"Hello", text:"Hello!"}, {head:"Farewell", text:"Good Bye!"}] »
<html>
    <body>«var no = 0»«for p in paragraphs»
      «if p.head != ""»«no = no + 1»<h1>«no».«p.head»</h1>«endif»
        <p>
          «p.text»
        </p>«endfor»
    </body>
</html>
```