Ext.define('Zixweb.view.fhydbook.detail.tctxamt_dqr_oyf_fhyd', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.book_detail_tctxamt_dqr_oyf_fhyd',
	prefix : 'book_detail_tctxamt_dqr_oyf_fhyd',
	defaults : {
		border : false
	},

	initComponent : function() {
		var panel = this;
		var columns = {
			f_ssn : {
				text : "唯一销卡编号",
				dataIndex : 'f_ssn',
				itemId : 'f_ssn',
				sortable : false,
				flex : 1
			},
			fc : {
				text : "客户编号",
				dataIndex : 'fc',
				itemId : 'fc',
				sortable : false,
				flex : 1
			},
			f_rate : {
				text : "结算折扣率",
				dataIndex : 'f_rate',
				itemId : 'f_rate',
				sortable : false,
				flex : 1
			},
			fhw_type : {
				text : "货物类型",
				itemId : 'fhw_type',
				dataIndex : 'fhw_type',
				sortable : false,
				renderer : function(value, p, record) {
					var fhwtype = Ext.data.StoreManager
							.lookup('component.FhwType');
					var index = fhwtype.findExact('id', value);
					return fhwtype.getAt(index).data.name;
				},
				flex : 1
			},
			period : {
				text : "会计期间",
				dataIndex : 'period',
				itemId : 'period',
				sortable : false,
				flex : 1,
				renderer : Ext.util.Format.dateRenderer('Y年m月d日')
			},
			ftx_date : {
				text : "交易日期",
				dataIndex : 'ftx_date',
				itemId : 'ftx_date',
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
		}
		var store = new Ext.data.Store({
			fields : ['f_ssn', 'f_rate', 'fhw_type', 'fc', 'ftx_date',
					'period', 'j', 'd'],

			pageSize : 50,
			remoteSort : true,

			proxy : {
				type : 'ajax',
				api : {
					read : 'book/detail/tctxamt_dqr_oyf_fhyd'
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
						if (values.fiv) {
							hsxes.push(values.fiv);
						}
						if (values.six) {
							hsxes.push(values.six);
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
				load : function(me, records, successful, eOpts) {
					if (!successful) {
						Ext.MessageBox.show({
									title : '警告',
									msg : '其他应付款-待确认交易款-电话卡充值业务科目详细数据加载失败,请联系管理员',
									buttons : Ext.Msg.YES,
									icon : Ext.Msg.ERROR
								});
						return;
					}
					var jsonData = me.proxy.reader.jsonData.success;
					if (jsonData && jsonData === 'forbidden') {
						Ext.MessageBox.show({
									title : '警告',
									msg : '抱歉，没有其他应付款-待确认交易款-电话卡充值业务科目详细数据访问权限',
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
					columns : [columns.f_ssn, columns.f_rate, columns.fhw_type,
							columns.fc, columns.ftx_date, columns.period,
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
								}, {
									xtype : 'textfield',
									name : 'f_ssn',
									width : 516,
									fieldLabel : '唯一销卡编号'
								}]
					}, {
						xtype : 'fieldcontainer',
						fieldLabel : '交易日期',
						layout : 'hbox',
						items : [{
									xtype : 'datefield',
									format : 'Y-m-d',
									name : 'ftx_date_from',
									margin : '0 10 0 0',
									width : 180
								}, {
									xtype : 'datefield',
									format : 'Y-m-d',
									name : 'ftx_date_to',
									margin : '0 10 0 0',
									width : 180
								}, {
									xtype : 'textfield',
									name : 'f_rate',
									width : 516,
									fieldLabel : '结算折扣率'
								}]
					}, {
						xtype : 'fieldcontainer',
						layout : 'hbox',
						items : [{
									fieldLabel : '货物类型',
									xtype : 'fhwtype',
									name : 'fhw_type',
									width : 516,
									margin : '0 10 0 0'
								}, {
									xtype : 'textfield',
									name : 'fc',
									width : 516,
									fieldLabel : '客户编号'
								}]
					}, {
						xtype : 'hsx',
						data : [{
									'value' : "f_ssn",
									'name' : "唯一销卡编号"
								}, {
									'value' : "f_rate",
									'name' : "结算折扣率"
								}, {
									'value' : "fhw_type",
									'name' : "货物类型"
								}, {
									'value' : "fc",
									'name' : "客户编号"
								}, {
									'value' : "ftx_date",
									'name' : "交易日期"
								}, {
									'value' : "period",
									'name' : "会计期间"
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
								url : 'book/detail/tctamt_dqr_oyf_fhyd_excel',
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
