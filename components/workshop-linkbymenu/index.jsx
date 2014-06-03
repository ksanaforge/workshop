/** @jsx React.DOM */

//var othercomponent=Require("other"); 
var linkbymenu = React.createClass({
  getInitialState: function() {
    return null;
  },
  golink:function(e) {
    var target=e.target;
    if (!e.target.attributes['data-n']) target=target.parentElement;
    var n=parseInt(e.target.attributes['data-n'].value);
    var link=this.props.linkby[n];
    this.props.action("openlink",link.payload); 
  },
  renderItem:function(item,n) {
    return <li className="linkbymenuitem"><a data-n={n} role="menuitem" tabIndex="-1" href="#" onClick={this.golink}>{item.payload.pagename +"-"+ item.payload.db}</a></li>
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