# A. Update text in template
## A.ins: insert "Let's " before "Go"
  insert "Let's " at 5

## A.del: 
  delete "Go " at 1

## A.rep: replace "East" with "North"
  replace "East" with "North" at 8

This will not get the intended result in the template program, since branch will not change, only the const string "East" modified to "North".

# B. Update expression in template
## B.ins: not appliable.
## B.del: 
## B.rep: 
