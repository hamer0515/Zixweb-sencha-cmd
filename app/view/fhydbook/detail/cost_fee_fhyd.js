Ext.define('Zixweb.view.fhydbook.detail.cost_fee_fhyd', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.book_detail_cost_fee_fhyd',
	prefix : 'book_detail_cost_fee_fhyd',
	defaults : {
		border : false
	},

	initComponent : function() {
		var panel = this;
		var columns = {
			fyw_type : {
				text : "业务类型",
				itemId : 'fyw_type',
				dataIndex : 'fyw_type',
				sortable : false,
				renderer : function(value, p, record) {
					var fywtype = Ext.data.StoreManager
							.lookup('Zixweb.store.component.FywType');
					var index = fywtype.findExact('id', value);
					return fywtype.getAt(index).data.name;
				},
				flex : 1
			},
			period : {
				text : "期间日期",
				dataIndex : 'period',
				itemId : 'period',
				sortable : false,
				flex : 1,
				renderer : Ext.util.Format.dateRenderer('Y年m月d日')
			},
			fhw_type : {
				text : "货物类型",
				itemId : 'fhw_type',
				dataIndex : 'fhw_type',
				sortable : false,
				renderer : function(value, p, record) {
					var fhwtype = Ext.data.StoreManager
							.lookup('Zixweb.store.component.FhwType');
					var index = fhwtype.findExact('id', value);
					return fhwtype.getAt(index).data.name;
				},
				flex : 1
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
					fields : ['fyw_type', 'period', 'fhw_type', 'j', 'd'],

					pageSize : 50,
					remoteSort : true,

					proxy : {
						type : 'ajax',
						api : {
							read : 'book/detail/cost_fee_fhyd'
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
											msg : '成本-手续费支出科目详细数据加载失败,请联系管理员',
											buttons : Ext.Msg.YES,
											icon : Ext.Msg.ERROR
										});
								return;
							}
							var jsonData = thiz.proxy.reader.jsonData.success;
							if (jsonData && jsonData === 'forbidden') {
								Ext.MessageBox.show({
											title : '警告',
											msg : '抱歉，没有成本-手续费支出科目详细数据访问权限',
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
					columns : [columns.fyw_type, columns.fhw_type,
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
						fieldLabel : '期间日期范围',
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
									//vtype : 'dateinterval',
									width : 180
								}, {
									xtype : 'datefield',
									id : panel.prefix + '_to',
									format : 'Y-m-d',
									name : 'period_to',
									margin : '0 10 0 0',
									allowBlank : false,
									width : 180
								}]
					}, {
						xtype : 'fieldcontainer',
						layout : 'hbox',
						items : [{
									xtype : 'fywtype',
									name : 'fyw_type',
									width : 516,
									margin : '0 10 0 0',
									fieldLabel : '业务类型'
								}, {
									xtype : 'fhwtype',
									name : 'fhw_type',
									width : 516,
									fieldLabel : ' 货物类型'
								}]
					}, {
						xtype : 'hsx',
						data : [{
									'value' : "fyw_type",
									'name' : "业务类型"
								}, {
									'value' : "period",
									'name' : "期间日期"
								}, {
									'value' : "fhw_type",
									'name' : " 货物类型"
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
								url : 'book/detail/cost_fee_fhyd_excel',
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
