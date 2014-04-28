/** @jsx React.DOM */

//var othercomponent=Require("other"); 

var Change=React.createClass({
  render:function() {
    var opts={
      "data-choice":this.props.i, 
      "name":this.props.name,
      "onClick":this.props.select
    }
    var isInsert=function(m) {
      if (m.insert)
        return <span className="input-group-addon"><input type="checkbox" checked="true"></input></span>
      else return "";
    }
    return (
      <span data-date={this.props.now}>
      <span className="input-group input-group-lg">
        <span className="input-group-addon">{this.props.m.author}</span>
        <input type="text" className="form-control" value={this.props.m.text} />
        {isInsert(this.props.m)}
        <span className="input-group-addon">
          {React.DOM.button(opts,"Accept")}
        </span>
      </span>
        {this.props.m.reason}
      <br/>
    </span>);
  }
})
var inlinemenu_applychange = React.createClass({
  getInitialState: function() {
    return {now : new Date()};
  },
  markup:function() {
    return this.props.markup.payload;
  },
  select:function(e) {
    var selected=parseInt(e.target.attributes['data-choice'].value);
    var accepted=this.markup().choices[selected];
    var payload={author:this.props.user.name, 
        insert:accepted.insert ,text:accepted.text, 
        contributor:accepted.author};
    var newmarkup={start:this.props.markup.start,len:this.props.markup.len,
      payload:payload};
    this.props.action("newmarkup",newmarkup);
    
  },
  choices:function(name) {
    var out=[];
    for (var i=0;i<this.markup().choices.length;i++) {
      out.push(Change({
        ref:'o'+i,
        now:this.state.now,
        select:this.select,
        m:this.markup().choices[i],
        i:i,name:name}));
    }
    return out;
  },
  setselected:function() {
    if (this.markup().selected) {
      this.refs['o'+(this.markup().selected-1)].getDOMNode()
      .querySelector("input[type=radio]").checked=true;
    } else {
      var radio=this.getDOMNode().querySelectorAll("input[type=radio]");
      for (var i=0;i<radio.length;i++) {
        radio[i].checked=false;
      }
    }
  },
  componentDidMount:function() {
    this.setselected();
  },
  componentDidUpdate:function() {
    this.setselected();
  },
  otherAnswer:function() {
    return <span>other</span>
  },
  render: function() {
    return (
      <div className="well">
      {this.choices("radioname")}
      {this.otherAnswer()}
      </div>
    );
  } 
});
module.exports=inlinemenu_applychange;