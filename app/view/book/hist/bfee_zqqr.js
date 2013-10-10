Ext.define('Zixweb.view.book.hist.bfee_zqqr', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.book_hist_bfee_zqqr',

	defaults : {
		bodyPadding : 5,
		collapsible : true,
		border : false
	},

	initComponent : function() {
		var store = new Ext.data.Store({
					fields : ['id','fp', 'period', 'bi',
							'tx_date', 'j', 'd', 'ys_id', 'ys_type'],

					pageSize : 50,
					remoteSort : true,

					proxy : {
						type : 'ajax',
						api : {
							read : 'book/hist/bfee_zqqr'
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
							var form = Ext.getCmp('bfeezqqrhistform')
									.getForm();
							var values = form.getValues();
							var grid = Ext
									.getCmp('book_hist_bfee_zqqr_grid');
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
												msg : '周期确认银行手续费科目历史数据加载失败,请联系管理员',
												buttons : Ext.Msg.YES,
												icon : Ext.Msg.ERROR
											});
									return;
								}
								var jsonData = thiz.proxy.reader.jsonData.success;
								if (jsonData && jsonData === 'forbfj_acctdden') {
									Ext.MessageBox.show({
												title : '警告',
												msg : '抱歉，没有周期确认银行手续费科目历史数据访问权限',
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
					id : 'bfeezqqrhistform',

					fieldDefaults : {
						labelWidth : 140
					},
					items : [{
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
												id : 'book_hist_bfee_zqqr_to'
											},
											vtype : 'dateinterval',
											width : 180
										}, {
											xtype : 'datefield',
											id : 'book_hist_bfee_zqqr_to',
											format : 'Y-m-d',
											name : 'period_to',
											margin : '0 10 0 0',
											allowBlank : false,
											width : 180
										}]
							}, {
								xtype : 'fieldcontainer',
								fieldLabel : '交易日期范围',
								layout : 'hbox',
								items : [{
											xtype : 'datefield',
											format : 'Y-m-d',
											name : 'tx_date_from',
											margin : '0 10 0 0',
											verify : {
												id : 'book_hist_bfee_zqqr_to_2'
											},
											vtype : 'dateinterval',
											width : 180
										}, {
											xtype : 'datefield',
											id : 'book_hist_bfee_zqqr_to_2',
											format : 'Y-m-d',
											name : 'tx_date_to',
											margin : '0 10 0 0',
											width : 180
										}, {
											xtype : 'textfield',
											name : 'fp',
											width : 516,
											fieldLabel : '周期确认规则'
										}]
							}, {
								xtype : 'fieldcontainer',
								layout : 'hbox',
								items : [{
											xtype : 'textfield',
											name : 'id',
											margin : '0 10 0 0',
											width : 516,
											fieldLabel : 'ID'
										}, {
											xtype : 'textfield',
											fieldLabel : '原始凭证ID',
											width : 516,
											name : 'ys_id',
										}]

							},  {
								xtype : 'fieldcontainer',
								layout : 'hbox',
								items : [{
											xtype : 'bi',
											name : 'bi',
											margin : '0 10 0 0',
											fieldLabel : '银行接口编号'
										}, {
											xtype : 'ystype',
											name : 'ys_type',
											fieldLabel : '原始凭证类型'
										}]

							},{
								xtype : 'fieldcontainer',
								layout : 'hbox',
								items : [{
											xtype : 'fieldcontainer',
											layout : 'hbox',
											fieldLabel : '借方金额',
											items : [{
														xtype : 'textfield',
														name : 'j_from',
														margin : '0 10 0 0',
														width : 180,
														vtype : "money"
													}, {
														xtype : 'textfield',
														name : 'j_to',
														width : 180,
														margin : '0 10 0 0',
														vtype : "money"
													}]
										}, {
											xtype : 'fieldcontainer',
											layout : 'hbox',
											fieldLabel : '贷方金额',
											items : [{
														xtype : 'textfield',
														name : 'd_from',
														margin : '0 10 0 0',
														width : 180,
														vtype : "money"
													}, {
														xtype : 'textfield',
														name : 'd_to',
														width : 180,
														margin : '0 10 0 0',
														vtype : "money"
													}]
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
					id : 'book_hist_bfee_zqqr_grid',
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
								width : 80
							}, {
								text : "银行接口编号",
								itemId : 'bi',
								dataIndex : 'bi',
								sortable : false,
								renderer : function(value, p, record) {
									var bi = Ext.data.StoreManager
											.lookup('Zixweb.store.component.Bi');
									var index = bi.findExact('id', value);
									return bi.getAt(index).data.name;
								},
								flex : 1
							} ,{
								text : "周期确认规则",
								itemId : 'fp',
								dataIndex : 'fp',
								sortable : false,
								flex : 1
							}, {
								text : "交易日期",
								dataIndex : 'tx_date',
								itemId : 'tx_date',
								sortable : false,
								flex : 1,
								renderer : Ext.util.Format
										.dateRenderer('Y年m月d日')
							}, {
								text : "期间日期",
								dataIndex : 'period',
								itemId : 'period',
								sortable : false,
								flex : 1,
								renderer : Ext.util.Format
										.dateRenderer('Y年m月d日')
							}, {
								text : "借方金额",
								dataIndex : 'j',
								sortable : false,
								flex : 1,
								renderer : function(value) {
									return Ext.util.Format.number(
											parseInt(value) / 100, '0,0.00');
								}
							}, {
								text : "贷方金额",
								dataIndex : 'd',
								flex : 1,
								sortable : false,
								renderer : function(value) {
									return Ext.util.Format.number(
											parseInt(value) / 100, '0,0.00');
								}
							}, {
								xtype : 'actioncolumn',
								text : '操作',
								width : 80,
								align : 'center',
								items : [{
									tooltip : '详细',
									action : 'yspzqdetail',
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
										var yspzqdetail = Ext
												.createByAlias('widget.yspzqdetail');
										yspzqdetail.store.load({
													params : {
														ys_type : rec.data.ys_type,
														ys_id : rec.data.ys_id
													}
												});
										if (cmp) {
											center.setActiveTab(cmp);
										} else {
											center.add({
												closable : true,
												xtype : 'panel',
												items : yspzqdetail,
												id : 'yspzq_detail_'
														+ rec.data.ys_type
														+ rec.data.ys_id,
												title : '凭证' + rec.data.ys_type
														+ '详细信息-'
														+ rec.data.ys_id
											}).show();
										}
										viewport.doLayout();
									}
								}]
							}]

				}];
		this.callParent(arguments);
	}
});