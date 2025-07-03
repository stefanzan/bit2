bit2: x
url : https://github.com/healthonrails/XNAT-WEB/commit/dbc6ffa957d91dcb16bc120657e3e8682fa0a498
file: src/main/webapp/xnat-templates/screens/ForgotLogin.vm
desc: change expression
diff: 
-   var _emailToVerify = $(obj.$modal).find('#requestEmail').val();
+   var _emailToVerify = $(obj.__modal).find('#requestEmail').val();