bit2: p
url : https://github.com/NiallPierce/FitnessSub/commit/553ee93ee70de02e13c157875b48c9c2714a5077#diff-2cfc32b1dc002903d8071b1c981dbaea810e2b6a254d5f27fda397d29ba74045
file: templates/account/login.html
desc: insert consant text, insert expression.
diff: 
-    <form method="post">
+    <form class="login" method="POST" action="{% url 'account_login' %}">