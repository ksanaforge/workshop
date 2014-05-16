/** @jsx React.DOM */

//var othercomponent=Require("other"); 
var inlinemenu_comment_tibetan = React.createClass({
  apply:function(e) {
    this.markup().comment=this.refs.comment.getDOMNode().value;
    this.props.action("markupupdate");
  },
  keyup:function(e) {
    if (e.keyCode==13)  this.apply(e);
    else if (e.keyCode==27) {
      if (this.refs.comment.getDOMNode().value=="") {
          this.remove();
      } else {
        this.props.action("markupdate");  
      }      
    }
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
        
        <span>Comment</span>
        <textarea rows="5" ref="comment" className="form-control"  defaultValue={this.markup().reason}></textarea>

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
    if (this.refs.comment) this.refs.comment.getDOMNode().focus();
  },
  componentDidMount:function() {
    setTimeout(  this.focus,300);
  },
});
module.exports=inlinemenu_comment_tibetan;