Ext.define('Zixweb.view.component.hsx.period', {
			extend : 'Ext.form.FieldContainer',
			alias : 'widget.period',
			fieldLabel : '会计期间',
			layout : {
				type : 'hbox',
				align : 'stretch',
				defaultMargins : {
					right : 10
				}
			},
			initComponent : function() {
				var me = this, id = Ext.id(), period_from = Ext.create(
						'Ext.form.field.Date', {
							name : 'period_from',
							allowBlank : false,
							verify : {
								id : id
							},
							vtype : 'dateinterval',
							minWidth : 180
						}), period_to = Ext.create('Ext.form.field.Date', {
							name : 'period_to',
							allowBlank : false,
							id : id,
							listeners : {
								blur : function() {
									period_from.isValid();
								}
							},
							minWidth : 180
						});
				me.items = [period_from, period_to];
				me.callParent(arguments);
			}
		});
