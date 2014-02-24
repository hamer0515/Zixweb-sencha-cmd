Ext.define('Zixweb.view.zqqr.submit', {
	extend : 'Ext.form.Panel',
	alias : 'widget.zqqrsubmit',
	border : false,
	fieldDefaults : {
		labelWidth : 140
	},
	layout : {
		type : 'vbox',
		align : 'left'
	},
	initComponent : function() {
		var me = this;
		me.items = [{
					xtype : 'datefield',
					fieldLabel : '确认日期',
					format : 'Y-m-d',
					name : 'sm_date',
					width : 516,
					vtype : 'beforecurrentdate',
					allowBlank : false
				}, {
					xtype : 'button',
					text : '提交',
					handler : function(button) {
						var form = me.getForm();
						if (form.isValid()) {
							form.submit({
								clientValidation : true,
								url : '/zqqr/submit',
								success : function(form, action) {
									Ext.MessageBox.show({
												title : '提示',
												msg : '周期确认提交成功',
												closable : false,
												buttons : Ext.Msg.YES,
												icon : Ext.Msg.INFO
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

				}];
		me.callParent(arguments);
	}
});