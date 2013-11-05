Ext.define('Zixweb.view.component.SHType', {
			extend : 'Ext.form.ComboBox',
			alias : 'widget.shtype',
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
										"id" : 1,
										"name" : "特种调账单"
									}, {
										"id" : 2,
										"name" : "凭证撤销"
									}]
						});
				this.valueField = 'id';
				this.displayField = 'name';
				this.callParent(arguments);
			}
		});
