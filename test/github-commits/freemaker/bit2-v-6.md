bit2: √
url : https://github.com/openbravo/peoples-openbravo/commit/3727ea57996e3718c7c44b863f9f3ecbfdaf3473
file: modules/org.openbravo.client.application/src/org/openbravo/client/application/templates/ob-attachment-view.js.ftl
desc: delete if statment.
diff: 

- <#if !data.popup>
- OB.Layout.ViewManager.loadedWindowClassName = 'attachment${data.windowClientClassName?js_string}';
- </#if>
