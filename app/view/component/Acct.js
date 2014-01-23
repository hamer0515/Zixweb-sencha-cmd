Ext.define('Zixweb.view.component.Acct', {
			extend : 'Ext.form.ComboBox',
			alias : 'widget.acct',
			width : 516,
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
				},
				focus : function(me, The, eOpts) {
					me.store.clearFilter();
				}
			},
			valueField : 'id',
			displayField : 'name',
			initComponent : function() {
				var me = this;
				me.store = Ext.create('widget.mystore', {
							fields : ['id', 'name'],
							autoLoad : true,

							proxy : {
								type : 'ajax',
								url : 'base/account'
							}
						});
				me.callParent(arguments);
			}
		});
