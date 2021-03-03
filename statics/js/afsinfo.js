//==========Mobile redirect Begin ========
var browser = {
            versions: function () {
                var u = navigator.userAgent, app = navigator.appVersion;
                return {//移动终端浏览器版本信息
                    trident: u.indexOf('Trident') > -1, //IE内核
                    presto: u.indexOf('Presto') > -1, //opera内核
                    webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                    gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                    mobile: !!u.match(/AppleWebKit.*Mobile/i) || !!u.match(/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/), //是否为移动终端
                    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                    android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
                    iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
                    iPad: u.indexOf('iPad') > -1, //是否iPad
                    webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
                };domain
            } (),
            language: (navigator.browserLanguage || navigator.language).toLowerCase()
    }
	
	// JavaScript Document
 var Cookie={get:function(name){var value='',matchs;if(matchs=document.cookie.match("(?:^| )"+name+"(?:(?:=([^;]*))|;|$)"))value=matchs[1]?unescape(matchs[1]):"";return value},set:function(name,value,expire,domain){expire=expire||30*24*3600*1000;var date=new Date(),cookie="";date.setTime(date.getTime()+expire);cookie=name+"="+escape(value)+";expires="+date.toGMTString()+";path=/;";domain&&(cookie+="domain="+domain+";");document.cookie=cookie},del:function(name,domain){Cookie.set(name,'',-1,domain)}};
 
(function(){  

	var  href = location.href,
	      isFormMoblie = /[\?&]m(&|$)/.test(window.location.search),
		  doNotRedirect =  +Cookie.get('donotredirect'),
		  mUrl="https://m.anfensi.com/",
		  isMoblie=browser.versions.mobile;
		  
		  	var Init ={
		      redirect : function(){
				  var reg = /\/down\/(\d+)\.html/ig;
				  var m = reg.exec(href);
				  if(m){
					 window.location.href = mUrl + "down/" +m[1]+ '.html';  
					 return;
				  }
				  var reg = /\/game\/(\d+)\.html/ig;
				  var m = reg.exec(href);
				  if(m){
					 window.location.href = mUrl + "down/" +m[1]+ '.html';  
					 return;
				  }
				  reg = /\/article\/(\d+)\.html/ig;
				  m = reg.exec(href);
				  if(m){
					 window.location.href = mUrl + "article/" +m[1]+ '.html';  
					 return;
				  }
				  
				  reg = /\/k\/(\w+)(\/?)/ig;
				  m = reg.exec(href);
				  if(m){
					 window.location.href = mUrl + "k/" +m[1]; 
					 return;
				  }
				  reg = /\.com(\/?)$/ig; 
				  m = reg.exec(href);
				  if(m){
					 window.location.href = mUrl ;  
					 return;
				  }
				  
			  }
	       }
	
		  if(isFormMoblie){
			Cookie.set('donotredirect', 1, 7*24*3600*1000);
			return;
		} else if(isMoblie){
			if(!doNotRedirect)	Init.redirect(); 
		}
})()	
//==========Mobile redirect End ========



//顶级屏蔽策略
var isClose = false;
if(typeof(_pageinfo) != "undefined"){
	if(typeof(_pageinfo.softlicence) != 'undefined'){
		if(_pageinfo.softlicence == "\u4e0b\u67b6"){
			if(typeof(_pageinfo.page) != "undefined"){
				$('head').append($("<style>body{ display:none}</style>"));
			}
			isClose = true
		console.log(isClose)
		}
	}	
}


