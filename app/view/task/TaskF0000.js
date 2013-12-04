Ext.define('Zixweb.view.task.TaskF0000', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.taskf0000',
	prefix : 'taskf0000',

	defaults : {
		border : false
	},

	initComponent : function() {
		var panel = this;
		var store = new Ext.data.Store({
					fields : ['id', 'cause', 'c_user_name', 'ts_c', 'shstatus'],

					pageSize : 50,
					remoteSort : true,

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
							var form = Ext.getCmp(panel.prefix + 'form')
									.getForm();
							var values = form.getValues();
							var grid = Ext.getCmp(panel.prefix + 'grid');
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
						load : function(thiz, records, successful, eOpts) {
							if (!successful) {
								Ext.MessageBox.show({
											title : '警告',
											msg : '凭证F0000审核数据加载失败,请联系管理员',
											buttons : Ext.Msg.YES,
											icon : Ext.Msg.ERROR
										});
								return;
							}
							var jsonData = thiz.proxy.reader.jsonData.success;
							if (jsonData && jsonData === 'forbidden') {
								Ext.MessageBox.show({
											title : '警告',
											msg : '抱歉，没有凭证F0000审核数据访问权限',
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
					title : '特种调帐单审核查询',
					id : panel.prefix + 'form',
					bodyPadding : 5,
					collapsible : true,

					fieldDefaults : {
						labelWidth : 140
					},
					items : [{
								xtype : 'fieldcontainer',
								fieldLabel : '创建日期范围',
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
					id : panel.prefix + 'grid',
					height : 'auto',

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
									var text = ['待审核', '审核通过', '审核未通过'];
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
												.down('center'), id = 'center_taskf0000_detail_'
												+ rec.data.id, cmp = Ext
												.getCmp(id);
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
												id : 'center_taskf0000_detail_'
														+ rec.data.id,
												title : 'F0000录入审核编号'
														+ rec.data.id + '详细信息'
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
															url : 'taskf0000/pass',
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
															url : 'taskf0000/deny',
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