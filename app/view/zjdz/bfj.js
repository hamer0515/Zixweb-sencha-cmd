Ext.define('Zixweb.view.zjdz.bfj', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.zjdzbfj',

	defaults : {
		border : false
	},

	initComponent : function() {
		var store = new Ext.data.Store({
					fields : ['b_acct', 'zjdz_date', 'type'],

					pageSize : 50,
					autoLoad : true,

					proxy : {
						type : 'ajax',
						api : {
							read : 'zjdz/bfj'
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
							var form = Ext.getCmp('zjdzbfjform').getForm();
							var values = form.getValues();
							var grid = Ext.getCmp('zjdzbfjgrid');
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
											msg : '对账列表数据加载失败,请联系管理员',
											buttons : Ext.Msg.YES,
											icon : Ext.Msg.ERROR
										});
								return;
							}
							var jsonData = thiz.proxy.reader.jsonData.success;
							if (jsonData && jsonData === 'forbidden') {
								Ext.MessageBox.show({
											title : '警告',
											msg : '抱歉，没有对账列表数据访问权限',
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
					id : 'zjdzbfjform',
					bodyPadding : 5,
					collapsible : true,

					fieldDefaults : {
						labelWidth : 140
					},
					items : [{
								xtype : 'fieldcontainer',
								fieldLabel : '资金对账日期范围',
								layout : 'hbox',
								items : [{
											xtype : 'datefield',
											format : 'Y-m-d',
											name : 'from',
											margin : '0 10 0 0',
											width : 180
										}, {
											xtype : 'datefield',
											format : 'Y-m-d',
											name : 'to',
											width : 180
										}]
							}, {
								xtype : 'fieldcontainer',
								layout : 'hbox',
								items : [{
											xtype : 'bfjacct',
											name : 'b_acct',
											fieldLabel : '备付金账号'
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
					id : 'zjdzbfjgrid',
					height : 'auto',

					store : this.store,
					dockedItems : [{
								xtype : 'pagingtoolbar',
								store : this.store
							}],
					columns : [{
						text : "银行账户",
						itemId : 'b_acct',
						dataIndex : 'b_acct',
						sortable : false,
						renderer : function(value, p, record) {
							var bfjacct = Ext.data.StoreManager
									.lookup('Zixweb.store.component.BfjAcct');
							var index = bfjacct.findExact('id', value);
							return bfjacct.getAt(index).data.name;
						},
						flex : 3
					}, {
						text : "资金对账日期",
						dataIndex : 'zjdz_date',
						sortable : false,
						flex : 1,
						renderer : Ext.util.Format.dateRenderer('Y年m月d日')
					}, {
						xtype : 'actioncolumn',
						text : '操作',
						width : 80,
						align : 'center',
						items : [{
							tooltip : '对账',
							getClass : function(v, meta, rec) {
								return 'reconciliation';
							},
							handler : function(grid, rowIndex, colIndex) {
								var rec = grid.getStore().getAt(rowIndex);
								var viewport = grid.up('viewport'), center = viewport
										.down('center'), id = 'zjdz_bfj_detail', cmp = Ext
										.getCmp(id);
								if (cmp) {
									center.setActiveTab(cmp);
								} else {
									var bfjacct = Ext.data.StoreManager
											.lookup('Zixweb.store.component.BfjAcct');
									var index = bfjacct.findExact('id',
											rec.data.b_acct);
									var acct = bfjacct.getAt(index).data.name;
									var zjdzbfjdetail = Ext
											.createByAlias('widget.zjdzbfjdetail');
									zjdzbfjdetail.store.load({
												params : {
													tag : 1,
													zjbd_date : rec.data.zjdz_date,
													acct_id : rec.data.b_acct
												}
											});
									center.add({
										closable : true,
										xtype : 'panel',
										items : zjdzbfjdetail,
										id : 'zjdz_bfj_detail',
										title : acct + '帐号'
												+ rec.data.zjdz_date + '日资金对账'
									}).show();
								}
								viewport.doLayout();
							}
						}]
					}]

				}];
		this.callParent(arguments);
	}
});