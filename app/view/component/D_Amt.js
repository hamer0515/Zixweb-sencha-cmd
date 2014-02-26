Ext.define('Zixweb.view.component.D_Amt', {
			extend : 'Ext.form.FieldContainer',
			alias : 'widget.d_amt',
			layout : 'hbox',
			fieldLabel : '贷方金额',
			items : [{
						xtype : 'money',
						name : 'd_from',
						margin : '0 10 0 0',
						width : 180
					}, {
						xtype : 'money',
						name : 'd_to',
						width : 180
					}]
		});
