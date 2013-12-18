Ext.define('Zixweb.view.component.ExportBtn', {
			extend : 'Ext.button.Button',
			alias : 'widget.exportbtn',
			text : '导出Excel',
			disabled : true,
			initComponent : function() {
				var me = this, grid = me._grid, url = me._url;
				me.handler = function() {
					var count = grid.store.getTotalCount();
					if (count == 0) {
						return;
					} else if (count > 10000) {
						Ext.MessageBox.show({
									title : '警告',
									msg : '数据量超过上限10000条',
									buttons : Ext.Msg.YES,
									icon : Ext.Msg.WARNING
								});
						return;
					}
					var params = grid.store.proxy.extraParams;
					var columns = grid.headerCt.gridDataColumns;
					var h = {
						headers : []
					};
					for (var i in columns) {
						var c = columns[i];
						if (!c.dataIndex) {
							continue;
						}
						h[c.dataIndex] = c.text;
						h.headers.push(c.dataIndex);
					}
					params.header = Ext.encode(h);
					Ext.Ajax.request({
								async : false,
								url : url,
								params : params,
								success : function(response, opts) {
									var res = Ext.decode(response.responseText);
									Ext.downloadURL('base/excel?file='
											+ res.file);
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
				};
				this.callParent(arguments);
			}
		});
