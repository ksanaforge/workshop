/** @jsx React.DOM */

//var othercomponent=Require("other"); 
var inlinemenu_suggest_tibetan = React.createClass({
  apply:function(e) {
    this.markup().reason=this.refs.reason.getDOMNode().value;
    this.markup().text=this.refs.inputtext.getDOMNode().value;
    this.markup().insert=this.refs.cbinsert.getDOMNode().checked && this.markup().text.length;
    this.props.action("markupupdate");
  },
  keyup:function(e) {
    if (e.keyCode==13)  this.apply(e);
    else if (e.keyCode==27) this.props.action("markupdate");
  },
  change:function(e) {
    
  },
  clear:function() {
    var n=this.refs.inputtext.getDOMNode();
    n.focus();
    n.value="";
  },
  remove:function() {
    this.props.action("removemarkup",this.props.markup);
  },
  markup:function() {
    return this.props.markup.payload;
  },
  render: function() {
    return ( 
      <div onKeyUp={this.keyup} className="inlinemenu well">
        <span>{this.props.text}</span>
        <span className="input-group input-group-lg">
          <span className="input-group-addon" onClick={this.clear}>{"\u2573"}</span>
          <input ref="inputtext"  onMouseOver={this.movemove} className="focus form-control" onKeyPress={this.change} defaultValue={this.markup().text}></input>
          <span className="input-group-addon"><input ref="cbinsert" defaultChecked={this.markup().insert} type="checkbox"/></span>
        </span>
        <span className="input-group input-group-lg">
          <span className="input-group-addon">Reason</span>
          <textarea rows="5" ref="reason" className="form-control"  defaultValue={this.markup().reason}></textarea>
        </span>
        <span className="row">
          <span className="col-sm-4">
            <button className="form-control btn btn-danger" onClick={this.remove}>Remove</button>
          </span>
          <span className="col-sm-8">
            <button className="pull-right form-control btn btn-success" onClick={this.apply}>Apply</button>
          </span>
        </span>

      </div>
    );
  },
  focus:function() {
    if (this.refs.inputtext) this.refs.inputtext.getDOMNode().focus();
  },
  componentDidMount:function() {
    setTimeout(  this.focus,300);
  },
});
module.exports=inlinemenu_suggest_tibetan;