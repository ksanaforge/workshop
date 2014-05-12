/** @jsx React.DOM */

if (typeof $ =='undefined') $=Require('jquery');
var buildindex = React.createClass({
  mixins: Require('kse-mixins'),
  getInitialState: function() {
    return {session:{done:false,progress:0,message:""}};
  },
  stoptimer:function() {
    clearInterval(this.buildtimer);
    this.buildtimer=0;
  },
  status:function() {
    this.$ksana('buildStatus',this.state.session).done(function(session){
      if (session.done) this.stoptimer();
      this.setState({session:session});
    })
  },
  start:function(proj) {
    if (this.buildtimer) return;//cannot start another instance
    this.$ksana('buildIndex',proj).done(function(session){
      this.state.session=session;
      $(this.refs.dialog.getDOMNode()).modal('show');
      this.buildtimer=setInterval( this.status,30);
    });
  },
  close:function() {
    $(this.refs.dialog.getDOMNode()).modal('hide');
  },
  stop:function() {
    this.$ksana('stopIndex',this.state.session).done(function(s){
      this.setState({session:s});
    });
  }, 
  buttons:function() {
    if (this.state.session.done) {
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
    var p=this.state.session.progress;
    var msg=this.state.session.message;
    var proj=this.state.session.projectname;
    return (
    <div ref="dialog" className="modal fade" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-sm">
        <div className="modal-content">
        <h3>Building Index for {proj}</h3>
        <div className="progress">
          <div className="progress-bar" role="progressbar" aria-valuenow={p} aria-valuemin="0" aria-valuemax="100" style={{"width": p+"%"}}>
            <span className="sr-only">{p}% Complete</span>
          </div>
        </div>
        <span>{msg}</span>
        {this.buttons()}
      </div>
    </div>
  </div>
    );
  }
});
module.exports=buildindex;