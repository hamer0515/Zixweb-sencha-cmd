Ext.define('Zixweb.view.component.Period', {
			extend : 'Ext.form.FieldContainer',
			alias : 'widget.period',
			fieldLabel : '会计期间',
			layout : 'hbox',
			initComponent : function() {
				var me = this, id = Ext.id(), period_from = Ext.create(
						'Ext.form.field.Date', {
							format : 'Y-m-d',
							name : 'period_from',
							margin : '0 10 0 0',
							allowBlank : false,
							verify : {
								id : id
							},
							vtype : 'dateinterval',
							width : 180
						}), period_to = Ext.create('Ext.form.field.Date', {
							format : 'Y-m-d',
							name : 'period_to',
							margin : '0 10 0 0',
							allowBlank : false,
							id : id,
							listeners : {
								blur : function() {
									period_from.isValid();
								}
							},
							width : 180
						});
				me.items = [period_from, period_to];
				me.callParent(arguments);
			}
		});
