//写入详情
var pathParam=new function(){
		var name,value;
	    var str=location.href;  //取得整个地址栏
	    var num=str.indexOf("?"); 
	    str=str.substr(num+1); //str得到?之后的字符串
	    var arr=str.split("&"); //得到&分割的参数，放入数组中
	    for(var i=0;i<arr.length;i++){
	        num=arr[i].indexOf("=");
	        if(num>0){
	            name=arr[i].substring(0,num);
	            value=arr[i].substr(num+1);
	            this[name]=value;
	        }
	    }
};
var jobsId=pathParam.id ;
$.get("/api/recruitmentInfo/select/"+jobsId,function(res){
	if(res.code==0){
		var htm_="<h3 class='gray222 f26'>"+res.data.company+" "+res.data.job+"&nbsp&nbsp&nbsp推荐成功</h3>"
						+"<div class='c-laiyuan p-b-10'>"
							+"<div class='col-md-9 col-xs-9 gray9b9b art-layan'>来源：虫子人力       "+res.data.company+"| <span class='time_now'>"+res.data.publishDate+"</span></div>"
	 						+"<a class='trans col-md-1 col-xs-1 gray9b9b pull-right a-numbers'>"+res.data.browseNum+"</a>"
	 						+"<div class='clearfix'></div>"
						+"</div>"
						+"<div class='clearfix content_nr_main m-t-20'>";
						if(res.data.salary!=""){htm_+="<p><strong>　　职位年薪：</strong>"+res.data.salary+"</p>";}
						if(res.data.industry!=""){htm_+="<p><strong>　　所属行业： </strong>"+res.data.industry+"</p>";}	
						if(res.data.department!=""){htm_+="<p><strong>　　所属部门：</strong>"+res.data.department+"</p>";}
						if(res.data.companyProperty!=""){htm_+="<p><strong>　　企业性质：</strong>"+res.data.companyProperty+"</p>";}
						if(res.data.companyScale!=""){htm_+="<p><strong>　　企业规模：</strong>"+res.data.companyScale+"</p>";}
						if(res.data.place!="") {htm_+="<p><strong>　　上班地点：</strong>"+res.data.place+"</p>";}
						if(res.data.degree!=""){htm_+="<p><strong>　　最低年限：</strong>"+res.data.degree+"</p>";}
						if(res.data.sex!=""){htm_+="<p><strong>　　性别要求：</strong>"+res.data.sex+"</p>";}
						if(res.data.age!=""){htm_+="<p><strong>　　年龄要求：</strong>"+res.data.age+"</p>";}
						if(res.data.peopleNum!=""){htm_+="<p><strong>　　招聘人数：</strong>"+res.data.peopleNum+"</p>";}
						if(res.data.jobDesc!=""){htm_+="<p><strong>　　职位描述：</strong><span style='white-space:pre;'>"+res.data.jobDesc+"</span> </p>";}
						if(res.data.jobRequire!=""){htm_+="<p><strong>　　职位要求：</strong><span style='white-space:pre;'>"+res.data.jobRequire+"</span></p>";}
						if(res.data.welfare!=""){htm_+="<p><strong>　　福利：</strong><span style='white-space:pre;'>"+res.data.welfare+"</span></p>";}
						if(res.data.workExperience!=""){htm_+="<p><strong>　　工作经验：</strong><span style='white-space:pre;'>"+res.data.workExperience+"</span></p>";}
						htm_+="</div>"
		$("#detail").append(htm_);
	}
})
