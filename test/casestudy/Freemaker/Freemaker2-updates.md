
# A. Update text in template
## A.ins: insert doctype 
insert "<!DOCTYPE html>" at 1

## A.del: delete "!" in "Welcome!"
delete "!" at 31

## A.rep: replace "beloved" with "great"
replace "beloved" with "great" at 89

# B. Update expression in template

## B.ins: not appliable.

## B.del: delete "Big Joe"
delete "Big Joe" at 75

Fail. Violate BX properties: updates change if-then-else branch.

## B.rep: replace "Big Joe" with "Joe"
replace "Big Joe" with "Joe" at 76

Fail. Violate BX properties: updates change if-then-else branch.
