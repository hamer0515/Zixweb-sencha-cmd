Ext.define('Zixweb.view.role.Add', {
	extend : 'Ext.window.Window',
	alias : 'widget.roleadd',
	title : '添加新角色',
	layout : 'fit',
	autoShow : true,

	initComponent : function() {
		var me = this, list = me._list, store = new Ext.data.TreeStore({
					fields : ['text', 'route_id'],
					proxy : {
						type : 'ajax',
						url : 'base/routes'
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
								xtype : 'textfield',
								name : 'name',
								fieldLabel : '角色名称',
								allowBlank : false,
								validateOnChange : false,
								msgTarget : 'qtip',
								verify : {
									url : 'role/check'
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
			text : '添加',
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
								url : 'role/add',
								params : {
									limits : limits
								},
								success : function(form, action) {
									list.getStore().reload();
									Ext.MessageBox.show({
												title : '消息',
												msg : '角色添加成功',
												closable : false,
												buttons : Ext.Msg.YES,
												icon : Ext.Msg.INFO,
												fn : function() {
													form.reset();
													store.reload();
												}
											});
								},
								failure : function(form, action) {
									switch (action.failureType) {
										case Ext.form.action.Action.CLIENT_INVALID :
											Ext.MessageBox.show({
														title : '警告',
														msg : '表单验证失败',
														buttons : Ext.Msg.YES,
														icon : Ext.Msg.ERROR
													});
											break;
										case Ext.form.action.Action.CONNECT_FAILURE :
											Ext.MessageBox.show({
														title : '警告',
														msg : '与服务器链接错误',
														buttons : Ext.Msg.YES,
														icon : Ext.Msg.ERROR
													});
											break;
										case Ext.form.action.Action.SERVER_INVALID :
											Ext.MessageBox.show({
														title : '警告',
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
			},
			action : 'submit'
		}, {
			text : '取消',
			handler : function() {
				me.close();
			}
		}];

		me.callParent(arguments);
	}
});