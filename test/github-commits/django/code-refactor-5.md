bit2: x
url :https://github.com/Fantonio27/django-practice-1/commit/5a83caac423d645de7153ae62d63b2da8e9c57e9
file: myproject/users/templates/login.html
desc: refactoring constant text to expression and function call
diff: 
- <form class="form-with-validation" action="/users/login/" method="post">
+ <form class="form-with-validation" action="{% url 'users:login '%}" method="post">