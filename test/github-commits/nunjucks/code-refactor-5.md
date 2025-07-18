bit2: x
url : https://github.com/JulienHoullier/fib-frontend/commit/4b9d59eed5b7e7fd12c8ade4579f335161575b7a
file: templates/emails/registration-confirmation.html
desc: change expression
diff: 
-	 	(date: {{ registration.tournament._.date.format("DD/MM/YYYY") }}).
+	 	(date: {{ registration.tournament.date | date("DD/MM/YYYY") }}).