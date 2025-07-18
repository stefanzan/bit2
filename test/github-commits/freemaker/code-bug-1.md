bit2: x
url : https://github.com/GoogleCloudPlatform/google-cloud-eclipse/commit/7a26f2245ec781eb9120dc79923ae3596c7d7519#diff-efdc53f55a4324e1d3bc6c990be8aa8be71581d78222606c2aaac1092387613e
file: plugins/com.google.cloud.tools.eclipse.util/templates/appengine/web.xml.ftl
desc: change expression
diff: 
  <servlet>
     <servlet-name>HelloAppEngine</servlet-name>
-     <servlet-class>${Package}HelloAppEngine</servlet-class>
+     <servlet-class>${package}HelloAppEngine</servlet-class>
   </servlet>