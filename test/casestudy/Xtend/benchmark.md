# Xtend Benchmark
The Xtend benchmark consists of the examples in the official [Xtend tutorial](https://www.eclipse.org/xtend/documentation/203_xtend_expressions.html#templates). The benchmark contains 4 Xtend templates. We list these templates as follows.

## Template 1
The Xtend template (7 lines of code) is as follows. The BIT implementation can be found at `Xtend1.bit2`, consisting of 6 lines of code.

```velocity
def someHTML(String content) '''
  <html>
    <body>
      «content»
    </body>
  </html>
'''
```

This template is a welcoming example in the Xtend tutorial.

## Template 2
The Xtend template (13 lines of code) is as follows. The BIT implementation can be found at `Xtend2.bit2`, consisting of 26 lines of code.

```velocity
def toText(Node n) {
  switch n {
    Contents : n.text
 
    A : '''<a href="«n.href»">«n.applyContents»</a>'''
 
    default : '''
        <«n.tagName»>
          «n.applyContents»
        </«n.tagName»>
    '''
  }
}
```

This template shows the combination of template expressions and normal expressions.


## Template 3
The Xtend template (14 lines of code) is as follows. The BIT implementation can be found at `Xtend3.bit2`, consisting of 14 lines of code.

```velocity
def someHTML(List<Paragraph> paragraphs) '''
  <html>
    <body>
      «FOR p : paragraphs»
        «IF p.headLine != null»
          <h1>«p.headline»</h1>
        «ENDIF»
        <p>
          «p.text»
        </p>
      «ENDFOR»
    </body>
  </html>
'''
```

This template is a comprehensive example in the Xtend tutorial.

## Template 4
The Xtend template (13 lines of code) is as follows. The BIT implementation can be found at `Xtend4.bit2`, consisting of 13 lines of code.

```velocity
def someHTML(List<Paragraph> paragraphs) '''
  <html>
    <body>
      «FOR p : paragraphs BEFORE '<div>' SEPARATOR '</div><div>' AFTER '</div>'»
        «IF p.headLine != null»
          <h1>«p.headline»</h1>
        «ENDIF»
        <p>
          «p.text»
        </p>
      «ENDFOR»
    </body>
  </html>
'''
```

This template is another comprehensive example in the Xtend tutorial.



