/*
markup format:
{"start":start_offset,"len":length_in_byte,"payload":{"type":"markup_type",author":"p1","text":""},"i":page_id}
*/
//saveMarkup({dbid:dbid,markups:markups,filename:filename,i:this.state.pageid } ,function(data){

var combineMarkups=function(db,markups,fn,pageid,cb) {

	var key="M!"+pageid+"!"+fn;
	db.get(key,function(err,res){
		var existing=[] ;
		if (res && res.M) existing=res.M ;
		if (!markups || !markups.length) {
			if (err.error) cb([]);
			else cb(existing);
			return;
		}

		var author=markups[0].payload.author, others=[];
		if (existing) {
			others=existing.filter(function(m){return m.i!=pageid || m.payload.author != author});		
		}
		for (var i=0;i<markups.length;i++) {
			markups[i].i=pageid;
		}
		others=others.concat(markups);
		var sortfunc=function(a,b) {
			//each page less than 64K
			return (a.i*65536 +a.start) - (b.i*65536 +b.start);
		}
		others.sort(sortfunc);
		cb(others,res._rev);
	});
}

var saveMarkup=function(opts,cb){
	combineMarkups(opts.db,opts.markups,opts.filename,opts.i,function(markups,rev){
		for (var i=0;i<markups.length;i++) {
			markups[i].i=opts.i;
		}
		var key="M!"+opts.i+"!"+opts.filename;
		if (markups.length) {
			opts.db.put({M:markups,_rev:rev,_id:key},function(err,response){
				cb();
			});
		} else {
			cb();
		}
	});
}
var __loadMarkups=function(db,fn,pagecount,cb) {
	var out=[],keys=[];
	for (var i=1;i<pagecount;i++) {
		keys.push("M!"+i+"!"+fn);
	}
	db.allDocs({include_docs:true,keys:keys},function(err,res){
			res.rows.map(function(r){
				if (r.error) return;
				out=out.concat(r.doc.M);
			})
			cb(out);
	});
}
var loadMarkup=function(db,fn,pageid,cb) {
	if (pageid<0) {
		__loadMarkups(db,fn,-pageid,cb);
		return;
	}
	var key="M!"+pageid+"!"+fn;
	db.get(key,function(err,res){
		cb(res.M);
	});
}
module.exports={
	saveMarkup:saveMarkup,
	loadMarkup:loadMarkup
}