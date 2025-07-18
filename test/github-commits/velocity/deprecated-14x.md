bit2: x
url : https://github.com/OpenOLAT/OpenOLAT/commit/693a776505d99edb2b7fe58857276d4e9bd174da
file: src/main/java/org/olat/commons/memberlist/ui/_content/memberList.html
desc: fix code bug
diff: 
-	#else if($r.isNotEmpty($member.curriculumRootElementDisplayName))
+	#elseif($r.isNotEmpty($member.curriculumRootElementDisplayName))