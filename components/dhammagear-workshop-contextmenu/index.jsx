/** @jsx React.DOM */

//var othercomponent=Require("other"); 
var contextmenu = React.createClass({
  getInitialState: function() {
    return {selectedText:"",bar: "world"};
  },
  onPopup:function(context) {
    this.setState(context);
  },
  markup:function(e) {
    var type=(typeof e =="string")?e:e.target.attributes["data-markup"].value;
    this.props.onPageAction("addMarkup",this.state.selstart,this.state.sellength,{type:type})
  },
  clearMarkup:function() { 
    this.props.onPageAction("clearMarkups",this.state.selstart,this.state.sellength);
  },
  render: function() {
    return ( 
    <div className="dropdown clearfix">
      <button className="btn dropdown-toggle sr-only" type="button" id="dropdownMenu1" data-toggle="dropdown">
        Dropdown
        <span className="caret"></span>
      </button>
      <ul className="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1">
        <li role="presentation"><a role="menuitem" tabIndex="-1" href="#" onClick={this.markup} data-markup="noun">Markup</a></li>
        <li role="presentation"><a role="menuitem" tabIndex="-1" href="#" onClick={this.clearMarkup}>Clear Markup</a></li>
        <li role="presentation"><a role="menuitem" tabIndex="-1" href="#">Copy {this.state.text}</a></li>
        <li role="presentation"><a role="menuitem" tabIndex="-1" href="#">common actions</a></li>
        <li role="presentation" className="divider"></li>
        <li role="presentation"><a role="menuitem" tabIndex="-1" href="#">Extra Markup</a></li>
      </ul>
    </div>
    );
  }
});
module.exports=contextmenu;