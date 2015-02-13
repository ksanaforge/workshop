//var boot=require("boot");
//boot("ksanaforge-workshop","main","main");

var React=require("react");
var runtime=require("ksana2015-webruntime");
runtime.boot("workshop",function(){
	var Main=React.createElement(require("./src/main.jsx"));
	ksana.mainComponent=React.render(Main,document.getElementById("main"));
});