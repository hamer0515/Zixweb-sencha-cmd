Ext.define('Zixweb.view.book.detail.fee_jrjg', {
			extend : 'Ext.panel.Panel',
			alias : 'widget.book_detail_fee_jrjg',
			prefix : 'book_detail_fee_jrjg',
			defaults : {
				border : false
			},

			initComponent : function() {
		var panel = this;
		var columns = {};				var store = new Ext.data.Store({
							fields : ['acct', 'period', 'j', 'd'],

							pageSize : 50,
							remoteSort : true,

							proxy : {
								type : 'ajax',
								api : {
									read : 'book/detail/fee_jrjg'
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
								load : function(thiz, records, successful,
										eOpts) {
									if (!successful) {
										Ext.MessageBox.show({
													title : '警告',
													msg : '金融机构手续费科目详细数据加载失败,请联系管理员',
													buttons : Ext.Msg.YES,
													icon : Ext.Msg.ERROR
												});
										return;
									}
									var jsonData = thiz.proxy.reader.jsonData.success;
									if (jsonData && jsonData === 'forbidden') {
										Ext.MessageBox.show({
													title : '警告',
													msg : '抱歉，没有金融机构手续费科目详细数据访问权限',
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
									columns : [columns.bfj_acct, columns.zjbd_type, columns.zjbd_date, 
												columns.period, columns.j, columns.d]
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
														id : 'book_detail_fee_jrjg_to'
													},
													vtype : 'dateinterval',
													width : 180
												}, {
													xtype : 'datefield',
													id : 'book_detail_fee_jrjg_to',
													format : 'Y-m-d',
													name : 'period_to',
													margin : '0 10 0 0',
													allowBlank : false,
													width : 180
												}, {
													xtype : 'acct',
													name : 'acct',
													// margin : '0 10 0 0',
													fieldLabel : '银行账户号及开户行'
												}]
									}, {
										xtype : 'hsx',
										data : [{
													'value' : "acct",
													'name' : "银行账户号及开户行"
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
											button.up('panel').getForm()
													.reset();
										}
									}, {
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
												url : 'book/detail/fee_jrjg_excel',
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
						}, {

							xtype : 'gridpanel',
							id : 'book_detail_fee_jrjg_grid',
							height : 'auto',
							store : this.store,
							dockedItems : [{
										xtype : 'pagingtoolbar',
										store : this.store,
										dock : 'bottom',
										displayInfo : true
									}],
							columns : [{
								text : "银行账户号及开户行",
								itemId : 'acct',
								dataIndex : 'acct',
								sortable : false,
								renderer : function(value, p, record) {
									var acct = Ext.data.StoreManager
											.lookup('Zixweb.store.component.Acct');
									var index = acct.findExact('id', value);
									return acct.getAt(index).data.name;
								},
								flex : 2
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
