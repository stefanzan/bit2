# A. Update text in template
## A.ins: insert in the beginning
  insert "People list:\n" at 3

## A.del: delete newline of item list
  delete "\n" at 2
  delete "\n" at 16

## A.rep: 
  replace "b" with "p" at 4
  replace "b" with "p" at 13
  replace "b" with "p" at 19
  replace "b" with "p" at 26

# B. Update expression in template

## B.ins: change Bob to Booob
  insert "oo" at 24

## B.del: 
  delete "A" at 6

## B.rep: 
  replace "Bob" with "Clark" at 21