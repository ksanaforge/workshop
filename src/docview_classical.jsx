/** @jsx React.DOM */
var styles=require("./styles")[0].markups;
var Docview=require("./docview.jsx");
var D=require("./document");
var contentnavigator=require("./contentnavigator");
var excerpt=require("ksana-search").excerpt;

var docview_classical = React.createClass({
  getInitialState: function() {
    var pageid=parseInt(this.props.pageid||localStorage.getItem(this.storekey())) || 1;
    return {doc:null,pageid:pageid};
  }, 
  shouldComponentUpdate:function(nextProps,nextState) {
      if (nextProps.pageid!=this.props.pageid) {
        nextState.pageid=nextProps.pageid;
      } else if (this.state.doc==nextState.doc && this.state.pageid==nextState.pageid
      &&this.state.selecting==nextState.selecting) return false;  //this is a work-around ... children under this component is causing recursive update
      return true;
  },
  storekey:function() {
    return this.props.project.shortname+'.pageid';
  },
  page:function() {
    if (!this.state.doc) return null;
    var pageid=this.state.pageid;
    if (pageid>=this.state.doc.pageCount) pageid=this.state.doc.pageCount-1;
    var page=this.state.doc.getPage(pageid);
    var user=this.props.user.name;
    if (this.state.preview) {
      var suggestions=page.filterMarkup(function(m){
        var p=m.payload;
        return (p.author==user && (p.type=="suggest" || p.type=="revision"));
      });
      return page.preview({suggestions:suggestions});      
    } else {
      return page;
    }
  },
  loadDocument:function(fromserver) {
    return D.createDocument(fromserver.kd,fromserver.kdm);
  },
  getPageName:function() {
    var n=this.page();
    if (!n)return ""
    return n.name;
  },
  imagefilename:function() {
    var pagename=this.getPageName();
    if (!this.props.project.setting) return pagename; //as it is
    return this.props.project.setting.getImage(pagename);
  },
  componentDidUpdate:function() {
    this.props.action("openimage",this.imagefilename(),this.getPageName(),this.props.project);

  },  
  componentWillUnmount:function() {
    var lastfile={project:this.props.project.shortname,
      file:this.props.filename};
    localStorage.setItem(this.props.user.name+".lastfile",JSON.stringify(lastfile));
  }, 
  componentDidMount:function() { 
    /*
    this.$ksana("loadDocumentJSON",{project:this.props.project,file:this.props.filename}).done(function(data){
      var doc=this.loadDocument(data);
      doc.meta.filename=this.props.filename;
      this.setState({doc:doc});
    });
*/
    if (this.props.tab ) this.props.tab.instance=this; // for tabui 
  },
  nav:function() {
    var params={ref:"navigator" ,user:this.props.user, preview:this.state.preview,
      page:this.page(), action:this.action,selecting:this.state.selecting};
    return Require(this.props.project.tmpl.navigator)(params);

  },
  saveMarkup:function() {//this should pass to
    var doc=this.state.doc;
    if (!doc.dirty) return;
    var filename=this.state.doc.meta.filename; 
    var username=this.props.user.name;
    var dbid=this.props.kde.kdbid;
    var markups=this.page().filterMarkup(function(m){return m.payload.author==username});
    /*
    this.$ksana("saveMarkup",{dbid:dbid,markups:markups,filename:filename,i:this.state.pageid } ,function(data){
      doc.markClean();
    }); 
*/
  },
  getActiveHits:function() {
    if (!this.props.kde.activeQuery) return;

    var po=this.props.kde.pageOffset(this.props.filename , this.getPageName());
    if (!po) return [];

    var Q=this.props.kde.activeQuery;
    var absolute_hits=excerpt.hitInRange(Q,po.start,po.end);
    var hits=absolute_hits.map(function(h){
      return [ h[0]-po.start,h[1],h[2]];
    });
    return hits;
  },
  guessQuote:function(s,l) {
    var inscription=this.page().inscription;
    var begin=s-50; if (begin<0) begin=0;
    var end=s+l+50; if (end>=inscription.length) end=inscription.length-1;
    var leftpart=inscription.substring(begin,s);
    var rightpart=inscription.substring(s+l,end);
    var quoteend=rightpart.indexOf("。");
    if (quoteend==-1) quoteend=rightpart.length;
    rightpart=rightpart.substring(0,quoteend );

    var quotestart=leftpart.lastIndexOf("：");
    var quotestart2=leftpart.lastIndexOf("》");

    if (quotestart==-1||quotestart2>quotestart) quotestart=quotestart2;
    if (quotestart==-1) quotestart=0;
    leftpart=leftpart.substring(quotestart+1);
    var text=leftpart+inscription.substr(s,l)+rightpart;
    text=text.replace(",",'');//remove or operator
    return {text:text , start:begin+quotestart+1 ,len:s+l+quoteend-begin-quotestart-1};

  },
  action:function() {
    var args = Array.prototype.slice.call(arguments);
    var type=args.shift();
    var save=false;

    var pageid=this.state.pageid;
    if (type=="next") {
      if (pageid+1<this.state.doc.pageCount) this.setState({pageid:pageid+1});
      save=true;
    } else if (type=="prev") {
      if (pageid>1) this.setState({pageid:pageid-1});
      save=true;
    } else if (type=="first") {
      save=true;
      this.setState({pageid:1});
    } else if (type=="last") {
      this.setState({pageid:this.state.doc.pageCount-1});
      save=true;
    } else if (type=="gopage") {
      var page=this.state.doc.pageByName(args[0])
      if (page) {
        this.setState({pageid:page.id});
        save=true;
      }
    } else if (type=="markupupdate") {
      this.state.doc.markDirty();
    } else if (type=="addmarkup") {
      console.trace();
      console.error("cannot call addmarkup here")      
    } else if (type=="removemarkup") {
      var markup=args[0];
      this.page().clearMarkups(markup.start,markup.len,this.props.user.name);
      this.forceUpdate();
    } else if (type=="preview") {
      this.setState({preview:true});
    } else if (type=="endpreview") {
      this.setState({preview:false});
    } else if (type=="makingselection") {
      this.setState({selecting: {start:args[0],end: args[1]}});
    } else if (type=="enter") {
      var len=args[1],start=args[0];
      if (len>0) {
        start-=(len-1);
      } else {
        start--;
      }
      var linebreak=this.props.project.tmpl.linebreak;
      var payload={type:"suggest",
                  author:this.props.user.name,
                  text:linebreak,insert:true
               };
      var page=this.page();
      page.clearMarkups(start,len,this.props.user.name);
      page.addMarkup(start,1,payload);
    } else if (type=="searchkeyword") {
      this.props.action("searchkeyword",args[0],this.props.kde.kdbid);
    } else if (type=="linkby") {
      var selstart=args[0],len=args[1],cb=args[2];
      this.props.kde.findLinkBy(this.page(),selstart,len,cb);
    } else if (type=="linkto") { 
      var start=args[0],len=args[1],cb=args[2];
      var quote=this.guessQuote(start,len);
      if (this.props.kde.kdbid!="ccc") {
        this.props.action("searchquote",quote,cb);  
      } else {
        cb([]);
      }
    } else {
      return this.props.action.apply(this,arguments);
    }

    if (save) this.saveMarkup();
  },
  render: function() {
    localStorage.setItem(this.storekey(),this.state.pageid);
    if (!this.state.doc) return <span></span>
    return ( 
      <div>
        {this.nav()}
        <Docview ref="docview"
            page={this.page()} 
            pageid={this.state.pageid}
            preview={this.state.preview}
            user={this.props.user}
            template={this.props.project.tmpl}
            customfunc={this.props.kde.customfunc}
            styles={styles}
            linksource={this.props.linksource}
	      linktarget={this.props.linktarget}
            action={this.action}
            hits={this.getActiveHits()}
            kde={this.props.kde}

          />
      </div>
    );
  }
});
module.exports=docview_classical;