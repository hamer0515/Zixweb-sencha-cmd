Ext.define('Zixweb.view.user.List', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.userlist',
	border : true,

	initComponent : function() {
		var me = this, store;
		me.store = store = new Ext.data.Store({
			fields : ['username', 'pwd_chg_date', 'status', 'rowid', 'user_id'],
			autoLoad : true,

			proxy : {
				type : 'ajax',
				api : {
					read : '/user/list'
				},
				reader : {
					type : 'json',
					root : 'data',
					totalProperty : 'totalCount',
					successProperty : 'success'
				}
			}
		});
		me.columns = [{
					text : "编号",
					dataIndex : 'user_id',
					width : 80
				}, {
					text : "用户名",
					dataIndex : 'username',
					flex : 2
				}, {
					text : "密码修改日期",
					dataIndex : 'pwd_chg_date',
					flex : 2,
					renderer : Ext.util.Format.dateRenderer('Y年m月d日')
				}, {
					text : "状态",
					dataIndex : 'status',
					width : 70,
					renderer : function(value, p, record) {
						return value == 1 ? '启用' : '<font color=red>禁用</font>';
					}
				}, {
					xtype : 'actioncolumn',
					text : '操作',
					width : 80,
					align : 'center',
					items : [{
						iconCls : 'useredit',
						tooltip : '编辑用户',
						handler : function(grid, rowIndex, colIndex) {
							var record = grid.getStore().getAt(rowIndex);
							var view = Ext.widget('useredit', {
										modal : true,
										resizable : false,
										_list : me
									});
							view.down('form').loadRecord(record);
							Ext.Ajax.request({
										url : 'base/roles',
										async : false,
										params : {
											id : record.data.user_id
										},
										success : function(response) {
											view
													.down('itemselector')
													.setValue(Ext
															.decode(response.responseText))
										}
									});
						}
					}]
				}];
		me.dockedItems = [{
					xtype : 'toolbar',
					dock : 'top',
					items : [{
								iconCls : 'useradd',
								text : '添加用户',
								tooltip : '添加用户',
								action : 'add',
								handler : function() {
									Ext.widget('useradd', {
												modal : true,
												resizable : false,
												_list : me
											});
								}
							}]
				}, {
					xtype : 'pagingtoolbar',
					store : store,
					dock : 'bottom'
				}];
		me.callParent(arguments);
	}
});