/** @jsx React.DOM */

var contextmenu = React.createClass({
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
    <div className="dropdown">
      <button className="btn dropdown-toggle sr-only" type="button" id="dropdownMenu1" data-toggle="dropdown">
        Dropdown
        <span className="caret"></span>
      </button>
      <ul className="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1">
        <li><a role="menuitem" tabIndex="-1" href="#" onClick={this.changeText}>Change Text</a></li>
        <li><a role="menuitem" tabIndex="-1" href="#" onClick={this.markup} data-markup="suggest">Suggest</a></li>
        <li><a role="menuitem" tabIndex="-1" href="#" onClick={this.markup} data-markup="noun">break</a></li>
        <li><a role="menuitem" tabIndex="-1" href="#" onClick={this.markup} data-markup="verb">Verb</a></li>
        <li><a role="menuitem" tabIndex="-1" href="#" onClick={this.clearMarkup}>Clear Markup</a></li>
        <li><a role="menuitem" tabIndex="-1" href="#">Copy {this.state.text}</a></li>
        <li className="divider"></li>
        <li><a role="menuitem" tabIndex="-1" href="#">Extra Markup</a></li>
      </ul>
    </div> 
    );
  }
});
module.exports=contextmenu;