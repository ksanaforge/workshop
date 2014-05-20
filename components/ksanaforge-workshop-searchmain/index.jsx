/** @jsx React.DOM */

var kse=Require("ksana-document").kse; 
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
    this.db.get([["fileNames"],["fileOffsets"]],true,function(res) {
      console.log(res)
    });
    return;
    kse.search(this.db,this.refs.tofind.getDOMNode().value,{},function(data){
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