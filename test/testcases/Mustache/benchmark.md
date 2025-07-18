# Mustache Benchmark
The Mustache benchmark consists of the examples in the official [Mustache tutorial](https://mustache.github.io/mustache.5.html). The benchmark contains 7 Mustache templates. We list these templates as follows.

## Template 1
The Mustache template (5 lines of code) is as follows. The BIT implementation can be found at `Mustache1.bit2`, consisting of 10 lines of code.

```mustache
Hello {{name}}
You have just won {{value}} dollars!
{{#in_ca}}
Well, {{taxed_value}} dollars, after taxes.
{{/in_ca}}
```

This template shows the feature of **conditionals**.

## Template 2
The Mustache template (4 lines of code) is as follows. The BIT implementation can be found at `Mustache2.bit2`, consisting of 6 lines of code.

```mustache
Shown.
{{#person}}
  Never shown!
{{/person}}
```

This template shows the feature of **conditionals**.

## Template 3
The Mustache template (3 lines of code) is as follows. The BIT implementation can be found at `Mustache3.bit2`, consisting of 4 lines of code.

```mustache
{{#repo}}
  <b>{{name}}</b>
{{/repo}}
```

This template shows the feature of **loops**.

## Template 4
The Mustache template (3 lines of code) is as follows. The BIT implementation can be found at `Mustache4.bit2`, consisting of 13 lines of code.

```mustache
{{#wrapped}}
  {{name}} is awesome.
{{/wrapped}}
```
where `wrapped` is a function as follows

```js
{
  "name": "Willy",
  "wrapped": function() {
    return function(text, render) {
      return "<b>" + render(text) + "</b>"
    }
  }
}
```

This template shows the feature of **function calls**. We realized it using template calls.

## Template 5
The Mustache template (3 lines of code) is as follows. The BIT implementation can be found at `Mustache5.bit2`, consisting of 5 lines of code.

```mustache
{{#person?}}
  Hi {{name}}!
{{/person?}}
```

This template shows the feature of **conditionals**. 

## Template 6
The Mustache template (6 lines of code) is as follows. The BIT implementation can be found at `Mustache6.bit2`, consisting of 8 lines of code.

```mustache
{{#repo}}
  <b>{{name}}</b>
{{/repo}}
{{^repo}}
  No repos :(
{{/repo}}
```

This template shows the features of **conditionals** and **loops**. 


## Template 7
The Mustache template (5 lines of code) is as follows. The BIT implementation can be found at `Mustache7.bit2`, consisting of 15 lines of code.

```mustache
base.mustache:
<h2>Names</h2>
{{#names}}
  {{> user}}
{{/names}}

user.mustache:
<strong>{{name}}</strong>
```

This template shows the features of **template calls**. 




