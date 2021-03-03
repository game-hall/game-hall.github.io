var QRCode;!function(){function a(a){this.mode=c.MODE_8BIT_BYTE,this.data=a,this.parsedData=[];for(var b=[],d=0,e=this.data.length;e>d;d++){var f=this.data.charCodeAt(d);f>65536?(b[0]=240|(1835008&f)>>>18,b[1]=128|(258048&f)>>>12,b[2]=128|(4032&f)>>>6,b[3]=128|63&f):f>2048?(b[0]=224|(61440&f)>>>12,b[1]=128|(4032&f)>>>6,b[2]=128|63&f):f>128?(b[0]=192|(1984&f)>>>6,b[1]=128|63&f):b[0]=f,this.parsedData=this.parsedData.concat(b)}this.parsedData.length!=this.data.length&&(this.parsedData.unshift(191),this.parsedData.unshift(187),this.parsedData.unshift(239))}function b(a,b){this.typeNumber=a,this.errorCorrectLevel=b,this.modules=null,this.moduleCount=0,this.dataCache=null,this.dataList=[]}function i(a,b){if(void 0==a.length)throw new Error(a.length+"/"+b);for(var c=0;c<a.length&&0==a[c];)c++;this.num=new Array(a.length-c+b);for(var d=0;d<a.length-c;d++)this.num[d]=a[d+c]}function j(a,b){this.totalCount=a,this.dataCount=b}function k(){this.buffer=[],this.length=0}function m(){return"undefined"!=typeof CanvasRenderingContext2D}function n(){var a=!1,b=navigator.userAgent;return/android/i.test(b)&&(a=!0,aMat=b.toString().match(/android ([0-9]\.[0-9])/i),aMat&&aMat[1]&&(a=parseFloat(aMat[1]))),a}function r(a,b){for(var c=1,e=s(a),f=0,g=l.length;g>=f;f++){var h=0;switch(b){case d.L:h=l[f][0];break;case d.M:h=l[f][1];break;case d.Q:h=l[f][2];break;case d.H:h=l[f][3]}if(h>=e)break;c++}if(c>l.length)throw new Error("Too long data");return c}function s(a){var b=encodeURI(a).toString().replace(/\%[0-9a-fA-F]{2}/g,"a");return b.length+(b.length!=a?3:0)}a.prototype={getLength:function(){return this.parsedData.length},write:function(a){for(var b=0,c=this.parsedData.length;c>b;b++)a.put(this.parsedData[b],8)}},b.prototype={addData:function(b){var c=new a(b);this.dataList.push(c),this.dataCache=null},isDark:function(a,b){if(0>a||this.moduleCount<=a||0>b||this.moduleCount<=b)throw new Error(a+","+b);return this.modules[a][b]},getModuleCount:function(){return this.moduleCount},make:function(){this.makeImpl(!1,this.getBestMaskPattern())},makeImpl:function(a,c){this.moduleCount=4*this.typeNumber+17,this.modules=new Array(this.moduleCount);for(var d=0;d<this.moduleCount;d++){this.modules[d]=new Array(this.moduleCount);for(var e=0;e<this.moduleCount;e++)this.modules[d][e]=null}this.setupPositionProbePattern(0,0),this.setupPositionProbePattern(this.moduleCount-7,0),this.setupPositionProbePattern(0,this.moduleCount-7),this.setupPositionAdjustPattern(),this.setupTimingPattern(),this.setupTypeInfo(a,c),this.typeNumber>=7&&this.setupTypeNumber(a),null==this.dataCache&&(this.dataCache=b.createData(this.typeNumber,this.errorCorrectLevel,this.dataList)),this.mapData(this.dataCache,c)},setupPositionProbePattern:function(a,b){for(var c=-1;7>=c;c++)if(!(-1>=a+c||this.moduleCount<=a+c))for(var d=-1;7>=d;d++)-1>=b+d||this.moduleCount<=b+d||(this.modules[a+c][b+d]=c>=0&&6>=c&&(0==d||6==d)||d>=0&&6>=d&&(0==c||6==c)||c>=2&&4>=c&&d>=2&&4>=d?!0:!1)},getBestMaskPattern:function(){for(var a=0,b=0,c=0;8>c;c++){this.makeImpl(!0,c);var d=f.getLostPoint(this);(0==c||a>d)&&(a=d,b=c)}return b},createMovieClip:function(a,b,c){var d=a.createEmptyMovieClip(b,c),e=1;this.make();for(var f=0;f<this.modules.length;f++)for(var g=f*e,h=0;h<this.modules[f].length;h++){var i=h*e,j=this.modules[f][h];j&&(d.beginFill(0,100),d.moveTo(i,g),d.lineTo(i+e,g),d.lineTo(i+e,g+e),d.lineTo(i,g+e),d.endFill())}return d},setupTimingPattern:function(){for(var a=8;a<this.moduleCount-8;a++)null==this.modules[a][6]&&(this.modules[a][6]=0==a%2);for(var b=8;b<this.moduleCount-8;b++)null==this.modules[6][b]&&(this.modules[6][b]=0==b%2)},setupPositionAdjustPattern:function(){for(var a=f.getPatternPosition(this.typeNumber),b=0;b<a.length;b++)for(var c=0;c<a.length;c++){var d=a[b],e=a[c];if(null==this.modules[d][e])for(var g=-2;2>=g;g++)for(var h=-2;2>=h;h++)this.modules[d+g][e+h]=-2==g||2==g||-2==h||2==h||0==g&&0==h?!0:!1}},setupTypeNumber:function(a){for(var b=f.getBCHTypeNumber(this.typeNumber),c=0;18>c;c++){var d=!a&&1==(1&b>>c);this.modules[Math.floor(c/3)][c%3+this.moduleCount-8-3]=d}for(var c=0;18>c;c++){var d=!a&&1==(1&b>>c);this.modules[c%3+this.moduleCount-8-3][Math.floor(c/3)]=d}},setupTypeInfo:function(a,b){for(var c=this.errorCorrectLevel<<3|b,d=f.getBCHTypeInfo(c),e=0;15>e;e++){var g=!a&&1==(1&d>>e);6>e?this.modules[e][8]=g:8>e?this.modules[e+1][8]=g:this.modules[this.moduleCount-15+e][8]=g}for(var e=0;15>e;e++){var g=!a&&1==(1&d>>e);8>e?this.modules[8][this.moduleCount-e-1]=g:9>e?this.modules[8][15-e-1+1]=g:this.modules[8][15-e-1]=g}this.modules[this.moduleCount-8][8]=!a},mapData:function(a,b){for(var c=-1,d=this.moduleCount-1,e=7,g=0,h=this.moduleCount-1;h>0;h-=2)for(6==h&&h--;;){for(var i=0;2>i;i++)if(null==this.modules[d][h-i]){var j=!1;g<a.length&&(j=1==(1&a[g]>>>e));var k=f.getMask(b,d,h-i);k&&(j=!j),this.modules[d][h-i]=j,e--,-1==e&&(g++,e=7)}if(d+=c,0>d||this.moduleCount<=d){d-=c,c=-c;break}}}},b.PAD0=236,b.PAD1=17,b.createData=function(a,c,d){for(var e=j.getRSBlocks(a,c),g=new k,h=0;h<d.length;h++){var i=d[h];g.put(i.mode,4),g.put(i.getLength(),f.getLengthInBits(i.mode,a)),i.write(g)}for(var l=0,h=0;h<e.length;h++)l+=e[h].dataCount;if(g.getLengthInBits()>8*l)throw new Error("code length overflow. ("+g.getLengthInBits()+">"+8*l+")");for(g.getLengthInBits()+4<=8*l&&g.put(0,4);0!=g.getLengthInBits()%8;)g.putBit(!1);for(;;){if(g.getLengthInBits()>=8*l)break;if(g.put(b.PAD0,8),g.getLengthInBits()>=8*l)break;g.put(b.PAD1,8)}return b.createBytes(g,e)},b.createBytes=function(a,b){for(var c=0,d=0,e=0,g=new Array(b.length),h=new Array(b.length),j=0;j<b.length;j++){var k=b[j].dataCount,l=b[j].totalCount-k;d=Math.max(d,k),e=Math.max(e,l),g[j]=new Array(k);for(var m=0;m<g[j].length;m++)g[j][m]=255&a.buffer[m+c];c+=k;var n=f.getErrorCorrectPolynomial(l),o=new i(g[j],n.getLength()-1),p=o.mod(n);h[j]=new Array(n.getLength()-1);for(var m=0;m<h[j].length;m++){var q=m+p.getLength()-h[j].length;h[j][m]=q>=0?p.get(q):0}}for(var r=0,m=0;m<b.length;m++)r+=b[m].totalCount;for(var s=new Array(r),t=0,m=0;d>m;m++)for(var j=0;j<b.length;j++)m<g[j].length&&(s[t++]=g[j][m]);for(var m=0;e>m;m++)for(var j=0;j<b.length;j++)m<h[j].length&&(s[t++]=h[j][m]);return s};for(var c={MODE_NUMBER:1,MODE_ALPHA_NUM:2,MODE_8BIT_BYTE:4,MODE_KANJI:8},d={L:1,M:0,Q:3,H:2},e={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7},f={PATTERN_POSITION_TABLE:[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],G15:1335,G18:7973,G15_MASK:21522,getBCHTypeInfo:function(a){for(var b=a<<10;f.getBCHDigit(b)-f.getBCHDigit(f.G15)>=0;)b^=f.G15<<f.getBCHDigit(b)-f.getBCHDigit(f.G15);return(a<<10|b)^f.G15_MASK},getBCHTypeNumber:function(a){for(var b=a<<12;f.getBCHDigit(b)-f.getBCHDigit(f.G18)>=0;)b^=f.G18<<f.getBCHDigit(b)-f.getBCHDigit(f.G18);return a<<12|b},getBCHDigit:function(a){for(var b=0;0!=a;)b++,a>>>=1;return b},getPatternPosition:function(a){return f.PATTERN_POSITION_TABLE[a-1]},getMask:function(a,b,c){switch(a){case e.PATTERN000:return 0==(b+c)%2;case e.PATTERN001:return 0==b%2;case e.PATTERN010:return 0==c%3;case e.PATTERN011:return 0==(b+c)%3;case e.PATTERN100:return 0==(Math.floor(b/2)+Math.floor(c/3))%2;case e.PATTERN101:return 0==b*c%2+b*c%3;case e.PATTERN110:return 0==(b*c%2+b*c%3)%2;case e.PATTERN111:return 0==(b*c%3+(b+c)%2)%2;default:throw new Error("bad maskPattern:"+a)}},getErrorCorrectPolynomial:function(a){for(var b=new i([1],0),c=0;a>c;c++)b=b.multiply(new i([1,g.gexp(c)],0));return b},getLengthInBits:function(a,b){if(b>=1&&10>b)switch(a){case c.MODE_NUMBER:return 10;case c.MODE_ALPHA_NUM:return 9;case c.MODE_8BIT_BYTE:return 8;case c.MODE_KANJI:return 8;default:throw new Error("mode:"+a)}else if(27>b)switch(a){case c.MODE_NUMBER:return 12;case c.MODE_ALPHA_NUM:return 11;case c.MODE_8BIT_BYTE:return 16;case c.MODE_KANJI:return 10;default:throw new Error("mode:"+a)}else{if(!(41>b))throw new Error("type:"+b);switch(a){case c.MODE_NUMBER:return 14;case c.MODE_ALPHA_NUM:return 13;case c.MODE_8BIT_BYTE:return 16;case c.MODE_KANJI:return 12;default:throw new Error("mode:"+a)}}},getLostPoint:function(a){for(var b=a.getModuleCount(),c=0,d=0;b>d;d++)for(var e=0;b>e;e++){for(var f=0,g=a.isDark(d,e),h=-1;1>=h;h++)if(!(0>d+h||d+h>=b))for(var i=-1;1>=i;i++)0>e+i||e+i>=b||(0!=h||0!=i)&&g==a.isDark(d+h,e+i)&&f++;f>5&&(c+=3+f-5)}for(var d=0;b-1>d;d++)for(var e=0;b-1>e;e++){var j=0;a.isDark(d,e)&&j++,a.isDark(d+1,e)&&j++,a.isDark(d,e+1)&&j++,a.isDark(d+1,e+1)&&j++,(0==j||4==j)&&(c+=3)}for(var d=0;b>d;d++)for(var e=0;b-6>e;e++)a.isDark(d,e)&&!a.isDark(d,e+1)&&a.isDark(d,e+2)&&a.isDark(d,e+3)&&a.isDark(d,e+4)&&!a.isDark(d,e+5)&&a.isDark(d,e+6)&&(c+=40);for(var e=0;b>e;e++)for(var d=0;b-6>d;d++)a.isDark(d,e)&&!a.isDark(d+1,e)&&a.isDark(d+2,e)&&a.isDark(d+3,e)&&a.isDark(d+4,e)&&!a.isDark(d+5,e)&&a.isDark(d+6,e)&&(c+=40);for(var k=0,e=0;b>e;e++)for(var d=0;b>d;d++)a.isDark(d,e)&&k++;var l=Math.abs(100*k/b/b-50)/5;return c+=10*l}},g={glog:function(a){if(1>a)throw new Error("glog("+a+")");return g.LOG_TABLE[a]},gexp:function(a){for(;0>a;)a+=255;for(;a>=256;)a-=255;return g.EXP_TABLE[a]},EXP_TABLE:new Array(256),LOG_TABLE:new Array(256)},h=0;8>h;h++)g.EXP_TABLE[h]=1<<h;for(var h=8;256>h;h++)g.EXP_TABLE[h]=g.EXP_TABLE[h-4]^g.EXP_TABLE[h-5]^g.EXP_TABLE[h-6]^g.EXP_TABLE[h-8];for(var h=0;255>h;h++)g.LOG_TABLE[g.EXP_TABLE[h]]=h;i.prototype={get:function(a){return this.num[a]},getLength:function(){return this.num.length},multiply:function(a){for(var b=new Array(this.getLength()+a.getLength()-1),c=0;c<this.getLength();c++)for(var d=0;d<a.getLength();d++)b[c+d]^=g.gexp(g.glog(this.get(c))+g.glog(a.get(d)));return new i(b,0)},mod:function(a){if(this.getLength()-a.getLength()<0)return this;for(var b=g.glog(this.get(0))-g.glog(a.get(0)),c=new Array(this.getLength()),d=0;d<this.getLength();d++)c[d]=this.get(d);for(var d=0;d<a.getLength();d++)c[d]^=g.gexp(g.glog(a.get(d))+b);return new i(c,0).mod(a)}},j.RS_BLOCK_TABLE=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],j.getRSBlocks=function(a,b){var c=j.getRsBlockTable(a,b);if(void 0==c)throw new Error("bad rs block @ typeNumber:"+a+"/errorCorrectLevel:"+b);for(var d=c.length/3,e=[],f=0;d>f;f++)for(var g=c[3*f+0],h=c[3*f+1],i=c[3*f+2],k=0;g>k;k++)e.push(new j(h,i));return e},j.getRsBlockTable=function(a,b){switch(b){case d.L:return j.RS_BLOCK_TABLE[4*(a-1)+0];case d.M:return j.RS_BLOCK_TABLE[4*(a-1)+1];case d.Q:return j.RS_BLOCK_TABLE[4*(a-1)+2];case d.H:return j.RS_BLOCK_TABLE[4*(a-1)+3];default:return void 0}},k.prototype={get:function(a){var b=Math.floor(a/8);return 1==(1&this.buffer[b]>>>7-a%8)},put:function(a,b){for(var c=0;b>c;c++)this.putBit(1==(1&a>>>b-c-1))},getLengthInBits:function(){return this.length},putBit:function(a){var b=Math.floor(this.length/8);this.buffer.length<=b&&this.buffer.push(0),a&&(this.buffer[b]|=128>>>this.length%8),this.length++}};var l=[[17,14,11,7],[32,26,20,14],[53,42,32,24],[78,62,46,34],[106,84,60,44],[134,106,74,58],[154,122,86,64],[192,152,108,84],[230,180,130,98],[271,213,151,119],[321,251,177,137],[367,287,203,155],[425,331,241,177],[458,362,258,194],[520,412,292,220],[586,450,322,250],[644,504,364,280],[718,560,394,310],[792,624,442,338],[858,666,482,382],[929,711,509,403],[1003,779,565,439],[1091,857,611,461],[1171,911,661,511],[1273,997,715,535],[1367,1059,751,593],[1465,1125,805,625],[1528,1190,868,658],[1628,1264,908,698],[1732,1370,982,742],[1840,1452,1030,790],[1952,1538,1112,842],[2068,1628,1168,898],[2188,1722,1228,958],[2303,1809,1283,983],[2431,1911,1351,1051],[2563,1989,1423,1093],[2699,2099,1499,1139],[2809,2213,1579,1219],[2953,2331,1663,1273]],o=function(){var a=function(a,b){this._el=a,this._htOption=b};return a.prototype.draw=function(a){function g(a,b){var c=document.createElementNS("http://www.w3.org/2000/svg",a);for(var d in b)b.hasOwnProperty(d)&&c.setAttribute(d,b[d]);return c}var b=this._htOption,c=this._el,d=a.getModuleCount();Math.floor(b.width/d),Math.floor(b.height/d),this.clear();var h=g("svg",{viewBox:"0 0 "+String(d)+" "+String(d),width:"100%",height:"100%",fill:b.colorLight});h.setAttributeNS("http://www.w3.org/2000/xmlns/","xmlns:xlink","http://www.w3.org/1999/xlink"),c.appendChild(h),h.appendChild(g("rect",{fill:b.colorDark,width:"1",height:"1",id:"template"}));for(var i=0;d>i;i++)for(var j=0;d>j;j++)if(a.isDark(i,j)){var k=g("use",{x:String(i),y:String(j)});k.setAttributeNS("http://www.w3.org/1999/xlink","href","#template"),h.appendChild(k)}},a.prototype.clear=function(){for(;this._el.hasChildNodes();)this._el.removeChild(this._el.lastChild)},a}(),p="svg"===document.documentElement.tagName.toLowerCase(),q=p?o:m()?function(){function a(){this._elImage.src=this._elCanvas.toDataURL("image/png"),this._elImage.style.display="block",this._elCanvas.style.display="none"}function d(a,b){var c=this;if(c._fFail=b,c._fSuccess=a,null===c._bSupportDataURI){var d=document.createElement("img"),e=function(){c._bSupportDataURI=!1,c._fFail&&_fFail.call(c)},f=function(){c._bSupportDataURI=!0,c._fSuccess&&c._fSuccess.call(c)};return d.onabort=e,d.onerror=e,d.onload=f,d.src="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==",void 0}c._bSupportDataURI===!0&&c._fSuccess?c._fSuccess.call(c):c._bSupportDataURI===!1&&c._fFail&&c._fFail.call(c)}if(this._android&&this._android<=2.1){var b=1/window.devicePixelRatio,c=CanvasRenderingContext2D.prototype.drawImage;CanvasRenderingContext2D.prototype.drawImage=function(a,d,e,f,g,h,i,j){if("nodeName"in a&&/img/i.test(a.nodeName))for(var l=arguments.length-1;l>=1;l--)arguments[l]=arguments[l]*b;else"undefined"==typeof j&&(arguments[1]*=b,arguments[2]*=b,arguments[3]*=b,arguments[4]*=b);c.apply(this,arguments)}}var e=function(a,b){this._bIsPainted=!1,this._android=n(),this._htOption=b,this._elCanvas=document.createElement("canvas"),this._elCanvas.width=b.width,this._elCanvas.height=b.height,a.appendChild(this._elCanvas),this._el=a,this._oContext=this._elCanvas.getContext("2d"),this._bIsPainted=!1,this._elImage=document.createElement("img"),this._elImage.style.display="none",this._el.appendChild(this._elImage),this._bSupportDataURI=null};return e.prototype.draw=function(a){var b=this._elImage,c=this._oContext,d=this._htOption,e=a.getModuleCount(),f=d.width/e,g=d.height/e,h=Math.round(f),i=Math.round(g);b.style.display="none",this.clear();for(var j=0;e>j;j++)for(var k=0;e>k;k++){var l=a.isDark(j,k),m=k*f,n=j*g;c.strokeStyle=l?d.colorDark:d.colorLight,c.lineWidth=1,c.fillStyle=l?d.colorDark:d.colorLight,c.fillRect(m,n,f,g),c.strokeRect(Math.floor(m)+.5,Math.floor(n)+.5,h,i),c.strokeRect(Math.ceil(m)-.5,Math.ceil(n)-.5,h,i)}this._bIsPainted=!0},e.prototype.makeImage=function(){this._bIsPainted&&d.call(this,a)},e.prototype.isPainted=function(){return this._bIsPainted},e.prototype.clear=function(){this._oContext.clearRect(0,0,this._elCanvas.width,this._elCanvas.height),this._bIsPainted=!1},e.prototype.round=function(a){return a?Math.floor(1e3*a)/1e3:a},e}():function(){var a=function(a,b){this._el=a,this._htOption=b};return a.prototype.draw=function(a){for(var b=this._htOption,c=this._el,d=a.getModuleCount(),e=Math.floor(b.width/d),f=Math.floor(b.height/d),g=['<table style="border:0;border-collapse:collapse;">'],h=0;d>h;h++){g.push("<tr>");for(var i=0;d>i;i++)g.push('<td style="border:0;border-collapse:collapse;padding:0;margin:0;width:'+e+"px;height:"+f+"px;background-color:"+(a.isDark(h,i)?b.colorDark:b.colorLight)+';"></td>');g.push("</tr>")}g.push("</table>"),c.innerHTML=g.join("");var j=c.childNodes[0],k=(b.width-j.offsetWidth)/2,l=(b.height-j.offsetHeight)/2;k>0&&l>0&&(j.style.margin=l+"px "+k+"px")},a.prototype.clear=function(){this._el.innerHTML=""},a}();QRCode=function(a,b){if(this._htOption={width:256,height:256,typeNumber:4,colorDark:"#000000",colorLight:"#ffffff",correctLevel:d.H},"string"==typeof b&&(b={text:b}),b)for(var c in b)this._htOption[c]=b[c];"string"==typeof a&&(a=document.getElementById(a)),this._android=n(),this._el=a,this._oQRCode=null,this._oDrawing=new q(this._el,this._htOption),this._htOption.text&&this.makeCode(this._htOption.text)},QRCode.prototype.makeCode=function(a){this._oQRCode=new b(r(a,this._htOption.correctLevel),this._htOption.correctLevel),this._oQRCode.addData(a),this._oQRCode.make(),this._el.title=a,this._oDrawing.draw(this._oQRCode),this.makeImage()},QRCode.prototype.makeImage=function(){"function"==typeof this._oDrawing.makeImage&&(!this._android||this._android>=3)&&this._oDrawing.makeImage()},QRCode.prototype.clear=function(){this._oDrawing.clear()},QRCode.CorrectLevel=d}();

