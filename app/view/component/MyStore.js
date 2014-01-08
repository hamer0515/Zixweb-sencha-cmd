Ext.define('Zixweb.view.component.MyStore', {
			extend : 'Ext.data.Store',
			alias : 'widget.mystore',
			pageSize : 50,

			listeners : {
				load : function(me, records, successful, eOpts) {
					if (!successful) {
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
					operation.callback = function(records, op, success) {
						if (!success)
							Ext.MessageBox.show({
										title : '错误',
										msg : op.error.status + ' '
												+ op.error.statusText,
										buttons : Ext.Msg.YES,
										icon : Ext.Msg.ERROR
									});
					}
					var form = me._form, columns = me._columns, grid = me._grid;
					if (form) {
						if (!form.isValid()) {
							return false;
						}
						if (form.down('hsx')) {
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
								// 科目汇总查询时增加借贷金额列
								cols.push(columns.j);
								cols.push(columns.d);
								// 挂帐情况查询时增加载长短款金额列
								cols.push(columns.blc);
								cols.push(columns.bsc);
								cols.push(columns.action);
							}
							grid.reconfigure(me, cols);
						}
					}

				}
			}
		});
