/** @jsx React.DOM */

//var othercomponent=Require("other"); 
var BTN=React.createClass({
  render:function() {
    return <button className="btn btn-primary" onClick={this.props.onClick}>
    {this.props.caption}</button>
  }
})
var contentnavigator = React.createClass({

  getInitialState: function() {
    return {bar: "world"};
  },
  nextPage:function() {
    this.props.action("next");
  },

  prevPage:function() {
    this.props.action("prev");
  },
  render: function() {
    return (
      <span>
        　
        <BTN caption="prev" onClick={this.prevPage}/>
        <BTN caption="next" onClick={this.nextPage}/>
      </span>
    );
  }
});
module.exports=contentnavigator;