/** @jsx React.DOM */

//var othercomponent=Require("other"); 

var Change=React.createClass({
  render:function() {
    var opts={
      "type":"radio" , 
      "data-choice":this.props.i, 
      "name":this.props.name,
      "onChange":this.props.select
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
          {React.DOM.input(opts)}
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
  select:function(e) {
    this.props.markup.selected=parseInt(e.target.attributes['data-choice'].value)+1;
    this.props.action("markupupdate");
    this.setState({now:new Date()});    
  },
  reset:function() {
    this.props.markup.selected=0;
    this.setState({now:new Date()});
    this.props.action("markupupdate");
  },
  choices:function(name) {
    var out=[];
    for (var i=0;i<this.props.markup.choices.length;i++) {
      var checked= ( (this.props.markup.selected-1)===i);//this.props.markup
      out.push(Change({
        ref:'o'+i,
        now:this.state.now,
        select:this.select,
        m:this.props.markup.choices[i],
        i:i,name:name,checked:checked}));
    }
    return out;
  },
  setselected:function() {
    if (this.props.markup.selected) {
      this.refs['o'+(this.props.markup.selected-1)].getDOMNode()
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
  render: function() {
    return (
      <div className="well">
      {this.choices("radioname")}
      <button onClick={this.reset} className="form-control btn btn-large btn-warning">Reset</button>
      </div>
    );
  } 
});
module.exports=inlinemenu_applychange;