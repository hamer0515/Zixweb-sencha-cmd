Ext.define('Zixweb.view.component.ZQQRStatus', {
			extend : 'Zixweb.view.component.base.ComboBox',
			alias : 'widget.zqqrstatus',
			name : '状态',
			fieldLabel : '状态',
			_data : [{
						id : -1,
						name : '无'
					}, {
						id : -2,
						name : '生成失败'
					}, {
						id : 1,
						name : '可生成'
					}, {
						id : 2,
						name : '生成中'
					}, {
						id : 3,
						name : '生成成功'
					}]

		});
