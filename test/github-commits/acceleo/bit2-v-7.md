bit2: √
url : https://github.com/atlanmod/CyprIoT/commit/7c5e0dbda25634b63d58b0f81d9eb7307941ae55
file: generator/src/main/java/org/atlanmod/cypriot/generator/acceleo/rabbit.mtl 
desc: add newline
diff: 

[comment encoding = UTF-8 /]
 [module rabbit('http://www.atlanmod.org/CyprIoT')]
 
 [template public generateElement(aNetwork : Network)]
 [comment @main /]
 [file ('rabbit_'.concat(aNetwork.name).concat('.acl'), false, 'UTF-8')]
 ['['/]
+ 
