/** @jsx React.DOM */

//var othercomponent=Require("other"); 
var docview_classical = React.createClass({
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
module.exports=docview_classical;