$(".dimg img").attr("data-lightbox","lightbox-img");
(function(){var t=jQuery,i=function(){function t(){this.fadeDuration=500,this.fitImagesInViewport=!0,this.resizeDuration=700,this.positionFromTop=50,this.showImageNumberLabel=!0,this.alwaysShowNavOnTouchDevices=!1,this.wrapAround=!1}return t.prototype.albumLabel=function(t,i){return"Image "+t+" of "+i},t}(),e=function(){function i(t){this.options=t,this.album=[],this.currentImageIndex=void 0,this.init()}return i.prototype.init=function(){this.enable(),this.build()},i.prototype.enable=function(){var i=this;t("body").on("click","img[rel^=lightbox], area[rel^=lightbox], img[data-lightbox], area[data-lightbox]",function(e){return i.start(t(e.currentTarget)),!1})},i.prototype.build=function(){var i=this;t('<div id="lightboxOverlay" class="lightboxOverlay"></div><div id="lightbox" class="lightbox"><div class="lb-outerContainer"><div class="lb-container"><img class="lb-image" src="" /><div class="lb-nav"><a class="lb-prev" href="" ></a><a class="lb-next" href="" ></a></div></div></div><div class="lb-dataContainer"><div class="lb-data"><div class="lb-details"><span class="lb-caption"></span><span class="lb-number"></span></div><div class="lb-closeContainer"><a class="lb-close"></a></div></div></div></div>').appendTo(t("body")),this.$lightbox=t("#lightbox"),this.$overlay=t("#lightboxOverlay"),this.$outerContainer=this.$lightbox.find(".lb-outerContainer"),this.$container=this.$lightbox.find(".lb-container"),this.containerTopPadding=parseInt(this.$container.css("padding-top"),10),this.containerRightPadding=parseInt(this.$container.css("padding-right"),10),this.containerBottomPadding=parseInt(this.$container.css("padding-bottom"),10),this.containerLeftPadding=parseInt(this.$container.css("padding-left"),10),this.$overlay.hide().on("click",function(){return i.end(),!1}),this.$lightbox.hide().on("click",function(e){return"lightbox"===t(e.target).attr("id")&&i.end(),!1}),this.$outerContainer.on("click",function(e){return"lightbox"===t(e.target).attr("id")&&i.end(),!1}),this.$lightbox.find(".lb-prev").on("click",function(){return 0===i.currentImageIndex?i.changeImage(i.album.length-1):i.changeImage(i.currentImageIndex-1),!1}),this.$lightbox.find(".lb-next").on("click",function(){return i.currentImageIndex===i.album.length-1?i.changeImage(0):i.changeImage(i.currentImageIndex+1),!1}),this.$lightbox.find(".lb-close").on("click",function(){return i.end(),!1})},i.prototype.start=function(i){function e(t){n.album.push({link:t.attr("src"),title:t.attr("data-title")||t.attr("title")})}var n=this,a=t(window);a.on("resize",t.proxy(this.sizeOverlay,this)),t("select, object, embed").css({visibility:"hidden"}),this.sizeOverlay(),this.album=[];var o,h=0,s=i.attr("data-lightbox");if(s){o=t(i.prop("tagName")+'[data-lightbox="'+s+'"]');for(var r=0;r<o.length;r=++r)e(t(o[r])),o[r]===i[0]&&(h=r)}else if("lightbox"===i.attr("rel"))e(i);else{o=t(i.prop("tagName")+'[rel="'+i.attr("rel")+'"]');for(var l=0;l<o.length;l=++l)e(t(o[l])),o[l]===i[0]&&(h=l)}var d=a.scrollTop()+this.options.positionFromTop,c=a.scrollLeft();this.$lightbox.css({top:d+"px",left:c+"px"}).fadeIn(this.options.fadeDuration),this.changeImage(h)},i.prototype.changeImage=function(i){var e=this;this.disableKeyboardNav();var n=this.$lightbox.find(".lb-image");this.$overlay.fadeIn(this.options.fadeDuration),this.$lightbox.find(".lb-image, .lb-nav, .lb-prev, .lb-next, .lb-dataContainer, .lb-numbers, .lb-caption").hide(),this.$outerContainer.addClass("animating");var a=new Image;a.onload=function(){var o,h,s,r,l,d;n.attr("src",e.album[i].link),t(a),n.width(a.width),n.height(a.height),e.options.fitImagesInViewport&&(d=t(window).width(),l=t(window).height(),r=d-e.containerLeftPadding-e.containerRightPadding-20,s=l-e.containerTopPadding-e.containerBottomPadding-120,(a.width>r||a.height>s)&&(a.width/r>a.height/s?(h=r,o=parseInt(a.height/(a.width/h),10),n.width(h),n.height(o)):(o=s,h=parseInt(a.width/(a.height/o),10),n.width(h),n.height(o)))),e.sizeContainer(n.width(),n.height())},a.src=this.album[i].link,this.currentImageIndex=i},i.prototype.sizeOverlay=function(){this.$overlay.width(t(window).width()).height(t(document).height())},i.prototype.sizeContainer=function(t,i){function e(){n.$lightbox.find(".lb-dataContainer").width(h),n.$lightbox.find(".lb-prevLink").height(s),n.$lightbox.find(".lb-nextLink").height(s),n.showImage()}var n=this,a=this.$outerContainer.outerWidth(),o=this.$outerContainer.outerHeight(),h=t+this.containerLeftPadding+this.containerRightPadding,s=i+this.containerTopPadding+this.containerBottomPadding;a!==h||o!==s?this.$outerContainer.animate({width:h,height:s},this.options.resizeDuration,"swing",function(){e()}):e()},i.prototype.showImage=function(){this.$lightbox.find(".lb-image").fadeIn("slow"),this.updateNav(),this.updateDetails(),this.preloadNeighboringImages(),this.enableKeyboardNav()},i.prototype.updateNav=function(){var t=!1;try{document.createEvent("TouchEvent"),t=!!this.options.alwaysShowNavOnTouchDevices}catch(t){}this.$lightbox.find(".lb-nav").show(),this.album.length>1&&(this.options.wrapAround?(t&&this.$lightbox.find(".lb-prev, .lb-next").css("opacity","1"),this.$lightbox.find(".lb-prev, .lb-next").show()):(this.currentImageIndex>0&&(this.$lightbox.find(".lb-prev").show(),t&&this.$lightbox.find(".lb-prev").css("opacity","1")),this.currentImageIndex<this.album.length-1&&(this.$lightbox.find(".lb-next").show(),t&&this.$lightbox.find(".lb-next").css("opacity","1"))))},i.prototype.updateDetails=function(){var i=this;void 0!==this.album[this.currentImageIndex].title&&""!==this.album[this.currentImageIndex].title&&this.$lightbox.find(".lb-caption").html(this.album[this.currentImageIndex].title).fadeIn("fast").find("a").on("click",function(){location.href=t(this).attr("href")}),this.album.length>1&&this.options.showImageNumberLabel?this.$lightbox.find(".lb-number").text(this.options.albumLabel(this.currentImageIndex+1,this.album.length)).fadeIn("fast"):this.$lightbox.find(".lb-number").hide(),this.$outerContainer.removeClass("animating"),this.$lightbox.find(".lb-dataContainer").fadeIn(this.options.resizeDuration,function(){return i.sizeOverlay()})},i.prototype.preloadNeighboringImages=function(){if(this.album.length>this.currentImageIndex+1){(new Image).src=this.album[this.currentImageIndex+1].link}if(this.currentImageIndex>0){(new Image).src=this.album[this.currentImageIndex-1].link}},i.prototype.enableKeyboardNav=function(){t(document).on("keyup.keyboard",t.proxy(this.keyboardAction,this))},i.prototype.disableKeyboardNav=function(){t(document).off(".keyboard")},i.prototype.keyboardAction=function(t){var i=t.keyCode,e=String.fromCharCode(i).toLowerCase();27===i||e.match(/x|o|c/)?this.end():"p"===e||37===i?0!==this.currentImageIndex?this.changeImage(this.currentImageIndex-1):this.options.wrapAround&&this.album.length>1&&this.changeImage(this.album.length-1):"n"!==e&&39!==i||(this.currentImageIndex!==this.album.length-1?this.changeImage(this.currentImageIndex+1):this.options.wrapAround&&this.album.length>1&&this.changeImage(0))},i.prototype.end=function(){this.disableKeyboardNav(),t(window).off("resize",this.sizeOverlay),this.$lightbox.fadeOut(this.options.fadeDuration),this.$overlay.fadeOut(this.options.fadeDuration),t("select, object, embed").css({visibility:"visible"})},i}();t(function(){var t=new i;new e(t)})}).call(this);

// JavaScript Document
 //==================函数列表=========================
 //写入Cookie PostCookie("Softview=Yes");
 function PostCookie(cookieName)
 {
  var expdate = new Date();
   expdate.setTime(expdate.getTime() + 604800000);
   document.cookie=cookieName+";expires="+expdate.toGMTString()+";path = /;";
 }

//读取Cookies值
function getCookie(cookieName) 
{ 
 var cookieString =document.cookie; 
 var start = cookieString.indexOf(cookieName + '='); 
 // 加上等号的原因是避免在某些 Cookie 的值里有 
 // 与 cookieName 一样的字符串。 
 if (start == -1) // 找不到
 return null; 
 start += cookieName.length + 1; 
 var end = cookieString.indexOf(';', start); 
 if (end == -1) 
 return unescape(cookieString.substring(start));
 return unescape(cookieString.substring(start, end)); 
 
}

 String.prototype.Trim=function(){ return  this.replace(/(^\s+)|(\s+$)/g,"");}
 String.prototype.Ltrim = function(){ return  this.replace(/(^\s+)/g,   "");}
 String.prototype.Rtrim = function() { return this.replace(/(\s+$)/g, "");}

//================= AJAX 提交表单 ====================
var http_request = true;
	function send_request(url,Temp,ref , tb) 
	 {//初始化、指定处理函数、发送请求的函数
		http_request = false;
		
		//document.domain = "2265.com";
		//开始初始化XMLHttpRequest对象
		if(window.XMLHttpRequest) { //Mozilla 浏览器
			http_request = new XMLHttpRequest();
			if (http_request.overrideMimeType) {//设置MiME类别
				http_request.overrideMimeType('text/xml');
			}
		}
		else if (window.ActiveXObject) { // IE浏览器
			try {
				http_request = new ActiveXObject("Msxml2.XMLHTTP");
			} catch (e) {
				try {
					http_request = new ActiveXObject("Microsoft.XMLHTTP");
				} catch (e) {}
			}
		}
		if (!http_request) { // 异常，创建对象实例失败
			window.alert("不能创建XMLHttpRequest对象实例.");
			return false;
		}
		http_request.onreadystatechange = ref; 
		
		// 确定发送请求的方式和URL以及是否同步执行下段代码
		http_request.open("Post.html", url, tb);
		http_request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		http_request.send(Temp);
	}
	
	// 处理返回信息的函数
    function processRequest() {
        if (http_request.readyState == 4) { // 判断对象状态
            if (http_request.status == 200) { // 信息已经成功返回，开始处理信息
                alert(http_request.responseText);
            } else { //页面不正常
                // alert("您所请求的页面有异常。");
            }
        }
    }

