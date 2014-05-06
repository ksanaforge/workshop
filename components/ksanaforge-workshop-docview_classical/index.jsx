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
    return this.state.doc.getPage(this.state.pageid);
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
    var params={ref:"navigator" ,user:this.props.user, page:this.page(), action:this.action};
    return Require(this.props.project.tmpl.navigator)(params);
  },
  action:function() {

  },
  render: function() {
    localStorage.setItem(this.storekey(),this.state.pageid);
    return ( 
      <div>
        {this.nav()}
        <docview ref="docview"
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
module.exports=docview_classical;