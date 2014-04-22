var tibetan={
	"docview":"docview_tibetan",

	"tokenize": Require('ksana-document').tokenizers.tibetan,
	"inlinemenu": {
		"suggest":Require("inlinemenu_suggest_tibetan"),
		"changes":Require("inlinemenu_applychange")
	},
	"contextmenu" : Require("contextmenu")
}
templates={tibetan:tibetan};
var openProject=function(proj) {
	proj.tmpl=templates[proj.template];
	return proj;
}
module.exports={openProject:openProject};