Ext.define('Zixweb.view.jcsjwh.bfjacct.List', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.bfjacctlist',

	initComponent : function() {
		var me = this, store, grid, form;
		store = Ext.create('widget.mystore', {
					fields : ['id', 'b_acct', 'valid', 'b_name', 'acct_name',
							'memo'],
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
					}
				});
		form = Ext.create('widget.queryform', {
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
						text : '添加账户信息',
						margin : '0 20 0 0',
						handler : function(form) {
							var center = form.up('center'), id = 'bfjacctadd', cmp = center
									.down(id);
							if (cmp) {
								center.setActiveTab(cmp);
							} else {
								center.add({
											closable : true,
											xtype : 'panel',
											items : {
												xtype : 'bfjacctadd',
												_list : grid
											},
											id : id,
											title : '备付金账户基础数据添加'
										}).show();
							}
						}

					}]
		});
		grid = new Ext.grid.Panel({
			store : store,
			columns : [{
						text : "ID",
						dataIndex : 'id',
						width : 80

					}, {
						text : "memo",
						dataIndex : 'memo',
						hidden : true,
						flex : 1
					}, {
						text : "开户行名称",
						dataIndex : 'b_name',
						flex : 2

					}, {
						text : "备付金银行账户",
						dataIndex : 'b_acct',
						flex : 2
					}, {
						text : "开户信息",
						dataIndex : 'acct_name',
						flex : 1
					}, {
						text : "有效性",
						dataIndex : 'valid',
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
								var record = grid.getStore().getAt(rowIndex), center = grid
										.up('center'), id = 'bfjacctedit', cmp = center
										.down(id), panel;
								if (!cmp) {
									cmp = Ext.widget('bfjacctedit', {
												_list : grid
											});
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