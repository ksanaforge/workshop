var React=require("react");
var projectlist = React.createClass({
  getInitialState: function() {
    return {bar: "world",hovered:-1,selected:-1};
  },
  componentDidMount:function() {
    if (this.props.tab ) this.props.tab.instance=this; // for tabui 
  },
  selectproject:function(e) {
    if (!e.target.parentElement.attributes['data-i']) return;
    var i=parseInt(e.target.parentElement.attributes['data-i'].value);
    this.setState({selected:i});
  },
  hoverProject:function(e) {
    if (e.target.parentElement.nodeName!='TR') return;
    var hovered=e.target.parentElement.attributes['data-i'].value;
    if (this.state.hovered==hovered) return;

    this.setState({hovered:hovered});
  },
  buildindex:function() {
    /*
    var p=this.props.projects()[this.state.hovered];
    if (!p) return;
    this.props.action("buildindex",p);
    */
  },
  renderProject:function(p,i) {
    var d=p.lastModified;
    var cls=(i==this.state.selected)?"success":"";
   // var formatted=d.getDay()+'/'+d.getMonth()+'/'+d.getFullYear();
    return (<tr key={'p'+i} data-i={i} className={cls} 
     onClick={this.selectproject}
     onDoubleClick={this.openproject}
     onMouseOver={this.hoverProject}>
      <td>{p.name}</td>
      <td></td>
      <td></td>
      <td>0</td>
      <td>
        <span style={{visibility:this.state.hovered==i?"":"hidden"}} >
          <button onClick={this.openproject} className="btn btn-success">Open</button>
        </span>
      </td>
    </tr>);
//<button onClick={this.buildindex} className="btn btn-warning">Build Index</button>
  },
  sortHeader:function(e) {
    var field=e.target.attributes['data-field'];
    field=field?field.value: e.target.innerText;
    this.props.projects().sort(function(a,b){
      if (a[field]==b[field]) return 0;
      if (a[field]>b[field]) return 1;
      else return -1
    })
    this.forceUpdate();
  },
  openproject:function() {
    var p=this.props.projects()[this.state.hovered];
    if (!p) return;
    this.props.action("openproject",p);
    //open recently edited file automatically
  },
  onShow:function(params) {
    if (!params || !this.props.projects())return;
    var match=this.props.projects().filter( function(p) {return p.shortname==params.project });
    if(match.length) this.props.action("openproject",match[0],params);
  },
  editproject:function() {
    //dialog
  },
  newproject:function() {
    //dialog
  },
  render: function() {
    return ( 
      <div className="projectlist">
        <div className="row">
        <div className="col-md-8">
          <button onClick={this.newproject} className="btn btn-default">Create New Project</button>
        </div>
        <div className="col-md-4">
        </div>
        </div>
        <div className="projects">
        <table className="table table-bordered table-hover">
      <thead onClick={this.sortHeader}>
        <tr className="">
        <th data-field="name">Name</th>
        <th data-field="desc">Description</th>
        <th data-field="author">Author</th>
        <th data-field="hits">Hits</th>
        <th></th>
        </tr>
      </thead>
        <tbody>
        {this.props.projects().map(this.renderProject)}
        </tbody>
        </table>
        </div>
      </div>
    );
  }
});
module.exports=projectlist;