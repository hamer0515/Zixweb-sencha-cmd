Ext.define('Zixweb.view.component.AcctStatus', {
			extend : 'Ext.form.ComboBox',
			alias : 'widget.acctStatus',
			queryMode : 'local',
			anyMatch : true,
			listeners : {
				blur : function(me, The, eOpts) {
					var value = me.getValue(), result = me.getStore().queryBy(
							function(record) {
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
				me.store = new Ext.data.Store({
							fields : ['id', 'name'],
							data : [{
										"id" : 1,
										"name" : "启用"
									}, {
										"id" : 2,
										"name" : "禁用"
									}]
						});
				me.callParent(arguments);
			}
		});
