Ext.define('Zixweb.view.fhydbook.detail.yplc_fhyd', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.book_detail_yplc_fhyd',

	defaults : {
		border : false
	},

	initComponent : function() {
		var store = new Ext.data.Store({
			fields : ['fyp_acct', 'period', 'fe_date', 'fyw_type', 'j', 'd'],

			pageSize : 50,
			remoteSort : true,

			proxy : {
				type : 'ajax',
				api : {
					read : 'book/detail/yplc_fhyd'
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
					var form = Ext.getCmp('yplcfhyddetailform').getForm();
					var values = form.getValues();
					var grid = Ext.getCmp('book_detail_yplc_fhyd_grid');
					grid.down('#fyp_acct').hide();
					grid.down('#period').hide();
					grid.down('#fe_date').hide();
					grid.down('#fyw_type').hide();
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
						grid.down('#fyp_acct').show();
						grid.down('#period').show();
						grid.down('#fe_date').show();
						grid.down('#fyw_type').show();
						var fir = grid.down('#fyp_acct');
						var sec = grid.down('#period');
						var thi = grid.down('#fe_date');
						var fou = grid.down('#fyw_type');
						var firindex = grid.headerCt.getHeaderIndex(fir);
						if (firindex != 0) {
							grid.headerCt.move(firindex, 0);
						}
						var secindex = grid.headerCt.getHeaderIndex(sec);
						if (secindex != 1) {
							grid.headerCt.move(secindex, 1);
						}
						var thiindex = grid.headerCt.getHeaderIndex(thi);
						if (secindex != 2) {
							grid.headerCt.move(thiindex, 2);
						}
						var fouindex = grid.headerCt.getHeaderIndex(fou);
						if (secindex != 3) {
							grid.headerCt.move(fouindex, 3);
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
									msg : '应付账款-易宝-长款科目详细数据加载失败,请联系管理员',
									buttons : Ext.Msg.YES,
									icon : Ext.Msg.ERROR
								});
						return;
					}
					var jsonData = thiz.proxy.reader.jsonData.success;
					if (jsonData && jsonData === 'forbidden') {
						Ext.MessageBox.show({
									title : '警告',
									msg : '抱歉，没有应付账款-易宝-长款科目详细数据访问权限',
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
					id : 'yplcfhyddetailform',
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
												id : 'book_detail_yplc_fhyd_to'
											},
											vtype : 'dateinterval',
											width : 180
										}, {
											xtype : 'datefield',
											id : 'book_detail_yplc_fhyd_to',
											format : 'Y-m-d',
											name : 'period_to',
											margin : '0 10 0 0',
											allowBlank : false,
											width : 180
										}, {
											xtype : 'fypacct',
											name : 'fyp_acct',
											// margin : '0 10 0 0',
											fieldLabel : '易宝中间账户号'
										}]
							}, {
								xtype : 'fieldcontainer',
								fieldLabel : '差错日期',
								layout : 'hbox',
								items : [{
											xtype : 'datefield',
											format : 'Y-m-d',
											name : 'fe_date_from',
											margin : '0 10 0 0',
											verify : {
												id : 'book_detail_yplc_fhyd_to_2'
											},
											vtype : 'dateinterval',
											width : 180
										}, {
											xtype : 'datefield',
											id : 'book_detail_yplc_fhyd_to_2',
											format : 'Y-m-d',
											name : 'fe_date_to',
											margin : '0 10 0 0',
											width : 180
										}, {
											xtype : 'fywtype',
											name : 'fyw_type',
											// margin : '0 10 0 0',
											fieldLabel : '业务类型'
										}]
							}, {
								xtype : 'hsx',
								data : [{
											'value' : "fyp_acct",
											'name' : "易宝中间账户号"
										}, {
											'value' : "period",
											'name' : "期间日期"
										}, {
											'value' : "fe_date",
											'name' : "差错日期"
										}, {
											'value' : "fyw_type",
											'name' : "业务类型"
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
					id : 'book_detail_yplc_fhyd_grid',
					height : 'auto',
					store : this.store,
					dockedItems : [{
								xtype : 'pagingtoolbar',
								store : this.store,
								dock : 'bottom',
								displayInfo : true
							}],
					columns : [{
						text : "易宝中间账户号",
						itemId : 'fyp_acct',
						dataIndex : 'fyp_acct',
						sortable : false,
						renderer : function(value, p, record) {
							var fypacct = Ext.data.StoreManager
									.lookup('Zixweb.store.component.FypAcct');
							var index = fypacct.findExact('id', value);
							return fypacct.getAt(index).data.name;
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
						text : "差错日期",
						itemId : 'fe_date',
						dataIndex : 'fe_date',
						sortable : false,
						flex : 1,
						renderer : Ext.util.Format.dateRenderer('Y年m月d日')
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
