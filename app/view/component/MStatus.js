Ext.define('Zixweb.view.component.MStatus', {
			extend : 'Ext.form.ComboBox',
			alias : 'widget.mstatus',
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
				this.store = 'Zixweb.store.component.MStatus';
				this.valueField = 'id';
				this.displayField = 'name';
				this.callParent(arguments);
			}
		});
