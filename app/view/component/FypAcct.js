Ext.define('Zixweb.view.component.FypAcct', {
			extend : 'Ext.form.ComboBox',
			alias : 'widget.fyp_acct',
			width : 516,
			queryMode : 'local',
			anyMatch : true,
			name : 'fyp_acct',
			fieldLabel : '易宝中间账户号',
			margin : '0 10 0 0',
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
				me.store = Ext.create('widget.mystore', {
							fields : ['id', 'name'],
							autoLoad : true,

							proxy : {
								type : 'ajax',
								url : 'base/fypacct'
							}
						});

				me.callParent(arguments);
			}
		});
