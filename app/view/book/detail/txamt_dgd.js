Ext.define('Zixweb.view.book.detail.txamt_dgd', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.book_detail_txamt_dgd',

	prefix : 'book_detail_txamt_dgd',

	defaults : {
		border : false
	},

	initComponent : function() {
		var panel = this;
		var columns = {
			bi : {
				text : "银行接口编号",
				itemId : 'bi',
				dataIndex : 'bi',
				sortable : false,
				renderer : function(value, p, record) {
					var bi = Ext.data.StoreManager
							.lookup('component.Bi');
					var index = bi.findExact('id', value);
					return bi.getAt(index).data.name;
				},
				flex : 1
			},
			tx_date : {
				text : "交易日期",
				dataIndex : 'tx_date',
				itemId : 'tx_date',
				sortable : false,
				flex : 1,
				renderer : Ext.util.Format.dateRenderer('Y年m月d日')
			},
			period : {
				text : "期间日期",
				dataIndex : 'period',
				itemId : 'period',
				sortable : false,
				flex : 1,
				renderer : Ext.util.Format.dateRenderer('Y年m月d日')
			},
			j : {
				text : "借方金额",
				dataIndex : 'j',
				sortable : false,
				flex : 1,
				renderer : function(value) {
					return Ext.util.Format.number(parseInt(value) / 100,
							'0,0.00');
				}
			},
			d : {
				text : "贷方金额",
				dataIndex : 'd',
				width : 100,
				sortable : false,
				flex : 1,
				renderer : function(value) {
					return Ext.util.Format.number(parseInt(value) / 100,
							'0,0.00');
				}
			}
		};
		var store = new Ext.data.Store({
					fields : ['bi', 'tx_date', 'period', 'j', 'd'],

					pageSize : 50,
					remoteSort : true,

					proxy : {
						type : 'ajax',
						api : {
							read : 'book/detail/txamt_dgd'
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
							var form = Ext.getCmp(panel.prefix + '_form')
									.getForm();
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
											msg : '待勾兑应收交易款科目详细数据加载失败,请联系管理员',
											buttons : Ext.Msg.YES,
											icon : Ext.Msg.ERROR
										});
								return;
							}
							var jsonData = thiz.proxy.reader.jsonData.success;
							if (jsonData && jsonData === 'forbidden') {
								Ext.MessageBox.show({
											title : '警告',
											msg : '抱歉，没有待勾兑应收交易款科目详细数据访问权限',
											buttons : Ext.Msg.YES,
											icon : Ext.Msg.ERROR
										});
								return;
							}
							panel.values = Ext.getCmp(panel.prefix + '_form')
									.getForm().getValues();
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
					columns : [columns.bi, columns.tx_date, columns.period,
							columns.j, columns.d]
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
									
									width : 180
								}, {
									xtype : 'datefield',
									format : 'Y-m-d',
									name : 'period_to',
									margin : '0 10 0 0',
									
									width : 180
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
									width : 180
								}, {
									xtype : 'datefield',
									format : 'Y-m-d',
									name : 'tx_date_to',
									margin : '0 10 0 0',
									width : 180
								}, {
									xtype : 'bi',
									name : 'bi',
									fieldLabel : '银行借口编号'
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
						margin : '0 20 0 0',
						handler : function(button) {
							button.up('panel').getForm().reset();
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
								url : 'book/detail/txamt_dgd_excel',
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