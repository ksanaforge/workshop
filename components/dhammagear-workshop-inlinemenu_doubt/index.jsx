/** @jsx React.DOM */

//var othercomponent=Require("other"); 
var inlinemenu_doubt = React.createClass({
  getInitialState: function() {
    return {bar: "world"};
  },
  changetype:function(e) {
    var type=(typeof e =="string")?e:e.target.attributes["data-markup"].value;
    this.props.markup.type=type;
    this.props.action("markupupdate");
  },
  render: function() {
    return (
      <div className="well">
        <div className="input-group input-group-lg">
          <span className="input-group-addon">$</span>
          <input placeholder="Username" type="text" className="form-control" defaultValue={this.props.text}></input>
          <span className="input-group-addon">.00</span>
        </div><br/>

        <button className="btn btn-success" onClick={this.changetype} data-markup="verb">Yes</button>
        <button className="btn btn-danger" onClick={this.changetype} data-markup="noun">No</button>
      </div>
    );
  }
});
module.exports=inlinemenu_doubt;