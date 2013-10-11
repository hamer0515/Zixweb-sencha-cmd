Ext.define('Zixweb.view.book.detail.lfee_psp', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.book_detail_lfee_psp',

	defaults : {
		bodyPadding : 5,
		collapsible : true,
		border : false
	},

	initComponent : function() {
		var store = new Ext.data.Store({
					fields : ['c','cust_proto','tx_date', 'period', 'j', 'd'],

					pageSize : 50,
					remoteSort : true,

					proxy : {
						type : 'ajax',
						api : {
							read : 'book/detail/lfee_psp'
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
							var form = Ext.getCmp('lfeepspdetailform')
									.getForm();
							var values = form.getValues();
							var grid = Ext
									.getCmp('book_detail_lfee_psp_grid');
							grid.down('#c').hide();
							grid.down('#cust_proto').hide();
							grid.down('#tx_date').hide();
							grid.down('#period').hide();
							var columns = grid.columns;
							if (values.fir) {
								var fir = grid.down('#' + values.fir);
								fir.show();
								var oldindex = grid.headerCt
										.getHeaderIndex(fir);
								if (oldindex != 0) {
									grid.headerCt.move(oldindex, 0);
								}
							}
							if (values.sec) {
								var sec = grid.down('#' + values.sec);
								sec.show();
								var oldindex = grid.headerCt
										.getHeaderIndex(sec);
								if (oldindex != 1) {
									grid.headerCt.move(oldindex, 1);
								}
							}
							if (values.thi) {
								var thi = grid.down('#' + values.thi);
								thi.show();
								var oldindex = grid.headerCt
										.getHeaderIndex(thi);
								if (oldindex != 2) {
									grid.headerCt.move(oldindex, 2);
								}
							}
							if (values.fou) {
								var fou = grid.down('#' + values.fou);
								fou.show();
								var oldindex = grid.headerCt
										.getHeaderIndex(fou);
								if (oldindex != 3) {
									grid.headerCt.move(oldindex, 3);
								}
							}
							if (!(values.fir || values.sec || values.thi || values.fou)) {
								grid.down('#c').show();
								grid.down('#cust_proto').show();
								grid.down('#tx_date').show();
								grid.down('#period').show();
								var fir = grid.down('#c');
								var sec = grid.down('#cust_proto');
								var thi = grid.down('#tx_date');
								var fou = grid.down('#period');
								var firindex = grid.headerCt
										.getHeaderIndex(fir);
									grid.headerCt.move(firindex, 0);
							    var secindex = grid.headerCt
										.getHeaderIndex(sec);
									grid.headerCt.move(secindex, 1);
								var thiindex = grid.headerCt
										.getHeaderIndex(thi);
									grid.headerCt.move(thiindex, 2);
								var fouindex = grid.headerCt
										.getHeaderIndex(fou);
									grid.headerCt.move(fouindex, 3);
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
											msg : '分润方承担品牌费科目详细数据加载失败,请联系管理员',
											buttons : Ext.Msg.YES,
											icon : Ext.Msg.ERROR
										});
								return;
							}
							var jsonData = thiz.proxy.reader.jsonData.success;
							if (jsonData && jsonData === 'forbidden') {
								Ext.MessageBox.show({
											title : '警告',
											msg : '抱歉，没有分润方承担品牌费科目详细数据访问权限',
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
					id : 'lfeepspdetailform',

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
												id : 'book_detail_lfee_psp_to_1'
											},
											vtype : 'dateinterval',
											width : 180 
										}, {
											xtype : 'datefield',
											id : 'book_detail_lfee_psp_to_1',
											format : 'Y-m-d',
											name : 'period_to',
											margin : '0 10 0 0',
											allowBlank : false,
											width : 180 
										}, {
											xtype : 'textfield',
											name : 'c',
                                            width : 516,
											fieldLabel : '客户编号'
										}  ]
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
												id : 'book_detail_lfee_psp_to_2'
											},
											vtype : 'dateinterval',
											width : 180 
										}, {
											xtype : 'datefield',
											id : 'book_detail_lfee_psp_to_2',
											format : 'Y-m-d',
											name : 'tx_date_to',
											margin : '0 10 0 0',
											width : 180  
										}, {
											xtype : 'textfield',
											name : 'cust_proto',
                                            width : 516,
											fieldLabel : '客户协议编号'
										}  ]
							}, {
								xtype : 'hsx',
								data : [{
											'value' : "c",
											'name' : "客户编号"
										}, { 
                                            'value' : "cust_proto",
                                            'name' : "客户协议编号"
										}, { 
                                            'value' : "tx_date",
                                            'name' : "交易日期"
										}, { 
											'value' : "period",
											'name' : "期间日期"
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
					id : 'book_detail_lfee_psp_grid',
					height : 500,
					store : this.store,
					dockedItems : [{
								xtype : 'pagingtoolbar',
								store : this.store,
								dock : 'bottom',
								displayInfo : true
							}],
					columns : [{
						text : "客户编号",
						itemId : 'c',
						dataIndex : 'c',
						sortable : false,
						flex : 1
					}, {
						text : "客户协议编号",
						itemId : 'cust_proto',
						dataIndex : 'cust_proto',
						sortable : false,
						flex : 1 
					}, {
						text : "交易日期",
						dataIndex : 'tx_date',
						itemId : 'tx_date',
						sortable : false,
						flex : 1,
						renderer : Ext.util.Format.dateRenderer('Y年m月d日')
					}, {
						text : "期间日期",
						dataIndex : 'period',
						itemId : 'period',
						sortable : false,
						flex : 1,
						renderer : Ext.util.Format.dateRenderer('Y年m月d日')
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
