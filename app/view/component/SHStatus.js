Ext.define('Zixweb.view.component.SHStatus', {
			extend : 'Ext.form.ComboBox',
			alias : 'widget.shstatus',
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
										"id" : 0,
										"name" : "待审核"
									}, {
										"id" : 1,
										"name" : "审核通过"
									}, {
										"id" : 2,
										"name" : "审核未通过"
									}]
						});
				me.callParent(arguments);
			}
		});
