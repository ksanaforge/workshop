 /** @jsx React.DOM */
/*
TODO save folder name and file name string in localstorage, instead of number
*/

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
      if (i==this.state.selected) cls="success"; else cls="";
      out.push(<tr key={'d'+i} className={cls} onClick={this.select} data-i={i}>
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
    return {selected:0,hovered:-1};
  },
  select:function(e) {
    var ee=e.target.parentElement.attributes['data-i'];
    if (!ee) return;
    this.setState({selected:parseInt(ee.value)});
  },
  leave:function(e) {
    this.setState({hovered:-1});
  },
  openfile:function(e) {
    var e=e.target;
    while (e) {
      if (e.attributes['data-i']) {
        var i=parseInt(e.attributes['data-i'].value);
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
      if (i==this.state.selected) cls="success"; else cls="";
      out.push(<tr key={'f'+i} onClick={this.select} 
           onMouseEnter={this.hoverFile} onMouseLeave={this.leave}
           className={cls} data-i={i}>
        <td>{f.shortname.substring(0,f.shortname.length-3)}
        <span className="pull-right" style={{visibility:this.state.hovered==i?"":"hidden"}}>
        <button className="btn btn-success" onClick={this.openfile}>Open</button>
        </span>
        </td>
        </tr>);
    };
    return out;
  }, 
  hoverFile:function(e) {
    if (e.target.parentElement.nodeName!='TR') return;
    var hovered=e.target.parentElement.attributes['data-i'].value;
    if (this.state.hovered==hovered) return;

    this.setState({hovered:hovered});
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
    this.$ksana("getProjectFolders",this.props.project).done(function(folders){
      this.setState({folders:folders});

      if (this.props.autoopen && this.props.autoopen.file) {
        var folder=this.props.autoopen.file;
        folder=folder.substring(0,folder.lastIndexOf('/'));
        for(var i=0;i<folders.length;i++) {
          if (folders[i].shortname==folder) {
            this.selectFolder(i);
            break;
          }
        }
      } else {
        this.selectFolder( 0 );
      }
    });
    if (this.props.tab ) this.props.tab.instance=this; // for tabui 


  },
  selectFolder:function(i) {
    var f=this.state.folders[i];
    this.$ksana("getProjectFiles",f).done(function(files){
      this.setState({files:files});

      if (this.props.autoopen && this.props.autoopen.file) {
        for(var i=0;i<files.length;i++) {
          if (files[i].withfoldername==this.props.autoopen.file) {
            this.selectFile(i);
            this.props.autoopen.file=""; //prevent from click on folder autoopen
            break;
          }
        }
      }
    })
  },
  selectFile:function(i) {
    var f=this.state.files[i];
    this.props.action("openfile",f,this.props.project,
      this.props.project.tmpl.docview||"docview_default");

    this.setState({selectedFile:i});
  },
  
  makescrollable:function() {
    var tabheight=this.getDOMNode().getBoundingClientRect().height;
    var f=this.refs.folderList.getDOMNode();
    f.style.height='90%';//tabheight-f.getBoundingClientRect().top;
//    f.style.height=document.body.offsetHeight/2-f.getBoundingClientRect().top;
    f=this.refs.fileList.getDOMNode();
//    f.style.height=document.body.offsetHeight/2-f.getBoundingClientRect().top;
    f.style.height='90%';//f.style.height=tabheight- f.getBoundingClientRect().top;
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