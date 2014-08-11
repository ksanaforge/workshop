var Kde=require("ksana-document").kde;
var Kse=require("ksana-document").kse;
var db=null;
QUnit.asyncTest("open",function(){
	Kde.openLocal("jiangkangyur",function(_db){
		if (!_db) throw "cannot open db jiangkangyur"
		db=_db;
		equal(typeof db , "object");
		start();
	});
})

QUnit.asyncTest("newquery",function() {
	Kse.search(db,"འ%ས",function(Q){
		equal(Q.terms[0].variants.length>5,true);
		start();
	})
	
})

