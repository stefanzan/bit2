bit2: x
url : https://github.com/health-and-care-developer-network/fhir-reference-server/commit/d30e2b1cc60d5b2c7d1bad33849421839f5738aa#diff-7da45f983f260b2a1960f4fcb40742653997d818c82c582914bfd7dd5bfcd512
file: src/main/resources/hl7-velocity-templates/app-shell.vm
desc: insert expression
diff: 
-		<div class="wrapper cf container">$page-content</div><!--end main_content-->
+		<div class="wrapper cf container">#parse($contentTemplateName)</div><!--end main_content-->