//=================================前台专用====================================================

function ViewCommCount(tobj,CommentTpye,id) //查询评论数
{
	var obj= document.getElementById(tobj);
	var Url="Action=16&CommentTpye="+CommentTpye+"&id="+ id;
	
	var ref=function()//处理返回数据
	 	{
		  if (http_request.readyState == 4) { // 判断对象状态
            if (http_request.status == 200) { // 信息已经成功返回，开始处理信息
				var requestText=http_request.responseText;
					obj.innerHTML = requestText;
            } else { //页面不正常
                // alert("写数据出错了！！");
            }
        }
	 }
   send_request("../ajax.html",Url,ref,true);
}


//============处理文章中的图片====================
function ViewCmsImages(tobj,id)
{
	var obj= document.getElementById(tobj);
	var imgs=obj.getElementsByTagName("img");
	
	for(i=0;i<imgs.length;i++)
	{
		//imgs[i].setAttribute('onmousewheel',"return bbimg(this)");
		var sobj= imgs[i].parentNode;
		if (sobj.tagName!="a")
		{
			//imgs[i].outerHTML ="<a href='/viewimg_"+id+"_1.html?"+ imgs[i].src +"' target='_blank'>" + imgs[i].outerHTML + "</a>"
			
			imgs[i].onclick=function(){window.open("/viewimg_"+id+"_1.html?"+ this.src,"n","")}
            imgs[i].title="点击查看大图"
            imgs[i].style.cursor="pointer";
         }
		//imgs[i].onmousewheel = function(){return bbimg(this)};
		//imgs[i].alt="可以用鼠标滚动改变大小";
	}
}

//单击选项卡通用过程 obj,'Index_3_2_1','li','li_click'
function liClick(obj,t1,t2,t3)
{
	var TempObj=document.getElementById(t1);
	var TempObj_Li=TempObj.getElementsByTagName(t2);
	
	var TempObj_Ul;
	
	for(i=1;i<TempObj_Li.length;i++)
		{
			TempObj_Li[i].className=null;
			if(TempObj_Li[i]==obj)
			{
				document.getElementById(t1+"_"+i).style.display='';
				}
			else
			{
				document.getElementById(t1+"_"+i).style.display='none';
			}
		}
	obj.className=t3;
	//alert('点了');
}
	
	
//提交表单软件下载评论
  var isSubmit=false;  //是否提交了评论
  function submitComment()
  {
     if (isSubmit)
	 {
		 alert("您的评论已经提交，请不要重复提交谢谢!");
	    //	 return;
	 }
	 
	 var Form=document.forms["FormComment"];
	 if (Form==null) Form=document.forms["cmtForm"];

	 var Content =Form.Content;
	 if (Content==null) Content=Form.cmtMsg;
	 
	 var ContentText = Content.value.Trim();
	 if($('.g-hpopBox').length>0){
	 	var content=$("#cuowuneirong");
	 	var ContentText =content.val();
	 	userphone=$(".m-txt-phone").val();
		/*if( $("#no-one").prop("checked") == false && $("#no-two").prop("checked") == false && $("#no-three").prop("checked") == false){
			alert("请先选择差评原因！");
			return false;
		}*/
		if(ContentText=="" )
		 {
			alert("请写下您的差评理由");
			content.focus();
			return false;
		 }
		if( ContentText.length<5 || ContentText.length>1000 )
			 {
				alert("差评理由不能小于 5 大于 500 个汉字！");
				content.focus();
				return false;
			 }	
	 	if(userphone==""){
			alert("手机号码不能为空！");
			$(".m-txt-phone").focus();
			return false;
	 	}else{
		  var pattern = /0?(13|14|15|18|17)[0-9]{9}/;
		   if(!userphone.match(pattern)){
		     alert("请输入正确的联系手机号码！");
		     return false;
		   }else{
	 		res=1;
		   }
	 	}
	 	alert('您的建议已提交，感谢您的支持！')
	 }else{

		 var Content =Form.Content;
		 if (Content==null) Content=Form.cmtMsg;
		 var ContentText = Content.value.Trim();

	 }
	 //增加了差评的判断
	 
	 if(ContentText=="" )
	 {
		alert("评论的内容不能为空！");
		Content.focus();
		return false;
	 }
	 
	 if( ContentText.length<5 || ContentText.length>1000 )
	 {
		alert("评论的内容不能小于5 大于 1000 个字符！");
		Content.focus();
		return false;
	 }
	 
	 var temp = ContentText;
	 var re = /\{.+?\}/g;        // 创建正则表达式模式
	 temp = temp.replace(re,"");
	 if (temp.Trim()=="")
	 {
		alert("对不起不能发表纯表情! 感谢您的支持！"); 
		Content.focus();
		return false;
	 }
	 
	 var ly_id
	 	 ly_id = Form.softID;
		 if (ly_id==null) ly_id = Form.softid;
		 
	 var CommentTpye,CommentTpyeId
	 	 CommentTpye =Form.CommentTpye;
		 if (CommentTpye==null) 
		 {
			 CommentTpyeId =0;
		 }else
		 {
			CommentTpyeId = CommentTpye.value; 
		 }
	 var Url="content=" + escape(ContentText) + "&SoftID=" +  escape(ly_id.value) + "&Action=2&CommentTpye="+CommentTpyeId;
	 
	 var ref=function()//处理返回数据
	 	{
		  if (http_request.readyState == 4) { // 判断对象状态
            if (http_request.status == 200) { // 信息已经成功返回，开始处理信息
				var requestText=http_request.responseText;
					 Content.value="";
					 //Content.disabled=true;
					 //Form.disabled=true;
//alert(requestText);
					 //alert("您的评论已经写入成功,但需要等审核才能显示出来");
					ViewComment(requestText);
	 
            } else { //页面不正常
                 //alert("写数据出错了！！"); 
            }
        }
	}
     send_request("../ajax.html",Url,ref,true);
	 isSubmit = true;
	 $(".g-hpopBox").remove();
  }
  
  //将提交的评论显示到页面上
  function ViewComment(text)
  {
	  var d = new Date(); 
	  var sd=d.toLocaleString();
	  
	  var Temp ="<dt><span><i>顶楼 </i><b >您发表的评论</b> </span><em>发表于: <font color='red'> "+ sd +" </font> </em></dt>"
      Temp +="<dd> "+ text +" <p></p></dd>"
	  
	  $("#comment_0 dl").append(Temp);
  }
  
  //提交评论表单得到焦点的时候显示验证码
  function CommentOnblur()
  {
	 document.getElementById("viewGetCode").style.display="";
  }
  //按 CTRL+回车 提交表单
  function submitForm()
  {
	  if(window.event.ctrlKey && window.event.keyCode==13)
	  {
	  	//alert("点击了");
		submitComment();
		return true;
	  }
  }
  
//首页选项卡
function switchTab(obj,num,c,d){ 
    var parentNodeObj= obj.parentNode;
	 var s=0;
	 var i=0;
	 
	 for(i=0;i<parentNodeObj.childNodes.length;i++)
	 {
		 if (parentNodeObj.childNodes[i].nodeName=="#text")//针对FF处理
		   {
			 continue;  
		   }
		 parentNodeObj.childNodes[i].className=c+ "1";
		 var labObj= document.getElementById(d + s);
		 
		// alert(d + s)
		 if(labObj !=null)
		 {
		  labObj.style.display='none';
		 if(num==s)
		  {
			  labObj.style.display=''; 

	 
		  }
		 }
		 s +=1;
	 }
	obj.className=c + "2";
}

 
	
//=================================== 网站后台专用函数 ===================================================	

   
 

//改变图片大小
function resizepic(thispic)
{
if(thispic.width>700) thispic.width=700;
}

// 鼠标滚动 无级缩放图片大小 onmousewheel="return bbimg(this)"
function bbimg(o)
{
  var zoom=parseInt(o.style.zoom, 10)||100;
  zoom+=event.wheelDelta/12;
  if (zoom>0) o.style.zoom=zoom+'%';
  return false;
}



 //比列调整当前图片大小
 function ReImgSize(obj,w,h){ 
  if(obj.width>w)
   {
	   obj.width=w;
	   obj.style.border="none" 
	   }
 }
 
   
//取得radio 选中的值
 function getRadioBoxValue(radioName){ 
            var obj = document.getElementsByName(radioName);             //这个是以标签的name来取控件 
                 for(i=0; i<obj.length;i++)    { 
                  if(obj[i].checked){ 
                          return obj[i].value; 
                  } 
              }          
             return "undefined";        
}



//Html转换成Ubb
function html_trans(str) {
	str = str.replace(/\r/g,"");
	str = str.replace(/on(load|click|dbclick|mouseover|mousedown|mouseup)="[^"]+"/ig,"");
	str = str.replace(/<script[^>]*?>([\w\W]*?)<\/script>/ig,"");
	str = str.replace(/<a[^>]+href="([^"]+)"[^>]*>(.*?)<\/a>/ig,"[url=$1]$2[/url]");
	str = str.replace(/<font[^>]+color=([^ >]+)[^>]*>(.*?)<\/font>/ig,"[color=$1]$2[/color]");
	str = str.replace(/<img[^>]+src="([^"]+)"[^>]*>/ig,"[img]$1[/img]");
	str = str.replace(/<([\/]?)b>/ig,"[$1b]");
	str = str.replace(/<([\/]?)strong>/ig,"[$1b]");
	str = str.replace(/<([\/]?)u>/ig,"[$1u]");
	str = str.replace(/<([\/]?)i>/ig,"[$1i]");
	str = str.replace(/&nbsp;/g," ");
	str = str.replace(/&amp;/g,"&");
	str = str.replace(/&quot;/g,"\"");
	str = str.replace(/&lt;/g,"<");
	str = str.replace(/&gt;/g,">");
	str = str.replace(/<br>/ig,"\n");
	str = str.replace(/<[^>]*?>/g,"");
	str = str.replace(/\[url=([^\]]+)\]\n(\[img\]\1\[\/img\])\n\[\/url\]/g,"$2");
	str = str.replace(/\n+/g,"\n");
	str = my_format(str);
	str = str.replace(/\n/g,"\n");
	return str;
}



function my_format(str){
   var cc,tempstr;
   cc = str;
   tempstr = "";
   var ss=cc.split("\n");
   for (var i=0; i< ss.length; i++ ){
        while (ss[i].substr(0,1)==" "||ss[i].substr(0,1)=="　"){ss[i]=ss[i].substr(1,ss[i].length);}
        if (ss[i].length>0) tempstr+="　　"+ss[i]+"\n";
   }
   return tempstr;
}

 
//=========== 前台最新更新 ===================





//=================投票===============================================
var isVote=false;  //是否已经投过票了
//投票BEGIN
function sEval(softid,num,din,cai,Tpye)
{
	var votedata=localStorage[''+softid]?localStorage[''+softid]:"";
	if(isVote|| (votedata+"||").split("|")[2]=="1")
	{
		alert('您已经投过票了,请不要重复投票,感谢您的支持!!');
		return;
	}
	var Temp="Action=0&softid="+ escape(softid) + "&num=" +escape(num)+"&type="+ Tpye; 
	$.ajax({type: "POST",url:"/ajax.asp",data:Temp,success: function(msg){
		if(votedata!=""){
			var n1=parseInt(votedata.split("|")[0]),n2=parseInt(votedata.split("|")[1]);
			if (parseInt(num)==1)
				n1++;
			else n2++;
			localStorage[''+softid]=n1+"|"+n2+"|1";
		}
		ReadMark(softid,din,cai,Tpye);
		alert('投票成功!!');
	}});
	isVote = true;
}
//投票End

//读取投票数据 Begin
function ReadMark(softid,din,cai,Tpye)
{	
	var votedata=localStorage[''+softid]?localStorage[''+softid]:"";
	if(votedata!=""){
		upvote(votedata);
		return;
	}
	var Temp="Action=1&softid="+ escape(softid)+"&type="+ Tpye; //发送的数据
	$.ajax({type: "POST",url:"/ajax.asp",data:Temp,success: function(msg){
		localStorage[''+softid]=msg;
		upvote(msg);
	}});
}
//读取投票数据 End

function upvote(msgstr){
	var TempText=msgstr;
	var TempText_1=TempText.split("|")[0];
	var TempText_2=TempText.split("|")[1];
	var TempText_3= parseInt(TempText_1) + parseInt(TempText_2);
	if (TempText_3 == 0)
	{
		var a =50;
		var b=50;
	}else{
		var a =parseInt(parseInt(TempText_1) /TempText_3*100)
		var b= (100 - parseInt(parseInt(TempText_1) /TempText_3*100))
	}
	var AbetNum=document.getElementById("showding").getElementsByTagName("em")[0];
	var ArgueNum=document.getElementById("showcai").getElementsByTagName("em")[0];
	AbetNum.innerHTML  = TempText_1;
	ArgueNum.innerHTML = TempText_2;
	document.getElementById("decimal_unm").innerHTML= a/10;
}
//==========投票第二种方案 Begin=================
function ngsEval(id,goodid,badid,verid,type)
{
	var objgood = $(goodid);
	var objbad = $(badid);
 
	objgood.css({cursor:"pointer"});
	
	 ngSendEval(id,goodid,badid,verid,0,type);
	 
	objgood.click(function (){ ngSendEval(id,goodid,badid,verid,1,type) ; isVote=true; });
	objbad.click(function (){ ngSendEval(id,goodid,badid,verid,2,type); isVote=true; });
}

function ngSendEval(id,goodid,badid,verid,num,type)
{
   if(isVote && num>0)
	{
		 alert('您已经投过票了,请不要重复投票,感谢您的支持!!')
		 return true;
	}
	
 var url="action=3&id="+id+"&num="+num+"&type="+type;
  $.ajax({
   type: "POST",
   url: "../ajax.asp",
   data: url,
   success: function(msg){
      ListEval(goodid,badid,verid,msg);
   }
});
}

function ListEval(goodid,badid,verid,msg){
	var objgoodimg = $(goodid + " img");
	var objgoodem = $(goodid + " em");

	var objgoodb = $(goodid + " b");
 
	
	var objbadimg = $(badid + " img");
	var objbadem = $(badid + " em");

	var objbadb = $(badid + " b");
	
	
	var objver = $(verid);
	
	var dataObj=eval("("+msg+")");//转换为json对象
	
	
	objgoodimg.eq(0).animate({width: "1%"},200);
	objgoodimg.eq(0).animate({width: +dataObj.Percentage[0]+ "%"},"slow");
	
	objbadimg.eq(0).animate({width: "1%"},200);
	objbadimg.eq(0).animate({width: +dataObj.Percentage[1]+ "%"},"slow");
	
	objgoodem.eq(0).html(dataObj.Percentage[0]+ "%" + "("+ dataObj.Num[0] +")");
	objbadem.eq(0).html(dataObj.Percentage[1]+ "%"+ "("+ dataObj.Num[1] +")");
	
	objgoodb.eq(0).html(dataObj.Num[0] );
	objbadb.eq(0).html(dataObj.Num[1] );
	
	objver.html(dataObj.Very[0])	
	 
	
}
//==========投票第二种方案 End=================


//====留言专用===============
function countLyNum(obj,ttextObj) //统计留言字符数
{
	//alert('sss');
	var textObj=document.getElementById(ttextObj);
	var num=obj.innerHTML.length;
	if(num>500)
	{
		alert("只允许输入500个字符，超过部份将自动删除");
		obj.innerHTML = obj.innerHTML.substr(1,500);
	}
	if (textObj!=null)
	{
		textObj.innerHTML=num;
	}
}


//发送报错信息
function senderror(id,obj)
{
	var Content= document.getElementById(obj);
	var CommentTpyeId = 3
	
	if (Content.value.Trim().length<1) 
	{
		alert("请提供报错信息谢谢!!")
		return false;
	}
	
	var Url="content=" + escape(Content.value) + "&SoftID=" +  escape(id) + "&Action=2&CommentTpye="+CommentTpyeId;
	
	  var ref=function()//处理返回数据
	 	{
		  if (http_request.readyState == 4) { // 判断对象状态
            if (http_request.status == 200) { // 信息已经成功返回，开始处理信息
				var requestText=http_request.responseText;
                 if(requestText=="OK") 
				 {
					alert("你的报错信息已经提交感谢您的支持。");
					Content.value="";
					
				 }else
				 {alert(requestText);}
            } else { //页面不正常
                 alert("写数据出错了！！"); 
            }
        }
	}
   
      send_request("../ajax.asp",Url,ref,true);
	  
	 //alert(Url)
	
	return true;
	
}

