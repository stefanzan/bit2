bit2: x
url : https://github.com/codescape/jira-scrum-poker/commit/0df6376112a78ed2fc86403ec648a20b61723f3e#diff-0396cba1407b2e08503595d71c695f61124f5ae6c6263c96ce2cadb2612aa9c5
file: src/main/resources/templates/show.vm
desc: change expression, builtin function's argument.
diff: 
  <div class="scrum-poker-text-holder">
-      $wikiRenderer.render($comment.body, $issue.issueRenderContext)
+      $action.renderComment($comment.body)
  </div>