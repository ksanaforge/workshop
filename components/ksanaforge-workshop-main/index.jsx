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
var buildindex=Require("buildindex");
var Kde=Require("ksana-document").kde;
//sfxdfffasdfff 

//disable system right click menu
window.document.oncontextmenu = function(e){
    return false;
}
window.onbeforeunload = function(event){
        return console.trace("reload")
};

var main = React.createClass({ 
  mixins:Require('kse-mixins'),
  searchtab:0,
  defaultMainTabs:function(){
    var tabs=[
      {"id":"tuser","caption":this.user.name||"Guest","content":userlogin,"active":true,
        "notclosable":true,"params":{"action":this.action,"user":this.user,"getError":this.getError}}
    ];
    if (this.user.name) {
      tabs.push({"id":"projects","caption":"Projects","content":projectlist,"notclosable":true,
        "params":{"action":this.action}});
    }
    return tabs;
  },
  getError:function() {
    return this.state.error;
  },
  defaultAuxTabs:function(db){
    var auxs=[
      {"id":"about","caption":"About", "content":about,
      "active":true,"notclosable":true,"param":{"action":this.action,"user":this.user}}
      ];
    return auxs;
  },
  getInitialState: function() {
    try {
      this.user=JSON.parse(localStorage.getItem("user"));      
    }  catch (e) {
      this.user={name:"",admin:false};
    }
    if (!this.user) this.user={name:"",admin:false};

    var tabs=this.defaultMainTabs();
    var auxs=this.defaultAuxTabs();

    return {settings:{},tabs:tabs, auxs:auxs,pageid:1,error:"",db:null};
  },
  componentDidMount:function() {
    if (!this.state.settings) {
      this.$ksana("getUserSettings").done(function(data){
        this.setState({settings:data});
        window.document.title=data.title + ', build '+data.buildDateTime;
      });      
    }
  },
  newsearchtab:function(proj) {
      var auxs=this.state.auxs;
      for (var i=0;i<auxs.length;i++) {
        if (auxs[i].dbid==proj.name) return;
      }
      auxs.push({"id":"searchtab"+(this.searchtab++),"caption":"Search "+proj.shortname, 
        "content":searchmain,"active":true,dbid:proj.shortname
        , "params":{"action":this.action, "project":proj, "db":proj.shortname }});

      this.setState({"layout":proj.tmpl.layout,"db":proj.shortname,"auxs":auxs});
  },
  action:function() {
    var args = Array.prototype.slice.call(arguments);
    var type=args.shift();
    
    if (type==="setdoc") {
      this.setState({doc:args[0]});
    } else if (type=="openproject") {
      var proj=args[0];
      var autoopen=args[1];
      project.openProject(proj);
      var that=this;
      Kde.open(proj.shortname,function(kde){
        var obj={"id":"p_"+proj.shortname,"caption":proj.name,dbid:proj.shortname,
          "content":projectview,"active":true,
          "params":{"action":that.action, "project":proj, "autoopen":autoopen, "kde":kde }};
        kde.setContext(that);
        that.newsearchtab(proj);
        that.refs.maintab.newTab(obj); 
      });
    } else if (type=="newquery") {
      //var dbid=args[0];
      //var query=args[1];
      this.forceUpdate();
      //this.setState({});//this.notifyDb(dbid,"newquery",query);
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
      var pagename=args[1];
      var proj=args[2];
      var obj={"id":"sourceimage",
        "caption":'source',
        "content":imageview,"active":false,
        "params":{"action":this.action, src:file,
         project:proj,user:this.user,pagename:pagename}};
        this.refs.auxtab.newTab(obj);
    } else if (type=="login") {
      var name=args[0];
      var encrypted=args[1];
      this.$ksana("login",{name:name,pw:encrypted}).done(function(res) {
        if (res.error=="") {
          localStorage.setItem("user",JSON.stringify(res));
          this.user=JSON.parse(localStorage.getItem("user"));  
          this.setState({tabs:this.defaultMainTabs(),auxs:this.defaultAuxTabs()});          
        }
        this.setState({error:res.error});
      });
    } else if (type=="logout") {
      localStorage.setItem("user","{}");
      this.user=JSON.parse(localStorage.getItem("user")); 
      this.setState({tabs:this.defaultMainTabs(),auxs:this.defaultAuxTabs()});
    } else if (type=="start") {
      var lastfile=localStorage.getItem(this.user.name+".lastfile");
      if (lastfile) lastfile=JSON.parse(lastfile);
      else lastfile={file:"",project:""};
      this.refs.maintab.goTab("projects",lastfile);  
    } else if (type=="buildindex") {
      this.refs.builddialog.start(args[0].shortname);
    }
  },
  page:function() {
    return this.state.doc.getPage(this.state.pageid);
  },
  componentDidUpdate:function() {
  },
  newtab:function() {
    this.state.tabs.push( {"id":"t5","caption":"About","content":about,"notclosable":true})
    this.forceUpdate();
  },
   //<button onClick={this.newtab}>newtab</button>
  showdevmenu:function() {
    if (this.state.settings.developer) {
      return <devmenu action={this.action}/>;
    }
    else return null;
  },
  makescrollable:function() {
    var f=this.refs.maintab.getDOMNode();
    var aux=this.refs.auxtab.getDOMNode();
    //f.style.height='50%';
    var contenttop=f.querySelector(".tab-content").offsetTop;
    if (this.state.layout=="vertical") {
      f.style.width='50%';
      f.style.float='left';
      f.style.height=document.body.offsetHeight-contenttop;
      aux.style.float='right';
      aux.style.width='50%';
      aux.style.height=document.body.offsetHeight-contenttop;
    } else {
      f.style.width='100%';
      f.style.float='none';
      aux.style.width='100%';
      aux.style.float='none';
      f.style.height='47%';
      aux.style.height='47%';
    }
    
  },
  componentDidMount:function() {
    this.makescrollable();
  },
  componentDidUpdate:function() {
    this.makescrollable();
  },
  render:function() {
    return <div style={{"width":"100%"}}>
    {this.showdevmenu()}
    <tabui ref="maintab" lastfile={this.state.lastfile} tabs={this.state.tabs}/>
    <tabui ref="auxtab" tabs={this.state.auxs}/>
    <buildindex ref="builddialog"/>
    </div>
  }
});
module.exports=main;