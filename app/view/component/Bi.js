Ext.define('Zixweb.view.component.Bi', {
			extend : 'Ext.form.ComboBox',
			alias : 'widget.bi',
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
							autoLoad : true,

							proxy : {
								type : 'ajax',
								url : 'base/bi_dict'
							},
							listeners : {
								load : function(me, records, successful,
										eOpts) {
									if (!successful) {
										Ext.MessageBox.show({
													title : '警告',
													msg : '银行接口数据加载失败,请联系管理员',
													buttons : Ext.Msg.YES,
													icon : Ext.Msg.ERROR
												});
										return;
									}
									var jsonData = me.proxy.reader.jsonData.success;
									if (jsonData && jsonData === 'forbidden') {
										Ext.MessageBox.show({
													title : '警告',
													msg : '抱歉，没有银行接口数据访问权限',
													buttons : Ext.Msg.YES,
													icon : Ext.Msg.ERROR
												});
									}
								}
							}
						});
				this.valueField = 'id';
				this.displayField = 'name';
				this.callParent(arguments);
			}
		});
