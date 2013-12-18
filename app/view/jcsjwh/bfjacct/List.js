Ext.define('Zixweb.view.jcsjwh.bfjacct.List', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.bfjacctlist',
	prefix : 'bfjacct_list',
	defaults : {
		border : false
	},

	initComponent : function() {
		var panel = this;
		var store = new Ext.data.Store({
					fields : ['id', 'b_acct', 'valid', 'b_name', 'acct_name',
							'memo'],

					pageSize : 50,
					autoLoad : true,

					proxy : {
						type : 'ajax',
						api : {
							read : 'jcsjwh/bfjacct/list'
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
								store.proxy.extraParams = form.getValues();
							} else {
								return false;
							}
						},
						load : function(me, records, successful, eOpts) {
							if (!successful) {
								Ext.MessageBox.show({
											title : '警告',
											msg : '备付金帐号列表数据加载失败,请联系管理员',
											buttons : Ext.Msg.YES,
											icon : Ext.Msg.ERROR
										});
								return;
							}
							var jsonData = me.proxy.reader.jsonData.success;
							if (jsonData && jsonData === 'forbidden') {
								Ext.MessageBox.show({
											title : '警告',
											msg : '抱歉，没有备付金帐号列表数据访问权限',
											buttons : Ext.Msg.YES,
											icon : Ext.Msg.ERROR
										});
							}
						}
					}
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
						layout : 'hbox',
						items : [{
									xtype : 'bfjacct',
									name : 'id',
									margin : '0 10 0 0',
									fieldLabel : '备付金银行账户'
								}, {
									xtype : 'acctStatus',
									name : 'valid',
									fieldLabel : '使用状态'
								}]

					}, {
						xtype : 'button',
						text : '添加账户信息',
						margin : '10 800 0 0',
						handler : function(form) {
							var viewport = form.up('viewport'), center = viewport
									.down('center'), id = 'bfjacctadd', cmp = Ext
									.getCmp(id);
							if (cmp) {
								center.setActiveTab(cmp);
							} else {
								center.add({
											closable : true,
											xtype : 'panel',
											items : {
												xtype : 'bfjacctadd'
											},
											id : 'bfjacctadd',
											title : '备付金账户基础数据添加'
										}).show();
							}
						}

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
			store : store,
			id : panel.prefix + '_grid',
			dockedItems : [{
						xtype : 'pagingtoolbar',
						store : store
					}],
			columns : [{
						text : "id",
						itemId : 'id',
						dataIndex : 'id',
						sortable : false,
						flex : 1

					}, {
						text : "memo",
						itemId : 'memo',
						dataIndex : 'memo',
						hidden : true,
						sortable : false,
						flex : 1
					}, {
						text : "开户行名称",
						itemId : 'b_name',
						dataIndex : 'b_name',
						sortable : false,
						flex : 2

					}, {
						text : "备付金银行账户",
						itemId : 'b_acct',
						dataIndex : 'b_acct',
						sortable : false,
						flex : 2
					}, {
						text : "开户信息",
						itemId : 'acct_name',
						dataIndex : 'acct_name',
						sortable : false,
						flex : 1
					}, {
						text : "有效性",
						dataIndex : 'valid',
						sortable : false,
						renderer : function(value, p, record) {
							var statusArray = ["启用", "禁用"];
							return statusArray[value - 1];
						},
						flex : 1
					}, {
						xtype : 'actioncolumn',
						text : '操作',
						width : 80,
						align : 'center',
						items : [{
							iconCls : 'roleedit',
							tooltip : '修改',
							action : 'edit',
							handler : function(grid, rowIndex, colIndex) {
								var record = grid.getStore().getAt(rowIndex);
								var viewport = grid.up('viewport'), center = viewport
										.down('center'), id = 'bfjacctedit', cmp = Ext
										.getCmp(id), panel;
								if (!cmp) {
									cmp = Ext.widget('bfjacctedit');
									panel = center.add({
												closable : true,
												xtype : 'panel',
												items : cmp,
												id : 'bfjacctedit',
												title : '备付金账户基础数据修改'
											});

								}
								cmp.down('form').loadRecord(record);
								if (panel) {
									panel.show();
								} else {
									center.setActiveTab(cmp);
								}
							}
						}]
					}]
		}];
		this.callParent(arguments);
	}
});