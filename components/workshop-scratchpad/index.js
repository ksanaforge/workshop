/** @jsx React.DOM */
/*
  text editor before putting into database

  spell check,  text quality check, LINT for text file
  remove unwanted chars 
  use content-editable to allow free editing
  must give a pagename
  limit size to 4KB
  paste from

*/
//var othercomponent=Require("other"); 
var scratchpad = React.createClass({displayName: "scratchpad",
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
module.exports=scratchpad;