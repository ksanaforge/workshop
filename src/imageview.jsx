var React=require("react"); 
var imageview = React.createClass({
  getInitialState: function() {
    return {bar: "world"};
  },
  expandFileName:function(src) {
    if (src.substring(0,4)=="http") return src;
    var s=src.split('.');
    var folder=s[0];
    var filename=s[1];
    folder='00'+folder;
    folder=folder.substring(folder.length-3);
    filename='00'+filename;
    filename=filename.substring(filename.length-4);

    return "http://dharma-treasure.org/kangyur_images/lijiang/"
    +folder+'/'+folder+'-'+filename+".jpg";
  }, 
  adjustImage:function() {
    //this.refs.imagediv.getDOMNode().style.height="740";
    var maxwidth=document.offsetWidth/2;
    if (!this.props.project.setting) return ;
    var adjustImage=this.props.project.setting.adjustImage;
    var img=this.refs.image.getDOMNode();
    var container=img.parentElement.parentElement;
    if (adjustImage) adjustImage(img,this.props.pagename,container);
  }, 
  componentDidMount:function() {
    this.adjustImage(); 
  }, 
  componentDidUpdate:function() {
    this.adjustImage();
  },   
  render: function() {
    return (
      <div ref="imagediv" id="imagediv"> 
        <img ref="image" className="sourceimage" src={this.expandFileName(this.props.src)}/>
      </div>
    );
  }
}); 
//<button className="btn btn-default">image control buttons</button>
module.exports=imageview;