Ext.define('Zixweb.view.component.MyStore', {
			extend : 'Ext.data.Store',
			alias : 'widget.mystore',
			pageSize : 50,

			listeners : {
				load : function(me, records, successful, eOpts) {
					if (!successful) {
						Ext.MessageBox.show({
									title : '警告',
									msg : '数据加载失败',
									buttons : Ext.Msg.YES,
									icon : Ext.Msg.ERROR
								});
						return;
					}
					var jsonData = me.proxy.reader.jsonData.success;
					if (jsonData && jsonData === 'forbidden') {
						Ext.MessageBox.show({
									title : '警告',
									msg : '没有访问权限',
									buttons : Ext.Msg.YES,
									icon : Ext.Msg.ERROR
								});
						return;
					}
					var exportBtn = me._exportBtn;
					if (exportBtn) {
						if (records.length > 0) {
							exportBtn.setDisabled(false);
						} else {
							exportBtn.setDisabled(true);
						}
					}
				},
				beforeload : function(me, operation, eOpts) {
					var form = me._form, columns = me._columns, grid = me._grid;
					if (form && form.down('hsx')) {
						var values = form.getForm().getValues();
						var cols = [];
						var hsxes = [];
						var list = Ext.hsx;
						for (var i in list) {
							if (values[list[i]]) {
								hsxes.push(values[list[i]]);
							}
						}
						if (hsxes.length == 0) {
							for (var key in columns) {
								cols.push(columns[key]);
							}
						} else {
							for (var i = 0; i < hsxes.length; i++) {
								cols.push(columns[hsxes[i]]);
							}
							cols.push(columns.j);
							cols.push(columns.d);
						}
						grid.reconfigure(me, cols);
					}
				}
			}
		});
