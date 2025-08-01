# A. Update text in template
## A.ins: Mark items bold  
 insert "<b>" at 13, insert "</b>" at 22
 insert "<b>" at 39, insert "</b>" at 47
 insert "<b>" at 64, insert "</b>" at 72

## A.del: delete newlines between items
  delete "\n" at 6
  delete "\n" at 24
  delete "\n" at 41

## A.rep: replace "ul" with "ui"
  repace "ul" with "ui" at 2
  repace "ul" with "ui" at 64

# B. Update expression in template

## B.ins:  add "s", "es" to each item, bulk op
insert "s" at 19
insert "s" at 38
insert "us" at 57

## B.del: delte the middle item exactly
delte "\n  <li><b>apple</b></li>\n" at 25 

## B.rep: replace "banana" with "peach"
replace "banana" with "peach" at 13