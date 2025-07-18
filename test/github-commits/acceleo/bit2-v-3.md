bit2: √
url : https://github.com/atlanmod/CyprIoT/commit/7c5e0dbda25634b63d58b0f81d9eb7307941ae55
file: generator/src/main/java/org/atlanmod/cypriot/generator/acceleo/rabbit.mtl 
desc: add separator for forloop generated content.
diff: 
 [for (bind : Bind | aNetwork.hasBinds)]
 	[for (topic : Topic | bind.channelToBind.oclAsType(ToBindPubSub).topics)]
+ 	[for (topic : Topic | bind.channelToBind.oclAsType(ToBindPubSub).topics) separator(', ')]
 	{"[bind.bindsInstanceThing.typeThing.owner.name/]",[readOrWrite(bind)/],"[aNetwork.domain.name.replaceAll('\\.', '/')/]/[topic.name/]"} 
 	[/for]
 [/for]
