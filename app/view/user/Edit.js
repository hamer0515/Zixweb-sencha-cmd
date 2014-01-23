Ext.define('Zixweb.view.user.Edit', {
	extend : 'Ext.window.Window',
	alias : 'widget.useredit',
	title : '更新用户',
	layout : 'fit',
	autoShow : true,

	initComponent : function() {
		var me = this, list = me._list;
		me.items = [{
			xtype : 'form',
			border : false,
			fieldDefaults : {
				labelWidth : 70
			},
			bodyPadding : 5,
			items : [{
						xtype : 'hiddenfield',
						id : 'user_id',
						name : 'user_id'
					}, {
						xtype : 'textfield',
						name : 'username',
						fieldLabel : '用户名',
						anchor : '100%',
						allowBlank : false,
						validateOnChange : false,
						msgTarget : 'qtip',
						verify : {
							url : 'user/check',
							id : 'user_id'
						},
						vtype : 'remoteverify'
					}, {
						xtype : 'textfield',
						name : 'password',
						inputType : 'password',
						maxLength : 20,
						maxLengthText : '允许最大长度为20',
						minLength : 6,
						minLengthText : '允许最小长度为6',
						fieldLabel : '初始密码'
					}, {
						xtype : 'status'
					}, {
						xtype : 'itemselector',
						name : 'roles',
						width : 700,
						height : 300,
						fieldLabel : '角色选择',
						store : new Ext.data.Store({
							fields : ['name', 'role_id'],
							autoLoad : true,

							proxy : {
								type : 'ajax',
								api : {
									read : '/base/allroles'
								},
								reader : {
									type : 'json'
								}
							},
							listeners : {
								load : function(me, records, successful, eOpts) {
									if (!successful) {
										Ext.MessageBox.show({
													title : '警告',
													msg : '数据加载失败,请联系管理员',
													buttons : Ext.Msg.YES,
													icon : Ext.Msg.ERROR
												});
									}
									var jsonData = me.proxy.reader.jsonData.success;
									if (jsonData && jsonData === 'forbidden') {
										Ext.MessageBox.show({
													title : '警告',
													msg : '抱歉，没有角色列表访问权限',
													buttons : Ext.Msg.YES,
													icon : Ext.Msg.ERROR
												});
									}
								}
							}
						}),
						displayField : 'name',
						valueField : 'role_id',
						msgTarget : 'qtip',
						fromTitle : '可选择',
						toTitle : '已选择'
					}]
		}];

		me.buttons = [{
			text : '更新',
			handler : function(button) {
				var panel = me.down('form'), form = panel.getForm();
				if (form.isValid()) {
					var roles = panel.down('itemselector').getValue();
					form.submit({
								clientValidation : true,
								url : 'user/update',
								params : {
									roles : roles
								},
								success : function(form, action) {
									list.getStore().reload();
									Ext.MessageBox.show({
												title : '提示',
												msg : '用户更新成功',
												closable : false,
												buttons : Ext.Msg.YES,
												icon : Ext.Msg.INFO,
												fn : function() {
													me.close();
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
			}
		}, {
			text : '取消',
			handler : function() {
				me.close();
			}
		}];

		me.callParent(arguments);
	}
});