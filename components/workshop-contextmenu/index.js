/** @jsx React.DOM */

var contextmenu = React.createClass({displayName: "contextmenu",
  getInitialState: function() {
    return {selectedText:"",bar: "world"};
  },  
  onPopup:function(context) {
    this.setState(context);
  },   
  markup:function(e) {
    var type=(typeof e =="string")?e:e.target.attributes["data-markup"].value;
    this.props.action("addMarkup",{type:type})
  },
  clearMarkup:function() { 
    this.props.action("clearmarkups");
  },
  render: function() {
    return ( 
    React.createElement("div", {className: "dropdown"}, 
      React.createElement("button", {className: "btn dropdown-toggle sr-only", type: "button", id: "dropdownMenu1", "data-toggle": "dropdown"}, 
        "Dropdown", 
        React.createElement("span", {className: "caret"})
      ), 
      React.createElement("ul", {className: "dropdown-menu", role: "menu", "aria-labelledby": "dropdownMenu1"}, 
        React.createElement("li", null, React.createElement("a", {role: "menuitem", tabIndex: "-1", href: "#", onClick: this.changeText}, "Change Text")), 
        React.createElement("li", null, React.createElement("a", {role: "menuitem", tabIndex: "-1", href: "#", onClick: this.markup, "data-markup": "suggest"}, "Suggest")), 
        React.createElement("li", null, React.createElement("a", {role: "menuitem", tabIndex: "-1", href: "#", onClick: this.markup, "data-markup": "noun"}, "break")), 
        React.createElement("li", null, React.createElement("a", {role: "menuitem", tabIndex: "-1", href: "#", onClick: this.markup, "data-markup": "verb"}, "Verb")), 
        React.createElement("li", null, React.createElement("a", {role: "menuitem", tabIndex: "-1", href: "#", onClick: this.clearMarkup}, "Clear Markup")), 
        React.createElement("li", null, React.createElement("a", {role: "menuitem", tabIndex: "-1", href: "#"}, "Copy ", this.state.text)), 
        React.createElement("li", {className: "divider"}), 
        React.createElement("li", null, React.createElement("a", {role: "menuitem", tabIndex: "-1", href: "#"}, "Extra Markup"))
      )
    ) 
    );
  }
});
module.exports=contextmenu;