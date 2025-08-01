# A. Update text in template
## A.ins: add newline between two div marks. i.e. from "</div><div>" to "</div>\n  <div>"
  insert "\n  " at 99
 
## A.del: delete the first "<html>" tag.
  delete "<html>" at 1

## A.rep: 
  replace "</html>" at 182

# B. Update expression in template
## B.ins: update Greeting in h1 tag in the first item, and update Sunny in p tag in the second item
  insert "s" at 46
  insert "Day" at 154

## B.del: 
  delete "0" at 71


## B.rep: 
  replace "Sunny" with "Cloudy" at 148