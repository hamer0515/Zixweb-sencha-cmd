Ext.define('Zixweb.view.task.Taskpzcx', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.taskpzcx',

	defaults : {
		border : false
	},

	initComponent : function() {
		var store = new Ext.data.Store({
					fields : ['id', 'cause', 'c_user_name', 'ts_c', 'shstatus',
							'ys_type', 'ys_id'],

					pageSize : 50,
					remoteSort : true,

					proxy : {
						type : 'ajax',
						api : {
							read : 'taskpzcx/list'
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
							var form = Ext.getCmp('taskpzcxform').getForm();
							var values = form.getValues();
							var grid = Ext.getCmp('taskpzcxgrid');
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
						},
						load : function(me, records, successful, eOpts) {
							if (!successful) {
								Ext.MessageBox.show({
											title : '警告',
											msg : '凭证撤销审核数据加载失败,请联系管理员',
											buttons : Ext.Msg.YES,
											icon : Ext.Msg.ERROR
										});
								return;
							}
							var jsonData = me.proxy.reader.jsonData.success;
							if (jsonData && jsonData === 'forbidden') {
								Ext.MessageBox.show({
											title : '警告',
											msg : '抱歉，凭证撤销审核数据访问权限',
											buttons : Ext.Msg.YES,
											icon : Ext.Msg.ERROR
										});
							}
						}
					}
				});
		this.store = store;
		this.items = [{
					xtype : 'form',
					title : '凭证撤销审核查询',
					id : 'taskpzcxform',
					bodyPadding : 5,
					collapsible : true,

					fieldDefaults : {
						labelWidth : 140
					},
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
									button.up('panel').getForm().reset();
								}
							}]
				}, {
					xtype : 'gridpanel',
					id : 'taskpzcxgrid',

					store : store,
					dockedItems : [{
								xtype : 'pagingtoolbar',
								store : store
							}],
					columns : [{
								text : "任务编号",
								itemId : 'id',
								dataIndex : 'id',
								sortable : false,
								width : 80
							}, {
								text : "创建用户",
								itemId : 'c_user',
								dataIndex : 'c_user_name',
								sortable : false,
								flex : 1
							}, {
								text : "创建时间",
								dataIndex : 'ts_c',
								itemId : 'ts_c',
								sortable : false,
								flex : 1
							}, {
								text : "审核状态",
								dataIndex : 'shstatus',
								sortable : false,
								flex : 1,
								renderer : function(value) {
									var text = ['待审核', '审核通过', '审核未通过']
									return text[value];
								}
							}, {
								text : "备注",
								dataIndex : 'cause',
								flex : 2,
								sortable : false,
								renderer : function(value) {
									return "<div title='"
											+ value
											+ "'>"
											+ Ext.String.ellipsis(value, 28,
													true) + "</div>";
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
										var rec = grid.getStore()
												.getAt(rowIndex);
										var viewport = grid.up('viewport'), center = viewport
												.down('center'), id = 'yspzq_detail_'
												+ rec.data.ys_type
												+ rec.data.ys_id, cmp = Ext
												.getCmp(id);
										if (cmp) {
											center.setActiveTab(cmp);
										} else {
											var taskpzcxdetail = Ext
													.createByAlias('widget.taskpzcxdetail');
											taskpzcxdetail.store.load({
														params : {
															id : rec.data.id,
															ys_type : rec.data.ys_type,
															ys_id : rec.data.ys_id
														}
													});
											center.add({
												closable : true,
												xtype : 'panel',
												items : taskpzcxdetail,
												id : 'yspzq_detail_'
														+ rec.data.ys_type
														+ rec.data.ys_id,
												title : '凭证' + rec.data.ys_type
														+ '撤销审核编号'
														+ rec.data.id + '详细信息-'
											}).show();
										}
										viewport.doLayout();
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
										var rec = grid.getStore()
												.getAt(rowIndex);
										Ext.MessageBox.confirm('提示', '执行审核通过?',
												function(opt) {
													if (opt === 'yes') {
														Ext.Ajax.request({
															async : false,
															url : 'taskpzcx/pass',
															params : {
																id : rec.data.id
															},
															success : function(
																	response) {
																var success = Ext
																		.decode(response.responseText).success;
																if (success) {
																	if (response === 'forbidden') {
																		Ext.MessageBox
																				.show(
																						{
																							title : '警告',
																							msg : '抱歉，没有审核通过操作权限',
																							buttons : Ext.Msg.YES,
																							icon : Ext.Msg.ERROR
																						});
																		return;
																	}
																	Ext.MessageBox
																			.alert(
																					'提示',
																					'操作成功');
																	store
																			.reload();
																} else {
																	Ext.MessageBox
																			.alert(
																					'警告',
																					'操作失败');
																}
															},
															failure : function(
																	response,
																	opts) {
																Ext.MessageBox
																		.show({
																			title : '警告',
																			msg : '服务器端出错，错误码:'
																					+ response.status,
																			buttons : Ext.Msg.YES,
																			icon : Ext.Msg.ERROR
																		});
															}
														});
													}
												});
									}
								}, {
									tooltip : '拒绝',
									getClass : function(v, meta, rec) {
										var shtatus = parseInt(rec.data.shstatus);
										if (shtatus == 0) {
											return 'deny';
										}
										return 'hide';
									},
									handler : function(grid, rowIndex, colIndex) {
										var rec = grid.getStore()
												.getAt(rowIndex);
										Ext.MessageBox.confirm('提示', '执行审核拒绝?',
												function(opt) {
													if (opt === 'yes') {
														Ext.Ajax.request({
															async : false,
															url : 'taskpzcx/deny',
															params : {
																id : rec.data.id
															},
															success : function(
																	response) {
																var success = Ext
																		.decode(response.responseText).success;
																if (success) {
																	if (response === 'forbidden') {
																		Ext.MessageBox
																				.show(
																						{
																							title : '警告',
																							msg : '抱歉，没有审核拒绝操作权限',
																							buttons : Ext.Msg.YES,
																							icon : Ext.Msg.ERROR
																						});
																		return;
																	}
																	Ext.MessageBox
																			.alert(
																					'提示',
																					'操作成功');
																	store
																			.reload();
																} else {
																	Ext.MessageBox
																			.alert(
																					'警告',
																					'操作失败');
																}
															},
															failure : function(
																	response,
																	opts) {
																Ext.MessageBox
																		.show({
																			title : '警告',
																			msg : '服务器端出错，错误码:'
																					+ response.status,
																			buttons : Ext.Msg.YES,
																			icon : Ext.Msg.ERROR
																		});
															}
														});
													}
												});
									}
								}]
							}]

				}];
		this.callParent(arguments);
		store.loadPage(1);
	}
});