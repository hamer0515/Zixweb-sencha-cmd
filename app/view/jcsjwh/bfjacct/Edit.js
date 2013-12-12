Ext.define('Zixweb.view.jcsjwh.bfjacct.Edit', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.bfjacctedit',
	title : '备付金账户基础数据修改',

	initComponent : function() {
		this.items = [{
			xtype : 'form',
			id : 'bfjacctEditform',
			url : 'jcsjwh/bfjacct/edit',
			border : false,
			bodyPadding : 5,
			fieldDefaults : {
				labelWidth : 100
			},
			items : [{
						xtype : 'textfield',
						name : 'bfj_acct',
						fieldLabel : '备付金银行帐号',
						anchor : '50%',
						allowBlank : false,
						maxLength : 50,
						maxLengthText : '允许最大长度为50',
						validateOnChange : false,
						msgTarget : 'qtip',
						disabled : true
					}, {
						xtype : 'textfield',
						allowBlank : false,
						name : 'b_name',
						anchor : '50%',
						maxLength : 50,
						maxLengthText : '允许最大长度为50',
						fieldLabel : '开户行名称'
					}, {
						xtype : 'textfield',
						allowBlank : false,
						name : 'acct_name',
						anchor : '50%',
						maxLength : 100,
						maxLengthText : '允许最大长度为100',
						fieldLabel : '开户名'
					}, {
						xtype : 'displayfield',
						name : 'bfj_id',
						value : 'bfj_id',
						fieldLabel : '编号'
					}, {
						xtype : 'radiogroup',
						fieldLabel : '是否启用',
						// id : 'statusRadio',
						columns : 2,
						width : 300,
						vertical : true,
						items : [{
									boxLabel : '启用',
									name : 'status',
									inputValue : '1'
								}, {
									boxLabel : '禁用',
									name : 'status',
									inputValue : '2'
								}]
					}, {
						xtype : 'textareafield',
						grow : true,
						name : 'memo',
						fieldLabel : '备注信息',
						height : 250,
						width : 500,
						maxLength : 3000,
						anchor : '100%'
					}, {
						xtype : 'button',
						text : '修改',
						margin : '0 20 0 900',
						// menuAlign : 'tr-br',
						handler : function() {
							var panel = Ext.getCmp('bfjacctEditform');
							var form = panel.getForm();
							var param = form.getRecord();

							if (form.isValid()) {
								Ext.MessageBox.confirm('确认修改', '是否确认修改账户及信息？',
										function(optional) {
											if (optional === 'yes') {
												form.submit({
													clientValidation : true,
													url : panel.url,
													params : {
														bfj_id : param.data.bfj_id
													},
													success : function(form,
															action) {
														var response = action.result.success;
														if (response) {
															if (response == 'forbidden') {
																Ext.MessageBox
																		.show({
																			title : '警告',
																			msg : '抱歉，没有修改备付金账户信息操作权限',
																			buttons : Ext.Msg.YES,
																			icon : Ext.Msg.ERROR
																		});
																return;
															}
															var list = Ext
																	.getCmp('bfjacctlistgrid');
															var items = list.items.items;
															items[0].getStore()
																	.reload();
															Ext.MessageBox
																	.show({
																		title : '提示',
																		msg : '修改成功',
																		closable : false,
																		buttons : Ext.Msg.YES,
																		icon : Ext.Msg.INFO,
																		scope : panel
																				.up('window'),
																		fn : function() {
																			this
																					.close();
																			Ext
																					.getCmp('bfjacctedit')
																					.close();
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
										});

							}
						}
					}, {
						xtype : 'button',
						text : '取消',
						scope : this,
						handler : function() {
							var panel = Ext.getCmp('bfjacctedit');
							panel.close();
						}
					}]
		}];

		this.callParent(arguments);
	}
});