bit2: x
url : https://github.com/dryade/chouette/commit/b583ebe90b014cce895d63f3ce92be40670d0d01
file: chouette-exchange-netex/src/main/resources/templates/site_frame.vm
desc: add if statement
diff: 
+     #if($accessLink.accessPoint) 
      <From>
        <EntranceRef ref="$accessLink.accessPoint.objectId" />
      </From>
+     #end