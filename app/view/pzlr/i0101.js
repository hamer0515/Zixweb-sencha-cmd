Ext.define('Zixweb.view.pzlr.i0101', {
	extend : 'Ext.form.Panel',
	alias : 'widget.i0101',

	border : false,
	fieldDefaults : {
		labelWidth : 150
	},
	layout : {
		type : 'vbox',
		align : 'center'
	},
	bodyPadding : 10,

	initComponent : function() {
		var form = this;
		this.items = [{
					xtype : 'fieldcontainer',
					layout : 'hbox',
					items : [{
								xtype : 'bfjacct',
								name : 'bfj_acct_bj',
								margin : '0 10 0 0',
								fieldLabel : '银行账号',
								allowBlank : false
							}, {
								xtype : 'money',
								name : 'tx_amt',
								width : 516,
								fieldLabel : '出账金额',
								allowBlank : false
							}]

				}, {
					xtype : 'fieldcontainer',
					layout : 'hbox',
					items : [{
								xtype : 'textfield',
								name : 'c',
								width : 516,
								margin : '0 10 0 0',
								fieldLabel : '客户编号',
								allowBlank : false
							}, {
								xtype : 'datefield',
								fieldLabel : '出账日期',
								format : 'Y-m-d',
								name : 'zjbd_date_out',
								width : 516,
								allowBlank : false
							}]
				}, {
					xtype : 'textarea',
					name : 'memo',
					fieldLabel : '备注',
					width : 1042
				}, {
					xtype : 'fieldcontainer',
					layout : 'hbox',
					items : [{
						xtype : 'button',
						margin : '0 20 0 0',
						text : '提交',
						handler : function(button) {
							if (form.getForm().isValid()) {
								Ext.MessageBox.confirm('提示', '确定没有错误，要提交吗?',
										function(optional) {
											if (optional === 'yes') {
												var value = form.getForm()
														.getValues();
												form.getForm().submit({
													clientValidation : true,
													url : '/pzlr/i0101',
													success : function(f,
															action) {
														var result = action.result.success;
														if (result) {
															if (result === 'forbidden') {
																Ext.MessageBox
																		.show({
																			title : '警告',
																			msg : '抱歉，没有i0101录入权限',
																			buttons : Ext.Msg.YES,
																			icon : Ext.Msg.ERROR
																		});
																return;
															}
															Ext.MessageBox
																	.show({
																		title : '提示',
																		msg : 'i0101添加成功',
																		closable : false,
																		buttons : Ext.Msg.YES,
																		icon : Ext.Msg.INFO,
																		fn : function() {
																			form
																					.getForm()
																					.reset();
																		}
																	});
														} else {
															Ext.MessageBox
																	.show({
																		title : '失败',
																		msg : action.result.msg,
																		buttons : Ext.Msg.YES,
																		icon : Ext.Msg.ERROR
																	});
														}
													},
													failure : function(form,
															action) {
														switch (action.failureType) {
															case Ext.form.action.Action.CLIENT_INVALID :
																Ext.MessageBox
																		.show({
																			title : '失败',
																			msg : '表单数据有误，请检查',
																			buttons : Ext.Msg.YES,
																			icon : Ext.Msg.ERROR
																		});
																break;
															case Ext.form.action.Action.CONNECT_FAILURE :
																Ext.MessageBox
																		.show({
																			title : '失败',
																			msg : '网络链接出错',
																			buttons : Ext.Msg.YES,
																			icon : Ext.Msg.ERROR
																		});
																break;
															case Ext.form.action.Action.SERVER_INVALID :
																Ext.MessageBox
																		.show({
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
										})
							}
						}

					}, {
						xtype : 'button',
						margin : '0 10 0 0',
						text : '重置',
						handler : function(button) {
							button.up('panel').getForm().reset();
						}
					}]

				}];

		this.callParent(arguments);
	}
});
