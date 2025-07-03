bit2: √ 
url : https://github.com/tisseurdetoile/website-I/commit/8e2d6ee10b150bcc20e5cb8546ae99ef4f51fd8c
file: templates/menu.ftl
desc: delete constant text
diff: 

- <nav class="navbar navbar-default navbar-fixed-top" style="opacity: .9" role="navigation">
+ <nav class="navbar navbar-default navbar-fixed-top" style="opacity: .9">
         <div class="container-fluid">
             <#-- Brand and toggle get grouped for better mobile display -->
             <div class="navbar-header">
-                 <a class="la la-2x navbar-brand" href="/"><i class="la la-lg la-ellipsis-h"></i><#if content.title??><#escape x as x?xml>${content.title}</#escape><#else>${config.site_title}</#if></a>
+                 <a class="la la-2x navbar-brand" href="/"><i class="la la-lg la-ellipsis-h"></i><#if content.title??>${content.title}<#else>${config.site_title}</#if></a>
             </div>