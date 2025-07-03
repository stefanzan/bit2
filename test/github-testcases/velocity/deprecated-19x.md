bit2: x
url : https://github.com/carte018/CAR/commit/39663dd45c18103a6ff6e2234e194773281371be#diff-e469bb528edc20c83f02e5b2ddeb770c16e900b37d0eb0f28b8fb35e2e7f1d6f
file: demorp/src/main/webapp/WEB-INF/views/payroll.vm
desc: fix code bug
diff: 
-	#if($map.get("eduPersonPrincipalName" && $map.get("eduPersonUniqueId") && $map.get("amberTitle"))
+	#if($map.get("eduPersonPrincipalName") && $map.get("eduPersonUniqueId") && $map.get("amberTitle"))