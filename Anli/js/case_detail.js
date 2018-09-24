//解析？键值对
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
var casesId=pathParam.id;
$.get("/api/successfulCase/select/"+casesId,function(res){
	console.log(res);
	if(res.code==0){
		$("#detail").append('<h3 class="gray222 f26">虫子人力  成功案例 '+res.data.job+' 入职成功</h3>'
                        +'<div class="c-laiyuan p-b-10"><div class="col-md-9 col-xs-9 gray9b9b art-layan">来源：虫子人力    北京 |发布时间： '+res.data.publishDate+'</div><a class="trans col-md-1 col-xs-1 gray9b9b pull-right a-numbers">'+res.data.browseNum+'</a><div class="clearfix"></div></div>'
                        +'<div class="clearfix content_nr_main m-t-20"><p><strong>　　入职岗位：'+res.data.job+'</strong><br />&nbsp;</p><p><strong>　　企业信息：'+res.data.company+'</strong><br />&nbsp;</p><p><strong>　　岗位年薪：'+res.data.salary+'</strong><br />&nbsp;</p><p><strong>　　寻猎周期：'+res.data.duration+'天</strong><br />&nbsp;</p><p><strong>　　上班地点：'+res.data.place+'</strong><br />&nbsp;</p><p><strong>　　入职人数：'+res.data.peopleNum+'人</strong></p></div></div>'
					+'</div>')
	}
})
//新闻详情
$.get("/api/news/selectTop",{"orderBy":"publish_date","pageSize":2,"pageNum":1},function(res){
	if(res.code==0){
		var htm_="";
		$.each(res.page.records, function(k,v) {
			htm_+='<div class="row">'
                +'<div class="col-md-12 col-sm-12 col-xs-12 m-b-20 m-t-10 no-padding02">'
                    +'<div class="t-b-details">'
                        +'<div class="art-s-img">'
                            +'<a href="../news/detail.html?id='+v.id+'"><img height="200px" src="'+v.icon+'"></a>'
                        +'</div>'
                        +'<div class="t-b-comment f13">'
                            +'<p class="gray9b9b pull-left">'+v.typeName+' | '+v.publishDate+'</p>'
                            +'<p class="gray9b9b pull-right"> <span><a><i class="fa-eye"></i></a>'+v.browseNum+'</span></p>'
                        +'</div>'
                        +'<span class="c-blk short-lne"></span>'
                       +'<h2 class="f16 p-b-10 city-linhei"><a href="detail.html?id='+v.id+'" title="'+v.title+'" class="gray333">'+v.title+'</a></h2>'
                        +'<p class="gray9b9b f13 m-t-8 city-linhei">'+v.info+'</p>'
                    +'</div>'
                +'</div>'
            +'</div>';
		});
		$("#news_new").append(htm_);
	}
})