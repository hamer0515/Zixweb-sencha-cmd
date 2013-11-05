Ext.define('Zixweb.view.component.RStatus', {
			extend : 'Ext.form.ComboBox',
			alias : 'widget.rstatus',
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
			initComponent : function() {
				this.store = new Ext.data.Store({
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
				this.valueField = 'id';
				this.displayField = 'name';
				this.callParent(arguments);
			}
		});
