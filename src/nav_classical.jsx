var React=require("react");
var nav_classical = React.createClass({
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
    this.pageidtimer=setTimeout(this.setPageId.bind(this) ,500);
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
  preview:function() {
    this.props.action("preview");
  },
  endpreview:function() {
    this.props.action("endpreview");
  },
  previewmenu:function() {
    if (this.props.preview) {
      return <button className="btn btn-warning" onClick={this.endpreview}>End Preview</button>
    } else {
      return <button className="btn btn-success" onClick={this.preview}>Preview</button>
    }
  },
  renderStatus:function() {
    if (!this.props.selecting)return;
    var out=[];
    out.push(<span className="label label-default">{this.props.selecting.start}</span>);
    if (this.props.selecting.end!=this.props.selecting.start) {
      out.push(<span className="label label-default">{this.props.selecting.end}</span>);
    }
    out.push(<span> {this.props.page.id}</span>);
    return out;      
  },
  componentDidUpdate:function() {
    //don't now why , but defaultValue doesn't work here
    if (this.refs.pageid) this.refs.pageid.getDOMNode().value=this.pageName();
  },
  render: function() {
    if (!this.props.page) return <div></div>
    return (
      <div className="row">
      <div className="col-md-7">
        <div className="input-group">
             <span className="input-group-btn">
              <button id="btnfirstpage" className="btn btn-default" onClick={this.firstPage}>First</button>
              <button className="btn btn-default" onClick={this.prevPage}>Prev</button>
             </span>
            <input ref="pageid" onChange={this.pageIdChange} className="form-control" ></input>
            <span className="input-group-btn">
              <button className="btn btn-default" onClick={this.nextPage}>Next</button>
              <button id="btnlastpage" className="btn btn-default" onClick={this.lastPage}>Last</button>
            </span>
        </div>
      </div>

      <div className="col-md-5">
        {this.previewmenu()}
        {this.renderStatus()}
      </div>
      </div>
    );
  }
});
module.exports=nav_classical;