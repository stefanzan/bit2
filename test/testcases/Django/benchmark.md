# Django Benchmark
The Django benchmark consists of the examples in the official [Django tutorial](https://docs.djangoproject.com/en/4.1/intro/tutorial03/) and [Django template language](https://docs.djangoproject.com/en/4.1/ref/templates/language/). The benchmark contains 8 Django templates, 5 of which is implemented in BIT. We list these templates as follows.

## Template 1
The Django template (9 lines of code) is as follows. The BIT implementation can be found at `src/edu/ustb/sei/bit/test/temp/Django1.bit`, consisting of 17 lines of code.

```django
{% if latest_question_list %}
    <ul>
    {% for question in latest_question_list %}
        <li><a href="/polls/{{ question.id }}/">{{ question.question_text }}</a></li>
    {% endfor %}
    </ul>
{% else %}
    <p>No polls are available.</p>
{% endif %}
```

This template is a comprehensive example in the Django tutorial.

## Template 2
The Django template (7 lines of code) is as follows. The BIT implementation can be found at `src/edu/ustb/sei/bit/test/temp/Django2.bit`, consisting of 13 lines of code.

```django
{% if athlete_list %}
    Number of athletes: {{ athlete_list|length }}
{% elif athlete_in_locker_room_list %}
    Athletes should be out of the locker room soon!
{% else %}
    No athletes.
{% endif %}
```

This template demonstrates the feature of **conditionals**.

## Template 3
The Django template (5 lines of code) is as follows. The BIT implementation can be found at `src/edu/ustb/sei/bit/test/temp/Django3.bit`, consisting of 11 lines of code.

```django
{% if athlete_list|length > 1 %}
   Team: {% for athlete in athlete_list %} ... {% endfor %}
{% else %}
   Athlete: {{ athlete_list.0.name }}
{% endif %}
```

This template demonstrates the features of **conditionals** and **loops**.

## Template 4
The Django template (3 LOCs) is listed as follows.  The BIT implementation can be found at `src/edu/ustb/sei/bit/test/temp/Django4.bit`, consisting of 7 lines of code.

```django
{% with total=business.employees.count %}
    {{ total }} employee{{ total|pluralize }}
{% endwith %}
```

This template demonstrates the features of **local assignments**.

## Template 5
The Django template (3 LOCs) is listed as follows.  The BIT implementation can be found at `src/edu/ustb/sei/bit/test/temp/Django5.bit`, consisting of 6 lines of code.

```django
{% verbatim %}
    {{if dying}}Still alive.{{/if}}
{% endverbatim %}
```

This template demonstrates the features of **verbatim**.

## Template 6 (Unsupported)
The Django template (4 LOCs) is listed as follows. 

```django
{% for obj in some_list %}
    {% cycle 'row1' 'row2' as rowcolors silent %}
    <tr class="{{ rowcolors }}">{% include "subtemplate.html" %}</tr>
{% endfor %}
```

This template demonstrates the feature of **include**. BIT does not support modularization.

## Template 7 (Unsupported)
The Django template (9 lines of code) is as follows.

```django
{% for match in matches %}
    <div style="background-color:
        {% ifchanged match.ballot_id %}
            {% cycle "red" "blue" %}
        {% else %}
            gray
        {% endifchanged %}
    ">{{ match }}</div>
{% endfor %}
```

This template demonstrates the features of **ifchanged** and **cycle**. BIT does not support the two features.

## Template 8 (Unsupported)
The Django template (16 lines of code) is as follows.

```django
{% extends "base_generic.html" %}

{% block title %}{{ section.title }}{% endblock %}

{% block content %}
<h1>{{ section.title }}</h1>

{% for story in story_list %}
<h2>
  <a href="{{ story.get_absolute_url }}">
    {{ story.headline|upper }}
  </a>
</h2>
<p>{{ story.tease|truncatewords:"100" }}</p>
{% endfor %}
{% endblock %}
```

This template demonstrates the feature of **template extension**. BIT does not support template extension so we did not realize this template.
