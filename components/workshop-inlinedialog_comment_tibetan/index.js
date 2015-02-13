/** @jsx React.DOM */

//var othercomponent=Require("other"); 
var inlinedialog_comment_tibetan = React.createClass({displayName: "inlinedialog_comment_tibetan",
  apply:function(e) {
    this.markup().text=this.refs.comment.getDOMNode().value;
    this.props.action("markupupdate");
  },
  keyup:function(e) {
    if (e.keyCode==27) {
      if (this.refs.comment.getDOMNode().value=="") {
          this.remove();
      } else {
        this.props.action("markupdate");  
      }      
    }
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
        React.createElement("span", null, "Comment:"), React.createElement("span", null, this.props.text), 
        React.createElement("textarea", {rows: "5", ref: "comment", className: "form-control", defaultValue: this.markup().text}), 
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
    if (this.refs.comment) this.refs.comment.getDOMNode().focus();
  },
  componentDidMount:function() {
    setTimeout(  this.focus,300);
  },
});
module.exports=inlinedialog_comment_tibetan;