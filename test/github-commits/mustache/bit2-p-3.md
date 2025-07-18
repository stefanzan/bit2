bit2: p
url : https://github.com/gunnarro/terex/commit/b31759cbd2a3388106deacff0a366a8a98f61150
file: app/src/main/assets/template/html/default-client-timesheet.mustache
desc: delete expression, insert expression
diff: 
  <address>
      <strong>Kunde</strong><br>
-      {{invoiceReceiver.organizationDto.name}}<br>
-      {{invoiceReceiver.organizationDto.businessAddress.streetAddress}}<br>
-      {{invoiceReceiver.organizationDto.businessAddress.postalCode}} {{invoiceReceiver.organizationDto.businessAddress.city}}
+     {{clientName}}
  </address>
