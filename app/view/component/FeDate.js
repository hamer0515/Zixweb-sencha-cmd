Ext.define('Zixweb.view.component.FeDate', {
			extend : 'Ext.form.FieldContainer',
			alias : 'widget.fe_date',
			fieldLabel : '差错日期',
			layout : 'hbox',
			items : [{
						xtype : 'datefield',
						name : 'fe_date_from',
						margin : '0 10 0 0',
						width : 180
					}, {
						xtype : 'datefield',
						name : 'fe_date_to',
						margin : '0 10 0 0',
						width : 180
					}]
		});
