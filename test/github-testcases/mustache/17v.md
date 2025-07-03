bit2: √
url : https://github.com/gunnarro/terex/commit/b31759cbd2a3388106deacff0a366a8a98f61150
file: app/src/main/assets/template/html/default-client-timesheet.mustache
desc: delete expression
diff: 
-  <td class="text-start">{{#isSickDay}}sick{{/isSickDay}} {{#isVacationDay}}vacation{{/isVacationDay}} {{comment}} {{type}}</td>
+  <td class="text-start">{{#isSickDay}}sick{{/isSickDay}} {{#isVacationDay}}vacation{{/isVacationDay}} {{comment}}</td>