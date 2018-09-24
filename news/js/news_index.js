getNewsList(1)
function getNewsList(current){
	$.get("/api/news/selectTop",{"orderBy":"publish_date","pageSize":12,"pageNum":current},function(res){
	if(res.code==0){
		showPageInfo(current,res.page.pages,res.page.total,12,getNewsList);
		var htm_="";
		$.each(res.page.records, function(k,v) {
			htm_+='<div class="col-md-3 col-sm-6 col-xs-12 m-b-20 c-kuai-yuan">'
                    +'<div class="t-b-details">'
                        +'<div class="t-b-img relative"> '
                        	+'<a href="detail.html?id='+v.id+'"><img height=" 200px" src="'+v.icon+'"/></a>'
                        +'</div>'
                        +'<div class="t-b-comment f13">'
                            +'<p class="gray9b9b pull-left">发布时间: <span>'+v.publishDate.substring(0,10)+'</span></p>'
                            +'<p class="gray9b9b pull-right"> <span><a><i class="fa-eye"></i></a>'+v.browseNum+'</span></p>'
                        +'</div>'
                        +'<span class="c-blk short-lne"></span>'
                        +'<h2 class="f16 p-b-10 city-linhei"><a class="gray333" href="detail.html?id='+v.id+'">'+v.title+'</a></h2>'
                        +'<p class="gray9b9b f13 m-t-8 city-linhei">'+v.info+' </p>'
                    +'</div>'
                +'</div>';
		});
		$(".news_list_show").html(htm_);
	}
})
}