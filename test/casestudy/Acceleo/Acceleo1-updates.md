# A. Update text in template
## A.ins: Add a space after comma in arguments list of the constructor function. Change from `public Person(String name,String tel) {}` to `public Person(String name, String tel) {}`.
insert " " at 52

## A.del: Delete the final keyword
delete "final" at 119
delete "final" at 200

## A.rep: Replace class access identifier from "public" to "private"
replace "public" with "private" at 2

# B. Update expression in template

## B.ins: 
insert "s" at 21

## B.del: Delete "Person"'s "son"
delete "son" at 18
delete "son" at 30

## B.rep: Replace all `tel` with `phone`
replace "tel" with "phone" at 59
replace "tel" with "phone" at 103
replace "tel" with "phone" at 109
replace "tel" with "phone" at 232
replace "tel" with "phone" at 258
replace "tel" with "phone" at 284



