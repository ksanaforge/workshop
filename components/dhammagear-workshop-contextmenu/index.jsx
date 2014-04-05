/** @jsx React.DOM */

//var othercomponent=Require("other"); 
var contextmenu = React.createClass({
  getInitialState: function() {
    return {bar: "world"};
  },
  render: function() {
    return ( 
      /*
    <div id="contextMenu" className="dropdown clearfix">
        <ul className="dropdown-menu" 
        role="menu" aria-labelledby="dropdownMenu">
            <li><a tabIndex="-1" href="#">Action</a></li>
            <li><a tabIndex="-1" href="#">Another action</a></li>
            <li><a tabIndex="-1" href="#">Something else here</a></li>
            <li className="divider"></li>
            <li><a tabIndex="-1" href="#">Separated link</a></li>
        </ul>
    </div>
    */
    <div className="dropdown clearfix">
      <button className="btn dropdown-toggle sr-only" type="button" id="dropdownMenu1" data-toggle="dropdown">
        Dropdown
        <span className="caret"></span>
      </button>
      <ul className="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1">
        <li role="presentation"><a role="menuitem" tabIndex="-1" href="#">Markup</a></li>
        <li role="presentation"><a role="menuitem" tabIndex="-1" href="#">Copy</a></li>
        <li role="presentation"><a role="menuitem" tabIndex="-1" href="#">common actions</a></li>
        <li role="presentation" className="divider"></li>
        <li role="presentation"><a role="menuitem" tabIndex="-1" href="#">Extra Markup</a></li>
      </ul>
    </div>
    );
  }
});
module.exports=contextmenu;