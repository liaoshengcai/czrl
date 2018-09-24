var tableIns;
layui.use(['table', 'upload','layer'], function() {
	var table = layui.table,
		form = layui.form;
	var $ = layui.jquery,
		upload = layui.upload;
		layer = layui.layer;
	tableIns=table.render({
	elem: '#partnershow',
	height: 600,
	width: 1140,
	toolbar: 'true',
	url: '/api/partner/selectAll',
	method: "get",
	request: {
		pageName: 'pageNum',
		limitName: 'pageSize'
	},
	
	cols: [
		[{
			field: 'name',
			width: 348,
			title: '合作伙伴名称',
			align: 'center',
			unresize: "true"
		}, 
		{field:'icon', title: '合作伙伴图标', width: 350, toolbar: '#titleTpl',align: 'center'}, 
		{
			align: 'center',
			width: 438,
			toolbar: '#barDemo',
			title: '操作'
		}]
	],
	skin: 'line',
	page: true,
	limits: [10, 20, 30],
	limit: 10,
	done: function(res, curr, count) {
		//列自动撑开
	    $(".layui-table-cell").removeClass("layui-table-cell");
	}
})
  //监听工具条
table.on('tool(demo)', function(obj){
   var data = obj.data;
	if (obj.event === 'del') {
		layer.confirm('真的删除行么', function(index) {
			$.ajax({
				type: "delete",
				url: "/api/partner/del/" + data.id,
				async: true,
					success: function(res) {
						if (res.code == 0) {
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
		}
    })
}) 
//单个添加合作伙伴
function addParters(){
	layui.use(['table', 'upload','layer'], function() {
		var table = layui.table,
			form = layui.form;
		var $ = layui.jquery,
			upload = layui.upload;
			layer = layui.layer;
		layer.open({ //弹框
		type: 1,
		title: '单个添加合作伙伴',
		area: ['700px', '600px'],
		resize:false,
		shade: 0.3,
		maxmin: true, 
		content: $("#Addpartners"),
		btn: ['提交', '取消'],
		yes: function(index, layero) {
			var _partnersName = $("input[name='partners']").val();
			if(_partnersName.trim()==""){
				layer.msg("合作伙伴名称不能为空！");
				return;
			}
			var _icon=$("#icon")[0].files[0];
			if(_icon.trim()==""){
				layer.msg("合作伙伴照片不能为空！");
				return;
			}
			var xhr=new XMLHttpRequest();
			var formData=new FormData();
			formData.append("file",_icon);
			xhr.onload=function(e){
				console.log(e);
				var res=JSON.parse(xhr.responseText);
				if(res.code==0){
					layer.msg("提交成功");
					layer.close(index);
					$("form")[0].reset();
					tableIns.reload();
				}else{
					layer.msg("提交失败");
				}
			};
			xhr.open("POST","/api/partner/add?name="+_partnersName,true);
			xhr.send(formData);
			}
		})
	})
}
