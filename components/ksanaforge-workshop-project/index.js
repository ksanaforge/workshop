var tibetan={
	"docview":"docview_tibetan",

	"tokenize": Require('ksana-document').tokenizers.tibetan,
	"inlinemenu": {
		"suggest":Require("inlinemenu_suggest_tibetan"),
		"revision":Require("inlinemenu_accept_tibetan"),
		"suggests":Require("inlinemenu_applychange")
	},
	"contextmenu" : Require("contextmenu_tibetan"),
	"layout":"horizontal"
}
var chinese={
	"docview":"docview_chinese",
	"tokenize":Require('ksana-document').tokenizers.simple
}
var classical={
	"docview":"docview_classical",
	"tokenize":Require('ksana-document').tokenizers.simple,
	"layout":"vertical"
}
templates={tibetan:tibetan,chinese:chinese,classical:classical};
var openProject=function(proj) {
	proj.tmpl=templates[proj.template];
	if (!proj.tmpl) throw "template not found:"+template;
	return proj; 
}
module.exports={openProject:openProject,templates:templates};