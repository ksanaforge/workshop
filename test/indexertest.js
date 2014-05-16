var indexer=require("ksana-document").indexer;
var P=require("ksana-document").kde;
indexer.start("ccc");


var checkdb=function() {
	return;
	var ydb=P.open("ccc").ydb;
	ydb.get(["files"],true,function(data){
		console.log(data);
	});
	ydb.get(["fileNames"],true,function(data){
		console.log(data);
	});	
}
var printstatus=function() {
	var session=indexer.status();
	console.log(session.progress);
	if (session.done) {
		clearInterval(timer);
		checkdb();
	}
}


var timer=setInterval(printstatus,500);