# A. Update text in template
## A.ins: Insert "." at the end
insert "." at 28

## A.del: Delete text "of " to
Delete "of " at 14

## A.rep: Replace "Number" by "Num" to
Replace "Number" with "Num" at 7

# B. Update expression in template

## B.ins: not appliable.

## B.del: delete expression to
delete "2" at 27

You cannot delete the compute result of xx.length.

## B.rep: replace compute results of the athlete_list, reject.
replace "2" with "3" at 27

It will fail, since we cannot update 2 to 3, as the athlete_list is not changed.
