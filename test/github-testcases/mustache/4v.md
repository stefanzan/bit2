bit2: √ 
url : https://github.com/AlexMikhalochkin/jarvis/commit/a921850a1e65e27b41dd2670eb5a05958c0a1544
file: configuration/codegenerator/templates/dataClass.mustache
desc: add constant
diff1: 
+ import com.fasterxml.jackson.annotation.JsonInclude

diff2:
+ @JsonInclude(JsonInclude.Include.NON_NULL)