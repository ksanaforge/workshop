
var React=require("react");
//var othercomponent=Require("other"); 
var referenceview = React.createClass({
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
module.exports=referenceview;