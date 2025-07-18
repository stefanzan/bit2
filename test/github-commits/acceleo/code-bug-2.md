bit2: x
url : https://github.com/Kribouille/IM_project/commit/46785ba1fd58bc19eb7eaa89d2fc60c937275e89
file: TwitterAcceleo/src/TwitterAcceleo/files/generate.mtl
desc: code bug, cannot generate text output.
diff: 

@@ -30,9 +30,9 @@ from:[i.current(User).value/][/if]
 [if i.eClass().name = 'Date']
 since:[i.current(Date).value/] until:[i.current(Date).value/][/if]
 [if i.op.eClass().name = 'LessThan']
-  LessThan [if/]
+  LessThan [/if]
 [if i.op.eClass().name = 'UpperThan']
-  UpperThan [if/]
+  UpperThan [/if]
 [if i.eClass().name = 'Retweet']
 filter:retweets[/if]
 )[for (j: Instruction | i.next)]
