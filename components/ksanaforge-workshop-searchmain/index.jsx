/** @jsx React.DOM */

var kde=Require("ksana-document").kde; 
var searchmain = React.createClass({
  mixins: Require('kse-mixins'), 
  componentDidMount:function() {
    this.db=kde.open("ccc");
    this.db.setContext(this);
  },
  getInitialState: function() {
    return {bar: "world", output:""};
  },
  dosearch:function() {
    this.db.get(["tokens","君"],function(data){
      this.setState({output:data});  
    });
  },
  render: function() {
    return (
      <div>
        <input ref="tofind" defaultValue="君子"></input>
        <button onClick={this.dosearch}>Search</button>
        <div>{this.state.output}</div>
      </div>
    );
  }
});
module.exports=searchmain;