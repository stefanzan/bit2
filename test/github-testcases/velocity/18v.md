bit2: √
url : https://github.com/apache/logging-log4j2/commit/5fa35e116e00dfbf49e0b65492191fb189930842
file: src/site/markdown/security.md
desc: delete expression
diff: 
- When the logging configuration uses a non-default Pattern Layout with a Context Lookup (for example, ``${dollar}${dollar}{ctx:loginId}``),
+ When the logging configuration uses a non-default Pattern Layout with a Context Lookup (for example, ``$${ctx:loginId}``),