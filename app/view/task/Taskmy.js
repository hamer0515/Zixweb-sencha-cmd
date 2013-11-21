Ext.define('Zixweb.view.task.Taskmy', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.taskmy',

	defaults : {
		border : false
	},

	initComponent : function() {
		var store = new Ext.data.Store({
					fields : ['id', 'cause', 'c_user_name', 'ts_c', 'shstatus',
							'ys_type', 'ys_id', 'shtype'],

					pageSize : 50,
					remoteSort : true,

					proxy : {
						type : 'ajax',
						api : {
							read : 'taskmy/list'
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
							var form = Ext.getCmp('taskmyform').getForm();
							var values = form.getValues();
							var grid = Ext.getCmp('taskmygrid');
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
											msg : '我的任务数据加载失败,请联系管理员',
											buttons : Ext.Msg.YES,
											icon : Ext.Msg.ERROR
										});
								return;
							}
							var jsonData = thiz.proxy.reader.jsonData.success;
							if (jsonData && jsonData === 'forbidden') {
								Ext.MessageBox.show({
											title : '警告',
											msg : '抱歉，没有我的任务数据访问权限',
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
					title : '我的任务查询',
					id : 'taskmyform',
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
											xtype : 'textfield',
											name : 'id',
											width : 516,
											vtype : 'id',
											fieldLabel : '任务编号'
										}]
							}, {
								xtype : 'fieldcontainer',
								layout : 'hbox',
								items : [{
											xtype : 'shtype',
											name : 'type',
											margin : '0 10 0 0',
											fieldLabel : '审核类型'
										}, {
											xtype : 'shstatus',
											name : 'status',
											fieldLabel : '审核状态'
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
					id : 'taskmygrid',
					height : 'auto',

					store : store,
					dockedItems : [{
								xtype : 'pagingtoolbar',
								store : store
							}],
					columns : [{
								text : "凭证编号",
								itemId : 'ys_id',
								dataIndex : 'ys_id',
								sortable : false,
								width : 80
							}, {
								text : "任务类型",
								itemId : 'shtype',
								dataIndex : 'shtype',
								sortable : false,
								flex : 1,
								renderer : function(value) {
									var text = ['特种调账单', '凭证撤销'];
									return text[parseInt(value) - 1];
								}
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
										var id, cmp;
										var viewport = grid.up('viewport'), center = viewport
												.down('center');
										if (parseInt(rec.data.shtype) == 1) {
											id = 'center_task0000_detail_'
													+ rec.data.id;
											cmp = Ext.getCmp(id);
										} else if (parseInt(rec.data.shtype) == 2) {
											id = 'center_taskpzcx_detail_'
													+ rec.data.ys_type
													+ rec.data.ys_id;
											cmp = Ext.getCmp(id);
										}
										if (cmp) {
											center.setActiveTab(cmp);
										} else {
											var taskmy;
											var t = '';
											if (parseInt(rec.data.shtype) == 1) {
												t = '特种调账单录入';
												taskmy = Ext
														.createByAlias('widget.task0000detail');
												taskmy.store.load({
															params : {
																id : rec.data.id,
																rdonly : 'rdonly'
															}
														});

											} else if (parseInt(rec.data.shtype) == 2) {
												t = '凭证撤销';
												taskmy = Ext
														.createByAlias('widget.taskpzcxdetail');
												taskmy.store.load({
													params : {
														id : rec.data.id,
														ys_type : rec.data.ys_type,
														ys_id : rec.data.ys_id,
														rdonly : 'rdonly'
													}
												});
											}
											center.add({
												closable : true,
												xtype : 'panel',
												items : taskmy,
												id : id,
												title : '我的' + t + '任務编号'
														+ rec.data.id + '详细信息'
											}).show();
										}
										viewport.doLayout();
									}
								}]
							}]

				}];
		this.callParent(arguments);
		store.loadPage(1);
	}
});