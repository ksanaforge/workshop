var React=require("react");
var Contentnavigator=require("./contentnavigator.jsx"); 
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
  projectview:function() {
      this.props.action("projectview");
  },
  saveMarkup:function() {
    this.props.action("savemarkup");
  },  
  render: function() {
    return (
      <div>
        <button className="btn btn-success" onClick={this.projectview}>Project</button>

        <input style={{"display":"none"}} ref="fileDialog" type="file" 
        accept=".json,.js" />
        <Contentnavigator action={this.props.action}/>
        
        <BTN caption="Open File" onClick={this.chooseFile}/>
        <BTN caption="Open Markup" onClick={this.chooseFile}/>
        <BTN caption="Save Markup" onClick={this.saveMarkup}/>

      </div>
    );
  }
});
module.exports=mainmenu;