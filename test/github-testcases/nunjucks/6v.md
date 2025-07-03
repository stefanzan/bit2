bit2: √
url: https://github.com/marwi07/www-vanessa-marie/commit/23beffaee843c80041a818126d1f13cadb5f8889#diff-ad04f2e6d1878753f31c1587f9e8606369ef1f6538995d8ad8e57a733f3cba8d
file: src/template/PortfolioErstellen.html
desc: delete div, add li tag
diff: 
-  <div class="nav-items">
+  <li>
    <a href="/index" class="active">Home</a>
-    {{ portfolioMenu | safe}}
+  </li>
+  {{ portfolioMenu | safe }}
+  <li>
    <a href="javascript:void(0);" class="icon" id="burgermenutest">
      <i class="material-icons" style="font-size: 40px">reorder</i>
    </a>
-  </div>
+  </li>