
 $(function(){
	$('.j-nav-city').mouseover(function(event) {
		$(this).addClass("actives").parent().find('.j-nav-userdiv').slideDown(50);
	});
	$('.j-nav-userdiv').mouseleave(function() {
		$(this).stop().slideUp(100);
		$(".j-nav-city").removeClass("actives");
	});
    $('body').on('click',function(){
    	$('.j-nav-city').removeClass('actives');
    	$('.j-nav-userdiv').stop().slideUp(100);
    })

	//顾问展开显示
	$(".j-gwen-down,.c-colse-shou").hide();
	//-----展开
	$(".c-j-zhankai").click(function(){
		$(".all-guwen").css({height:'auto',overflow:'hidden'}).slideDown(500);
		$(this).hide();
		$(".c-colse-shou").css({'display':'inline-block'});
	})
	//-----收起
	$(".c-colse-shou").click(function(){
		$(".all-guwen").animate({height:"245px"});
		$(".c-colse-shou").hide();
		$(".c-j-zhankai").css({'display':'inline-block'});
	})
	//微信弹窗
	$('.moduleweixin').on('click', function() {
        $('#j-module1 .c-modalBox, #j-module1 .c-modalBg').show();
    });
    $('.dialog-close').on('click', function() {
        $('#j-module1 .c-modalBox, #j-module1 .c-modalBg,#j-cityform .c-modalBox, #j-cityform .c-modalBg').hide(10);
    });
    $('body').on('click', '.i-close,.modcancel,.c-modalBg', function() {
        $('.c-modalBox,.c-modalBg').hide();
    });
    
    //获取弹窗宽高
    $('.c-modalBox').each(function(index) {
        var Height = $(this).height();
        var eHeight = Height / 2;
        $('.c-modalBox').eq(index).css('margin-top', -eHeight);
    });
    // big底部浮动隐藏  显示
    $(".errorclose").click(function(){
    	$(".j-botm-flt").animate({left:"-2300px"},400);
    	$(".j-botm-flt,.j-smal-show").css({'width':'165px'});
		$(".j-smal-show").animate({'left':"0px"},500);
    })
    $(".j-smal-show").click(function(){
    	$(".j-botm-flt").animate({left:"0px"},500);
    	$(".j-botm-flt,.j-smal-show").css({'width':'100%'});
    	$(".j-smal-show").animate({left:"-2300px"},100);
    })
    //small 隐藏 显示、
    $(".web-colose").on("click",function(){
    	$(".web-fdong").slideUp(300);
    })
    //head float
    var nav = $('.navbar');
	   $(window).scroll(function() {
		if ($(document).scrollTop() > 80) {
			nav.addClass('scrolled');
			$("#navbar").css({'margin-bottom':'0px'});
			$(".topeade").addClass("tophead");
			//二级菜单根据滚动产生的变化
			$(".level2").removeClass("fixedtop");
			$(".c-hds").css({'margin-top':'15px'});
			$(".c-navbar").css({'padding-bottom':'6px','margin-top':'1px'});
			$(".topeade").css({'height':'auto'});
			

			//判断是否宽屏 
		    var winWide = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
		    var wideScreen = false;
		    if (winWide <= 500) {
		    	$(".topeade").css({'height':'60px'});
		    	$(".c-hdtels").css({'margin-top':'0px'});
		    }
		    if (winWide <= 1000 && winWide > 501) {//1000及以下分辨率
		        //$(".c-hdtels").css({'margin-top':'5px'});
		    }else if(winWide > 1001){
		    	$(".c-hdtels").css({'margin-top':'-12px'});
		    	$(".c-nav-ctname").css({'height':'auto'});
		    }else{
		    	// $(".c-hdtels").css({'margin-top':'-12px'});
		    	$(".c-hdtels").css({'margin-top':'1px'});
		    }
		    
		} else{
			$(".navbar-collapse").css({'top':'60px'});
			$(".topeade").css({'height':'auto'});
			$(".c-hds").css({'margin-top':'20px'});
			$(".c-navbar").css({'margin-top':'10px','padding-bottom':'0px',});
			$("#navbar").css({'margin-bottom':'20px'});
			$(".c-hdtels").css({'padding-top':'8px','margin-top':'0px'});
			nav.removeClass('scrolled');
			$(".topeade").removeClass("tophead");
			//二级菜单
			$(".level2").addClass("fixedtop");
		}
	});
	$(window).scroll();
   
    $('.navbar-toggle').click(function (event) {    
		//取消事件冒泡    
		event.stopPropagation();    
		//按钮的toggle,如果div是可见的,点击按钮切换为隐藏的;如果是隐藏的,切换为可见的。    
		$('.navbar-collapse').toggle();    
	 });    
	//点击空白处或者自身隐藏弹出层，下面分别为滑动和淡出效果。    
	$("body").click(function (event) { $('.navbar-collapse').slideUp(200) });    
	$('.navbar-collapse').click(function (event) { $(this).slideDown(200) }); 
    
    //back top
	$("#back-to-top").hide();
	$(window).scroll(function(){
		if ($(window).scrollTop()>=100){
			$("#back-to-top,#top_flt").slideDown(200);
			
		}
		else{
			$("#back-to-top").fadeOut(500);
		}
	});
	//当点击跳转链接后，回到页面顶部位置
	$("#back-to-top").click(function(){
		$('body,html').animate({scrollTop:0},100);
		return false;
	});
    // 右侧浮动
    $('.float-right li').hover(function(){
			$(this).find(".dv03").addClass('on').animate({ width : 220},50);
       		$(this).find(".dv01,.dv02,.dv04").addClass('on').animate({ width : 120},50);
       		$(this).find(".dv05").addClass('on').animate({ width : 110},50);
        }, function(){
        	$(this).find("div").removeClass('on').animate({ width : 50});
			$(this).removeClass('hover').animate({ width : 50});
    	});   
    //选中城市
	$('.j-nav-userdiv > ul > li > a').on('click', function(event) {
		var Text = $(this).text();
		$(this).parents('.c-down-city').find('.c-nav-city').text(Text);
		$(this).parents('.j-nav-userdiv').hide();
		event.stopPropagation();
	});
	//随机调用背景颜色	   循环
	$("a.rand-bag").each(function(i){  
		var let = new Array('8A9DBD','6091C2','7CAEDB','3C4254','6A7D9F','7C8295','97A5B1','6CA1D7');
		var random1 = Math.floor(Math.random()*8)+0;  //共有多少个颜色值 随机取出
		$(this).attr('style','background:#'+let[random1]+'');
		//最后一个元素不存在下一个  可删
		if($(this).next().length>0){
			last=$(this).next().position().left;
		}
	})
	//单个背景颜色
	 //var bgcol = new Array('8A9DBD','6091C2','7CAEDB','3C4254','6A7D9F','7C8295','97A5B1','6CA1D7');
	 //var random1 = Math.floor(Math.random()*7)+1;   //8个颜色循环 
	 // var bg='url(images/randpic/jtu_0'+random_bg+'.png)'; //当作背景图片显示
	 // alert(bgcol[random1]);
	 //$(".rand-bag").css("background-color",bgcol[random1]);
 })

