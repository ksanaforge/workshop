/** @jsx React.DOM */

//var othercomponent=Require("other"); 
var comp1 = React.createClass({displayName: "comp1",
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
module.exports=comp1;