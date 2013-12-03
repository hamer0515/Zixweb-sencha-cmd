Ext.define('Zixweb.view.book.hist.txamt_dgd', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.book_hist_txamt_dgd',
	prefix : 'book_hist_txamt_dgd',

	defaults : {
		border : false
	},

	initComponent : function() {
		var panel = this;
		var store = new Ext.data.Store({
					fields : ['id', 'bi', 'period', 'tx_date', 'j', 'd',
							'ys_id', 'ys_type'],

					pageSize : 50,
					remoteSort : true,

					proxy : {
						type : 'ajax',
						api : {
							read : 'book/hist/txamt_dgd'
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
								store.proxy.extraParams = form.getValues();
							} else {
								return false;
							}
						},
							load : function(thiz, records, successful, eOpts) {
								if (!successful) {
									Ext.MessageBox.show({
												title : '警告',
												msg : '待勾兑应收交易款科目历史数据加载失败,请联系管理员',
												buttons : Ext.Msg.YES,
												icon : Ext.Msg.ERROR
											});
									return;
								}
								var jsonData = thiz.proxy.reader.jsonData.success;
								if (jsonData && jsonData === 'forbidden') {
									Ext.MessageBox.show({
												title : '警告',
												msg : '抱歉，没有待勾兑应收交易款科目历史数据访问权限',
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
				columns : [{
					text : "ID",
					itemId : 'id',
					dataIndex : 'id',
					sortable : false,
					width : 80
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
					flex : 1,
					sortable : false,
					renderer : function(value) {
						return Ext.util.Format.number(
								parseInt(value) / 100, '0,0.00');
					}
				}, {
					xtype : 'actioncolumn',
					text : '操作',
					width : 80,
					align : 'center',
					items : [{
						tooltip : '详细',
						action : 'yspzqdetail',
						getClass : function(v, meta, rec) {
							return 'detail';
						},
						handler : function(grid, rowIndex, colIndex) {
							var rec = grid.getStore().getAt(rowIndex);
							var viewport = grid.up('viewport'), center = viewport
									.down('center'), id = 'yspzq_detail_'
									+ rec.data.ys_type + rec.data.ys_id, cmp = Ext
									.getCmp(id);
							var yspzqdetail = Ext
									.createByAlias('widget.yspzqdetail');
							yspzqdetail.store.load({
										params : {
											ys_type : rec.data.ys_type,
											ys_id : rec.data.ys_id
										}
									});
							if (cmp) {
								center.setActiveTab(cmp);
							} else {
								center.add({
									closable : true,
									xtype : 'panel',
									items : yspzqdetail,
									id : 'yspzq_detail_' + rec.data.ys_type
											+ rec.data.ys_id,
									title : '凭证' + rec.data.ys_type
											+ '详细信息-' + rec.data.ys_id
								}).show();
							}
							viewport.doLayout();
						}
					}]
				}]
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
									xtype : 'fieldcontainer',
									fieldLabel : '交易日期范围',
									layout : 'hbox',
									items : [{
												xtype : 'datefield',
												format : 'Y-m-d',
												name : 'tx_date_from',
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
												name : 'tx_date_to',
												margin : '0 10 0 0',
												width : 180
											}]
								}]
					}, {
						xtype : 'fieldcontainer',
						layout : 'hbox',
						items : [{
									xtype : 'textfield',
									name : 'id',
									margin : '0 10 0 0',
									width : 516,
									fieldLabel : 'ID'
								}, {
									xtype : 'textfield',
									fieldLabel : '原始凭证ID',
									width : 516,
									name : 'ys_id'
								}]

					}, {
						xtype : 'fieldcontainer',
						layout : 'hbox',
						items : [{
									xtype : 'bi',
									name : 'bi',
									margin : '0 10 0 0',
									fieldLabel : '银行接口编号'
								}, {
									xtype : 'ystype',
									name : 'ys_type',
									fieldLabel : '原始凭证类型'
								}]

					}, {
						xtype : 'fieldcontainer',
						layout : 'hbox',
						items : [{
									xtype : 'fieldcontainer',
									layout : 'hbox',
									fieldLabel : '借方金额',
									items : [{
												xtype : 'textfield',
												name : 'j_from',
												margin : '0 10 0 0',
												width : 180,
												vtype : "money"
											}, {
												xtype : 'textfield',
												name : 'j_to',
												width : 180,
												margin : '0 10 0 0',
												vtype : "money"
											}]
								}, {
									xtype : 'fieldcontainer',
									layout : 'hbox',
									fieldLabel : '贷方金额',
									items : [{
												xtype : 'textfield',
												name : 'd_from',
												margin : '0 10 0 0',
												width : 180,
												vtype : "money"
											}, {
												xtype : 'textfield',
												name : 'd_to',
												width : 180,
												margin : '0 10 0 0',
												vtype : "money"
											}]
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
							Ext.widget('tablefields', {
										bid : panel.bid,
										modal : true,
										params : panel.values,
										url : 'book/hist/txamt_dgd_excel',
										resizable : false
									});
						}
					}]
		}, grid];
		this.callParent(arguments);
	}
});