//评论页读取顶
function BindDing(objtext,id,CommentTpye)
{
	var obj=$(objtext)
	//var sobj = obj..$("a")
	
	if (obj.length==0) return false;
	 
	 for (var i=0 ;i<obj.length;i++)
	 {
	  var sobj = obj.eq(i).find("a")
	  var spanobj = obj.eq(i).find("span")
	  
	 // alert(sobj.length)	

	  sobj.click(function (){ 
						   SendDing($(this).parent().attr("id"));
						   
						   var  spanobj = $(this).parent().find("span")
						   spanobj.html(parseInt(spanobj.html())+1);
						    $(this).unbind();
							
						    $(this).attr("title","您已经顶过了");
							
						   })
	 }
	ReadDing(objtext,id,CommentTpye)	
}

function SendDing(id)//发送顶
{
	//alert(id)
	var url="action=19&id="+id
   $.ajax({
   type: "POST",
   url: "../ajax.asp",
   data: url,
   success: function(msg){
     // alert(msg)  ;
   }
});
}

function ReadDing(objtext,id,CommentTpye)
{
	var obj=$(objtext)
	var sendid=""
	for (var i=0 ;i<obj.length;i++)
	{
		sendid+=obj.eq(i).attr("id");
		if (i<(obj.length-1)) sendid+=",";
	}
  var url="action=18&id="+id+"&CommentTpye="+CommentTpye+"&sendid="+escape(sendid)+""
 //alert(url)
  $.ajax({
   type: "POST",
   url: "../ajax.asp",
   data: url,
   success: function(msg){
      ListDing(objtext,msg)  ;
   }
});	
}

function ListDing(objtext,msg) //显示顶的数据
{
	//alert(msg)
	var obj=$(objtext)
	var dataObj=eval("("+msg+")");//转换为json对象
	 for (var i=0 ;i<obj.length;i++)
	 { 
	   var spanobj = obj.eq(i).find("span")
	   var sid = obj.eq(i).attr("id");
	   for (var y=0;y < dataObj.ID.length;y++)
	   {
		   if (sid == dataObj.ID[y])
		   {
			 spanobj.html(dataObj.Ding[y]);
			 break;
		   }
	   }
	}	
}


//投票 需要 JQ支持  
//function SendVote(id,sobj,ref)

function SendVote(id,sobj,ref)
{
	var obj = $(sobj +" input");
	var temp='';
	for(var i=0; i<obj.length; i++)
	{
		if (obj.eq(i).attr("checked")==true)
		{
			if (temp !='') temp +=',';
			temp +=  i;
		}
		obj.eq(i).attr("checked",false);
	}
	
	if (temp=='') {
		alert('请选择一个项目!!')
		return;
	}
	
  var url="action=21&id="+id+"&v="+ escape(temp);
   $.ajax({
   type: "POST",
   url: "../ajax.asp",
   data: url,
   success: function(msg){
      ref(msg)
   }
});
}

//单个投票ＪＱ支持
function OneVote(id,ni,ref)
{
  var url="action=21&id="+id+"&v="+ escape(ni);
   $.ajax({
   type: "POST",
   url: "../ajax.asp",
   data: url,
   success: function(msg){
      ref(msg)
   }
});
}


//读取投票数据 ＪＱ支持
function ReadVote(id,ref)
{
  var url="action=21&id="+id+"&v=";
   $.ajax({
   type: "POST",
   url: "../ajax.asp",
   data: url,
   success: function(msg){
      ref(msg)
   }
});
}


//设置控制的显示的数值
//sobj　JQ选择器 msg 数据 , iatt 是否百分比 ,att CSS Name
//列子 Listvote('#vote b',msg,true,'') 
//	   Listvote('#vote em img',msg,false,'width') 
function Listvote(sobj,msg,iatt,att) //显示顶的数据
{
	//alert(msg)
	var obj=$(sobj)
	var dataObj=eval("("+msg+")");//转换为json对象
	var PNum=0
	 
		for (var i=0;i<obj.length; i++)
		{
			if (iatt)
			{
				obj.eq(i).html(dataObj.Num[i]);  
			}else
			{
				PNum =  (dataObj.Num[i] /dataObj.NumBer *100).toFixed(1);
				if (att=='')
				{
				 obj.eq(i).html(PNum + "%" ); 
				}else
				{
				  obj.eq(i).css(att, PNum + '%');
				 // alert(obj.eq(i).attr(att))  
				}
			}
		}	  
}

//选项卡
function onSelect(obj,ch)
 {
	 var parentNodeObj= obj.parentNode;
	 var s=0;
	 for(i=0;i<parentNodeObj.childNodes.length;i++)
	 {
		// alert("第" +i +"次")
		if (parentNodeObj.childNodes[i].nodeName=="#text")
		   {
			 continue;  
		   }
		parentNodeObj.childNodes[i].className="tab_1";
		var newObj=document.getElementById(ch + "_" + s);
		
		if(newObj!=null)
		{
			 newObj.style.display='none';
			 if(parentNodeObj.childNodes[i]==obj)
			 {
				newObj.style.display='';	
			 }
		}
		s +=1;
	 }
	 obj.className="tab_2";
 }
//IE6图片自动缩放
function imgFix() { 
  var widthRestriction = 600; 
  var heightRestriction = 600; 
  var allElements = document.getElementsByTagName('*')   
  for (var i = 0; i < allElements.length; i++) 
  { 
    if (allElements[i].className.indexOf('soft-img') >= 0) 
        { 
      var imgElements = allElements[i].getElementsByTagName('img'); 
      for (var j=0; j < imgElements.length; j++) 
           { 
			  if ( imgElements[j].width > widthRestriction ) 
			     { 
				    imgElements[j].width = widthRestriction; 
			     } 		 
           } /*for j*/ 
       } 
  }/*for i*/ 
}



var _hmt = _hmt || [];
$(function() { //tongji
	(function() {
		var hm = document.createElement("script");
		hm.src = "https://hm.baidu.com/hm.js?f990bdcaa6db2f0f3e26c4cb5461cf07";
		var s = document.getElementsByTagName("script")[0];
		s.parentNode.insertBefore(hm, s);
	})();
});
if (typeof _webInfo != "undefined") { //add tongji for everyBJ
	var bjname = _webInfo.Username;
	var hm = document.createElement("script");
	if (bjname != '') {
		switch (bjname) {
		case 'lff':
			var curtime = _webInfo.DateTime;
			var date1 = new Date("2015/8/31");
			var date2 = new Date(curtime);
			if (date1.getTime() < date2.getTime()) {
				hm.src = "https://hm.baidu.com/hm.js?";
			}
			break;
                case 'xieyuting':
                    hm.src="https://hm.baidu.com/hm.js?fd2d7eb1c6166df24c1105de7a5673a9";
                    break;
                case 'liyonghong':
                    hm.src="https://hm.baidu.com/hm.js?0f3b6cdb6b6ddbe6ecb2519ab197ee6b";
                    break;
                case 'dengruobing':
                    hm.src="https://hm.baidu.com/hm.js?0e856fa1bf3c7a0119212c9ecf809f6b";
                    break;
                case 'lujieming':
                    hm.src="https://hm.baidu.com/hm.js?8e427ef14bfd11f5a835e64cedb031aa";
                    break;
                case 'yejingwen':
                    hm.src="https://hm.baidu.com/hm.js?7c9cf9578ec1308d5156225fa073dd6d";
                    break;
                case 'shangzhiyuan':
                    hm.src="https://hm.baidu.com/hm.js?654e29416a63e8ac5d265fc91e63d4bf";
                    break;
                case 'lijing':
                    hm.src="https://hm.baidu.com/hm.js?4637a9db1fe1aa871661c9aaf196a16f";
                    break;
                case 'liying':
                    hm.src="https://hm.baidu.com/hm.js?000d467c1e1d792c31216b8d41f1a850";
                    break;
                case 'zhoule':
                    hm.src="https://hm.baidu.com/hm.js?ebf2507ceb289ce0a143487de224900a";
                    break;
                case 'yanchunchun':
                    hm.src="https://hm.baidu.com/hm.js?dd0f84f13ae6f0020bc085e575ccb723";
                    break;
                case 'heli':
                    hm.src="https://hm.baidu.com/hm.js?98cc3be3801873623d3285a37148b38d";
                    break;
                case 'chenchaoji':
                    hm.src="https://hm.baidu.com/hm.js?b3879a1096b339a3856902f90d09ec29";
                    break;
                case 'zuoxiaoqin':
                    hm.src="https://hm.baidu.com/hm.js?d870a48db318ef03f419ffc2f59f511f";
                    break;
                case 'lilan':
                    hm.src="https://hm.baidu.com/hm.js?ed3d8490ef52a93783ae69b4da3fab73";
                    break;
                case 'tianxiaoyang':
                    hm.src="https://hm.baidu.com/hm.js?0a0ccc981d6f54fc2ec143fbe1a75d5a";
                    break;
                case 'zhangyuhan':
                    hm.src="https://hm.baidu.com/hm.js?74ba7ad609120ea52dd76a66a5e4b8e8";
                    break;
                case 'tiangaochang':
                    hm.src="https://hm.baidu.com/hm.js?83832db4445ef50aa494808de4bbd0fe";
                    break;
                case 'huangxin':
                    hm.src="https://hm.baidu.com/hm.js?5dd7b52090a3a350855776077c2fe8d1";
                    break;
                case 'caoai':
                    hm.src="https://hm.baidu.com/hm.js?5153a6015fad554e3b7f70ab1017bf2b";
                    break;
                case 'yurui':
                    hm.src="https://hm.baidu.com/hm.js?03af57b64e70f5ca2815e8aa0fad3dcf";
                    break;
                case 'guolixian':
                    hm.src="https://hm.baidu.com/hm.js?81cb7a22b19849e94adf894ddd9808fc";
                    break;
                case 'zhaisijia':
                    hm.src="https://hm.baidu.com/hm.js?4c81556e4b7d7ba408b75896e3c0df08";
                    break;
                case 'wufurong':
                    hm.src="https://hm.baidu.com/hm.js?3a5db2876375c44ebd045832201e4fc4";
                    break;
                case 'weizhu':
                    hm.src="https://hm.baidu.com/hm.js?208cb8a572ed3c560d0b8728b062a5e0";
                    break;
                case 'lixiang':
                    hm.src="https://hm.baidu.com/hm.js?0d17cdfd357ad19dcb9abf96d803f521";
                    break;
                case 'lijiahui':
                    hm.src="https://hm.baidu.com/hm.js?378840868256fb9a7408851823d2f356";
                    break;
                case 'huqian':
                    hm.src="https://hm.baidu.com/hm.js?1e908f08c8354ce777853500eaf6c4cf";
                    break;
                case 'wanjianfei':
                    hm.src="https://hm.baidu.com/hm.js?12f310c9a5955b5a6c7db0186ebd378f";
                    break;
                case 'yufeng':
                    hm.src="https://hm.baidu.com/hm.js?42f6ecf63172c381a4513c0e9cd69647";
                    break;
                case 'liuxinpeng':
                    hm.src="https://hm.baidu.com/hm.js?cb283755c77a04f807f0f19128d4184e";
                    break;
		}
		if (hm.src != '') {
			var s = document.getElementsByTagName("script")[0];
			s.parentNode.insertBefore(hm, s);
		}
	}
}


(function(){
    var bp = document.createElement('script');
    var curProtocol = window.location.protocol.split(':')[0];
    if (curProtocol === 'https') {
        bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';        
    }
    else {
        bp.src = 'http://push.zhanzhang.baidu.com/push.js';
    }
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(bp, s);
})();

function inputDefault(t) {
	var e = $(t),
		a = e.val();
	e.focus(function() {
		var t = $(this).val();
		this.defaultValue || (this.defaultValue = a), t == this.defaultValue && $(this).val(""), $(this).removeClass("grey9").addClass("black")
	}), e.blur(function() {
		var t = $(this).val();
		"" == t && ($(this).val(this.defaultValue), $(this).removeClass("black").addClass("grey9"))
	})
}
function cmtBefore(t, e, a) {
	var i = e[0];
	if ("" == i.content.value || "我来说两句..." == i.content.value) return $.blockUI({
		message: '<p class="f18 fb pt10 pb10">请输入评论内容</p>',
		css: {
			marginLeft: "-50px",
			top: "60%",
			width: "300px",
			textAlign: "center"
		}
	}), setTimeout($.unblockUI, 1e3), $("#cmtMsg").focus(), !1;
	if (i.content.value.length < 2) return $.blockUI({
		message: '<p class="f18 fb pt10 pb5">您输入的评论太短：少于2个汉字</p><p class="f18 fb pb10">请重新输入</p>',
		css: {
			marginLeft: "-50px",
			top: "60%",
			width: "320px",
			textAlign: "center"
		}
	}), setTimeout($.unblockUI, 1200), $("#cmtMsg").focus(), !1;
	if (i.content.value.length > 200) return $.blockUI({
		message: '<p class="f18 fb pt10 pb5">您输入的评论过长</p><p class="f18 fb pb10">最多200个汉字</p>',
		css: {
			marginLeft: "-50px",
			top: "60%",
			width: "300px",
			textAlign: "center"
		}
	}), setTimeout($.unblockUI, 1200), !1;
	$.param(t);
	return !0
}
function jtpic(t) {
	function e(e) {
		var a = -e * l;
		$(t).find("i").stop(!0, !1).animate({
			left: a
		}, 300)
	}
	var a = $(t).find("img"),
		i = new Image;

	var maxh=300;
	var maxw=600;
	$(a).each(function(i){ 
		if($(this).height()>maxh)maxh=$(this).height(); 
		if($(this).width()>maxw)maxw=$(this).width(); 
	});
	if (maxw>600)maxh=parseInt(maxh*(600/maxw))
	maxh=maxh>720?720:maxh;
	i.src = $(a).attr("src");
	var n = i.width,
		o = i.height;
	a.wrap("<s />");
	var s = "<em class='jtbtn prev'><</em><em class='jtbtn next'>></em>";
	$(t).after(s), $(t).css("height",maxh+"px");

	var imgNum=$(a).length;
	$(a).load(function() {
		if($(this).height()>maxh)maxh=$(this).height(); 
		if($(this).width()>maxw)maxw=$(this).width(); 
		if(!--imgNum){
			if (maxw>600)maxh=parseInt(maxh*(600/maxw))
			maxh=maxh>720?720:maxh;
			$(a).css({
					maxWidth: "600px",
					maxHeight: maxh+"px"
			});
			$(t).css("height",maxh+"px");
			$(a).each(function(i){ 
				mh=$(this).height();
				if(mh<maxh)$(this).css("margin-top",parseInt((maxh-mh)/2)+"px");
			});
		}
	});
	var r, l = $(t).width(),
		c = a.length,
		d = 0;
	$(".jtbtn.prev").click(function() {
		d -= 1, d == -1 && (d = c - 1), e(d)
	}), $(".jtbtn.next").click(function() {
		d += 1, d == c && (d = 0), e(d)
	}), $(".jtbtn").hover(function() {
		$(this).stop(!0, !1).animate({
			opacity: "0.4"
		}, 300)
	}, function() {
		$(this).stop(!0, !1).animate({
			opacity: "0.2"
		}, 300)
	}), $(t).find("i").css("width", l * c), $(t).hover(function() {
		clearInterval(r)
	}, function() {
		r = setInterval(function() {
			e(d), d++, d == c && (d = 0)
		}, 4e3)
	}).trigger("mouseleave")
}
function BindDing(t, e, a) {
	var i = $(t);
	if (0 == i.length) return !1;
	for (var n = 0; n < i.length; n++) {
		var o = i.eq(n).find("a").first();
		o.click(function() {
			SendDing($(this).parent().attr("id"));
			var t = $(this).parent().find("span");
			t.html(parseInt(t.html()) + 1), t.css({
				color: "#999"
			});
			var e = $(this).parent().find("em");
			e.css({
				color: "#999"
			}), $(this).unbind(), $(this).attr("title", "您已经顶过了").css({
				cursor: "default",
				color: "#999"
			})
		})
	}
	ReadDing(t, e, a)
}
function SendDing(t) {
	var e = "action=19&id=" + t;
	$.ajax({
		type: "POST",
		url: "/ajax.asp",
		data: e,
		success: function(t) {}
	})
}
function ReadDing(t, e, a) {
	for (var i = $(t), n = "", o = 0; o < i.length; o++) n += i.eq(o).attr("id"), o < i.length - 1 && (n += ",");
	var s = "action=18&id=" + e + "&CommentTpye=" + a + "&sendid=" + escape(n);
	$.ajax({
		type: "POST",
		url: "/ajax.asp",
		data: s,
		success: function(e) {
			ListDing(t, e)
		}
	})
}
function ListDing(objtext, msg) {
	for (var obj = $(objtext), dataObj = eval("(" + msg + ")"), i = 0; i < obj.length; i++) for (var spanobj = obj.eq(i).find("span"), sid = obj.eq(i).attr("id"), y = 0; y < dataObj.ID.length; y++) if (sid == dataObj.ID[y]) {
		spanobj.html(dataObj.Ding[y]);
		break
	}
}
function getNowFormatDate() {
	var t = new Date,
		e = "../index.html",
		a = ":",
		i = t.getMonth() + 1,
		n = t.getDate();
	i >= 1 && i <= 9 && (i = "0" + i), n >= 0 && n <= 9 && (n = "0" + n);
	var o = t.getFullYear() + e + i + e + n + " " + t.getHours() + a + t.getMinutes() + a + t.getSeconds();
	return o
}
function baiduEventTrack(t, e, a) {
	if ("undefined" != typeof detail) _hmt.push(["_trackEvent", detail.cname, a, detail.sname]);
	else {
		var i, n, o;
		i = $("p.seat").find("a"), n = i[i.length - 1], n = $(n).text(), null != n && void 0 != n && "" != n && (o = $("p.seat").text().split("→"), o = $.trim(o[o.length - 1]).split(" ")[0], null != o && void 0 != o && "" != o ? _hmt.push(["_trackEvent", n, a, o]) : _hmt.push(["_trackEvent", n, a, "未知资源名称"]))
	}
}


