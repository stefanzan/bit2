bit2: √
url : https://github.com/tyuichis/modern-anki-card-template/commit/829adb542e08e3418692131e9adf99a789ae6fe5
file: templates/base/qna_back.ejs
desc: remove whitespace from Source field in mustache builds
diff: 
-        <span id="source-text" data-field-name="Source (optional)">
-          <%= "{{" %>^<%= i18n('ankiFields.Source (optional)') %><%="}}" %> <%="{{"%>/<%= i18n('ankiFields.Source (optional)') %><%="}}" %>
-          <%= "{{" + i18n('ankiFields.Source (optional)') + "}}" %>
-        </span>
+        <span id="source-text" data-field-name="Source (optional)"><%= "{{" %>^<%= i18n('ankiFields.Source (optional)') %><%="}}" + "{{"%>/<%= i18n('ankiFields.Source (optional)') %><%="}}" + "{{" + i18n('ankiFields.Source (optional)') + "}}" _%></span>