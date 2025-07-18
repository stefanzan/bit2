bit2: p
url : https://github.com/tema1998/nocode-bot/commit/a64f712fbee3e9669e886f35d5ced60e840493db#diff-09041797ce640df8ee8545f9b205f51d7b8fc70929fc25e3435cb854f8a59b4d
file: user_service/bots/templates/bots/chain_results.html
desc: updating expression
diff: 
-   Последняя активность: {{ result.last_interaction|date:"d.m.Y H:i" }}
+   Последняя активность: {{ result.last_interaction }}