//统计点次下载次数
 function softCount(SoftID,SoftLinkID)
 { 
	var downids=sessionStorage["downids"]?sessionStorage["downids"]:",";
	if(downids.indexOf(','+SoftID+',')==-1){
		sessionStorage["downids"]=","+SoftID+downids;
		var Url = "Action=6&SoftLinkID=" + escape(SoftLinkID) + "&SoftID=" + escape(SoftID)
		send_request("../ajax.html",Url,function(){},true);
	}
 }

function softCountOther(t, e) {
	baiduEventTrack(t, e, "download_other")
}!
function(t) {
	function e() {
		var t = "[jquery.form] " + Array.prototype.join.call(arguments, "");
		window.console && window.console.log ? window.console.log(t) : window.opera && window.opera.postError && window.opera.postError(t)
	}
	t.fn.ajaxSubmit = function(a) {
		function i(i) {
			function o(t) {
				var e = t.contentWindow ? t.contentWindow.document : t.contentDocument ? t.contentDocument : t.document;
				return e
			}
			function s() {
				function a() {
					try {
						var t = o(h).readyState;
						e("state = " + t), "uninitialized" == t.toLowerCase() && setTimeout(a, 50)
					} catch (t) {
						e("Server abort: ", t, " (", t.name, ")"), l(j), x && clearTimeout(x), x = void 0
					}
				}
				var i = r.attr("target"),
					s = r.attr("action");
				y.setAttribute("target", f), n || y.setAttribute("method", "POST"), s != u.url && y.setAttribute("action", u.url), u.skipEncodingOverride || n && !/post/i.test(n) || r.attr({
					encoding: "multipart/form-data",
					enctype: "multipart/form-data"
				}), u.timeout && (x = setTimeout(function() {
					$ = !0, l(k)
				}, u.timeout));
				var c = [];
				try {
					if (u.extraData) for (var d in u.extraData) c.push(t('<input type="hidden" name="' + d + '" />').attr("value", u.extraData[d]).appendTo(y)[0]);
					u.iframeTarget || (m.appendTo("body"), h.attachEvent ? h.attachEvent("onload", l) : h.addEventListener("load", l, !1)), setTimeout(a, 15), y.submit()
				} finally {
					y.setAttribute("action", s), i ? y.setAttribute("target", i) : r.removeAttr("target"), t(c).remove()
				}
			}
			function l(a) {
				if (!g.aborted && !C) {
					try {
						I = o(h)
					} catch (t) {
						e("cannot access response document: ", t), a = j
					}
					if (a === k && g) return void g.abort("timeout");
					if (a == j && g) return void g.abort("server abort");
					if (I && I.location.href != u.iframeSrc || $) {
						h.detachEvent ? h.detachEvent("onload", l) : h.removeEventListener("load", l, !1);
						var i, n = "success";
						try {
							if ($) throw "timeout";
							var s = "xml" == u.dataType || I.XMLDocument || t.isXMLDoc(I);
							if (e("isXml=" + s), !s && window.opera && (null == I.body || "" == I.body.innerHTML) && --S) return e("requeing onLoad callback, DOM not available"), void setTimeout(l, 250);
							var r = I.body ? I.body : I.documentElement;
							g.responseText = r ? r.innerHTML : null, g.responseXML = I.XMLDocument ? I.XMLDocument : I, s && (u.dataType = "xml"), g.getResponseHeader = function(t) {
								var e = {
									"content-type": u.dataType
								};
								return e[t]
							}, r && (g.status = Number(r.getAttribute("status")) || g.status, g.statusText = r.getAttribute("statusText") || g.statusText);
							var c = u.dataType || "",
								d = /(json|script|text)/.test(c.toLowerCase());
							if (d || u.textarea) {
								var f = I.getElementsByTagName("textarea")[0];
								if (f) g.responseText = f.value, g.status = Number(f.getAttribute("status")) || g.status, g.statusText = f.getAttribute("statusText") || g.statusText;
								else if (d) {
									var b = I.getElementsByTagName("pre")[0],
										v = I.getElementsByTagName("body")[0];
									b ? g.responseText = b.textContent ? b.textContent : b.innerHTML : v && (g.responseText = v.innerHTML)
								}
							} else "xml" != u.dataType || g.responseXML || null == g.responseText || (g.responseXML = q(g.responseText));
							try {
								T = U(g, u.dataType, u)
							} catch (t) {
								n = "parsererror", g.error = i = t || n
							}
						} catch (t) {
							e("error caught: ", t), n = "error", g.error = i = t || n
						}
						g.aborted && (e("upload aborted"), n = null), g.status && (n = g.status >= 200 && g.status < 300 || 304 === g.status ? "success" : "error"), "success" === n ? (u.success && u.success.call(u.context, T, "success", g), p && t.event.trigger("ajaxSuccess", [g, u])) : n && (void 0 == i && (i = g.statusText), u.error && u.error.call(u.context, g, n, i), p && t.event.trigger("ajaxError", [g, u, i])), p && t.event.trigger("ajaxComplete", [g, u]), p && !--t.active && t.event.trigger("ajaxStop"), u.complete && u.complete.call(u.context, g, n), C = !0, u.timeout && clearTimeout(x), setTimeout(function() {
							u.iframeTarget || m.remove(), g.responseXML = null
						}, 100)
					}
				}
			}
			var c, d, u, p, f, m, h, g, b, v, $, x, y = r[0],
				w = !! t.fn.prop;
			if (i) for (d = 0; d < i.length; d++) c = t(y[i[d].name]), c[w ? "prop" : "attr"]("disabled", !1);
			if (t(":input[name=submit],:input[id=submit]", y).length) return void alert('Error: Form elements must not have name or id of "submit".');
			if (u = t.extend(!0, {}, t.ajaxSettings, a), u.context = u.context || u, f = "jqFormIO" + (new Date).getTime(), u.iframeTarget ? (m = t(u.iframeTarget), v = m.attr("name"), null == v ? m.attr("name", f) : f = v) : (m = t('<iframe name="' + f + '" src="' + u.iframeSrc + '" />'), m.css({
				position: "absolute",
				top: "-1000px",
				left: "-1000px"
			})), h = m[0], g = {
				aborted: 0,
				responseText: null,
				responseXML: null,
				status: 0,
				statusText: "n/a",
				getAllResponseHeaders: function() {},
				getResponseHeader: function() {},
				setRequestHeader: function() {},
				abort: function(a) {
					var i = "timeout" === a ? "timeout" : "aborted";
					e("aborting upload... " + i), this.aborted = 1, m.attr("src", u.iframeSrc), g.error = i, u.error && u.error.call(u.context, g, i, a), p && t.event.trigger("ajaxError", [g, u, i]), u.complete && u.complete.call(u.context, g, i)
				}
			}, p = u.global, p && !t.active++ && t.event.trigger("ajaxStart"), p && t.event.trigger("ajaxSend", [g, u]), u.beforeSend && u.beforeSend.call(u.context, g, u) === !1) return void(u.global && t.active--);
			if (!g.aborted) {
				b = y.clk, b && (v = b.name, v && !b.disabled && (u.extraData = u.extraData || {}, u.extraData[v] = b.value, "image" == b.type && (u.extraData[v + ".x"] = y.clk_x, u.extraData[v + ".y"] = y.clk_y)));
				var k = 1,
					j = 2;
				u.forceSync ? s() : setTimeout(s, 10);
				var T, I, C, S = 50,
					q = t.parseXML ||
				function(t, e) {
					return window.ActiveXObject ? (e = new ActiveXObject("Microsoft.XMLDOM"), e.async = "false", e.loadXML(t)) : e = (new DOMParser).parseFromString(t, "text/xml"), e && e.documentElement && "parsererror" != e.documentElement.nodeName ? e : null
				}, _ = t.parseJSON ||
				function(t) {
					return window.eval("(" + t + ")")
				}, U = function(e, a, i) {
					var n = e.getResponseHeader("content-type") || "",
						o = "xml" === a || !a && n.indexOf("xml") >= 0,
						s = o ? e.responseXML : e.responseText;
					return o && "parsererror" === s.documentElement.nodeName && t.error && t.error("parsererror"), i && i.dataFilter && (s = i.dataFilter(s, a)), "string" == typeof s && ("json" === a || !a && n.indexOf("json") >= 0 ? s = _(s) : ("script" === a || !a && n.indexOf("javascript") >= 0) && t.globalEval(s)), s
				}
			}
		}
		if (!this.length) return e("ajaxSubmit: skipping submit process - no element selected"), this;
		var n, o, s, r = this;
		"function" == typeof a && (a = {
			success: a
		}), n = this.attr("method"), o = this.attr("action"), s = "string" == typeof o ? t.trim(o) : "", s = s || window.location.href || "", s && (s = (s.match(/^([^#]+)/) || [])[1]), a = t.extend(!0, {
			url: s,
			success: t.ajaxSettings.success,
			type: n || "GET",
			iframeSrc: /^https/i.test(window.location.href || "") ? "javascript:false" : "about:blank"
		}, a);
		var l = {};
		if (this.trigger("form-pre-serialize", [this, a, l]), l.veto) return e("ajaxSubmit: submit vetoed via form-pre-serialize trigger"), this;
		if (a.beforeSerialize && a.beforeSerialize(this, a) === !1) return e("ajaxSubmit: submit aborted via beforeSerialize callback"), this;
		var c, d, u = this.formToArray(a.semantic);
		if (a.data) {
			a.extraData = a.data;
			for (c in a.data) if (a.data[c] instanceof Array) for (var p in a.data[c]) u.push({
				name: c,
				value: a.data[c][p]
			});
			else d = a.data[c], d = t.isFunction(d) ? d() : d, u.push({
				name: c,
				value: d
			})
		}
		if (a.beforeSubmit && a.beforeSubmit(u, this, a) === !1) return e("ajaxSubmit: submit aborted via beforeSubmit callback"), this;
		if (this.trigger("form-submit-validate", [u, this, a, l]), l.veto) return e("ajaxSubmit: submit vetoed via form-submit-validate trigger"), this;
		var f = t.param(u);
		"GET" == a.type.toUpperCase() ? (a.url += (a.url.indexOf("?") >= 0 ? "&" : "?") + f, a.data = null) : a.data = f;
		var m = [];
		if (a.resetForm && m.push(function() {
			r.resetForm()
		}), a.clearForm && m.push(function() {
			r.clearForm()
		}), !a.dataType && a.target) {
			var h = a.success ||
			function() {};
			m.push(function(e) {
				var i = a.replaceTarget ? "replaceWith" : "html";
				t(a.target)[i](e).each(h, arguments)
			})
		} else a.success && m.push(a.success);
		a.success = function(t, e, i) {
			for (var n = a.context || a, o = 0, s = m.length; o < s; o++) m[o].apply(n, [t, e, i || r, r])
		};
		var g = t("input:file", this).length > 0,
			b = "multipart/form-data",
			v = r.attr("enctype") == b || r.attr("encoding") == b;
		if (a.iframe !== !1 && (g || a.iframe || v)) a.closeKeepAlive ? t.get(a.closeKeepAlive, function() {
			i(u)
		}) : i(u);
		else {
			if (t.browser.msie && "get" == n) {
				var $ = r[0].getAttribute("method");
				"string" == typeof $ && (a.type = $)
			}
			t.ajax(a)
		}
		return this.trigger("form-submit-notify", [this, a]), this
	}, t.fn.ajaxForm = function(a) {
		if (0 === this.length) {
			var i = {
				s: this.selector,
				c: this.context
			};
			return !t.isReady && i.s ? (e("DOM not ready, queuing ajaxForm"), t(function() {
				t(i.s, i.c).ajaxForm(a)
			}), this) : (e("terminating; zero elements found by selector" + (t.isReady ? "" : " (DOM not ready)")), this)
		}
		return this.ajaxFormUnbind().bind("submit.form-plugin", function(e) {
			e.isDefaultPrevented() || (e.preventDefault(), t(this).ajaxSubmit(a))
		}).bind("click.form-plugin", function(e) {
			var a = e.target,
				i = t(a);
			if (!i.is(":submit,input:image")) {
				var n = i.closest(":submit");
				if (0 == n.length) return;
				a = n[0]
			}
			var o = this;
			if (o.clk = a, "image" == a.type) if (void 0 != e.offsetX) o.clk_x = e.offsetX, o.clk_y = e.offsetY;
			else if ("function" == typeof t.fn.offset) {
				var s = i.offset();
				o.clk_x = e.pageX - s.left, o.clk_y = e.pageY - s.top
			} else o.clk_x = e.pageX - a.offsetLeft, o.clk_y = e.pageY - a.offsetTop;
			setTimeout(function() {
				o.clk = o.clk_x = o.clk_y = null
			}, 100)
		})
	}, t.fn.ajaxFormUnbind = function() {
		return this.unbind("submit.form-plugin click.form-plugin")
	}, t.fn.formToArray = function(e) {
		var a = [];
		if (0 === this.length) return a;
		var i = this[0],
			n = e ? i.getElementsByTagName("*") : i.elements;
		if (!n) return a;
		var o, s, r, l, c, d, u;
		for (o = 0, d = n.length; o < d; o++) if (c = n[o], r = c.name) if (e && i.clk && "image" == c.type) c.disabled || i.clk != c || (a.push({
			name: r,
			value: t(c).val()
		}), a.push({
			name: r + ".x",
			value: i.clk_x
		}, {
			name: r + ".y",
			value: i.clk_y
		}));
		else if (l = t.fieldValue(c, !0), l && l.constructor == Array) for (s = 0, u = l.length; s < u; s++) a.push({
			name: r,
			value: l[s]
		});
		else null !== l && "undefined" != typeof l && a.push({
			name: r,
			value: l
		});
		if (!e && i.clk) {
			var p = t(i.clk),
				f = p[0];
			r = f.name, r && !f.disabled && "image" == f.type && (a.push({
				name: r,
				value: p.val()
			}), a.push({
				name: r + ".x",
				value: i.clk_x
			}, {
				name: r + ".y",
				value: i.clk_y
			}))
		}
		return a
	}, t.fn.formSerialize = function(e) {
		return t.param(this.formToArray(e))
	}, t.fn.fieldSerialize = function(e) {
		var a = [];
		return this.each(function() {
			var i = this.name;
			if (i) {
				var n = t.fieldValue(this, e);
				if (n && n.constructor == Array) for (var o = 0, s = n.length; o < s; o++) a.push({
					name: i,
					value: n[o]
				});
				else null !== n && "undefined" != typeof n && a.push({
					name: this.name,
					value: n
				})
			}
		}), t.param(a)
	}, t.fn.fieldValue = function(e) {
		for (var a = [], i = 0, n = this.length; i < n; i++) {
			var o = this[i],
				s = t.fieldValue(o, e);
			null === s || "undefined" == typeof s || s.constructor == Array && !s.length || (s.constructor == Array ? t.merge(a, s) : a.push(s))
		}
		return a
	}, t.fieldValue = function(e, a) {
		var i = e.name,
			n = e.type,
			o = e.tagName.toLowerCase();
		if (void 0 === a && (a = !0), a && (!i || e.disabled || "reset" == n || "button" == n || ("checkbox" == n || "radio" == n) && !e.checked || ("submit" == n || "image" == n) && e.form && e.form.clk != e || "select" == o && e.selectedIndex == -1)) return null;
		if ("select" == o) {
			var s = e.selectedIndex;
			if (s < 0) return null;
			for (var r = [], l = e.options, c = "select-one" == n, d = c ? s + 1 : l.length, u = c ? s : 0; u < d; u++) {
				var p = l[u];
				if (p.selected) {
					var f = p.value;
					if (f || (f = p.attributes && p.attributes.value && !p.attributes.value.specified ? p.text : p.value), c) return f;
					r.push(f)
				}
			}
			return r
		}
		return t(e).val()
	}, t.fn.clearForm = function() {
		return this.each(function() {
			t("input,select,textarea", this).clearFields()
		})
	}, t.fn.clearFields = t.fn.clearInputs = function() {
		var t = /^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;
		return this.each(function() {
			var e = this.type,
				a = this.tagName.toLowerCase();
			t.test(e) || "textarea" == a ? this.value = "" : "checkbox" == e || "radio" == e ? this.checked = !1 : "select" == a && (this.selectedIndex = -1)
		})
	}, t.fn.resetForm = function() {
		return this.each(function() {
			("function" == typeof this.reset || "object" == typeof this.reset && !this.reset.nodeType) && this.reset()
		})
	}, t.fn.enable = function(t) {
		return void 0 === t && (t = !0), this.each(function() {
			this.disabled = !t
		})
	}, t.fn.selected = function(e) {
		return void 0 === e && (e = !0), this.each(function() {
			var a = this.type;
			if ("checkbox" == a || "radio" == a) this.checked = e;
			else if ("option" == this.tagName.toLowerCase()) {
				var i = t(this).parent("select");
				e && i[0] && "select-one" == i[0].type && i.find("option").selected(!1), this.selected = e
			}
		})
	}
}(jQuery), function(t) {
	function e(e, i) {
		var o = e == window,
			d = i && void 0 !== i.message ? i.message : void 0;
		i = t.extend({}, t.blockUI.defaults, i || {}), i.overlayCSS = t.extend({}, t.blockUI.defaults.overlayCSS, i.overlayCSS || {});
		var h = t.extend({}, t.blockUI.defaults.css, i.css || {}),
			g = t.extend({}, t.blockUI.defaults.themedCSS, i.themedCSS || {});
		if (d = void 0 === d ? i.message : d, o && f && a(window, {
			fadeOut: 0
		}), d && "string" != typeof d && (d.parentNode || d.jquery)) {
			var b = d.jquery ? d[0] : d,
				v = {};
			t(e).data("blockUI.history", v), v.el = b, v.parent = b.parentNode, v.display = b.style.display, v.position = b.style.position, v.parent && v.parent.removeChild(b)
		}
		var $, x, y = i.baseZ,
			w = t(t.browser.msie || i.forceIframe ? '<iframe class="blockUI" style="z-index:' + y+++';display:none;border:none;margin:0;padding:0;position:absolute;width:100%;height:100%;top:0;left:0" src="' + i.iframeSrc + '"></iframe>' : '<div class="blockUI" style="display:none"></div>'),
			k = t('<div class="blockUI blockOverlay" style="z-index:' + y+++';display:none;border:none;margin:0;padding:0;width:100%;height:100%;top:0;left:0"></div>');
		x = i.theme && o ? '<div class="blockUI ' + i.blockMsgClass + ' blockPage ui-dialog ui-widget ui-corner-all" style="z-index:' + y + ';display:none;position:fixed"><div class="ui-widget-header ui-dialog-titlebar ui-corner-all blockTitle">' + (i.title || "&nbsp;") + '</div><div class="ui-widget-content ui-dialog-content"></div></div>' : i.theme ? '<div class="blockUI ' + i.blockMsgClass + ' blockElement ui-dialog ui-widget ui-corner-all" style="z-index:' + y + ';display:none;position:absolute"><div class="ui-widget-header ui-dialog-titlebar ui-corner-all blockTitle">' + (i.title || "&nbsp;") + '</div><div class="ui-widget-content ui-dialog-content"></div></div>' : o ? '<div class="blockUI ' + i.blockMsgClass + ' blockPage" style="z-index:' + y + ';display:none;position:fixed"></div>' : '<div class="blockUI ' + i.blockMsgClass + ' blockElement" style="z-index:' + y + ';display:none;position:absolute"></div>', $ = t(x), d && (i.theme ? ($.css(g), $.addClass("ui-widget-content")) : $.css(h)), i.applyPlatformOpacityRules && t.browser.mozilla && /Linux/.test(navigator.platform) || k.css(i.overlayCSS), k.css("position", o ? "fixed" : "absolute"), (t.browser.msie || i.forceIframe) && w.css("opacity", 0);
		var j = [w, k, $],
			T = t(o ? "body" : e);
		t.each(j, function() {
			this.appendTo(T)
		}), i.theme && i.draggable && t.fn.draggable && $.draggable({
			handle: ".ui-dialog-titlebar",
			cancel: "li"
		});
		var I = u && (!t.boxModel || t("object,embed", o ? null : e).length > 0);
		if (p || I) {
			if (o && i.allowBodyStretch && t.boxModel && t("html,body").css("height", "100%"), (p || !t.boxModel) && !o) var C = l(e, "borderTopWidth"),
				S = l(e, "borderLeftWidth"),
				q = C ? "(0 - " + C + ")" : 0,
				_ = S ? "(0 - " + S + ")" : 0;
			t.each([w, k, $], function(t, e) {
				var a = e[0].style;
				if (a.position = "absolute", t < 2) o ? a.setExpression("height", "Math.max(document.body.scrollHeight, document.body.offsetHeight) - (jQuery.boxModel?0:" + i.quirksmodeOffsetHack + ') + "px"') : a.setExpression("height", 'this.parentNode.offsetHeight + "px"'), o ? a.setExpression("width", 'jQuery.boxModel && document.documentElement.clientWidth || document.body.clientWidth + "px"') : a.setExpression("width", 'this.parentNode.offsetWidth + "px"'), _ && a.setExpression("left", _), q && a.setExpression("top", q);
				else if (i.centerY) o && a.setExpression("top", '(document.documentElement.clientHeight || document.body.clientHeight) / 2 - (this.offsetHeight / 2) + (blah = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"'), a.marginTop = 0;
				else if (!i.centerY && o) {
					var n = i.css && i.css.top ? parseInt(i.css.top) : 0,
						s = "((document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + " + n + ') + "px"';
					a.setExpression("top", s)
				}
			})
		}
		if (d && (i.theme ? $.find(".ui-widget-content").append(d) : $.append(d), (d.jquery || d.nodeType) && t(d).show()), (t.browser.msie || i.forceIframe) && i.showOverlay && w.show(), i.fadeIn) {
			var U = i.onBlock ? i.onBlock : c,
				O = i.showOverlay && !d ? U : c,
				E = d ? U : c;
			i.showOverlay && k._fadeIn(i.fadeIn, O), d && $._fadeIn(i.fadeIn, E)
		} else i.showOverlay && k.show(), d && $.show(), i.onBlock && i.onBlock();
		if (n(1, e, i), o ? (f = $[0], m = t(":input:enabled:visible", f), i.focusInput && setTimeout(s, 20)) : r($[0], i.centerX, i.centerY), i.timeout) {
			var M = setTimeout(function() {
				o ? t.unblockUI(i) : t(e).unblock(i)
			}, i.timeout);
			t(e).data("blockUI.timeout", M)
		}
	}
	function a(e, a) {
		var o = e == window,
			s = t(e),
			r = s.data("blockUI.history"),
			l = s.data("blockUI.timeout");
		l && (clearTimeout(l), s.removeData("blockUI.timeout")), a = t.extend({}, t.blockUI.defaults, a || {}), n(0, e, a);
		var c;
		c = o ? t("body").children().filter(".blockUI").add("body > .blockUI") : t(".blockUI", e), o && (f = m = null), a.fadeOut ? (c.fadeOut(a.fadeOut), setTimeout(function() {
			i(c, r, a, e)
		}, a.fadeOut)) : i(c, r, a, e)
	}
	function i(e, a, i, n) {
		e.each(function(t, e) {
			this.parentNode && this.parentNode.removeChild(this)
		}), a && a.el && (a.el.style.display = a.display, a.el.style.position = a.position, a.parent && a.parent.appendChild(a.el), t(n).removeData("blockUI.history")), "function" == typeof i.onUnblock && i.onUnblock(n, i)
	}
	function n(e, a, i) {
		var n = a == window,
			s = t(a);
		if ((e || (!n || f) && (n || s.data("blockUI.isBlocked"))) && (n || s.data("blockUI.isBlocked", e), i.bindEvents && (!e || i.showOverlay))) {
			var r = "mousedown mouseup keydown keypress";
			e ? t(document).bind(r, i, o) : t(document).unbind(r, o)
		}
	}
	function o(e) {
		if (e.keyCode && 9 == e.keyCode && f && e.data.constrainTabKey) {
			var a = m,
				i = !e.shiftKey && e.target === a[a.length - 1],
				n = e.shiftKey && e.target === a[0];
			if (i || n) return setTimeout(function() {
				s(n)
			}, 10), !1
		}
		var o = e.data;
		return t(e.target).parents("div." + o.blockMsgClass).length > 0 || 0 == t(e.target).parents().children().filter("div.blockUI").length
	}
	function s(t) {
		if (m) {
			var e = m[t === !0 ? m.length - 1 : 0];
			e && e.focus()
		}
	}
	function r(t, e, a) {
		var i = t.parentNode,
			n = t.style,
			o = (i.offsetWidth - t.offsetWidth) / 2 - l(i, "borderLeftWidth"),
			s = (i.offsetHeight - t.offsetHeight) / 2 - l(i, "borderTopWidth");
		e && (n.left = o > 0 ? o + "px" : "0"), a && (n.top = s > 0 ? s + "px" : "0")
	}
	function l(e, a) {
		return parseInt(t.css(e, a)) || 0
	}
	if (/1\.(0|1|2)\.(0|1|2)/.test(t.fn.jquery) || /^1.1/.test(t.fn.jquery)) return void alert("blockUI requires jQuery v1.2.3 or later!  You are using v" + t.fn.jquery);
	t.fn._fadeIn = t.fn.fadeIn;
	var c = function() {},
		d = document.documentMode || 0,
		u = t.browser.msie && (t.browser.version < 8 && !d || d < 8),
		p = t.browser.msie && /MSIE 6.0/.test(navigator.userAgent) && !d;
	t.blockUI = function(t) {
		e(window, t)
	}, t.unblockUI = function(t) {
		a(window, t)
	}, t.growlUI = function(e, a, i, n) {
		var o = t('<div class="growlUI"></div>');
		e && o.append("<h1>" + e + "</h1>"), a && o.append("<h2>" + a + "</h2>"), void 0 == i && (i = 3e3), t.blockUI({
			message: o,
			fadeIn: 700,
			fadeOut: 1e3,
			centerY: !1,
			timeout: i,
			showOverlay: !1,
			onUnblock: n,
			css: t.blockUI.defaults.growlCSS
		})
	}, t.fn.block = function(a) {
		return this.unblock({
			fadeOut: 0
		}).each(function() {
			"static" == t.css(this, "position") && (this.style.position = "relative"), t.browser.msie && (this.style.zoom = 1), e(this, a)
		})
	}, t.fn.unblock = function(t) {
		return this.each(function() {
			a(this, t)
		})
	}, t.blockUI.version = 2.37, t.blockUI.defaults = {
		message: "<h1>Please wait...</h1>",
		title: null,
		draggable: !0,
		theme: !1,
		css: {
			padding: 0,
			margin: 0,
			width: "30%",
			top: "50%",
			left: "50%",
			color: "#fff520",
			border: "3px solid #fff",
			backgroundColor: "#393",
			"-webkit-border-radius": "5px",
			"-moz-border-radius": "5px",
			"border-radius": "5px",
			cursor: "default"
		},
		themedCSS: {
			width: "30%",
			top: "40%",
			left: "35%"
		},
		overlayCSS: {
			backgroundColor: "#000",
			opacity: .1,
			cursor: "default"
		},
		growlCSS: {
			width: "350px",
			top: "10px",
			left: "",
			right: "10px",
			border: "none",
			padding: "5px",
			opacity: .6,
			cursor: "default",
			color: "#fff",
			backgroundColor: "#000",
			"-webkit-border-radius": "10px",
			"-moz-border-radius": "10px",
			"border-radius": "10px"
		},
		iframeSrc: /^https/i.test(window.location.href || "") ? "javascript:false" : "about:blank",
		forceIframe: !1,
		baseZ: 1e3,
		centerX: !0,
		centerY: !0,
		allowBodyStretch: !0,
		bindEvents: !0,
		constrainTabKey: !0,
		fadeIn: 200,
		fadeOut: 400,
		timeout: 0,
		showOverlay: !0,
		focusInput: !0,
		applyPlatformOpacityRules: !0,
		onBlock: null,
		onUnblock: null,
		quirksmodeOffsetHack: 4,
		blockMsgClass: "blockMsg"
	};
	var f = null,
		m = []
}(jQuery), $(function() {
	function t() {
		$(".dptd").each(function(t) {
			var e = $(this);
			e.find("span").click(function(t) {
				var a = $(this);
				a.addClass("cur").siblings().removeClass("cur"), e.find(".address-wrap").eq(a.index()).addClass("on").siblings().removeClass("on")
			})
		})
	}
	function e() {
		$(window).scroll(function() {
			$(window).scrollTop() > 100 ? $("#gotop").show() : $("#gotop").hide()
		})
	}

$(".dptd").each(function() {
    var t = $(this);
    t.find(".address-wrap").each(function(e) {
        var a = $(this),
        i = a.find("s").html();

		if(a.find("h3 a").length>0){
			"iphone版" == i && ($("#pgbtn").length > 0 ? ($("#pgbtn > a").attr("href", a.find("h3 a").attr("href"))) : $("#azbtn").after('<li id="pgbtn"><a target="_blank" id="' + a.find("h3 a").attr("id") + '" href="' + a.find("h3 a").attr("href") + '">苹果版下载</a><i></i><p>手机扫描下载</p></li>'));
			"Android版" == i && $("#pgbtn").after('<li id="azbtn"><a target="_blank" id="' + a.find("h3 a").attr("id") + '" href="' + a.find("h3 a").attr("href") + '">安卓版下载</a><i></i><p>手机扫描下载</p></li>');
		}
    })
})

$("#dbtns li").each(function() {
	if($(this).find("a").length>0){
		qrcode.makeCode("https://m.anfensi.com/down/"+ $(this).find("a").attr("id") +".html");
		qrimg1=document.getElementById("qrcode1").getElementsByTagName("canvas")[0].toDataURL("image/png");
		$(this).find("p").html("<img src='"+qrimg1+"' style='width:110px;height:110px;padding:10px 0 5px 5px;' />手机扫描下载");
	}
})



	jtpic("#focus"), $(".address_like").each(function() {
		$(this).find("a").attr("reurl") && $(this).remove()
	}), $("#zshu").hide(), $(".ilist a,#topNavC a,.kbox a,.xgbb a,.dqu a,.xgwz a,.tagsk a,#recom a,#online a").click(function() {
		$(this).attr("target", "_blank")
	}), "安卓软件" == $(".seat a:eq(1)").html() && ($("#header dd p a").removeClass("cur"), $("#header dd p a:eq(5)").addClass("cur")), "安卓网游" == $(".seat a:eq(1)").html() && ($("#header dd p a").removeClass("cur"), $("#header dd p a:eq(3)").addClass("cur")), "安卓单机" == $(".seat a:eq(1)").html() && ($("#header dd p a").removeClass("cur"), $("#header dd p a:eq(2)").addClass("cur")), "手游榜单" != $(".seat a:eq(1)").html() && "安卓2" != $(".seat a:eq(1)").html() && "安卓3" != $(".seat a:eq(1)").html() || ($("#header dd p a").removeClass("cur"), $("#header dd p a:eq(1)").addClass("cur")), $(".company dt a").length < 1 && $(".company").remove(), $(".zq img").length > 0 && $(".zq").show(), $(".tagsk a").length > 0 ? $(".tab").css({
		height: "90px"
	}) : $(".tab").css({
		height: "47px"
	}), $(".keyText").length < 1 && $(".tbsm").remove(), $(".xgbb li").length < 1 && $(".xgbb").remove(), ($(".dqu li").length < 1 || $(".dqu .introTit a").attr("href").indexOf("index") > 0) && $(".dqu").remove(), $("#recom dd a").length < 1 && $("#recom").remove(), $(".tablist span").eq(0).click(function() {
		$(".tablist span").removeClass("cur"), $(this).addClass("cur"), $("#main > dd").show()
	}), $(".tab span").eq(1).click(function() {
		$(".tablist span").removeClass("cur"), $(this).addClass("cur"), $("#soft-info").hide(), $(".pic,.xgbb,.dptd,.dqu,.xgwz,#comment").show()
	}), $(".tab span").eq(2).click(function() {
		$(".tablist span").removeClass("cur"), $(this).addClass("cur"), $("#soft-info,.pic").hide(), $(".xgbb,.dptd,.dqu,.xgwz,#comment").show()
	}), $(".tab span").eq(3).click(function() {
		$(".tablist span").removeClass("cur"), $(this).addClass("cur"), $("#soft-info,.pic,.xgbb,.dptd,.dqu,.xgwz").hide(), $("#comment").show()
	}), $(".tab span").eq(4).click(function() {
		$(".tablist span").removeClass("cur"), $("#soft-info,.pic,.xgbb").hide(), $(".dptd,.dqu,.xgwz,#comment").show()
	});
	var a = $(".tagsk a:first").text();
	$(".tagsk a:gt(0)").each(function() {
		$(this).text() == a && $(".tagsk a:first").addClass("repeat")
	}), $(".tagsk .repeat").remove(), $("#qqqun a").length > 0 ? $("#qqqun").prepend("QQ交流群：") : $("#qqqun").remove();
	var i = $("#dinfo").attr("sid");
	$("#dinfo").attr("cid"), $("#comment").attr("cmty");
	if ($(".aztop").length > 0 && ReadMark(i, "showding", "showcai", 0), $("#comment-list dd p a:last-child").addClass("glBtn"), BindDing("#comment-list dl > dd > p", i, 0), $("#comment-list #cmtGo-wrap a").click(function() {
		$("#comment-form #cmtMsg").focus()
	}), $(".kbox dd a").each(function(t, e) {
		var a = "/" + detail.sid + ".html";
		e.href.indexOf(a) > -1 && $(e).remove()
	}), $(".kbox dd").each(function() {
		$(this).find("a").length > 6 && $(this).find("a:gt(5)").remove()
	}), $(".dptd .address-wrap").length < 1 ? $(".dptd").remove() : ($(".dptd").each(function(t) {
		var e = $(this);
		e.find(".address-wrap").each(function(t) {
			var a = $(this),
				i = a.find("s").html(),
				n = "<span>" + i + "</span>";
			0 == t && (n = '<span class="cur">' + i + "</span>", a.eq(0).addClass("on").siblings().removeClass("on")), e.find(".dtab").append(n), "Android版" == i && a.find("h3").length < 1 && a.append("<p class='nodown'>本内容暂时无下载<br/>建议<a class='addcollect' href='javascript:void 0' rel='nofollow'>收藏</a>本页关注最新更新情况！</p>"), "iPhone版" == i && ($("#pgbtn > a").attr("href", a.find(".xq").attr("href")), $("#pgbtn p img").attr("src", "http://qr.59370.com/pic.php?webid=5&amp;id=" + a.find(".xq").attr("id"))), "PC版" == i && $("#pcbtn > a").attr("href", a.find(".xq").attr("href")), a.find(".xq").hide()
		});
		var a = e.find(".address-wrap").length;
		a > 0 && e.show()
	}), $(".addlist .ul_Address h3").removeAttr("style"), $(".addlist #gaosuxiazai").removeAttr("style"), t()), $("#dbtns li").hover(function() {
		$(this).addClass("hover")
	}, function() {
		$(this).removeClass("hover")
	}), $("#dbtns i").hover(function() {
		$(this).siblings("p").addClass("hover")
	}, function() {
		$(this).siblings("p").removeClass("hover")
	}), "" == $("#pgbtn a").attr("href") && $("#pgbtn").remove(), "" == $("#pcbtn a").attr("href") && $("#pcbtn").remove(), $("#recom dd a").length > 6) {
		$("#recom dd a:gt(5)").hide(), $("#recom dt span").click(function() {
			var t = $("#recom dd a").slice(0, 6).detach();
			$("#recom dd").append(t), $("#recom dd a").show(), $("#recom dd a:gt(5)").hide()
		})
	} else $("#recom dt span").hide();
	if (("安卓游戏1" == $(".seat a:eq(1)").html() || "安卓手游1" == $(".seat a:eq(1)").html() || "手机网游1" == $(".seat a:eq(1)").html()) && $("#online").length < 1) {
		for (var n = '<dl class="ilist" id="online"><dt><span>换一换</span>在线玩游戏</dt><dd>', o = {
			o_data: [{
				url: "/h5/307960.html",
				imgurl: "http://pic.pc6.com/up/2016-8/20168121136544314314.png",
				name: "传奇世界",
				cata: "策略"
			}, {
				url: "/h5/337326.html",
				imgurl: "http://1.pic.pc6.com/thumb/up/2016-8/20168121749533204203_82_82.png",
				name: "皇城传奇h5",
				cata: "策略"
			}, {
				url: "/h5/250872.html",
				imgurl: "http://pic.pc6.com/up/2016-3/201632314402.png",
				name: "古龙群侠传",
				cata: "策略"
			}, {
				url: "/h5/250955.html",
				imgurl: "http://pic.pc6.com/up/2016-3/2016323151418.png",
				name: "暗黑之王",
				cata: "动作"
			}, {
				url: "/h5/250785.html",
				imgurl: "http://pic.pc6.com/up/2016-3/2016323115124.png",
				name: "愚公移山",
				cata: "休闲"
			}, {
				url: "/h5/291974.html",
				imgurl: "http://pic.pc6.com/up/2016-5/2016528104552.png",
				name: "点兵三国志",
				cata: "策略"
			}, {
				url: "/h5/406382.html",
				imgurl: "http://pic.pc6.com/up/2016-12/20161222912342193192.jpg",
				name: "暗影之怒",
				cata: "策略"
			}, {
				url: "/h5/269309.html",
				imgurl: "http://pic.pc6.com/up/2016-4/2016422155044.png",
				name: "盗墓英雄",
				cata: "冒险"
			}, {
				url: "/h5/267699.html",
				imgurl: "http://pic.pc6.com/up/2016-4/2016420152216.png",
				name: "全民穿越之宫",
				cata: "冒险"
			}, {
				url: "/h5/267938.html",
				imgurl: "http://pic.pc6.com/up/2016-4/2016420173614.png",
				name: "矮人爬爬塔",
				cata: "策略"
			}, {
				url: "/h5/373417.html",
				imgurl: "http://pic.pc6.com/up/2016-10/201610251618426637546.jpg",
				name: "盛世霸业",
				cata: "策略"
			}, {
				url: "/h5/283323.html",
				imgurl: "http://pic.pc6.com/up/2016-5/201651785841.png",
				name: "街机捕鱼",
				cata: "休闲"
			}]
		}, s = 0; s < o.o_data.length; ++s) n += '<p><a href="' + o.o_data[s].url + '" target="_blank"><img src="' + o.o_data[s].imgurl + '"><i>' + o.o_data[s].name + "</i></a><span>" + o.o_data[s].cata + '</span><a href="' + o.o_data[s].url + '" class="btn" target="_blank">立即玩</a></p>';
		n += "</dd></dl>", $("#dinfo").append(n)
	}
	if ($("#online dd p").length > 6) {
		$("#online dd p:gt(5)").hide(), $("#online dt span").click(function() {
			var t = $("#online dd p").slice(0, 6).detach();
			$("#online dd").append(t), $("#online dd p").show(), $("#online dd p:gt(5)").hide()
		})
	} else $("#online dt span").hide();
	var r = $("#header").height() + 0,
		l = $("#header dd:first");
	$(window).scroll(function() {
		$(this).scrollTop() > r ? l.addClass("navFix") : l.removeClass("navFix")
	}), $(".ilist").each(function() {
		$(this).find("p:last").addClass("nob")
	});

	var u = 0,
		p = 0;
	$("#downup,#closeup").hover(function() {
		$(this).addClass("hover")
	}, function() {
		$(this).removeClass("hover")
	}), $("#azbtn b,#pgbtn b,#pcbtn b").click(function() {
		if (p) $("#upaddr").hide(), $("#addbalck").css({
			width: 0,
			height: 0
		}), $("body").css("cursor", "default"), p = 0;
		else {
			var t = $(window).height(),
				e = $("#upaddr"),
				a = e.height(),
				i = (t - a) / 2;
			u = i, e.css({
				top: i + "px"
			}), e.show().css("top", i), $("body").css("cursor", "wait"), p = 1, $("#addbalck").css({
				width: $(document.body).width(),
				height: $(document.body).height()
			}), $.browser.msie && $.browser.version <= 6 && e.css({
				top: i + $(document).scrollTop() + "px"
			})
		}
	}), $("#closeup,#addbalck").click(function() {
		$("#upaddr").hide(), $("#addbalck").css({
			width: 0,
			height: 0
		}), $("body").css("cursor", "default"), p = 0
	}), $.browser.msie && !p && $("body").click(function(t) {
		t.target != $("#upaddr")[0] && t.target != $("#upaddr dt")[0] && t.target != $("#uaddl")[0] && t.target != $("#tjad")[0] && t.target != $("#azbtn b")[0] && ($("#upaddr").hide(), $("#addbalck").css({
			width: 0,
			height: 0
		}), $("body").css("cursor", "default"), p = 0)
	}), $.browser.msie && $.browser.version <= 6 && $(window).scroll(function() {
		$("#upaddr").css({
			top: u + $(document).scrollTop() + "px"
		})
	}), $("#uaddl ul").length < 1 && ($("#uaddl").append("<p>本内容暂时无下载<br/>建议<a class='addcollect' href='javascript:void 0' rel='nofollow'>收藏</a>本页关注最新更新情况！</p>"), $("#dinfo").find(".base i:eq(2)").html("大小：未知")), $("#dinfo").find(".base i:eq(2):contains('0KB')").html("大小：未知"), $(".ilist dd p > span:contains('0KB')").html("未知"), $(".xgbb li > i:contains('0KB')").html("未知"), $(".addcollect").click(function() {
		var t = "pc6下载：" + $("#dinfo h1").text(),
			e = window.location.href;
		try {
			window.external.addFavorite(e, t)
		} catch (a) {
			try {
				window.sidebar.addPanel(t, e, "")
			} catch (t) {
				alert("对不起，您的浏览器不支持此操作!\n请您使用菜单栏或Ctrl+D收藏")
			}
		}
	});
	var f = $(".seat a:eq(1)").html();
	"安卓游戏" != f && "安卓网游" != f && "安卓单机" != f || ($("#uaddl").after('<dd id="tjad"><div class="jptj"><h3>推荐游戏</h3><a href="216325.html"><img src="https://img.anfensi.com/upload/2018-6/20186101322454173.png">红色复仇</a><a href="116420.html"><img src="https://img.anfensi.com/upload/2018-6/2018651159509041.jpg">问道手游版</a></div></dd>'), $("#ewm img").attr("src", "../public/images/syewm.html"), $("#tjad .ewm img").css({
		width: "150px",
		height: "150px",
		margin: "10px auto 0 auto"
	}), $("#ewm u").html("关注安粉丝公众号<br/>礼包、游戏资讯攻略应用尽有")), "安卓软件" == f && $("#uaddl").after('<dd id="tjad"><div class="jptj"><h3>推荐应用</h3><a href="195218.html"><img src="https://img.anfensi.com/upload/2018-6/2018691115431415.png">uc浏览器</a><a href="173328.html"><img src="https://img.anfensi.com/upload/2018-6/2018623859164354.png">2345影视</a></div></dd>'), $("#fkey").length > 0 && $(function() {
	});
	var m = $("#softID").val();
	inputDefault("#cmtMsg"), inputDefault("#userName"), $("#cmtNum").html() < 6 && $("#cmtNum-wrap").hide(), $("#cmtForm").ajaxForm({
		beforeSubmit: cmtBefore,
		success: function(t, e) {
			$("#cmtMsg").val(""), $("#subOK").remove();
			var a = $("#userName").val(),
				i = getNowFormatDate();
			if ($("#comment-list dl").length > 0) {
				$("#cmtOK").remove();
				var n = '<dt id="subOK"><span><i>顶楼 </i><b> 您的评论</b> </span><em>发表于: <font>' + i + '</font>  </em></dt><dd id="cmtOK">' + t + "</dd>";
				$("#comment-list dl").last().append(n)
			}
			if ($("#comment-list ul").length > 0) {
				var n = '<li id="subOK" class="cmtList none"><p class="cmtList-user"><span class="cmtList-floor">顶楼</span><span class="cmtList-name">' + a + '</span></p><div class="cmtList-content">' + t + '</div><p class="cmtList-ft"><span class="cmtList-time">' + i + '</span> <span class="cmtList-reply button btnGreen">盖楼(回复)</span></p></li>';
				$("#comment-list ul:eq(1)").append(n)
			}
			$("#subOK").fadeIn(400)
		}
	}), $(".glBtn").click(function() {
		var t = "[quote]"+$(this).attr("pid")+"[/quote]",
			e = " ";
		e += '<p class="f14 tl pr pb10 yahei green">盖楼回复<span class="closeSendErr" id="closeUI">X</span></p>', e += '<p id="glName-wrap"><input name="UserName" type="text" id="glName" class="input-bg grey9" maxlength="10" value="安粉丝" />(您的评论需要经过审核才能显示)</p>', e += '<p><textarea id="glMsg" class="input-bor"></textarea></p>', e += '<p class="tr pt10"><input type="submit" class="btn-submit button btnOrg" id="glRep-btn" value="提交评论" /></p>', $.blockUI({
			message: e,
			css: {
				marginLeft: "-242px",
				top: "40%",
				padding: 15,
				width: "580px",
				color: "#000",
				background: "#fff",
				border: "3px solid #25c88a"
			},
			overlayCSS: {
				cursor: "default"
			}
		}), $(".blockOverlay").attr("title", "点击取消盖楼").click($.unblockUI), $("#closeUI").click(function() {
			$.unblockUI()
		}), $("#glMsg").focus(), $("#glRep-btn").click(function() {
			var e = $("#glMsg").val();
			return e < 3 ? (alert("您输入的评论太短：少于3个汉字;请重新输入"), !1) : e.length > 200 ? (alert("您输入的内容太多了，最多200个汉字"), !1) : (e = t + e, $("#repBox").remove(), void $.ajax({
				type: "POST",
				url: "/ajax.asp",
				data: {
					Action: 2,
					SoftId: m,
					CommentTpye: 0,
					content: e
				},
				success: function(t, e) {
					setTimeout(function() {
						$.blockUI({
							message: '<p class="f18 fb pt10 pb10">盖楼成功！</p>',
							css: {
								marginLeft: "-150px",
								top: "40%",
								width: "300px",
								textAlign: "center",
								color: "#090",
								background: "#fdfddf",
								border: "3px solid #090"
							},
							showOverlay: !1,
							timeout: 500
						})
					}, 500)
				}
			}))
		})
	}), $(".cmtList-reply").click(function() {
		var t = $(this).next(".replyId").html(),
			e = "[quote]" + t + "[/quote]";
		$("#cmtMsg").focus().val(e);
		var a = "action=19&id=" + t;
		$.ajax({
			type: "POST",
			url: "/ajax.asp",
			data: a
		}), $(".cmtList-reply").hover(function() {
			$(this).addClass("hover")
		}, function() {
			$(this).removeClass("hover")
		})
	}), $("#dside").append("<div style='height:250px;overflow:hidden;margin-left:11px'><iframe frameborder='0' scrolling=no src='' width='250' height='250'></iframe></div>"), $("#comment").before("<div style='height:0px;overflow:hidden;margin-left:8px'><iframe frameborder='0' scrolling=no src='' width='640' height='0'></iframe></div>"), $("body").append('<ul class="float_btn"><li id="gotop"><a href="javascript:;" title="回到顶部" rel="nofollow"></a></li><li id="ewm"><a href="javascript:;" title="二维码" rel="nofollow"></a><i></i><em><img src="../statics/images/anfensi.png"><u>安粉丝网手机版</u></em></li><li id="pinglun" ><a href="javascript:;" title="我要评论" rel="nofollow"></a></li></ul>'), $(".share_btn").hover(function() {
		$(this).addClass("hover")
	}, function() {
		$(this).removeClass("hover")
	}), $(".share_btn").mouseover(function(t) {
		$(this).find("p").css("display", "block")
	}).mouseout(function(t) {
		$(this).find("a").show(), $(this).find("p").hide()
	}), $("#pinglun").click(function() {
		$("html,body").animate({
			scrollTop: $("#comment").offset().top
		}, 350)
	}), $("#gotop").click(function() {
		$("body,html").animate({
			scrollTop: 0
		}, 2e3)
	}), $("#gotop").hide(), e(), $(".float_btn li#ewm").hover(function() {
		$(this).addClass("hover").siblings().removeClass("hover")
	}, function() {
		$(this).removeClass("hover")
	})
});

<!-- ad：anfensi-content before intro -->
	   var rname=$(".seat a:eq(1)").html();
	   if(rname=="安卓网游"&&$("p.enjoy a").length<=5){$("p.enjoy").remove();
$("#main").before('<p class="enjoy clearfix"><a href="https://www.anfensi.com/down/259578.html" target="_blank"><img src="https://img.anfensi.com/upload/2018-6/2018611446391287.jpg">王者荣耀</a><a href="https://www.anfensi.com/down/97841.html" target="_blank"><img src="https://img.anfensi.com/upload/2018-6/201862930107555.png">梦幻西游</a><a href="https://www.anfensi.com/down/120921.html" target="_blank"><img src="https://img.anfensi.com/upload/2018-6/20186694643222.png">口袋妖怪复刻</a><a href="https://www.anfensi.com/down/83333.html" target="_blank"><img src="https://img.anfensi.com/upload/2018-6/2018651454392966.jpg">时空猎人ol</a><a href="https://www.anfensi.com/down/87417.html" target="_blank"><img src="https://img.anfensi.com/upload/2018-6/201866944456584.jpg">刀塔传奇</a><a href="https://www.anfensi.com/down/297915.html" target="_blank"><img src="https://img.anfensi.com/upload/2018-6/2018661037518602.jpg">绝地求生</a><a href="https://www.anfensi.com/down/132090.html" target="_blank"><img src="https://img.anfensi.com/upload/2018-6/201866101320831.png">大话西游</a></p>');
	   }
	   if(rname=="安卓软件"&&$("p.enjoy a").length<=5){$("p.enjoy").remove();
$("#main").before('<p class="enjoy clearfix"><a href="https://www.anfensi.com/down/185249.html" target="_blank"><img src="https://img.anfensi.com/upload/2018-6/20186251720515793.png">腾讯新闻</a><a href="https://www.anfensi.com/down/237355.html" target="_blank"><img src="https://img.anfensi.com/upload/2018-6/2018691115431415.png">uc浏览器</a><a href="https://www.anfensi.com/down/128851.html" target="_blank"><img src="https://img.anfensi.com/upload/2018-6/20186611421108.png">360手机助手</a><a href="https://www.anfensi.com/down/121716.html" target="_blank"><img src="https://img.anfensi.com/upload/2018-12/20181222132277640.png">腾讯地图</a><a href="https://www.anfensi.com/down/246799.html" target="_blank"><img src="https://img.anfensi.com/upload/2018-8/20188693041680.png">六间房</a><a href="https://www.anfensi.com/down/143448.html" target="_blank"><img src="https://img.anfensi.com/upload/2019-1/20191171617242631.png">飞狐视频下载器</a><a href="https://www.anfensi.com/down/242540.html" target="_blank"><img src="https://img.anfensi.com/upload/2018-6/2018611229402246.png">腾讯视频</a></p>');
	   }
	   if(rname=="安卓单机"&&$("p.enjoy a").length<=5){$("p.enjoy").remove();
$("#main").before('<p class="enjoy clearfix"><a href="https://www.anfensi.com/k/hyzj/" target="_blank"><img src="https://img.anfensi.com/upload/2018-6/201867151118598.jpg">火影战记</a><a href="https://www.anfensi.com/k/pjyxhz/" target="_blank"><img src="https://img.anfensi.com/upload/2018-6/2018681817543161.jpg">破解游戏</a><a href="https://www.anfensi.com/k/pvz/" target="_blank"><img src="https://img.anfensi.com/upload/2018-6/201865181165340.jpg">植物大战僵尸</a><a href="https://www.anfensi.com/k/huluxia/" target="_blank"><img src="https://img.anfensi.com/upload/2018-6/201866919333145.png">葫芦侠</a><a href="https://www.anfensi.com/k/hcryx/" target="_blank"><img src="https://img.anfensi.com/upload/2018-6/2018651049323953.png">火柴人</a><a href="https://www.anfensi.com/k/wdsj/" target="_blank"><img src="https://img.anfensi.com/upload/2018-6/2018671116144251.png">我的世界</a><a href="https://www.anfensi.com/k/xcmm/" target="_blank"><img src="https://img.anfensi.com/upload/2018-6/201865191712907.jpg">熊出没</a></p>');
	   }

$('#dbtns').after("<ul id=\"gzh\"><li class=\"eCode\"><img src=\"https://www.anfensi.com/statics/images/anfensi.png\" alt=\"安粉丝手机版\">扫描访问安粉丝手机版</li></ul>");

$('body').append("<div id='qrcode1' style='display:none;'></div>");
var qrcode = new QRCode(document.getElementById("qrcode1"), {colorLight:"#ffffff",width:100,height:100});
qrcode.makeCode("https://m.anfensi.com/down/"+ _pageinfo.id +".html");
var qrimg1=document.getElementById("qrcode1").getElementsByTagName("canvas")[0].toDataURL("image/png");
$('#azbtn p').html("<img src='"+qrimg1+"' style='width:110px;height:110px;padding:10px 0 5px 5px;' />手机扫描下载");
$('.eCode').html("<img src='"+qrimg1+"' style='width:110px;height:110px;padding:6px;' />扫描访问手机版");

	var openurl = document.referrer ;
	console.log(openurl)
	console.log(openurl.indexOf("baidu"))
	if(openurl.indexOf("baidu") != -1 || openurl == ''|| openurl == 'anfen'){
		size0no()//0KB预约
	}




function size0no(){
	var size = $(".base i:eq(0)").text();

	var downurl = $("#azbtn").attr("b");
	if (size == '大小：0KB' || downurl == '' || downurl == 'http://m.anfensi.com/' ){			
			$("#btns a").text("立即预约").attr({ style: "background-color:#66d105;", href: "javascript:;" }).addClass('m-yuyueok');
			//执行预约
			// 获取预约数据
			var qqun = 'https://shang.qq.com/wpa/qunwpa?idkey=3a12ae18905af79885e7bd48087b7b94918eb4160490018e62a7fa25ecb4f904';
			var weixinname = ''
        	yuyue(qqun,weixinname)
	}
}

function yuyue(qqun,weixinname){				
		//添加预约信息
		var yuyuecss = '<style>.g-yuyuebg {z-index:+100;background:#000;filter:alpha(opacity=50);-moz-opacity:.5;-khtml-opacity:.5;opacity:.5;position:fixed;left:0;top:0;width:100%;height:100%}.g-yuyue{width: 90%;	position: fixed;	left: 5%;		top: 50%;	margin-top: -155px;	z-index: +101;	background: #fff;	border-radius: 10px;	overflow: hidden}.m-yytit {	background: #66d105;	font: 18px/45px microsoft yahei;	color: #fff;	padding: 0 5px 0 15px;	margin-bottom:15px;}.m-yytit span {	float: right;	font-size: 35px;	cursor: pointer; padding:0 5px;line-height:40px}.m-yyinfo { margin-bottom: 15px; text-align: center}.m-yyinfo span{ display: inline-block; width: 80px; text-align: right; font-size: 16px; padding-left: 30px; }.m-yyinfo input {border: #ccc 1px solid;     margin:0 0 0 0;    padding: 0 10px;    font: 14px/34px microsoft yahei;    border-radius: 3px; width: 80%; margin:0 auto;}.m-yyinfo input:focus {	border: #66d105 1px solid}.m-yuyuenum { padding:0 10px; text-align: center;font-size: 14px; margin-bottom:10px; }.m-yuyuenum span { font-weight: bold; color:#f40}.m-yyqdbtn {border-top: 1px solid #e5e5e5; text-align: center; line-height: 70px;}.m-yyqdbtn a {    padding: 12px 40px;    line-height: 20px;    border-radius: 5px; background-color: #66d105; color:#fff; margin:0 10px; font-size: 16px;}.m-yyqdbtn a:hover { background-color: #1b91c8 }.g-yuyue,.g-yuyuebg {display: none}.m-qqweixin {margin-bottom: 10px;text-align: center;}.m-qqweixin a{display: inline-block;padding:4px 15px 8px 10px; text-align: center; margin: 0 10px;background-color: #20aef0; color:#fff; text-decoration: none; border-radius: 5px;position: relative; font-size:14px;}.m-qqweixin a:hover { background-color: #20aecc}.m-qqweixin a span { display: inline-block; width: 20px; height: 20px; background-color: #f00; position: relative;top: 4px; margin-right: 5px }.m-qqweixin a.m-yyqq span { background:url(https://www.cr173.com/images/yyqq.png) 3px 0 ;background-size: 17px; background-repeat: no-repeat; top: 5px}.m-qqweixin a.m-yyweixin { background-color: #50b674 }.m-qqweixin a.m-yyweixin span { background:url(yyweixin.png);background-size: 20px; }.m-qqweixin a.m-yyweixin i{display: none;}.m-qqweixin a.m-yyweixin:hover i{display: block;}.m-qqweixin a.m-yyweixin i{width: 120px;position: absolute;left:-10px;}.m-qqweixin a.m-yyweixin i img{width: 100%;}</style>';
		$('head').append(yuyuecss);
		var yuyuediv = '<div class="g-yuyue" data-click="0"><div class="m-yytit">请输入您的预约信息：<span class="f-fr f-yyclose">×</span></div><div class="m-yyinfo"><span></span><input type="text" id="f-yyPhone" placeholder="输入手机号码" maxlength="11" autocomplete="off"></div><div class="m-yuyuenum">预约后可及时接受<span>活动，礼包，开测和开放下载</span>的提醒</div><div class="m-qqweixin clearfix" ><p><a target="_blank" href="'+qqun+'" class="m-yyqq"><span></span>加入预约QQ群</a></p></div><div class="m-yyqdbtn"><a href="javascript:;" class="m-yybtn f-yybtn">预约</a><a href="javascript:;" class="m-yycl f-yyclose">关闭</a></div></div><div class="g-yuyuebg f-yyclose"></div>';
		$('body').append(yuyuediv);
		$('.m-yuyueok').click(function(){// 打开
			var yyclinum = $('.g-yuyue').attr('data-click');
			if (yyclinum != 0) {
				alert('您已经预约过拉')
			}else{
				$('.g-yuyue,.g-yuyuebg').fadeIn();
			}
			
		});
		$('.f-yyclose').click(function(){// 关闭
			$('.g-yuyue,.g-yuyuebg').hide();
		});
		$('.f-yybtn').click(function(){// 提交

			var iputxt = ''
			$('.g-yuyue input').each(function(){
				iputxt += $(this).val();
			})
			
			if (iputxt == '') {// 为空
				alert('手机号不能为空')
				return false; 
			}
			var yyphone = $('#f-yyPhone').val();
			var yyqq = $('#f-QQ').val();
        	var phonereg = /^1[\d]{10}$/; // 手机号段设置
        	if (yyphone != '') {
        		if(!phonereg.test(yyphone)){
	            	alert('请输入有效的手机号！');            
	            	return false;
	        	}
        	}
        	// 手机号验证结束
        	$('.g-yuyue').attr('data-click',1);
        	$('.m-yuyueok').text('成功预约')
			alert('预约成功');     
        	$('.g-yuyue,.g-yuyuebg').hide();
        	var yuyuephome = $('#f-yyPhone').val();

			$.getJSON("../ajax73d8.html?action=34&amp;id="+_webInfo.Id+"&phone="+yuyuephome+"&callback=?", function(data){                
                
            });

		});
}

(function(){
	addsou();
	$(".m-nav-btn").click(function(){
		var n = $(this).attr("data-num");
		if(n==0){
			$(this).next().next("div").show();
			$(this).attr("data-num",1);
		}else{
			$(this).next().next("div").hide();
			$(this).attr("data-num",0);
		}
	})
	var a = 1;
    $(".menu").click(function(){
	    if(a==1){
			$(this).addClass("open").removeClass("close");
			a = 2;
		}else{
			$(this).addClass("close").removeClass("open");
			a = 1;
		}
   })
	$(".plist").each(function(i){//横向多个滑动
		var idStr = $(this).attr("id");
	 	var parent_class =  $(this).attr("class");
		var child_class =  $("."+parent_class).children(i).children(0).attr("class");
		createIScroll(idStr,"g-ppt-btn");
	});
});



var moren = "游戏";
function keywordCont(){
	var falseWords = ["_","+","破解","注册机"];
	var keyFont = $(".bdcs-search-form-input").val();
	console.log(keyFont)
	if(keyFont != ""){			
		for(i=0;i<falseWords.length;i++){
			if(keyFont.indexOf(falseWords[i]) != -1){
				alert("不允许有非法字符");
				return false;
			}	
		}		
		if(moren=="游戏"){
			var keyFont = $(".bdcs-search-form-input").val();
			window.location.href="http://s.anfensi.com/search/pc/"+keyFont+"_all_time.html";	
		}else{
			var keyFont = $(".bdcs-search-form-input").val();
			window.location.href="http://s.anfensi.com/search/a/"+keyFont+".html";	
		}				
	}else{
		window.location.href="http://s.anfensi.com/";	
	}		
}


(function() {
	addsou();
	var moren = "游戏";
	$(".bdcs-search-form-input").keyup(function(){
		 if(event.keyCode == 13){
			keywordCont();
		 }
	})
	$(".bdcs-search-form-submit").click(function(){
		keywordCont()	
	});

})();


function addsou(){
	var arr = ["映客直播","爱奇艺","阴阳师","倩女幽魂","影音先锋","王者荣耀","陌陌","猎魂觉醒","我叫mt","大天使之剑","恋与制作人","极品芝麻官","我的世界","火影战记","决战平安京","天使纪元","拳皇","口袋妖怪","火柴人联盟","三国志","时空猎人","大话西游","梦幻西游"]; 
		var index = Math.floor((Math.random()*arr.length)); 
	$(".bdcs-search-form-input").attr("value",arr[index])

}



$(function($) {
	chaping();
	if($(".appinfo li.pname").text()=="包名：")$(".appinfo li.pname").hide();
	if($(".appinfo li.md5").text()=="MD5：")$(".appinfo li.md5").hide();

	$("#authority dd > p").text().length > 5 ? ($("#authority").show(),
    $("#authority").hover(function() {
        $(this).find("dd").show()
    }, function() {
        setTimeout(function() {
            $("#authority").find("dd").hide()
        },2000)
    })) : $("#authority").remove();
});

function chaping(){
	//详细页点击差评弹窗
		$(".is_bad,#showcai").click(function(){ 
			if ($(this).attr('data-ci') !=1) {
			//var gotopl = $("#comment_list").offset().top-100;
		  	//$("body,html").animate({scrollTop:gotopl},300);
		  	var pltc = '<div class="g-hpopBox"><div class="g-tips"><p>请留下您的联系方式，描述一下您打差评的原因，我们将用火箭般的速度修复，并有机会获得贴心礼物。</p><a href="javascript:void(0);" class="f-close"></a></div><div class="g-input-cont"><p><span><label><em><input value="软件无法下载，" id="no-one" name="cuowu" type="checkbox"></em>软件无法下载</label></span><span><label><em><input value="下载后无法使用，" id="no-two" name="cuowu" type="checkbox"></em>下载后无法使用</label></span><span><label><em><input value="与描述不一致。" id="no-three" name="cuowu" type="checkbox"></em>与描述不一致</label></span></p><p><span><label><font>手机号码：</font><input value="" name="cuowu" type="input" maxlength="11" class="m-txt-phone"></label></span></p></div><div class="g-plTextaera"><textarea id="cuowuneirong" ></textarea></div><div class="g-plSubmit"><input onclick="submitComment()" value="立即提交" id="tijiaocuowu" class="submit1" type="button"></div></div>';
			$(".aztop").append(pltc);

		var cu1 =$('#no-one').val();
		var cu2 =$('#no-two').val();
		var cu3 =$('#no-three').val();
		
	$(".g-input-cont p em input").each(function(){
		

		$(this).click(function(){ 
			if( $(this).prop("checked") == true){	
				var txt = $("#cuowuneirong").val();		
				txt += $(this).val();
				$("#cuowuneirong").val(txt);
			}
			if( $(this).prop("checked") == false){

				var notxt = $(this).val();
				var txtmain = $("#cuowuneirong").val();
				var notx2t = txtmain.replace(notxt,'');
				$("#cuowuneirong").val(notx2t);
				txt = notx2t;
				console.log(notxt)
				console.log(txtmain)
			}
		})
	})	

		$(".f-close").click(function(){ 
			$(".g-hpopBox").remove();
		});

	$(this).attr('data-ci','1');
	}
	});

}

if(_pageinfo.rootId=="2") $("#azbtn").before('<li class="pc"><a href="http://t.xiazaicc.com/001/031" spid="anfensi" id="modownload" target="_blank"><i></i>电脑版下载</a></li>');

(function(){
var src = "https://jspassport.ssl.qhimg.com/11.0.1.js?d182b3f28525f2db83acfaaf6e696dba";
document.write('<script src="' + src + '" id="sozz"><\/script>');
})();


$(function(){
	$(".address_like a").bind("click",function(){ 
		var downurl=$(this).attr("href");
		if (downurl.indexOf(".apple.com/")!=-1)return true;
		var temwin=window.open(downurl);
		setTimeout(function(){
			if(temwin&&temwin.closed)
				console.log("1");
			else{
				if(typeof _pageinfo=="undefined")return;
				var id=_pageinfo.id;
				var downerrdata=sessionStorage['derr'+id]?sessionStorage['derr'+id]:"";
				if(downerrdata==""){
					var data="domain="+escape(location.host)+"&soft_id="+escape(_pageinfo.id)+"&name="+escape(_pageinfo.softname)+"&url="+escape(downurl)+"&address="+escape(location.href)+""
					$.ajax({type: "POST",url: "/api/errpost.asp",data:data,
						success: function(msg){
							console.log(msg);
							sessionStorage['derr'+id]="1";
						}
					});
				}
			}
		}, 2000);
		return false;
	});
});
if(JSON.stringify(_downInfo)==="{}"){$("#azbtn").hide();$("#dbtns .pc").hide();}