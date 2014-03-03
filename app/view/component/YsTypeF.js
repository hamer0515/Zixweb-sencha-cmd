Ext.define('Zixweb.view.component.YsTypeF', {
			extend : 'Zixweb.view.component.ComboBox',
			alias : 'widget.ystypef',
			name : 'ys_type',
			margin : '0 10 0 0',
			fieldLabel : '原始凭证类型',
			_url : 'base/ystype',
			_extraParams : {
				entity : 2
			}
		});
