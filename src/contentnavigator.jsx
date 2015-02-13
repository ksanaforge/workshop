/** @jsx React.DOM */

var React=require("react"); 

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
  componentDidUpdate:function() {
    if (this.refs&&this.refs.pageid) {
      this.refs.pageid.getDOMNode().value=this.pageName();
    }
  }, 
  nextMistake:function() {
    this.props.action("nextmistake");
  },
  prevMistake:function() {
    this.props.action("prevmistake");
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
  adminmenu:function() {
    if (this.props.user.admin) {
      return (
              <button className="btn btn-default" onClick={this.nextMistake}>Next mistake</button>
              );
    } else return <div></div>;

  } ,
  renderStatus:function() {
    if (!this.props.selecting)return;
    var out=[];
    out.push(<span className="label label-default">{this.props.selecting.start}</span>);
    if (this.props.selecting.end!=this.props.selecting.start) {
      out.push(<span className="label label-default">{this.props.selecting.end}</span>);
    }
      
    return out;      
  },
  render: function() {
    if (!this.props.page) return <div></div>
    return (
      <div className="row">
      <div className="col-md-4">
        <div className="input-group">
             <span className="input-group-btn">
              <button id="btnfirstpage" className="btn btn-default" onClick={this.firstPage}>First</button>
              <button className="btn btn-default" onClick={this.prevPage}>Prev</button>
             </span>
            <input id="pageid" ref="pageid" defaultValue={this.pageName()} onChange={this.pageIdChange} className="form-control" ></input>
            <span className="input-group-btn">
              <button className="btn btn-default" onClick={this.nextPage}>Next</button>
              <button id="btnlastpage" className="btn btn-default" onClick={this.lastPage}>Last</button>
            </span>
        </div>
      </div>

      <div className="col-md-5">
        {this.adminmenu()}
        {this.previewmenu()}
        {this.renderStatus()}
      </div>
      </div>
    );
  }
});

module.exports=contentnavigator;