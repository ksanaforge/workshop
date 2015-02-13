/** @jsx React.DOM */

//var othercomponent=Require("other"); 

var nav_tibetan = React.createClass({displayName: "nav_tibetan",
  getInitialState: function() {
    return {pagename:this.pageName()};
  },
  pageName:function() {
    return  this.props.page?this.props.page.name:"";
  },
  setPageId:function() {
    var pagename=this.refs.pageid.getDOMNode().value;
    this.setState({pagename:pagename});
    this.props.action("gopage",pagename);
    this.pageidtimer=null;
  },
  pageIdChange:function() {
    clearTimeout(this.pageidtimer);
    this.pageidtimer=setTimeout(this.setPageId.bind(this) ,500);
  },
  nextPage:function() {
    this.props.action("next");
  },
  prevPage:function() {
    this.props.action("prev");
  },
  firstPage:function() {
    this.props.action("first");
  },
  lastPage:function() {
    this.props.action("last");
  },
  componentDidUpdate:function() {
    if (this.refs&&this.refs.pageid) {
      this.refs.pageid.getDOMNode().value=this.pageName();
    }
  },
  preview:function() {
    this.props.action("preview");
  },
  endpreview:function() {
    this.props.action("endpreview");
  },
  previewmenu:function() {

    if (this.props.preview) {
      return React.createElement("button", {className: "btn btn-warning", onClick: this.endpreview}, "End Preview")
    } else {
      return React.createElement("button", {className: "btn btn-success", onClick: this.preview}, "Preview")
    }
  },
  renderStatus:function() {
    if (!this.props.selecting)return;
    var out=[];
    out.push(React.createElement("span", {className: "label label-default"}, this.props.selecting.start));
    if (this.props.selecting.end!=this.props.selecting.start) {
      out.push(React.createElement("span", {className: "label label-default"}, this.props.selecting.end));
    }
      
    return out;      
  },
  render: function() {
    if (!this.props.page) return React.createElement("div", null)
    return (
      React.createElement("div", {className: "row"}, 
      React.createElement("div", {className: "col-md-5"}, 
        React.createElement("div", {className: "input-group"}, 
             React.createElement("span", {className: "input-group-btn"}, 
              React.createElement("button", {id: "btnfirstpage", className: "btn btn-default", onClick: this.firstPage}, "First"), 
              React.createElement("button", {className: "btn btn-default", onClick: this.prevPage}, "Prev")
             ), 
            React.createElement("input", {id: "pageid", ref: "pageid", defaultValue: this.pageName(), onChange: this.pageIdChange, className: "form-control"}), 
            React.createElement("span", {className: "input-group-btn"}, 
              React.createElement("button", {className: "btn btn-default", onClick: this.nextPage}, "Next"), 
              React.createElement("button", {id: "btnlastpage", className: "btn btn-default", onClick: this.lastPage}, "Last")
            )
        )
      ), 

      React.createElement("div", {className: "col-md-2"}, 
        this.previewmenu(), 
        this.renderStatus()
      )
      )
    );
  }
});

module.exports=nav_tibetan;