//下拉菜单隐藏;
$(".f16").hover(function() {
    $(this).find('.level2').slideDown().stop(false, true);
}, function() {
    $(this).find('.level2').slideUp().stop(false, true);
})

//  商务通跳转
function swtClick(){
	//myWindow=window.open('https://v2.live800.com/live800/chatClient/chatbox.jsp?companyID=489962&jid=6543197051&configID=124562&lan=zh&chatType=1&accept=1&enterurl=www.walre.com&s=1','','width=936px,height=700px,toolbar=no,,menubar=no,location=no,scrollbars=no');  /*top=15px, left=100px,*/
	//myWindow.document.write("<p>This is 'myWindow'</p>");
	//myWindow.focus();
	var openLeft=$(window).width()/2-936/2+"px";
	var openTop=$(window).height()/2-700/2+"px";
	myWindow=window.open('http://put.zoosnet.net/LR/Chatpre.aspx?id=PUT56300221&lng=cn','','width=936px,height=700px,toolbar=no,left='+openLeft+',top='+openTop+',menubar=no,location=no,scrollbars=no');
	myWindow.focus();
}
function jobs(){
	myjobs=window.open('/jobs');  /*top=15px, left=100px,*/
	//myWindow.document.write("<p>This is 'myWindow'</p>");
	myjobs.focus();
}
//分享新浪--
function postToWb(){
	var _t = encodeURI(document.title);
	var _url = encodeURI(document.location);
	var _appkey = encodeURI("appkey");//从新浪获得的appkey
	var _pic = encodeURI('');//（列如：var _pic='图片url1|图片url2|图片url3....）
	var _site = '';//你的网站地址
	var _u = 'http://v.t.sina.com.cn/share/share.php?title='+_t+'&url='+_url+'&appkey='+_appkey+'&site='+_site+'&pic='+_pic;
	window.open( _u,'转播到新浪微博', 'width=700, height=580, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, location=yes, resizable=no, status=no' );
}

      
 //当前
