/** @jsx React.DOM */

//var othercomponent=Require("other"); 
var inlinedialog_suggest_tibetan = React.createClass({displayName: "inlinedialog_suggest_tibetan",
  apply:function() {    
    var text=this.refs.inputtext.getDOMNode().value;
    if (this.props.text==text) {
      this.remove(); //no chances
    } else {
      this.markup().text=text;  
      this.markup().reason=this.refs.reason.getDOMNode().value;
    }
    this.props.action("markupupdate");
  },
  keyup:function(e) {
    if (e.keyCode==13)  this.apply(e);
    else if (e.keyCode==27) {
      if (this.refs.inputtext.getDOMNode().value==this.props.text) {
        this.props.action("removemarkup",this.props.markup);
      } else {
        this.props.action("markupdate");  //cancel
      }
    }
  }, 
  clear:function() {
    var n=this.refs.inputtext.getDOMNode();
    n.focus();
    n.value="";
  },
  remove:function() {
    this.props.action("removemarkup",this.props.markup);
  },
  markup:function() {
    return this.props.markup.payload;
  },
  render: function() {
    return (
      React.createElement("div", {onKeyUp: this.keyup, className: "inlinedialog well"}, 
        React.createElement("span", null, this.props.text), 
        React.createElement("span", {className: "input-group input-group-lg"}, 
          React.createElement("span", {className: "input-group-addon", onClick: this.clear}, "\u2573"), 
          React.createElement("input", {ref: "inputtext", type: "text", onMouseOver: this.movemove, className: "input-lg focus form-control ", onKeyPress: this.change, defaultValue: this.markup().text})
        ), 
        React.createElement("span", {className: "input-group input-group-lg"}, 
          React.createElement("span", {className: "input-group-addon"}, "Reason"), 
          React.createElement("textarea", {rows: "5", ref: "reason", className: "form-control", defaultValue: this.markup().reason})
        ), 
        React.createElement("span", {className: "row"}, 
          React.createElement("span", {className: "col-sm-4"}, 
            React.createElement("button", {className: "form-control btn btn-danger", onClick: this.remove}, "Remove")
          ), 
          React.createElement("span", {className: "col-sm-8"}, 
            React.createElement("button", {className: "pull-right form-control btn btn-success", onClick: this.apply}, "Ok")
          )
        )

      )
    );
  },
  focus:function() {
    if (this.refs.inputtext) {
      var dn=this.refs.inputtext.getDOMNode();
      dn.focus();
      dn.selectionStart=dn.selectionEnd;
    }
  },
  componentDidMount:function() {
    setTimeout(  this.focus,300);
  },
});
module.exports=inlinedialog_suggest_tibetan;