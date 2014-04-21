/** @jsx React.DOM */

//var othercomponent=Require("other"); 

var contentnavigator = React.createClass({
  getInitialState: function() {
    return {pagename:this.pageName()};
  },
  pageName:function() {
    return  this.props.page?this.props.page.name:"";
  },
  setPageId:function() {
    var pagename=this.refs.pageid.getDOMNode().value;
    this.setState({pagename:pagename});
    this.props.action("gopage",pagename);
  },
  nextPage:function() {
    this.props.action("next");
  },
  prevPage:function() {
    this.props.action("prev");
  },
  firstPage:function() {
    this.props.action("first");
  },
  lastPage:function() {
    this.props.action("last");
  },
  render: function() {
    if (!this.props.page) return <div></div>
    return (
      <div className="row">
      <div className="col-md-3">
        <div className="input-group">
             <span className="input-group-btn">
              <button className="btn btn-default" onClick={this.firstPage}>First</button>
              <button className="btn btn-default" onClick={this.prevPage}>Prev</button>
             </span>
            <input ref="pageid" value={this.pageName()} onChange={this.setPageId} className="form-control" ></input>
            <span className="input-group-btn">
              <button className="btn btn-default" onClick={this.nextPage}>Next</button>
              <button className="btn btn-default" onClick={this.lastPage}>Last</button>
            </span>
        </div>
      </div>
      </div>
    );
  }
});

module.exports=contentnavigator;