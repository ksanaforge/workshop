 /** @jsx React.DOM */

//var othercomponent=Require("other"); 
var fileControls=React.createClass({
  render:function() {
    return <button className="btn">Create New File</button>
  }
});
var folderList = React.createClass({
  getInitialState:function() {
    return {selected:0};
  },
  select:function(e) {
    var i=e.target.parentElement.attributes['data-i'].value;
    this.setState({selected:i});
    this.props.onSelectFolder(i);
  },
  renderFolders:function() {
    var cls="",out=[];
    for (var i=0;i<this.props.folders.length;i++) {
      var f=this.props.folders[i];
      if (i==this.state.selected) cls="warning"; else cls="";
      out.push(<tr className={cls} onClick={this.select} data-i={i}>
        <td>{f.shortname}</td>
        </tr>);
    };
    return out;
  },

  render:function() {
    return <div className="folderList">
    <table className="table table-hover">
    <tbody>{this.renderFolders()}</tbody>
    </table>
    </div>;
  }
});
var fileList = React.createClass({
  getInitialState:function() {
    return {selected:0};
  },
  select:function(e) {
    var e=e.target;
    while (e) {
      if (e.attributes['data-i']) {
        var i=e.attributes['data-i'].value;
        break;
      } else e=e.parentElement;
    }
    this.setState({selected:i});
    this.props.onSelectFile(i);
  },
  renderFiles:function() {
    var cls="",out=[];
    for (var i=0;i<this.props.files.length;i++) {
      var f=this.props.files[i];
      if (i==this.state.selected) cls="warning"; else cls="";
      out.push(<tr onMouseMove={this.hoverFile} className={cls} data-i={i}>
        <td>{f.shortname}
        <span className="pull-right" style={{visibility:this.state.selected==i?"":"hidden"}}>
        <button className="btn btn-warning" onClick={this.select}>Open</button>
        </span>
        </td>
        </tr>);
    };
    return out;
  }, 
  hoverFile:function(e) {
    if (e.target.parentElement.nodeName!='TR') return;
    var selected=e.target.parentElement.attributes['data-i'].value;
    if (this.state.selected==selected) return;

    this.setState({selected:selected});
  },
  render:function() {
    return <div  className="fileList">
    <table className="table table-hover">
    <tbody>{this.renderFiles()}</tbody></table></div>;
  }
});
var projectview = React.createClass({
  mixins: Require('kse-mixins'),
  getInitialState: function() {
    return {bar: "world",folders:[],files:[]};
  },
  componentDidMount:function() {
    this.$yase("getProjectFolders",this.props.project.path).done(function(data){
      this.setState({folders:data});
      if (data.length) this.selectFolder(0);
    })
  },
  selectFolder:function(i) {
    var f=this.state.folders[i];
    this.$yase("getProjectFiles",f).done(function(data){
      this.setState({files:data, selectedFolder:i});
    })
  },
  selectFile:function(i) {
    var f=this.state.files[i];
    var proj=this.state.folders[this.state.selectedFolder];
    this.props.action("openfile",f,proj,
      this.props.project.templates.docview||"docview_default");
    this.setState({selectedFile:i});
  },
  makescrollable:function() {
    var f=this.refs.folderList.getDOMNode();
    f.style.height=document.body.offsetHeight-f.getBoundingClientRect().top;
    f=this.refs.fileList.getDOMNode();
    f.style.height=document.body.offsetHeight-f.getBoundingClientRect().top;
  },
  componentDidUpdate:function() {
    this.makescrollable();
  },
  render: function() {
    return (
      <div className="projectview">
        <div className="row">
        <div className="col-md-3">
        <folderList ref="folderList" folders={this.state.folders} onSelectFolder={this.selectFolder} />
        </div>
        <div className="col-md-9">
        <fileControls/>
        <fileList ref="fileList" className="fileList" files={this.state.files} onSelectFile={this.selectFile} />
        </div>
        </div>
      </div>
    );
  }
});
module.exports=projectview;