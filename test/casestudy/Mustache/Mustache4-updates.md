# A. Update text in template
## A.ins: change awesome to really owesome
  insert "really " at 14

## A.del: 

## A.rep: replace "b" with "p"
  replace "b" with "p" at 3
  replace "b" with "p" at 24

# B. Update expression in template

## B.ins: insert "i", to change "Clark" to "Clarik"
  insert "i" at 9 

The updated result is :
«var name="Clari"»
«var text=name+"k is awesome."»
<b>«text»</b>


## B.del: 
  delete "." at 21

## B.rep: 
  replace "Clark" with "Mark" at 5