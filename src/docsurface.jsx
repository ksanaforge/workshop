/** @jsx React.DOM */
//if (typeof $=="undefined") $=require("jquery");
var React=require("react");
var Token = React.createClass({
  render:function() {
    var classname=this.props.cls?this.props.cls.trim():"";
    var opts={ 'data-n':this.props.n}
    if (this.props.appendtext) opts['data-to']=this.props.appendtext;
    if (classname) opts.className=classname;
    return React.DOM.span(opts,this.props.ch);
  } 
});
var caret=require("./caret");  
var Surface = React.createClass({
  componentWillUpdate:function(nextProps,nextState) {
    if (nextProps.selstart!=this.props.selstart
      && nextProps.selstart!=this.props.selstart+this.props.sellength) {
      //nextState.markup=null;
      //this.inlinedialogopened=null;
    } 
    if (nextProps.page!=this.props.page) {
      nextState.markup=null;
      this.inlinedialogopened=null;
    }
  },
  selectedText:function() {
    return this.props.page.inscription.substr(this.props.selstart,this.props.sellength);
  },
  moveInputBox:function(rect) {
    var inputbox=this.refs.inputbox.getDOMNode();
    var surfacerect=this.refs.surface.getDOMNode().getBoundingClientRect();
    inputbox.focus();
  },        
  showinlinedialog:function(start) {
    if (!this.refs.inlinedialog) return;
    if (!start && this.state.markup) start=this.state.markup.start;
    if (!start) return;

    var domnode=this.getDOMNode().querySelector('span[data-n="'+start+'"]');
    if (!domnode) return;

    var dialog=this.refs.inlinedialog.getDOMNode();
    var dialogheight=dialog.firstChild.offsetHeight;
    /*
    dialog.style.left=(domnode.offsetLeft - this.getDOMNode().offsetLeft)+"px" ;
    dialog.style.top=(domnode.offsetTop - this.getDOMNode().offsetTop + domnode.offsetHeight)+"px" ;
    
    if (dialogheight>0 && dialogheight<parseInt(dialog.style.top)) {
      dialog.style.top=parseInt(dialog.style.top)-dialogheight-domnode.offsetHeight;
    }
    */
    dialog.style.left="0px";
    dialog.style.top="0px";

    dialog.style.display='inline';
    this.inlinedialogopened=dialog;
  },
  getRange:function() {
    var sel = getSelection();
    if (!sel.rangeCount) return;
    var range = sel.getRangeAt(0);
    var s=range.startContainer.parentElement;
    var e=range.endContainer.parentElement;
    if (s.nodeName!='SPAN' || e.nodeName!='SPAN') return;
    var start=parseInt(s.getAttribute('data-n'),10);
    var end=parseInt(e.getAttribute('data-n'),10);
    return [start,end];
  },
  getSelection:function() {
    var R=this.getRange();
    if (!R) return;
    var start=R[0];
    var end=R[1];
    var length=0;
    var sel = getSelection();
    if (!sel.rangeCount) return;
    var range = sel.getRangeAt(0);    
    var s=range.startContainer.parentElement;
    var e=range.endContainer.parentElement;
    var n=e.nextSibling,nextstart=0;
    if (!n) return null;           
    if (n.nodeName=="SPAN") {
      nextstart=parseInt(n.getAttribute('data-n'),10);  
    }
    var selectionlength=end-start+sel.extentOffset-sel.anchorOffset;
    if (start+selectionlength==nextstart) {//select till end of last token
      length=selectionlength;
    } else {
      if (selectionlength)   length=nextstart-start; //https://github.com/ksanaforge/workshop/issues/50
      else length=end-start;
      //if (range.endOffset>range.startOffset &&!length) length=1;
      if (length<0) {
          var temp=end; end=start; start=end;
      }
    }

    //sel.empty();
    this.refs.surface.getDOMNode().focus();
    return {start:start,len:length};
  },
  openinlinedialog:function(n) {
    var n=parseInt(n); 
    var m=this.getMarkupsAt(n);
    if (!m.length || !this.props.template.inlinedialog) return;
    var mm=m[0];//find markup at position
    for (var i=1;i<m.length;i++) {
      if (m[i].start==n) mm=m[i];
    }
    this.props.onSelection(mm.start,mm.len);
    var dialog=this.props.template.inlinedialog[mm.payload.type];
    if (dialog) {
      this.setState({markup:mm});
    }
  },
  hasMarkupAt:function(n) {
    return this.getMarkupsAt(n).length>0;
  },
  tokenclicked:function(e) {
    if (!e.target.attributes['data-n']) return;
    var n=e.target.attributes['data-n'].value;
    if (n) this.openinlinedialog(n);
    return (!!n);
  },
  mouseDown:function(e) {
    if (this.inlinedialogopened) {
        e.preventDefault();
        return;
    }
    if(e.button === 0) this.leftMButtonDown = true;
  },
  mouseMove:function(e) {
    if (!this.leftMButtonDown) return;
    var sel=this.getRange();
    if (!sel) return;
    if (sel[0]!=this.laststart || this.lastend!=sel[1]) {
      this.props.action("makingselection",sel[0],sel[1]);
    }
    this.laststart=sel[0];
    this.lastend=sel[1];
  },
  nextTokenStart:function(pos) {
    if (!this.offsets)return 0;
    for (var i=0;i<this.offsets.length;i++) {
      if (this.offsets[i]>pos) return this.offsets[i];
    }
    return 0;
  },
  mouseUp:function(e) {
    this.leftMButtonDown=false;
    if (this.inlinedialogopened) return;

    //if (this.inInlineDialog(e.target))return;
    var sel=this.getSelection();
    if (!sel) return;


    if (sel.len==0 && e.button==0 ) { //use e.target
      var n=e.target.attributes['data-n'];
      if (n) {
        if (e.shiftKey && sel.start>this.props.selstart) { //shift key pressed, extend mouse selection
          sel.len=parseInt(n.value)-this.props.selstart;
          sel.start=this.props.selstart;
        } else {
          //this.setState({selstart:parseInt(n.value),sellength:0});
          sel.start=parseInt(n.value);
        }
        var attributes=e.target.getAttribute("class");
        if (attributes && attributes.indexOf("linkto")>-1) {
          var M=this.props.page.markupAt(sel.start);
          this.props.action("openlink",M[0].payload);
        } else{
          this.props.onSelection(sel.start,sel.len,e.pageX,e.pageY,e);
        } 
      }
      return;
    }
    if (!sel) return;
    if (e.button==2) {
      if (this.props.sellength>0) {
        if (sel.start>=this.props.selstart && sel.start<=this.props.selstart+this.props.sellength) {
          sel.start=this.props.selstart;
          sel.len=this.props.sellength;
        } 
      } else if (sel.start>0) {
        var next=this.nextTokenStart(sel.start);
        if (next) {
          sel.len=next-sel.start;
        }
      }   
    } 
    this.showMakelinkDialog(sel.start);
    this.props.onSelection(sel.start,sel.len,e.pageX,e.pageY,e);
  },
  closeinlinedialog:function() {
    if (this.inlinedialogopened) {
      this.inlinedialogopened.style.display='none';
    }
    this.inlinedialogopened=false;
    this.refs.surface.getDOMNode().focus();
    this.setState({markup:false})
  },
  inlinedialogaction:function() {
    this.props.action.apply(this.props,arguments);
    this.closeinlinedialog();
  },
  addMakelinkDialog:function() {
    return <span ref="inlinedialog" className="inlinedialog">
        {this.props.template.makelinkdialog({action:this.inlinedialogaction,
          linktarget:this.state.linktarget,
          linksource:this.state.linksource,
          page:this.props.page,
          user:this.props.user})}
      </span>

  },
  addInlinedialog:function() {
    if (!this.props.template.inlinedialog) return null;
    if (this.state.linktarget) {
      return this.addMakelinkDialog();
    }
    if (!this.state.markup) return null;

    var m=this.state.markup;
    var text=this.props.page.inscription.substr(m.start,m.len);
    var dialog=this.props.template.inlinedialog[m.payload.type];
    if (dialog) return (
      <span ref="inlinedialog" className="inlinedialog">
        {dialog({action:this.inlinedialogaction,text:text,markup:m,
          user:this.props.user})}
      </span>
    );
    return null;
  },
  
  renderRevision:function(R,xml) {
    var extraclass="";
    if (R[0].len===0) {
      extraclass+=" insert"; 
//          replaceto=R[0].payload.text;
      xml.push(<span className={extraclass+" inserttext"}>{R[0].payload.text}</span>);
    } else  {
      if (R[0].payload.text) {
        if (i>=R[0].start && i<R[0].start+R[0].len) extraclass+=" replace"; 
        if (i===R[0].start+R[0].len) {
          xml.push(<span className={extraclass+" replacetext"}>{R[0].payload.text}</span>);
        } 
      }
      else if (i>=R[0].start && i<R[0].start+R[0].len) extraclass+=" delete";  
    }
      //if (R[0].start!=i)replaceto="";
    return extraclass;
  },
  getMarkupsAt:function(offset) {
    return this.props.action("getmarkupsat",offset);
  },
  prepareViewonly:function(page) {
    var admin_viewable_tags=this.props.template.admin_viewable_tags||[];
    if (admin_viewable_tags.length==0) return [];
    var author=this.props.user.name;
    var viewonly=page.filterMarkup(function(m){
      return (admin_viewable_tags.indexOf(m.payload.type)>-1) 
        && (author!=m.payload.author);
    })
    return viewonly;
  },
  putSurfaceElement:function(viewonlys,offsets,idx) {
    var surface_elements=this.props.template.surface_elements; //from workshop-project
    var res=[];
    if (surface_elements)  {
        var viewonly=viewonlys.filter(function(v){return (v.start==offsets[idx]);});
        if (viewonly) viewonly.map(function(v){
          var element=surface_elements[v.payload.type];
          if (element) res.push(React.createElement(element,{payload:v.payload}));
          else {
            console.error("element ",v.payload.type,"not defined in surface_elements")
          }
        });        
    }
    return res;
  },
  toXML : function(opts) {
    var page=this.props.page;
    if (!page) return [];
    var inscription=page.inscription;

    var res=this.props.template.tokenize(inscription);
    var isSkip=this.props.isSkip;
    var TK=res.tokens;
    var offsets=res.offsets;
    this.offsets=offsets;
    if (!TK || !TK.length) return [] ;
    var xml=[], hits=this.props.hits ||[], nhit=0, voff=0;
    var tagset={};//tags used in the page, comma to seperate overlap tag 
    var selstart=opts.selstart||0,sellength=opts.sellength||0;
    var viewonlys = this.prepareViewonly(page);

    for (var i=0;i<TK.length;i++) {
      var tk=TK[i];
      var classes="",extraclass="";
      var markupclasses=[],appendtext="";
      var M=this.getMarkupsAt(offsets[i]);
      if (offsets[i]>=selstart && offsets[i]<selstart+sellength) extraclass+=' selected';
      if (nhit<hits.length){ 
        if (voff>=hits[nhit][0]&& voff<hits[nhit][0]+hits[nhit][2] ) {
          extraclass+=' hl'+hits[nhit][1];
        } else if (voff>=hits[nhit][0]+hits[nhit][2]) {
          nhit++;
        }
      }
      if (!isSkip(tk)) voff++;
      var inlinedialog=null;      
      for (var j in M) {
        markupclasses.push(M[j].payload.type);
        if (M[j].start==offsets[i]) {
          markupclasses.push(M[j].payload.type+"_b");
        }
        if (M[j].start+M[j].len==offsets[i]+1) {
          markupclasses.push(M[j].payload.type+"_e");
        }
        /*
        if (M[j].start+M[j].len==i+1) { //last token
          var text=page.inscription.substr(M[j].start,M[j].len);
          inlinedialog=this.addInlinedialog(M[j],text);
        }
        */
        //append text
        if (M[j].payload.selected) {
          appendtext=M[j].payload.choices[M[j].payload.selected-1].text;
          var insert=M[j].payload.choices[M[j].payload.selected-1].insert;
          if (!insert) extraclass+=" remove";
          if (M[j].start+M[j].len!=offsets[i]+tk.length) appendtext=""; 
        }

        if (typeof M[j].payload.text!='undefined') {
          appendtext=M[j].payload.text;
          var insert=M[j].payload.insert;
          if (!insert) extraclass+=" remove";
          if (M[j].start+M[j].len!=offsets[i]+tk.length) appendtext=""; 
        }
      }  
      markupclasses.sort();
   
      if (markupclasses.length) tagset[markupclasses.join(",")]=true;
      var ch=tk;  
      if (ch==="\n") {ch="\u21a9";extraclass+=' br';}
      classes=(markupclasses.join("__")).trim()+" "+extraclass;
      xml.push(React.createElement(Token,{ key:i , cls:classes ,n:offsets[i],ch:ch, appendtext:appendtext}));
      if (inlinedialog) xml.push(inlinedialog);
      var res=this.putSurfaceElement(viewonlys,offsets,i);
      if (res.length) xml.push(res);
    }     
    xml.push(<Token key={i} n={offsets[i]}/>);

    if (this.props.onTagSet) {
      this.props.onTagSet(Object.keys(tagset).sort(),this.state.uuid);
    }
    if (this.props.preview && this.props.template.typeset) {
      xml=this.props.template.typeset(xml);
    }
    return xml;
  },  
  render: function() {
    var opts={selstart:this.props.selstart, sellength:this.props.sellength};
    var xml=this.toXML(opts); 
 
    return (
      <div  data-id={this.state.uuid} className="surface">
          {this.addInlinedialog()}
          <div ref="surface" tabIndex="0" 
            onKeyDown={this.caret.keydown} 
            onKeyPress={this.caret.keypress} 
            onClick={this.tokenclicked} 
            onMouseDown={this.mouseDown}
            onMouseUp={this.mouseUp}
            onMouseMove={this.mouseMove}
            >{xml}  
          </div> 
          <div ref="caretdiv" className="surface-caret-container">
             <div ref="caret" className="surface-caret">|</div>
          </div>

      </div>
    );
  },
  getInitialState:function() {
    return {uuid:'u'+Math.random().toString().substring(2), 
    markup:null,linktarget:this.props.linktarget,linksource:this.props.linksource};
  },
  componentWillMount:function() {
    this.caret=new caret.Create(this);

  }, 
  showMakelinkDialog:function(dialgpos) {
    if (!this.state.linktarget) return;

    var markups=this.getMarkupsAt(dialogpos);
    var linkby=markups.filter(function(m){return m.payload.type=="linkby"});
 
    //already build link
    if (linkby.length && linkby[0].start==this.state.linktarget.start) return;
    //has other markup at same pos
    if (markups.length !=linkby.length) return; 
    this.showinlinedialog(dialogpos);
  },
  componentDidMount:function() {
    this.showMakelinkDialog(this.props.selstart);
    this.caret.show();
  },
  componentDidUpdate:function() {
    if (this.props.scrollto) this.scrollToSelection();
    this.caret.show();
    this.showinlinedialog();
    
    //$(".viewonlyHolder").popover();
  }
});

module.exports=Surface;