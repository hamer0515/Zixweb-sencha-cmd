Ext.define('Zixweb.view.component.RStatus', {
			extend : 'Ext.form.ComboBox',
			alias : 'widget.rstatus',
			width : 516,
			queryMode : 'local',
			anyMatch : true,
			fieldLabel : '撤销状态',
			margin : '0 10 0 0',
			name : 'flag',
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
										"name" : "未撤销"
									}, {
										"id" : 1,
										"name" : "已撤销"
									}, {
										"id" : 2,
										"name" : "撤销申请中"
									}]
						});

				me.callParent(arguments);
			}
		});
