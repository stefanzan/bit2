# A. Update text in template 
## A.ins: 
  insert "<head></head>\n" at 9

## A.del: 
  delete "</html>" at 345

## A.rep: 
  replace "html" with "HTML" at 3 

# B. Update expression in template

## B.ins: change John to Johnson
  insert "son" at 32

## B.del: 
  delete "hn" at 30


## B.rep: 
  replace "Water" with "Drink" at 266

Error evaluating condition expression fail during backward: Error: Violate BX properties: updates change if-then-else branch.
