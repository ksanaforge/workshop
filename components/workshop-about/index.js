/** @jsx React.DOM */

//var othercomponent=Require("other"); 
var about = React.createClass({displayName: "about",
  getInitialState: function() {
    return {bar: "world"};
  },
  render: function() {
    return (
      React.createElement("div", null, 
        "ABOUT KETAKA"
      )
    );
  } 
});
module.exports=about;