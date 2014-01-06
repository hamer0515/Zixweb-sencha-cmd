Ext.define('Zixweb.store.component.YsType', {
			extend : 'Ext.data.Store',
			fields : ['id', 'name'],

			proxy : {
				type : 'ajax',
				url : 'base/ystype'
			},
			listeners : {
				beforeload : function(store, operation, eOpts) {
					store.removeAll();
				},
				load : function(thiz, records, successful, eOpts) {
					if (!successful) {
						Ext.MessageBox.show({
									title : '警告',
									msg : '凭证类型数据加载失败,请联系管理员',
									buttons : Ext.Msg.YES,
									icon : Ext.Msg.ERROR
								});
						return;
					}
					var jsonData = thiz.proxy.reader.jsonData.success;
					if (jsonData && jsonData === 'forbidden') {
						Ext.MessageBox.show({
									title : '警告',
									msg : '抱歉，没有凭证类型数据访问权限',
									buttons : Ext.Msg.YES,
									icon : Ext.Msg.ERROR
								});
					}
				}
			}
		});