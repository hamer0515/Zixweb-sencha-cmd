Ext.define('Zixweb.view.fhydbook.detail.deposit_fhyd', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.book_detail_deposit_fhyd',

	defaults : {
		border : false
	},

	initComponent : function() {
		var store = new Ext.data.Store({
					fields : ['fhyd_acct', 'period', 'j', 'd'],

					pageSize : 50,
					remoteSort : true,

					proxy : {
						type : 'ajax',
						api : {
							read : 'book/detail/deposit_fhyd'
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
							var form = Ext.getCmp('depositfhyddetailform')
									.getForm();
							if (form.isValid()) {
								var values = form.getValues();
								var grid = Ext
										.getCmp('book_detail_deposit_fhyd_grid');
								grid.down('#fhyd_acct').hide();
								grid.down('#period').hide();
								var hsxes = [];
								if (values.fir) {
									hsxes.push(values.fir);
								}
								if (values.sec) {
									hsxes.push(values.sec);
								}
								if (hsxes.length == 0) {
									grid.down('#fhyd_acct').show();
									grid.down('#period').show();
									var fir = grid.down('#fhyd_acct');
									var firindex = grid.headerCt
											.getHeaderIndex(fir);
									grid.headerCt.move(firindex, 0);
								} else {
									for (var i = 0; i < hsxes.length; i++) {
										var item = grid.down('#' + hsxes[i]);
										item.show();
									}
									for (var i = 0; i < hsxes.length; i++) {
										var item = grid.down('#' + hsxes[i]);
										var pos = grid.headerCt
												.getHeaderIndex(item);
										grid.headerCt.move(pos, i);
									}
								}
								grid.getView().refresh();
								store.proxy.extraParams = values;
							} else {
								return false;
							}
						},
						load : function(thiz, records, successful, eOpts) {
							if (!successful) {
								Ext.MessageBox.show({
											title : '警告',
											msg : '富汇易达科目详细数据加载失败,请联系管理员',
											buttons : Ext.Msg.YES,
											icon : Ext.Msg.ERROR
										});
								return;
							}
							var jsonData = thiz.proxy.reader.jsonData.success;
							if (jsonData && jsonData === 'forbidden') {
								Ext.MessageBox.show({
											title : '警告',
											msg : '抱歉，没有富汇易达科目详细数据访问权限',
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
					id : 'depositfhyddetailform',
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
												id : 'book_detail_deposit_fhyd_to'
											},
											vtype : 'dateinterval',
											width : 180
										}, {
											xtype : 'datefield',
											id : 'book_detail_deposit_fhyd_to',
											format : 'Y-m-d',
											name : 'period_to',
											margin : '0 10 0 0',
											allowBlank : false,
											width : 180
										}, {
											xtype : 'fhydacct',
											name : 'fhyd_acct',
											fieldLabel : '银行账户号及开户行'
										}]
							}, {
								xtype : 'hsx',
								data : [{
											'value' : "fhyd_acct",
											'name' : "富汇易达帐号"
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
					id : 'book_detail_deposit_fhyd_grid',
					height : 'auto',
					store : this.store,
					dockedItems : [{
								xtype : 'pagingtoolbar',
								store : this.store,
								dock : 'bottom',
								displayInfo : true
							}],
					columns : [{
						text : "富汇易达帐号",
						itemId : 'fhyd_acct',
						dataIndex : 'fhyd_acct',
						sortable : false,
						renderer : function(value, p, record) {
							var fhydacct = Ext.data.StoreManager
									.lookup('Zixweb.store.component.FhydAcct');
							var index = fhydacct.findExact('id', value);
							return fhydacct.getAt(index).data.name;
						},
						flex : 2
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
