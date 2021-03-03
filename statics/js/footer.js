$(function () {
//www.anfensi.com
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "http://hm.baidu.com/hm.js?f990bdcaa6db2f0f3e26c4cb5461cf07";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();
/*2016-07-13 add*/
    if ( typeof _webInfo != "undefined")
    {
        //add tongji for everyBJ
        var bjname=_webInfo.Username;
        var hm = document.createElement("script");
        if(bjname!=''){
            
            switch (bjname){
                case 'downcc':
					var curtime=_webInfo.DateTime;
					var date1 = new Date("2015/11/31");
					var date2 = new Date(curtime);
					if(date1.getTime() < date2.getTime()){
						hm.src="https://hm.baidu.com/hm.js?";
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
            if(hm.src!=''){
                var s = document.getElementsByTagName("script")[0];
                s.parentNode.insertBefore(hm, s);
            }
        }
    }
});



$(function(){
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
	var openUrl = "";	
	$(".bdcs-search-form-input").keyup(function(){
		 if(event.keyCode == 13){
			event.preventDefault();
			keywordCont();
		 }
	})
	$('.bdcs-search-form-input').bind({ 
       focus:function(){ 
         if (this.value == this.defaultValue){ 
           this.value=""; 
         } 
       }, 
       blur:function(){ 
         if (this.value == ""){ 
            this.value = this.defaultValue; 
         } 
       }  
    }); 
	$(".bdcs-search-form-submit").click(function(){
		event.preventDefault();
		keywordCont()
	})	
	
	function keywordCont(){
		var falseWords = ["_","+","破解","注册机"];
		var keyFont = $(".bdcs-search-form-input").val();
		if(keyFont != ""){
			for(i=0;i<falseWords.length;i++){
				if(keyFont.indexOf(falseWords[i]) != -1){
					alert("不允许有非法字符");
					return false;
				}	
			}	
				openUrl = "http://s.anfensi.com/search/pc/"+keyFont+"_all_hits.html";		
			window.location.href = openUrl;	
		}else{
			window.location.href="http://s.anfensi.com/";
		}
	}
});
function addsou(){
	var arr = ["映客直播","爱奇艺","阴阳师","倩女幽魂","影音先锋","王者荣耀","陌陌","猎魂觉醒","我叫mt","大天使之剑","恋与制作人","极品芝麻官","我的世界","火影战记","决战平安京","天使纪元","拳皇","口袋妖怪","火柴人联盟","三国志","时空猎人","大话西游","梦幻西游"]; 
		var index = Math.floor((Math.random()*arr.length)); 
	$(".bdcs-search-form-input").attr("value",arr[index])

}


window._bd_share_config={"common":{"bdSnsKey":{},"bdText":"","bdMini":"2","bdMiniList":false,"bdPic":"","bdStyle":"0","bdSize":"24"},"share":{}};with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='../../statics/api/js/share6e53.js?v=89860593.js?cdnversion='+~(-new Date()/36e5)];