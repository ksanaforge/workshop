var hasClass=function (el, selector) {
   var className = " " + selector + " ";
   return (" " + el.className + " ").replace(/[\n\t]/g, " ").indexOf(className) > -1;
};

var Create=function(_surface) {
	var surface=_surface;
	var caretnode,carettimer,shiftkey;

  var moveCaret=function(domnode) {
    if (!domnode) return; 
    caretnode=domnode;
    var rect=domnode.getBoundingClientRect();
    var caretdiv=surface.refs.caretdiv.getDOMNode();
    var caret=surface.refs.caret.getDOMNode();
    var surfacerect=surface.refs.surface.getDOMNode().getBoundingClientRect();
    var left=rect.left  -3;
    var top=rect.top;
    caretdiv.style.top=top +"px";
    caretdiv.style.left=left +"px";
    caretdiv.style.height=rect.height +"px";
    surface.refs.surface.getDOMNode().focus();
    surface.props.action("caretmoved",left,top,rect.height);
    //this.moveInputBox(rect);
  };

  var selstartFromCaret=function() {
    if (!caretnode || !caretnode.attributes['data-n']) return ;
    var len=0;
    var sel=parseInt(caretnode.attributes['data-n'].value);
    if (sel!==surface.props.selstart) {
      if (shiftkey) {
        if (sel>surface.props.selstart) {
          len=sel-surface.props.selstart;
          sel=surface.props.selstart;
        }
      }
    }
    return {start:sel,len:len}
  };
  var updateSelStart=function() {
    if (!carettimer) clearTimeout(carettimer);
    carettimer=setTimeout(function(){
      var sel=selstartFromCaret();
      if (!sel) return;//cannot select last token...
      surface.props.onSelection(sel.start,sel.len);
    },100);
  };


  var beginOfLine=function() {
    var n=caretnode.previousSibling;
    while (n&& !hasClass(n,"br")) {
      if (n.previousSibling) n=n.previousSibling;
      else break;
    }
    if (!n) return null;
    return (n.previousSibling==null)?n:n.nextSibling;
  }

  var endOfLine=function() {
    var n=caretnode.nextSibling;
    while (n&& !hasClass(n,"br")) {
      if (n.nextSibling) n=n.nextSibling;
      else break;
    }
    return n;
  }  

  var distance=function(x1,y1,x2,y2) {
    return Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2));
  }
  var moveCaretUp=function() {
    var n=beginOfLine(),ox=caretnode.offsetLeft, oy=caretnode.offsetTop;
    var mindis=100000000, closest=null;
    if (!n) return;
    if (n.previousSibling==null) return;//top line
    n=n.previousSibling;
    while (n) {
      var dis=distance(ox,oy,n.offsetLeft,n.offsetTop);
      if (dis<mindis) {mindis=dis;closest=n;}
      n=n.previousSibling;
    }
    moveCaret(closest);
  };

  var moveCaretDown=function(){
    var n=endOfLine(),ox=caretnode.offsetLeft, oy=caretnode.offsetTop;
    if (!n) return;
    var mindis=100000000, closest=null;
    if (n.nextSibling==null) return;//top line
    n=n.nextSibling;
    while (n) {
      var dis=distance(ox,oy,n.offsetLeft,n.offsetTop);
      if (dis<mindis) {mindis=dis;closest=n;}
      n=n.nextSibling;
    }
    moveCaret(closest);
  };


  var strikeout=function() {
    surface.props.action("strikeout");
  };
  var caretPos=function() {
    var caretpos=0;
    if (surface.props.sellength>0) {
      caretpos=surface.props.selstart+surface.props.sellength;
    } else {
      caretpos=surface.props.selstart;
    }
    return caretpos;
  };

  var addSuggestion=function(start,len,defaulttext) {
    var prev=caretPos();
    if (prev===0) return 0;  
    
    var len=prev-start;
    surface.props.action("addsuggestion",start,len,defaulttext);
  };

  var inlinedialog=function(thekey) {
    var sel={};
    //if (surface.props.sellength==0) {
      var here=selstartFromCaret();
      moveCaret(caretnode.previousSibling);
      var sel=selstartFromCaret();
      moveCaret(caretnode.nextSibling);
      sel.len=here.start-sel.start;

    if (surface.hasMarkupAt(sel.start)) {
      surface.openinlinedialog(sel.start);
    } else {
      addSuggestion(sel.start,sel.len,thekey||"");
    }
  }

  var enter=function() {
    var prev=caretPos();
    if (prev===0) return 0;  
    var sel=selstartFromCaret();
    var len=prev-sel.start;
    surface.props.action("enter",sel.start,len);
    moveCaret(caretnode.nextSibling);
    updateSelStart();
  }
var validchar=function(kc) {
  return  (kc>=0x41 && kc<=0x5F);
}
this.keypress=function(e) {
  var kc=e.which;
  inlinedialog(String.fromCharCode(kc));
}
this.keydown=function(e) {
   var prevent=true;
    shiftkey=e.shiftKey;
    var kc=e.which;
    if (kc==37) {
      if (e.ctrlKey) {
        if (!surface.inlinedialogopened) surface.props.action("prevmistake");
      } else {
        moveCaret(caretnode.previousSibling);
      }
    }
    else if (kc==39) {
      if (e.ctrlKey) {
        if (!surface.inlinedialogopened) surface.props.action("nextmistake");
      } else {
        moveCaret(caretnode.nextSibling);  
      }
      
    }
    else if (kc==40) moveCaretDown();
    else if (kc==38) moveCaretUp();
    else if (kc==46) strikeout();
    else if (kc==36) moveCaret(beginOfLine());
    else if (kc==35) moveCaret(endOfLine());
    else if (kc==32) inlinedialog();
    else if (kc==13) enter();
    else if (kc==27) surface.closeinlinedialog();
    else if (validchar(kc) || (kc>=112 && kc<=123))  {
      //if (kc==67 && e.ctrlKey) {
      //  surface.props.action("copy",surface.selectedText());
      //} else {
        prevent=false;
      //}
    }
    if (kc>=27&&kc<50)  updateSelStart();
    if (prevent) e.preventDefault();

  }
  this.show=function() {
    //this.refs.surface.getDOMNode().focus();
    var pos=surface.props.selstart+surface.props.sellength;
    var c=surface.refs.surface.getDOMNode().querySelector(
      'span[data-n="'+(pos)+'"]');
    moveCaret(c);
  } 

}

module.exports={Create:Create};