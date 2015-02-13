var React=require("react"); 
var linktomenu = React.createClass({
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
    return <li className="linktomenuitem"> 
    <a data-n={n} role="menuitem" tabIndex="-1" href="#" onClick={this.golink}>
       {item.payload.pagename +"-"+ item.payload.db}
     <br/><span className="menuitem_excerpt" dangerouslySetInnerHTML={{__html:item.payload.text}}></span></a>
    </li> 
  },
  render: function() {
    return ( 
    <div className="dropdown">
      <button className="btn dropdown-toggle sr-only" type="button" id="dropdownMenu1" data-toggle="dropdown">
        Dropdown
        <span className="caret"></span>
      </button>
      <ul className="dropdown-menu" role="menu" aria-labelledby="linktoMenu1">
        {this.props.linkto.map(this.renderItem)}        
      </ul>
    </div> 
    );
  }
});
module.exports=linktomenu;