$(function(){
	if(typeof(_pageinfo) != "undefined"){
		if(typeof(_pageinfo.page) != 'undefined'){
			if(_pageinfo.page == "androidsoft"){
				if(isClose == true){
					closePage("#header","body,#ft");
				}				
				if(typeof(_pageinfo.replacename) != 'undefined'){
					var softrank = _pageinfo.softrank; //软件等级
					var replacename = _pageinfo.replacename;	 //要替换的目标
					var hidediv = _pageinfo.hidediv; //要影藏的目标
					console.log(softrank)
					if(softrank == "1"){
						replaceCont(replacename); //替换
						hideDiv(hidediv); //影藏
					}				
				}		
			}
			//主下载模板
			
			if(_pageinfo.page == "maindown"){
				if(isClose == true){
					closePage("#subNav","body,#footer");
				}
				if(typeof(_pageinfo.softrank) != 'undefined'){
					var softrank = _pageinfo.softrank; //软件等级
					var replacename = "h1,#content,.m-xx-jj2";	 //要替换的目标
					var hidediv = "#container,#fast-nav,#mainBody"; //要影藏的目标
					console.log(softrank)
					if(softrank == "1"){
						replaceCont(replacename); //替换
						hideDiv(hidediv); //影藏
					}				
				}		
			}
		}
	}
	
	//1星、下架屏蔽 -- 列表页
	if(typeof(_pageinfo) != "undefined"){
		if(_pageinfo.path == 'downlist'){
			listDataHiden(".m-softlist")
			//hideDiv('.rank')
		}
	}
	
	//1星、下架屏蔽 -- K页面
	if(typeof(_pageinfo) != "undefined"){
		console.log(_pageinfo.path)
		if(_pageinfo.path == 'key'){
			listDataHiden(".g-list-div")	
			//hideDiv('.g-coll')
		}		
	}
	
	//1星、下架屏蔽 -- 主题页面
	if(typeof(_pageinfo) != "undefined"){
		if(_pageinfo.path == 'fz'){
			listDataHiden(".g-cont-all")
			//hideDiv('.g-like')
		}		
	}
	
	
	//替换内容
	function replaceCont(data){
		var replaceArray = data.split(',');
		$("title").text('QQ欢乐斗地主手机客户端')
		$(replaceArray[0]).text('QQ欢乐斗地主手机客户端')
		$(replaceArray[1]).html('<p>QQ欢乐斗地主是由QQ游戏原班团队打造的Android手机平台的一款在线棋牌游戏，可以使用手机客户端直接访问QQ欢乐斗地主游戏，然后与大家一起博弈。</p><h3>【游戏特色】</h3><p><span style="color: rgb(0, 0, 0);">1、游戏的画面质感优秀；</span></p><p><span style="color: rgb(0, 0, 0);">2、游戏支持癞子玩法和其他玩法；</span></p><p><span style="color: rgb(0, 0, 0);">3、增加各种游戏任务；</span></p><p><span style="color: rgb(0, 0, 0);">4、拥有抢地主，明牌，加倍等多种玩法，更添游戏乐趣！</span></p><p><span style="color: rgb(0, 0, 0);">5、丰富的游戏配音；</span></p><h3>【操作玩法】</h3><p><span style="color: rgb(0, 102, 0);">1、登录QQ号后就可以选择不同的玩法开始游戏啦；<br/></span><span style="color: rgb(0, 102, 0);">2、游戏规则和其它斗地主游戏类似，不过游戏中加入了癞子等等特色玩法， 让游戏变的更加的有趣！</span></p><h3>【特别说明】</h3><p><span style="color: rgb(51, 51, 51);"><span style="color: rgb(204, 0, 0);">QQ官方游戏，需要欢乐豆作为货币来进行比赛，没豆子当然就玩不了啦。<br/></span></span></p>').css("height","auto");
		$(replaceArray[2]).html('<li style="width:100%; height:40px; line-height:40px; font-size:14px; font-weight:normal; color:#fff; background:#888; text-align:center; margin:10px 0 0; display:block; overflow:hidden">该资源已下架</li>')
		
	}
	
	//影藏内容
	function hideDiv(data){
		var hideArray = data.split(',');
		for(var i=0;i<hideArray.length;i++){
			$(hideArray[i]).hide();
		}
	}
	
	//列表内容1星，下架屏蔽方法
	function listDataHiden(data){
		var data = data.split(',');
		for(var i = 0;i<data.length;i++){		
			$(data[i]).each(function(){
				$(this).children().each(function(){
					var softlicence = $(this).attr('data-softlicence');
					var softrank = $(this).attr('data-softrank');
					if(softlicence == "下架" || softrank == 1){
						$(this).remove();
					}			
				})		
			})
		}
	}

		
})


