Ext.define('Zixweb.view.component.SHType', {
			extend : 'Ext.form.ComboBox',
			alias : 'widget.shtype',
			width : 516,
			queryMode : 'local',
			anyMatch : true,
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
				me.store = new Ext.data.Store({
							fields : ['id', 'name'],
							data : [{
										"id" : 1,
										"name" : "特种调账单"
									}, {
										"id" : 2,
										"name" : "凭证撤销"
									}]
						});
				me.callParent(arguments);
			}
		});
