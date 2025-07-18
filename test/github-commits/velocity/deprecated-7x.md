bit2: x
url : https://github.com/okta/okta-developer-docs/commit/bdb558f6078858667c10d369ad382b6b39a3008d
file: packages/@okta/vuepress-site/docs/guides/custom-email/main/index.md
diff: a code bug, that will not render to output
- The following example uses the `{app.name}` variable, which is only available in Identity Engine.
+ The following example uses the `${app.name}` variable, which is only available in Identity Engine.