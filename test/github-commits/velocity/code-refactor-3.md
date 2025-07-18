bit2: x
url : https://github.com/Dukou007/mybatis-plus/commit/fc59df6eebcdd1178bed3720b3569ed673bd14c2
file: mybatis-plus-generator/src/main/resources/templates/entity.java.vm
desc: change if condition expression
diff: 
- #if($!{velocityCount}==1)
+ #if($!{foreach.index}==0)
          "${field.propertyName}=" + ${field.propertyName} +
  #else
          ", ${field.propertyName}=" + ${field.propertyName} +