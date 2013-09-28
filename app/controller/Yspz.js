Ext.define('Zixweb.controller.Yspz', {
			extend : 'Ext.app.Controller',
			views : ['Zixweb.view.yspz.yspzq.Detail',
					'Zixweb.view.yspz.revoke_cause'],

			init : function() {
				this.control({
							'yspzrevoke_cause button[action=submit]' : {
								click : this.revoke
							}
						});
			},
			revoke : function(e, btn, eOpts) {
				var panel = Ext.getCmp('yspzrevoke_causeform');
				var form = panel.getForm();
				if (form.isValid()) {
					form.submit({
								clientValidation : true,
								url : panel.url,
								success : function(f, action) {
									var result = action.result.success;
									if (result) {
										if (result === 'forbidden') {
											Ext.MessageBox.show({
														title : '警告',
														msg : '抱歉，没有凭证撤销操作权限',
														buttons : Ext.Msg.YES,
														icon : Ext.Msg.ERROR
													});
											return;
										}
										var tabpanel = Ext
												.getCmp('center_tab_container');
										var active = tabpanel.getActiveTab();
										var detail = active.down('yspzqdetail');
										detail.store.reload();
										Ext.MessageBox.show({
													title : '消息',
													msg : '凭证撤销成功',
													closable : false,
													buttons : Ext.Msg.YES,
													icon : Ext.Msg.INFO,
													scope : panel.up('window'),
													fn : function() {
														this.close();
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
			}

		});