# A. Update text in template
## A.ins:  insert comma after "Hello"
  insert "," at 29

## A.del: delete newline
  delete "\n" at 21

## A.rep: 
  replace "World" with "Programmer" at 39

# B. Update expression in template

## B.ins: not appliable.

## B.del: 
  delete "Velocity" at 30

  Since deletion of "Velocity" means deletion of variable declaration of foo, which is a big change, not appliable.

## B.rep: replace "Velocity" with "velocity"
  replace "Velocity" with "velocity" at 30
