Ext.define('Zixweb.view.book.detail.yfamt_dcch_fhyd', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.book_detail_yfamt_dcch_fhyd',

	defaults : {
		border : false
	},

	initComponent : function() {
		var store = new Ext.data.Store({
					fields : ['f_dcn', 'fm', 'fyw_type', 'ftx_date', 'period', 'j', 'd'],

					pageSize : 50,
					remoteSort : true,

					proxy : {
						type : 'ajax',
						api : {
							read : 'book/detail/yfamt_dcch_fhyd'
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
							var form = Ext.getCmp('yfamtdcchfhyddetailform')
									.getForm();
							var values = form.getValues();
							var grid = Ext
									.getCmp('book_detail_yfamt_dcch_fhyd_grid');
							grid.down('#f_dcn').hide();
							grid.down('#fm').hide();
							grid.down('#fyw_type').hide();
							grid.down('#ftx_date').hide();
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
							if (values.fou) {
								var fou = grid.down('#' + values.fou);
								fou.show();
								var oldindex = grid.headerCt
										.getHeaderIndex(fou);
								if (oldindex != 3) {
									grid.headerCt.move(oldindex, 3);
								}
							}
							if (values.fiv) {
								var fiv = grid.down('#' + values.fiv);
								fiv.show();
								var oldindex = grid.headerCt
										.getHeaderIndex(fiv);
								if (oldindex != 4) {
									grid.headerCt.move(oldindex, 4);
								}
							}
							if (!(values.fir || values.sec || values.thi
									|| values.fou || values.fiv )) {
								grid.down('#f_dcn').show();
								grid.down('#fm').show();
								grid.down('#fyw_type').show();
								grid.down('#ftx_date').show();
								grid.down('#period').show();
								var fir = grid.down('#f_dcn');
								var sec = grid.down('#fm');
								var thi = grid.down('#fyw_type');
								var fou = grid.down('#ftx_date');
								var fiv = grid.down('#period');
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
								var fouindex = grid.headerCt
										.getHeaderIndex(fou);
								if (fouindex != 3) {
									grid.headerCt.move(fouindex, 3);
								}
								var fivindex = grid.headerCt
										.getHeaderIndex(fiv);
								if (fivindex != 4) {
									grid.headerCt.move(fivindex, 4);
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
											msg : '应付账款-代充渠道科目详细数据加载失败,请联系管理员',
											buttons : Ext.Msg.YES,
											icon : Ext.Msg.ERROR
										});
								return;
							}
							var jsonData = thiz.proxy.reader.jsonData.success;
							if (jsonData && jsonData === 'forbidden') {
								Ext.MessageBox.show({
											title : '警告',
											msg : '抱歉，没有应付账款-代充渠道科目详细数据访问权限',
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
					id : 'yfamtdcchfhyddetailform',
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
												id : 'book_detail_yfamt_dcch_fhyd_to'
											},
											vtype : 'dateinterval',
											width : 180
										}, {
											xtype : 'datefield',
											id : 'book_detail_yfamt_dcch_fhyd_to',
											format : 'Y-m-d',
											name : 'period_to',
											margin : '0 10 0 0',
											allowBlank : false,
											width : 180
										}]
							}, {
								xtype : 'fieldcontainer',
								fieldLabel : '交易日期范围',
								layout : 'hbox',
								items : [{
											xtype : 'datefield',
											format : 'Y-m-d',
											name : 'ftx_date_from',
											margin : '0 10 0 0',
											verify : {
												id : 'book_detail_yfamt_dcch_fhyd_to_2'
											},
											vtype : 'dateinterval',
											width : 180
										}, {
											xtype : 'datefield',
											format : 'Y-m-d',
											name : 'ftx_date_to',
											margin : '0 10 0 0',
											id : 'book_detail_yfamt_dcch_fhyd_to_2',
											width : 180
										}, {
											xtype : 'textfield',
											name : 'f_dcn',
											width : 516,
											// margin : '0 10 0 0',
											fieldLabel : '代充通道编号'
										}]
							}, {
								xtype : 'fieldcontainer',
								layout : 'hbox',
								items : [{
									    	xtype : 'fywtype',
                                            name : 'fyw_type',
                                            margin : '0 10 0 0',
                                            fieldLabel : '业务类型'
                                        }, {
											xtype : 'textfield',
											name : 'fm',
											width : 516, 
											fieldLabel : '商户编号'
										}]
							}, {
								xtype : 'hsx',
								data : [{
											'value' : "f_dcn",
											'name' : "代充通道编号"
										}, {
											'value' : "fm",
											'name' : "商户编号"
										}, {
											'value' : "fyw_type",
											'name' : "业务类型"
									    }, {
											'value' : "ftx_date",
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
								handler : function(button) {
									button.up('panel').getForm().reset();
								}
							}]
				}, {

					xtype : 'gridpanel',
					id : 'book_detail_yfamt_dcch_fhyd_grid',
					height : 'auto',
					store : this.store,
					dockedItems : [{
								xtype : 'pagingtoolbar',
								store : this.store,
								dock : 'bottom',
								displayInfo : true
							}],
					columns : [{
								text : "代充通道编号",
								dataIndex : 'f_dcn',
								itemId : 'f_dcn',
								sortable : false,
								flex : 1
							}, {
								text : "商户编号",
								dataIndex : 'fm',
								itemId : 'fm',
								sortable : false,
								flex : 1
							}, {
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
								text : "期间日期",
								dataIndex : 'period',
								itemId : 'period',
								sortable : false,
								flex : 1,
								renderer : Ext.util.Format
										.dateRenderer('Y年m月d日')
							}, {
								text : "交易日期",
								dataIndex : 'ftx_date',
								itemId : 'ftx_date',
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
