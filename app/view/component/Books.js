Ext.define('Zixweb.view.component.Books', {
			extend : 'Ext.form.ComboBox',
			alias : 'widget.books',
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
							fields : ['id', 'name', 'set'],
							autoLoad : true,

							proxy : {
								type : 'ajax',
								url : 'base/books'
							},
							listeners : {
								beforeload : function(store, operation, eOpts) {
									store.proxy.extraParams = {
										set : Ext.encode(me.set)
									};
								}
							}
						});

				me.callParent(arguments);
			}
		});
