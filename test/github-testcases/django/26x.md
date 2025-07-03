bit2: x 
url : https://github.com/gustapfp/dodo/commit/0b79c8e4d8b9a5be6075f924d327773fdbb8cf72#diff-6b34b8a386df46c9fa3751fafec54daa625319a4381ddf37ec27f43af8435183
file: templates/ONA/ona_form.html
desc: change the condition of if statement.
diff: 
-    if (input.checked && input.value === "não conforme") {
+    if (input.checked &&( input.value === "não conforme" || input.value === "parcial conforme")) {
        showTextField(questionId)
    }