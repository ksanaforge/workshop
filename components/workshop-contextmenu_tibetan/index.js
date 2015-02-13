/** @jsx React.DOM */
var contextmenu_tibetan = React.createClass({displayName: "contextmenu_tibetan",
  getInitialState: function() {
    return {selectedText:"",bar: "world"};
  },  
  onPopup:function(context) {
    this.setState(context);
  },  
  copy:function(e) {
    this.props.action("copy",this.state.text);
  },
  searchkeyword:function(e) {
    this.props.action("searchkeyword",this.state.text);
  },
  addSuggestion:function(e){
    this.props.action("addsuggestion");
  },
  markup:function(e) {
    var type=(typeof e =="string")?e:e.target.attributes["data-markup"].value;
    this.props.action("addmarkup",{type:type});
  },
  deleteText:function(e) {
    this.props.action("strikeout");
  },
  clearMarkup:function() { 
    this.props.action("clearmarkup");
  },
  render: function() {
    var disabled=(this.props.len>1)?"disabled":"";
    return ( 
    React.createElement("div", {className: "dropdown"}, 
      React.createElement("button", {className: "btn dropdown-toggle sr-only", type: "button", id: "dropdownMenu1", "data-toggle": "dropdown"}, 
        "Dropdown", 
        React.createElement("span", {className: "caret"})
      ), 
      React.createElement("ul", {className: "dropdown-menu", role: "menu", "aria-labelledby": "dropdownMenu1"}, 
        React.createElement("li", {className: disabled}, React.createElement("a", {role: "menuitem", tabIndex: "-1", href: "#", onClick: this.addSuggestion}, "Suggest")), 
        React.createElement("li", null, React.createElement("a", {role: "menuitem", tabIndex: "-1", href: "#", onClick: this.markup, "data-markup": "comment"}, "Comment")), 
        React.createElement("li", null, React.createElement("a", {role: "menuitem", tabIndex: "-1", href: "#", onClick: this.deleteText}, "Delete")), 
        React.createElement("li", null, React.createElement("a", {role: "menuitem", tabIndex: "-1", href: "#", onClick: this.clearMarkup}, "Clear Markup")), 
        React.createElement("li", {className: "divider"}), 
        React.createElement("li", null, React.createElement("a", {role: "menuitem", tabIndex: "-1", href: "#", onClick: this.searchkeyword}, "Search"))
      )
    ) 
    );
  }
});
module.exports=contextmenu_tibetan;