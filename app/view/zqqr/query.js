Ext.define('Zixweb.view.zqqr.query', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.zqqrquery',

	defaults : {
		bodyPadding : 5,
		collapsible : true,
		border : false
	},

	initComponent : function() {
		var store = new Ext.data.Store({
					fields : ['id', 'sm_date', 'zqqrstatus'],

					pageSize : 50,
					remoteSort : true,
					autoLoad : true,

					proxy : {
						type : 'ajax',
						api : {
							read : 'zqqr/query'
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
							var form = Ext.getCmp('zqqrqueryform').getForm();
							var values = form.getValues();
							var grid = Ext.getCmp('zqqrquerygrid');
							if (form.isValid()) {
								store.proxy.extraParams = values;
							} else {
								return false;
							}
						},
						listeners : {
							load : function(thiz, records, successful, eOpts) {
								if (!successful) {
									Ext.MessageBox.show({
												title : '警告',
												msg : '周期确认状态数据加载失败,请联系管理员',
												buttons : Ext.Msg.YES,
												icon : Ext.Msg.ERROR
											});
									return;
								}
								var jsonData = thiz.proxy.reader.jsonData.success;
								if (jsonData && jsonData === 'forbidden') {
									Ext.MessageBox.show({
												title : '警告',
												msg : '抱歉，没有周期确认状态数据访问权限',
												buttons : Ext.Msg.YES,
												icon : Ext.Msg.ERROR
											});
								}
							}
						}
					}
				});
		this.store = store;
		this.items = [{
					xtype : 'form',
					title : '查询',
					id : 'zqqrqueryform',

					fieldDefaults : {
						labelWidth : 90
					},
					items : [{
								xtype : 'fieldcontainer',
								layout : 'hbox',
								items : [{
											fieldLabel : '扫描期间',
											xtype : 'datefield',
											format : 'Y-m-d',
											name : 'sm_date',
											margin : '0 10 0 0',
											width : 283
										}, {
											fieldLabel : '状态',
											xtype : 'zqqrstatus',
											name : 'status'
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
					title : '结果',
					xtype : 'gridpanel',
					id : 'zqqrquerygrid',
					height : 500,

					store : this.store,
					dockedItems : [{
								xtype : 'pagingtoolbar',
								store : this.store,
								dock : 'bottom',
								displayInfo : true
							}],
					columns : [{
								text : "ID",
								dataIndex : 'id',
								sortable : false,
								width : 80
							}, {
								text : "扫描日期",
								dataIndex : 'sm_date',
								sortable : false,
								flex : 1,
								renderer : Ext.util.Format
										.dateRenderer('Y年m月d日')
							}, {
								text : "状态",
								dataIndex : 'zqqrstatus',
								sortable : false,
								flex : 1,
								renderer : function(value) {
									value = parseInt(value);
									var zqqrstatus = Ext.data.StoreManager
											.lookup('Zixweb.store.component.ZQQRStatus');
									var index = zqqrstatus.findExact('id',
											value);
									return zqqrstatus.getAt(index).data.name;
								}
							}, {
								xtype : 'actioncolumn',
								text : '操作',
								width : 80,
								align : 'center',
								items : [{
									tooltip : '生成',
									getClass : function(v, meta, rec) {
										if (rec.data.zqqrstatus == 1
												|| rec.data.zqqrstatus == -2
												|| rec.data.zqqrstatus == -3) {
											return 'generate';
										} else {
											return 'hide';
										}
									},
									handler : function(grid, rowIndex, colIndex) {
										var rec = grid.getStore()
												.getAt(rowIndex);
										Ext.MessageBox.confirm('提示', '执行生成操作',
												function(opt) {
													if (opt === 'yes') {
														Ext.Ajax.request({
															async : false,
															url : 'zqqr/submit',
															params : {
																sm_date : rec.data.sm_date
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
																							msg : '抱歉，没有周期确认生成操作权限',
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
	}
});