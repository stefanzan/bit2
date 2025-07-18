bit2: x
url : https://github.com/Hedgemonkey/skunkmonkey/commit/49b0ed882e2efda9368aa6a2929096b0c150559f
file: users/templates/users/address_form.html
desc: refactor to if statement
diff: 

-             <button type="submit" class="btn btn-primary">{{ form_title|replace:" Address"|add:" Address" }}</button> <!-- Simple way to get Save/Add -->
+            <button type="submit" class="btn btn-primary">
+                {% if 'Edit' in form_title %}Save Address{% else %}Add Address{% endif %}
+            </button>