// 弹窗读取内容---error
$('.lis-jober').on('click', function() {
	$('#j-module1 .c-modalBox, #j-module1 .c-modalBg').show();
	var id = $(this).attr("href");
	alert(id);
	$.ajax({
		url: "http://www.walre.com/plus/view.php?aid=id",
		type: "POST",
		data: {
			title: title,
		},
		success: function(data) {
			//将后台获取的数据动态
			$(".c-jobtan").html(data);
		},
	});
});
//成功案例写入
getCasesList(1)
function getCasesList(current){
$.get("/api/successfulCase/search",{"pageSize":10,"pageNum":current}, function(data) {
		showPageInfo(current,data.page.pages,data.page.total,10,getCasesList);
		var html_="";
		for (var i = 0; i < data.page.records.length; i++) {
			html_+="<a href='detail.html?id=" + data.page.records[i].id + "' class='c-all-a'><div class='lst-content trans'><div class='row f18 m-b-10'><div class='col-md-9 col-xs-9 c-case-an'> <p class='gray222 trans p-01'>" + data.page.records[i].company + " 成功案例 " + data.page.records[i].job + " 入职成功</p> <!-- lis-jober -->   </div><div class='col-md-3 col-xs-3'><span class='pull-right f22 c-pmoney m-r-5'>" + data.page.records[i].salary + "</span></div></div><div class='row f18'><div class='col-md-9 col-xs-9'> <p class='f14 gray4a4a'> </p></div><div class='col-md-3 col-xs-3'><span class='f12 gray9b9b pull-right m-r-5'>" + data.page.records[i].publishDate + "</span></div></div></div></a>";
		}
		$("#cases").html(html_);
	})
}