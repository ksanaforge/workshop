var React=require("react");
//var surfacetest=require("./surfacetest");

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
  openFiles:function() { //platform dependent

  },
  maintest:function() {
    var gui = nodeRequire('nw.gui');
    if (this.tester) this.tester.close(true);

    var tester = gui.Window.get(
      window.open('../test.html')
    );

    tester.on("loaded",function(){
      var res=tester.window.startdebugger(
        "workshop", { nw: gui.Window.get() , react:ksana.mainComponent});

      tester.moveTo(1920,-350);
      tester.resizeTo(550,950);
    })
    this.tester=tester;
    
  },
  
  surfacetest:function() {
   // React.renderComponent(surfacetest(),document.getElementById("main"));
  },
  moveWindow:function() {
    //if (!this.new_win) return;
    var gui = nodeRequire('nw.gui');
    var win = gui.Window.get();
    //home
    win.moveTo(1920,-500);
     win.resizeTo(1080,500);
    //office
    win.moveTo(2460,-350)
    win.resizeTo(1380,900);
    //this.new_win.resizeTo();
    //var d=this.new_win.window.document;
    //d.getElementById("test").innerHTML="test"
  },
  render: function() {
    return (
      <div>
        <button onClick={this.moveWindow}>move window</button>
        <button onClick={this.surfacetest}>surface test</button>
        <button onClick={this.maintest}>main test</button>
      </div>
    );
  }
});
module.exports=devmenu;