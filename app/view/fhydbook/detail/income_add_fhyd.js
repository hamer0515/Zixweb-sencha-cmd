Ext.define('Zixweb.view.fhydbook.detail.income_add_fhyd', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.book_detail_income_add_fhyd',

	defaults : {
		border : false
	},

	initComponent : function() {
		var store = new Ext.data.Store({

					fields : ['fyw_type', 'fhw_type', 'period', 'j', 'd'],

					pageSize : 50,
					remoteSort : true,

					proxy : {
						type : 'ajax',
						api : {
							read : 'book/detail/income_add_fhyd'
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
							var form = Ext.getCmp('incomaddfhyddetailform')
									.getForm();
							var values = form.getValues();
							var grid = Ext
									.getCmp('book_detail_income_add_fhyd_grid');
							grid.down('#fyw_type').hide();
							grid.down('#fhw_type').hide();
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
								grid.down('#fyw_type').show();
								grid.down('#fhw_type').show();
								grid.down('#period').show();
								var fir = grid.down('#fyw_type');
								var sec = grid.down('#fhw_type');
								var thi = grid.down('#period');
								var firindex = grid.headerCt
										.getHeaderIndex(fir);
								if (firindex != 0) {
									grid.headerCt.move(firindex, 0);
								}
								var secindex = grid.headerCt
										.getHeaderIndex(sec);
								if (secindex != 1) {
									grid.headerCt.move(secindex, 1);
								}
								var thiindex = grid.headerCt
										.getHeaderIndex(thi);
								if (thiindex != 2) {
									grid.headerCt.move(thiindex, 2);
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
											msg : '营业外收入科目详细数据加载失败,请联系管理员',
											buttons : Ext.Msg.YES,
											icon : Ext.Msg.ERROR
										});
								return;
							}
							var jsonData = thiz.proxy.reader.jsonData.success;
							if (jsonData && jsonData === 'forbidden') {
								Ext.MessageBox.show({
											title : '警告',
											msg : '抱歉，没有营业外收入科目详细数据访问权限',
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
					id : 'incomaddfhyddetailform',
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
												id : 'book_detail_income_add_fhyd_to'
											},
											vtype : 'dateinterval',
											width : 180
										}, {
											xtype : 'datefield',
											id : 'book_detail_income_add_fhyd_to',
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
											xtype : 'fhwtype',
											name : 'fhw_type',
											margin : '0 10 0 0',
											width : 516,
											fieldLabel : '货物类型'
										}, {
											xtype : 'fywtype',
											name : 'fyw_type',
											width : 516,
											fieldLabel : '业务类型'
										}]
							}, {
								xtype : 'hsx',
								data : [{
											'value' : "fyw_type",
											'name' : "业务类型"
										}, {
											'value' : "fhw_type",
											'name' : "货物类型"
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

					xtype : 'gridpanel',
					id : 'book_detail_income_add_fhyd_grid',
					height : 'auto',
					store : this.store,
					dockedItems : [{
								xtype : 'pagingtoolbar',
								store : this.store,
								dock : 'bottom',
								displayInfo : true
							}],
					columns : [{
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
					}, {
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
