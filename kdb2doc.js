var Kde=require("ksana-document").kde;

Kde.openLocal("jiangkangyur",function(engine){  //use Kde.open in jsx
	engine.get("fileNames",function(filenames){
		console.log("files in kdb",filenames.length);
	})
	engine.getDocument("001/lj0001_001.xml",function(doc){  //get a file
		var page=doc.pageByName("1.1a");   // get a page
		console.log(page.inscription)
	})
});