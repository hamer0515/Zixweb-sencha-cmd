Ext.define('Zixweb.controller.Yspz', {
			extend : 'Ext.app.Controller',
			views : ['Zixweb.view.yspz.yspzq.Detail',
					'Zixweb.view.yspz.revoke_cause',
					'Zixweb.view.yspz.yspzq.y0000',
					'Zixweb.view.yspz.yspzq.y0001',
					'Zixweb.view.yspz.yspzq.y0002',
					'Zixweb.view.yspz.yspzq.y0003',
					'Zixweb.view.yspz.yspzq.y0004',
					'Zixweb.view.yspz.yspzq.y0005',
					'Zixweb.view.yspz.yspzq.y0006',
					'Zixweb.view.yspz.yspzq.y0007',
					'Zixweb.view.yspz.yspzq.y0008',
					'Zixweb.view.yspz.yspzq.y0009',
					'Zixweb.view.yspz.yspzq.y0010',
					'Zixweb.view.yspz.yspzq.y0011',
					'Zixweb.view.yspz.yspzq.y0012',
					'Zixweb.view.yspz.yspzq.y0013',
					'Zixweb.view.yspz.yspzq.y0014',
					'Zixweb.view.yspz.yspzq.y0015',
					'Zixweb.view.yspz.yspzq.y0016',
					'Zixweb.view.yspz.yspzq.y0017',
					'Zixweb.view.yspz.yspzq.y0018',
					'Zixweb.view.yspz.yspzq.y0028',
					'Zixweb.view.yspz.yspzq.y0029',
					'Zixweb.view.yspz.yspzq.y0030',
					'Zixweb.view.yspz.yspzq.y0031',
					'Zixweb.view.yspz.yspzq.y0032',
					'Zixweb.view.yspz.yspzq.y0033',
					'Zixweb.view.yspz.yspzq.y0034',
					'Zixweb.view.yspz.yspzq.y0035',
					'Zixweb.view.yspz.yspzq.y0036',
					'Zixweb.view.yspz.yspzq.y0037',
					'Zixweb.view.yspz.yspzq.y0038',
					'Zixweb.view.yspz.yspzq.y0039',
					'Zixweb.view.yspz.yspzq.y0040',
					'Zixweb.view.yspz.yspzq.y0041',
					'Zixweb.view.yspz.yspzq.y0042',
					'Zixweb.view.yspz.yspzq.y0043',
					'Zixweb.view.yspz.yspzq.y0044',
					'Zixweb.view.yspz.yspzq.y0045',
					'Zixweb.view.yspz.yspzq.y0046',
					'Zixweb.view.yspz.yspzq.y0047',
					'Zixweb.view.yspz.yspzq.y0048',
					'Zixweb.view.yspz.yspzq.y0049',
					'Zixweb.view.yspz.yspzq.y0050',
					'Zixweb.view.yspz.yspzq.y0051',
					'Zixweb.view.yspz.yspzq.y0052',
					'Zixweb.view.yspz.yspzq.y0053',
					'Zixweb.view.yspz.yspzq.y0054',
					'Zixweb.view.yspz.yspzq.y0055',
					'Zixweb.view.yspz.yspzq.y0056',
					'Zixweb.view.yspz.yspzq.y0057',
					'Zixweb.view.yspz.yspzq.y0058',
					'Zixweb.view.yspz.yspzq.y0059',
					'Zixweb.view.yspz.yspzq.y0060',
					'Zixweb.view.yspz.yspzq.y0061',
					'Zixweb.view.yspz.yspzq.y0062',
					'Zixweb.view.yspz.yspzq.y0063',
					'Zixweb.view.yspz.yspzq.y0064',
					'Zixweb.view.yspz.yspzq.y0065',
					'Zixweb.view.yspz.yspzq.y0066',
					'Zixweb.view.yspz.yspzq.y0067',
					'Zixweb.view.yspz.yspzq.y0068',
					'Zixweb.view.yspz.yspzq.y0069',
					'Zixweb.view.yspz.yspzq.y0070',
					'Zixweb.view.yspz.yspzq.y0071',
					'Zixweb.view.yspz.yspzq.y0072',
					'Zixweb.view.yspz.yspzq.y0073',
					'Zixweb.view.yspz.yspzq.y0074',
					'Zixweb.view.yspz.yspzq.y0075',
					'Zixweb.view.yspz.yspzq.y0076',
					'Zixweb.view.yspz.yspzq.y0077',
					'Zixweb.view.yspz.yspzq.y0078',
					'Zixweb.view.yspz.yspzq.y0079',
					'Zixweb.view.yspz.yspzq.y0080',
					'Zixweb.view.yspz.yspzq.y0081',
					'Zixweb.view.yspz.yspzq.y0082',
					'Zixweb.view.yspz.yspzq.y0083',
					'Zixweb.view.yspz.yspzq.y0084',
					'Zixweb.view.yspz.yspzq.y0085',
					'Zixweb.view.yspz.yspzq.y0086',
					'Zixweb.view.yspz.yspzq.y0087',
					'Zixweb.view.yspz.yspzq.y0088',
					'Zixweb.view.yspz.yspzq.y0089',
					'Zixweb.view.yspz.yspzq.y0090',
					'Zixweb.view.yspz.yspzq.y0091',
					'Zixweb.view.yspz.yspzq.y0092',
					'Zixweb.view.yspz.yspzq.y0093',
					'Zixweb.view.yspz.yspzq.y0094',
					'Zixweb.view.yspz.yspzq.y0095',
					'Zixweb.view.yspz.yspzq.y0096',
					'Zixweb.view.yspz.yspzq.y0097',
					'Zixweb.view.yspz.yspzq.y0098',
					'Zixweb.view.yspz.yspzq.y0099',
					'Zixweb.view.yspz.yspzq.y0100',
					'Zixweb.view.yspz.yspzq.y0101',
					'Zixweb.view.yspz.yspzq.y0102',
					'Zixweb.view.yspz.yspzq.y0103',
					'Zixweb.view.yspz.yspzq.y0104',
					'Zixweb.view.yspz.yspzq.y0113',
					'Zixweb.view.yspz.yspzq.y0105',
					'Zixweb.view.yspz.yspzq.y0106',
					'Zixweb.view.yspz.yspzq.y0107',
					'Zixweb.view.yspz.yspzq.y0108',
					'Zixweb.view.yspz.yspzq.y0113',
					'Zixweb.view.yspz.yspzq.y0114',
					'Zixweb.view.yspz.yspzq.y0115',
					'Zixweb.view.yspz.yspzq.y0116',
					'Zixweb.view.yspz.yspzq.y0117',
					'Zixweb.view.yspz.yspzq.yF0022',
					'Zixweb.view.yspz.yspzq.yF0023',
					'Zixweb.view.yspz.yspzq.yF0024',
					'Zixweb.view.yspz.yspzq.yF0025',
					'Zixweb.view.yspz.yspzq.yF0026',
					'Zixweb.view.yspz.yspzq.yF0027',
					'Zixweb.view.yspz.yspzq.yF0028',
					'Zixweb.view.yspz.yspzq.yF0029',
					'Zixweb.view.yspz.yspzq.yF0030',
					'Zixweb.view.yspz.yspzq.yF0031',
					'Zixweb.view.yspz.yspzq.yF0032',
					'Zixweb.view.yspz.yspzq.yF0033',
					'Zixweb.view.yspz.yspzq.yF0034',
					'Zixweb.view.yspz.yspzq.yF0035',
					'Zixweb.view.yspz.yspzq.yF0036',
					'Zixweb.view.yspz.yspzq.yF0037',
					'Zixweb.view.yspz.yspzq.yF0038',
					'Zixweb.view.yspz.yspzq.yF0039',
					'Zixweb.view.yspz.yspzq.yF0040',
					'Zixweb.view.yspz.yspzq.yF0041',
					'Zixweb.view.yspz.yspzq.yF0042',
					'Zixweb.view.yspz.yspzq.yF0043',
					'Zixweb.view.yspz.yspzq.yF0044'],

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
