/** @jsx React.DOM */

/* to rename the component, change name of ./component.js and  "dependencies" section of ../../component.js */
var element_comment_tibetan = React.createClass({displayName: "element_comment_tibetan",
  getInitialState: function() {
    return {};
  },
  openViewonly:function(e) {
    var dom=e.target;
    if (dom.className!="viewonlyHolder") dom=dom.parentElement;
    $(dom).popover("toggle");
  },
  render: function() {
    return ( 
    React.createElement("span", {tabindex: "0", href: "#", className: "viewonlyHolder", 
          "data-toggle": "popover", 
          onClick: this.openViewonly, 
          "data-trigger": "focus", 
          "data-content": this.props.payload.hint, 
          title: this.props.payload.type+" by "+this.props.payload.author
    }, React.createElement("span", {className: "author"}, this.props.payload.author.substr(0,2)), ".")
    );
  }
});
module.exports=element_comment_tibetan;