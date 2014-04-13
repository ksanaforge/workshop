/** @jsx React.DOM */
var sampledoc=Require("sampledoc");
var contextmenu=Require("contextmenu");
var styles=Require("styles")[0].markups;
var docview=Require("docview"); 
var mainmenu=Require("mainmenu"); 
var devmenu=Require("devmenu"); 
//sfxdfffasdfff
var main = React.createClass({
  getInitialState: function() {
    return {bar: "world2"};
  },
  onSelection:function(api,start,len) {
    if (len==0) { 
      api("toggleMarkup",start,len,{type:"fullstop"});  
    } 
  },
  render: function() {
    return (
      <div>
        <devmenu/>
        <mainmenu/>
        <docview 
          doc={sampledoc} 
          menu={contextmenu} 
          styles={styles}
          onSelection={this.onSelection}
        />
      </div>
    );
  }
});
module.exports=main;