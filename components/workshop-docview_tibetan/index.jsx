/** @jsx React.DOM */

//var othercomponent=Require("other"); 
var styles=Require("styles")[0].markups;
var docview=Require("docview");
var contentnavigator=Require("contentnavigator");
var imageview=Require("imageview");
var D=Require("ksana-document").document;
var M=Require("ksana-document").markups;
var excerpt=Require("ksana-document").kse.excerpt;
var docview_tibetan = React.createClass({
  mixins: Require('kse-mixins'),
  getInitialState: function() {
    return {doc:null,pageid:this.props.pageid};
  },
  shouldComponentUpdate:function(nextProps,nextState) {
      if (nextProps.pageid!=this.props.pageid) {
        nextState.pageid=nextProps.pageid;
      }
      return true;
  },
  saveMarkup:function() {
    var doc=this.state.doc;
    if (!doc.dirty) return;
    var filename=this.state.doc.meta.filename; 
    var username=this.props.user.name;
    var markups=this.page().filterMarkup(function(m){return m.payload.author==username});
    this.$ksana("saveMarkup",{markups:markups,filename:filename,i:this.state.pageid } ,function(data){
      doc.markClean();
    }); 
  },
  getActiveHits:function() { // get hits in this page and send to docsurface 
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
  action:function(type) {
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
        //this.forceUpdate();
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
    } else if (type=="prevmistake") {
      this.refs.docview.goPrevMistake();
    } else if (type=="nextmistake") {
      this.refs.docview.goNextMistake();
    } else if (type=="preview") {
      this.setState({preview:true});
    } else if (type=="endpreview") {
      this.setState({preview:false});
    } else if (type=="makingselection") {
      this.setState({selecting: {start:args[0],end: args[1]}});
    } else if (type=="searchkeyword") {
      this.props.action("searchkeyword",args[0],this.props.kde.kdbid);
    } else if (type=="linkby") {
      var selstart=args[0],len=args[1],cb=args[2];
      var po=this.props.kde.pageOffset(this.props.filename , this.getPageName());
      var vpos=po.start+selstart; //convert to virtual position
      this.props.kde.findLinkBy(vpos,len,cb);
    } else if (type=="linkto") {
      //find surrounding text
      //do fuzzy search
      
    } else {
      return this.props.action.apply(this,arguments);
    }

    if (save) this.saveMarkup();
  }, 
  loadDocument:function(fromserver) {
    return D.createDocument(fromserver.kd,fromserver.kdm);
  },
  componentDidMount:function() {
    this.$ksana("loadDocumentJSON",{project:this.props.project,file:this.props.filename}).done(function(data){
      var doc=this.loadDocument(data);
      doc.meta.filename=this.props.filename;
      this.setState({doc:doc});
    });
    if (this.props.tab ) this.props.tab.instance=this; // for tabui 
  },
  page:function() {
    if (!this.state.doc) return null;
    var page=this.state.doc.getPage(this.state.pageid);
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
  getPageName:function() {
    var n=this.page();
    if (!n)return ""
    return n.name;
  },
  imagefilename:function() {
    var pagename=this.getPageName();
    if (!this.props.project.setting) return pagename;
    return this.props.project.setting.getImage(pagename);
  },
  imagefilename:function() {
    return this.getPageName();
  },
  componentDidUpdate:function() {
    this.props.action("openimage",this.imagefilename(),this.getPageName(),this.props.project);
  },
  componentWillUnmount:function() {
    var lastfile={project:this.props.project.shortname,
      file:this.props.filename};
    localStorage.setItem(this.props.user.name+".lastfile",JSON.stringify(lastfile));
    this.saveMarkup();
  },
  nav:function() {
    var params={ref:"navigator" ,user:this.props.user, preview:this.state.preview,
      page:this.page(), action:this.action,selecting:this.state.selecting};
    return Require(this.props.project.tmpl.navigator)(params);
  },
  render: function() {
    return ( 
      <div className="docview_tibetan">
        {this.nav()}
        <docview ref="docview"
            page={this.page()}
            pageid={this.state.pageid}
            user={this.props.user}
            template={this.props.project.tmpl}
            customfunc={this.props.kde.customfunc}
            styles={styles}
            hits={this.getActiveHits()}
            action={this.action}
          ></docview>
      </div>
    );
  }
});
module.exports=docview_tibetan;