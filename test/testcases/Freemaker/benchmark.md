# Freemaker Benchmark
The Freemaker benchmark consists of the examples in the official [Freemaker tutorial](https://freemarker.apache.org/docs/index.html). The benchmark contains 15 Freemaker templates, 12 of which are implemented in BIT. We list these templates as follows.

## Template 1
The Freemaker template (10 lines of code) is as follows. The BIT implementation can be found at `Freemaker1.bit2`, consisting of 12 lines of code.

```freemaker
<html>
<head>
  <title>Welcome!</title>
</head>
<body>
  <h1>Welcome ${user}!</h1>
  <p>Our latest product:
  <a href="${latestProduct.url}">${latestProduct.name}</a>!
</body>
</html>
```

This template is a comprehensive example in the Freemaker tutorial.

## Template 2
The Freemaker template (12 lines of code) is as follows. The BIT implementation can be found at `Freemaker2.bit2`, consisting of 14 lines of code.

```freemaker
<html>
<head>
  <title>Welcome!</title>
</head>
<body>
  <h1>
    Welcome ${user}<#if user == "Big Joe">, our beloved leader</#if>!
  </h1>
  <p>Our latest product:
  <a href="${latestProduct.url}">${latestProduct.name}</a>!
</body>
</html>
```

This template demonstrates the feature of **conditionals**.


## Template 3
The Freemaker template (7 lines of code) is as follows. The BIT implementation can be found at `Freemaker3.bit2`, consisting of 10 lines of code.

```freemaker
<#if animals.python.price < animals.elephant.price>
  Pythons are cheaper than elephants today.
<#elseif animals.elephant.price < animals.python.price>
  Elephants are cheaper than pythons today.
<#else>
  Elephants and pythons cost the same today.
</#if>
```

This template demonstrates the feature of multiple **conditionals**.


## Template 4
The Freemaker template (6 lines of code) is as follows. The BIT implementation can be found at `Freemaker4.bit2`, consisting of 7 lines of code.

```freemaker
<p>We have these animals:
<table border=1>
  <#list animals as animal>
    <tr><td>${animal.name}<td>${animal.price} Euros
  </#list>
</table>
```

This template demonstrates the feature of **loops**.

## Template 5
The Freemaker template (5 lines of code) is as follows. The BIT implementation can be found at `Freemaker5.bit2`, consisting of 6 lines of code.

```freemaker
<ul>
<#list misc.fruits as fruit>
  <li>${fruit}
</#list>
</ul>
```

This template demonstrates the feature of **loops**.

## Template 6
The Freemaker template (10 lines of code) is as follows. The BIT implementation can be found at `Freemaker6.bit2`, consisting of 8 lines of code.

```freemaker
<#list misc.fruits>
  <p>Fruits:
  <ul>
    <#items as fruit>
      <li>${fruit}<#sep> and</#sep>
    </#items>
  </ul>
<#else>
  <p>We have no fruits.
</#list>
```

This template demonstrates the feature of default **loop** branches. We realize it with conditionals.

## Template 7
The Freemaker template (5 lines of code) is as follows. The BIT implementation can be found at `Freemaker7.bit2`, consisting of 6 lines of code.

```freemaker
<#list animals as animal>
      <div<#if animal.protected> class="protected"</#if>>
        ${animal.name} for ${animal.price} Euros
      </div>
</#list>
```

This template demonstrates the combination of **loop** and **conditionals**.

## Template 8
The Freemaker template (13 lines of code) is as follows. The BIT implementation can be found at `Freemaker8.bit2`, consisting of 10 lines of code.

```freemaker
<#switch animal.size>
  <#case "small">
     This will be processed if it is small
     <#break>
  <#case "medium">
     This will be processed if it is medium
     <#break>
  <#case "large">
     This will be processed if it is large
     <#break>
  <#default>
     This will be processed if it is neither
</#switch>
```

This template demonstrates the combination of **switches**.

## Template 9
The Freemaker template (12 lines of code) is as follows. The BIT implementation can be found at `Freemaker9.bit2`, consisting of 12 lines of code.

```freemaker
<#if mouse??>
  Mouse found
<#else>
  No mouse found
</#if>
Creating mouse...
<#assign mouse = "Jerry">
<#if mouse??>
  Mouse found
<#else>
  No mouse found
</#if>
```

This template demonstrates how to handle missing values. This feature can be viewed as syntactic sugar of **conditionals**.

## Template 10
The Freemaker template (5 lines of code) is as follows. The BIT implementation can be found at `src/edu/ustb/sei/bit/test/temp/Freemaker10.bit`, consisting of 11 lines of code.

```freemaker
<#macro greet person color>
  <font size="+2" color="${color}">Hello ${person}!</font>
</#macro>

<@greet person="Fred" color="black"/>
```

This template demonstrates the feature of **macros**. This feature can be viewed as **template calls**.

## Template 11
The Freemaker template (6 lines of code) is as follows. The BIT implementation can be found at `src/edu/ustb/sei/bit/test/temp/Freemaker11.bit`, consisting of 15 lines of code.

```freemaker
<#macro myMacro>foo</#macro>
<#assign x>
  <#list 1..3 as n>
    ${n} <@myMacro />
  </#list>
</#assign>
```

This template demonstrates the feature of **macros**. This feature can be viewed as **template calls**.


## Template 12
The Freemaker template (5 lines of code) is as follows. The BIT implementation can be found at `src/edu/ustb/sei/bit/test/temp/Freemaker12.bit`, consisting of 8 lines of code.

```freemaker
<#noparse>
  <#list animals as animal>
  <tr><td>${animal.name}<td>${animal.price} Euros
  </#list>
</#noparse>
```

This template demonstrates the feature of **verbose text**.


## Template 13 (Unsupported)
The Freemaker template (5 lines of code) is as follows.

```freemaker
<#macro border>
  <table border=4 cellspacing=0 cellpadding=4><tr><td>
    <#nested>
  </tr></td></table>
</#macro>

<@border>
  <ul>
  <@do_thrice>
    <li><@greet person="Joe"/>
  </@do_thrice>
  </ul>
</@border>
```

This template demonstrates the feature of **nested macros**. In general, BIT does not support nested macros.

## Template 14 (Unsupported)
The Freemaker template (8 lines of code) is as follows.

```freemaker
<#macro repeat count>
  <#list 1..count as x>
    <#nested x, x/2, x==count>
  </#list>
</#macro>
<@repeat count=4 ; c, halfc, last>
  ${c}. ${halfc}<#if last> Last!</#if>
</@repeat>
```

This template demonstrates the feature of **nested macros**. In general, BIT does not support nested macros.


## Template 15 (Unsupported)
The Freemaker template (6 lines of code) is as follows.

```freemaker
<#attempt>
  Optional content: ${thisMayFails}
<#recover>
  Ops! The optional content is not available.
</#attempt>
Primary content continued
```

This template demonstrates the feature of **attempt-recover**. In general, this feature cannot be bidirectionalized.








