Ext.define('Zixweb.view.component.FcgDate', {
			extend : 'Ext.form.FieldContainer',
			alias : 'widget.fcg_date',
			fieldLabel : '商品采购日期',
			margin : '0 10 0 0',
			layout : 'hbox',
			items : [{
						xtype : 'datefield',
						name : 'fcg_date_from',
						margin : '0 10 0 0',
						width : 180
					}, {
						xtype : 'datefield',
						name : 'fcg_date_to',
						margin : '0 10 0 0',
						width : 180
					}]
		});
