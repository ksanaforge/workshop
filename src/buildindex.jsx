var React=require("react");
var emptystatus={done:false,progress:0,message:""};
var buildindex = React.createClass({
  //mixins: Require('kse-mixins'),
  getInitialState: function() {
    return {status:emptystatus};
  },
  stoptimer:function() {
    clearInterval(this.buildtimer);
    this.buildtimer=0;
  },
  getstatus:function() {
    /*
    this.$ksana('buildStatus',this.state.status).done(function(status){
      var elapsed=Math.floor((new Date()-this.state.starttime)/1000);
      if (status.done) this.stoptimer();
      this.setState({status:status, elapsed:elapsed});
    });
*/
  },
  start:function(proj) {
    if (this.buildtimer) return;//cannot start another instance
    this.setState({status:emptystatus,starttime:new Date(),elapsed:0});
    /*
    this.$ksana('buildIndex',proj).done(function(status){
      this.state.status=status;
      $(this.refs.dialog.getDOMNode()).modal({backdrop:'static'}).modal('show');
      this.buildtimer=setInterval( this.getstatus,1000);
    });
*/
  },
  close:function() {
    $(this.refs.dialog.getDOMNode()).modal('hide');
  },
  stop:function() {
    /*
    this.$ksana('stopIndex',this.state.status).done(function(s){
      this.setState({status:s});
    });
*/
  }, 
  buttons:function() {
    if (this.state.status.done) {
      return (
        <div>
        <button ref="btnclose" onClick={this.close} className="btn btn-success">Close</button>
        </div>
      );
    } else {
      return (
        <div>
        <button ref="btnstop" onClick={this.stop} className="btn btn-danger">Stop Building</button>
        </div>
      )
    }
  },
  componentWillUnmount:function() {
    clearInterval(this.buildtimer);
  },
  render: function() {
    var p=Math.floor(this.state.status.progress * 100);
    var pp=Math.floor(this.state.status.progress * 1000) / 10;
    var msg=this.state.status.message;
    var proj=this.state.status.projectname;
    return (
    <div ref="dialog" className="modal fade" tabIndex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-sm">
        <div className="modal-content well">
        <h3>Building Index for {proj} {pp}%</h3>
        <h4>time elapsed {this.state.elapsed} seconds</h4>
        <div className="progress progress-striped">
          <div className="progress-bar progress-bar-warning"  role="progressbar" aria-valuenow={p} aria-valuemin="0" aria-valuemax="100" style={{"width": p+"%"}}>
            <span className="sr-only">{p}% Complete</span>
          </div>
        </div>
        <span>{msg}</span>
        <div className="pull-right">
        {this.buttons()}
        </div>
      </div>
    </div>
  </div>
    );
  }
});
module.exports=buildindex;