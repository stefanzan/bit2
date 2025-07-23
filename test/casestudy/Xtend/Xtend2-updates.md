# A. Update text in template
## A.ins: add indent for text in between "<p>" and "</p>" 
  insert "  " at 64 
  insert "  " at 134

## A.del: 
  delete "\n    " at 59
  delete "\n    " at 122

## A.rep: 
  replace "h1" with "h2" at 30
  replace "h1" with "h2" at 43
  replace "h1" with "h2" at 99
  replace "h1" with "h2" at 111

# B. Update expression in template
## B.ins: not appliable.

## B.del:  
  delete "ing" at 38

## B.rep: change "Morning" to "morning"
  replace "M" with "m" at 71
