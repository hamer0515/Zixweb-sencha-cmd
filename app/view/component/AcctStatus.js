Ext.define('Zixweb.view.component.AcctStatus', {
			extend : 'Ext.form.ComboBox',
			alias : 'widget.acctStatus',
			queryMode : 'local',
			anyMatch : true,
			autoShow : true,
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
										"id" : 1,
										"name" : "启用"
									}, {
										"id" : 2,
										"name" : "禁用"
									}]
						});
				this.valueField = 'id';
				this.displayField = 'name';
				this.callParent(arguments);
			}
		});
