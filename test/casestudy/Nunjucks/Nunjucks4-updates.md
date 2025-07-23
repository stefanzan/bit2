# A. Update text in template
## A.ins: 

## A.del: 

## A.rep: 

# B. Update expression in template
## B.ins: not appliable.

## B.del:
  delete "Joe" at 8

## B.rep: replace Joe with Joey, after backward evaluation, replace Alice with Bob 
  Updates to "Joe" will only affect the assignment in line 3, not line 1.
  Also updates to "Alice" will only affect line 1, not the following ones.

