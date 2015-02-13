/** @jsx React.DOM */

//var othercomponent=Require("other"); 
var inlinedialog_accept_tibetan = React.createClass({displayName: "inlinedialog_accept_tibetan",
  apply:function(e) {
    this.props.action("markupupdate");
  },
  keyup:function(e) {
    if (e.keyCode==13)  this.apply(e);
    else if (e.keyCode==27) this.props.action("markupdate");
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
  contributor:function() {
    if (this.markup().contributor){
      return  React.createElement("span", {className: "input-group input-group-md"}, 
          React.createElement("span", {className: "input-group-addon"}, "contributor"), 
          React.createElement("input", {className: "form-control", readonly: "true", value: this.markup().contributor})
        )
    } else return null;
  },
  render: function() {
    return ( 
      React.createElement("div", {onKeyUp: this.onkeyup, className: "inlinedialog well"}, 
        React.createElement("span", null, this.props.text), 
        React.createElement("span", {className: "input-group input-group-md"}, 
          React.createElement("span", {className: "input-group-addon"}, "New text"), 
          React.createElement("input", {className: "form-control", value: this.markup().text}), 
          React.createElement("span", {className: "input-group-addon"}, React.createElement("input", {checked: this.markup().insert, type: "checkbox"}))
        ), 
        this.contributor(), 

        React.createElement("span", {className: "row"}, 
          React.createElement("span", {className: "col-sm-4"}, 
            React.createElement("button", {className: "form-control btn btn-warning", onClick: this.remove}, "Reset")
          ), 
          React.createElement("span", {className: "col-sm-8"}, 
            React.createElement("button", {className: "pull-right form-control btn btn-success", onClick: this.apply}, "Ok")
          )
        )

      )
    );
  },
  focus:function() {
    if (this.refs.inputtext) this.refs.inputtext.getDOMNode().focus();
  },
  componentDidMount:function() {
    setTimeout(  this.focus,300);
  },
});
module.exports=inlinedialog_accept_tibetan;