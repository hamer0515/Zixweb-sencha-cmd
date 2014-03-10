Ext.define('Zixweb.view.zqqr.query', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.zqqrquery',

	initComponent : function() {
		var me = this, store, grid, form;
		store = Ext.create('widget.mystore', {
					fields : ['id', 'sm_date', 'zqqrstatus'],
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
							if (form.isValid()) {
								store.proxy.extraParams = form.getValues();
							} else {
								return false;
							}
						}
					}
				});
		form = Ext.create('widget.queryform', {
					items : [{
								xtype : 'fieldcontainer',
								layout : 'hbox',
								items : [{
											fieldLabel : '扫描期间',
											xtype : 'datefield',
											format : 'Y-m-d',
											name : 'sm_date',
											margin : '0 10 0 0',
											width : 516
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
				});
		grid = new Ext.grid.Panel({
			store : store,
			columns : [{
						text : "ID",
						dataIndex : 'id',
						width : 80
					}, {
						text : "扫描日期",
						dataIndex : 'sm_date',
						flex : 1,
						renderer : Ext.util.Format.dateRenderer('Y年m月d日')
					}, {
						text : "状态",
						dataIndex : 'zqqrstatus',
						flex : 1,
						renderer : function(value) {
							var zqqrstatus = Ext.data.StoreManager
									.lookup('ZQQRStatus');
							return zqqrstatus.getAt(zqqrstatus.findExact('id',
									parseInt(value))).data.name;
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
								var rec = grid.getStore().getAt(rowIndex);
								Ext.MessageBox.confirm('提示', '执行生成操作',
										function(opt) {
											if (opt === 'yes') {
												Ext.Ajax.request({
													async : false,
													url : 'zqqr/submit',
													params : {
														sm_date : rec.data.sm_date
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
		me.callParent(arguments);
	}
});