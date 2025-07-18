bit2: x
url : https://github.com/albertcrowley/xnat-web/commit/dbc6ffa957d91dcb16bc120657e3e8682fa0a498
file: src/main/webapp/xnat-templates/screens/ForgotLogin.vm
desc: change expression
diff: 
            top: modal_top,Add commentMore actions
            className: 'friendlyForm',
            okAction: function(obj){
-               var _emailToVerify = $(obj.$modal).find('#requestEmail').val();
+               var _emailToVerify = $(obj.__modal).find('#requestEmail').val();
                requestVerificationEmail(_emailToVerify);
            }
        });