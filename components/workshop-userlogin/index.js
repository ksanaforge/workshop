/** @jsx React.DOM */

//var othercomponent=Require("other"); 
var crypto=Require('ksana-document').crypto;
var userlogin = React.createClass({displayName: "userlogin",
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
      return  React.createElement("span", {className: "label label-success"}, "admin")
    }   
  },
  renderLogout:function() {
    return (
      React.createElement("div", {className: "container row"}, 
      React.createElement("div", {className: "col-md-5"}, 
      React.createElement("h3", null, "Welcome Back, ", this.props.user.name, "  ", this.isAdmin(), " "), 
      
      React.createElement("div", {className: "row"}, 
        React.createElement("div", {className: "col-md-4 pull-right"}, 
        React.createElement("button", {id: "btnlogout", className: "btn btn-lg btn-warning btn-block", onClick: this.logout}, "Sign out")
        )
      ), 
      React.createElement("hr", {size: "1"}), 
      React.createElement("button", {id: "btnstart", className: "btn btn-lg btn-success btn-block", onClick: this.startwork}, "Start Work")
      )
    )
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
    React.createElement("div", {className: "container row"}, 
      React.createElement("div", {className: "col-md-5 col-md-offset-5"}, 
        React.createElement("h2", {className: "form-signin-heading"}, "Please sign in"), 
        React.createElement("input", {onKeyPress: this.enterusername, id: "loginname", ref: "username", defaultValue: this.props.user.name, className: "form-control", placeholder: "username", required: "true", autofocus: "true"}), 
        React.createElement("input", {onKeyPress: this.enterpassword, ref: "password", type: "password", onChange: this.passwordchange, className: "form-control", placeholder: "Password"}), 
        React.createElement("button", {ref: "encrypted", id: "btnlogin", className: "btn btn-lg btn-primary btn-block", onClick: this.login}, "Sign in"), 
        React.createElement("h2", {className: "pull-right label label-danger"}, this.props.getError()), 
        React.createElement("hr", null), 
        React.createElement("span", null, "Encrypted Password:"), React.createElement("br", null), 
        React.createElement("span", null, this.encryptedpassword())
      )
    )
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