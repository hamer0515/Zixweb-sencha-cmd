Ext.define('Zixweb.store.component.Books', {
			extend : 'Ext.data.Store',
			fields : ['id', 'name'],
			autoLoad : true,

			proxy : {
				type : 'ajax',
				url : 'base/books'
			},
			listeners : {
				load : function(thiz, records, successful, eOpts) {
					if (!successful) {
						Ext.MessageBox.show({
									title : '警告',
									msg : '科目字典数据加载失败,请联系管理员',
									buttons : Ext.Msg.YES,
									icon : Ext.Msg.ERROR
								});
						return;
					}
					var jsonData = thiz.proxy.reader.jsonData.success;
					if (jsonData && jsonData === 'forbidden') {
						Ext.MessageBox.show({
									title : '警告',
									msg : '抱歉，没有科目字典数据访问权限',
									buttons : Ext.Msg.YES,
									icon : Ext.Msg.ERROR
								});
					}
				},
				filterchange:function( store, filters, eOpts ){
					console.log(filters);
				}
			}
		});