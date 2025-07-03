bit2: √
url : https://github.com/exelearning/mod_exescorm/commit/33d636c5ce05de44d6c354269c43e9bd73516db4
file: templates/report_actionbar.mustache
desc: change div to form
diff: 
- <div class="container-fluid tertiary-navigation">
+ <form method="post" action="your-action-url" class="d-flex flex-wrap align-items-center" id="your-form-id">
    <div class="row">
        {{#exescormreports}}
            <div class="navitem">
@@ -60,4 +60,4 @@
            </div>
        {{/candownload}}
    </div>
- </div>
+ </form>