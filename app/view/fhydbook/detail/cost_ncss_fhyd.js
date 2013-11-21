Ext.define('Zixweb.view.fhydbook.detail.cost_ncss_fhyd', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.book_detail_cost_ncss_fhyd',

	defaults : {
		border : false
	},

	initComponent : function() {
		var store = new Ext.data.Store({
			fields : [ 'fc', 'period','fhw_type','f_ssn','j', 'd'],

			pageSize : 50,
			remoteSort : true,

			proxy : {
				type : 'ajax',
				api : {
					read : 'book/detail/cost_ncss_fhyd'
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
					var form = Ext.getCmp('costncssfhyddetailform').getForm();
					var values = form.getValues();
					var grid = Ext.getCmp('book_detail_cost_ncss_fhyd_grid');
					grid.down('#fc').hide();
					grid.down('#period').hide();
                    grid.down('#fhw_type').hide();
                    grid.down('#f_ssn').hide();
					var columns = grid.columns;
					if (values.fir) {
						var fir = grid.down('#' + values.fir);
						fir.show();
						var oldindex = grid.headerCt.getHeaderIndex(fir);
						if (oldindex != 0) {
							grid.headerCt.move(oldindex, 0);
						}
					}
					if (values.sec) {
						var sec = grid.down('#' + values.sec);
						sec.show();
						var oldindex = grid.headerCt.getHeaderIndex(sec);
						if (oldindex != 1) {
							grid.headerCt.move(oldindex, 1);
						}
					}
					if (values.thi) {
						var thi = grid.down('#' + values.thi);
						thi.show();
						var oldindex = grid.headerCt.getHeaderIndex(thi);
						if (oldindex != 2) {
							grid.headerCt.move(oldindex, 2);
						}
					}
					if (values.fou) {
						var fou = grid.down('#' + values.fou);
						fou.show();
						var oldindex = grid.headerCt.getHeaderIndex(fou);
						if (oldindex != 3) {
							grid.headerCt.move(oldindex, 3);
						}
					}

					

					if (!(values.fir || values.sec || values.thi || values.fou )) {
						grid.down('#fc').show();
						grid.down('#period').show();
						grid.down('#fhw_type').show();
						grid.down('#f_ssn').show();
						var fir = grid.down('#fc');
						var sec = grid.down('#period');
                        var thi = grid.down('#fhw_type');
                        var fou = grid.down('#f_ssn');
						var firindex = grid.headerCt.getHeaderIndex(fir);
						if (firindex != 0) {
							grid.headerCt.move(firindex, 0);
						}
						var secindex = grid.headerCt.getHeaderIndex(sec);
						if (secindex != 1) {
							grid.headerCt.move(secindex, 1);
						}
						var thiindex = grid.headerCt.getHeaderIndex(thi);
						if (thiindex != 2) {
							grid.headerCt.move(thiindex, 2);
						}
						var fouindex = grid.headerCt.getHeaderIndex(fou);
						if (fouindex != 3) {
							grid.headerCt.move(fouindex, 3);
						}
					}
					grid.getView().refresh();
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
									msg : '成本-非银行卡损失科目详细数据加载失败,请联系管理员',
									buttons : Ext.Msg.YES,
									icon : Ext.Msg.ERROR
								});
						return;
					}
					var jsonData = thiz.proxy.reader.jsonData.success;
					if (jsonData && jsonData === 'forbidden') {
						Ext.MessageBox.show({
									title : '警告',
									msg : '抱歉，没有成本-非银行卡损失科目详细数据访问权限',
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
					id : 'costncssfhyddetailform',
					bodyPadding : 5,
					collapsible : true,

					fieldDefaults : {
						labelWidth : 140
					},
					items : [{
								xtype : 'fieldcontainer',
								fieldLabel : '会计期间',
								layout : 'hbox',
								items : [{
											xtype : 'datefield',
											format : 'Y-m-d',
											name : 'period_from',
											margin : '0 10 0 0',
											allowBlank : false,
											verify : {
												id : 'book_detail_cost_ncss_fhyd_to'
											},
											vtype : 'dateinterval',
											width : 180
										}, {
											xtype : 'datefield',
											id : 'book_detail_cost_ncss_fhyd_to',
											format : 'Y-m-d',
											name : 'period_to',
											margin : '0 10 0 0',
											allowBlank : false,
											width : 180
										}, {
											xtype : 'textfield',
											name : 'fc',
											width : 516,
											fieldLabel : '客户编号'
                                        } ]
							}, {
                                xtype : 'fieldcontainer',
                                layout : 'hbox',
                                items: [{  xtype : 'fhwtype',
											name : 'fhw_type',
											width : 516,
											margin : '0 10 0 0',
											fieldLabel : ' 货物类型'
                                       }, {
                                            xtype : 'textfield',
											name : 'f_ssn',
											width : 516,
											fieldLabel : '唯一销卡编号'
                                       }]
                            }, {
								xtype : 'hsx',
								data : [ {
											'value' : "fc",
											'name' : "客户编号"
										}, {
											'value' : "period",
											'name' : "期间日期"
										}, { 
											'value' : "fhw_type",
											'name' : " 货物类型"
                                        }, {
											'value' : "f_ssn",
											'name' : "唯一销卡编号"
                                        } ]
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
					id : 'book_detail_cost_ncss_fhyd_grid',
					height : 'auto',
					store : this.store,
					dockedItems : [{
								xtype : 'pagingtoolbar',
								store : this.store,
								dock : 'bottom',
								displayInfo : true
							}],
					columns : [ {
						text : "客户编号",
						dataIndex : 'fc',
						itemId : 'fc',
						sortable : false,
						flex : 1
					}, {
						text : "期间日期",
						dataIndex : 'period',
						itemId : 'period',
						sortable : false,
						flex : 1,
						renderer : Ext.util.Format.dateRenderer('Y年m月d日')
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
						dataIndex : 'f_ssn',
						itemId : 'f_ssn',
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
						width : 100,
						sortable : false,
						flex : 1,
						renderer : function(value) {
							return Ext.util.Format.number(
									parseInt(value) / 100, '0,0.00');
						}
					}]
				}];
		this.callParent(arguments);
	}
});
