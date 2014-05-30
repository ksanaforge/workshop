/** @jsx React.DOM */

//var othercomponent=Require("other"); 
var about = React.createClass({
  getInitialState: function() {
    return {bar: "world"};
  },
  render: function() {
    return (
      <div>
        ABOUT KETAKA
      </div>
    );
  } 
});
module.exports=about;