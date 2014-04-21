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
var scratchpad = React.createClass({
  getInitialState: function() {
    return {bar: "world"};
  },
  render: function() {
    return (
      <div>
        Hello,{this.state.bar}
      </div>
    );
  }
});
module.exports=scratchpad;