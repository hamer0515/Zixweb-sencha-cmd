Ext.define('Zixweb.view.component.TxDate', {
			extend : 'Ext.form.FieldContainer',
			alias : 'widget.tx_date',
			fieldLabel : '交易日期',
			layout : 'hbox',
			items : [{
						xtype : 'datefield',
						name : 'tx_date_from',
						margin : '0 10 0 0',
						width : 180
					}, {
						xtype : 'datefield',
						name : 'tx_date_to',
						margin : '0 10 0 0',
						width : 180
					}]
		});
