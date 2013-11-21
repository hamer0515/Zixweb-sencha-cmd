Ext.define('Zixweb.view.book.detail.cost_in', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.book_detail_cost_in',

	prefix : 'book_detail_cost_in',
	
	defaults : {
		border : false
	},

	initComponent : function() {
		var panel = this;
		var columns = {
				c:{
					text : "客户编号",
					dataIndex : 'c',
					itemId : 'c',
					sortable : false,
					flex : 1
				}, 
				p:{
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
					flex : 2
				},
				period:{
					text : "期间日期",
					dataIndex : 'period',
					itemId : 'period',
					sortable : false,
					flex : 1,
					renderer : Ext.util.Format
							.dateRenderer('Y年m月d日')
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
					fields : ['c', 'p', 'period', 'j', 'd'],

					pageSize : 50,
					remoteSort : true,

					proxy : {
						type : 'ajax',
						api : {
							read : 'book/detail/cost_in'
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
							var form = Ext.getCmp('costindetailform').getForm();
							var values = form.getValues();
							var grid = Ext.getCmp('book_detail_cost_in_grid');
							grid.down('#c').hide();
							grid.down('#p').hide();
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
							if (values.thi) {
								var thi = grid.down('#' + values.thi);
								thi.show();
								var oldindex = grid.headerCt
										.getHeaderIndex(thi);
								if (oldindex != 2) {
									grid.headerCt.move(oldindex, 2);
								}
							}
							if (!(values.fir || values.sec || values.thi)) {
								grid.down('#c').show();
								grid.down('#p').show();
								grid.down('#period').show();
								var fir = grid.down('#c');
								var sec = grid.down('#p');
								var thi = grid.down('#period');
								var oldindex = grid.headerCt
										.getHeaderIndex(fir);
								grid.headerCt.move(oldindex, 0);
								var secindex = grid.headerCt
										.getHeaderIndex(sec);
								grid.headerCt.move(secindex, 1);
								var thiindex = grid.headerCt
										.getHeaderIndex(thi);
								grid.headerCt.move(thiindex, 2);
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
											msg : '内部成本科目详细数据加载失败,请联系管理员',
											buttons : Ext.Msg.YES,
											icon : Ext.Msg.ERROR
										});
								return;
							}
							var jsonData = thiz.proxy.reader.jsonData.success;
							if (jsonData && jsonData === 'forbidden') {
								Ext.MessageBox.show({
											title : '警告',
											msg : '抱歉，没有内部成本科目详细数据访问权限',
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
							columns : [columns.c, columns.p, columns.period, columns.j, columns.d]
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
												id : 'book_detail_cost_in_to'
											},
											vtype : 'dateinterval',
											width : 180
										}, {
											xtype : 'datefield',
											id : 'book_detail_cost_in_to',
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
								items : {
									fieldLabel : '客户编号',
									xtype : 'textfield',
									name : 'c',
									width : 516,
									margin : '0 10 0 0'
								}
							}, {
								xtype : 'hsx',
								data : [{
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
										url : 'book/detail/cost_in_excel',
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
