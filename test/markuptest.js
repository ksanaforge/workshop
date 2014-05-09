var ReactTestUtils = React.addons.TestUtils;
var nw=debuggee.nw;
var d=debuggee.nw.window.document;

var activeDocview=function() {
	return ReactTestUtils.findRenderedDOMComponentWithClass(debuggee.react,"docview")._owner;
}
/*
  need to define interface for user action (state change)
  http://stackoverflow.com/questions/20412505/how-do-i-simulate-browser-events-when-writing-tests-for-react-js
	decouple state change from user event.
	
  array of action like token forth, next action when state transit.

	open/go tab  (by filename)
	change display mode
	navigation
	get active tab
	makeselection
  move caret / get caret
  perform markup action


*/
QUnit.asyncTest('make selection',function() {
	var dv=activeDocview();
	console.log(dv)
	dv.makeSelection(22,31);
	equal(true,true)
	start();
});