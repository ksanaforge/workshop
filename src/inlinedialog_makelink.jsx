var React=require("react");
var inlinedialog_makelink = React.createClass({
  getInitialState: function() {
    return {bar: "world"};
  },
  apply:function() {
    this.props.action("makelink",this.props.page,this.props.linktarget,this.props.linksource);
  },
  cancel:function() {
    this.props.action("markupupdate");
  },
  render: function() {
    return ( 
      <div className="well">
        <span className="input-group input-group-lg">
          <span className="input-group-addon">Makelink</span>
        </span>

        <span className="row">
          <span className="col-sm-4">
            <button className="form-control btn btn-danger" onClick={this.cancel}>Cancel</button>
          </span>
          <span className="col-sm-8">
            <button className="pull-right form-control btn btn-success" onClick={this.apply}>Create Link</button>
          </span>
        </span>

      </div>
    );
  }
});
module.exports=inlinedialog_makelink;