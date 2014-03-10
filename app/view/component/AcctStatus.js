Ext.define('Zixweb.view.component.AcctStatus', {
			extend : 'Zixweb.view.component.base.ComboBox',
			alias : 'widget.acctStatus',
			name : 'valid',
			fieldLabel : '使用状态',
			_data : [{
						"id" : 1,
						"name" : "启用"
					}, {
						"id" : 2,
						"name" : "禁用"
					}]
		});
