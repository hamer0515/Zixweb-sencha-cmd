Ext.define('Zixweb.view.jcsjwh.bfjacct.Add', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.bfjacctadd',
	title : '备付金账户基础数据添加',
	defaults : {
		border : false
	},
	initComponent : function() {
		this.items = [{
			xtype : 'form',
			id : 'bfjacctaddform',
			url : 'jcsjwh/bfjacct/add',
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
						verify : {
							url : 'jcsjwh/bfjacct/check'
						},
						vtype : 'remoteverify',
						vtypeText :'备付金银行帐号已存在，请重新输入'
					}, {
						xtype : 'textfield',
						allowBlank : false,
						anchor : '50%',
						name : 'b_name',
						maxLength : 50,
						maxLengthText : '允许最大长度为50',
						fieldLabel : '开户行名称'
					}, {
						xtype : 'textfield',
						allowBlank : false,
						anchor : '50%',
						name : 'acct_name',
						maxLength : 100,
						maxLengthText : '允许最大长度为100',
						fieldLabel : '开户名'
					}, {
						xtype: 'radiogroup',
						fieldLabel: '是否启用',
						columns: 2,
						width : 300,
				        items: [
				            { boxLabel: '启用', name: 'status', inputValue: '1' , checked: true},
				            { boxLabel: '禁用', name: 'status', inputValue: '2'}
				        ]},{
				            xtype     : 'textareafield',
				            grow      : true,
				            name      : 'memo',	
				            fieldLabel: '备注信息',
				            height : 250,
				            width : 500,
				            maxLength : 3000,
				            anchor    : '100%'
				        },{
				        	xtype : 'button',
				        	text : '添加',
				        	margin : '0 20 0 900',
							handler : function(){
								var panel = Ext.getCmp('bfjacctaddform');
								var form = panel.getForm();
								if (form.isValid()) {
									Ext.MessageBox.confirm('确认添加', '是否确认添加新的账户及信息？',
									function(optional) {
										if (optional === 'yes') {
											form.submit({
														clientValidation : true,
														url : panel.url,
														success : function(form, action) {
															var response = action.result.success;
															if (response) {
																if (response == 'forbidden') {
																	Ext.MessageBox.show({
																				title : '警告',
																				msg : '抱歉，没有增加备付金账户信息操作权限',
																				buttons : Ext.Msg.YES,
																				icon : Ext.Msg.ERROR
																			});
																	return;
																}
																var list = Ext
																		.getCmp('bfjacctlistgrid');
																var items = list.items.items;
																items[0].getStore().reload();
																Ext.MessageBox.show({
																			title : '提示',
																			msg : '添加成功',
																			closable : false,
																			buttons : Ext.Msg.YES,
																			icon : Ext.Msg.INFO,
																			scope : panel.up('window'),
																			fn : function() {
																				this.close();
																				Ext.getCmp('bfjacctadd').close();
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
									});
										
								}
							}
						}, {
							xtype : 'button',
							text : '取消',
							scope : this,
							handler : function(){
								var panel = Ext.getCmp('bfjacctadd');
								panel.close();
							}
						} ]
		}];

		this.callParent(arguments);
	}
});