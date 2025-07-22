# A. Update text in template
## A.ins: insert "." at the end 
insert "." at 13

## A.del: delete the last "e" in "employee"
delete "e" at 11

## A.rep: Replace "employee" with "member" 
replace "employee" with "member" at 4

# B. Update expression in template

## B.ins: not appliable.

## B.del: delete expression total at line 3 
delete "3" at 2 

Note: cannot, since it will break the contional expresion.

## B.rep: replace 3 by 2 √
replace "3" with "2" at 2

you cannot change from 3 to 2, since 3 is the computed result from list's length.
