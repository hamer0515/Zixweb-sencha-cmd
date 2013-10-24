Ext.define('Zixweb.view.book.detail.bfee_yhyf', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.book_detail_bfee_yhyf',

	defaults : {
		border : false
	},

	initComponent : function() {
		var store = new Ext.data.Store({
			fields : ['bfj_acct', 'period', 'zjbd_date', 'zjbd_type', 'j', 'd'],

			pageSize : 50,
			remoteSort : true,

			proxy : {
				type : 'ajax',
				api : {
					read : 'book/detail/bfee_yhyf'
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
					var form = Ext.getCmp('bfeeyhyfdetailform').getForm();
					var values = form.getValues();
					var grid = Ext.getCmp('book_detail_bfee_yhyf_grid');
					grid.down('#bfj_acct').hide();
					grid.down('#period').hide();
					grid.down('#zjbd_date').hide();
					grid.down('#zjbd_type').hide();
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

					if (!(values.fir || values.sec || values.thi || values.fou)) {
						grid.down('#bfj_acct').show();
						grid.down('#period').show();
						grid.down('#zjbd_date').show();
						grid.down('#zjbd_type').show();
						var fir = grid.down('#bfj_acct');
						var sec = grid.down('#period');
						var thi = grid.down('#zjbd_date');
						var fou = grid.down('#zjbd_type');
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
									msg : '已核应付银行手续费科目详细数据加载失败,请联系管理员',
									buttons : Ext.Msg.YES,
									icon : Ext.Msg.ERROR
								});
						return;
					}
					var jsonData = thiz.proxy.reader.jsonData.success;
					if (jsonData && jsonData === 'forbidden') {
						Ext.MessageBox.show({
									title : '警告',
									msg : '抱歉，没有已核应付银行手续费科目详细数据访问权限',
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
					id : 'bfeeyhyfdetailform',
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
												id : 'book_detail_bfee_yhyf_to'
											},
											vtype : 'dateinterval',
											width : 180
										}, {
											xtype : 'datefield',
											id : 'book_detail_bfee_yhyf_to',
											format : 'Y-m-d',
											name : 'period_to',
											margin : '0 10 0 0',
											allowBlank : false,
											width : 180
										}, {
											xtype : 'bfjacct',
											name : 'bfj_acct',
											margin : '0 10 0 0',
											fieldLabel : '备付金帐号'
										}]
							}, {
								xtype : 'fieldcontainer',
								fieldLabel : '资金变动日期',
								layout : 'hbox',
								items : [{
											xtype : 'datefield',
											format : 'Y-m-d',
											name : 'zjbd_date_from',
											margin : '0 10 0 0',
											verify : {
												id : 'book_detail_bfee_yhyf_to_2'
											},
											vtype : 'dateinterval',
											width : 180
										}, {
											xtype : 'datefield',
											id : 'book_detail_bfee_yhyf_to_2',
											format : 'Y-m-d',
											name : 'zjbd_date_to',
											margin : '0 10 0 0',
											width : 180
										}, {
											xtype : 'zjbdtype',
											name : 'zjbd_type',
											// margin : '0 10 0 0',
											fieldLabel : '资金变动类型'
										}]
							}, {
								xtype : 'hsx',
								data : [{
											'value' : "bfj_acct",
											'name' : "备付金银行账号"
										}, {
											'value' : "period",
											'name' : "期间日期"
										}, {
											'value' : "zjbd_date",
											'name' : "资金变动日期"
										}, {
											'value' : "zjbd_type",
											'name' : "资金变动类型"
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
					id : 'book_detail_bfee_yhyf_grid',
					height : 'auto',
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
						flex : 2
					}, {
						text : "期间日期",
						dataIndex : 'period',
						itemId : 'period',
						sortable : false,
						flex : 1,
						renderer : Ext.util.Format.dateRenderer('Y年m月d日')
					}, {
						text : "资金变动日期",
						itemId : 'zjbd_date',
						dataIndex : 'zjbd_date',
						sortable : false,
						flex : 1,
						renderer : Ext.util.Format.dateRenderer('Y年m月d日')
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