function Thishover(){
	var myurl=window.location.pathname;
	var thisurl1="/jobs/";
	var thisurl2="/bj/job/";
	var thisurl3="/sh/job/";
	var thisurl4="/gz/job/";
	var thisurl5="/sz/job/";
	var thisurl6="/hz/job/";
	var thisurl7="/xz/job/";

	var thisurl8="/cd/job/";
	var thisurl9="/wh/job/";
	var thisurl10="/cs/job/";
	var thisurl11="/nj/job/";
	var thisurl12="/sjz/job/";
	for(i=1;i<=12;i++){
		if (myurl.indexOf(eval("thisurl"+i))>=0){
			document.getElementById("zj_leftmenu"+i).className="active";
		}
	}
}
//导航
function navhover(){
	var navurl=window.location.pathname;
	var thaturl1="/index.html";
	var thaturl2="/about";
	var thaturl3="/service";
	var thaturl4="/jobs/";
	var thaturl5="/anli";
	for(i=1;i<=5;i++){
		if (navurl.indexOf(eval("thaturl"+i))>=0){
			document.getElementById("nav_lmenus"+i).className="hovder";
		}
	}
}
//新闻资讯
function newhover(){
	var newsurl=window.location.pathname;
	var newurl1="/news/index.html";
	var newurl2="/zxnews/5";
	var newurl3="/zxnews/6";
	var newurl4="/zxnews/2";
	var newurl5="/zxnews/3";
	var newurl6="/zxnews/9";
	var newurl7="/anli";
	for(i=1;i<=7;i++){
		if (newsurl.indexOf(eval("newurl"+i))>=0){
			document.getElementById("new_menu"+i).className="actcol";
		}
	}
}
$(function(){
	Thishover();
	navhover();
	newhover();
});

//首页 banner上的滚动
function startmarquee(lh,speed,delay) {
	var p=false;
	var t;
	var o=document.getElementById("marqueebox");
	if(o!=null){
		o.innerHTML+=o.innerHTML;
		o.style.marginTop=0;
		o.onmouseover=function(){
			p=true;
		}
		o.onmouseout=function(){
			p=false;
		}
		function start(){
			t=setInterval(scrolling,speed);
			if(!p) o.style.marginTop=parseInt(o.style.marginTop)-1+"px";
		}
		function scrolling(){
			if(parseInt(o.style.marginTop)%lh!=0){
				o.style.marginTop=parseInt(o.style.marginTop)-1+"px";
				if(Math.abs(parseInt(o.style.marginTop))>=o.scrollHeight/2) o.style.marginTop=0;
			}else{
				clearInterval(t);
				setTimeout(start,delay);
			}
		}
		setTimeout(start,delay);
	}
}
startmarquee(30,20,2000);


