Ext.define('Zixweb.view.fhydbook.hist.cost_ncss_fhyd', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.book_hist_cost_ncss_fhyd',

	defaults : {
		border : false
	},

	initComponent : function() {
		var store = new Ext.data.Store({
					fields : ['id', 'fc', 'period','fhw_type','f_ssn','j', 'd',
							'ys_id', 'ys_type'],

					pageSize : 50,
					remoteSort : true,

					proxy : {
						type : 'ajax',
						api : {
							read : 'book/hist/cost_ncss_fhyd'
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
							var form = Ext.getCmp('costncssfhydform')
									.getForm();
							var values = form.getValues();
							var grid = Ext.getCmp('book_hist_cost_ncss_fhyd_grid');
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
												msg : '成本-非银行卡损失科目历史数据加载失败,请联系管理员',
												buttons : Ext.Msg.YES,
												icon : Ext.Msg.ERROR
											});
									return;
								}
								var jsonData = thiz.proxy.reader.jsonData.success;
								if (jsonData && jsonData === 'forbidden') {
									Ext.MessageBox.show({
												title : '警告',
												msg : '抱歉，没有成本-非银行卡损失科目历史数据访问权限',
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
					id : 'costncssfhydform',
					bodyPadding : 5,
					collapsible : true,

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
												id : 'book_hist_cost_ncss_fhyd_to'
											},
											vtype : 'dateinterval',
											width : 180
										}, {
											xtype : 'datefield',
											id : 'book_hist_cost_ncss_fhyd_to',
											format : 'Y-m-d',
											name : 'period_to',
											allowBlank : false,
											margin : '0 10 0 0',
											width : 180
										} ]
							}, {
								xtype : 'fieldcontainer',
								layout : 'hbox',
								items : [{
											xtype : 'textfield',
											name : 'id',
											margin : '0 10 0 0',
											width : 516,
											vtype : 'id',
											fieldLabel : 'ID'
										}, {
											xtype : 'textfield',
											fieldLabel : '原始凭证ID',
											width : 516,
											name : 'ys_id',
											vtype : "money"
										}]

							}, {
                                xtype : 'fieldcontainer',
                                layout : 'hbox',
                                items : [{
                                            xtype : 'textfield',                                        
                                            name : 'f_ssn',
                                            margin : '0 10 0 0',
                                            width : 516,
                                            fieldLabel : '唯一销卡编号'
                                        }, {
											xtype : 'ystypef',
											name : 'ys_type',
											fieldLabel : '原始凭证类型'
                                        }]
							}, {
								xtype : 'fieldcontainer',
								layout : 'hbox',
								items : [{
                                           xtype : 'fhwtype',
                                           name  : 'fhw_type',
                                           margin : '0 10 0 0',
                                           fieldLabel : '货物类型'
                                        }, {
											xtype : 'textfield',
											name : 'fc',
											width : 516,
											fieldLabel : '客户编号'
										}
										]
							}, {
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

					xtype : 'gridpanel',
					id : 'book_hist_cost_ncss_fhyd_grid',
					height : 'auto',

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
								text : "客户编号",
								itemId : 'fc',
								dataIndex : 'fc',
								sortable : false,
								flex : 1
							}, {
								text : "期间日期",
								dataIndex : 'period',
								itemId : 'period',
								sortable : false,
								flex : 1,
								renderer : Ext.util.Format
										.dateRenderer('Y年m月d日')
							}, {
								text : "货物类型",
								itemId : 'fhw_type',
								dataIndex : 'fhw_type',
								sortable : false,
								renderer : function(value, p, record) {
									var fhwtype = Ext.data.StoreManager
											.lookup('Zixweb.store.component.FhwType');
									var index = fhwtype.findExact('id', value);
									return fhwtype.getAt(index).data.name;
								},
								flex : 1
                            }, {
								text : "唯一销卡编号",
								itemId : 'f_ssn',
								dataIndex : 'f_ssn',
								sortable : false,
								flex : 1
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
