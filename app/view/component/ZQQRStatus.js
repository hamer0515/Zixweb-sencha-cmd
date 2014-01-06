Ext.define('Zixweb.view.component.ZQQRStatus', {
			extend : 'Ext.form.ComboBox',
			alias : 'widget.zqqrstatus',
			width : 516,
			queryMode : 'local',
			anyMatch : true,
			listeners : {
				blur : function(self, The, eOpts) {
					var value = self.getValue();
					var result = self.getStore().queryBy(function(record) {
								if (record.data.id == value) {
									return true;
								}
								return false;
							});
					if (result.length == 0) {
						self.setValue('');
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
										id : -1,
										name : '无'
									}, {
										id : -2,
										name : '生成失败'
									}, {
										id : 1,
										name : '可生成'
									}, {
										id : 2,
										name : '生成中'
									}, {
										id : 3,
										name : '生成成功'
									}]
						});
				me.callParent(arguments);
			}
		});
