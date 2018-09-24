//展示
var tableIns;
filter_search($('#filter_search_text').val());
layui.use(['table', 'upload','layer'], function() {
				var table = layui.table,
					form = layui.form;
				var $ = layui.jquery,
					upload = layui.upload;
					layer = layui.layer;
  //监听工具条
  table.on('tool(demo)', function(obj){
    var data = obj.data;
    if(obj.event === 'del'){
      layer.confirm('真的删除行么', function(index){
      	$.ajax({
      		type:"delete",
      		url:"/api/blogroll/del/"+data.id,
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
    } else if(obj.event === 'edit'){
    	$("#Uptname").val(data.name);
		$("#Upturl").val(data.url);
		var pid=data.id;
    	Uptlink(pid);
    }
  });
});
//添加链接
function insertLink() {
	layer.open({ //弹框
		type: 1,
		title: '单个链接添加',
		area: ['700px', '600px'],
		resize:false,
		shade: 0.3,
		content: $("#Addlink"),
		btn: ['提交', '取消'],
		yes: function(index, layero) {
			var _linkName = $("#linkname").val();
			if(_linkName.trim()==""){
				layer.msg("链接名不能为空！")
				return;
			}
			var _linkURL = $("#linkurl").val();
			if(_linkURL.trim()==""){
				layer.msg("链接地址不能为空！")
				return;
			}
			$.ajax({
				type:"post",
				url:"/api/blogroll/save",
				async:true,
				contentType:"application/json",
				data:JSON.stringify({"name": _linkName,"url":_linkURL}),
				success:function(res) {
				if(res.code==0) {
					layer.msg("提交成功");
					layer.close(index);
					$("form")[0].reset();
					tableIns.reload();
				} else {
					layer.msg("提交失败");
				}
			}
		})
	 }		
	})		
}
//编辑链接
function Uptlink(trid){
	layer.open({ //弹框
		type: 1,
		title: '修改链接信息',
		area: ['700px', '600px'],
		resize:false,
		shade: 0.3,
		content: $("#Uptlink"),
		btn: ['保存', '取消'],
		yes: function(index, layero) {
			var _uptlinkname = $("#Uptname").val();
			if(_uptlinkname.trim()==""){
				layer.msg("姓名不能为空！")
				return;
			}
			var _uptlinkurl = $("#Upturl").val();
			if(_uptlinkurl.trim()==""){
				layer.msg("链接地址不能为空！")
				return;
			}
			$.ajax({
				type:"post",
				url:"/api/blogroll/save",
				async:true,
				contentType:"application/json",
				data:JSON.stringify({"name": _uptlinkname,"url":_uptlinkurl,"id":trid}),
				success:function(res){
					if(res.code == 0) {
					layer.msg("保存成功");
					layer.close(index); 
					tableIns.reload();
				} else {
					layer.msg("保存失败");
				    }
				}
			})
		}
	});
}
//搜索框
function filter_search(text){
	layui.use(['table', 'upload','layer'], function() {
				var table = layui.table,
					form = layui.form;
				var $ = layui.jquery,
					upload = layui.upload;
					layer = layui.layer;
		   		tableIns = table.render({
					elem : '#linkshow',
					height: 600 ,
					width: 1140 ,
					url : '/api/blogroll/search',
					method : "get",
					where:{
						"searchText" : text
					},
					request : {
						pageName : 'pageNum' ,
						limitName : 'pageSize' 
					},
					 parseData: function(res){ //res 即为原始返回的数据
					    return {
					      "code": res.code, //解析接口状态
					      "msg": res.msg, //解析提示文本
					      "count": res.page.total, //解析数据长度
					      "data": res.page.records //解析数据列表
					    };
					  },					
					cols : [ [{field:'name', width:350, title: '链接名称',unresize:"true"}
					      ,{field:'url', width:350, title: '链接网址',unresize:"true"}
						  ,{align: 'center', width:438,toolbar: '#barDemo',title: '操作'} ] ],
				    skin : 'nob',						
					page : true, 							
					limits : [ 10, 20,30 ],
					limit : 10,
					done : function(res, curr,count) {  
					}
				});
			})	
}
