Ext.define('Zixweb.view.role.Edit', {
	extend : 'Ext.window.Window',
	alias : 'widget.roledit',
	title : '更新角色',
	layout : 'fit',
	autoShow : true,

	initComponent : function() {
		var me = this, list = me._list, store = new Ext.data.TreeStore({
					fields : ['text', 'route_id'],
					proxy : {
						type : 'ajax',
						url : 'base/routes',
						extraParams : {
							id : me.role_id
						}
					},
					listeners : {
						load : function(me, records, successful, eOpts) {
							if (!successful) {
								Ext.MessageBox.show({
											title : '警告',
											msg : '权限列表加载失败,请联系管理员',
											buttons : Ext.Msg.YES,
											icon : Ext.Msg.ERROR
										});
							}
							var jsonData = me.proxy.reader.jsonData.success;
							if (jsonData && jsonData === 'forbidden') {
								Ext.MessageBox.show({
											title : '警告',
											msg : '抱歉，没有权限列表访问权限',
											buttons : Ext.Msg.YES,
											icon : Ext.Msg.ERROR
										});
							}
						}
					}
				});
		me.items = [{
					xtype : 'form',
					border : false,
					fieldDefaults : {
						labelWidth : 70
					},
					bodyPadding : 5,
					items : [{
								xtype : 'hiddenfield',
								id : 'role_id',
								name : 'role_id'
							}, {
								xtype : 'textfield',
								name : 'name',
								fieldLabel : '角色名称',
								allowBlank : false,
								validateOnChange : false,
								msgTarget : 'qtip',
								verify : {
									url : 'role/check',
									id : 'role_id'
								},
								vtype : 'remoteverify'
							}, {
								xtype : 'textarea',
								name : 'memo',
								fieldLabel : '角色描述',
								width : 400
							}, {
								xtype : 'routes',
								store : store
							}]
				}];

		me.buttons = [{
			text : '更新',
			handler : function(button) {
				var panel = me.down('form'), form = panel.getForm();
				if (form.isValid()) {
					var limits = [], records = panel.down('treepanel')
							.getChecked();
					records.forEach(function(element, index, array) {
								limits.push(element.data.route_id);
							});
					form.submit({
								clientValidation : true,
								url : 'role/update',
								params : {
									limits : limits
								},
								success : function(form, action) {
									var response = action.result.success;
									if (response) {
										if (response == 'forbidden') {
											Ext.MessageBox.show({
														title : '警告',
														msg : '抱歉，没有角色更新操作权限',
														buttons : Ext.Msg.YES,
														icon : Ext.Msg.ERROR
													});
											return;
										}
										list.getStore().reload();
										Ext.MessageBox.show({
													title : '消息',
													msg : '角色更新成功',
													closable : false,
													buttons : Ext.Msg.YES,
													icon : Ext.Msg.INFO,
													scope : me,
													fn : function() {
														me.close();
													}
												});
									} else {
										Ext.MessageBox.show({
													title : '失败',
													msg : action.result.msg,
													buttons : Ext.Msg.YES,
													icon : Ext.Msg.ERROR
												});
									}
								},
								failure : function(form, action) {
									switch (action.failureType) {
										case Ext.form.action.Action.CLIENT_INVALID :
											Ext.MessageBox.show({
														title : '失败',
														msg : '表单数据有误，请检查',
														buttons : Ext.Msg.YES,
														icon : Ext.Msg.ERROR
													});
											break;
										case Ext.form.action.Action.CONNECT_FAILURE :
											Ext.MessageBox.show({
														title : '失败',
														msg : '网络链接出错',
														buttons : Ext.Msg.YES,
														icon : Ext.Msg.ERROR
													});
											break;
										case Ext.form.action.Action.SERVER_INVALID :
											Ext.MessageBox.show({
														title : '失败',
														msg : action.result.msg,
														buttons : Ext.Msg.YES,
														icon : Ext.Msg.ERROR
													});
									}
								},
								waitMsg : '请求提交中...',
								waitTitle : '请稍等'
							});
				}
			}
		}, {
			text : '取消',
			scope : me,
			handler : function() {
				me.close();
			}
		}];

		me.callParent(arguments);
	}
});