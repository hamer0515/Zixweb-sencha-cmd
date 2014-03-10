Ext.define('Zixweb.view.pzlr.mission', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.pzlrmission',

	initComponent : function() {
		var me = this, store, grid, form;
		store = Ext.create('widget.mystore', {
			_form : form = Ext.create('widget.queryform', {
						items : [{
									xtype : 'fieldcontainer',
									layout : 'hbox',
									items : [{
												xtype : 'ystype',
												name : 'type',
												margin : '0 10 0 0',
												fieldLabel : '原始凭证类型'
											}]

								}, {
									xtype : 'fieldcontainer',
									layout : 'hbox',
									items : [{
												xtype : 'mstatus',
												name : 'status',
												margin : '0 10 0 0',
												fieldLabel : '状态'
											}, {
												xtype : 'datefield',
												fieldLabel : '生成日期',
												format : 'Y-m-d',
												name : 'date',
												width : 360
											}]

								}, {
									xtype : 'button',
									text : '查询',
									margin : '0 20 0 0',
									handler : function() {
										store.proxy.extraParams = form
												.getForm().getValues();
										store.loadPage(1);
									}
								}, {
									xtype : 'button',
									text : '重置',
									handler : function(button) {
										form.getForm().reset();
									}
								}]
					}),
			fields : ['id', 'type', 'date', 'total', 'fail', 'succ', 'mstatus'],

			proxy : {
				type : 'ajax',
				api : {
					read : 'pzlr/mission'
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
			columns : [{
						text : "ID",
						dataIndex : 'id',
						sortable : false,
						flex : 1
					}, {
						text : "凭证类型",
						dataIndex : 'type',
						sortable : false,
						flex : 1
					}, {
						text : "生成日期",
						dataIndex : 'date',
						sortable : false,
						flex : 1
					}, {
						text : "总记录数",
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
						text : "状态",
						dataIndex : 'mstatus',
						sortable : false,
						flex : 1,
						renderer : function(value, metaData) {
							var mstatus = Ext.data.StoreManager
									.lookup('MStatus');
							var index = mstatus.findExact('id', value);
							if (value == 1 || value == 3 || value == 5) {
								metaData.style = 'background-color:yellow';
							} else if (value == 2 || value == 4 || value == 6) {
								metaData.style = 'background-color:green';
							} else if (value == -1 || value == -2
									|| value == -3) {
								metaData.style = 'background-color:red';
							}
							return mstatus.getAt(index).data.name;
						}
					}, {
						xtype : 'actioncolumn',
						text : '操作',
						width : 80,
						align : 'center',
						items : [{
							tooltip : '下载文件',
							getClass : function(v, meta, rec) {
								var mstatus = parseInt(rec.data.mstatus);
								if (mstatus == 1) {
									return 'downloadfile';
								}
								return 'hide';
							},
							handler : function(grid, rowIndex, colIndex) {
								Ext.MessageBox.confirm('提示', '提交[下载文件]操作请求',
										function(opt) {
											if (opt === 'yes') {
												var data = {}, rec = grid
														.getStore()
														.getAt(rowIndex);
												data.action = 'down_file';
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
																		msg : '[文件下载]请求提交成功',
																		closable : false,
																		buttons : Ext.Msg.YES,
																		icon : Ext.Msg.INFO
																	});
															store.reload();
														} else {
															Ext.MessageBox
																	.show({
																		title : '错误',
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
						}, {
							tooltip : '分配任务',
							getClass : function(v, meta, rec) {
								var mstatus = parseInt(rec.data.mstatus);
								if (mstatus == 3) {
									return 'assignjob';
								}
								return 'hide';
							},
							handler : function(grid, rowIndex, colIndex) {
								Ext.MessageBox.confirm('提示', '提交[分配任务]操作请求',
										function(opt) {
											if (opt === 'yes') {
												var data = {}, rec = grid
														.getStore()
														.getAt(rowIndex);
												data.action = 'assign_job';
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
																		msg : '[分配任务]请求提交成功',
																		closable : false,
																		buttons : Ext.Msg.YES,
																		icon : Ext.Msg.INFO
																	});
															store.reload();
														} else {
															Ext.MessageBox
																	.show({
																		title : '错误',
																		msg : res.msg,
																		buttons : Ext.Msg.YES,
																		icon : Ext.Msg.ERROR
																	});
														}
													}
												});
											}
										});
							}
						}, {
							tooltip : '启动任务',
							getClass : function(v, meta, rec) {
								var mstatus = parseInt(rec.data.mstatus);
								if (mstatus == 5) {
									return 'startjob';
								}
								return 'hide';
							},
							handler : function(grid, rowIndex, colIndex) {
								Ext.MessageBox.confirm('提示', '提交[启动任务]操作请求',
										function(opt) {
											if (opt === 'yes') {
												var data = {}, rec = grid
														.getStore()
														.getAt(rowIndex);
												data.action = 'run_mission';
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
																		msg : '[启动任务]请求提交成功',
																		closable : false,
																		buttons : Ext.Msg.YES,
																		icon : Ext.Msg.INFO
																	});
															store.reload();
														} else {
															Ext.MessageBox
																	.show({
																		title : '错误',
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
						}, {
							tooltip : '重新下载',
							getClass : function(v, meta, rec) {
								var mstatus = parseInt(rec.data.mstatus);
								if (mstatus == -1) {
									return 'downloadfileagain';
								}
								return 'hide';
							},
							handler : function(grid, rowIndex, colIndex) {
								Ext.MessageBox.confirm('提示', '提交[重新下载]操作请求',
										function(opt) {
											if (opt === 'yes') {
												var data = {}, rec = grid
														.getStore()
														.getAt(rowIndex);
												data.action = 'down_file';
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
																		msg : '[重新下载]请求提交成功',
																		closable : false,
																		buttons : Ext.Msg.YES,
																		icon : Ext.Msg.INFO
																	});
															store.reload();
														} else {
															Ext.MessageBox
																	.show({
																		title : '错误',
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
						}, {
							tooltip : '重新分配',
							getClass : function(v, meta, rec) {
								var mstatus = parseInt(rec.data.mstatus);
								if (mstatus == -2) {
									return 'assignjobagain';
								}
								return 'hide';
							},
							handler : function(grid, rowIndex, colIndex) {
								Ext.MessageBox.confirm('提示', '提交[重新分配]操作请求',
										function(opt) {
											if (opt === 'yes') {
												var data = {}, rec = grid
														.getStore()
														.getAt(rowIndex);
												data.action = 'assign_job';
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
																		msg : '[重新分配]请求提交成功',
																		closable : false,
																		buttons : Ext.Msg.YES,
																		icon : Ext.Msg.INFO
																	});
															store.reload();
														} else {
															Ext.MessageBox
																	.show({
																		title : '错误',
																		msg : res.msg,
																		buttons : Ext.Msg.YES,
																		icon : Ext.Msg.ERROR
																	});
														}
													}
												});
											}
										});
							}
						}, {
							tooltip : '详细',
							getClass : function(v, meta, rec) {
								var mstatus = parseInt(rec.data.mstatus);
								if (mstatus == 5 || mstatus == 6
										|| mstatus == 7 || mstatus == -3) {
									return 'detail';
								}
								return 'hide';
							},
							handler : function(grid, rowIndex, colIndex) {
								var rec = grid.getStore().getAt(rowIndex), center = grid
										.up('center'), id = 'job_'
										+ rec.data.id, cmp = Ext.getCmp(id);
								if (cmp) {
									center.setActiveTab(cmp);
								} else {
									var pzlrjob = Ext
											.createByAlias('widget.pzlrjob');
									pzlrjob.down('gridpanel').store.load({
												params : {
													id : rec.data.id
												}
											});
									center.add({
												closable : true,
												xtype : 'panel',
												items : pzlrjob,
												id : id,
												title : '任务' + rec.data.id
														+ '详细信息'
											}).show();
								}
							}
						}]
					}]
		});
		// 添加底部分页工具栏
		grid.addDocked({
					xtype : 'pagingtoolbar',
					store : store,
					dock : 'bottom'
				});
		me.items = [form, grid];
		store.proxy.extraParams = form.getForm().getValues();
		store.loadPage(1);
		me.callParent(arguments);
	}
});