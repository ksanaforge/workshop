var kse=require("ksana-document").kse;
var kde=require("ksana-document").kde;


kse.search({db:"ccc",q:'君子'},function(res){
	console.log(res);
	return;
});
/*
	var postings,tokens;
	kde.open("ccc",function(de){
		de.ydb.get(["postings"],true,function(data){
			postings=data;
			de.ydb.get(["tokens"],true,function(data){
				tokens=data;

				cb();		
			});
		});
	});
//});

var cb=function() {

	console.log(tokens['周']);
}*/