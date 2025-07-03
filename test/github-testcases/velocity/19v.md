bit2: √
url : https://github.com/Charles-RENAUX/appNoteManga/commit/a07ed56d18a7e3a0001f9e7bb53f52c9cf67aa0f#diff-50a93897a00b60e927dc90fad9fa5fe4997d3a817d59c739ea4d90c7ec40ea9c
file: web/src/main/webapp/WEB-INF/velocity/explorePage.vm
desc: change constant text, i.e. replace a tag with input tag.
diff: 
-    <a type="image" class="mangaCoverExplore" href="localhost:8080/reviewPage/"+$manga.Id src=$manga.Image alt=$manga.Name>
+    <input type="image" class="mangaCoverExplore" href="localhost:8080/reviewPage/"+$manga.Id src=$manga.Image alt=$manga.Name>