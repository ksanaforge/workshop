/** @jsx React.DOM */

//var othercomponent=Require("other"); 
var inlinedialog_makelink = React.createClass({displayName: "inlinedialog_makelink",
  getInitialState: function() {
    return {bar: "world"};
  },
  apply:function() {
    this.props.action("makelink",this.props.page,this.props.linktarget,this.props.linksource);
  },
  cancel:function() {
    this.props.action("markupupdate");
  },
  render: function() {
    return ( 
      React.createElement("div", {className: "well"}, 
        React.createElement("span", {className: "input-group input-group-lg"}, 
          React.createElement("span", {className: "input-group-addon"}, "Makelink")
        ), 

        React.createElement("span", {className: "row"}, 
          React.createElement("span", {className: "col-sm-4"}, 
            React.createElement("button", {className: "form-control btn btn-danger", onClick: this.cancel}, "Cancel")
          ), 
          React.createElement("span", {className: "col-sm-8"}, 
            React.createElement("button", {className: "pull-right form-control btn btn-success", onClick: this.apply}, "Create Link")
          )
        )

      )
    );
  }
});
module.exports=inlinedialog_makelink;