Ext.define('Zixweb.view.login.PasswordReset', {
	extend : 'Ext.form.Panel',
	alias : 'widget.passwordreset',
	border : false,
	fieldDefaults : {
		allowBlank : false,
		msgTarget : 'qtip',
		width : 280
	},
	layout : {
		type : 'vbox',
		align : 'left'
	},

	initComponent : function() {
		var me = this;
		me.items = [{
					xtype : 'textfield',
					fieldLabel : '旧密码',
					inputType : 'password',
					name : 'oldpassword',
					maxLength : 20,
					maxLengthText : '允许最大长度为20',
					minLength : 6,
					minLengthText : '允许最小长度为6'
				}, {
					xtype : 'textfield',
					fieldLabel : '新密码',
					inputType : 'password',
					name : 'newpassword',
					id : 'newpassword',
					maxLength : 20,
					maxLengthText : '允许最大长度为20',
					minLength : 6,
					minLengthText : '允许最小长度为6'
				}, {
					xtype : 'textfield',
					fieldLabel : '确认新密码',
					inputType : 'password',
					name : 'confirmpassword',
					id : 'verify',
					verifypwd : {
						id : 'newpassword'
					},
					vtype : 'verifypwd'
				}, {
					xtype : 'fieldcontainer',
					layout : 'hbox',
					items : [{
						xtype : 'button',
						margin : '0 20 0 0',
						text : '确定',
						handler : function(button) {
							var panel = button.up('panel'), form = panel
									.getForm();
							if (form.isValid()) {
								form.submit({
									clientValidation : true,
									url : '/login/passwordreset',
									success : function(form, action) {
										var response = action.result.success;
										if (response) {
											if (response == 'forbidden') {
												Ext.MessageBox.show({
															title : '警告',
															msg : '抱歉，没有密码修改操作权限',
															buttons : Ext.Msg.YES,
															icon : Ext.Msg.ERROR
														});
												return;
											}
											Ext.MessageBox.show({
														title : '提示',
														msg : '密码修改成功',
														buttons : Ext.Msg.YES,
														icon : Ext.Msg.INFO
													});
											form.reset();
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
									waitMsg : '正在提交请求...',
									waitTitle : '请稍等'
								});
							}
						}
					}, {
						xtype : 'button',
						text : '重置',
						handler : function(button) {
							me.getForm().reset();
						}
					}]
				}];
		me.callParent(arguments);
	}
});