/** @jsx React.DOM */

//var othercomponent=Require("other"); 
var referenceview = React.createClass({displayName: "referenceview",
  getInitialState: function() {
    return {bar: "world"};
  },
  render: function() {
    return (
      React.createElement("div", null, 
        "Hello,", this.state.bar
      )
    );
  }
});
module.exports=referenceview;