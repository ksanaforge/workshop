/** @jsx React.DOM */

//var othercomponent=Require("other"); 
var contextmenu=Require("contextmenu");
var styles=Require("styles")[0].markups;
var docview=Require("docview");
var contentnavigator=Require("contentnavigator");
var docview_tibetan = React.createClass({
  mixins: Require('kse-mixins'),
  getInitialState: function() {
    return {doc:null,pageid:1};
  },
  action:function(type) {
    var args = Array.prototype.slice.call(arguments);
    var type=args.shift();

    var pageid=this.state.pageid;
    if (type=="next") {
      if (pageid+1<this.state.doc.pageCount) this.setState({pageid:pageid+1});
    } else if (type=="prev") {
      if (pageid>1) this.setState({pageid:pageid-1});
    } else if (type=="first") {
      this.setState({pageid:1});
    } else if (type=="last") {
      this.setState({pageid:this.state.doc.pageCount-1});
    } else if (type=="gopage") {
      var page=this.state.doc.pageByName(args[0])
      if (page) this.setState({pageid:page.id});
    }
  },
  componentDidMount:function() {
    this.$yase("openDocument",this.props.file.path).done(function(data){
      this.setState({doc:data});
    });
  },
  page:function() {
    if (!this.state.doc) return null;
    return this.state.doc.getPage(this.state.pageid);
  },
  onSelection:function(api,start,len) {
    if (len==0) { 
     // api("toggleMarkup",start,len,{type:"fullstop"});  
    } 
  },

  render: function() {
    return (
      <div>
        <contentnavigator page={this.page()} action={this.action}/>
        <docview 
            page={this.page()} 
            tokenizer={this.props.project.tokenizer}
            menu={contextmenu} 
            styles={styles}
            onSelection={this.onSelection}
          ></docview>
      </div>
    );
  }
});
module.exports=docview_tibetan;