/** @jsx React.DOM */
var bootstrap=Require('bootstrap');
if (typeof $ =='undefined') $=Require('jquery');

var tabui=Require("tabui"); 
var contextmenu=Require("contextmenu");
var styles=Require("styles")[0].markups;
var docview=Require("docview"); 
var mainmenu=Require("mainmenu"); 
var devmenu=Require("devmenu"); 
var reference=Require("referenceview"); 
var projectlist=Require("projectlist"); 
var projectview=Require("projectview");
var about=Require("about");
var persistent=Require('ksana-document').persistent;
//sfxdfffasdfff 
var main = React.createClass({ 
  getInitialState: function() {
    var doc=persistent.open("../node_modules/ksana-document/test/daodejin.kd")
    var tabs=[ 
      {"id":"t123","caption":"Projects","content":projectlist,"active":true,"notclosable":true},
   //   {"id":"t4","caption":"About","content":about,"notclosable":true},
//      {"id":"t456","caption":"yyy","content":docview,"params":{"msg":"hello"}},
//      {"id":"t789","caption":"zzz","content":rtab,"params":{"msg":"hello222"}}
    ];
    return {bar: "world2", doc:doc, tabs:tabs,pageid:1};
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
    } else if (type==="savemarkup") {
      persistent.saveMarkup(this.state.doc,function(){
        console.log("saved!!!")
      }); 
    } else if (type=="projectview") {
      this.setState({projectview:true});
    }
  },
  page:function() {
    return this.state.doc.getPage(this.state.pageid);
  },
  projectview:function() {
    if (this.state.projectview) {
      return <div>
          <projectview ref="projectview"/>
        </div>
    } else {
      return null;
    }
  },
  componentDidUpdate:function() {
    if (this.state.projectview) {
      $(this.refs.projectview.getDOMNode()).modal();
    }
  },
  newtab:function() {
    this.state.tabs.push( {"id":"t5","caption":"About","content":about,"notclosable":true})
    this.forceUpdate();
  },
   //<button onClick={this.newtab}>newtab</button>
  render:function() {
    return <div>
    <tabui ref="maintab" tabs={this.state.tabs}/>
   
    </div>
  }
  /*
  render: function() {
    return (
      <div>
        {this.projectview()}
        <devmenu action={this.action}/>
        <mainmenu action={this.action}/>
        <div className="row">
          <div className="col-md-8">
          <docview 
            page={this.page()} 
            menu={contextmenu} 
            styles={styles}
            onSelection={this.onSelection}
          ></docview>
          </div>
          <div  className="col-md-4">
          <reference/>
          </div>
        </div>
      </div>
    );
  }
  */
});
module.exports=main;