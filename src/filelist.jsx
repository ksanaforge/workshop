var React=require("react");
var FileListing = React.createClass({
  getInitialState:function() {
    return {selected:0,hovered:-1};
  },
  select:function(e) {
    var ee=e.target.parentElement.attributes['data-i'];
    if (!ee) return;
    var selected=parseInt(ee.value);
    this.setState({selected:selected});
    this.props.onSelectFile(selected);
  },
  shouldComponentUpdate:function(nextProps,nextState) {

    var shouldUpdate= (nextState.hovered != this.state.hovered || this.state.hovered==-1
      ||nextState.selected!=this.state.selected || this.props.files!=nextProps.files);

    if (this.props.files!=nextProps.files) {
      if (nextProps.selected!=this.state.selected) {
        nextState.selected=nextProps.selected;
      }
    }
    return shouldUpdate;
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
    this.props.onOpenFile(i);
  },
  renderFiles:function() {
    var cls="",out=[], filestart=this.props.start;
    for (var i=0;i<this.props.files.length;i++) {
      var f=this.props.files[i],hit="";
      if (this.props.hits) hit=this.props.hits[filestart+i]?this.props.hits[filestart+i].length:"";
      if (!hit) hit="";
      if (i==this.state.selected) cls="success"; else cls="";
      out.push(<tr key={'f'+i} onClick={this.select} 
           onMouseEnter={this.hoverFile} onMouseLeave={this.leave}
           className={cls} data-i={i}>
        <td onDoubleClick={this.openfile}>{f.substring(0,f.length-4)}
        
        <span className="label label-info">{hit}</span>
        <span className="pull-right" style={{visibility:this.state.hovered==i?"":"hidden"}}>
        <button className="btn btn-success"  onClick={this.openfile}>Open</button>
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

var filelist = React.createClass({
  getInitialState: function() {
    return {bar: "world",files:[],selectedFile:0};
  },
  shouldComponentUpdate:function(nextProps,nextState) {
    return (nextProps.kde.activeQuery!=this.activeQuery || typeof this.activeQuery=="undefined"
      || nextState.files!=this.state.files|| nextState.folders!=this.state.folders);
  }, 
  selectFile:function(i) {
    var f=this.state.folder+'/'+this.state.files[i];
    this.props.kde.activeFile=f;
    this.props.action("selectfile",this.props.kde,f);
  },
  openFile:function(i) {
    var f=this.state.folder+'/'+this.state.files[i];
    var gotopageid,linktarget,linksource;
    if (this.props.autoopen)  {
      gotopageid=this.props.autoopen.pageid;
      linktarget=this.props.autoopen.linktarget;
      linksource=this.props.autoopen.linksource;
    }
    this.props.action("openfile",this.props.kde.kdbid,f,gotopageid,null,linktarget,linksource);
    if (this.props.autoopen) {
      this.props.autoopen.pageid="";
      this.props.autoopen.linktarget=null;
    }
    this.setState({selectedFile:i});
  },
  getFileHits:function() {
    if (!this.props.kde.activeQuery) return [];
    return this.props.kde.activeQuery.byFile;
  },
  render: function() {
    return (
      <div>
        <FileListing files={this.state.files} 
            selected={this.state.selectedFile} 
            onSelectFile={this.selectFile} 
            onOpenFile={this.openFile} 
            start={this.state.filestart} 
            hits={this.getFileHits()}
        />
      </div>
    );
  },
  componentDidMount:function() {
    var that=this;
    this.props.kde.get("fileNames",function(files){
      that.setState({"files":files});
    })
  }
});
module.exports=filelist;