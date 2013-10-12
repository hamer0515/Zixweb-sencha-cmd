Ext.define('Zixweb.view.book.detail.txamt_yhys', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.book_detail_txamt_yhys',

	defaults : {
		bodyPadding : 5,
		collapsible : true,

		border : false
	},

	initComponent : function() {
		var store = new Ext.data.Store({
			fields : ['bfj_acct', 'zjbd_type', 'zjbd_date', 'period', 'j', 'd'],

			pageSize : 50,
			remoteSort : true,

			proxy : {
				type : 'ajax',
				api : {
					read : 'book/detail/txamt_yhys'
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
					var form = Ext.getCmp('txamtyhysdetailform').getForm();
					if (form.isValid()) {
						var values = form.getValues();
						var grid = Ext.getCmp('book_detail_txamt_yhys_grid');
						grid.down('#bfj_acct').hide();
						grid.down('#zjbd_type').hide();
						grid.down('#zjbd_date').hide();
						grid.down('#period').hide();
						var hsxes = [];
						if (values.fir) {
							hsxes.push(values.fir);
						}
						if (values.sec) {
							hsxes.push(values.sec);
						}
						if (values.thi) {
							hsxes.push(values.thi);
						}
						if (values.fou) {
							hsxes.push(values.fou);
						}
						if (!values) {
							grid.down('#bfj_acct').show();
							grid.down('#zjbd_type').show();
							grid.down('#zjbd_date').show();
							grid.down('#period').show();
							var fir = grid.down('#bfj_acct');
							var firindex = grid.headerCt.getHeaderIndex(fir);
							grid.headerCt.move(firindex, 0);
							var sec = grid.down('#zjbd_type');
							var secindex = grid.headerCt.getHeaderIndex(sec);
							grid.headerCt.move(secindex, 1);
							var thi = grid.down('#zjbd_date');
							var thiindex = grid.headerCt.getHeaderIndex(thi);
							grid.headerCt.move(thiindex, 2);
							var fou = grid.down('#period');
							var fouindex = grid.headerCt.getHeaderIndex(fou);
							grid.headerCt.move(fouindex, 3);
						} else {
							for (var i = 0; i < hsxes.length; i++) {
								var item = grid.down('#' + hsxes[i]);
								item.show();
							}
							for (var i = 0; i < hsxes.length; i++) {
								var item = grid.down('#' + hsxes[i]);
								var pos = grid.headerCt.getHeaderIndex(item);
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
									msg : '已核应收交易款科目详细数据加载失败,请联系管理员',
									buttons : Ext.Msg.YES,
									icon : Ext.Msg.ERROR
								});
						return;
					}
					var jsonData = thiz.proxy.reader.jsonData.success;
					if (jsonData && jsonData === 'forzjbd_typedden') {
						Ext.MessageBox.show({
									title : '警告',
									msg : '抱歉，没有已核应收交易款科目详细数据访问权限',
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
					id : 'txamtyhysdetailform',

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
												id : 'book_detail_txamt_yhys_to'
											},
											vtype : 'dateinterval',
											width : 180
										}, {
											xtype : 'datefield',
											id : 'book_detail_txamt_yhys_to',
											format : 'Y-m-d',
											name : 'period_to',
											margin : '0 10 0 0',
											allowBlank : false,
											width : 180
										}, {
											xtype : 'bfjacct',
											name : 'bfj_acct',
											fieldLabel : '备付金帐号'
										}]
							}, {
								xtype : 'fieldcontainer',
								fieldLabel : '资金变动日期范围',
								layout : 'hbox',
								items : [{
											xtype : 'datefield',
											format : 'Y-m-d',
											name : 'zjbd_date_from',
											margin : '0 10 0 0',
											verify : {
												id : 'book_detail_txamt_yhys_to_2'
											},
											vtype : 'dateinterval',
											width : 180
										}, {
											xtype : 'datefield',
											id : 'book_detail_txamt_yhys_to_2',
											format : 'Y-m-d',
											name : 'zjbd_date_to',
											margin : '0 10 0 0',
											width : 180
										}, {
											xtype : 'zjbdtype',
											name : 'zjbd_type',
											fieldLabel : '资金变动类型'
										}]
							}, {
								xtype : 'hsx',
								data : [{
											'value' : "bfj_acct",
											'name' : "备付金帐号"
										}, {
											'value' : "zjbd_type",
											'name' : "资金变动类型"
										}, {
											'value' : "zjbd_date",
											'name' : "资金变动日期"
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
					id : 'book_detail_txamt_yhys_grid',
					height : 500,
					store : this.store,
					dockedItems : [{
								xtype : 'pagingtoolbar',
								store : this.store,
								dock : 'bottom',
								displayInfo : true
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
						flex : 1
					}, {
						text : "资金变动类型",
						itemId : 'zjbd_type',
						dataIndex : 'zjbd_type',
						sortable : false,
						renderer : function(value, p, record) {
							var zjbdtype = Ext.data.StoreManager
									.lookup('Zixweb.store.component.ZjbdType');
							var index = zjbdtype.findExact('id', value);
							return zjbdtype.getAt(index).data.name;
						},
						flex : 1
					}, {
						text : "资金变动日期",
						dataIndex : 'zjbd_date',
						itemId : 'zjbd_date',
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