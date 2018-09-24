var tableIns;
filter_search($('#filter_search_text').val());
layui.use(['table','upload'], function(){
  var table = layui.table;
  var $ = layui.jquery, upload = layui.upload;
  //监听工具条
  table.on('tool(demo)', function(obj){
    var data = obj.data;
     if(obj.event === 'del'){
      layer.confirm('真的删除行么', function(index){
      	$.ajax({
      		type:"delete",
      		url:"/api/successfulCase/del/"+data.id,
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
      	});
      })
    } else if(obj.event === 'edit'){
    $("input[name='uptjob']").val(data.job);
		$("input[name='uptcompany']").val(data.company);
		$("input[name='uptsalary']").val(data.salary);
		$("input[name='uptduration']").val(data.duration);
		$("input[name='uptplace']").val(data.place);
		$("input[name='uptnumber']").val(data.peopleNum);
		$("input[name='publish_time']").val(data.publishDate);
		$("input[name='browseNum']").val(data.browseNum);
    uptCase(data.id);
    }
  });
});
//添加成功案例
function insertsuccessful(){
	layer.open({ //弹框
		type: 1,
		title: '单个成功案例添加',
		area: ['700px', '600px'],
		resize:false,
		shade: 0.3,
		content: $("#Addcase"),
		btn: ['提交', '取消'],
		yes: function(index, layero) {
			var _job = $("input[name='job']").val();
			if(_job.trim()==""){
				layer.msg("入职岗位不能为空！")
				return;
			}
			var _company = $("input[name='company']").val();
			if(_company.trim()==""){
				layer.msg("企业信息不能为空！")
				return;
			}
			var _salary = $("input[name='salary']").val();
			if(_salary.trim()==""){
				layer.msg("岗位年薪不能为空！")
				return;
			}
			var _duration=$("input[name='duration']").val();
			if(_duration.trim()==""){
				layer.msg("寻猎周期不能为空！")
				return;
			}else if(/[^\d]/.test(_duration)){
				layer.msg("寻猎周期请输入数字！")
				return;
			}
			var _place=$("input[name='place']").val();
			if(_place.trim()==""){
				layer.msg("上班地点不能为空！");
				return;
			}
			var _number=$("input[name='number']").val();
			if(_number.trim()==""){
				layer.msg("入职人数不能为空！");
				return;
			}else if(/[^\d]/.test(_duration)){
				layer.msg("入职人数请输入数字！")
				return;
			}
			//var _publishTime=$("input[name='publish_time']").val();
			$.ajax({
				type:"post",
				url:"/api/successfulCase/save",
				async:true,
				contentType:"application/json",
				data:JSON.stringify({"job": _job,"company": _company,"salary":_salary,"duration":_duration,"place":_place,"peopleNum":_number}),
			  success:function(res){
			  	if(res.code==0) {
					layer.msg("提交成功");
					layer.close(index);
					$("form")[0].reset();
					tableIns.reload();
				} else {
					layer.msg("提交失败");
				 }
			  }
			});
		}
	});
}
//编辑成功案例
function uptCase(trid){
	layer.open({ //弹框
		type: 1,
		title: '编辑成功案例',
		area: ['700px', '600px'],
		resize:false,
		shade: 0.3,
		content: $("#Uptcase"),
		btn: ['提交', '取消'],
		yes: function(index, layero) {
			var _uptjob = $("input[name='uptjob']").val();
			if(_uptjob.trim()==""){
				layer.msg("入职岗位不能为空！")
				return;
			}
			var _uptcompany = $("input[name='uptcompany']").val();
			if(_uptcompany.trim()==""){
				layer.msg("企业信息不能为空！")
				return;
			}
			var _uptsalary = $("input[name='uptsalary']").val();
			if(_uptsalary.trim()==""){
				layer.msg("岗位年薪不能为空！")
				return;
			}
			var _uptduration=$("input[name='uptduration']").val();
			if(_uptduration.trim()==""){
				layer.msg("寻猎周期不能为空！")
				return;
			}
			var _uptplace=$("input[name='uptplace']").val();
			if(_uptplace.trim()==""){
				layer.msg("上班地点不能为空！");
				return;
			}
			var _uptnumber=$("input[name='uptnumber']").val();
			if(_uptnumber.trim()==""){
				layer.msg("入职人数不能为空！");
				return;
			}
			$.ajax({
				type:"post",
				url:"/api/successfulCase/save",
				async:true,
				contentType:"application/json",
				data:JSON.stringify({"id": trid,"job": _uptjob,"company": _uptcompany,"salary":_uptsalary,"duration":_uptduration,"place":_uptplace,"peopleNum":_uptnumber}),
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
//搜索框
function filter_search(text){
	layui.use(['table', 'upload','layer'], function() {
				var table = layui.table,
					form = layui.form;
				var $ = layui.jquery,
					upload = layui.upload;
					layer = layui.layer;
		   		tableIns = table.render({
    elem: '#caseshow'
    ,url:'/api/successfulCase/search'
    ,method: "get"
		,where:{
			"searchText" : text
		}
    ,height:600 
	  ,width: 1140 
	  ,toolbar: 'true'
	  ,request: {
			pageName: 'pageNum' ,
			limitName: 'pageSize' 
		},
		parseData: function(res) { //res 即为原始返回的数据
		return {
			"code": res.code, //解析接口状态
			"msg": res.message, //解析提示文本
			"count": res.page.total, //解析数据长度
			"data": res.page.records //解析数据列表
		};
  }
    ,defaultToolbar: ['filter', 'print', 'exports']
    ,title: '用户数据表'
    ,cols: [[
      {field:'job', title:'入职岗位', width:140,unresize: true}
      ,{field:'company', title:'企业信息', width:140,unresize: true}
      ,{field:'salary', title:'岗位年薪', width:100,unresize: true}
      ,{field:'duration', title:'寻猎周期', width:100,unresize: true}
      ,{field:'place', title:'上班地点', width:140,unresize: true}
      ,{field:'peopleNum', title:'入职人数', width:100,unresize: true}
      ,{field:'publishDate', title:'发布时间',width:120,unresize: true}
      ,{field:'browseNum', title:'浏览次数',width:100,unresize: true}
      ,{align: 'center', width:198,toolbar: '#barDemo',title: '操作'}
    ]]
    ,skin: 'nob'
    ,page: true
  })
})		   		
}
