/** @jsx React.DOM */

//var othercomponent=Require("other"); 
var BTN=React.createClass({
  render:function() {
    return <button className="btn btn-primary" onClick={this.props.onClick}>
    {this.props.caption}</button>
  }
})
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
  nextPage:function() {
    this.props.action("next");
  },
  saveMarkup:function() {
    this.props.action("savemarkup");
  },
  prevPage:function() {
    this.props.action("prev");
  },
  render: function() {
    return (
      <div>
        <input style={{"display":"none"}} ref="fileDialog" type="file" 
        accept=".json,.js" />
        <BTN caption="New" onClick={this.newFile}/>
        <BTN caption="Open File" onClick={this.chooseFile}/>
        <BTN caption="Open Markup" onClick={this.chooseFile}/>
        <BTN caption="Save Markup" onClick={this.saveMarkup}/>
        　
        <BTN caption="prev" onClick={this.prevPage}/>
        <BTN caption="next" onClick={this.nextPage}/>
      </div>
    );
  }
});
module.exports=mainmenu;