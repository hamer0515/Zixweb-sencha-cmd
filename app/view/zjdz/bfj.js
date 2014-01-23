Ext.define('Zixweb.view.zjdz.bfj', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.zjdzbfj',

	initComponent : function() {
		var me = this, store, grid, form;
		store = Ext.create('widget.mystore', {
					fields : ['b_acct', 'zjdz_date', 'type'],
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
									xtype : 'bfjacct',
									name : 'b_acct',
									fieldLabel : '备付金账号'
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
					}, {
						xtype : 'button',
						text : '刷新',
						handler : function() {
							Ext.Ajax.request({
								async : false,
								url : 'zjdz/bfjrefresh_mqt',
								success : function(response) {
									var res = Ext.decode(response.responseText);
									if (res.success) {
										Ext.MessageBox.show({
													title : '提示',
													msg : '刷新成功',
													closable : false,
													buttons : Ext.Msg.YES,
													icon : Ext.Msg.INFO
												});
										store.reload();
									} else {
										Ext.MessageBox.show({
													title : '错误',
													msg : res.msg,
													buttons : Ext.Msg.YES,
													icon : Ext.Msg.ERROR
												});
									}
								}
							});
						}
					}]
		});
		grid = new Ext.grid.Panel({
			store : store,
			columns : [{
				text : "银行账号",
				dataIndex : 'b_acct',
				renderer : function(value, meta, record) {
					var bfjacct = Ext.data.StoreManager
							.lookup('component.BfjAcct');
					var index = bfjacct.findExact('id', value);
					if (index == -1) {
						meta.style = 'color:red';
					}
					return index == -1 ? '无效的数据(' + value + ')' : bfjacct
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
						var center = grid.up('center'), id = 'zjdz_bfj_detail', cmp = Ext
								.getCmp(id);
						if (cmp) {
							center.setActiveTab(cmp);
						} else {
							var bfjacct = Ext.data.StoreManager
									.lookup('component.BfjAcct');
							var index = bfjacct
									.findExact('id', rec.data.b_acct);
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
								id : id,
								title : acct + '帐号' + rec.data.zjdz_date
										+ '日资金对账'
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