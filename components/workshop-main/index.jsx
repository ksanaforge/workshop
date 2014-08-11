/** @jsx React.DOM */
var bootstrap=Require('bootstrap');
var tabui=Require("tabui"); 
var styles=Require("styles")[0].markups;
var docview=Require("docview"); 
var imageview=Require("imageview");
var mainmenu=Require("mainmenu"); 
var devmenu=Require("devmenu"); 
var reference=Require("referenceview"); 
var projectlist=Require("projectlist"); 
var projectview=Require("projectview");
var filelist=Require("filelist");
var project=Require("project");
var about=Require("about");
var searchmain=Require("searchmain");
var userlogin=Require("userlogin"); 
var buildindex=Require("buildindex");
var kde=Require("ksana-document").kde;
var kse=Require("ksana-document").kse;
var fileinstaller=Require("fileinstaller");

var require_kdb=[{ 
  filename:"jiangkangyur.kdb"  , url:"http://ya.ksana.tw/kdb/jiangkangyur.kdb" , desc:"Jiangkangyur"
}];  

//disable system right click menu
window.document.oncontextmenu = function(e){
    return false;
}
window.onbeforeunload = function(event){
        return console.trace("reload")
};

var main = React.createClass({ 
  searchtab:0,
  getProjects:function() {
    return this.state.projects?this.state.projects:[];
  },
  defaultMainTabs:function(){
    var tabs=[
      {"id":"tuser","caption":this.user.name||"Guest","content":userlogin,"active":true,
        "notclosable":true,"params":{"action":this.action,"user":this.user,"getError":this.getError}}
    ];
    tabs.updated=true;
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

    return {settings:null,tabs:tabs, auxs:auxs,pageid:1,error:"",db:null,projects:null};
  },
  addProjectTab:function(projects) {
      var tabs=this.state.tabs;
      tabs.push({"id":"projects","caption":"Projects","content":projectlist,"notclosable":true,
          "params":{"action":this.action, "projects":this.getProjects}});
      tabs.updated=true;
      this.setState({projects:projects,tabs:tabs});
  }, 
  enumProjects:function() {
      //var projects=JSON.parse(localStorage.getItem("projects"));
      kde.enumKdb(function(files){
        var projects=files.map(function(f){
          var name=f[0].substr(0,f[0].length-4);
          return {name:name,shortname:name} 
        });
        this.addProjectTab(projects);  
      },this);      
  },
  onReady:function(usage,quota) {  
    this.setState({dialog:false,quota:quota,usage:usage});
    this.enumProjects();
    this.makescrollable();
  },
  newsearchtab:function(proj) {
      var auxs=this.state.auxs;
      for (var i=0;i<auxs.length;i++) {
        if (auxs[i].dbid==proj.name) return;
      }

      auxs.push({"id":"searchtab"+(this.searchtab++),"caption":"Search "+proj.shortname, 
        "content":searchmain,"active":true,dbid:proj.shortname
        , "params":{"action":this.action, "project":proj, "db":proj.shortname,
                            }});

      this.setState({"layout":proj.tmpl.layout,"db":proj.shortname,"auxs":auxs});
  },
  getProjectByName:function(projname) {
    var projects=this.state.projects.filter(function(p){return p.shortname==projname});
    return projects[0];
  },
  projecttab:function(name) {
    for (var i=0;i<this.state.auxs.length;i++) {
      var t=this.state.auxs[i];
      if (t.dbid==name && t.projectmain) return this.refs.auxtab;
    }
    for (var i=0;i<this.state.tabs.length;i++) {
      var t=this.state.tabs[i];
      if (t.dbid==name && t.projectmain) return this.refs.maintab;
    }

    return null;
  },
  openfile:function(engine,proj,filename,pageid,template,linktarget,linksource) {
      var template=template || proj.tmpl.docview || "docview_default";
      var docview=Require(template);
      var tab=this.projecttab(proj.shortname);
      var obj={"id":"f_"+filename
        ,"caption":proj.shortname+'/'+filename
        ,"content":docview,"active":true
        ,"dbid":proj.shortname
        ,"params":{"action":this.action, filename:filename, project:proj
                          ,user:this.user, pageid: pageid, kde:engine ,linktarget:linktarget,linksource:linksource}};
        tab.newTab(obj);    
   },
   openlink:function(dbid,thelink) {
     var  proj=this.getProjectByName(dbid);
     if (this.projecttab(dbid)) {
       this.action("openfile",proj,thelink.file,thelink.pageid,null,thelink.linktarget,thelink.linksource);
     } else {
       this.action("openproject",proj,thelink,this.refs.auxtab); 
     }
   }, 
   excerpt2link:function(engine,excerpts,phraselen) {
     var out=[];
     var filenames=engine.get("fileNames");
     var files=engine.get("files");
     excerpts.map(function(e){
        var file=files[e.file];
        var start=e.hits[0][0]-e.start+phraselen*2; //don't know why???
        var link={payload:{pagename:e.pagename,start:start,len:phraselen,i:e.page+1,
                      db:"ccc",file: filenames[e.file],text:e.text}};
        out.push(link)
     });
     return out;
  },
  action:function() {
    var args = Array.prototype.slice.call(arguments);
    var type=args.shift();

    if (type==="setdoc") { 
      this.setState({doc:args[0]});
    } else if (type=="openproject") {
      var proj=args[0];
      var autoopen=args[1];
      var tab=args[2]||this.refs.maintab;
      var that=this;  
      kde.open(proj.name,function(engine){
        proj.template="tibetan";
        project.openProject(proj);
        var obj={"id":"p_"+proj.shortname,"caption":proj.name,dbid:proj.name,
          "content":projectview,"active":true, "projectmain":true,
          "params":{"action":that.action, "project":proj, "autoopen":autoopen, "kde":engine }};
        that.newsearchtab(proj);
        tab.newTab(obj);
      },this);
    } else if (type=="newquery") {
      this.forceUpdate();
    } else if (type=="openfile") {
      var proj=args[0];    
      var filename=args[1];
      var pageid=args[2] ; 
      var template=args[3];
      if (typeof proj=="string") {
        proj=this.getProjectByName(proj);
      } 
      kde.open(proj.shortname,function(engine){
        this.openfile(engine,proj,filename,pageid,template);  
      },this);
    } else if (type=="selectfile" || type=="selectfolder") {
      this.state.auxs.updated=true;
      this.forceUpdate();
    } else if (type=="openimage") {
      var file=args[0];
      var pagename=args[1];
      var proj=args[2];
      var obj={"id":"sourceimage"
        ,"caption":'source'
        ,"content":imageview
        ,"dbid":proj.shortname
        ,"active":false
        ,"params":
          {"action":this.action, src:file
            ,project:proj,user:this.user,pagename:pagename}};
        this.refs.auxtab.newTab(obj);
    } else if (type=="login") {
      var name=args[0];
      var encrypted=args[1];
      this.$ksana("login",{name:name,pw:encrypted}).done(function(res) {
        if (res.error=="") {
          localStorage.setItem("user",JSON.stringify(res));
          this.user=JSON.parse(localStorage.getItem("user"));  
          this.setState({tabs:this.defaultMainTabs(),auxs:this.defaultAuxTabs()}); 
          this.enumProjects(this.state.settings);
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
    } else if (type=="searchkeyword") {
      var engine= kde.open(args[1]);
      if (!engine) return;
      engine.activeTofind=args[0];
      this.state.auxs.updated=true;
      this.forceUpdate(); 
    } else if (type=="searchquote") {
      var quote=args[0],cb=args[1];
      var that=this;
      kde.open("ccc",function(engine){
        kse.search(engine,quote.text,{range:{start:0}},function(data){
          if (data.excerpt && data.excerpt.length) {
            cb( that.excerpt2link(engine,data.excerpt,quote.text.length),quote);
          } else cb([]);
        });
      });

    } else if (type=="closedb") {
      var dbid=args[0];
      kde.close(dbid);
    } else if (type=="openlink") {
      var payload=args[0];
      var thelink={file:payload.file,pageid:payload.i,
                         linktarget:payload, linksource:args[1]};
      this.openlink(payload.db,thelink);
    } else if (type=="makelink") {
      var targetpage=args[0];
      var linktarget=args[1];
      var linksource=args[2]; 
      sourcedb=linksource.db; 
      var payload=
      {"type":"linkby","db":linksource.db,"file":linksource.file
      ,"start":linksource.start,"len":linksource.len,"i":linksource.pageid
      ,"pagename":linksource.page.name,
      "author":this.user.name};

      targetpage.addMarkup(linktarget.start, linktarget.len, payload);

      var payload2={
        "type":"linkto","db":linktarget.db,"file":linktarget.file
        ,"start":linktarget.start,"len":linktarget.len,"i":linktarget.i
        ,"author":this.user.name
      }

      linksource.page.addMarkup(linksource.start,linksource.len, payload2);

      //save to
      //console.log(args[0],args[1],args[2]);
      //save link
    }
  },
  page:function() {
    return this.state.doc.getPage(this.state.pageid);
  },
  newtab:function() {
    this.state.tabs.push( {"id":"t5","caption":"About","content":about,"notclosable":true})
    this.forceUpdate();
  },
   //<button onClick={this.newtab}>newtab</button>
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
  componentDidUpdate:function() {
    this.makescrollable();
  },
  openFileinstaller:function(autoclose) {
    if (window.location.origin.indexOf("http://127.0.0.1")==0) {
      require_kdb[0].url=window.location.origin+"/jiangkangyur.kdb";
    }
    return <fileinstaller quota="512M" autoclose={autoclose} needed={require_kdb} 
                     onReady={this.onReady}/>
  },
  render:function() {
    if (!this.state.quota) { // install required db
        return this.openFileinstaller(true);
    } else { 
      return <div style={{"width":"100%"}}>
      <tabui ref="maintab" lastfile={this.state.lastfile} tabs={this.state.tabs}/>
      <tabui ref="auxtab" tabs={this.state.auxs}/>
      <buildindex ref="builddialog"/>
      </div>
    }
  }
});
module.exports=main;