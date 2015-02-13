var React=require("react");
var inlinedialog_doubt = React.createClass({
  getInitialState: function() {
    return {bar: "world"};
  },
  apply:function(e) {
    this.props.markup.reason=this.refs.reason.getDOMNode().value;
    this.props.markup.text=this.refs.inputtext.getDOMNode().value;
    this.props.markup.insert=this.refs.cbinsert.getDOMNode().checked && this.props.markup.text.length;
    this.props.action("markupupdate");
  },
  clear:function() {
    var n=this.refs.inputtext.getDOMNode();
    n.focus();
    n.value="";
  },
  render: function() {
    return ( 
      <div className="well">

        <span className="input-group input-group-lg">
          <span className="input-group-addon" onClick={this.clear}>{"\u2573"}</span>
          <input ref="inputtext"  onMouseOver={this.movemove} className="focus form-control" defaultValue={this.props.markup.text}></input>
          <span className="input-group-addon"><input onChange={this.apply} ref="cbinsert" defaultChecked={this.props.markup.insert} type="checkbox"/></span>
        </span>
        <span className="input-group input-group-lg">
          <span className="input-group-addon">Reason</span>
          <textarea rows="5" ref="reason" className="form-control" defaultValue={this.props.markup.reason}></textarea>
        </span>
        <button className="form-control btn btn-success" onClick={this.apply}>Apply</button>
      </div>
    );
  },
  componentDidMount:function() {
    this.refs.inputtext.getDOMNode().focus();
  },
  componentDidUpdate:function() {
    this.refs.inputtext.getDOMNode().focus();
  }  
});
module.exports=inlinedialog_doubt;