var tableIns;
filter_search($('#filter_search_text').val());
//下拉框查询
/*$("#new_type").bind("change",function(){
		var search_text=$('#filter_search_text').val();
        var type_id = $(this).find("option:selected").attr("data-id");
        filter_search(search_text,type_id);
    });*/

//点击查询
$(".search_btn").bind("click",function(){
	filter_search($('#filter_search_text').val(),$("#new_type").find("option:selected").attr("data-id"));
})
layui.use(['table', 'upload','layer'], function() {
	var table = layui.table,
		form = layui.form;
	var $ = layui.jquery,
		upload = layui.upload;
		layer = layui.layer;
  table.on('tool(demo)', function(obj){
    var data = obj.data;
    console.log(data.id);
    if(obj.event === 'del'){
      layer.confirm('真的删除行么', function(index){
      		$.ajax({
      			type:"delete",
      			url:"/api/news/del/"+data.id,
      			async:true,
      			success:function(res){
      				if (res.code==0) {
					layer.msg("删除成功");
					layer.close(index);
					tableIns.reload();
					return;
				} else {
					layer.msg("删除失败");
					}
      			}
      		})
      })
    } else if(obj.event === 'detail'){
    	console.log(data.id)
    	layui.use(['upload','layer'], function() {
		var $ = layui.jquery,
			upload = layui.upload;
			layer = layui.layer;
		layer.open({ //弹框
			type: 2,
			title: '查看资讯详情',
			area: ['700px', '600px'],
			resize:false,
			shade: 0.3,
//			maxmin: true, 
			content: '/czrl/news/detailSimple.html?id='+data.id
	    })
	})
    }
  });
});
/*function detailNew(tid){
	$.get("/api/news/select/"+tid,function(data){
		$("input[name='title']").val(data.date.title);
		$("input[name='origin']").val(data.date.origin);
		$("input[name='type_name']").val(data.date.typeName);
		$("input[name='crawler_origin']").val(data.date.crawlerOrigin);
		$("input[name='publish_time']").val(data.date.publishDate);
		$("textarea[name='info']").val(data.date.info);
		$("textarea[name='content']").val(data.date.content);
	})
	layui.use(['upload','layer'], function() {
		var $ = layui.jquery,
			upload = layui.upload;
			layer = layui.layer;
		layer.open({ //弹框
			type: 1,
			title: '查看资讯详情',
			area: ['60%', '90%'],
			shade: 0.3,
			maxmin: true, 
			content: $("#Detailnews"),
			
	    })
	})
}*/
//搜索
function filter_search(text,type_id){
	layui.use(['table', 'upload','layer'], function() {
				var table = layui.table,
					form = layui.form;
				var $ = layui.jquery,
					upload = layui.upload;
					layer = layui.layer;
		   		tableIns=table.render({
					elem: '#newshow' ,
					height: 600 ,
					width: 1140 ,
					toolbar: 'true',
					url: '/api/news/search',
					method: "get",
					where:{
						"searchText" : text
					},
					request: {
						pageName: 'pageNum' ,
						limitName: 'pageSize' 
					},
					parseData: function(res){ //res 即为原始返回的数据
					    return {
					      "code": res.code, //解析接口状态
					      "msg": res.message, //解析提示文本
					      "count": res.page.total, //解析数据长度
					      "data": res.page.records //解析数据列表
					    };
				 	},
					cols: [
						[
					      {field:'title', width:200, title: '标题',unresize:"true"}
					      ,{field:'origin', width:100, title: '来源',unresize:"true"}
					      ,{field:'info', width:500, title: '简介',unresize:"true"}
					      ,{field:'publishDate', width:187, title: '发布时间',unresize:"true"}
						  ,{align: 'center', width:152,toolbar: '#barDemo',title: '操作',unresize:"true"}
						]
					],
					skin: 'nob' ,
					page: true ,
					limits: [10, 20, 30],
					limit: 10 ,
					done: function(res, curr, count) { 
					}
				});
			})	
}

/*function addNewstype(){
		$.get("/api/newsType/selectAll",function(data){
			　for (var i = 0; i < data.list.length; i++) {
				$("#new_type").append(
						" <option name='news_type' data-id='" + data.list[i].id + "'>"+ data.list[i].typeName+"</option>");
		}
	})
}*/
