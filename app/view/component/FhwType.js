Ext.define('Zixweb.view.component.FhwType', {
			extend : 'Ext.form.ComboBox',
			alias : 'widget.fhw_type',
			width : 516,
			queryMode : 'local',
			anyMatch : true,
			name : 'fhw_type',
			fieldLabel : '货物类型',
			margin : '0 10 0 0',
			listeners : {
				blur : function(me, The, eOpts) {
					var value = me.getValue();
					var result = me.getStore().queryBy(function(record) {
								if (record.data.id == value) {
									return true;
								}
								return false;
							});
					if (result.length == 0) {
						me.setValue('');
					}
				}
			},
			valueField : 'id',
			displayField : 'name',
			initComponent : function() {
				var me = this;
				me.store = Ext.create('widget.mystore', {
							fields : ['id', 'name'],
							autoLoad : true,

							proxy : {
								type : 'ajax',
								url : 'base/fhwtype'
							}
						});
				me.callParent(arguments);
			}
		});
