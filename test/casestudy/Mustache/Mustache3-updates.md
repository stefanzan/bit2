# A. Update text in template
## A.ins: insert "List:" before all text
  insert "List:" at 1

## A.del: delete newlines of the list items
  delete "\n" at 1
  delete "\n" at 15

## A.rep: replace "b" with "p"
  replace "b" with "p" at 3
  replace "b" with "p" at 12
  replace "b" with "p" at 18
  replace "b" with "p" at 25

# B. Update expression in template

## B.ins: not appliable.

## B.del: √
  delete "Alice" at 5

## B.rep: replace "Alice" with "Adam"
  replace "Alice" with "Adam" at 10
