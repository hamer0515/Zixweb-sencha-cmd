Ext.define('Zixweb.view.task.TaskF0000', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.taskf0000',

	initComponent : function() {
		var me = this, store, grid, form;
		store = Ext.create('widget.mystore', {
					_form : form = Ext.create('widget.queryform', {
								items : [{
											xtype : 'fieldcontainer',
											fieldLabel : '创建日期',
											layout : 'hbox',
											items : [{
														xtype : 'datefield',
														format : 'Y-m-d',
														name : 'from',
														margin : '0 10 0 0',
														width : 180
													}, {
														xtype : 'datefield',
														format : 'Y-m-d',
														name : 'to',
														margin : '0 10 0 0',
														width : 180
													}, {
														xtype : 'shstatus',
														name : 'status',
														fieldLabel : '审核状态'
													}]
										}, {
											xtype : 'fieldcontainer',
											layout : 'hbox',
											items : [{
														xtype : 'textfield',
														name : 'id',
														margin : '0 10 0 0',
														width : 516,
														vtype : 'id',
														fieldLabel : '任务编号'
													}, {
														xtype : 'textfield',
														fieldLabel : '创建用户',
														width : 516,
														name : 'c_user'
													}]

										}, {
											xtype : 'button',
											text : '查询',
											margin : '0 20 0 0',
											handler : function() {
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
					fields : ['id', 'cause', 'c_user_name', 'ts_c', 'shstatus'],

					proxy : {
						type : 'ajax',
						api : {
							read : 'taskf0000/list'
						},
						reader : {
							type : 'json',
							root : 'data',
							totalProperty : 'totalCount',
							successProperty : 'success'
						}
					},
					listeners : {
						beforeload : function(store, operation, eOpts) {
							var values = form.getValues();
							if (form.isValid()) {
								if (values.from) {
									values.from += ' 00:00:00';
								}
								if (values.to) {
									values.to += ' 23:59:59';
								}
								store.proxy.extraParams = values;
							} else {
								return false;
							}
						}
					}
				});
		grid = new Ext.grid.Panel({
			store : store,
			columns : [{
						text : "任务编号",
						dataIndex : 'id',
						width : 80
					}, {
						text : "创建用户",
						dataIndex : 'c_user_name',
						flex : 1
					}, {
						text : "创建时间",
						dataIndex : 'ts_c',
						flex : 1
					}, {
						text : "审核状态",
						dataIndex : 'shstatus',
						flex : 1,
						renderer : function(value) {
							var text = ['待审核', '审核通过', '审核未通过'];
							return text[value];
						}
					}, {
						text : "备注",
						dataIndex : 'cause',
						flex : 2,
						renderer : function(value) {
							return "<div title='" + value + "'>"
									+ Ext.String.ellipsis(value, 28, true)
									+ "</div>";
						}
					}, {
						xtype : 'actioncolumn',
						text : '操作',
						width : 80,
						align : 'center',
						items : [{
							tooltip : '详细',
							getClass : function(v, meta, rec) {
								return 'detail';
							},
							handler : function(grid, rowIndex, colIndex) {
								var rec = grid.getStore().getAt(rowIndex), center = grid
										.up('center'), id = 'center_taskf0000_detail_'
										+ rec.data.id, cmp = Ext.getCmp(id);
								if (cmp) {
									center.setActiveTab(cmp);
								} else {
									var taskf0000detail = Ext
											.createByAlias('widget.taskf0000detail');
									taskf0000detail.store.load({
												params : {
													id : rec.data.id
												}
											});
									center.add({
										closable : true,
										xtype : 'panel',
										items : taskf0000detail,
										id : id,
										title : 'F0000录入审核编号' + rec.data.id
												+ '详细信息'
									}).show();
								}
							}
						}, {
							tooltip : '通过',
							getClass : function(v, meta, rec) {
								var shtatus = parseInt(rec.data.shstatus);
								if (shtatus == 0) {
									return 'pass';
								}
								return 'hide';
							},
							handler : function(grid, rowIndex, colIndex) {
								var rec = grid.getStore().getAt(rowIndex);
								Ext.MessageBox.confirm('提示', '执行审核通过?',
										function(opt) {
											if (opt === 'yes') {
												Ext.Ajax.request({
													async : false,
													url : 'taskf0000/pass',
													params : {
														id : rec.data.id
													},
													success : function(response) {
														var res = Ext
																.decode(response.responseText);
														if (res.success) {
															Ext.MessageBox
																	.show({
																		title : '提示',
																		msg : '操作成功',
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
							tooltip : '拒绝',
							getClass : function(v, meta, rec) {
								if (parseInt(rec.data.shstatus) == 0) {
									return 'deny';
								}
								return 'hide';
							},
							handler : function(grid, rowIndex, colIndex) {
								var rec = grid.getStore().getAt(rowIndex);
								Ext.MessageBox.confirm('提示', '执行审核拒绝?',
										function(opt) {
											if (opt === 'yes') {
												Ext.Ajax.request({
													async : false,
													url : 'taskf0000/deny',
													params : {
														id : rec.data.id
													},
													success : function(response) {
														var res = Ext
																.decode(response.responseText);
														if (res.success) {
															Ext.MessageBox
																	.show({
																		title : '提示',
																		msg : '操作成功',
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
		store.loadPage(1);
		me.callParent(arguments);
	}
});