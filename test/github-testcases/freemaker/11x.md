bit2: x
url : https://github.com/GoogleCloudPlatform/google-cloud-eclipse/commit/7a26f2245ec781eb9120dc79923ae3596c7d7519#diff-efdc53f55a4324e1d3bc6c990be8aa8be71581d78222606c2aaac1092387613e
file: plugins/com.google.cloud.tools.eclipse.util/templates/appengine/HelloAppEngine.java.ftl
desc: add if statement
diff: 

@@ -1,6 +1,6 @@
- ${Package}
+ <#if package != "">package ${package};
 
- import java.io.IOException;
+ </#if>import java.io.IOException;
