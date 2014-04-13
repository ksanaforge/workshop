/** @jsx React.DOM */

//var othercomponent=Require("other"); 
var mainmenu = React.createClass({
  getInitialState: function() {
    return {bar: "world"};
  },
  chooseFile:function () {
    var chooser = this.refs.fileDialog.getDOMNode();
    chooser.click();  
  },
  componentDidMount:function() {
    var chooser = this.refs.fileDialog.getDOMNode();
    chooser.addEventListener("change", function(evt) {
      console.log(this.value);
    }, false);
  },
  render: function() {
    return (
      <div>
        <input style={{"display":"none"}} ref="fileDialog" type="file" 
        accept=".json,.js" />
        <button className="btn btn-primary" onClick={this.newFile}>New</button>
        <button className="btn btn-primary" onClick={this.chooseFile}>Open</button>
        <button className="btn btn-primary" onClick={this.saveFile}>Save</button>
      </div>
    );
  }
});
module.exports=mainmenu;