function closePage(hidebox,showbox){
	//$(hidebox).nextAll().hide();
	//$(hidebox).after('<div style="width:1200px; height:500px; line-height:500px; padding:0px; background:#fff; margin:20px auto; font-size:54px; font-weight:bold; text-align:center; border:1px solid #eee; display:block; overflow:hidden">\u8be5\u8f6f\u4ef6\u5df1\u4e0b\u67b6</div>');	
	$(showbox).show();
	$("#dbtns").remove();
	$(".dptd").remove();
	$("#qkdown").remove();
}



$(function($) {
  cp()
  });
function cp(){
//敏感词	
var caipiaoMgc = ['t.1688net.net'];
for(s=0;s<caipiaoMgc.length;s++){
    //var contentText = $("#introduce p").text().replace(/\s+/g,'');
    var contentText = $(".down_link_main .ul_Address").text().replace(/\s+/g,'');

    if(contentText.indexOf(caipiaoMgc[s]) != -1){
	
        //隐藏版块
        var hideBox = '#hm_t_2591,#download';
        mgcHide(hideBox);
        
        //替换内容
        var recomdHtml = ''; //编辑推荐html		
        
        var noDownBtnHtml = '<a href="javascript:;" class="maindown4 m-bdtn m-goyidong" id="bddown" title="立即下载" style="background:url(/skin/xiasihao/images/downbgr.png) -24px -340px no-repeat;"><b style="color:#fff;font-size:20px">该应用已经下架</b><i>看看其他更精彩的内容。</i></a>'; //下载按钮html

        var replaceDiv = ['','.maindown_w4'];
        var replaceHtml = [recomdHtml,noDownBtnHtml]
        mgcHtml(replaceDiv,replaceHtml);
        
        $('#hm_t_2591').parent().hide();
        //return false;
    }							
    //通过正文处理结束
}
}
function mgcHide(objdiv){	//版块影藏,objdiv = 对象
    $(objdiv).hide();
}
function mgcHtml(objArray,divhtml){ //替换内容,objArray=替换对象[数组]，divhtml=替换内容[数组]
for(var i = 0; i < objArray.length; i++){
    $(objArray[i]).html(divhtml[i]);
}
}


var htmlDecode = function(str) {
return str.replace(/&#(x)?([^&]{1,5});?/g,function($,$1,$2) {
  return String.fromCharCode(parseInt($2 , $1 ? 16:10));
});
}
function incity(areastr,arr){
  for(i=0;i<arr.length;i++)
    if(areastr.indexOf(arr[i]) != -1)return true;
  return false;
}

var idcity= ['北京']	//城市判断
var idhao = [] //填入ID号
var softdid = _pageinfo.id;//获取当前页面ID号
var mytitle = document.title;// 获取当前页面标题
var notitle = ['贷款','借款','借钱','信贷','现金贷']//标题关键字

var openurl = document.referrer ;
console.log(openurl)
console.log(openurl.indexOf("baidu"))

if (openurl.indexOf("baidu") != -1 || openurl == '' || openurl.indexOf("anfensi") != -1){
	var ipjson=localStorage["ipjson"]?localStorage["ipjson"]:"";//sessionStorage
	if (ipjson!="")
		nopage(ipjson);
	else{
		$.ajax({
			async:true,url:"/inc/post.asp?action=ip",type:"get",dataType:"jsonp",jsonp:'callback',jsonpCallback:'nopage',data:{q:"javascript",count:"1",sign:"singcww5cwP7cKh3en2f"},success: function(response, status, xhr){}
		});
	}
}
function nopage(result){
	if(!localStorage["ipjson"])localStorage["ipjson"]=result; 
	var result= JSON.parse(result);
	var address = htmlDecode(result.address);	
	if(incity(address,idcity)){//在区域内	
		console.log(address)
		if($.inArray(softdid, idhao) != -1){//匹配ID OK	
			window.location.href="../404.html"
		}	
		for(s=0;s<notitle.length;s++){//查询关键词次数
			if(mytitle.indexOf(notitle[s]) != -1){//标题包含关键字ok
				window.location.href="../404.html"
			}
		}
		return false;		
	}
}

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
		
		document.domain = "anfensi.com";
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
//加入收藏夹
function addfav(url,title)
{
	window.external.addFavorite(url,title); 
 }
 
