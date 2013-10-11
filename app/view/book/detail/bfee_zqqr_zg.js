Ext.define('Zixweb.view.book.detail.bfee_zqqr_zg', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.book_detail_bfee_zqqr_zg',

	defaults : {
		bodyPadding : 5,
		collapsible : true,

		border : false
	},

	initComponent : function() {
		var store = new Ext.data.Store({
					fields : ['fp', 'c', 'p', 'bi', 'tx_date', 'period', 'j',
							'd'],

					pageSize : 50,
					remoteSort : true,

					proxy : {
						type : 'ajax',
						api : {
							read : 'book/detail/bfee_zqqr_zg'
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
							var form = Ext.getCmp('bfeezqqrzgdetailform')
									.getForm();
							var values = form.getValues();
							var grid = Ext
									.getCmp('book_detail_bfee_zqqr_zg_grid');
							grid.down('#fp').hide();
							grid.down('#c').hide();
							grid.down('#p').hide();
							grid.down('#bi').hide();
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
								var oldindex_thi = grid.headerCt
										.getHeaderIndex(thi);
								if (oldindex_thi != 2) {
									grid.headerCt.move(oldindex_thi, 2);
								}
							}
							if (values.fou) {
								var fou = grid.down('#' + values.fou);
								fou.show();
								var oldindex_fou = grid.headerCt
										.getHeaderIndex(fou);
								if (oldindex_fou != 3) {
									grid.headerCt.move(oldindex_fou, 3);
								}
							}
							if (values.fiv) {
								var fiv = grid.down('#' + values.fiv);
								fiv.show();
								var oldindex_fiv = grid.headerCt
										.getHeaderIndex(fiv);
								if (oldindex_fiv != 4) {
									grid.headerCt.move(oldindex_fiv, 4);
								}
							}
							if (values.six) {
								var six = grid.down('#' + values.six);
								six.show();
								var oldindex_six = grid.headerCt
										.getHeaderIndex(six);
								if (oldindex_six != 5) {
									grid.headerCt.move(oldindex_six, 5);
								}
							}
							if (!(values.fir || values.sec || values.thi
									|| values.fou || values.fiv || values.six)) {
								grid.down('#c').show();
								grid.down('#p').show();
								grid.down('#fp').show();
								grid.down('#bi').show();
								grid.down('#tx_date').show();
								grid.down('#period').show();

								var fir = grid.down('#c');
								var firindex = grid.headerCt
										.getHeaderIndex(fir);
								grid.headerCt.move(firindex, 0);
								var sec = grid.down('#p');
								var secindex = grid.headerCt
										.getHeaderIndex(sec);
								grid.headerCt.move(secindex, 1);
								var thi = grid.down('#fp');
								var thiindex = grid.headerCt
										.getHeaderIndex(thi);
								grid.headerCt.move(thiindex, 2);
								var fou = grid.down('#bi');
								var fouindex = grid.headerCt
										.getHeaderIndex(fou);
								grid.headerCt.move(oldindex, 3);
								var fiv = grid.down('#tx_date');
								var fivindex = grid.headerCt
										.getHeaderIndex(fiv);
								grid.headerCt.move(fivindex, 4);
								var six = grid.down('#period');
								var sixindex = grid.headerCt
										.getHeaderIndex(six);
								grid.headerCt.move(sixindex, 5);

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
											msg : '暂估周期确认银行手续费科目详细数据加载失败,请联系管理员',
											buttons : Ext.Msg.YES,
											icon : Ext.Msg.ERROR
										});
								return;
							}
							var jsonData = thiz.proxy.reader.jsonData.success;
							if (jsonData && jsonData === 'forbidden') {
								Ext.MessageBox.show({
											title : '警告',
											msg : '抱歉，没有暂估周期确认银行手续费科目详细数据访问权限',
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
					id : 'bfeezqqrzgdetailform',

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
												id : 'book_detail_bfee_zqqr_zg_to'
											},
											vtype : 'dateinterval',
											width : 180
										}, {
											xtype : 'datefield',
											id : 'book_detail_bfee_zqqr_zg_to',
											format : 'Y-m-d',
											name : 'period_to',
											margin : '0 10 0 0',
											allowBlank : false,
											width : 180
										}, {
											xtype : 'bi',
											name : 'bi',
											fieldLabel : '银行接口编号'
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
												id : 'book_detail_bfee_zqqr_zg_to_2'
											},
											width : 180
										}, {
											xtype : 'datefield',
											id : 'book_detail_bfee_zqqr_zg_to_2',
											format : 'Y-m-d',
											name : 'tx_date_to',
											margin : '0 10 0 0',
											width : 180
										}, {
											xtype : 'textfield',
											name : 'c',
											fieldLabel : '客户id',
											width : 516
										}]
							}, {
								xtype : 'fieldcontainer',
								layout : 'hbox',
								items : [{
											xtype : 'textfield',
											name : 'fp',
											margin : '0 10 0 0',
											width : 516,
											fieldLabel : '周期确认规则'
										}, {
											xtype : 'product',
											name : 'p',
											width : 516,
											fieldLabel : '产品类型ID'
										}]
							}, {
								xtype : 'hsx',
								data : [{
											'value' : "c",
											'name' : "客户ID"
										}, {
											'value' : "p",
											'name' : "产品类型ID"
										}, {
											'value' : "fp",
											'name' : "周期确认规则"
										}, {
											'value' : "bi",
											'name' : "银行接口编号"
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
					id : 'book_detail_bfee_zqqr_zg_grid',
					height : 500,
					store : this.store,
					dockedItems : [{
								xtype : 'pagingtoolbar',
								store : this.store,
								dock : 'bottom',
								displayInfo : true
							}],
					columns : [{
								text : "客户id",
								itemId : 'c',
								dataIndex : 'c',
								sortable : false,
								flex : 1
							}, {
								text : "产品类型ID",
								itemId : 'p',
								dataIndex : 'p',
								sortable : false,
								renderer : function(value, p, record) {
									var product = Ext.data.StoreManager
											.lookup('Zixweb.store.component.Product');
									var index = product.findExact('id', value);
									return product.getAt(index).data.name;
								},
								flex : 1
							}, {
								text : "周期确认规则",
								itemId : 'fp',
								dataIndex : 'fp',
								sortable : false,
								flex : 1
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