bit2: x
url : https://github.com/agiledigital-labs/confluence-plugin-idea-search/commit/1760c687c982da8cac84ca1cb3029cbbf56c8d7b#diff-8e64b172b2bd9396bd3213c86ceebd9b919e4378aeef68ec11edb4b967677299
file: src/main/resources/vm/IndexPage.vm
desc: change expression
diff: 

      <tr>
-        <td class="cell-title">$row.title</td>
-        <td class="cell-description">$row.description.getRenderedValue()</td>
-        <td class="cell-technology">$row.technologies.getRenderedValue()</td>
-        <td class="cell-status">$row.status.getRenderedValue()</td>
+        <td class="cell-title">$row.getTitle()</td>
+        <td class="cell-description">$row.getDescription().getRenderedValue()</td>
+        <td class="cell-technology">$row.getTechnologies().getRenderedValue()</td>
+        <td class="cell-status">$row.getStatus().getRenderedValue()</td>