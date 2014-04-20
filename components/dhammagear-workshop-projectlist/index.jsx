/** @jsx React.DOM */

//var othercomponent=Require("other"); 

var projectlist = React.createClass({
  mixins: Require('kse-mixins'),
  getInitialState: function() {
    return {bar: "world",projects:[]};
  },
  componentDidMount:function() {
    this.$yase('enumProject').done(function(res){
      this.setState({projects:res});
    })
  },
  selectproject:function(e) {
    var cb=e.target.parentElement.querySelector('input');
    cb.checked=true;
  },
  renderProject:function(p,i) {
    return <tr className="warning" onClick={this.selectproject}>
      <td>{p.name}</td>
      <td>{p.desc}</td>
      <td>{p.author}</td>
      <td>{p.lastModified.toString()}</td>
      <td><input type="radio" name="projects" defaultChecked={i==0} /></td>
      <td></td>
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
    //create new tab
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
        
        <table className="table table-bordered table-hover">
      <thead onClick={this.sortHeader}>
        <tr>
        <td data-field="name">Name</td>
        <td data-field="desc">Description</td>
        <td data-field="author">Author</td>
        <td data-field="lastmodified">last modified</td><td></td>
      </tr>
      </thead>
        <tbody>
        {this.state.projects.map(this.renderProject)}
        </tbody>
        </table>
        <button onClick={this.newproject} className="btn btn-warning ">New</button>
        <button onClick={this.openproject} className="btn btn-warning">Edit</button>
        <button onClick={this.editproject} className="btn btn-large pull-right btn-success">Open</button>
        
      </div>
    );
  }
});
module.exports=projectlist;