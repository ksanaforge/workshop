/** @jsx React.DOM */
var kse=Require("ksana-document").kse; 
var kde=Require("ksana-document").kde; 
var searchmain = React.createClass({
  mixins: Require('kse-mixins'), 
  shouldComponentUpdate:function(nextProps,nextState) {
    if (this.db && this.db.activeFile!=this.activeFile) {
      this.dosearch(false);
      return false;
    } 
    return (nextState.output!=this.state.output );
  },
  componentDidMount:function() {
    if (!this.props.db) return;
    this.db=kde.open(this.props.db);
    this.db.setContext(this);
  }, 
  getInitialState: function() {
    return {bar: "world", output:""};
  },
  dosearch:function(e) {
    if (!this.db)return;
    var range=null;
    if (this.activeFile!=this.db.activeFile && this.db.activeFile) {
      range=this.db.fileOffset(this.db.activeFile);
    }
    this.activeFile=this.db.activeFile;

    kse.search(this.db,this.refs.tofind.getDOMNode().value,{range:range},function(data){
      this.db.activeQuery=data;
      if (e) {
          this.props.action("newquery",this.props.db,data);
          this.setState({output:data}); 
      }
      
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