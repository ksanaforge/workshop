/** @jsx React.DOM */

var Contentnavigator=Require("contentnavigator"); 
var BTN=React.createClass({displayName: "BTN",
  render:function() {
    return React.createElement("button", {className: "btn btn-primary", onClick: this.props.onClick}, 
    this.props.caption)
  }
})
var mainmenu = React.createClass({displayName: "mainmenu",
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
      React.createElement("div", null, 
        React.createElement("button", {className: "btn btn-success", onClick: this.projectview}, "Project"), 

        React.createElement("input", {style: {"display":"none"}, ref: "fileDialog", type: "file", 
        accept: ".json,.js"}), 
        React.createElement(Contentnavigator, {action: this.props.action}), 
        
        React.createElement(BTN, {caption: "Open File", onClick: this.chooseFile}), 
        React.createElement(BTN, {caption: "Open Markup", onClick: this.chooseFile}), 
        React.createElement(BTN, {caption: "Save Markup", onClick: this.saveMarkup})

      )
    );
  }
});
module.exports=mainmenu;