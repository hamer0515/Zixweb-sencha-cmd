Ext.define('Zixweb.view.pzlr.job', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.pzlrjob',

	defaults : {
		border : false
	},

	initComponent : function() {
		var store = new Ext.data.Store({
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
					},
					listeners : {
						load : function(thiz, records, successful, eOpts) {
							if (!successful) {
								Ext.MessageBox.show({
											title : '警告',
											msg : '数据加载失败,请联系管理员',
											buttons : Ext.Msg.YES,
											icon : Ext.Msg.ERROR
										});
							}
						}
					}
				});
		this.dockedItems = [{
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
		this.store = store;
		this.items = [{
			xtype : 'gridpanel',
			height : 'auto',
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
			store : this.store,
			columns : [{
						text : "ID",
						itemId : 'id',
						dataIndex : 'id',
						sortable : false,
						flex : 0.8
					}, {
						text : "顺序号",
						dataIndex : 'index',
						sortable : false,
						flex : 0.8
					}, {
						text : "类型",
						dataIndex : 'type',
						sortable : false,
						flex : 0.8
					}, {
						text : "日期",
						dataIndex : 'date',
						sortable : false,
						flex : 1
					}, {
						text : "记录数",
						dataIndex : 'total',
						sortable : false,
						flex : 1
					}, {
						text : "成功数",
						dataIndex : 'succ',
						sortable : false,
						flex : 1
					}, {
						text : "失败数",
						dataIndex : 'fail',
						sortable : false,
						flex : 1
					}, {
						text : "启动时间",
						dataIndex : 'ts_c',
						sortable : false,
						flex : 1.8
					}, {
						text : "结束时间",
						dataIndex : 'ts_u',
						sortable : false,
						flex : 1.8
					}, {
						text : "状态",
						dataIndex : 'jstatus',
						sortable : false,
						flex : 0.8,
						renderer : function(value, metaData, record, rowIndex,
								colIndex, store, view) {
							value = parseInt(value);
							var jstatus = Ext.data.StoreManager
									.lookup('Zixweb.store.component.JStatus');
							var index = jstatus.findExact('id', value);
							return jstatus.getAt(index).data.name;
						}
					}, {
						xtype : 'actioncolumn',
						flex : 0.8,
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
								var data = {};
								data.action = 'get_log';
								var rec = grid.getStore().getAt(rowIndex);
								data.date = rec.data.date;
								data.type = rec.data.type;
								data.id = rec.data.id;
								Ext.Ajax.request({
									async : false,
									url : 'pzlr/action',
									params : data,
									success : function(response) {
										var response = Ext
												.decode(response.responseText);
										var success = response.success
										if (success && success === 'forbidden') {
											Ext.MessageBox.show({
														title : '警告',
														msg : '抱歉，没有下載文件操作权限',
														buttons : Ext.Msg.YES,
														icon : Ext.Msg.ERROR
													});
											return;
										}
										Ext.MessageBox.show({
													title : '日志查看',
													msg : response.text,
													buttons : Ext.Msg.YES
												});
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
												var data = {};
												data.action = 'run_job';
												var rec = grid.getStore()
														.getAt(rowIndex);
												data.date = rec.data.date;
												data.type = rec.data.type;
												data.id = rec.data.id;
												Ext.Ajax.request({
													async : false,
													url : 'pzlr/action',
													params : data,
													success : function(response) {
														var response = Ext
																.decode(response.responseText).success;
														if (response) {
															if (response === 'forbidden') {
																Ext.MessageBox
																		.show({
																			title : '警告',
																			msg : '抱歉，没有运行任务操作权限',
																			buttons : Ext.Msg.YES,
																			icon : Ext.Msg.ERROR
																		});
																return;
															}
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
																		msg : '[运行任务]请求提交失败',
																		buttons : Ext.Msg.YES,
																		icon : Ext.Msg.ERROR
																	});
														}
													},
													failure : function(
															response, opts) {
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
										})
							}
						}]
					}]

		}];
		this.callParent(arguments);
	}
});