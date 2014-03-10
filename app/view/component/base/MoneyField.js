Ext.define('Zixweb.view.component.base.MoneyField', {
			extend : 'Ext.form.FieldContainer',
			layout : {
						type : 'hbox',
						defaultMargins : {
							right : 10
						}
					},
			initComponent : function() {
				var me = this, cls = Ext.getClassName(me).split('.').pop();
				Ext.apply(me, {
							items : [{
										xtype : 'money',
										name : cls + '_from',
										width : 180
									}, {
										xtype : 'money',
										name : cls + '_to',
										width : 180
									}]
						})
				me.callParent(arguments);
			}
		});
