Ext.define('Zixweb.view.book.detail.deposit_bfj', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.book_detail_deposit_bfj',

	defaults : {
		border : false
	},

	initComponent : function() {
		var panel = this;
		var store = new Ext.data.Store({
					fields : ['bfj_acct', 'period', 'j', 'd'],

					pageSize : 50,
					remoteSort : true,

					proxy : {
						type : 'ajax',
						api : {
							read : 'book/detail/deposit_bfj'
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
							var form = Ext.getCmp('depositbfjdetailform')
									.getForm();
							if (form.isValid()) {
								var values = form.getValues();
								var grid = Ext
										.getCmp('book_detail_deposit_bfj_grid');
								grid.down('#bfj_acct').hide();
								grid.down('#period').hide();
								var hsxes = [];
								if (values.fir) {
									hsxes.push(values.fir);
								}
								if (values.sec) {
									hsxes.push(values.sec);
								}
								if (hsxes.length == 0) {
									grid.down('#bfj_acct').show();
									grid.down('#period').show();
									var fir = grid.down('#bfj_acct');
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
								panel.values = values;
							} else {
								return false;
							}
						},
						load : function(thiz, records, successful, eOpts) {
							if (!successful) {
								Ext.MessageBox.show({
											title : '警告',
											msg : '备付金存款科目详细数据加载失败,请联系管理员',
											buttons : Ext.Msg.YES,
											icon : Ext.Msg.ERROR
										});
								return;
							}
							var jsonData = thiz.proxy.reader.jsonData.success;
							if (jsonData && jsonData === 'forbidden') {
								Ext.MessageBox.show({
											title : '警告',
											msg : '抱歉，没有备付金存款科目详细数据访问权限',
											buttons : Ext.Msg.YES,
											icon : Ext.Msg.ERROR
										});
								return;
							}
							if (records.length > 0) {
								Ext
										.getCmp('book_detail_deposit_bfj_exporterbutton')
										.setDisabled(false);
							} else {
								Ext
										.getCmp('book_detail_deposit_bfj_exporterbutton')
										.setDisabled(true);
							}
						}
					}
				});
		this.store = store;
		var grid = new Ext.grid.Panel({
			id : 'book_detail_deposit_bfj_grid',
			height : 'auto',
			store : store,
			border : false,
			dockedItems : [{
						xtype : 'pagingtoolbar',
						store : store,
						dock : 'bottom',
						displayInfo : true
					}, {
						xtype : 'toolbar',
						dock : 'top',
						items : [Ext.create('Ext.ux.exporter.Button', {
									component : grid,
									id : 'book_detail_deposit_bfj_exporterbutton',
									text : "导出 Excel",
									disabled : true
								})
						// iconCls : 'refresh',
						// text : '下载excel',
						// tooltip : '下载excel'
						// handler : function() {
						// var count = store.getCount();
						// // if (count == 0) {
						// // return;
						// // } else
						// if (count > 10000) {
						// Ext.MessageBox.show({
						// title : '警告',
						// msg : '数据量超过上限10000条',
						// buttons : Ext.Msg.YES,
						// icon : Ext.Msg.WARNING
						// });
						// return;
						// }
						// Ext.Ajax.request({
						// async : false,
						// url :
						// 'book/detail/deposit_bfj_excel',
						// params : panel.values,
						// success : function(response, opts) {
						// var res = Ext
						// .decode(response.responseText);
						// Ext
						// .downloadURL('base/csv?file='
						// + res.file);
						// },
						// failure : function(response, opts) {
						// Ext.MessageBox.show({
						// title : '警告',
						// msg : '服务器端出错，错误码:'
						// + response.status,
						// buttons : Ext.Msg.YES,
						// icon : Ext.Msg.ERROR
						// });
						// }
						// });
						// }
						]
					}],
			columns : [{
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
					return Ext.util.Format.number(parseInt(value) / 100,
							'0,0.00');
				}
			}, {
				text : "贷方金额",
				dataIndex : 'd',
				width : 100,
				sortable : false,
				flex : 1,
				renderer : function(value) {
					return Ext.util.Format.number(parseInt(value) / 100,
							'0,0.00');
				}
			}]
		})

		this.items = [{
					xtype : 'form',
					title : '查询',
					id : 'depositbfjdetailform',
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
												id : 'book_detail_deposit_bfj_to'
											},
											vtype : 'dateinterval',
											width : 180
										}, {
											xtype : 'datefield',
											id : 'book_detail_deposit_bfj_to',
											format : 'Y-m-d',
											name : 'period_to',
											margin : '0 10 0 0',
											allowBlank : false,
											width : 180
										}, {
											xtype : 'bfjacct',
											name : 'bfj_acct',
											fieldLabel : '银行账户号及开户行'
										}]
							}, {
								xtype : 'hsx',
								data : [{
											'value' : "bfj_acct",
											'name' : "备付金帐号"
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
								margin : '0 20 0 0',
								handler : function(button) {
									button.up('panel').getForm().reset();
								}
							}]
				}, grid];
		this.callParent(arguments);
	}
});