var swjuanstart=[1,49,87,131,191,241,305,369,420,465,521,590,650,709,761,878];
var pageid2juan=function(pg) {
   for (var i=0;i<swjuanstart.length;i++) {
   	   if (pg<swjuanstart[i]) break;
   }
   return i;
}
var digits=function(i,n){
	n=n||4, i=i.toString()
	return '0000000000'.substr(0,n-i.length)+i;
}
var sw_waseda_imgsrc=function(pageid) {
	var page, subpage, juan, offset, fn
	page=pageid.split('-'), subpage=page[1], page=page[0]
	juan=pageid2juan(page);
	offset=Math.floor((page-swjuanstart[juan-1]) *2) + 3;
	if (juan=== 1) offset+=10;
	if (juan=== 8) offset+= 1; //原影像檔多一頁
	if (juan=== 6) offset-= 1; //原影像檔少一頁
	if (subpage==1 || subpage==2 ) offset+=1;
	if (subpage==3) offset+=2;
	switch(juan) { //修正萬卷樓多餘空白頁
		case  1: if (page> 21) { offset--; break }
		case  3: if (page>107) { offset--; break }
		case  4: if (page>159) { offset--; break }
		case  5: if (page>217) { offset--; break }
		case  7: if (page>338) { offset--; break }
		case  8: if (page>405) { offset--; break }
		case 11: if (page>572) { offset--; break }
	}
	if (!offset) {
		return '';
	}
	fn='http://archive.wul.waseda.ac.jp/kosho/ho04/ho04_00026/ho04_00026_'+digits(juan)+'/ho04_00026_'+digits(juan)+'_p'+digits(offset+1)+'.jpg'
	return fn;
}
var adjustImage=function(img,pagename,container) {
	img.style.width="250%";
	container.scrollTop=img.offsetHeight*0.27;
	if (pagename.indexOf("-1")>0 || pagename.indexOf("-3")>0) {
		container.scrollLeft = img.offsetWidth/2;
	} else container.scrollLeft = img.offsetWidth* 0.15;

}
module.exports = { getImage:sw_waseda_imgsrc , adjustImage:adjustImage} ;