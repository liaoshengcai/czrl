//写入工作职位
getJobsList(1)
function getJobsList(current) {
	$.get("/api/recruitmentInfo/search", {"pageSize":10,"pageNum":current},function(data) {
		showPageInfo(current,data.page.pages,data.page.total,10,getJobsList);
		var htm_ ="";
		for (var i = 0; i < data.page.records.length; i++) {
			htm_ += "<a href='detail.html?id=" + data.page.records[i].id + "' class='c-all-a'><div class='lst-content trans'><div class='row f18 m-b-10'><div class='col-md-9 col-xs-8 c-case-an'><p class='gray222 trans p-01'>" + data.page.records[i].company + "职位 " + data.page.records[i].job + "</p></div><div class='col-md-3 col-xs-4'><span class='pull-right f22 c-pmoney m-r-5'>" + data.page.records[i].salary + "</span></div></div>"
			if (data.page.records[i].companyProperty == null) {
				htm_ += "<div class='row f18'><div class='col-md-9 col-xs-8'><p class='f14 gray4a4a'></p></div><div class='col-md-3 col-xs-4'><span class='f12 gray9b9b pull-right m-r-5 time_now'>" + data.page.records[i].publishDate + "</span></div></div></div></a>"
			} else {
				htm_ += "<div class='row f18'><div class='col-md-9 col-xs-8'><p class='f14 gray4a4a'>" + data.page.records[i].companyProperty + "</p></div><div class='col-md-3 col-xs-4'><span class='f12 gray9b9b pull-right m-r-5 time_now'>" + data.page.records[i].publishDate + "</span></div></div></div></a>"
			}
			
		}
		$("#jobs").html(htm_);
	})
}
//最近浏览
$.get("/api/recruitmentInfo/selectTop", {
		"orderBy": "modify_time"
	}, function(data) {
		for (var i = 0; i < data.page.records.length; i++) {
			$("#browse").append("<li><a href='detail.html?id=" + data.page.records[i].id + "' title=" + data.page.records[i].job + " class='trans'>" + data.page.records[i].job + "<span class='preds pull-right'>" + data.page.records[i].salary + "</span></a></li>")
		}
	})
	//热门职位
$.get("/api/recruitmentInfo/selectTop", {
		"orderBy": "browse_num"
	}, function(data) {
		for (var i = 0; i < data.page.records.length; i++) {
			$("#hot_jods").append("<li><a href='detail.html?id=" + data.page.records[i].id + "' title=" + data.page.records[i].job + " class='trans'>" + data.page.records[i].job + "<span class='preds pull-right'>" + data.page.records[i].salary + "</span></a></li>")
		}

	})
	//最新更新
$.get("/api/recruitmentInfo/selectTop", {
	"orderBy": "create_time"
}, function(data) {
	for (var i = 0; i < data.page.records.length; i++) {
		$("#nearest").append("<li><a href='detail.html?id=" + data.page.records[i].id + "' title=" + data.page.records[i].job + " class='trans'>" + data.page.records[i].job + "<span class='preds pull-right'>" + data.page.records[i].salary + "</span></a></li>")
	}

})