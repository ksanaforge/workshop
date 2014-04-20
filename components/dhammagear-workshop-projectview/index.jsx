/** @jsx React.DOM */

//var othercomponent=Require("other"); 
var projectview = React.createClass({
  getInitialState: function() {
    return {bar: "world"};
  },
  render: function() {
    return (
      <div className="projectview">

        Projects VIEW

      </div>
    );
  }
});
module.exports=projectview;