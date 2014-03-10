Ext.define('Zixweb.view.pzlr.job', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.pzlrjob',

	initComponent : function() {
		var me = this, store, grid;
		store = Ext.create('widget.mystore', {
					fields : ['id', 'type', 'date', 'index', 'total', 'fail',
							'succ', 'ts_u', 'ts_c', 'jstatus', 'color'],
					proxy : {
						type : 'ajax',
						api : {
							read : 'pzlr/job'
						},
						reader : {
							type : 'json',
							root : 'data',
							totalProperty : 'totalCount',
							successProperty : 'success'
						}
					}
				});
		grid = new Ext.grid.Panel({
			store : store,
			viewConfig : {
				getRowClass : function(record) {
					var color;
					var jstatus = parseInt(record.data.jstatus);
					if (jstatus == 1) {
						color = 'yellow';
					} else if (jstatus == 2) {
						color = 'green';
					} else if (jstatus == -1) {
						color = 'red';
					}
					return color;
				}
			},
			columns : [{
						text : "ID",
						dataIndex : 'id',
						width : 80
					}, {
						text : "顺序号",
						dataIndex : 'index',
						flex : 1
					}, {
						text : "类型",
						dataIndex : 'type',
						flex : 1
					}, {
						text : "日期",
						dataIndex : 'date',
						flex : 1
					}, {
						text : "记录数",
						dataIndex : 'total',
						flex : 1
					}, {
						text : "成功数",
						dataIndex : 'succ',
						flex : 1
					}, {
						text : "失败数",
						dataIndex : 'fail',
						flex : 1
					}, {
						text : "启动时间",
						dataIndex : 'ts_c',
						flex : 2
					}, {
						text : "结束时间",
						dataIndex : 'ts_u',
						flex : 2
					}, {
						text : "状态",
						dataIndex : 'jstatus',
						width : 80,
						renderer : function(value, metaData, record, rowIndex,
								colIndex, store, view) {
							var jstatus = Ext.data.StoreManager
									.lookup('JStatus');
							return jstatus.getAt(jstatus.findExact('id',
									parseInt(value))).data.name;
						}
					}, {
						xtype : 'actioncolumn',
						width : 80,
						text : '操作',
						align : 'center',
						items : [{
							tooltip : '查看日志',
							getClass : function(v, meta, rec) {
								var jstatus = parseInt(rec.data.jstatus);
								if (jstatus != 1) {
									return 'showlog';
								}
								return 'hide';
							},
							handler : function(grid, rowIndex, colIndex) {
								var data = {}, rec = grid.getStore()
										.getAt(rowIndex);
								data.action = 'get_log';
								data.date = rec.data.date;
								data.type = rec.data.type;
								data.id = rec.data.id;
								Ext.Ajax.request({
									async : false,
									url : 'pzlr/action',
									params : data,
									success : function(response) {
										var res = Ext
												.decode(response.responseText);
										if (res.success) {
											Ext.MessageBox.show({
												title : '日志查看',
												msg : Ext
														.decode(response.responseText).text,
												buttons : Ext.Msg.YES
											});
										} else {
											Ext.MessageBox.show({
														title : '警告',
														msg : res.msg,
														buttons : Ext.Msg.YES,
														icon : Ext.Msg.ERROR
													});
										}
									}
								});
							}
						}, {
							tooltip : '运行任务',
							getClass : function(v, meta, rec) {
								var jstatus = parseInt(rec.data.jstatus);
								if (jstatus == 1 || jstatus == -1) {
									return 'startjob';
								}
								return 'hide';
							},
							handler : function(grid, rowIndex, colIndex) {
								Ext.MessageBox.confirm('提示', '提交[运行任务]操作请求',
										function(opt) {
											if (opt === 'yes') {
												var data = {}, rec = grid
														.getStore()
														.getAt(rowIndex);
												data.action = 'run_job';
												data.date = rec.data.date;
												data.type = rec.data.type;
												data.id = rec.data.id;
												Ext.Ajax.request({
													async : false,
													url : 'pzlr/action',
													params : data,
													success : function(response) {
														var res = Ext
																.decode(response.responseText);
														if (res.success) {
															Ext.MessageBox
																	.show({
																		title : '提示',
																		msg : '[运行任务]请求提交成功',
																		closable : false,
																		buttons : Ext.Msg.YES,
																		icon : Ext.Msg.INFO
																	});
															store.reload();
														} else {
															Ext.MessageBox
																	.show({
																		title : '警告',
																		msg : res.msg,
																		buttons : Ext.Msg.YES,
																		icon : Ext.Msg.ERROR
																	});
														}
													}
												});
											}
										})
							}
						}]
					}]
		});
		me.items = [grid];
		me.dockedItems = [{
					xtype : 'toolbar',
					dock : 'top',
					items : [{
								iconCls : 'refresh',
								text : '刷新',
								tooltip : '刷新',
								handler : function() {
									store.reload();
								}
							}]
				}];
		me.callParent(arguments);
	}
});