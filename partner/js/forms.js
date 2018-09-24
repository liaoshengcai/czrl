
$(function(){ 
    $(".j-xingzhi,.j-dh,.j-cy").hide();
    //清空表单值
	function formreset(){
	   document.form1.reset();
	}

	$(".j-sends").click(function(){
		//姓名
		var c_name = $(".j-name");
		var city_name = $.trim(c_name.val());
		if(!city_name || city_name.length<2){
			c_name.addClass('add_border');
			$(".j-tishi").hide();
			$(".j-xingzhi").show();
			$(".j-wores").text("姓名不能为空且不能低于2位数");
			//$(".j-name").focus();
			return false;
		}else{
			c_name.removeClass('add_border');
			$(".j-tishi").show();
			$(".j-xingzhi").hide();
			$(".j-wores").text("");
		}
		//手机验证
		var isMobile=/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;   //正则
		var isPhone=/^((0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?$/;   //座机验证规则
		var c_tel = $(".j-telphone");
		var city_phone = $.trim(c_tel.val());
		if(!city_phone || !isMobile.test(city_phone)){
			c_tel.addClass('add_border');
			$(".j-tm").hide();
			$(".j-dh").show();
			$(".j-wt").text("请正确填写手机号码，例如:158****5109");
			//$(".j-telphone").focus();
			return false;
		}else{
			c_tel.removeClass('add_border');
			$(".j-tm").show();
			$(".j-dh").hide();
			$(".j-wt").text("");
		}
		//公司名称
		var c_comyname = $(".j-comyname");
		var city_comy = $.trim(c_comyname.val());
		if(!city_comy){
			c_comyname.addClass('add_border');
			$(".j-comy").hide();
			$(".j-cy").show();
			$(".j-cyme").text("公司名称不能为空！");
			//$(".j-comyname").focus();
			return false;
		}else{
			c_comyname.removeClass('add_border');
			$(".j-comy").show();
			$(".j-cy").hide();
			$(".j-cyme").text("");
		}
		//描述
		var c_cont = $(".j-cont");
		var city_neirong = $.trim(c_cont.val());
		if(!city_neirong){
			c_cont.addClass('add_border');
			$(".j-xinx").text("请对职位进行简单描述！");
			//$(".j-cont").focus();
			return false;
		}else{
			c_cont.removeClass('add_border');
			$(".j-xinx").text("");
		}
		
		$.ajax({
			url: "http://www.walre.com/plus/diy.php",
			type:"POST",
			data:$('#form_hroizon').serialize(),
			//dataType:"php", //
			success:function(data){
				$('#j-cityform .c-modalBox, #j-cityform .c-modalBg').show();
				formreset()
				//IP24小时只能发布一次
		        // if(isset($_COOKIE['VOTE_MEMBER_IP'])){
		        //     if($_COOKIE['VOTE_MEMBER_IP'] == $_SERVER['REMOTE_ADDR']){
		        //         alert("您已经填写过表单啦");
		        //         exit();
		        //     } else {
		        //         setcookie('VOTE_MEMBER_IP',$_SERVER['REMOTE_ADDR'],time()*$row['spec']*3600,'/');
		        //     }
		        // } else {
		        //     setcookie('VOTE_MEMBER_IP',$_SERVER['REMOTE_ADDR'],time()*$row['spec']*3600,'/');
		        // }
			},
			error:function(data){
				alert("error");
			}
		});
	})	
})