bit2: p
url : https://github.com/tisseurdetoile/website-I/commit/8e2d6ee10b150bcc20e5cb8546ae99ef4f51fd8c
file: templates/sharelink.ftl
desc: change expression
diff: 

- <#assign postUrl="${config.site_host}/${content.uri}">
+ <#assign postUrl="${config.site_host}/${content.uri}"?url('UTF-8')>

- <li><a href="//twitter.com/share?url=${postUrl}&text=${content.title}&via=${twittername}" target="_blank" class="share-btn twitter">
+ <li><a href="//twitter.com/share?url=${postUrl}&text=${readTitle}&via=${twittername}" target="_blank" class="share-btn twitter">