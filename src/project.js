var project_settings={};
var tibetan={
	"docview":"docview_tibetan"
	,"tokenize": require('ksana-analyzer').getAPI('tibetan1').tokenize
	,"inlinedialog": {
		"suggest":require("./inlinedialog_suggest_tibetan.jsx")
		,"comment":require("./inlinedialog_comment_tibetan.jsx")
		,"revision":require("./inlinedialog_accept_tibetan.jsx")
		,"suggests":require("./inlinedialog_applychange.jsx")
	}
	,"contextmenu" : require("./contextmenu_tibetan.jsx")
	,"layout":"horizontal"
	,"navigator":"nav_tibetan"
	,"admin_viewable_tags" :["comment"]
	,"surface_elements": {
		"comment" : require("./element_comment_tibetan.jsx")
	}
}
var chinese={
	"docview":"docview_chinese",
	"tokenize":require('ksana-analyzer').getAPI('simple1').tokenize
}
var classical={
	"docview":"docview_classical"
	,"tokenize":require('ksana-analyzer').getAPI('simple1').tokenize
	,"inlinedialog": {
		"suggest":require("./inlinedialog_suggest_tibetan.jsx")
	}
	,"makelinkdialog" : require("./inlinedialog_makelink.jsx")
	,"contextmenu" : require("./contextmenu_classical.jsx")
	,"layout":"vertical"
	//,"typeset":require('./typeset').classical
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