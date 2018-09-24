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
    console.log(data);
    if(obj.event === 'del'){
      layer.confirm('真的删除行么', function(index){
      		$.ajax({
      			type:"delete",
      			url:"/api/recruitmentInfo/del/"+data.id,
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
    	//写入
		$("input[name='uptjob']").val(data.job);
		$("input[name='uptsalary']").val(data.salary);
		$("input[name='uptcompany']").val(data.company);
		$("input[name='uptcompany_property']").val(data.company_property);
		$("input[name='uptcompany_scale']").val(data.company_scale);
		$("input[name='uptindustry']").val(data.industry);
		$("input[name='uptdepartment']").val(data.department);
		$("input[name='uptplace']").val(data.place);
		$("input[name='uptdegree']").val(data.degree);
		$("input[name='uptage']").val(data.age);
		$("input[name='uptsex']:checked").val(data.sex);
		$("textarea[name='uptjob_desc']").val(data.job_desc);
		$("textarea[name='uptjob_require']").val(data.job_require);
		$("textarea[name='uptwelfare']").val(data.welfare);
	  	$("textarea[name='uptwork_experience']").val(data.work_experience);
		$("input[name='publish_time']").val(data.publish_date);
		uptJobs();
    }
  });
});
//单个添加职位
function insertJobs() {
	layer.open({ //弹框
		type: 1,
		title: '单个职位添加',
		area: ['700px', '600px'],
		resize:false,
		shade: 0.3,
		content: $("#Addjobs"),
		btn: ['提交', '取消'],
		yes: function(index, layero) {
			var _job = $("input[name='job']").val();
			if(_job.trim()==""){
				layer.msg("职位名称不能为空！")
				return;
			}
			var _salary = $("input[name='salary']").val();
			var _company = $("input[name='company']").val();
			if(_company.trim()==""){
				layer.msg("企业名称不能为空！")
				return;
			}
			var _companyProperty = $("input[name='company_property']").val();
			var _companyScale = $("input[name='company_scale']").val();
			var _industry= $("input[name='industry']").val();
			var _department= $("input[name='department']").val();
			var _place= $("input[name='place']").val();
			var _degree= $("input[name='degree']").val();
			var _age= $("input[name='age']").val();
			var _sex= $("input[name='sex']:checked").val();
			var _jobDesc= $("textarea[name='job_desc']").val();
			var _jobRequire= $("textarea[name='job_require']").val();
			var _welfare= $("textarea[name='welfare']").val();
			var _workExperience= $("textarea[name='work_experience']").val();
			var _publishTime=$("input[name='publish_time']").val();
			$.ajax({
				type:"post",
				url:"/api/recruitmentInfo/save",
				async:true,
				contentType:"application/json",
				data:JSON.stringify({"job": _job,"company": _company,"salary":_salary,"companyProperty": _companyProperty,"companyScale": _companyScale,"industry": _industry,"department": _department,"place": _place,"degree": _degree,"age": _age,"sex": _sex,"age": _age,"jobDesc": _jobDesc,"jobRequire": _jobRequire,"welfare": _welfare,"workExperience": _workExperience,"publishDate": _publishTime}),
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
	})
}
//编辑职位
function uptJobs() {
	layer.open({ //弹框
		type: 1,
		title: '查看编辑职位',
		area: ['700px', '600px'],
		resize:false,
		shade: 0.3,
		content: $("#Uptjobs"),
		btn: ['提交', '取消'],
		yes: function(index, layero) {
			var _uptjob = $("input[name='uptjob']").val();
			if(_uptjob.trim()==""){
				layer.msg("职位名称不能为空！")
				return;
			}
			var _uptsalary = $("input[name='uptsalary']").val();
			var _uptcompany = $("input[name='uptcompany']").val();
			if(_uptcompany.trim()==""){
				layer.msg("企业名称不能为空！")
				return;
			}
			var _uptcompanyProperty = $("input[name='uptcompany_property']").val();
			var _uptcompanyScale = $("input[name='uptcompany_scale']").val();
			var _uptindustry= $("input[name='uptindustry']").val();
			var _uptdepartment= $("input[name='uptdepartment']").val();
			var _uptplace= $("input[name='uptplace']").val();
			var _uptdegree= $("input[name='uptdegree']").val();
			var _uptage= $("input[name='uptage']").val();
			var _uptsex= $("input[name='uptsex']:checked").val();
			var _uptjobDesc= $("textarea[name='uptjob_desc']").val();
			var _uptjobRequire= $("textarea[name='uptjob_require']").val();
			var _uptwelfare= $("textarea[name='uptwelfare']").val();
			var _uptworkExperience= $("textarea[name='uptwork_experience']").val();
			$.post("/api/recruitmentInfo/save", {
				"id":data.id,
				"job": _uptjob,
				"salary": _uptsalary,
				"company": _uptcompany,
				"company_property": _uptcompanyProperty,
				"company_scale": _uptcompanyScale,
				"industry": _uptindustry,
				"department": _uptdepartment,
				"place": _uptplace,
				"degree": _uptdegree,
				"age": _uptage,
				"sex": _uptsex,
				"age": _uptage,
				"job_desc": _uptjobDesc,
				"job_require": _uptjobRequire,
				"welfare": _uptwelfare,
				"work_experience": _uptworkExperience,
			}, function(res) {
				if(result.code==0) {
					layer.msg("提交成功");
					layer.close(index);
					tableIns.reload();
				} else {
					layer.msg("提交失败");
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
		   		tableIns=table.render({
					elem: '#jobshow' ,
					height: 600 ,
					width: 1140 ,
					toolbar: 'true',
					url: '/api/recruitmentInfo/search',
					method: "get",
					where:{
						"searchText" : text
					},
					request: {
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
				    },
					cols: [
						[
					      {field:'job', width:150, title: '职位名称',unresize:"true"}
					      ,{field:'company', width:100, title: '企业名称',unresize:"true"}
					      ,{field:'salary', width:148, title: '所属行业',unresize:"true"}
					      ,{field:'place', width:240, title: '上班地点',unresize:"true"}
					      ,{field:'publishDate', width:200, title: '发布时间',unresize:"true"}
					      ,{field:'browseNum', width:100, title: '浏览次数',unresize:"true"}
						  ,{align: 'center', width:201,toolbar: '#barDemo',title: '操作'}
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
