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

var path_=document.location.pathname;
path_.indexOf("index.html")==0 && ($("#header dd p a").removeClass("cur"), $("#header dd p a:eq(6)").addClass("cur"));