/** @jsx React.DOM */

if (typeof $ =='undefined') $=Require('jquery');
var emptystatus={done:false,progress:0,message:""};
var buildindex = React.createClass({displayName: "buildindex",
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
        React.createElement("div", null, 
        React.createElement("button", {ref: "btnclose", onClick: this.close, className: "btn btn-success"}, "Close")
        )
      );
    } else {
      return (
        React.createElement("div", null, 
        React.createElement("button", {ref: "btnstop", onClick: this.stop, className: "btn btn-danger"}, "Stop Building")
        )
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
    React.createElement("div", {ref: "dialog", className: "modal fade", tabindex: "-1", role: "dialog", "aria-labelledby": "mySmallModalLabel", "aria-hidden": "true"}, 
      React.createElement("div", {className: "modal-dialog modal-sm"}, 
        React.createElement("div", {className: "modal-content well"}, 
        React.createElement("h3", null, "Building Index for ", proj, " ", pp, "%"), 
        React.createElement("h4", null, "time elapsed ", this.state.elapsed, " seconds"), 
        React.createElement("div", {className: "progress progress-striped"}, 
          React.createElement("div", {className: "progress-bar progress-bar-warning", role: "progressbar", "aria-valuenow": p, "aria-valuemin": "0", "aria-valuemax": "100", style: {"width": p+"%"}}, 
            React.createElement("span", {className: "sr-only"}, p, "% Complete")
          )
        ), 
        React.createElement("span", null, msg), 
        React.createElement("div", {className: "pull-right"}, 
        this.buttons()
        )
      )
    )
  )
    );
  }
});
module.exports=buildindex;