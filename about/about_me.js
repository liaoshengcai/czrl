//提交邮件信息
function submitEmail() {
	layui.use(['layer'], function() {
		var $ = layui.jquery,
			layer = layui.layer;
		var _names = $("#names").val();
		if (_names.trim() == "") {
			layer.msg("姓名不能为空！")
			return;
		}
		var _tels = $("#tels").val();
		if (_tels.trim() == "") {
			layer.msg("联系电话不能为空！")
			return;
		}
		var _companyName = $("#company_name").val();
		if (_companyName.trim() == "") {
			layer.msg("公司名称不能为空！")
			return;
		}
		var _emails = $("#emails").val();
		var _contents = $("#contents").val();
		$.ajax({
			type: "post",
			url: "/api/contactUs/save",
			async: true,
			contentType: "application/json",
			data: JSON.stringify({
				"companyName": _companyName,
				"realName": _names,
				"tellphone": _tels,
				"email": _emails,
				"requirementDesc": _contents
			}),
			success: function(res) {
				if (res.code == 0) {
					layer.msg("提交成功");
					$("#form_hroizon")[0].reset();

				} else {
					layer.msg("提交失败");
				}
			}
		})
	})
}