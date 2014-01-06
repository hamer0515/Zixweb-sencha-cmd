Ext.define('Zixweb.view.yspz.revoke_cause', {
	extend : 'Ext.window.Window',
	alias : 'widget.yspzrevoke_cause',
	title : '原始凭证撤销',
	layout : 'fit',
	autoShow : true,

	initComponent : function() {
		this.items = [{
					xtype : 'form',
					id : 'yspzrevoke_causeform',
					url : 'yspz/revoke',
					border : false,
					fieldDefaults : {
						labelWidth : 110
					},
					bodyPadding : 5,
					items : [{
								xtype : 'displayfield',
								fieldLabel : '当前原始凭证类型',
								name : 'ys_type',
								value : this.ys_type
							}, {
								xtype : 'hiddenfield',
								value : this.ys_type,
								name : 'ys_type'
							}, {
								xtype : 'displayfield',
								fieldLabel : '当前原始凭证编号',
								name : 'ys_type',
								value : this.ys_id
							}, {
								xtype : 'hiddenfield',
								value : this.ys_id,
								name : 'ys_id'
							}, {
								xtype : 'displayfield',
								fieldLabel : '会计期间',
								name : 'period',
								value : this.period
							}, {
								xtype : 'hiddenfield',
								value : this.period,
								name : 'period'
							}, {
								xtype : 'textarea',
								name : 'revoke_cause',
								fieldLabel : '请填写撤销原因',
								allowBlank : false,
								width : 400
							}]
				}];

		this.buttons = [{
			text : '撤销',
			handler : function(e, btn, eOpts) {
				var panel = Ext.getCmp('yspzrevoke_causeform');
				var form = panel.getForm();
				if (form.isValid()) {
					var params = form.getValues();
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
										if (detail) {
											detail.store.reload();
										}
										var ypanel = Ext.getCmp('center_y'
												+ params.ys_type);
										if (ypanel) {
											ypanel.down('gridpanel').store
													.reload();
										}
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
		}, {
			text : '取消',
			scope : this,
			handler : this.close
		}];

		this.callParent(arguments);
	}
});