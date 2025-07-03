bit2: √
url : https://github.com/hmcts/cmc-citizen-frontend/commit/5c7ff7136388662ce83271e17f609de7461186e8#diff-cc350992a4d957035607f3a6e3b601ab8f84a7cef331226dc258ffa13699a508
file: src/main/views/includes/banner.njk
desc: change constant text
diff: 
- <div class="hmcts-banner-message">
-    <span class="hmcts-banner-assistive">information</span>
-    We apologise if this service is operating more slowly than usual. We're aware of this issue and we're working to fix it, so you don't need to contact us. We hope to fix this as soon as possible
+    <div class="hmcts-banner-message">
+      <span class="hmcts-banner-assistive">information</span>
+        Please note: On 08 October 24 this service will not accept new claims. Claims issued before this date will be managed by this existing service, you can view these by going to your account <a href={{ cuiDashboardUrl }}>here</a>.
+        Any draft claims not issued before this date will be deleted.