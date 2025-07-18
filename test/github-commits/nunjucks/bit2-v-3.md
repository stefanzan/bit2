bit2: √
url : https://github.com/brendanmurty/site/commit/ec3f8f18523822be0d6e73b0a2e5aaced3ccdaf7
file: src/layouts/page.layout.njk
desc: add constant text double quotes.
diff: 

- <meta property="article:published_time" content={{ date | date('yyyy-MM-dd') }} />
+ <meta property="article:published_time" content="{{ date | date('yyyy-MM-dd') }}" />

diff2

- content={% if title %}Brendan Murty - {{ title }}{% else %}Brendan Murty{% endif %}
+ content={% if title %}"Brendan Murty - {{ title }}"{% else %}"Brendan Murty"{% endif %}