Ext.define('Zixweb.view.book.detail.txamt_dqr_byf', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.book_detail_txamt_dqr_byf',

	defaults : {
		border : false
	},

	initComponent : function() {
		var store = new Ext.data.Store({
					fields : ['bi', 'tx_date', 'period', 'j', 'd'],

					pageSize : 50,
					remoteSort : true,

					proxy : {
						type : 'ajax',
						api : {
							read : 'book/detail/txamt_dqr_byf'
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
							var form = Ext.getCmp('txamtdqrbyfdetailform')
									.getForm();
							var values = form.getValues();
							var grid = Ext
									.getCmp('book_detail_txamt_dqr_byf_grid');
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
								var oldindex = grid.headerCt
										.getHeaderIndex(thi);
								if (oldindex != 2) {
									grid.headerCt.move(oldindex, 2);
								}
							}
							if (!(values.fir || values.sec || values.thi)) {
								grid.down('#bi').show();
								grid.down('#tx_date').show();
								grid.down('#period').show();
								var fir = grid.down('#bi');
								var fir = grid.down('#tx_date');
								var fir = grid.down('#period');
								var oldindex = grid.headerCt
										.getHeaderIndex(fir);
								grid.headerCt.move(oldindex, 0);
								var secindex = grid.headerCt
										.getHeaderIndex(sec);
								grid.headerCt.move(secindex, 1);
								var thiindex = grid.headerCt
										.getHeaderIndex(thi);
								grid.headerCt.move(thiindex, 2);
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
											msg : '暂估银行手续费科目详细数据加载失败,请联系管理员',
											buttons : Ext.Msg.YES,
											icon : Ext.Msg.ERROR
										});
								return;
							}
							var jsonData = thiz.proxy.reader.jsonData.success;
							if (jsonData && jsonData === 'forbidden') {
								Ext.MessageBox.show({
											title : '警告',
											msg : '抱歉，没有暂估银行手续费科目详细数据访问权限',
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
					id : 'txamtdqrbyfdetailform',
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
												id : 'book_detail_txamt_dqr_byf_to'
											},
											vtype : 'dateinterval',
											width : 180
										}, {
											xtype : 'datefield',
											id : 'book_detail_txamt_dqr_byf_to',
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
												id : 'book_detail_txamt_dqr_byf_to_2'
											},
											vtype : 'dateinterval',
											width : 180
										}, {
											xtype : 'datefield',
											format : 'Y-m-d',
											name : 'tx_date_to',
											// margin : '0 10 0 0',
											id : 'book_detail_txamt_dqr_byf_to_2',
											width : 180
										}]
							}, {
								xtype : 'hsx',
								data : [{
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

					xtype : 'gridpanel',
					id : 'book_detail_txamt_dqr_byf_grid',
					height : 'auto',
					store : this.store,
					dockedItems : [{
								xtype : 'pagingtoolbar',
								store : this.store,
								dock : 'bottom',
								displayInfo : true
							}],
					columns : [{
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
