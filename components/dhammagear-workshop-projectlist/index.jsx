/** @jsx React.DOM */

//var othercomponent=Require("other"); 

var projectlist = React.createClass({
  mixins: Require('kse-mixins'),
  getInitialState: function() {
    return {bar: "world"};
  },
  componentDidMount:function() {
    this.$yase('enumProject').done(function(res){
      this.setState({projects:res});
    })
  },
  render: function() {
    return (
      <div>
        {this.state.projects}
        Hello,{this.state.bar}
      </div>
    );
  }
});
module.exports=projectlist;