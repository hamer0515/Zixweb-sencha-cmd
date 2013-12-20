Ext.define('Zixweb.view.login.LoginForm', {
			extend : 'Ext.form.Panel',
			alias : 'widget.loginform',
			title : '帐务处理系统',
			autoShow : true,
			floating : true,
			width : 200,
			bodyPadding : 10,
			border : false,
			frame : false,
			defaults : {
				border : false,
				xtype : 'panel'
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
			buttons : [{
						text : '登录',
						action : 'submit'
					}, {
						text : '重置',
						action : 'reset'
					}],
			initComponent : function() {
				var me = this;
				me.callParent(arguments);
			}
		});