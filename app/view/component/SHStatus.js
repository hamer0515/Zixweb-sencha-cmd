Ext.define('Zixweb.view.component.SHStatus', {
			extend : 'Ext.form.ComboBox',
			alias : 'widget.shstatus',
			width : 288,
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
										"name" : "待审核"
									}, {
										"id" : 1,
										"name" : "审核通过"
									}, {
										"id" : 2,
										"name" : "审核未通过"
									}]
						});
				this.valueField = 'id';
				this.displayField = 'name';
				this.callParent(arguments);
			}
		});
