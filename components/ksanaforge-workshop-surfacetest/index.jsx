/** @jsx React.DOM */

var templates=Require("project").templates;
var D=Require("ksana-document").document;
var surface=Require("docsurface"); 
var surfacetest = React.createClass({
  getInitialState: function() {
    var doc=D.createDocument();
    var page=doc.createPage("道可道，非常道；名可名，非常名。\n無，名天地之始；有，名萬物之母。\n故常無，欲以觀其妙；常有，欲以觀其徼。\n此兩者，同出而異名，同謂之玄。玄之又玄，眾妙之門。");
    return {user:{name:"yap",admin:true},
    page:page,selstart:0,sellength:0};
  }, 
  action:function() { 
    
  },
  onSelection:function(start,len,x,y,e) {
    this.setState({selstart:start,sellength:len});
  },
  render: function() {
    return (
       <surface page={this.state.page}
                user={this.state.user}
                action={this.action}
                template={templates.chinese}
                selstart={this.state.selstart} 
                sellength={this.state.sellength}
                onSelection={this.onSelection}>
       </surface>
    );
  }
});
module.exports=surfacetest;