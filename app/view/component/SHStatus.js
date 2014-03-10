Ext.define('Zixweb.view.component.SHStatus', {
			extend : 'Zixweb.view.component.base.ComboBox',
			alias : 'widget.shstatus',
			name : 'status',
			fieldLabel : '审核状态',
			_data : [{
						"id" : 0,
						"name" : "待审核"
					}, {
						"id" : 1,
						"name" : "审核通过"
					}, {
						"id" : 2,
						"name" : "审核未通过"
					}]

		});
