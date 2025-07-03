bit2: x
url : https://github.com/marcusgreen/moodle-tool_driprelease/commit/954908e05667ea098ca6e71f11d38635f0bee85b
file: templates/assign.mustache
desc: add if statement
diff: 
- <h1>Assignment</h1>
+ <h1>{{#str}}assignment, tool_driprelease{{/str}}</h1>