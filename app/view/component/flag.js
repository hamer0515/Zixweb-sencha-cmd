Ext.define('Zixweb.view.component.flag', {
			extend : 'Zixweb.view.component.base.ComboBox',
			alias : ['widget.flag', 'widget.rstatus'],
			name : 'flag',
			fieldLabel : '撤销状态',
			_data : [{
						"id" : 0,
						"name" : "未撤销"
					}, {
						"id" : 1,
						"name" : "已撤销"
					}, {
						"id" : 2,
						"name" : "撤销申请中"
					}]
		});
