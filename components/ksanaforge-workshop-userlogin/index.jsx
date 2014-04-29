/** @jsx React.DOM */

//var othercomponent=Require("other"); 
var userlogin = React.createClass({
  getInitialState: function() {
    return {bar: "world"};
  },
  login:function() {
    var user=this.refs.username.getDOMNode().value;
    var admin=this.refs.admin.getDOMNode().checked;
    this.props.action("login",{name:user,admin:admin});
  },
  logout:function() {
    this.props.action("logout");
  },
  start:function() {
    this.props.action("start");
  },
  isAdmin:function() {
    if (this.props.user.admin) {
      return  <span className="label label-success">admin</span>
    }   
  },
  renderLogout:function() {
    return (
      <div className="container row">
      <div className="col-md-5 col-md-offset-5">
      <h3>Welcome Back, {this.props.user.name}  {this.isAdmin()} </h3>
      
      <div className="row">
        <div className="col-md-4 pull-right">
        <button className="btn btn-lg btn-warning btn-block" onClick={this.logout}>Sign out</button>
        </div>
      </div>
      <hr size="1"/>
      <button className="btn btn-lg btn-success btn-block" onClick={this.start}>Start</button>
      </div>
    </div>
    );
  },
  renderLogin:function() {
    return (
    <div className="container row">
      <div className="col-md-5 col-md-offset-5">
      <form className="form-signin" role="form">
        <h2 className="form-signin-heading">Please sign in</h2>
        <input ref="username" defaultValue={this.props.user.name} className="form-control" placeholder="username" required="true" autofocus="true"></input>
        <input type="password" className="form-control" placeholder="Password"></input>
        <label className="checkbox">
          <input type="checkbox" ref="admin" defaultChecked={this.props.user.admin}></input>Database Administrator
        </label>
        <button className="btn btn-lg btn-primary btn-block" onClick={this.login}>Sign in</button>
      </form>
      </div>
    </div>
    );
  },
  render: function() {
    if (this.props.user.name) {
      return this.renderLogout();
    } else {
      return this.renderLogin();
    }
  }
});
module.exports=userlogin;