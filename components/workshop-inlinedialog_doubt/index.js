/** @jsx React.DOM */

//var othercomponent=Require("other"); 
var inlinedialog_doubt = React.createClass({displayName: "inlinedialog_doubt",
  getInitialState: function() {
    return {bar: "world"};
  },
  apply:function(e) {
    this.props.markup.reason=this.refs.reason.getDOMNode().value;
    this.props.markup.text=this.refs.inputtext.getDOMNode().value;
    this.props.markup.insert=this.refs.cbinsert.getDOMNode().checked && this.props.markup.text.length;
    this.props.action("markupupdate");
  },
  clear:function() {
    var n=this.refs.inputtext.getDOMNode();
    n.focus();
    n.value="";
  },
  render: function() {
    return ( 
      React.createElement("div", {className: "well"}, 

        React.createElement("span", {className: "input-group input-group-lg"}, 
          React.createElement("span", {className: "input-group-addon", onClick: this.clear}, "\u2573"), 
          React.createElement("input", {ref: "inputtext", onMouseOver: this.movemove, className: "focus form-control", defaultValue: this.props.markup.text}), 
          React.createElement("span", {className: "input-group-addon"}, React.createElement("input", {onChange: this.apply, ref: "cbinsert", defaultChecked: this.props.markup.insert, type: "checkbox"}))
        ), 
        React.createElement("span", {className: "input-group input-group-lg"}, 
          React.createElement("span", {className: "input-group-addon"}, "Reason"), 
          React.createElement("textarea", {rows: "5", ref: "reason", className: "form-control", defaultValue: this.props.markup.reason})
        ), 
        React.createElement("button", {className: "form-control btn btn-success", onClick: this.apply}, "Apply")
      )
    );
  },
  componentDidMount:function() {
    this.refs.inputtext.getDOMNode().focus();
  },
  componentDidUpdate:function() {
    this.refs.inputtext.getDOMNode().focus();
  }  
});
module.exports=inlinedialog_doubt;