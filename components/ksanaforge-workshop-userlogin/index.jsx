/** @jsx React.DOM */

//var othercomponent=Require("other"); 
var crypto=Require('ksana-document').crypto;
var userlogin = React.createClass({
  getInitialState: function() {
    return {bar: "world"};
  },
  login:function() {
    var user=this.refs.username.getDOMNode().value;
    this.props.action("login",user,this.encryptedpassword());
  },
  logout:function() {
    this.props.action("logout");
  },
  startwork:function() {
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
      <div className="col-md-5">
      <h3>Welcome Back, {this.props.user.name}  {this.isAdmin()} </h3>
      
      <div className="row">
        <div className="col-md-4 pull-right">
        <button id="btnlogout" className="btn btn-lg btn-warning btn-block" onClick={this.logout}>Sign out</button>
        </div>
      </div>
      <hr size="1"/>
      <button id="btnstart" className="btn btn-lg btn-success btn-block" onClick={this.startwork}>Start Work</button>
      </div>
    </div>
    );
  },
  passwordchange:function() {
    this.forceUpdate(); 
  },
  enterusername:function(e) {
    if (e.charCode==13) {
      this.refs.password.getDOMNode().focus();
    }
  },
  enterpassword:function(e) {
    if (e.charCode==13) this.login();
  },
  encryptedpassword:function() {
    if (!this.refs.password) return "";
    var password=this.refs.password.getDOMNode().value;
 //   return password+"!"
    return crypto.SHA1(password).toString();
  },
  renderLogin:function() {
    return (
    <div className="container row">
      <div className="col-md-5 col-md-offset-5">
        <h2 className="form-signin-heading">Please sign in</h2>
        <input onKeyPress={this.enterusername} id="loginname" ref="username" defaultValue={this.props.user.name} className="form-control" placeholder="username" required="true" autofocus="true"></input>
        <input onKeyPress={this.enterpassword} ref="password" type="password" onChange={this.passwordchange}  className="form-control" placeholder="Password"></input>
        <button ref="encrypted" id="btnlogin" className="btn btn-lg btn-primary btn-block" onClick={this.login}>Sign in</button>
        <h2 className="pull-right label label-danger">{this.props.getError()}</h2>
        <hr/>
        <span>Encrypted Password:</span><br/>
        <span>{this.encryptedpassword()}</span>
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