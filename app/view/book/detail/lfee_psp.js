Ext.define('Zixweb.view.book.detail.lfee_psp', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.book_detail_lfee_psp',
	prefix : 'book_detail_lfee_psp',

	defaults : {
		border : false
	},

	initComponent : function() {
		var panel = this;
		var columns = {
			c : {
				text : "客户编号",
				itemId : 'c',
				dataIndex : 'c',
				sortable : false,
				flex : 1
			},
			cust_proto : {
				text : "客户协议编号",
				itemId : 'cust_proto',
				dataIndex : 'cust_proto',
				sortable : false,
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
			fields : ['c', 'cust_proto', 'tx_date', 'period', 'j', 'd'],

			pageSize : 50,
			remoteSort : true,

			proxy : {
				type : 'ajax',
				api : {
					read : 'book/detail/lfee_psp'
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
					var values = form.getValues();
					var grid = Ext.getCmp(panel.prefix + '_grid');
					grid.down('#c').hide();
					grid.down('#cust_proto').hide();
					grid.down('#tx_date').hide();
					grid.down('#period').hide();
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
					if (values.thir) {
						var thir = grid.down('#' + values.thir);
						thir.show();
						var oldindex = grid.headerCt.getHeaderIndex(thir);
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
					if (!(values.fir || values.sec || values.thir || values.fou)) {
						grid.down('#c').show();
						grid.down('#cust_proto').show();
						grid.down('#tx_date').show();
						grid.down('#period').show();
						var fir = grid.down('#c');
						var oldindex = grid.headerCt.getHeaderIndex(fir);
						if (oldindex != 0) {
							grid.headerCt.move(oldindex, 0);
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
									msg : '分润方承担品牌费科目详细数据加载失败,请联系管理员',
									buttons : Ext.Msg.YES,
									icon : Ext.Msg.ERROR
								});
						return;
					}
					var jsonData = thiz.proxy.reader.jsonData.success;
					if (jsonData && jsonData === 'forbidden') {
						Ext.MessageBox.show({
									title : '警告',
									msg : '抱歉，没有分润方承担品牌费科目详细数据访问权限',
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
					columns : [columns.c, columns.cust_proto, columns.tx_date,
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
										id : panel.prefix + '_to_1'
									},
									vtype : 'dateinterval',
									width : 180
								}, {
									xtype : 'datefield',
									id : panel.prefix + '_to_1',
									format : 'Y-m-d',
									name : 'period_to',
									margin : '0 10 0 0',
									allowBlank : false,
									width : 180
								}, {
									xtype : 'textfield',
									name : 'c',
									width : 516,
									fieldLabel : '客户编号'
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
								}, {
									xtype : 'textfield',
									name : 'cust_proto',
									width : 516,
									fieldLabel : '客户协议编号'
								}]
					}, {
						xtype : 'hsx',
						data : [{
									'value' : "c",
									'name' : "客户编号"
								}, {
									'value' : "cust_proto",
									'name' : "客户协议编号"
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
								url : 'book/detail/lfee_psp_excel',
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
