Ext.define('Zixweb.view.pzlr.i0148', {
	extend : 'Ext.form.Panel',
	alias : 'widget.i0148',

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
		var me = this;
		me.items = [{
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
								fieldLabel : '长短款勾稽金额',
								allowBlank : false
							}]

				}, {
					xtype : 'fieldcontainer',
					layout : 'hbox',
					items : [{
								xtype : 'datefield',
								fieldLabel : '短款差错日期',
								format : 'Y-m-d',
								name : 'e_date_sc',
								width : 516,
								margin : '0 10 0 0',
								allowBlank : false
							}, {
								xtype : 'datefield',
								fieldLabel : '长款差错日期',
								format : 'Y-m-d',
								name : 'e_date_lc',
								width : 516,
								allowBlank : false
							}]
				}, {
					xtype : 'fieldcontainer',
					layout : 'hbox',
					items : [{
								xtype : 'datefield',
								fieldLabel : '差错处理日期',
								format : 'Y-m-d',
								name : 'e_date',
								width : 516,
								margin : '0 10 0 0',
								allowBlank : false
							}, {
								xtype : 'zjbdtype',
								fieldLabel : '资金变动类型',
								format : 'Y-m-d',
								name : 'zjbd_type',
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
							var form = me.getForm();
							if (form.isValid()) {
								Ext.MessageBox.confirm('提示', '确定没有错误，要提交吗?',
										function(optional) {
											if (optional === 'yes') {
												var value = form.getValues();
												form.submit({
													clientValidation : true,
													url : '/pzlr/i0148',
													success : function(f,
															action) {
														Ext.MessageBox.show({
															title : '提示',
															msg : 'i0148添加成功',
															closable : false,
															buttons : Ext.Msg.YES,
															icon : Ext.Msg.INFO,
															fn : function() {
																form.reset();
															}
														});
													},
													failure : function(form,
															action) {
														switch (action.failureType) {
															case Ext.form.action.Action.CLIENT_INVALID :
																Ext.MessageBox
																		.show({
																			title : '警告',
																			msg : '表单验证失败',
																			buttons : Ext.Msg.YES,
																			icon : Ext.Msg.ERROR
																		});
																break;
															case Ext.form.action.Action.CONNECT_FAILURE :
																Ext.MessageBox
																		.show({
																			title : '警告',
																			msg : '与服务器链接错误',
																			buttons : Ext.Msg.YES,
																			icon : Ext.Msg.ERROR
																		});
																break;
															case Ext.form.action.Action.SERVER_INVALID :
																Ext.MessageBox
																		.show({
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
										})
							}
						}

					}, {
						xtype : 'button',
						margin : '0 10 0 0',
						text : '重置',
						handler : function(button) {
							me.getForm().reset();
						}
					}]

				}];

		me.callParent(arguments);
	}
});
