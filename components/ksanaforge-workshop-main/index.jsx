/** @jsx React.DOM */
var bootstrap=Require('bootstrap');
if (typeof $ =='undefined') $=Require('jquery');

var tabui=Require("tabui"); 

var styles=Require("styles")[0].markups;
var docview=Require("docview"); 
var imageview=Require("imageview");
var mainmenu=Require("mainmenu"); 
var devmenu=Require("devmenu"); 
var reference=Require("referenceview"); 
var projectlist=Require("projectlist"); 
var projectview=Require("projectview");
var project=Require("project");
var about=Require("about");
var searchmain=Require("searchmain");
var userlogin=Require("userlogin"); 
//sfxdfffasdfff 
var main = React.createClass({ 
  mixins:Require('kse-mixins'),
  defaultMainTabs:function(){
    try {
      this.user=JSON.parse(localStorage.getItem("user"));
    }  catch (e) {
      this.user={name:"",admin:false};
    }
    return [
    {"id":"tuser","caption":this.user.name||"Guest","content":userlogin,"active":true,
        "notclosable":true,"params":{"action":this.action,"user":this.user}},
    {"id":"projects","caption":"Projects","content":projectlist,"notclosable":true,
        "params":{"action":this.action}},
    ];
  },  
  defaultAuxTabs:function(){
    return [
      {"id":"searchtab","caption":"search","content":searchmain,
      "active":true,"notclosable":true},
    ]
  },
  getInitialState: function() {
//    var doc=persistent.open("../node_modules/ksana-document/test/daodejin.kd")
    var tabs=this.defaultMainTabs();
    var auxs=this.defaultAuxTabs();
    return {tabs:tabs, auxs:auxs,pageid:1};
  },
  onSelection:function(api,start,len) {
    if (len==0) { 
      api("toggleMarkup",start,len,{type:"fullstop"});  
    } 
  },
  componentDidMount:function() {
    this.$ksana("getUserSettings").done(function(data){
      this.setState(data);
      window.document.title=data.title;
    });
  },
  action:function() {
    var args = Array.prototype.slice.call(arguments);
    var type=args.shift();

    if (type==="setdoc") {
      this.setState({doc:args[0]});
    } else if (type=="projectview") {
      this.setState({projectview:true});
    } else if (type=="openproject") {
      var proj=args[0];
      project.openProject(proj);
      var obj={"id":"p_"+proj.shortname,"caption":proj.name,
        "content":projectview,"active":true,
        "params":{"action":this.action, "project":proj}};

      this.refs.maintab.newTab(obj);
    } else if (type=="openfile") {
      var file=args[0];
      var proj=args[1];
      var template=args[2] || "docview_default";
      var docview=Require(template);
 
      var obj={"id":"f_"+file.shortname,
        "caption":proj.shortname+'/'+file.withfoldername,
        "content":docview,"active":true,
        "params":{"action":this.action, file:file, project:proj,user:this.user}};
        this.refs.maintab.newTab(obj);
    } else if (type=="openimage") {
      var file=args[0];
      var proj=args[1];
      var obj={"id":"sourceimage",
        "caption":'source',
        "content":imageview,"active":true,
        "params":{"action":this.action, src:file, project:proj,user:this.user}};
        this.refs.auxtab.newTab(obj);
    } else if (type=="login") {
      var user=args[0];
      localStorage.setItem("user",JSON.stringify(user));
      this.setState({tabs:this.defaultMainTabs(),auxs:this.defaultAuxTabs()});
    } else if (type=="logout") {
      localStorage.setItem("user","{}");
      this.setState({tabs:this.defaultMainTabs(),auxs:this.defaultAuxTabs()});
    } else if (type=="start") {
      this.refs.maintab.goTab("projects");
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
  showdevmenu:function() {
    if (this.state.developer)return <devmenu action={this.action}/>;
    else return null;
  },
  makescrollable:function() {
    var f=this.refs.maintab.getDOMNode();
    //f.style.height='50%';
    f.style.height=document.body.offsetHeight/2-f.getBoundingClientRect().top;
  },
  componentDidUpdate:function() {
    this.makescrollable();
  },
  render:function() {
    return <div>
    {this.showdevmenu()}
    <tabui ref="maintab" tabs={this.state.tabs}/>
    <tabui ref="auxtab" tabs={this.state.auxs}/>
    </div>
  }
});
module.exports=main;