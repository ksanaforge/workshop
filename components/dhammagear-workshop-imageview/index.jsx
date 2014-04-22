/** @jsx React.DOM */

//var othercomponent=Require("other"); 
var imageview = React.createClass({
  getInitialState: function() {
    return {bar: "world"};
  },
  expandFileName:function(src) {
    var s=src.split('.');
    var folder=s[0];
    var filename=s[1];
    folder='00'+folder;
    folder=folder.substring(folder.length-4);
    filename='00'+filename;
    filename=filename.substring(filename.length-4);

    return this.props.project.filename+'.images/'
    +folder+'/'+folder+'-'+filename+".jpg";
  },
  render: function() {
    return (
      <div>
        <button className="btn btn-default">image control buttons</button>
        <img className="sourceimage" src={this.expandFileName(this.props.src)}/>
      </div>
    );
  }
}); 
module.exports=imageview;