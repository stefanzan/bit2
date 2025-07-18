bit2: √
url : https://github.com/apache/avro/commit/84bc7322ca1c04ab4a8e4e708acf1e271541aac4#diff-d80f944046396bf15ac58b178a8d9273d53daabb264edf541c67424e8b47ab4f
file: lang/java/compiler/src/main/velocity/org/apache/avro/compiler/specific/templates/java/classic/enum.vm
desc: delete constant text, insert constant text
diff: 
- /** $schema.getDoc() */
+ /** $this.escapeForJavadoc($schema.getDoc()) */