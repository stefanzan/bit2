# A. Update text in template
## A.ins: change "<td>" to  "</td>"
insert "/" at 66
insert "/" at 105

## A.ins: insert "</tr>"
insert "</tr>" at 80
insert "</tr>" at 124

## A.del: delete newline after items 
delete "/n" at 85 
delete "/n" at 128

## A.del: delte newline after '<table border=1>'
delete "/n" at 43

## A.rep: replace "animals" with "python and elephant"
replace "animals" with "python and elephant" at 12

# B. Update expression in template

## B.ins: 
insert "us" at 103

## B.del: 
delete "python" at 59

Note: we suggest using replace operaiton, it you really want to change "python" to "";
      Even we can support using deletion to delete field to "", but for simplicity, deletion is deletion.

`replace "python" with "" at 59` would be appliable.


## B.rep: set first character to upper case for animal's name
replace "python" with "Python" at 59
replace "elephant" with "Elephant" at 95
