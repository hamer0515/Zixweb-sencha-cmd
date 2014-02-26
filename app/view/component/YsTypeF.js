Ext.define('Zixweb.view.component.YsTypeF', {
			extend : 'Ext.form.ComboBox',
			alias : 'widget.ystypef',
			width : 516,
			queryMode : 'local',
			anyMatch : true,
			name : 'ys_type',
			margin : '0 10 0 0',
			fieldLabel : '原始凭证类型',
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
							autoLoad : true,

							proxy : {
								type : 'ajax',
								url : 'base/ystype',
								extraParams : {
									entity : 2
								}
							}
						});
				me.callParent(arguments);
			}
		});
