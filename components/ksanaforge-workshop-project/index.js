var tibetan={
	"docview":"docview_tibetan",

	"tokenize": Require('ksana-document').tokenizers.tibetan,
	"inlinemenu": {
		"suggest":Require("inlinemenu_suggest_tibetan"),
		"revision":Require("inlinemenu_accept_tibetan"),
		"suggests":Require("inlinemenu_applychange")
	},
	"contextmenu" : Require("contextmenu_tibetan")
}
var chinese={
	"docview":"docview_chinese",
	"tokenize":Require('ksana-document').tokenizers.simple
}
templates={tibetan:tibetan,chinese:chinese};
var openProject=function(proj) {
	proj.tmpl=templates[proj.template];
	return proj;
}
module.exports={openProject:openProject,templates:templates};