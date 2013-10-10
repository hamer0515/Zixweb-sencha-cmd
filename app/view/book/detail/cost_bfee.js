Ext.define('Zixweb.view.book.detail.cost_bfee', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.book_detail_cost_bfee',

	defaults : {
		bodyPadding : 5,
		collapsible : true,
		border : false
	},

	initComponent : function() {
		var store = new Ext.data.Store({
			fields : ['bi', 'c', 'p', 'period', 'j', 'd'],

			pageSize : 50,
			remoteSort : true,

			proxy : {
				type : 'ajax',
				api : {
					read : 'book/detail/cost_bfee'
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
					var form = Ext.getCmp('costbfeedetailform').getForm();
					var values = form.getValues();
					var grid = Ext.getCmp('book_detail_cost_bfee_grid');
					grid.down('#bi').hide();
					grid.down('#c').hide();
					grid.down('#p').hide();
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
						grid.down('#bi').show();
						grid.down('#c').show();
						grid.down('#p').show();
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
									msg : '银行手续费支出科目详细数据加载失败,请联系管理员',
									buttons : Ext.Msg.YES,
									icon : Ext.Msg.ERROR
								});
						return;
					}
					var jsonData = thiz.proxy.reader.jsonData.success;
					if (jsonData && jsonData === 'forbidden') {
						Ext.MessageBox.show({
									title : '警告',
									msg : '抱歉，没有银行手续费支出科目详细数据访问权限',
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
					id : 'costbfeedetailform',

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
												id : 'book_detail_cost_bfee_to'
											},
											vtype : 'dateinterval',
											width : 180
										}, {
											xtype : 'datefield',
											id : 'book_detail_cost_bfee_to',
											format : 'Y-m-d',
											name : 'period_to',
											margin : '0 10 0 0',
											allowBlank : false,
											width : 180
										}, {
											xtype : 'product',
											name : 'p',
											// margin : '0 10 0 0',
											fieldLabel : '产品类型'
										}]
							}, {
								xtype : 'fieldcontainer',
								layout : 'hbox',
								items : [{
											xtype : 'textfield',
											name : 'c',
											width : 516,
											margin : '0 10 0 0',
											fieldLabel : '客户编号'
										}, {
											xtype : 'bi',
											name : 'bi',
											width : 516,
											marigin : '0 10 0 0',
											fieldLabel : '银行接口编号'
										}]
							}, {
								xtype : 'hsx',
								data : [{
											'value' : "bi",
											'name' : "银行接口编号"
										}, {
											'value' : "c",
											'name' : "客户编号"
										}, {
											'value' : "p",
											'name' : "产品类型"
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
					id : 'book_detail_cost_bfee_grid',
					height : 500,
					store : this.store,
					dockedItems : [{
								xtype : 'pagingtoolbar',
								store : this.store,
								dock : 'bottom',
								displayInfo : true
							}],
					columns : [{
						text : "产品类型",
						itemId : 'p',
						dataIndex : 'p',
						sortable : false,
						renderer : function(value, p, record) {
							var product = Ext.data.StoreManager
									.lookup('Zixweb.store.component.Product');
							var index = product.findExact('id', value);
							return product.getAt(index).data.name;
						},
						flex : 1
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
						flex : 1
					}, {
						text : "客户编号",
						dataIndex : 'c',
						itemId : 'c',
						sortable : false,
						flex : 1
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
