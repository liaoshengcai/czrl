//获取友情链接
$.get("/api/blogroll/search", function(data) {
	for (var i = 0; i < data.page.records.length; i++) {
		$("#link").append("<li><a href='" + data.page.records[i].url + "' class='f13 trans text-overflow' target='_blank' title='"+ data.page.records[i].name+"'>"+ data.page.records[i].name+"</a></li>")
	}
})

