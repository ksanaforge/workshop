var React=require("react");
var contextmenu_classical = React.createClass({
  getInitialState: function() {
    return {selectedText:"",bar: "world"};
  },  
  onPopup:function(context) {
    this.setState(context);
  },  
  copy:function(e) {
    if (!process) return;
    var gui = nodeRequire('nw.gui');
    var clipboard = gui.Clipboard.get();
    var text=e.target.attributes['data-text'].value;
    clipboard.set(text); 
  },  
  searchkeyword:function(e) {
    this.props.action("searchkeyword",this.state.text);
  },

  markup:function(e) {
    var type=(typeof e =="string")?e:e.target.attributes["data-markup"].value;
    this.props.action("addmarkup",{type:type});
  }, 
  linebreak:function(e) {
    this.props.action("addmarkup",{type:"suggest",text:"※",insert:"true"},true);
  },
  deleteText:function(e) {
    this.props.action("strikeout");
  },
  clearMarkup:function() { 
    this.props.action("clearmarkup");
  },
  render: function() {
    return ( 
    <div className="dropdown">
      <button className="btn dropdown-toggle sr-only" type="button" id="dropdownMenu1" data-toggle="dropdown">
        Dropdown
        <span className="caret"></span>
      </button>
      <ul className="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1">
        <li><a role="menuitem" tabIndex="-1" href="#" onClick={this.markup} data-markup="suggest">Suggest</a></li>
        <li><a role="menuitem" tabIndex="-1" href="#" onClick={this.deleteText}>Delete</a></li>
        <li><a role="menuitem" tabIndex="-1" href="#" onClick={this.linebreak}>line break</a></li>
        <li><a role="menuitem" tabIndex="-1" href="#" onClick={this.clearMarkup}>Clear Markup</a></li>
        <li className="divider"></li>
        <li><a role="menuitem" tabIndex="-1" href="#" onClick={this.copy} data-text={this.state.text}>Copy</a></li>
        <li><a role="menuitem" tabIndex="-1" href="#" onClick={this.searchkeyword}>Search</a></li>        
      </ul>
    </div> 
    );
  }
});
module.exports=contextmenu_classical;