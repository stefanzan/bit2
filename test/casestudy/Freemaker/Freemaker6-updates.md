# A. Update text in template
## A.ins: insert "</p>" after "Fruits:"
  insert "</p>" at 12

## A.del: delete all "and"s.
  delete "and" at 36 
  delete "and" at 54

## A.rep: 
  replace "Fruits:" with "List of Fruits:" at 5

# B. Update expression in template

## B.ins: add "s", "es" to items
  insert "s" at 19 
  insert "s" at 38 
  insert "s" at 57

## B.del: set "banana" to "" in the list
  delete "banana" at 24
  
# B.del: delete "banana" item in the list 
  delete "\n  <li>banana</li>\nand" at 17

## B.rep: replace "mango" in the list
  replace "mango" with "strawberry" at 67