# Nunjucks Benchmark
The Nunjucks benchmark consists of the examples in the official [Nunjucks tutorial](https://mozilla.github.io/nunjucks/templating.html). The benchmark contains 9 Nunjucks templates, 5 of which is implemented in BIT. We list these templates as follows.

## Template 1
The Nunjucks template (7 lines of code) is as follows. The BIT implementation can be found at `src/edu/ustb/sei/bit/test/temp/Nunjucks1.bit`, consisting of 10 lines of code.

```nunjucks
{% if hungry %}
  I am hungry
{% elif tired %}
  I am tired
{% else %}
  I am good!
{% endif %}
```

This template shows the feature of **conditionals**.

## Template 2
The Nunjucks template (8 lines of code) is as follows. The BIT implementation can be found at `src/edu/ustb/sei/bit/test/temp/Nunjucks2.bit`, consisting of 17 lines of code.

```nunjucks
<h1>Posts</h1>
<ul>
{% for item in items %}
  <li>{{ item.title }}</li>
{% else %}
  <li>This would display if the 'item' collection were empty</li>
{% endfor %}
</ul>
```

This template shows the features of **conditionals** and **loops**.

## Template 3
The Nunjucks template (3 lines of code) is as follows. The BIT implementation can be found at `src/edu/ustb/sei/bit/test/temp/Nunjucks3.bit`, consisting of 11 lines of code.

```nunjucks
{% for fruit, color in fruits %}
  Did you know that {{ fruit }} is {{ color }}?
{% endfor %}
```

This template shows the feature of **loops**.


## Template 4
The Nunjucks template (6 lines of code) is as follows. The BIT implementation can be found at `src/edu/ustb/sei/bit/test/temp/Nunjucks4.bit`, consisting of 17 lines of code.

```nunjucks
{% macro field(name, value='', type='text') %}
<div class="field">
  <input type="{{ type }}" name="{{ name }}"
         value="{{ value | escape }}" />
</div>
{% endmacro %}
```

This template shows the feature of **template calls**.

## Template 5
The Nunjucks template (6 lines of code) is as follows. The BIT implementation can be found at `src/edu/ustb/sei/bit/test/temp/Nunjucks5.bit`, consisting of 12 lines of code.

```nunjucks
{{ username }}
{% set username = "joe" %}
{{ username }}
```

This template shows the feature of **local assignments**.


## Template 6 (Unsupported)
The Nunjucks template (24 lines of code) is as follows.

```nunjucks
{% block header %}
This is the default content
{% endblock %}

<section class="left">
  {% block left %}{% endblock %}
</section>

<section class="right">
  {% block right %}
  This is more content
  {% endblock %}
</section>


{% extends "parent.html" %}

{% block left %}
This is the left side!
{% endblock %}

{% block right %}
This is the right side!
{% endblock %}
```

This template shows the feature of **template extensions**. BIT does not support template extension so we did not realize it.


## Template 7 (Unsupported)
The Nunjucks template (6 lines of code) is as follows.

```nunjucks
<h1>Posts</h1>
<ul>
{% asyncAll item in items %}
  <li>{{ item.id | lookup }}</li>
{% endall %}
</ul>
```

This template shows the feature of **asynchronous loops**. BIT does not support parallelization so we did not realize it.

## Template 8 (Unsupported)
The Nunjucks template (3 lines of code) is as follows.

```nunjucks
{% for item in items %}
{% include "item.html" %}
{% endfor %}
```

This template shows the feature of **include**. BIT does not support modularization so we did not realize it.

## Template 9 (Unsupported)
The Nunjucks template (6 lines of code) is as follows.

```nunjucks
{% import "forms.html" as forms %}

{{ forms.label('Username') }}
{{ forms.field('user') }}
{{ forms.label('Password') }}
{{ forms.field('pass', type='password') }}
```

This template shows the feature of **import**. BIT does not support modularization so we did not realize it.


