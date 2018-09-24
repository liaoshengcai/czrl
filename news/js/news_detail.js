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
var newsId=pathParam.id;
$.get("/api/news/select/"+newsId,function(res){
	console.log(res)
	if(res.code==0){
		$("#news_title").html(res.data.title);
		$("#news_orign").html(res.data.origin);
		$("#news_publishDate").html(res.data.publishDate);
		var _content=(res.data.content).replace(/\\"/g,"")
		$("#news_content").html(_content);
		$("#news_type").html(res.data.typeName);
		$("#news_browseNum").html(res.data.browseNum);
	}
})
//最热
$.get("/api/news/selectTop",{"orderBy":"browse_num","pageSize":2,"pageNum":1},function(res){
	if(res.code==0){
		var htm_="";
		$.each(res.page.records, function(k,v) {
			htm_+='<div class="row">'
                +'<div class="col-md-12 col-sm-12 col-xs-12 m-b-20 m-t-10 no-padding02">'
                    +'<div class="t-b-details">'
                        +'<div class="art-s-img">'
                            +'<a href="/czrl/news/detail.html?id='+v.id+'"><img height="200px" src="'+v.icon+'"></a>'
                        +'</div>'
                        +'<div class="t-b-comment f13">'
                            +'<p class="gray9b9b pull-left">'+v.typeName+' | '+v.publishDate+'</p>'
                            +'<p class="gray9b9b pull-right"> <span><a><i class="fa-eye"></i></a>'+v.browseNum+'</span></p>'
                        +'</div>'
                        +'<span class="c-blk short-lne"></span>'
                       +'<h2 class="f16 p-b-10 city-linhei"><a href="/czrl/news/detail.html?id='+v.id+'" title="'+v.title+'" class="gray333">'+v.title+'</a></h2>'
                        +'<p class="gray9b9b f13 m-t-8 city-linhei">'+v.info+'</p>'
                    +'</div>'
                +'</div>'
            +'</div>';
		});
		$("#news_hot").append(htm_);
	}
})
//最新
$.get("/api/news/selectTop",{"orderBy":"publish_date","pageSize":2,"pageNum":1},function(res){
	if(res.code==0){
		var htm_="";
		$.each(res.page.records, function(k,v) {
			htm_+='<div class="row">'
                +'<div class="col-md-12 col-sm-12 col-xs-12 m-b-20 m-t-10 no-padding02">'
                    +'<div class="t-b-details">'
                        +'<div class="art-s-img">'
                            +'<a href="/czrl/news/detail.html?id='+v.id+'"><img height="200px" src="'+v.icon+'"></a>'
                        +'</div>'
                        +'<div class="t-b-comment f13">'
                            +'<p class="gray9b9b pull-left">'+v.typeName+' | '+v.publishDate+'</p>'
                            +'<p class="gray9b9b pull-right"> <span><a><i class="fa-eye"></i></a>'+v.browseNum+'</span></p>'
                        +'</div>'
                        +'<span class="c-blk short-lne"></span>'
                       +'<h2 class="f16 p-b-10 city-linhei"><a href="/czrl/news/detail.html?id='+v.id+'" title="'+v.title+'" class="gray333">'+v.title+'</a></h2>'
                        +'<p class="gray9b9b f13 m-t-8 city-linhei">'+v.info+'</p>'
                    +'</div>'
                +'</div>'
            +'</div>';
		});
		$("#news_new").append(htm_);
	}
})