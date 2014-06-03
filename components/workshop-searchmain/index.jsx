/** @jsx React.DOM */ 
var kse=Require("ksana-document").kse; 
var kde=Require("ksana-document").kde; 
var searchmain = React.createClass({
  mixins: Require('kse-mixins'), 
  shouldComponentUpdate:function(nextProps,nextState) {

    if (this.db && (this.db.activeFile!=this.activeFile
     || this.db.activeFolder!=this.activeFolder 
     || this.tofind != this.db.activeTofind )) {
      this.dosearch(false);
      return false;
    }
    return (nextState.output!=this.state.output ||
               this.excerpt!=nextState.output.excerpt );
  },
  getInitialState: function() {
    return {bar: "world", output:""};
  },
  dosearch:function(e) {
    if (!this.db)return;

    var range={start:1,end:this.db.get("meta").vsize};
    if (this.activeFolder!=this.db.activeFolder && this.db.activeFolder) {
      range=this.db.folderOffset(this.db.activeFolder);
      this.activeFolder=this.db.activeFolder;
      this.db.activeFile=this.activeFile="";
    }  else if (this.activeFile!=this.db.activeFile && this.db.activeFile) {
      range=this.db.fileOffset(this.db.activeFile);
      this.activeFile=this.db.activeFile;
    }
    if (this.tofind!=this.db.activeTofind) {
      this.tofind=this.db.activeTofind;   
      if (this.tofind && this.refs.tofind) this.refs.tofind.getDOMNode().value=this.tofind;
    } else {
      this.db.activeTofind=this.tofind=this.refs.tofind.getDOMNode().value;
    }

    var that=this;
    kse.search(this.db,this.tofind,{range:range},function(data){
      that.db.activeQuery=data;
      setTimeout(function(){  
        that.setState({output:data}); 
      },100); 
      if (e) {
            that.props.action("newquery",this.props.db,data);
      }
    });
  },
  openpage:function(e) {
    var i=parseInt(e.target.attributes['data-i'].value);
    var excerpt=this.state.output.excerpt[i];
    var fileNames=this.db.get("fileNames");
    this.props.action("openfile",fileNames[excerpt.file],this.props.db, excerpt.page+1 );
  },
  renderExcerpt:function(excerpt,i) {
    return <div>
      <a data-i={i} onClick={this.openpage} className="btn btn-link">{"["+excerpt.pagename+"]"}</a>
      <span className="excerpt" dangerouslySetInnerHTML={{__html: excerpt.text}} ></span>
    </div>; 
  }, 
  renderExcerpts:function() {
    var output=this.state.output;
    if (!output.excerpt) return null;
    return output.excerpt.map(this.renderExcerpt);
  },
  componentWillMount:function() {
    if (!this.props.db) return;
    if (this.db) return; //
    this.db=kde.open(this.props.db);
    this.db.setContext(this);
  },
  componentDidUpdate:function() {
    if (!this.db)return;
    this.excerpt=this.state.excerpt;
    
    this.refs.excerpts.getDOMNode().style.height=
       this.getDOMNode().offsetHeight - this.refs.controls.getDOMNode().offsetHeight ;
  },
  tofindkeypress:function(e) {
     if (e.keyCode==13)  this.dosearch(e);
  },
  render: function() {
    return (
      <div className="searchmain">
        <div ref="controls">
        <input className="tofind" ref="tofind" onKeyPress={this.tofindkeypress} defaultValue={this.tofind}></input>
        <button className="btn btn-primary" onClick={this.dosearch}>Search</button>
        </div> 
        <div ref="excerpts" className="excerpts">{this.renderExcerpts()}</div> 
      </div>
    );

  }
});
module.exports=searchmain;