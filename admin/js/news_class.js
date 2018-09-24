//展示
var tableIns;
layui.use(['table', 'upload','layer'], function() {
				var table = layui.table,
					form = layui.form;
				var $ = layui.jquery,
					upload = layui.upload;
					layer = layui.layer;
				tableIns=table.render({
					elem: '#newsClass_show' ,
					height: 600 ,
					width: 451 ,
					url: '/api/newsType/selectAll',
					method: "get",
					request: {
						pageName: 'pageNum' ,
						limitName: 'pageSize' 
					},
					response : {
						countName : 'total' ,
						dataName : 'list' 
					},
					cols: [
						[
					      {field:'typeName', width:200, title: '资讯类别名称',unresize:"true"}
						  ,{fixed: 'right',align: 'center', width:250,toolbar: '#barDemo',title: '操作'}
						]
					],
					skin: 'nob' ,
					done: function(res, curr, count) {    	
					}
				});
  //监听工具条
  table.on('tool(demo)', function(obj){
    var data = obj.data;
    if(obj.event === 'del'){
      layer.confirm('真的删除行么', function(index){
      	console.log(data.id);
			$.ajax({
				type:"delete",
				url:"/api/newsType/del/"+data.id,
				async:true,
				success:function(res){
					console.log(res)
					if(res.code==0) {
					layer.msg("提交成功");
					layer.close(index);
					tableIns.reload();
				} else {
					layer.msg("提交失败");
				}
			}
			})
      })
    } else if(obj.event === 'edit'){
    	$("input[name='uptype_name']").val(data.typeName);
    	var pid=data.id;
    	uptNewtype(pid);
    }
  });
});
//添加资讯类别
function insertNewtype() {
	layer.open({ //弹框
		type: 1,
		title: '单个链接添加',
		area: ['700px', '600px'],
		resize:false,
		shade: 0.3,
		maxmin: true, 
		content: $("#AddnewsClass"),
		btn: ['提交', '取消'],
		yes: function(index, layero) {
			var _typeName = $("input[name='type_name']").val();
			if(_typeName.trim()==""){
				layer.msg("类别名称不能为空！")
				return;
			}
			$.ajax({
				type:"post",
				url:"/api/newsType/save",
				async:true,
				contentType:"application/json",
				data:JSON.stringify({"typeName": _typeName}),
				success:function(res){
					if(res.code==0) {
					layer.msg("提交成功");
					layer.close(index);
				tableIns.reload();
				} else {
					layer.msg("提交失败");
				}
				}
			});
		}
	});
}
//编辑资讯类别
function uptNewtype(trid){
	layer.open({ //弹框
		type: 1,
		title: '修改资讯类别信息',
		area: ['700px', '600px'],
		resize:false,
		shade: 0.3,
		maxmin: true, 
		content: $("#UptnewsClass"),
		btn: ['保存', '取消'],
		yes: function(index, layero) {
			var _uptypeName = $("input[name='uptype_name']").val();
			console.log(_uptypeName);
			if(_uptypeName.trim()==""){
				layer.msg("类别名称不能为空！")
				return;
			}
			$.ajax({
				type:"post",
				url:"/api/newsType/save",
				async:true,
				contentType:"application/json",
				data:JSON.stringify({"typeName": _uptypeName,"id":trid}),
				success:function(res){
					if(res.code==0) {
					layer.msg("提交成功");
					layer.close(index);
				tableIns.reload();
				} else {
					layer.msg("提交失败");
				}
				}
			});
		}
	});
}

