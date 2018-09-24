//展示
var tableIns;
filter_search($('#filter_search_text').val());
layui.use(['table', 'upload', 'layer'], function() {
	var table = layui.table,
		form = layui.form;
	var $ = layui.jquery,
		upload = layui.upload;
	layer = layui.layer;
	//监听工具条
	table.on('tool(demo)', function(obj) {
			var data = obj.data;
			if (obj.event === 'del') {
				layer.confirm('真的删除行么', function(index) {
					$.ajax({
						type:"delete",
						url:"/api/contactUs/del/"+data.id,
						async:true,
						success:function(res) {
						if (res.code==0) {
							layer.msg("删除成功");
							layer.close(index);
							tableIns.reload();
							return;
						} else {
							layer.msg("删除失败");
						}
					}
				});
			})
			}else if(obj.event === 'detail'){
				$("input[name='realname']").val(data.realName);
				$("input[name='telphone']").val(data.tellphone);
				$("input[name='companyName']").val(data.companyName);
				$("input[name='email']").val(data.email);
				$("input[name='status']").val(data.status);
				$(".layui-textarea").val(data.requirementDesc);
				showDetail();
			}
	})
})
//查看详情
function showDetail(){
	layer.open({ //弹框
		type: 1,
		title: '邮件详情',
		area: ['700px', '600px'],
		resize:false,
		shade: 0.3,
		content: $("#showemail")
	});
}
//搜索
function filter_search(text){
	layui.use(['table', 'upload','layer'], function() {
				var table = layui.table,
					form = layui.form;
				var $ = layui.jquery,
					upload = layui.upload;
					layer = layui.layer;
		   		tableIns=table.render({
					elem: '#emailsshow' ,
					height: 600 ,
					width: 1140,
					toolbar: 'true',
					url: '/api/contactUs/search',
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
					      "msg": res.msg, //解析提示文本
					      "count": res.page.total, //解析数据长度
					      "data": res.page.records //解析数据列表
					    };
					  },
					cols: [
						[ {
							field: 'realName',
							width: 100,
							title: '姓名',
							unresize: "true"
						}, {
							field: 'tellphone',
							width: 300,
							title: '联系电话',
							unresize: "true"
						}, {
							field: 'companyName',
							width: 250,
							title: '公司名称',
							unresize: "true"
						}, {
							field: 'email',
							width: 250,
							title: '邮箱',
							unresize: "true"
						}, {
							field: 'status',
							width: 115,
							title: '状态',
							unresize: "true"
						}, {
							align: 'center',
							width: 122,
							toolbar: '#barDemo',
							title: '操作',
							unresize: "true"
						}]
					],
					skin: 'nob' ,
					page: true ,
					limits: [10, 20, 30],
					limit: 10 ,
					done: function(res, curr, count) {    
						console.log(res);
					}
				});
			})	
}
