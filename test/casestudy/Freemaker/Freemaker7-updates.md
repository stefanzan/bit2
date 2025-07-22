# A. Update text in template
## A.ins: insert "." after "Euros"
  insert "." at 31
  insert "." at 90

## A.del: 
  delete "for " at 17
  delete "for " at 71

## A.rep: replace "for" with "is"
  replace "for" with "is" at 17
  replace "for" with "is" at 74

# B. Update expression in template

## B.ins: not appliable.

## B.del: delete price
  delete "1500" at 21
  Note: suggest using replace "1500" with "0" instead.

## B.rep: change the price for python
  replace "1500" with "2000" at 21