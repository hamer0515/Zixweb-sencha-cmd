Ext.define('Zixweb.view.zjdz.fyp', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.zjdzfyp',

	initComponent : function() {
		var me = this, store, grid, form;
		store = Ext.create('widget.mystore', {
					fields : ['fyp_acct', 'zjdz_date'],

					autoLoad : true,

					proxy : {
						type : 'ajax',
						api : {
							read : 'zjdz/fyp'
						},
						reader : {
							type : 'json',
							root : 'data',
							totalProperty : 'totalCount',
							successProperty : 'success'
						}
					}
				});
		form = Ext.create('widget.queryform', {
					items : [{
								xtype : 'fieldcontainer',
								fieldLabel : '资金对账日期',
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
											xtype : 'fypacct',
											name : 'fyp_acct',
											fieldLabel : '易宝中间账户号'
										}]

							}, {
								xtype : 'button',
								text : '查询',
								margin : '0 20 0 0',
								handler : function() {
									store.proxy.extraParams = form.getForm()
											.getValues();
									store.loadPage(1);
								}
							}, {
								xtype : 'button',
								text : '重置',
								margin : '0 20 0 0',
								handler : function(button) {
									form.getForm().reset();
								}
							}]
				});
		grid = new Ext.grid.Panel({
			store : store,
			columns : [{
				text : "易宝中间账户号",
				dataIndex : 'fyp_acct',
				renderer : function(value, meta, record) {
					var fypacct = Ext.data.StoreManager
							.lookup('component.FypAcct');
					var index = fypacct.findExact('id', value);
					if (index == -1) {
						meta.style = 'color:red';
					}
					return index == -1 ? '无效的数据(' + value + ')' : fypacct
							.getAt(index).data.name;
				},
				flex : 3
			}, {
				text : "资金对账日期",
				dataIndex : 'zjdz_date',
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
						var center = grid.up('center'), id = 'zjdz_fyp_detail', cmp = Ext
								.getCmp(id);
						if (cmp) {
							center.setActiveTab(cmp);
						} else {
							var fyp_acct = Ext.data.StoreManager
									.lookup('component.FypAcct');
							var index = fyp_acct.findExact('id',
									rec.data.fyp_acct);
							var acct_name = fyp_acct.getAt(index).data.name;
							var zjdzfypdetail = Ext
									.createByAlias('widget.zjdzfypdetail');
							zjdzfypdetail.store.load({
										params : {
											tag : 1,
											zjbd_date : rec.data.zjdz_date,
											fyp_acct : rec.data.fyp_acct
										}
									});
							center.add({
								closable : true,
								xtype : 'panel',
								items : zjdzfypdetail,
								id : id,
								title : acct_name + '易宝中间账户号'
										+ rec.data.zjdz_date + '日资金对账'
							}).show();
						}
					}
				}]
			}]
		});
		// 添加底部分页工具栏
		grid.addDocked({
					xtype : 'pagingtoolbar',
					store : store,
					dock : 'bottom'
				});
		me.items = [form, grid];
		me.callParent(arguments);
	}
});