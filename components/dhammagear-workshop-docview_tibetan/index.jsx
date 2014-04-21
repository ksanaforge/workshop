/** @jsx React.DOM */

//var othercomponent=Require("other"); 
var contextmenu=Require("contextmenu");
var styles=Require("styles")[0].markups;
var docview=Require("docview");
var docview_tibetan = React.createClass({
  mixins: Require('kse-mixins'),
  getInitialState: function() {
    return {doc:null,pageid:1};
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