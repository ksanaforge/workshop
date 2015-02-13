/** @jsx React.DOM */

//var othercomponent=Require("other"); 
var linkbymenu = React.createClass({displayName: "linkbymenu",
  getInitialState: function() {
    return null;
  },
  golink:function(e) {
    var target=e.target;
    while (!target.attributes['data-n'] && target) target=target.parentElement;
    if (!target) return;
    var n=parseInt(target.attributes['data-n'].value);
    var link=this.props.linkby[n];
    this.props.action("openlink",link.payload); 
  },
  renderItem:function(item,n) {
    return React.createElement("li", {className: "linkbymenuitem"}, React.createElement("a", {"data-n": n, role: "menuitem", tabIndex: "-1", href: "#", onClick: this.golink}, item.payload.pagename +"-"+ item.payload.db))
  },
  render: function() {
    return ( 
    React.createElement("div", {className: "dropdown"}, 
      React.createElement("button", {className: "btn dropdown-toggle sr-only", type: "button", id: "dropdownMenu1", "data-toggle": "dropdown"}, 
        "Dropdown", 
        React.createElement("span", {className: "caret"})
      ), 
      React.createElement("ul", {className: "dropdown-menu", role: "menu", "aria-labelledby": "linkbyMenu1"}, 
        this.props.linkby.map(this.renderItem)
      )
    ) 
    );
  }
});
module.exports=linkbymenu;