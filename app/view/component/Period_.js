Ext.define('Zixweb.view.component.Period_', {
			extend : 'Ext.form.FieldContainer',
			alias : 'widget.period_',
			fieldLabel : '会计期间',
			layout : 'hbox',
			items : [{
						xtype : 'datefield',
						name : 'period_from',
						margin : '0 10 0 0',
						width : 180
					}, {
						xtype : 'datefield',
						name : 'period_to',
						margin : '0 10 0 0',
						width : 180
					}]
		});
