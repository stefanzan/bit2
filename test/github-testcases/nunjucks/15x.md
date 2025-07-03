bit2: x
url : https://github.com/hal-platform/hal/commit/04fab61eee87d7ccedbd148d57357f69c9168815#diff-e16d9502350b6f0f47ecb9e82446eb516f72a81b7c38dd77543f4eb4955428aa
file: js/nunjucks/queue.build.nunj
desc: change expression
diff:  
- <td class="table-priority-50">{{ time }}</td>
+ <td class="table-priority-50">{{ time | safe }}</td>