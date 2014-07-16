var project_settings={"swjz":require("./swjz.js")};
var tibetan={
	"docview":"docview_tibetan"
	,"tokenize": Require('ksana-document').tokenizers.tibetan
	,"inlinedialog": {
		"suggest":Require("inlinedialog_suggest_tibetan")
		,"comment":Require("inlinedialog_comment_tibetan")
		,"revision":Require("inlinedialog_accept_tibetan")
		,"suggests":Require("inlinedialog_applychange")
	}
	,"contextmenu" : Require("contextmenu_tibetan")
	,"layout":"horizontal"
	,"navigator":"nav_tibetan"
}
var chinese={
	"docview":"docview_chinese",
	"tokenize":Require('ksana-document').tokenizers.simple,
}
var classical={
	"docview":"docview_classical"
	,"tokenize":Require('ksana-document').tokenizers.simple
	,"inlinedialog": {
		"suggest":Require("inlinedialog_suggest_tibetan")
	}
	,"makelinkdialog" : Require("inlinedialog_makelink")
	,"contextmenu" : Require("contextmenu_classical")
	,"layout":"vertical"
	,"typeset":Require('ksana-document').typeset.classical
	,"navigator":"nav_classical"
	,"linebreak":"※"
}

var templates={tibetan:tibetan,chinese:chinese,classical:classical};
var openProject=function(proj) {
	proj.tmpl=templates[proj.template];
	proj.setting=project_settings[proj.name];
	if (!proj.tmpl) throw "template not found:"+proj.template;
	return proj; 
}

module.exports={openProject:openProject,templates:templates};