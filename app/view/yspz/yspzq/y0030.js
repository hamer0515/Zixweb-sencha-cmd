Ext.define('Zixweb.view.yspz.yspzq.y0030', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.y0030',

	defaults : {
		bodyPadding : 5,
		collapsible : true,
		border : false
	},

	initComponent : function() {
		var store = new Ext.data.Store({
					fields : ['id', 'bfj_acct_bj', 'tx_amt', 'flag', 'period'],

					pageSize : 50,
					remoteSort : true,

					proxy : {
						type : 'ajax',
						api : {
							read : 'yspzq/y0030'
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
							var form = Ext.getCmp('yspzqy0030form').getForm();
							var values = form.getValues();
							var grid = Ext.getCmp('yspzq_y0030_grid');
							if (form.isValid()) {
								store.proxy.extraParams = values;
							} else {
								return false;
							}
						},
						load : function(thiz, records, successful, eOpts) {
							if (!successful) {
								Ext.MessageBox.show({
											title : '警告',
											msg : '原始凭证0030数据加载失败,请联系管理员',
											buttons : Ext.Msg.YES,
											icon : Ext.Msg.ERROR
										});
								return;
							}
							var jsonData = thiz.proxy.reader.jsonData.success;
							if (jsonData && jsonData === 'forbidden') {
								Ext.MessageBox.show({
											title : '警告',
											msg : '抱歉，没有原始凭证0030数据访问权限',
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
					title : '查询',
					id : 'yspzqy0030form',

					fieldDefaults : {
						labelWidth : 140
					},
					items : [{
								xtype : 'fieldcontainer',
								layout : 'hbox',
								items : [{
											xtype : 'textfield',
											fieldLabel : 'ID',
											width : 516,
											name : 'id',
											vtype : "id"
										}]
							}, {
								xtype : 'fieldcontainer',
								layout : 'hbox',
								items : [{
											xtype : 'bi',
											name : 'bi',
											fieldLabel : '银行接口编号',
											margin : '0 10 0 0'
										}, {
											xtype : 'bfjacct',
											name : 'bfj_acct_bj',
											fieldLabel : '本金备付金银行账号'
										}]
							}, {
								xtype : 'fieldcontainer',
								fieldLabel : '本金备付金银行入账日期范围',
								layout : 'hbox',
								items : [{
											xtype : 'datefield',
											format : 'Y-m-d',
											name : 'zjbd_date_in_from',
											margin : '0 10 0 0',
											allowBlank : true,
											verify : {
												id : 'yspzq_y0030_zjbd_date_in_to'
											},
											vtype : 'dateinterval',
											width : 180
										}, {
											xtype : 'datefield',
											id : 'yspzq_y0030_zjbd_date_in_to',
											format : 'Y-m-d',
											name : 'zjbd_date_in_to',
											margin : '0 10 0 0',
											allowBlank : true,
											width : 180
										}, {
											xtype : 'textfield',
											name : 'c',
											width : 516,
											fieldLabel : '客户编号'
										}]
							}, {
								xtype : 'fieldcontainer',
								layout : 'hbox',
								items : [{
											xtype : 'textfield',
											fieldLabel : '交易流水编号',
											width : 516,
											name : 'ssn',
											margin : '0 10 0 0'
										}, {
											xtype : 'fieldcontainer',
											layout : 'hbox',
											fieldLabel : '出款退回金额',
											items : [{
														xtype : 'textfield',
														name : 'tx_amt_from',
														margin : '0 10 0 0',
														width : 180,
														vtype : "money"
													}, {
														xtype : 'textfield',
														name : 'tx_amt_to',
														width : 180,
														vtype : "money"
													}]
										}]
							}, {
								xtype : 'fieldcontainer',
								layout : 'hbox',
								items : [{
											xtype : 'rstatus',
											fieldLabel : '撤销状态',
											margin : '0 10 0 0',
											name : 'flag'
										}, {
											xtype : 'textfield',
											fieldLabel : '撤销者',
											width : 516,
											name : 'revoke_user'
										}]
							}, {
								xtype : 'fieldcontainer',
								fieldLabel : '期间日期范围',
								layout : 'hbox',
								items : [{
											xtype : 'datefield',
											format : 'Y-m-d',
											name : 'period_from',
											margin : '0 10 0 0',
											allowBlank : false,
											verify : {
												id : 'yspzq_y0030_period_to'
											},
											vtype : 'dateinterval',
											width : 180
										}, {
											xtype : 'datefield',
											id : 'yspzq_y0030_period_to',
											format : 'Y-m-d',
											name : 'period_to',
											margin : '0 10 0 0',
											allowBlank : false,
											width : 180
										}, {
											xtype : 'datefield',
											format : 'Y-m-d',
											name : 'ts_revoke',
											fieldLabel : '撤销时间',
											width : 516
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
					id : 'yspzq_y0030_grid',
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
								itemId : 'id',
								dataIndex : 'id',
								sortable : false,
								flex : 1
							}, {
								text : "本金备付金银行帐号",
								itemId : 'bfj_acct_bj',
								dataIndex : 'bfj_acct_bj',
								sortable : false,
								renderer : function(value, p, record) {
									var bfjacct = Ext.data.StoreManager
											.lookup('Zixweb.store.component.BfjAcct');
									var index = bfjacct.findExact('id', value);
									return bfjacct.getAt(index).data.name;
								},
								flex : 2
							}, {
								text : "出款退回金额",
								itemId : 'tx_amt',
								dataIndex : 'tx_amt',
								sortable : false,
								flex : 2,
								renderer : function(value) {
									return Ext.util.Format.number(
											parseInt(value) / 100, '0,0.00');
								}
							}, {
								text : "期间日期",
								dataIndex : 'period',
								itemId : 'period',
								sortable : false,
								flex : 2,
								renderer : Ext.util.Format
										.dateRenderer('Y年m月d日')
							}, {
								text : "撤销状态",
								dataIndex : 'flag',
								sortable : false,
								flex : 2,
								renderer : function(value) {
									var text = ['未撤销', '已撤销', '撤销申请中'];
									return text[value];
								}
							}, {
								xtype : 'actioncolumn',
								text : '操作',
								width : 100,
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
												.down('center'), id = 'yspzq_detail_0030'
												+ rec.data.id, cmp = Ext
												.getCmp(id);
										var yspzqdetail = Ext
												.createByAlias('widget.yspzqdetail');
										yspzqdetail.store.load({
													params : {
														ys_type : '0030',
														ys_id : rec.data.id
													}
												});
										if (cmp) {
											center.setActiveTab(cmp);
										} else {
											center.add({
												closable : true,
												xtype : 'panel',
												items : yspzqdetail,
												id : 'yspzq_detail_0030'
														+ rec.data.id,
												title : '凭证0030' + '编号'
														+ rec.data.id + '详细信息'
											}).show();
										}
										viewport.doLayout();
									}
								}, {
									tooltip : '撤销',
									getClass : function(v, meta, rec) {
										if (rec.data.flag == 0) {
											return 'revoke';
										}
										return 'none';
									},
									handler : function(grid, rowIndex, colIndex) {
										var rec = grid.getStore()
												.getAt(rowIndex);
										Ext.widget('yspzrevoke_cause', {
													modal : true,
													resizable : false,
													ys_type : '0030',
													ys_id : rec.data.id,
													period : rec.data.period
												})
									}
								}]
							}]
				}];
		this.callParent(arguments);
	}
});
