/** @jsx React.DOM */

//var othercomponent=Require("other"); 

var Change=React.createClass({
  render:function() {
    var opts={
      "className":"btn btn-success",
      "data-choice":this.props.i, 
      "name":this.props.name,
      "onClick":this.props.select
    }
    return (
      <span data-date={this.props.now}>
        <span className="label label-info">{this.props.m.author}</span>
        <span>{this.props.m.text}</span>
       
        {React.DOM.button(opts,"Accept")}
        {this.props.m.reason}
      <hr/>
    </span>);
  }
})
var inlinemenu_applychange = React.createClass({
  getInitialState: function() {
    return {now : new Date()};
  },
  keyup:function(e) {
    if (e.keyCode==13)  this.myanwser(e);
    else if (e.keyCode==27) this.props.action("markupdate");
  },
  markup:function() {
    return this.props.markup.payload;
  },
  select:function(e) {
    var selected=parseInt(e.target.attributes['data-choice'].value);
    var accepted=this.markup().choices[selected];
    var payload={type:"revision" ,text:accepted.text, 
        contributor:accepted.author};
    var m=this.props.markup;
    this.props.action("addmarkupat",m.start,m.len,payload);
    this.props.action("nextmistake");
  },
  myanwser:function() {
    var inputtext=this.refs.inputtext.getDOMNode().value;
    var payload={type:"revision" ,text:inputtext};
    var m=this.props.markup;
    this.props.action("addmarkup",payload,true);
    this.props.action("nextmistake");
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
  clear:function() {
    var n=this.refs.inputtext.getDOMNode();
    n.focus();
    n.value="";
  },  
  close:function() {
    this.props.action("markupupdate");
  },
  otherAnswer:function() {
    return (
    <span className="row">
        <span className="input-group input-group-lg">
          <span className="input-group-addon" onClick={this.clear}>{"\u2573"}</span>
          <input ref="inputtext"  onMouseOver={this.movemove} className="focus form-control" defaultValue={this.markup().text}></input>
        </span>

        <button className="btn btn-warning" onClick={this.close}>Decide later</button>
        <button className="pull-right btn btn-success" onClick={this.myanwser}>Mine is Better</button>

    </span>);
  },
  render: function() {
    return (
      <div onKeyUp={this.keyup} className="inlinemenu well"> 
      <span>{this.props.text}</span><br/>
      {this.choices("radioname")}
      <hr size="1"/>
      {this.otherAnswer()}
      </div>
    );
  } 
});
module.exports=inlinemenu_applychange;