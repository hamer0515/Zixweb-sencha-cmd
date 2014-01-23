Ext.define('Zixweb.view.role.List', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.rolelist',
	border : true,
	initComponent : function() {
		var me = this, store;
		me.store = store = Ext.create('widget.mystore', {
					fields : ['name', 'memo', 'role_id', 'rowid'],
					autoLoad : true,

					proxy : {
						type : 'ajax',
						api : {
							read : '/role/list'
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
					dataIndex : 'role_id',
					width : 80
				}, {
					text : "角色名",
					dataIndex : 'name',
					flex : 2
				}, {
					text : "备注",
					dataIndex : 'memo',
					flex : 4,
					renderer : function(value, p, record) {
						return Ext.String.ellipsis(value, 30, true);
					}
				}, {
					xtype : 'actioncolumn',
					text : '操作',
					width : 80,
					align : 'center',
					items : [{
						iconCls : 'roleedit',
						tooltip : '编辑',
						handler : function(grid, rowIndex, colIndex) {
							var record = grid.getStore().getAt(rowIndex), view = Ext
									.widget('roledit', {
												modal : true,
												resizable : false,
												role_id : record.data.role_id,
												_list : me
											});
							view.down('form').loadRecord(record);
						}
					}, {
						iconCls : 'roledelete',
						tooltip : '删除',
						handler : function(grid, rowIndex, colIndex) {
							var record = grid.getStore().getAt(rowIndex);
							Ext.MessageBox.confirm('提醒', '你正在删除角色['
											+ record.data.name + ']', function(
											optional) {
										if (optional === 'yes') {
											Ext.Ajax.request({
												url : 'role/delete',
												async : false,
												params : {
													id : record.data.role_id
												},
												success : function(response) {
													var res = Ext
															.decode(response.responseText);
													if (res.success) {
														Ext.MessageBox.show({
															title : '提示',
															msg : '删除角色成功',
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
									});
						}
					}]
				}];
		me.dockedItems = [{
					xtype : 'toolbar',
					dock : 'top',
					items : [{
								iconCls : 'roleadd',
								text : '添加角色',
								tooltip : '添加角色',
								handler : function() {
									Ext.widget('roleadd', {
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