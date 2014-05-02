/** @jsx React.DOM */

var templates=Require("project").templates;
var D=Require("ksana-document").document;
var surface=Require("docsurface"); 
var surfacetest = React.createClass({
  getInitialState: function() {
    var doc=D.createDocument();
    var s="<z>古音古義可互求焉</z><wh>弌</wh><x>古文一</x><z>凡言古文者謂倉頡所作古文也此書法後王尊漢制以小篆爲質</z>\n<z>而兼錄古文籒文所謂今敘篆文合以古籒也小篆之於古籒或仍之或省改之仍者十之八九省改者十之一二</z>\n而已仍則小篆皆古籒也故不更出古籒省改則古籒非小篆也故更出之一二三之本古文明矣何以更出弌弍\n<z>弎也葢所謂即古文而異者當謂之古文奇字</z><wh>元</wh><x>始也</x><z>見爾雅釋詁九家易曰元者氣之始也</z><x>从\n一兀聲</x><z>徐氏鍇云不當有聲字以髡从兀聲䡇从元聲例之徐說非古音元兀相爲平入也凡言从某某聲</z>\n<z>者謂於六書爲形聲也凡文字有義有形有音爾雅已下義書也聲類已下音書也說文形書也凡篆一字先訓其</z>\n<z>義若始也顚也是次釋其形若从某某聲是次釋其音若某聲及讀若某是合三者以完一篆故曰形書也愚袁切</z>\n<z>古音第十四部</z><wh>天</wh><x>顚也</x><z>此以同部曡韵爲訓也凡門聞也戸護也尾微也髮拔也皆此例凡言元始也</z>\n天顚也丕大也吏治人者也皆於六書爲轉注而微有差別元始可互言之天顚不可倒言之葢求義則轉移皆是";
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