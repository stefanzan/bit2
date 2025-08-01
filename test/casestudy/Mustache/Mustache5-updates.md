# A. Update text in template
## A.ins: insert "," after "Hi"
  insert "," at 4

## A.del: delete the !
  delete "!" at 10

## A.rep: 
  replace "Hi" with "Hello" at 2

# B. Update expression in template

## B.ins: change Alice to Alince by inserting n
  insert "n" at 8

## B.del: delete "Alice" in the output will result in deleting "Alice" in object person.
  delete "Alice" at 5

## B.rep: replace "Alice" with "Bob" in the object's value
  replace "Alice" with "Bob" at 5