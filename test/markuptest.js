var nw=debuggee.nw;
var d=debuggee.nw.window.document;

var activeSurface=function() {
	return $(d).find('[data-id="C-f_lj0001_001.kd"] .surface');
}

QUnit.asyncTest('make selection',function() {
	var surface=activeSurface();
	console.log(surface)
	equal(true,true)
	start();
});