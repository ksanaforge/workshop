/** @jsx React.DOM */

//var othercomponent=Require("other"); 
var devmenu = React.createClass({
  getInitialState: function() {
    return {bar: "world"};
  },
  closeImageViewer:function() {
    if (!this.new_win) return;
    this.new_win.close();
  },
  openImageViewer:function() {
    var gui = nodeRequire('nw.gui'); 
    this.new_win = gui.Window.get(
      window.open('imageviewer.html')
    );
    this.new_win.isFullscreen=true; 
  }, 
  moveWindow:function() {
    //if (!this.new_win) return;
    var gui = nodeRequire('nw.gui');
    var win = gui.Window.get();
    win.moveTo(1920,-500)
    win.resizeTo(1080,500);
    //this.new_win.resizeTo();
    //var d=this.new_win.window.document;
    //d.getElementById("test").innerHTML="test"
  },
  render: function() {
    return (
      <div>
        <button onClick={this.moveWindow}>move window</button>
      </div>
    );
  }
});
module.exports=devmenu;