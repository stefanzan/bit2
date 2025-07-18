bit2: √
url : https://github.com/IsaHu-dev/Harvest/commit/43c8594741c815ac655a13b413eb61fe1b0c2215#diff-fa9a4d30b6adf37658de9832645481b6542328ae96a2a77bd4a7bdb36146c1ff
desc: delete constant text, delte '/t, delete comment.
file: account/templates/account/manage-account.html
diff: 
-   <input class="btn btn-success w-100" type="submit" value="Update details"/>
+   <input class="btn btn-success w-100" type="submit" value="Update details">


file:account/templates/account/my-login.html
diff:

-      <input class="register-btn" type="submit" value="Login" />
+      <input class="register-btn" type="submit" value="Login">


file: creator/templates/creator/create-article.html
diff:

-   {% if 'success' in message.tags %}  <!-- Updated to match the tag in views.py -->
+   {% if 'success' in message.tags %}