/** @jsx React.DOM */


var projectlist = React.createClass({displayName: "projectlist",
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
    return (React.createElement("tr", {key: 'p'+i, "data-i": i, className: cls, 
     onClick: this.selectproject, 
     onDoubleClick: this.openproject, 
     onMouseOver: this.hoverProject}, 
      React.createElement("td", null, p.name), 
      React.createElement("td", null), 
      React.createElement("td", null), 
      React.createElement("td", null, "0"), 
      React.createElement("td", null, 
        React.createElement("span", {style: {visibility:this.state.hovered==i?"":"hidden"}}, 
          React.createElement("button", {onClick: this.openproject, className: "btn btn-success"}, "Open")
        )
      )
    ));
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
      React.createElement("div", {className: "projectlist"}, 
        React.createElement("div", {className: "row"}, 
        React.createElement("div", {className: "col-md-8"}, 
          React.createElement("button", {onClick: this.newproject, className: "btn btn-default"}, "Create New Project")
        ), 
        React.createElement("div", {className: "col-md-4"}
        )
        ), 
        React.createElement("div", {className: "projects"}, 
        React.createElement("table", {className: "table table-bordered table-hover"}, 
      React.createElement("thead", {onClick: this.sortHeader}, 
        React.createElement("tr", {className: ""}, 
        React.createElement("th", {"data-field": "name"}, "Name"), 
        React.createElement("th", {"data-field": "desc"}, "Description"), 
        React.createElement("th", {"data-field": "author"}, "Author"), 
        React.createElement("th", {"data-field": "hits"}, "Hits"), 
        React.createElement("th", null)
        )
      ), 
        React.createElement("tbody", null, 
        this.props.projects().map(this.renderProject)
        )
        )
        )
      )
    );
  }
});
module.exports=projectlist;