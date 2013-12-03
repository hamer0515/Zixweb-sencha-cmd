Ext.define('Zixweb.view.jcsjwh.bfjacct.List', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.bfjacctlist',

	defaults : {
		border : false
	},

	initComponent : function() {
		var store = new Ext.data.Store({
					fields : ['bfj_id', 'bfj_acct', 'status', 'b_name',
							'acct_name', 'memo'],

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
							var form = Ext.getCmp('bfjacctlist').getForm();
							var values = form.getValues();
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
			id : 'bfjacctlist',
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
									name : 'bfj_acct',
									fieldLabel : '备付金银行账户'
								}]

					}, {
						xtype : 'fieldcontainer',
						layout : 'hbox',
						items : [{
									xtype : 'acctStatus',
									name : 'status',
									autoShow : true,
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
			id : 'bfjacctlistgrid',
			height : 'auto',

			store : this.store,
			dockedItems : [{
						xtype : 'pagingtoolbar',
						store : this.store,
						dock : 'bottom',
						displayInfo : true
					}],
			columns : [{
						text : "id",
						itemId : 'bfj_id',
						dataIndex : 'bfj_id',
						hidden : true,
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
						flex : 1

					}, {
						text : "备付金银行账户",
						itemId : 'bfj_acct',
						dataIndex : 'bfj_acct',
						sortable : false,
						flex : 3
					}, {
						text : "开户信息",
						itemId : 'acct_name',
						dataIndex : 'acct_name',
						sortable : false,
						flex : 1
					}, {
						text : "有效性",
						dataIndex : 'status',
						sortable : false,
						renderer : function(value, p, record) {
							var statusArray = new Array();
							statusArray.push("启用");
							statusArray.push("禁用");
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