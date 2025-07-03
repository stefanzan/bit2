bit2: √
url : https://github.com/ICON-newmedia/moodle-local_thi_learning_companions/commit/0d421a50b11c9c522c7f7b2e36f3c74f985709ef 
file: templates/mentor/mentor_questions_overview.mustache
desc: delete constant text, extra "</a>“ tag.
diff: 
- <p class="lc_comment_content"><strong>{{content}}</a></strong></p>
+ <p class="lc_comment_content"><strong>{{content}}</strong></p>

file: templates/mentor/mentor_search.mustache
diff2:
- <span title="{{name}}" alt="{{name}}">{{{image}}}</span>
+ <span title="{{name}}">{{{image}}}</span>