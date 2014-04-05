/** @jsx React.DOM */

var docview=Require("docview"); 
//sfxdfffasdfff
var main = React.createClass({
  getInitialState: function() {
    return {bar: "world2"};
  },
  moveImageViewer:function() {
    if (!this.new_win) return;
    //this.new_win.resizeTo(100,100);
    //this.new_win.resizeTo();
    var d=this.new_win.window.document;
    d.getElementById("test").innerHTML="test"
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
  render: function() {
    return (
      <div>
        <docview/>
        Hello,{this.state.bar}
        <button onClick={this.openImageViewer}>Open Image Viewer</button>
        <button onClick={this.closeImageViewer}>Close Image Viewer</button>
        <button onClick={this.moveImageViewer}>move window</button>
      </div>
    );
  }
});
module.exports=main;