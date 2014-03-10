Ext.define('Zixweb.view.component.SHType', {
			extend : 'Zixweb.view.component.base.ComboBox',
			alias : 'widget.shtype',
			name : 'type',
			fieldLabel : '审核类型',
			_data : [{
						"id" : 1,
						"name" : "特种调账单"
					}, {
						"id" : 2,
						"name" : "凭证撤销"
					}]
		});
