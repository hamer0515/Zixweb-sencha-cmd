Ext.define('Zixweb.view.book.detail.fee_jrjg', {
			extend : 'Ext.panel.Panel',
			alias : 'widget.book_detail_fee_jrjg',

			defaults : {
				border : false
			},

			initComponent : function() {
				var store = new Ext.data.Store({
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
									var form = Ext.getCmp('feejrjgdetailform')
											.getForm();
									var values = form.getValues();
									var grid = Ext
											.getCmp('book_detail_fee_jrjg_grid');
									grid.down('#acct').hide();
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
									if (!(values.fir || values.sec)) {
										grid.down('#acct').show();
										grid.down('#period').show();
										var fir = grid.down('#acct');
										var sec = grid.down('#period');
										var firindex = grid.headerCt
												.getHeaderIndex(fir);
										grid.headerCt.move(firindex, 0);
										var secindex = grid.headerCt
												.getHeaderIndex(sec);
										grid.headerCt.move(secindex, 1);
									}
									grid.getView().refresh();
									if (form.isValid()) {
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
									}
								}
							}
						});
				this.store = store;
				this.items = [{
							xtype : 'form',
							title : '查询',
							id : 'feejrjgdetailform',
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
										handler : function(button) {
											button.up('panel').getForm()
													.reset();
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