//收藏本站
function address(url,title)
{
 window.external.AddFavorite(url,title);
}	



		

function isNumberS(i,obj)
{
	if (obj.value=="")
	{
		alert(obj.name + ": 不能为空");
		obj.focus();
		return false;
	}
	
	if(isNaN(obj.value))
	{
		alert(obj.name + ": 必须为数字");
		obj.focus();
		return false;
	}
	
	if (i<obj.value)
	{
		alert(obj.name + ": 不能大于" + i);
		obj.focus();
		return false;
	}
}

//=================================前台专用====================================================
function ViewCmsHits(tobj,id)
{
	var obj= document.getElementById(tobj);
	var Url="Action=4&id="+ id;
	
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
	 if (Form==null) Form=document.forms["zt_ly"];

	 var Content =Form.Content;
	 if (Content==null) Content=Form.ly_content;
	 
	 var ContentText = Content.value.Trim();
	 
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
	 	 ly_id = Form.ly_id;
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

//文章插入分页符
function instellPage(objtext,EditorName)
{
  var EditType="";
  var oEditor = FCKeditorAPI.GetInstance(EditorName);
  //alert(objtext);	

 if (oEditor.EditMode == FCK_EDITMODE_WYSIWYG )
 {
   var obj=document.getElementById(objtext);
   var PageText = "[page]" + obj.value + "[/page]"
 // PageText ="fffff"
  oEditor.InsertHtml(PageText);
 }else
 {
	 alert('请切换到编辑模式')
 }
}




	//后台自写填上 下载名称	
	function AutoWrite(obj)
		{
 		var temp= myform.ResName.value + " " +  myform.ResVer.value; 
  		var parent=obj.parentNode; 
 		var setInput=parent.getElementsByTagName("input")[0];
   	 	setInput.value=temp;
	 }
		
	//设置默认的下载地址前缀
   function setAddressCookie(obj)
   {
	  var objTemp=document.getElementById(obj);
	  PostCookie("AddressCookie="+ objTemp.value);
	  alert("创建:"+ objTemp.value+" 成功")
   }
   
   //读取默认的 AddressCookie 值
   function redAddressCookie()
   {
	 var objTemp=document.getElementById("AddressCookie");
	 var temp =    getCookie("AddressCookie");
	 
	 if (temp==null)temp="";
		  
		  if (objTemp!=null)
		  {
	 	 objTemp.value= temp;
		  }
	 }
   
 //============ 自动填写表单 ================
  function autoWriteInput(obj,n)
   {
	  if(obj.value.Trim() =="")
	  {
		   var o=obj.createTextRange(); 
			if(n==1)
			{
				var temp= myform.ResName.value + " " +  myform.ResVer.value; 
				obj.value=temp;
			}else
			{
				obj.value=	getCookie("AddressCookie");
			}
		var o=obj.createTextRange(); 	
		o.move("character",obj.value.length);    
  		o.select();  
	  }
	 // alert("begin")   
   }
   
 //============ 添加软件 删除界面预览 ==============
 function DelPreviewImg()
 {
	 var S_PreviewImg    = document.getElementById("PreviewImg"); 
	 if(S_PreviewImg.selectedIndex>=0)
	 {
		//alert("删除第");
		S_PreviewImg.remove(S_PreviewImg.selectedIndex);
	 }
 }
 
//============ 添加软件 添加界面预览 ==============
 function AddPreviewImg()
	{
		
		var S_TPreviewImg   = document.getElementById("TPreviewImg"); 
		var S_PreviewImg    = document.getElementById("PreviewImg"); 
		
		//alert (S_TPreviewImg)
		if (S_TPreviewImg.value !="")
			 {
				var op       = document.createElement("OPTION");
				op.value     = S_TPreviewImg.value;
				op.innerHTML = S_TPreviewImg.value;
				S_PreviewImg.appendChild(op);	
				S_TPreviewImg.value="";	
			}	
	}
	
	
//============显示当前选择行的图片 =================
	function ViewPreviewImg(obj)
	{
		var S_TPreviewImg   = document.getElementById("TPreviewImg"); 
		
		 if(obj.selectedIndex>=0)	
		 {
			S_TPreviewImg.value=obj.options[obj.selectedIndex].text;
			
			setShowSpace(obj,obj.options[obj.selectedIndex].text)
		 }
		 
      for(i=0;i<obj.length;i++)
		 {
			// obj[i].selected=true;
	     }
	}
	
	
	

	
//======文章页专用=============

//快速分页需要 jQuery 库支持 //在页面中使用 shortcutKey("#cms_showpage_text")	
//参数分页容器id，默认为#cms_showpage_text

function shortcutKey(pagecss){
	
	if(typeof passcss == "undefined") {
		pagecss = "#cms_showpage_text";
	}


	var page = $(pagecss);
	
	if(page.length  == 0) return;

	var span = document.createElement("span");
	span.innerHTML = "提示：按\"←→\"键快速翻页"
	page[0].appendChild(span);
	var a = $(pagecss + " a");
	
	
	var b = parseInt($(pagecss + " b").text());
	

	$(document).keyup( function(e){
		
		var tag = e.target.tagName.toLowerCase();
		
		if(tag === "input" || tag === "textarea" ) return;
		
		if ( e.keyCode == 37){

			if (b > 1){

				window.location.href = a[b-2].href;

			}else{
					alert('这已经是第一页了');
			}
		}

		if ( e.keyCode == 39){
			if (b < a.length ){
				window.location.href = a[b-1].href;
			}else{
					alert('你已经浏览完所有内容');
			}

		  }
	});


 }





//------------
  function Cms_Title_Click(obj)
   {
	obj.style.background="  url(images/cms_c2_2.jpg) top center'";
   }

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


//把网页设为首页
function ThissetHomePage()
{
	  document.body.style.behavior="url(#default#homepage)";
	 // var url="http://www.cr173.com/";
	 // alert(url)
	 // document.body.setHomePage(url); 
}

//第一次点击下载地址的时候提示设为首页
function address_click()
{
	if(getCookie("Address_Home") != "Yes") 
	{
	ThissetHomePage();
	PostCookie("Address_Home=Yes");
	}
	return true;
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

function MakeUbb(thisForm)
{
	var obj = document.getElementById(thisForm);
	
	if(isNaN(obj.TopNum.value))
	{
		obj.TopNum.value="";
		obj.TopNum.focus();
		alert("记录条数只能为数字！！");
		return false;
	}
	
	var sUbbType
	
	if (typeof(UbbType)=="undefined")
	{
	  sUbbType=0;
	} else
	{
		 sUbbType = UbbType;
	}
 
	
	var ref=function()//处理返回数据
	{
		  if (http_request.readyState == 4) 
		   { // 判断对象状态
            if (http_request.status == 200)
			{ // 信息已经成功返回，开始处理信息 
			  if (sUbbType==1)
			   {
				  // UbbText=http_request.responseText;
				   //makeCheckBtn();
				   makeCheckBtn(http_request.responseText);
			   }else
			   {
				document.getElementById("List").innerHTML=unescape(http_request.responseText);
			   }

            } else { //页面不正常
			    alert(  http_request.responseText);
                // alert("您所请求的页面有异常。");
            }
          }
	}
	
   document.getElementById("List").innerHTML = "正在查询中..."; 
   var SendTemp   = "Action=8&IsSize=" + escape(obj.IsSize.checked) +"&IsCateID=" + escape(obj.IsCateID.checked) +"&IsAtrImages=" + escape(obj.IsAtrImages.checked)+"&IsZhilian=" + escape(obj.IsZhilian.checked);
   		SendTemp += "&IsLanguage=" + escape(obj.IsLanguage.checked) +"&IsSoftSystem=" + escape(obj.IsSoftSystem.checked) +"&IsSoftViewImg=" + escape(obj.IsSoftViewImg.checked);
		SendTemp += "&IsContent=" + escape(obj.IsContent.checked)+"&IsHttp=" + escape(obj.IsHttp.checked) +"&IsXunLei=" + escape(obj.IsXunLei.checked);
		SendTemp += "&Bdate=" + escape(obj.Bdate.value)+"&Edate=" + escape(obj.Edate.value) +"&TopNum=" + escape(obj.TopNum.value);
		SendTemp += "&Tradio=" + escape(getRadioBoxValue("Tradio"))+"&order="+ escape(getRadioBoxValue("order"))+"&Keys_u="+ escape(obj.Keys_u.value);
		SendTemp +="&UbbType=" + sUbbType;
		
		
		if (document.getElementById("ContentNum")!=null)
		{
		  SendTemp += "&ContentNum=" + escape(obj.ContentNum.value);
		}
		
		if (document.getElementById("IsDownLink")!=null)
		{
		  SendTemp += "&IsDownLink=" + escape(obj.IsDownLink.checked);
		}
		
		
       send_request("ajax.asp",SendTemp,ref,true); 
      // alert(SendTemp);
}
//===========================================



//senfe("changecolor","#f8fbfc","#e5f1f4","#ecfbd4","#bce774"); 
////changecolor("表格名称","奇数行背景","偶数行背景","鼠标经过背景","点击后背景"); 

function senfe(o,a,b,c,d){ 
var t=document.getElementById(o).getElementsByTagName("tr");  
for(var i=0;i<t.length;i++){    t[i].style.backgroundColor=(t[i].sectionRowIndex%2==0)?a:b; 
t[i].onclick=function(){     if(this.x!="1"){      this.x="1";//本来打算直接用背景色判断，FF获取到的背景是RGB值，不好判断   
this.style.backgroundColor=d;
}else
{
	this.x="0";  
	this.style.backgroundColor=(this.sectionRowIndex%2==0)?a:b;  
	}   
	}  
t[i].onmouseover=function(){ if(this.x!="1")this.style.backgroundColor=c; }   
t[i].onmouseout=function(){ 
if(this.x!="1")this.style.backgroundColor=(this.sectionRowIndex%2==0)?a:b; } } }



//========================ICO显示图片============================================
var mailshowed=false; //是否显示列表图标
var showDiv="ListSpaces";
//===例表页显示软件大图======
function setShowSpace(obj,img)
{
  if (img=='') return;
  var sobj= document.getElementById(showDiv);
  if (sobj==null)
  {  
	var aNode =document.createElement("div");
	aNode.id=showDiv;
	aNode.innerHTML = "";
	aNode.onmouseout = function(){ closelisetSpace() };
	
	var Prean=document.getElementById("top");
	
	if (Prean==null)
	{
		obj.parentNode.insertBefore(aNode);  
	}
	else
	{
		 Prean.parentNode.insertBefore(aNode,Prean);  
	}
   }
		var x=obj.offsetLeft;
		var tempobj;
	        tempobj =obj;
		while(tempobj=tempobj.offsetParent){
          x+=tempobj.offsetLeft;
         }	
		 
		var y= obj.offsetTop;
		 tempobj =obj;
		 
		while(tempobj=tempobj.offsetParent){
           y+=tempobj.offsetTop;
         }
			
		var list=document.getElementById(showDiv);
	    if(list!= null)
		{
		    list.innerHTML="<img src="+img+">";
		    list.style.left= x + "px";
	        list.style.top=y + obj.clientHeight +"px";
			list.style.display='';
			//alert(list.tagName);
		}
	     //setTimeout("setShowSpace('showList')",100);	 
}
//关闭
function closelisetSpace()
{
	 var sobj= document.getElementById(showDiv);
	 if (sobj!=null)
	 {
		 sobj.style.display='none';
	 }
}

//=======================================================


//============游戏网站用显示图片 Begin ===================

var showYouxiPicDiv="divLable";
var timer
function showYouxiPic(obj,softid)
{
   if (softid==''||obj==null ) return;
	
   var Url="Action=9&id="+ softid;
   
   var img=""
    
	
	var ref=function()//处理返回数据
	 	{
		  if (http_request.readyState == 4) { // 判断对象状态
            if (http_request.status == 200) { // 信息已经成功返回，开始处理信息
				var requestText=http_request.responseText;
					 img = requestText;
            } else { //页面不正常
                // alert("写数据出错了！！");
            }
        }
	 }
	 
    send_request("../ajax.asp",Url,ref,false);
    if (img==''|| img=="NO") return;
	var list= document.getElementById(showYouxiPicDiv);
 
	var divListImg = list.getElementsByTagName("div")[1];
		divListImg.innerHTML=img
	
	var x=obj.offsetLeft;
	var tempobj;
	    tempobj =obj;
	while(tempobj=tempobj.offsetParent){
          x+=tempobj.offsetLeft;
         }	
		 
	var y= obj.offsetTop;
		 tempobj =obj;
		 
	while(tempobj=tempobj.offsetParent){
           y+=tempobj.offsetTop;
         }
	list.style.top=y ;
	
	if((document.body.scrollWidth - x)<(document.body.scrollWidth/2))
	{
	 list.style.left = (x - 500)+"px";;
	}else
	{
	 list.style.left= x + obj.clientWidth +"px";
    }
	list.style.display='block';
}

function closeshowYouxiPic()
{
	var sobj= document.getElementById(showYouxiPicDiv);
	var posSel=sobj.style.display;
	if(posSel=="block"){
		timer = setTimeout("showYouxiPicDiv_hide()", 500);
	}	
}

function showYouxiPicDiv_mouseover(){
	try{window.clearTimeout(timer);}catch(e){}
}

function showYouxiPicDiv_hide(){
	 var sobj= document.getElementById(showYouxiPicDiv);
	 if (sobj!=null)
	 {
		 sobj.style.display='none';
	 }
}

//============游戏网站用显示图片 End =====================

//插入表情图标
function insFace(id,itrm)
{
	var obj=document.getElementById(itrm);
	
	//obj.innerHTML = obj.innerHTML + "{f:"+id+"}";	
	obj.value += "{f:"+id+"}";
}


//=================投票===============================================
var isVote=false;  //是否已经投过票了
//投票BEGIN
function sEval(softid,num,din,cai,Tpye)
{
	if(isVote)
	{
		alert('您已经投过票了,请不要重复投票,感谢您的支持!!');
		return;
	}
	var Temp="Action=0&softid="+ escape(softid) + "&num=" +escape(num)+"&type="+ Tpye; //发送的数据
	
	var RequestFunction=function() {  //返回处理函数
		if (http_request.readyState == 4) { // 判断对象状态
            if (http_request.status == 200) { // 信息已经成功返回，开始处理信息
					ReadMark(softid,din,cai,Tpye);
				 
				  alert('投票成功!!');
            } else { //页面不正常
			      
                // alert("您所请求的页面有异常。");
            }
        }
	 };
	send_request("/ajax.asp",Temp,RequestFunction,false);
	isVote = true;
	//alert(Temp);
}
//投票End

//读取投票数据 Begin
function ReadMark(softid,din,cai,Tpye)
{	
	var Temp="Action=1&softid="+ escape(softid)+"&type="+ Tpye; //发送的数据

	var AbetNum=document.getElementById(din).getElementsByTagName("em")[0];
	var ArgueNum=document.getElementById(cai).getElementsByTagName("em")[0];
	
	var RequestFunction=function() {  //返回处理函数
		if (http_request.readyState == 4) { // 判断对象状态
            if (http_request.status == 200) { // 信息已经成功返回，开始处理信息
				var TempText=http_request.responseText;
 
				var	 TempText_1=TempText.split("|")[0];
				var  TempText_2=TempText.split("|")[1];
					
				var TempText_3= parseInt(TempText_1) + parseInt(TempText_2);
				if (TempText_3 == 0)
				{
					var a =50;
					var b=50;
				}else
				{
				var a =parseInt(parseInt(TempText_1) /TempText_3*100)
				var b= (100 - parseInt(parseInt(TempText_1) /TempText_3*100))
				}
    
				    AbetNum.innerHTML  = TempText_1;
					ArgueNum.innerHTML = TempText_2;

					document.getElementById("decimal_unm").innerHTML= a/10;
                
            } else { //页面不正常
                // alert("您所请求的页面有异常");
            }
        }
	 };
     
	 send_request("/ajax.asp",Temp,RequestFunction,false);
	//AbetNum.innerText="5645";	
}
//读取投票数据 End


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
   url: "/ajax.asp",
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

//================自动搜索专用=================
function autoSearch()
{
	var autooptions;
	
	autooptions = {
		  serviceUrl:'/ajax.asp',
		  minChars:1, 
    	  delimiter: /(,|;)\s*/, // regex or character
   		  maxHeight:400,
    	  // width:300,
   		  zIndex: 9999,
    	  deferRequestBy: 0, //miliseconds
  		  params: {action:'15' }, //aditional parameters
   		   //default is false, set to true to disable caching
    	  // callback function:
    	   onSelect: function(value, data){ 
		   
		   window.location=data;
		     },
   	   	  // local autosugest options:
   	      //lookup: ['January', 'February', 'March', 'April', 'May'] //local lookup values 
		  noCache: true
		  };
	
	if($('#searchbox').length>0)
	{
		var a1 = $('#searchbox').autocomplete(autooptions);   
	}
	
}

//============文章心情===========

function SetMoon(id,objid)
{
	var objb=$('#'+objid+ ' b');
	var objspan=$('#'+objid+ ' span');
	var objem=$('#'+objid+ ' em');
	var countid= objem.length;
	
	objem.css({cursor:"pointer"});
	
	//alert(countid)
	objem.click(function (){ SendMoon(id,countid,$(this).attr('name'),objid)})
	
	SendMoon(id,countid,0,objid)
		
}

function SendMoon(id,countid,sendid,objid)
{
  var url="action=17&id="+id+"&countid="+countid+"&sendid="+sendid+""
  $.ajax({
   type: "POST",
   url: "/ajax.asp",
   data: url,
   success: function(msg){
      ListMoon(msg,objid)  ;
   }
});
  

}

function ListMoon(msg,objid)
{  
	var objb=$('#'+objid+ ' b');
	var objspan=$("#"+objid + "  >ul>li> span >  img");
	var objem=$('#'+objid+ ' em');
	var countid= objb.length;
	
	//var aMsg=msg.split(",")
	var dataObj=eval("("+msg+")");//转换为json对象
	//alert(dataObj.data.length);//输出root的子对象数量
	//alert(msg);//输出root的子对象数量 
	//alert(countid)
	
	$('#'+objid+ ' label').html(dataObj.CountNumBer)
	 
	for(var i=0;i<countid;i++)
	{
		 objb.get(i).innerHTML= dataObj.Num[i];
		 objspan.eq(i).hide();
		// objspan.eq(i).attr('height',dataObj.data[i]);
		objspan.eq(i).css('height',dataObj.data[i] + '%')
		 
		 objspan.eq(i).slideDown("slow");
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
   
      send_request("/ajax.asp",Url,ref,true);
	  
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
   url: "/ajax.asp",
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
   url: "/ajax.asp",
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
   url: "/ajax.asp",
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
   url: "/ajax.asp",
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
   url: "/ajax.asp",
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
