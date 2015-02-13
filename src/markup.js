/*
	merge needs token offset, not char offset
*/
var splitDelete=function(m) {
	var out=[];
	for (i=0;i<m.l;i++) {
		var m2=JSON.parse(JSON.stringify(m));
		m2.s=m.s+i;
		m2.l=1;
		out.push(m2);
	}
	return out;
}
var quantize=function(markup) {
	var out=[],i=0,m=JSON.parse(JSON.stringify(markup));
	if (m.payload.insert) {
			m.s=m.s+m.l-1;
			m.l=1;
			out.push(m)
	} else {
		if (m.payload.text=="") { //delete
			out=splitDelete(m);
		} else { //replace
			if (m.l>1) {//split to delete and replace
				var m2=JSON.parse(JSON.stringify(m));
				m.payload.text="";
				m.l--;
				out=splitDelete(m);
				m2.s=m2.s+m2.l-1;
				m2.l=1;
				out.push(m2);
			} else {
				out.push(m);
			}
		}
	}
	return out;
}
var plural={
	"suggest":"suggests"
}
var combinable=function(p1,p2) {
	var t="";
	for (var i=0;i<p1.choices.length;i++) t+=p1.choices[i].text;
	for (var i=0;i<p2.choices.length;i++) t+=p2.choices[i].text;
	return (t==="");
}
var combine=function(markups) {
	var out=[],i=1,at=0;

	while (i<markups.length) {
		if (combinable(markups[at].payload,markups[i].payload)) {
			markups[at].l++;
		} else {
			out.push(markups[at]);
			at=i;
		}
		i++;
	}
	out.push(markups[at]);
	return out;
}
var merge=function(markups,type){
	var out=[],i=0;
	for (i=0;i<markups.length;i++) {
		if (markups[i].payload.type===type)	out=out.concat(quantize(markups[i]));
	}
	var type=plural[type];
	if (typeof type=="undefined") throw "cannot merge "+type;
	if (!out.length) return [];
	out.sort(function(a,b){return a.s-b.s;});
	var out2=[{s:out[0].s, l:1, payload:{type:type,choices:[out[0].payload]}}];
	for (i=1;i<out.length;i++) {
		if (out[i].s===out2[out2.length-1].s ) {
			out2[out2.length-1].payload.choices.push(out[i].payload);
		} else {
			out2.push({s:out[i].s,l:1,payload:{type:type,choices:[out[i].payload]}});
		}
	}
	return combine(out2);
}
var addTokenOffset=function(markups,offsets) {
	for (var i=0;i<markups.length;i++) {
		var m=markups[i],at,at2;
		at=offsets.indexOf(m.start); //need optimized
		if (m.len) at2=offsets.indexOf(m.start+m.len);
		if (at==-1 || at2==-1) {
			console.trace("markup position not at token boundary");
			break;
		}

		m.s=at;
		if (m.len) m.l=at2-at;
	}
	return markups;
}

var applyTokenOffset=function(markups,offsets) {
	for (var i=0;i<markups.length;i++) {
		var m=markups[i];
		m.start=offsets[m.s];
		m.len=offsets[m.s+m.l] - offsets[m.s];
		delete m.s;
		delete m.l;
	}
	return markups;
}

var suggestion2revision=function(markups) {
	var out=[];
	for (var i=0;i<markups.length;i++) {
		var m=markups[i];
		var payload=m.payload;
		if (payload.insert) {
			out.push({start:m.start+m.len,len:0,payload:payload});
		} else {
			out.push({start:m.start,len:m.len,payload:payload});
		}
	}
	return out;
}

var strikeout=function(markups,start,len,user,type) {
	var payload={type:type,author:user,text:""};
	markups.push({start:start,len:len,payload:payload});
}
module.exports={merge:merge,quantize:quantize,
	addTokenOffset:addTokenOffset,applyTokenOffset:applyTokenOffset,
	strikeout:strikeout, suggestion2revision : suggestion2revision
}