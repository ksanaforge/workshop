/** @jsx React.DOM */

//var othercomponent=Require("other"); 
var inlinemenu_accept_tibetan = React.createClass({
  apply:function(e) {
    this.props.action("markupupdate");
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
  contributor:function() {
    if (this.markup().contributor){
      return  <span className="input-group input-group-md">
          <span className="input-group-addon">contributor</span>
          <input  className="form-control" readonly="true" value={this.markup().contributor}></input>
        </span>
    } else return null;
  },
  render: function() {
    return ( 
      <div className="inlinemenu well">
        <span>{this.props.text}</span>
        <span className="input-group input-group-md">
          <span className="input-group-addon">New text</span>
          <input className="form-control" value={this.markup().text}></input>
          <span className="input-group-addon"><input checked={this.markup().insert} type="checkbox"/></span>
        </span>
        {this.contributor()}

        <span className="row">
          <span className="col-sm-4">
            <button className="form-control btn btn-warning" onClick={this.remove}>Reset</button>
          </span>
          <span className="col-sm-8">
            <button className="pull-right form-control btn btn-success" onClick={this.apply}>Ok</button>
          </span>
        </span>

      </div>
    );
  },
  focus:function() {
    if (this.refs.inputtext) this.refs.inputtext.getDOMNode().focus();
  },
  componentDidMount:function() {
    setTimeout(  this.focus.bind(this),300);
  },
});
module.exports=inlinemenu_accept_tibetan;