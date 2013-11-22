Ext.define('Zixweb.view.component.Fields', {
			extend : 'Ext.window.Window',
			alias : 'widget.tablefields',
			title : '请选择需要的字段',
			width : 500,
			layout : 'fit',
			autoShow : true,

			initComponent : function() {
				var win = this;
				var items = [];
				Ext.Ajax.request({
							async : false,
							url : 'base/table_headers',
							params : {
								id : win.bid,
								type : 'book'
							},
							success : function(response, opts) {
								items = Ext.decode(response.responseText);
							},
							failure : function(response, opts) {
								Ext.MessageBox.show({
											title : '警告',
											msg : '服务器端出错，错误码:'
													+ response.status,
											buttons : Ext.Msg.YES,
											icon : Ext.Msg.ERROR
										});
							}
						});
				this.items = [{
							xtype : 'form',
							border : false,
							bodyPadding : 5,
							items : [{
										xtype : 'checkboxgroup',
										columns : 4,
										vertical : true,
										items : items
									}]
						}];

				this.buttons = [{
					text : '确定',
					action : 'submit',
					handler : function() {
						var header = win.down('form').getValues();
						console.log(header);
						console.log(header.length);
						console.log(Object.keys(header).length);
						if (Object.keys(header).length == 0) {
							Ext.MessageBox.show({
										title : '警告',
										msg : '请至少选择一项',
										buttons : Ext.Msg.YES,
										icon : Ext.Msg.WARNING
									});
							return;
						}
						var params = win.params;
						params.header = Ext.encode(header);
						Ext.Ajax.request({
									async : false,
									url : win.url,
									params : params,
									success : function(response, opts) {
										var res = Ext
												.decode(response.responseText);
										Ext.downloadURL('base/excel?file='
												+ res.file);
										win.close();
									},
									failure : function(response, opts) {
										Ext.MessageBox.show({
													title : '警告',
													msg : '服务器端出错，错误码:'
															+ response.status,
													buttons : Ext.Msg.YES,
													icon : Ext.Msg.ERROR
												});
									}
								});
					}
				}, {
					text : '取消',
					scope : this,
					handler : this.close
				}];

				this.callParent(arguments);
			}
		});