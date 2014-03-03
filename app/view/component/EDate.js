Ext.define('Zixweb.view.component.EDate', {
			extend : 'Ext.form.FieldContainer',
			alias : 'widget.e_date',
			fieldLabel : '差错日期',
			layout : 'hbox',
			items : [{
						xtype : 'datefield',
						name : 'e_date_from',
						margin : '0 10 0 0',
						width : 180
					}, {
						xtype : 'datefield',
						name : 'e_date_to',
						margin : '0 10 0 0',
						width : 180
					}]
		});
