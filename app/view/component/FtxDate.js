Ext.define('Zixweb.view.component.FtxDate', {
			extend : 'Ext.form.FieldContainer',
			alias : 'widget.ftx_date',
			fieldLabel : '交易日期',
			layout : 'hbox',
			items : [{
						xtype : 'datefield',
						margin : '0 10 0 0',
						name : 'ftx_date_from',
						width : 180
					}, {
						xtype : 'datefield',
						margin : '0 10 0 0',
						name : 'ftx_date_to',
						width : 180
					}]
		});
