Ext.define('Zixweb.view.zjdz.bfjacctmemo', {
			extend : 'Ext.panel.Panel',
			alias : 'widget.bfjacctmemo',
			initComponent : function() {
				var bfjid = this.bfj_id;
				var myFormPanel = new Ext.form.FormPanel({
							title : '备付金账户备注信息',
							items : [{
										xtype : 'textareafield',
										readOnly : true,
										border : false,
										id : "memoInfo_" + bfjid,
										anchor : '100%'
									}],
							buttons : [{
								text : '关闭',
								scope : this,
								handler : function() {
									var panel = Ext.getCmp('bfjacctmemo_'
											+ this.bfj_id);
									panel.close();
								}
							}]
						});
				myFormPanel.getForm().load({
					url : 'jcsjwh/bfjacct/query',
					params : {
						bfj_id : this.bfj_id
					},
					success : function(form, action) {
						var response = action.result.success;
						if (response) {
							Ext.getCmp('memoInfo_' + bfjid)
									.setValue(action.result.data[0].memo);
						}

					},
					failure : function(form, action) {
						switch (action.failureType) {
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
				this.items = myFormPanel;

				this.callParent(arguments);
			}
		});