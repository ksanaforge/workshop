/** @jsx React.DOM */

//var othercomponent=Require("other"); 
var contextmenu=Require("contextmenu");
var styles=Require("styles")[0].markups;
var docview=Require("docview");
var contentnavigator=Require("contentnavigator");
var imageview=Require("imageview");
var docview_tibetan = React.createClass({
  mixins: Require('kse-mixins'),
  getInitialState: function() {
    var pageid=parseInt(localStorage.getItem(this.storekey()))||1;
    return {doc:null,pageid:pageid};
  },
  storekey:function() {
    return this.props.project.shortname+'.pageid';
  },
  saveMarkup:function() {
    this.$ksana("saveMarkup",{doc:this.state.doc},function(data){
      console.log(data);
    });
  },
  action:function(type) {
    var args = Array.prototype.slice.call(arguments);
    var type=args.shift();
    var save=true;

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
      if (page) {
        this.setState({pageid:page.id});
        //this.forceUpdate();
      }
    } else if (type=="markupupdate") {
      this.state.doc.markDirty();
      save=false;
    } else if (type=="addmarkup") {
      this.page().addMarkup(args[0],args[1],args[2]);
      save=false;
    } else if (type=="removemarkup") {
      var markup=args[0];
      this.page().clearMarkups(markup.start,markup.len,this.props.user.name);
      this.forceUpdate();
      save=false;
    }
    if (save) this.saveMarkup();
  },
  componentDidMount:function() {
    this.$yase("openDocument",this.props.file.filename).done(function(data){
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
  imagefilename:function() {
    var page=this.page();
    if (!page)return ""
    return this.page().name;
  },
  componentDidUpdate:function() {
    this.props.action("openimage",this.imagefilename(),this.props.project);
  },
  render: function() {
    localStorage.setItem(this.storekey(),this.state.pageid);
    return (
      <div>
        <contentnavigator page={this.page()} action={this.action}/>
        <docview 
            page={this.page()} 
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
module.exports=docview_tibetan;