Ext.define('Zixweb.view.component.ZjbdDate', {
			extend : 'Ext.form.FieldContainer',
			alias : 'widget.zjbd_date',
			fieldLabel : '资金变动日期',
			layout : 'hbox',
			items : [{
						xtype : 'datefield',
						name : 'zjbd_date_from',
						margin : '0 10 0 0',
						width : 180
					}, {
						xtype : 'datefield',
						name : 'zjbd_date_to',
						margin : '0 10 0 0',
						width : 180
					}]
		});
