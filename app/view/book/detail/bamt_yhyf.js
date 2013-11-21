Ext.define('Zixweb.view.book.detail.bamt_yhyf', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.book_detail_bamt_yhyf',
	prefix : 'book_detail_bamt_yhyf',
	defaults : {
		border : false
	},

	initComponent : function() {
		var panel = this;
		var columns = {
				zyzj_acct:{
					text : "自有资金帐号",
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
				}, 
				period:{
					text : "期间日期",
					dataIndex : 'period',
					itemId : 'period',
					sortable : false,
					flex : 1,
					renderer : Ext.util.Format.dateRenderer('Y年m月d日')
				}, 
				zjbd_date:{
					text : "资金变动日期",
					itemId : 'zjbd_date',
					dataIndex : 'zjbd_date',
					sortable : false,
					flex : 1,
					renderer : Ext.util.Format.dateRenderer('Y年m月d日')
				}, 
				zjbd_type:{
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
				}, 
				j:{
					text : "借方金额",
					dataIndex : 'j',
					sortable : false,
					flex : 1,
					renderer : function(value) {
						return Ext.util.Format.number(
								parseInt(value) / 100, '0,0.00');
					}
				}, 
				d:{
					text : "贷方金额",
					dataIndex : 'd',
					width : 100,
					sortable : false,
					flex : 1,
					renderer : function(value) {
						return Ext.util.Format.number(
								parseInt(value) / 100, '0,0.00');
					}
				}
			};
		
		var store = new Ext.data.Store({
			fields : ['zyzj_acct', 'period', 'zjbd_date', 'zjbd_type', 'j', 'd'],

			pageSize : 50,
			remoteSort : true,

			proxy : {
				type : 'ajax',
				api : {
					read : 'book/detail/bamt_yhyf'
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
					var form = Ext.getCmp(panel.prefix + '_form').getForm();
					if (form.isValid()) {
						var values = form.getValues();
						var cols = [];
						var grid = Ext.getCmp(panel.prefix + '_grid');
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
						if (hsxes.length == 0) {
							for (var key in columns) {
								cols.push(columns[key]);
							}
						} else {
							for (var i = 0; i < hsxes.length; i++) {
								cols.push(columns[hsxes[i]]);
							}
							cols.push(columns.j);
							cols.push(columns.d);
						}
						grid.reconfigure(store, cols);
						store.proxy.extraParams = values;
					} else {
						return false;
					}
				},
				load : function(thiz, records, successful, eOpts) {
					if (!successful) {
						Ext.MessageBox.show({
									title : '警告',
									msg : '已核应付银行款科目详细数据加载失败,请联系管理员',
									buttons : Ext.Msg.YES,
									icon : Ext.Msg.ERROR
								});
						return;
					}
					var jsonData = thiz.proxy.reader.jsonData.success;
					if (jsonData && jsonData === 'forbidden') {
						Ext.MessageBox.show({
									title : '警告',
									msg : '抱歉，没有已核应付银行款科目详细数据访问权限',
									buttons : Ext.Msg.YES,
									icon : Ext.Msg.ERROR
								});
						return;
					}
					panel.values = Ext.getCmp(panel.prefix + '_form').getForm()
							.getValues();
					if (records.length > 0) {
						Ext.getCmp(panel.prefix + '_exporterbutton')
								.setDisabled(false);
					} else {
						Ext.getCmp(panel.prefix + '_exporterbutton')
								.setDisabled(true);
					}
				}
			}
		});
		var grid = new Ext.grid.Panel({
			id : panel.prefix + '_grid',
			store : store,
			dockedItems : [{
						xtype : 'pagingtoolbar',
						store : store
					}],
			columns : [columns.zyzj_acct,columns.period,columns.zjbd_date,
			           columns.zjbd_type,columns.j,columns.d]
		});
		this.items = [{
					xtype : 'form',
					title : '查询',
					id : panel.prefix + '_form',
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
												id : panel.prefix + '_to'
											},
											vtype : 'dateinterval',
											width : 180
										}, {
											xtype : 'datefield',
											id : panel.prefix + '_to',
											format : 'Y-m-d',
											name : 'period_to',
											margin : '0 10 0 0',
											allowBlank : false,
											width : 180
										}, {
											xtype : 'zyzjacct',
											name : 'zyzj_acct',
											margin : '0 10 0 0',
											fieldLabel : '自有资金银行账号'
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
												id : panel.prefix + '_to_2'
											},
											vtype : 'dateinterval',
											width : 180
										}, {
											xtype : 'datefield',
											id : panel.prefix + '_to_2',
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
											'value' : "zyzj_acct",
											'name' : "自有资金银行账号"
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
								margin : '0 20 0 0',
								handler : function(button) {
									button.up('panel').getForm().reset();
								}
							},{
								xtype : 'button',
								id : panel.prefix + '_exporterbutton',
								text : '导出Excel',
								disabled : true,
								handler : function() {
									var count = store.getTotalCount();
									if (count == 0) {
										return;
									} else if (count > 10000) {
										Ext.MessageBox.show({
													title : '警告',
													msg : '数据量超过上限10000条',
													buttons : Ext.Msg.YES,
													icon : Ext.Msg.WARNING
												});
										return;
									}
									var params = panel.values;
									var columns = grid.headerCt.gridDataColumns;
									var h = {
										headers : []
									};
									for (var i in columns) {
										var c = columns[i];
										if (!c.dataIndex) {
											continue;
										}
										h[c.dataIndex] = c.text;
										h.headers.push(c.dataIndex);
									}
									params.header = Ext.encode(h);
									Ext.Ajax.request({
										async : false,
										url : 'book/detail/bamt_yhyf_excel',
										params : params,
										success : function(response, opts) {
											var res = Ext.decode(response.responseText);
											Ext.downloadURL('base/excel?file='
													+ res.file);
										},
										failure : function(response, opts) {
											Ext.MessageBox.show({
														title : '警告',
														msg : '服务器端出错，错误码:'
																+ response.status,
														buttons : Ext.Msg.YES,
														icon : Ext.Msg.ERROR
													});
										}
									});
								}
							}]
				}, grid];
		this.callParent(arguments);
	}
});
