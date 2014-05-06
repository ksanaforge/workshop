var ReactTestUtils = React.addons.TestUtils;
var nw=debuggee.nw;
var d=debuggee.nw.window.document;

var username="autotest";
var setAutoOpen=function() {
	localStorage.setItem(username+".lastfile",
	JSON.stringify({"project":"jiangkangyur","file":"001/lj0001_001.kd"}));
}
var loginAdmin=function() {
	var user={name:username,admin:true};
	localStorage.setItem("user",JSON.stringify(user));
}
/*
QUnit.asyncTest('login',function(){
	loginAdmin();
	nw.reload();

	setTimeout(function() {
		start();
	},200);
	equal(true,true)
});
*/
QUnit.asyncTest('open file and first page',function() {
	setAutoOpen();
	$(d).find("#btnstart").click();  //userlogin

	setTimeout(function(){
		$(d).find("#btnfirstpage").click();	
		setTimeout(function() {
  	  equal($(d).find("#pageid").val(),"1.1a");//content nagivator  	  
  	  start();
  	}, 300);
	},300);	
});

QUnit.asyncTest("last page",function(){
	$(d).find("#btnlastpage").click();	
  setTimeout(function(){
  	equal($(d).find("#pageid").val(),"1.17a");//content nagivator
  	start();	
  },200);

})

QUnit.test("markuptest",function(){
	setTimeout(function(){
		Require("test/markuptest.js")	
	},100);
	equal(true,true)

})