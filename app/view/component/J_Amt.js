Ext.define('Zixweb.view.component.J_Amt', {
			extend : 'Ext.form.FieldContainer',
			alias : 'widget.j_amt',
			layout : 'hbox',
			fieldLabel : '借方金额',
			items : [{
						xtype : 'money',
						name : 'j_from',
						margin : '0 10 0 0',
						width : 180
					}, {
						xtype : 'money',
						name : 'j_to',
						width : 180,
						margin : '0 10 0 0'
					}]
		});
