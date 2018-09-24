   
//滚动成功案例
$.get("/api/successfulCase/search",{"pageSize":9,"pageNum":1},function(res){
//	console.log(res);
	if(res.code==0){
		startmarquee(30,20,2000);
		$.each(res.page.records, function(k,v) {
			$("#marqueebox").append('<li class="td-f col-md-4 col-sm-6 col-xs-12"><a href="Anli/detail.html?id='+v.id+'" class="trans f14" title="虫子人力 成功案例 '+v.job+' 入职成功"> <span> 虫子人力 成功案例 '+v.job+' 入职成功</span><span class="sp02">'+v.publishDate+'</span></a></li>');
		});
	}
})
//最新成功案例
//$.get("/api/successfulCase/search",{"pageSize":9,"pageNum":1},function(res){
////	console.log(res);
//	if(res.code==0){
//		$.each(res.page.records, function(k,v) {
//			$("#successful_cases").append(' <li class="f16 gray222 col-md-12"><em class="c-in-blk col-md-1 col-5 col-sm-1">•</em><a href="Anli/detail.html?id='+v.id+'" title="长沙猎头公司 成功案例 品牌策划 入职成功" class="trans gray222 col-md-8 col-sm-6">虫子人力 成功案例 '+v.job+' 入职成功</a><span class="c-in-blk gray9b9b m-l-20 c-spn01 col-md-3 col-sm-5">'+v.publishDate+'</span></li>');
//		});
//	}
//})
//成功案例写入
$.get("/api/successfulCase/search", {"pageSize":10,"pageNum":1},function(data) {
		for (var i = 0; i < data.page.records.length; i++) {
			if(i%2==1){
				$("#successful_cases01").append(' <li class="f16 gray222 col-md-12"><em class="c-in-blk col-md-1 col-5 col-sm-1">•</em><a href="Anli/detail.html?id='+data.page.records[i].id+'"  class="trans gray222 col-md-8 col-sm-6">虫子人力 成功案例 '+data.page.records[i].job+' 入职成功</a><span class="c-in-blk gray9b9b m-l-20 c-spn01 col-md-3 col-sm-5">'+data.page.records[i].publishDate+'</span></li>');
			}else{
				$("#successful_cases02").append(' <li class="f16 gray222 col-md-12"><em class="c-in-blk col-md-1 col-5 col-sm-1">•</em><a href="Anli/detail.html?id='+data.page.records[i].id+'"  class="trans gray222 col-md-8 col-sm-6">虫子人力 成功案例 '+data.page.records[i].job+' 入职成功</a><span class="c-in-blk gray9b9b m-l-20 c-spn01 col-md-3 col-sm-5">'+data.page.records[i].publishDate+'</span></li>');
			}
		}
	})


$.get("/api/news/selectTop",{"orderBy":"publish_date","pageSize":4,"pageNum":1},function(res){
	if(res.code==0){
		var htm_="";
		$.each(res.page.records, function(k,v) {
			htm_+='<div class="col-md-3 col-sm-6 col-xs-12 m-b-20 c-kuai-yuan">'
                    +'<div class="t-b-details">'
                        +'<div class="t-b-img relative"> '
                        	+'<a href="news/detail.html?id='+v.id+'"><img height=" 200px" src="'+v.icon+'"/></a>'
                        +'</div>'
                        +'<div class="t-b-comment f13">'
                            +'<p class="gray9b9b pull-left">发布时间: <span>'+v.publishDate.substring(0,10)+'</span></p>'
                            +'<p class="gray9b9b pull-right"> <span><a><i class="fa-eye"></i></a>'+v.browseNum+'</span></p>'
                        +'</div>'
                        +'<span class="c-blk short-lne"></span>'
                        +'<h2 class="f16 p-b-10 city-linhei"><a class="gray333" href="news/detail.html?id='+v.id+'">'+v.title+'</a></h2>'
                        +'<p class="gray9b9b f13 m-t-8 city-linhei">'+v.info+' </p>'
                    +'</div>'
                +'</div>';
		});
		$("#news_list_show").append(htm_);
	}
})
