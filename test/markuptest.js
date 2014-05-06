var ReactTestUtils = React.addons.TestUtils;
var nw=debuggee.nw;
var d=debuggee.nw.window.document;

var activeDocview=function() {
	return ReactTestUtils.findRenderedDOMComponentWithClass(debuggee.react,"docview")._owner;
}

QUnit.asyncTest('make selection',function() {
	var dv=activeDocview();
	console.log(dv)
	dv.makeSelection(22,31);
	equal(true,true)
	start();
});