var toDoc=function(segnames,texts,others) {
	var D=require("./document");	
	var d=D.createDocument() ,revert=null;
	for (var i=0;i<texts.length;i++) {
		if (others.reverts && others.reverts[i].trim()) revert=JSON.parse(others.reverts[i]);
		else revert=null;
		var p=null;
		if (others.parents) p=others.parents[i];
		d.createPage({n:segnames[i],t:texts[i],p:p,r:revert});
	}
	if (others.markups) d.addMarkups(others.markups);
	d.endCreatePages();
	return d;
}

var getDocument=function(filename,markups,cb){
	var engine=this;
	var filenames=engine.get("filenames");

	if (typeof markups=="function")  { //no markups
		cb=markups;
		markups=null;
	}

	var i=filenames.indexOf(filename);
	if (i==-1) {
		cb(null);
	} else {
		var segnames=engine.getFileSegNames(i);
		var files=engine.get(["files",i],true,function(file){
			var parentId=null,reverts=null;
			if (file) {
				parentId=file.parentId;
				reverts=file.reverts;
			}
			engine.get(["filecontents",i],true,function(data){
				cb(toDoc(segnames,data,{parents:parentId,reverts:reverts,markups:markups}));
			});			
		});
	}
}

module.exports={getDocument:getDocument};