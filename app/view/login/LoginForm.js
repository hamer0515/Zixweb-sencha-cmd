Ext.define('Zixweb.view.login.LoginForm', {
	extend : 'Ext.form.Panel',
	alias : 'widget.loginform',
	autoShow : true,
	floating : true,
	width : 200,
	bodyPadding : 10,
	border : false,
	frame : false,
	defaults : {
		border : false
	},
	fieldDefaults : {
		labelAlign : 'top',
		allowBlank : false,
		msgTarget : 'qtip',
		width : 180
	},
	items : [{
				xtype : 'textfield',
				fieldLabel : '用户名',
				name : 'username'
			}, {
				xtype : 'textfield',
				fieldLabel : '密码',
				inputType : 'password',
				name : 'password',
				maxLength : 20,
				maxLengthText : '允许最大长度为20',
				minLength : 6,
				minLengthText : '允许最小长度为6'
			}],

	initComponent : function() {
		var me = this;
		me.title = '帐务处理系统' + Ext.version;
		me.buttons = [{
			text : '登录',
			handler : function(button) {
				var panel = button.up('panel'), form = panel.getForm();
				if (form.isValid()) {
					form.submit({
								clientValidation : true,
								url : '/login/login',
								success : function(form, action) {
									var response = action.result.success;
									if (response) {
										if (response == 'forbidden') {
											Ext.MessageBox.show({
														title : '警告',
														msg : '抱歉，没有登录操作权限',
														buttons : Ext.Msg.YES,
														icon : Ext.Msg.ERROR
													});
											return;
										}
										// 加载数据集数据
										var stores = ['BfjAcct', 'Acct', 'Bi',
												'FhwType', 'FhydAcct',
												'FypAcct', 'FywType',
												'Product', 'WlzjType',
												'YsType', 'ZjbdType',
												'ZyzjAcct'];
										for (var i in stores) {
											Ext.data.StoreManager
													.lookup('component.'
															+ stores[i]).load();
										}
										// 添加主页面板
										var viewport = panel.up('viewport');
										viewport.removeAll();
										viewport.add([{
													region : 'north',
													xtype : 'north',
													height : 60,
													margins : '0 5 0 5'
												}, {
													title : '菜單',
													region : 'west',
													xtype : 'west',
													margins : '0 0 0 5',
													minWidth : 200,
													collapsible : true,
													split : true
												}, {
													region : 'center',
													xtype : 'center',
													height : 683,
													margins : '0 5 0 0'
												}, {
													region : 'south',
													xtype : 'south',
													height : 25,
													margins : '0 5 0 5'
												}]);
									} else {
										Ext.MessageBox.show({
													title : '警告',
													msg : action.result.msg,
													buttons : Ext.Msg.YES,
													icon : Ext.Msg.ERROR
												});
									}
								},
								failure : function(form, action) {
									Ext.MessageBox.show({
												title : '警告',
												msg : '用户名或密码错误',
												buttons : Ext.Msg.YES,
												icon : Ext.Msg.ERROR
											});
								},
								waitMsg : '使劲登录中...',
								waitTitle : '请稍等'
							});
				}
			}
		}, {
			text : '重置',
			handler : function(button) {
				me.getForm().reset();
			}
		}];
		me.callParent(arguments);
	}
});