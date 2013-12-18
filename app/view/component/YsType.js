Ext.define('Zixweb.view.component.YsType', {
			extend : 'Ext.form.ComboBox',
			alias : 'widget.ystype',
			width : 516,
			queryMode : 'local',
			anyMatch : true,

			initComponent : function() {
				this.store = new Ext.data.Store({
							fields : ['id', 'name'],
							autoLoad : true,

							proxy : {
								type : 'ajax',
								url : 'base/ystype',
								extraParams : {
									entity : 1
								}
							},

							listeners : {
								load : function(me, records, successful,
										eOpts) {
									if (!successful) {
										Ext.MessageBox.show({
													title : '警告',
													msg : '凭证状态字典数据加载失败,请联系管理员',
													buttons : Ext.Msg.YES,
													icon : Ext.Msg.ERROR
												});
										return;
									}
									var jsonData = me.proxy.reader.jsonData.success;
									if (jsonData && jsonData === 'forbidden') {
										Ext.MessageBox.show({
													title : '警告',
													msg : '抱歉，没有凭证状态字典数据访问权限',
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
