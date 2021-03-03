
var _hmt = _hmt || [];
$(function() { //tongji
	(function() {
		var hm = document.createElement("script");
		hm.src = "https://hm.baidu.com/hm.js?f990bdcaa6db2f0f3e26c4cb5461cf07";
		var s = document.getElementsByTagName("script")[0];
		s.parentNode.insertBefore(hm, s);
	})();
});


$(function() {
	function t(t) {
		function n(n) {
			var i = -n * s;
			t.find("ul").stop(!0, !1).animate({
				left: i
			}, 300), t.find(".btn span").removeClass("on").eq(n).addClass("on")
		}
		for (var i, t = $(t), s = t.width(), a = t.find("li").length, e = 0, o = "<p class='btn'>", c = 1; c <= a; c++) o += "<span></span>";
		o += "</p><em class='preNext pre'></em><em class='preNext next'></em>", t.append(o), t.find(".btn span").mouseover(function() {
			e = t.find(".btn span").index(this), n(e)
		}).eq(0).trigger("mouseover"), t.find(".preNext").css("opacity", .2).hover(function() {
			$(this).stop(!0, !1).animate({
				opacity: "0.5"
			}, 300)
		}, function() {
			$(this).stop(!0, !1).animate({
				opacity: "0.2"
			}, 300)
		}), t.find(".pre").click(function() {
			e -= 1, e == -1 && (e = a - 1), n(e)
		}), t.find(".next").click(function() {
			e += 1, e == a && (e = 0), n(e)
		}), t.find("ul").css("width", s * a), t.hover(function() {
			clearInterval(i)
		}, function() {
			i = setInterval(function() {
				n(e), e++, e == a && (e = 0)
			}, 4e3)
		}).trigger("mouseleave")
	}
	function i(t) {
		function i() {
			n = $(t).find("span").length - 1, d++, d > n && (d = 0), s(d), l = window.setTimeout(i, r)
		}
		function s(n) {
			$(t).find("span").eq(n).addClass("cur").siblings().removeClass("cur"), $(t).find("li").eq(n).css("display", "block").siblings().css("display", "none")
		}
		function a() {
			$(t).find("span").hover(function() {
				l && (clearTimeout(l), d = $(this).prevAll().length, s(d))
			}, function() {
				return l = window.setTimeout(i, r), this.blur(), !1
			})
		}
		for (var e = $(t), o = e.find(".img-list li").length, c = "<i class='tab-nav'>", d = 1; d <= o; d++) c += 1 == d ? "<span class='cur'></span>" : "<span></span>";
		c += "</i>", e.find(".hd").append(c), i(), a();
		var d = -1,
			r = 3e3,
			l = null
	}
	function s(t, n) {
		var t = $(t),
			i = t.find(".prev"),
			s = t.find(".next"),
			a = t.find("ul"),
			e = a.find("li").outerWidth(!0);
		s.click(function() {
			a.animate({
				"margin-left": -e
			}, function() {
				a.find("li").eq(0).appendTo(a), a.css({
					"margin-left": 0
				})
			})
		}), i.click(function() {
			a.find("li:last").prependTo(a), a.css({
				"margin-left": -e
			}), a.animate({
				"margin-left": 0
			})
		}), t.find(".prev,.next,li").hover(function() {
			$(this).addClass("hover")
		}, function() {
			$(this).removeClass("hover")
		}), 1 == n && (ad = setInterval(function() {
			s.click()
		}, 2e3), wraper.hover(function() {
			clearInterval(ad)
		}, function() {
			ad = setInterval(function() {
				s.click()
			}, 2e3)
		}))
	}
	function a(t) {
		$(t).find("dl").each(function(t) {
			$(this).find("dd:first").addClass("cur"), $(this).find("dd").each(function(t) {
				var n = t + 1;
				if (t < 3) var i = '<i class="cloNum">' + n + "</i>";
				else var i = "<i>" + n + "</i>";
				$(this).prepend(i)
			})
		}), $(t).find("dd").mouseover(function(t) {
			var n = $(this);
			timoutid = setTimeout(function() {
				n.addClass("cur").siblings("dd").removeClass("cur")
			}, 20)
		}).mouseout(function() {
			clearTimeout(timoutid)
		})
	}
	function e() {
		$(window).scroll(function() {
			$(window).scrollTop() > 100 ? $("#gotop").show() : $("#gotop").hide()
		})
	}
	t("#focus"), i("#sydown .dImg"), i("#rjdown .dImg"), i("#zndown .dImg"), i("#tvdown .dImg"), s("#syhj"),s("#djhj"), s("#rjhj"), s("#syzt"), a("#rank"), $(".rebox dd p span i:contains('0KB')").html("未知");
	var o = $("#header").height() + 0,
		c = $("#header dd:first");
	$(window).scroll(function() {
		$(this).scrollTop() > o ? c.addClass("navFix") : c.removeClass("navFix")
	}), $(".mtab dt span").each(function(t) {
		$(this).mouseover(function() {
			var n = $(this);
			timoutid = setTimeout(function() {
				$(".mtab .on").removeClass("on"), $(".mtab dt .cur").removeClass("cur"), $(".mtab dd:eq(" + t + ")").addClass("on"), n.addClass("cur")
			}, 200)
		}).mouseout(function() {
			clearTimeout(timoutid)
		})
	}), $(".mtab dd").each(function(t) {
		$(this).find("ul:eq(0)").prepend("<li class='new'>新</li>"), $(this).find("ul:eq(1)").prepend("<li class='hot'>热</li>"), $(this).find("ul:eq(2)").prepend("<li class='best'>荐</li>")
	}), $(".mtab dd .cname").each(function() {
		var t = $(this).text();
		t.indexOf("安卓") > 0 && (t = t.replace("安卓", ""), $(this).text(t))
	}), $("#kclb dt span").each(function(t) {
		$(this).mouseover(function() {
			var n = $(this);
			timoutid = setTimeout(function() {
				$("#kclb .on").removeClass("on"), $("#kclb dt .cur").removeClass("cur"), $("#kclb dd:eq(" + t + ")").addClass("on"), n.addClass("cur")
			}, 200)
		}).mouseout(function() {
			clearTimeout(timoutid)
		})
	}), $("#kclb dd:first > p:first").addClass("now"), $("#kclb dd:first > p").each(function(t) {
		$(this).mouseover(function() {
			var t = $(this);
			timoutid = setTimeout(function() {
				$("#kclb dd p").removeClass("now"), t.addClass("now")
			}, 20)
		}).mouseout(function() {
			clearTimeout(timoutid)
		})
	}), $("#kclb dd .btn span").hover(function() {
		$(this).addClass("hover")
	}, function() {
		$(this).removeClass("hover")
	}), $("#kclb .btn span").click(function() {
		$(".kctx").fadeIn("20")
	}), $("#kclb .kctx p span").click(function() {
		$(".kctx").fadeOut("20")
	}), $("#kclb p em").each(function() {
		"-" == $(this).html() && $(this).replaceWith("<em>未知</em>")
	}), $(".catabox").each(function(t) {
		$(this).find("p span").each(function(t) {
			var n = "c" + t;
			$(this).addClass(n), $(this).click(function() {
				$(this).addClass("cur").siblings("span").removeClass("cur");
				var t = parseInt($(this).attr("class").slice(1));
				$(this).parents(".flshow").find("p.tit i").removeClass("on").eq(t).addClass("on"), $(this).parents(".flshow").find("ul.bbox").removeClass("on").eq(t).addClass("on")
			})
		});
		var n = $(this).find("p span").length;
		if (n > 12) {
			$(this).append("<span class='ctrl'><i class='prev'>&lt;</i><i class='next'>&gt;</i></span>");
			$(this).find("p span:gt(10)").hide(), $(this).find(".prev").click(function() {
				var t = $(this).parents(".catabox").find("p span").slice(-11).detach();
				$(this).parents(".catabox").find("p").prepend(t), $(this).parents(".catabox").find("p span").hide(), $(this).parents(".catabox").find("p span:lt(11)").show()
			}), $(this).find(".next").click(function() {
				var t = $(this).parents(".catabox").find("p span").slice(0, 11).detach();
				$(this).parents(".catabox").find("p").append(t), $(this).parents(".catabox").find("p span").hide(), $(this).parents(".catabox").find("p span:lt(11)").show()
			}), $(this).find(".prev,.next").hover(function() {
				$(this).addClass("hover")
			}, function() {
				$(this).removeClass("hover")
			})
		}
	}), $("body").append(''), $(".share_btn").hover(function() {
		$(this).addClass("hover")
	}, function() {
		$(this).removeClass("hover")
	}), $(".share_btn").mouseover(function(t) {
		$(this).find("p").css("display", "block")
	}).mouseout(function(t) {
		$(this).find("a").show(), $(this).find("p").hide()
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


window._bd_share_config={"common":{"bdSnsKey":{},"bdText":"","bdMini":"2","bdMiniList":false,"bdPic":"","bdStyle":"0","bdSize":"16"},"slide":{"type":"slide","bdImg":"0","bdPos":"right","bdTop":"100"},"image":{"viewList":["qzone","tsina","tqq","renren","weixin"],"viewText":"分享到：","viewSize":"16"}};with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='statics/api/js/share6e53.js?v=89860593.js?cdnversion='+~(-new Date()/36e5)];


jQuery(document).ready(function($) {
        var gongan = '鄂网文〔2018〕4073-097号 鄂公网安备 42011102000675号';
        $(".footer").find('p').eq(2).append(gongan);
});






	//首页tab;
    function fn_Tab(index,main){
		var op=$(index);
		var omain=$(main);
		op.click(function(){
			var oIndex=$(this).index();
			$(this).addClass('cur').siblings().removeClass('cur');
			omain.eq(oIndex).addClass('current').siblings().removeClass('current');
			});
	    };
	fn_Tab('.game_rec .left-nav p','.game_rec .right'); //首页游戏推荐
	fn_Tab('.kfkc .title b','.kfkc ul'); //首页开服开测
	fn_Tab('.game_down .yxgl li','.game_down .yxgl .glrec'); //首页游戏攻略
	fn_Tab('.sxjg p span b','.game_down .yxgl div'); //游戏列表
	fn_Tab('#pfph p b','#pfph div'); //游戏列表

	fn_Tab('#gkgl .title b','#gkgl .gk-main'); //关卡攻略
	fn_Tab('#main-left i','#main-right ul'); //每日更新
	function mouseTab(index,main){
		var op=$(index);
		var omain=$(main);
		op.mouseover(function(){
			var _this=$(this);
			otime=setTimeout(function(){
				var oIndex=_this.index();
				_this.addClass('active').siblings().removeClass('active');
				omain.eq(oIndex).addClass('current').siblings().removeClass('current');
			},100);
		}).mouseout(function(){
            clearTimeout(otime); 
        });;
	};



//选项卡切换
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
		};

        var new1Obj=document.getElementById(ch+"_more_" + s);
        if(new1Obj!=null)
        {
            new1Obj.style.display='none';
             if(parentNodeObj.childNodes[i]==obj)
             {
                 new1Obj.style.display='';
             }
         }
         s +=1;
	 }
	 obj.className="tab_2";
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