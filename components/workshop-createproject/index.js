/** @jsx React.DOM */

//var othercomponent=Require("other"); 
var createproject = React.createClass({displayName: "createproject",
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
module.exports=createproject;