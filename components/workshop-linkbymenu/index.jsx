/** @jsx React.DOM */

//var othercomponent=Require("other"); 
var linkbymenu = React.createClass({
  getInitialState: function() {
    return null;
  },
  golink:function(e) {
    console.log(e);
  },
  renderItem:function(item) {
    return <li className="linkbymenuitem"><a role="menuitem" tabIndex="-1" href="#" onClick={this.golink}>{item.payload.pagename} - {item.payload.db}</a></li>
  },
  render: function() {
    return ( 
    <div className="dropdown">
      <button className="btn dropdown-toggle sr-only" type="button" id="dropdownMenu1" data-toggle="dropdown">
        Dropdown
        <span className="caret"></span>
      </button>
      <ul className="dropdown-menu" role="menu" aria-labelledby="linkbyMenu1">
        {this.props.linkby.map(this.renderItem)}        
      </ul>
    </div> 
    );
  }
});
module.exports=linkbymenu;