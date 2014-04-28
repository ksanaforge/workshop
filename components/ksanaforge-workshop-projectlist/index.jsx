/** @jsx React.DOM */



var projectlist = React.createClass({
  mixins: Require('kse-mixins'),
  getInitialState: function() {
    return {bar: "world",projects:[],selected:-1};
  },
  componentDidMount:function() {
    this.$ksana('enumProject').done(function(res){
      this.setState({projects:res});
    })
  },
  selectproject:function(e) {
    //if (!e.target.parentElement.attributes['data-i']) return;
   // var i=parseInt(e.target.parentElement.attributes['data-i'].value);
   // this.setState({selected:i});
  },
  hoverProject:function(e) {
    if (e.target.parentElement.nodeName!='TR') return;
    var selected=e.target.parentElement.attributes['data-i'].value;
    if (this.state.selected==selected) return;

    this.setState({selected:selected});
  },
  renderProject:function(p,i) {
    var d=p.lastModified;
    var cls=(i==this.state.selected)?"warning":"";
    var formatted=d.getDay()+'/'+d.getMonth()+'/'+d.getFullYear();
    return <tr key={'p'+i} data-i={i} className={cls} 
     onClick={this.selectproject}
     onMouseOver={this.hoverProject}>
      <td>{p.name}</td>
      <td>{p.desc}</td>
      <td>{p.author}</td>
      <td>{formatted}</td>
      <td>0</td>
      <td>
        <span style={{visibility:this.state.selected==i?"":"hidden"}} >
          <button onClick={this.editproject} className="btn btn-default">Edit</button>
          <button onClick={this.openproject} className="btn btn-warning">Open</button>
        </span>
      </td>

    </tr>
  },
  sortHeader:function(e) {
    var field=e.target.attributes['data-field'];
    field=field?field.value: e.target.innerText;
    this.state.projects.sort(function(a,b){
      if (a[field]==b[field]) return 0;
      if (a[field]>b[field]) return 1;
      else return -1
    })
    this.forceUpdate();
  },
  openproject:function() {
    var p=this.state.projects[this.state.selected];
    if (!p) return;
    this.props.action("openproject",p);
    //open recently edited file automatically
  },
  editproject:function() {
    //dialog
  },
  newproject:function() {
    //dialog
  },
  render: function() {
    return ( 
      <div>
        <div className="row">
        <div className="col-md-8">
          <button onClick={this.newproject} className="btn btn-default">Create New Project</button>
        </div>

        <div className="col-md-4">
        </div>

        </div>

        <table className="table table-bordered table-hover">
      <thead onClick={this.sortHeader}>
        <tr>
        <td data-field="name">Name</td>
        <td data-field="desc">Description</td>
        <td data-field="author">Author</td>
        <td data-field="lastmodified">last modified</td>
        <td data-field="hits">Hits</td>
        <td></td>
      </tr>
      </thead>
        <tbody>
        {this.state.projects.map(this.renderProject)}
        </tbody>
        </table>
      </div>
    );
  }
});
module.exports=projectlist;