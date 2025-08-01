# A. Update text in template
## A.ins: 
  insert "\nWe have customers listed." at 156

## A.del: delete newlines of list items
  delete "\n" at 12
  delete "\n" at 57
  delete "\n" at 100

## A.rep: 
  replace "table" with "tb" at 3
  replace "table" with "tb" at 147

# B. Update expression in template
## B.ins: add "er"
  insert "r" at 40
  insert "er" at 85
  insert "er" at 132

## B.del: 
  delete "A" at 35

## B.rep: change number from 0,1,2 to 1,2,3
  replace "0" with "1" at 25, 
  replace "1" with "2" at 71, 
  replace "2" with "3" at 115

