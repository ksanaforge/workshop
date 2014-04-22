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
    this.pageidtimer=null;
  },
  pageIdChange:function() {
    clearTimeout(this.pageidtimer);
    this.pageidtimer=setTimeout(this.setPageId.bind(this) ,200);
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
  componentDidUpdate:function() {
    if (this.refs&&this.refs.pageid) {
      this.refs.pageid.getDOMNode().value=this.pageName();
    }
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
            <input ref="pageid" defaultValue={this.pageName()} onChange={this.pageIdChange} className="form-control" ></input>
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