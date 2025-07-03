bit2: √
url : https://github.com/tisseurdetoile/website-I/commit/8e2d6ee10b150bcc20e5cb8546ae99ef4f51fd8c
file: templates/footer.ftl
desc: delete constant text
diff: 

        <hr>
         <small style="font-size:16px;">
           &copy; 2018 <a href="https://github.com/${config.share_github}">${config.site_author}.</a>
-           Baked with <a href="http://jbake.org">JBake <span th:text='${version}'>${version}</span></a> using the jbaked-<a href="http://github.com/tisseurdetoile/jbake-yinwang">yinwang</a> theme.
+           Baked with <a href="http://jbake.org">JBake ${version}</a> using the jbaked-<a href="http://github.com/tisseurdetoile/jbake-yinwang">yinwang</a> theme.
         </small>
       </footer>
     </div> <#-- closes the outer/inner div -->