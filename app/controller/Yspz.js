Ext.define('Zixweb.controller.Yspz', {
			extend : 'Ext.app.Controller',
			views : ['yspz.yspzq.Detail', 'yspz.revoke_cause',
					'yspz.yspzq.y0000', 'yspz.yspzq.y0001', 'yspz.yspzq.y0002',
					'yspz.yspzq.y0003', 'yspz.yspzq.y0004', 'yspz.yspzq.y0005',
					'yspz.yspzq.y0006', 'yspz.yspzq.y0007', 'yspz.yspzq.y0008',
					'yspz.yspzq.y0009', 'yspz.yspzq.y0010', 'yspz.yspzq.y0011',
					'yspz.yspzq.y0012', 'yspz.yspzq.y0013', 'yspz.yspzq.y0014',
					'yspz.yspzq.y0015', 'yspz.yspzq.y0016', 'yspz.yspzq.y0017',
					'yspz.yspzq.y0018', 'yspz.yspzq.y0028', 'yspz.yspzq.y0029',
					'yspz.yspzq.y0030', 'yspz.yspzq.y0031', 'yspz.yspzq.y0032',
					'yspz.yspzq.y0033', 'yspz.yspzq.y0034', 'yspz.yspzq.y0035',
					'yspz.yspzq.y0036', 'yspz.yspzq.y0037', 'yspz.yspzq.y0038',
					'yspz.yspzq.y0039', 'yspz.yspzq.y0040', 'yspz.yspzq.y0041',
					'yspz.yspzq.y0042', 'yspz.yspzq.y0043', 'yspz.yspzq.y0044',
					'yspz.yspzq.y0045', 'yspz.yspzq.y0046', 'yspz.yspzq.y0047',
					'yspz.yspzq.y0048', 'yspz.yspzq.y0049', 'yspz.yspzq.y0050',
					'yspz.yspzq.y0051', 'yspz.yspzq.y0052', 'yspz.yspzq.y0053',
					'yspz.yspzq.y0054', 'yspz.yspzq.y0055', 'yspz.yspzq.y0056',
					'yspz.yspzq.y0057', 'yspz.yspzq.y0058', 'yspz.yspzq.y0059',
					'yspz.yspzq.y0060', 'yspz.yspzq.y0061', 'yspz.yspzq.y0062',
					'yspz.yspzq.y0063', 'yspz.yspzq.y0064', 'yspz.yspzq.y0065',
					'yspz.yspzq.y0066', 'yspz.yspzq.y0067', 'yspz.yspzq.y0068',
					'yspz.yspzq.y0069', 'yspz.yspzq.y0070', 'yspz.yspzq.y0071',
					'yspz.yspzq.y0072', 'yspz.yspzq.y0073', 'yspz.yspzq.y0074',
					'yspz.yspzq.y0075', 'yspz.yspzq.y0076', 'yspz.yspzq.y0077',
					'yspz.yspzq.y0078', 'yspz.yspzq.y0079', 'yspz.yspzq.y0080',
					'yspz.yspzq.y0081', 'yspz.yspzq.y0082', 'yspz.yspzq.y0083',
					'yspz.yspzq.y0084', 'yspz.yspzq.y0085', 'yspz.yspzq.y0086',
					'yspz.yspzq.y0087', 'yspz.yspzq.y0088', 'yspz.yspzq.y0089',
					'yspz.yspzq.y0090', 'yspz.yspzq.y0091', 'yspz.yspzq.y0092',
					'yspz.yspzq.y0093', 'yspz.yspzq.y0094', 'yspz.yspzq.y0095',
					'yspz.yspzq.y0096', 'yspz.yspzq.y0097', 'yspz.yspzq.y0098',
					'yspz.yspzq.y0099', 'yspz.yspzq.y0100', 'yspz.yspzq.y0101',
					'yspz.yspzq.y0102', 'yspz.yspzq.y0103', 'yspz.yspzq.y0104',
					'yspz.yspzq.y0113', 'yspz.yspzq.y0105', 'yspz.yspzq.y0106',
					'yspz.yspzq.y0107', 'yspz.yspzq.y0108', 'yspz.yspzq.y0109',
					'yspz.yspzq.y0110', 'yspz.yspzq.y0111', 'yspz.yspzq.y0112',
					'yspz.yspzq.y0113', 'yspz.yspzq.y0114', 'yspz.yspzq.y0115',
					'yspz.yspzq.y0116', 'yspz.yspzq.y0117', 'yspz.yspzq.y0118',
					'yspz.yspzq.y0119', 'yspz.yspzq.y0120', 'yspz.yspzq.y0121',
					'yspz.yspzq.y0122', 'yspz.yspzq.y0123', 'yspz.yspzq.y0143',
					'yspz.yspzq.y0144', 'yspz.yspzq.y0145',
					'yspz.yspzq.yF0001', 'yspz.yspzq.yF0002',
					'yspz.yspzq.yF0003', 'yspz.yspzq.yF0004',
					'yspz.yspzq.yF0005', 'yspz.yspzq.yF0006',
					'yspz.yspzq.yF0007', 'yspz.yspzq.yF0008',
					'yspz.yspzq.yF0009', 'yspz.yspzq.yF0010',
					'yspz.yspzq.yF0011', 'yspz.yspzq.yF0012',
					'yspz.yspzq.yF0013', 'yspz.yspzq.yF0014',
					'yspz.yspzq.yF0015', 'yspz.yspzq.yF0016',
					'yspz.yspzq.yF0017', 'yspz.yspzq.yF0018',
					'yspz.yspzq.yF0019', 'yspz.yspzq.yF0020',
					'yspz.yspzq.yF0021', 'yspz.yspzq.yF0022',
					'yspz.yspzq.yF0023', 'yspz.yspzq.yF0024',
					'yspz.yspzq.yF0025', 'yspz.yspzq.yF0026',
					'yspz.yspzq.yF0027', 'yspz.yspzq.yF0028',
					'yspz.yspzq.yF0029', 'yspz.yspzq.yF0030',
					'yspz.yspzq.yF0031', 'yspz.yspzq.yF0032',
					'yspz.yspzq.yF0033', 'yspz.yspzq.yF0034',
					'yspz.yspzq.yF0035', 'yspz.yspzq.yF0036',
					'yspz.yspzq.yF0037', 'yspz.yspzq.yF0038',
					'yspz.yspzq.yF0039', 'yspz.yspzq.yF0040',
					'yspz.yspzq.yF0041', 'yspz.yspzq.yF0042',
					'yspz.yspzq.yF0043', 'yspz.yspzq.yF0044'],

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

		});
