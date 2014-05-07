/** @jsx React.DOM */
var styles=Require("styles")[0].markups;
var docview=Require("docview");
var D=Require("ksana-document").document;
var contentnavigator=Require("contentnavigator");
var docview_classical = React.createClass({
  mixins: Require('kse-mixins'),
  getInitialState: function() {
    var pageid=parseInt(localStorage.getItem(this.storekey()))||1;
    return {doc:null,pageid:pageid};
  }, 
  storekey:function() {
    return this.props.project.shortname+'.pageid';
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
  loadDocument:function(fromserver) {
    var kd,kdm=[];
    kd=JSON.parse(fromserver.kd);
    if (fromserver.kdm) kdm=JSON.parse(fromserver.kdm)
    return D.createDocument(kd,kdm);
  },
  componentWillUnmount:function() {
    var lastfile={project:this.props.project.shortname,
      file:this.props.file.withfoldername};
    localStorage.setItem(this.props.user.name+".lastfile",JSON.stringify(lastfile));
  },
  componentDidMount:function() {
    this.$ksana("openDocument",this.props.file.filename).done(function(data){
      var doc=this.loadDocument(data);
      doc.meta.filename=this.props.file.filename;
      this.setState({doc:doc,pageid:1});
    });
  },
  nav:function() {
    var params={ref:"navigator" ,user:this.props.user, page:this.page(), 
    preview:this.state.preview,action:this.action};
    return Require(this.props.project.tmpl.navigator)(params);
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
    }
  },
  render: function() {
    localStorage.setItem(this.storekey(),this.state.pageid);
    return ( 
      <div>
        {this.nav()}
        <docview ref="docview"
            page={this.page()} 
            preview={this.state.preview}
            user={this.props.user}
            template={this.props.project.tmpl}
            styles={styles}
            action={this.action}
            onSelection={this.onSelection}
          ></docview>
      </div>
    );
  }
});
module.exports=docview_classical;