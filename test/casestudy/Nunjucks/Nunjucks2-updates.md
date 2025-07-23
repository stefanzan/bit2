# A. Update text in template
## A.ins: mark all items bold 
  insert "<b>" at 9
  insert "</b>" at 17 
  insert "<b>" at 34 
  insert "</b>" at 42

## A.ins: add <ul> and </ul>
  insert "<ul>" at 2
  insert "</ul>" at 56
 
 There are four possible results, select the expected one.

## A.del: delete newlines of item list
  delete "\n" at 2
  delete "\n" at 19

## A.rep: replace all "li"s with "p"s 
  replace "li" with "p" at 6
  replace "li" with "p" at 15
  replace "li" with "p" at 22
  replace "li" with "p" at 31

# B. Update expression in template

## B.ins: not appliable.

## B.del: 
  delete "5" at 13


## B.rep: 
  replace "Phone" with "Iphone" at 27