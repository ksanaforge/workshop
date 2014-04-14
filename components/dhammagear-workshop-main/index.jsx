/** @jsx React.DOM */
var contextmenu=Require("contextmenu");
var styles=Require("styles")[0].markups;
var docview=Require("docview"); 
var mainmenu=Require("mainmenu"); 
var devmenu=Require("devmenu"); 
var persistent=Require('ksana-document').persistent;
//sfxdfffasdfff
var main = React.createClass({
  getInitialState: function() {
    var doc=persistent.open("../node_modules/ksana-document/test/daodejin.kd")
    return {bar: "world2", doc:doc, pageid:1};
  },
  onSelection:function(api,start,len) {
    if (len==0) { 
      api("toggleMarkup",start,len,{type:"fullstop"});  
    } 
  },
  action:function() {
    var args = Array.prototype.slice.call(arguments);
    var type=args.shift();

    if (type==="setdoc") {
      this.setState({doc:args[0]});
    } else if (type==="prev") {
      if (this.state.pageid>1) this.setState({pageid: this.state.pageid-1});
    } else if (type==="next") {
      if (this.state.pageid<this.state.doc.pageCount-1) {
        this.setState({pageid: this.state.pageid+1});
      }
    }
  },
  page:function() {
    return this.state.doc.getPage(this.state.pageid);
  },
  render: function() {
    return (
      <div>
        <devmenu action={this.action}/>
        <mainmenu action={this.action}/>
        <docview 
          page={this.page()} 
          menu={contextmenu} 
          styles={styles}
          onSelection={this.onSelection}
        />
      </div>
    );
  }
});
module.exports=main;