Ext.define('Zixweb.view.yspz.yspzq.y0012', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.y0012',

	defaults : {
		bodyPadding : 5,
		collapsible : true,
		border : false
	},

	initComponent : function() {
		var store = new Ext.data.Store({
					fields : ['id', 'bfj_acct', 'zyzj_acct', 'bfj_zjbd_type', 'zyzj_zjbd_type', 
							  'e_date_bfj', 'zjbd_date_out_bfj', 'zjbd_date_in_bfj',
							  'e_date_zyzj', 'zjbd_date_out_zyzj', 'zjbd_date_in_zyzj',
							  'yhys_txamt', 'yhyf_txamt', 'yhys_bamt', 'yhyf_bamt', 
							  'yhys_bfee', 'yhyf_bfee', 'bfj_bsc', 'zyzj_bsc',
							  'flag', 'crt_user', 'period', 'cause'],

					pageSize : 50,
					remoteSort : true,

					proxy : {
						type : 'ajax',
						api : {
							read : 'yspzq/y0012'
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
							var form = Ext.getCmp('yspzqy0012form').getForm();
							var values = form.getValues();
							var grid = Ext.getCmp('yspzq_y0012_grid');
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
											msg : '原始凭证0012数据加载失败,请联系管理员',
											buttons : Ext.Msg.YES,
											icon : Ext.Msg.ERROR
										});
								return;
							}
							var jsonData = thiz.proxy.reader.jsonData.success;
							if (jsonData && jsonData === 'forbidden') {
								Ext.MessageBox.show({
											title : '警告',
											msg : '抱歉，没有原始凭证0012数据访问权限',
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
					id : 'yspzqy0012form',

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
											name : 'ys_id',
											vtype : "id"
										}]
							}, {
								xtype : 'fieldcontainer',
								layout : 'hbox',
								items : [{
											xtype : 'bfjacct',
											fieldLabel : '备付金帐号',
											margin : '0 10 0 0',
											name : 'bfj_acct'
										}, {
											xtype : 'zyzjacct',
											fieldLabel : '自有资金银行账号',
											width : 516,
											name : 'zyzj_acct'
										}]
							}, {
								xtype : 'fieldcontainer',
								layout : 'hbox',
								items : [{
											xtype : 'zjbdtype',
											fieldLabel : '备付金资金变动类型',
											margin : '0 10 0 0',
											name : 'bfj_zjbd_type'
										}, {
											xtype : 'zjbdtype',
											fieldLabel : '自有资金资金变动类型',
											width : 516,
											name : 'zyzj_zjbd_type'
										}]
							}, {
								xtype : 'fieldcontainer',
								fieldLabel : '备付金银行差错日期',
								layout : 'hbox',
								items : [{
											xtype : 'datefield',
											format : 'Y-m-d',
											name : 'e_date_bfj_from',
											margin : '0 10 0 0',
											allowBlank : true,
											verify : {
												id : 'yspzq_y0012_e_date_bfj_to'
											},
											vtype : 'dateinterval',
											width : 180
										}, {
											xtype : 'datefield',
											id : 'yspzq_y0012_e_date_bfj_to',
											format : 'Y-m-d',
											name : 'e_date_bfj_to',
											margin : '0 10 0 0',
											allowBlank : true,
											width : 180
										}, {
											xtype : 'fieldcontainer',
											fieldLabel : '备付金银行出账日期',
											layout : 'hbox',
											items : [{
													  xtype : 'datefield',
													  format : 'Y-m-d',
													  name : 'zjbd_date_out_bfj_from',
													  margin : '0 10 0 0',
													  allowBlank : true,
													  verify : {
																id : 'yspzq_y0012_zjbd_date_out_bfj_to'
												      },
													  vtype : 'dateinterval',
													  width : 180
												  }, {
												      xtype : 'datefield',
													  id : 'yspzq_y0012_zjbd_date_out_bfj_to',
													  format : 'Y-m-d',
													  name : 'zjbd_date_out_bfj_to',
													  allowBlank : true,
													  width : 180
												  }]
										}]
							}, {
								xtype : 'fieldcontainer',
								fieldLabel : '备付金银行入账日期',
								layout : 'hbox',
								items : [{
											xtype : 'datefield',
											format : 'Y-m-d',
											name : 'zjbd_date_in_bfj_from',
											margin : '0 10 0 0',
											allowBlank : true,
											verify : {
												id : 'yspzq_y0012_zjbd_date_in_bfj_to'
											},
											vtype : 'dateinterval',
											width : 180
										}, {
											xtype : 'datefield',
											id : 'yspzq_y0012_zjbd_date_in_bfj_to',
											format : 'Y-m-d',
											name : 'zjbd_date_in_bfj_to',
											margin : '0 10 0 0',
											allowBlank : true,
											width : 180
										}, {
											xtype : 'fieldcontainer',
											fieldLabel : '自有资金银行差错日期',
											layout : 'hbox',
											items : [{
													  xtype : 'datefield',
													  format : 'Y-m-d',
													  name : 'e_date_zyzj_from',
													  margin : '0 10 0 0',
													  allowBlank : true,
													  verify : {
																id : 'yspzq_y0012_e_date_zyzj_to'
												      },
													  vtype : 'dateinterval',
													  width : 180
												  }, {
												      xtype : 'datefield',
													  id : 'yspzq_y0012_e_date_zyzj_to',
													  format : 'Y-m-d',
													  name : 'e_date_zyzj_to',
													  allowBlank : true,
													  width : 180
												  }]
										}]
							}, {
								xtype : 'fieldcontainer',
								fieldLabel : '自有资金银行出账日期',
								layout : 'hbox',
								items : [{
											xtype : 'datefield',
											format : 'Y-m-d',
											name : 'zjbd_date_out_zyzj_from',
											margin : '0 10 0 0',
											allowBlank : true,
											verify : {
												id : 'yspzq_y0012_zjbd_date_out_zyzj_to'
											},
											vtype : 'dateinterval',
											width : 180
										}, {
											xtype : 'datefield',
											id : 'yspzq_y0012_zjbd_date_out_zyzj_to',
											format : 'Y-m-d',
											name : 'zjbd_date_out_zyzj_to',
											margin : '0 10 0 0',
											allowBlank : true,
											width : 180
										}, {
											xtype : 'fieldcontainer',
											fieldLabel : '自有资金银行入账日期',
											layout : 'hbox',
											items : [{
													  xtype : 'datefield',
													  format : 'Y-m-d',
													  name : 'zjbd_date_in_zyzj_from',
													  margin : '0 10 0 0',
													  allowBlank : true,
													  verify : {
																id : 'yspzq_y0012_zjbd_date_in_zyzj_to'
												      },
													  vtype : 'dateinterval',
													  width : 180
												  }, {
												      xtype : 'datefield',
													  id : 'yspzq_y0012_zjbd_date_in_zyzj_to',
													  format : 'Y-m-d',
													  name : 'zjbd_date_in_zyzj_to',
													  allowBlank : true,
													  width : 180
												  }]
										}]
							}, {
                                xtype : 'fieldcontainer',
                                layout : 'hbox',
                                items : [{
                                            xtype : 'fieldcontainer',
                                            layout : 'hbox',
                                            fieldLabel : '已核应收交易款借方汇总',
                                            items : [{
                                                        xtype : 'textfield',
                                                        name : 'yhys_txamt_from',
                                                        margin : '0 10 0 0',
                                                        width : 180,
                                                        vtype : "money"
                                                    }, {
                                                        xtype : 'textfield',
                                                        name : 'yhys_txamt_to',
                                                        width : 180,
                                                        margin : '0 10 0 0',
                                                        vtype : "money"
                                                    }]
                                        }, {
                                            xtype : 'fieldcontainer',
                                            layout : 'hbox',
                                            fieldLabel : '已核应付交易款贷方汇总',
                                            items : [{
                                                        xtype : 'textfield',
                                                        name : 'yhyf_txamt_from',
                                                        margin : '0 10 0 0',
                                                        width : 180,
                                                        vtype : "money"
                                                    }, {
                                                        xtype : 'textfield',
                                                        name : 'yhyf_txamt_to',
                                                        width : 180,
                                                        margin : '0 10 0 0',
                                                        vtype : "money"
                                                    }]
                                        }]
                            }, {
                                xtype : 'fieldcontainer',
                                layout : 'hbox',
                                items : [{
                                            xtype : 'fieldcontainer',
                                            layout : 'hbox',
                                            fieldLabel : '已核应收银行款借方汇总',
                                            items : [{
                                                        xtype : 'textfield',
                                                        name : 'yhys_bamt_from',
                                                        margin : '0 10 0 0',
                                                        width : 180,
                                                        vtype : "money"
                                                    }, {
                                                        xtype : 'textfield',
                                                        name : 'yhys_bamt_to',
                                                        width : 180,
                                                        margin : '0 10 0 0',
                                                        vtype : "money"
                                                    }]
                                        }, {
                                            xtype : 'fieldcontainer',
                                            layout : 'hbox',
                                            fieldLabel : '已核应付银行款贷方汇总',
                                            items : [{
                                                        xtype : 'textfield',
                                                        name : 'yhyf_bamt_from',
                                                        margin : '0 10 0 0',
                                                        width : 180,
                                                        vtype : "money"
                                                    }, {
                                                        xtype : 'textfield',
                                                        name : 'yhyf_bamt_to',
                                                        width : 180,
                                                        margin : '0 10 0 0',
                                                        vtype : "money"
                                                    }]
                                        }]
                            }, {
                                xtype : 'fieldcontainer',
                                layout : 'hbox',
                                items : [{
                                            xtype : 'fieldcontainer',
                                            layout : 'hbox',
                                            fieldLabel : '已核应收银行手续费借方汇总',
                                            items : [{
                                                        xtype : 'textfield',
                                                        name : 'yhys_bfee_from',
                                                        margin : '0 10 0 0',
                                                        width : 180,
                                                        vtype : "money"
                                                    }, {
                                                        xtype : 'textfield',
                                                        name : 'yhys_bfee_to',
                                                        width : 180,
                                                        margin : '0 10 0 0',
                                                        vtype : "money"
                                                    }]
                                        }, {
                                            xtype : 'fieldcontainer',
                                            layout : 'hbox',
                                            fieldLabel : '已核应付银行手续费贷方汇总',
                                            items : [{
                                                        xtype : 'textfield',
                                                        name : 'yhyf_bfee_from',
                                                        margin : '0 10 0 0',
                                                        width : 180,
                                                        vtype : "money"
                                                    }, {
                                                        xtype : 'textfield',
                                                        name : 'yhyf_bfee_to',
                                                        width : 180,
                                                        margin : '0 10 0 0',
                                                        vtype : "money"
                                                    }]
                                        }]
                            }, {
                                xtype : 'fieldcontainer',
                                layout : 'hbox',
                                items : [{
                                            xtype : 'fieldcontainer',
                                            layout : 'hbox',
                                            fieldLabel : '备付金银行短款金额',
                                            items : [{
                                                        xtype : 'textfield',
                                                        name : 'bfj_bsc_from',
                                                        margin : '0 10 0 0',
                                                        width : 180,
                                                        vtype : "money"
                                                    }, {
                                                        xtype : 'textfield',
                                                        name : 'bfj_bsc_to',
                                                        width : 180,
                                                        margin : '0 10 0 0',
                                                        vtype : "money"
                                                    }]
                                        }, {
                                            xtype : 'fieldcontainer',
                                            layout : 'hbox',
                                            fieldLabel : '自有资金银行短款金额',
                                            items : [{
                                                        xtype : 'textfield',
                                                        name : 'zyzj_bsc_from',
                                                        margin : '0 10 0 0',
                                                        width : 180,
                                                        vtype : "money"
                                                    }, {
                                                        xtype : 'textfield',
                                                        name : 'zyzj_bsc_to',
                                                        width : 180,
                                                        margin : '0 10 0 0',
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
												id : 'yspzq_y0012_period_to'
											},
											vtype : 'dateinterval',
											width : 180
										}, {
											xtype : 'datefield',
											id : 'yspzq_y0012_period_to',
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
											width : 320
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
					id : 'yspzq_y0012_grid',
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
                                text : "备付金帐号",
                                itemId : 'bfj_acct',
                                dataIndex : 'bfj_acct',
                                sortable : false,
                                renderer : function(value, p, record) {
                                    var bfjacct = Ext.data.StoreManager
                                            .lookup('Zixweb.store.component.BfjAcct');
                                    var index = bfjacct.findExact('id', value);
                                    return bfjacct.getAt(index).data.name;
                                },
                                flex : 2
                             }, {
                                text : "自有资金银行账号",
                                itemId : 'zyzj_acct',
                                dataIndex : 'zyzj_acct',
                                sortable : false,
                                renderer : function(value, p, record) {
                                    var zyzjacct = Ext.data.StoreManager
                                            .lookup('Zixweb.store.component.ZyzjAcct');
                                    var index = zyzjacct.findExact('id', value);
                                    return zyzjacct.getAt(index).data.name;
                                },
                                flex : 2
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
								text : "录入员",
								dataIndex : 'crt_user',
								sortable : false,
								flex : 2
							}, {
								text : "备注",
								dataIndex : 'cause',
								sortable : false,
								flex : 2,
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
												.down('center'), id = 'yspzq_detail_0012'
												+ rec.data.id, cmp = Ext
												.getCmp(id);
										var yspzqdetail = Ext
												.createByAlias('widget.yspzqdetail');
										yspzqdetail.store.load({
													params : {
														ys_type : '0012',
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
												id : 'yspzq_detail_0012'
														+ rec.data.id,
												title : '凭证0012' + '编号'
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
													ys_type : '0012',
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
