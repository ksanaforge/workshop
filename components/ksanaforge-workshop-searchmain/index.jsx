/** @jsx React.DOM */

var kse=Require("ksana-document").kse; 
var kde=Require("ksana-document").kde; 
var searchmain = React.createClass({
  mixins: Require('kse-mixins'), 
  componentDidMount:function() {
    if (!this.props.db) return;
    this.db=kde.open(this.props.db);
    this.db.setContext(this);
  },
  getInitialState: function() {
    return {bar: "world", output:""};
  },
  dosearch:function() {
    if (!this.db)return;
    this.db.get([["fileNames"],["fileOffsets"]],true,function(res) {
      console.log(res)
    });
    kse.search(this.db,this.refs.tofind.getDOMNode().value,{},function(data){
      this.setState({output:data}); 
      this.db.activeQuery=data;
      this.props.action("newquery",this.props.db,data);
    });
  },
  render: function() {
    return (
      <div>
        <input ref="tofind" defaultValue="ཕྱག་"></input>
        <button onClick={this.dosearch}>Search</button>
        <div>{this.state.output}</div>
      </div>
    );
  }
});
module.exports=searchmain;