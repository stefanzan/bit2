bit2: x
url : https://github.com/Charles-RENAUX/appNoteManga/commit/f692da8cbeab29614d18cd006f103c9c026d5d21
file: web/src/main/webapp/WEB-INF/velocity/explorePage.vm
desc: change expression
diff: 
- <a type="image" class="mangaCoverExplore" href="localhost:8080/reviewPage/"+$manga.Id src=$manga.CoverPath alt=$manga.Title>
+ <a type="image" class="mangaCoverExplore" href="localhost:8080/reviewPage/"+$manga.Id src=$manga.Image alt=$manga.Name>