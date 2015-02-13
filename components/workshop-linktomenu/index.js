/** @jsx React.DOM */

//var othercomponent=Require("other"); 
var linktomenu = React.createClass({displayName: "linktomenu",
  getInitialState: function() {
    return null;
  },
  golink:function(e) {
    var target=e.target;
    while (!target.attributes['data-n'] && target) target=target.parentElement;
    if (!target) return;
    var n=parseInt(target.attributes['data-n'].value);
    var link=this.props.linkto[n];
    this.props.action("openlink",link.payload,this.props.linksource); 
  }, 
  renderItem:function(item,n) {
    return React.createElement("li", {className: "linktomenuitem"}, 
    React.createElement("a", {"data-n": n, role: "menuitem", tabIndex: "-1", href: "#", onClick: this.golink}, 
       item.payload.pagename +"-"+ item.payload.db, 
     React.createElement("br", null), React.createElement("span", {className: "menuitem_excerpt", dangerouslySetInnerHTML: {__html:item.payload.text}}))
    ) 
  },
  render: function() {
    return ( 
    React.createElement("div", {className: "dropdown"}, 
      React.createElement("button", {className: "btn dropdown-toggle sr-only", type: "button", id: "dropdownMenu1", "data-toggle": "dropdown"}, 
        "Dropdown", 
        React.createElement("span", {className: "caret"})
      ), 
      React.createElement("ul", {className: "dropdown-menu", role: "menu", "aria-labelledby": "linktoMenu1"}, 
        this.props.linkto.map(this.renderItem)
      )
    ) 
    );
  }
});
module.exports=linktomenu;