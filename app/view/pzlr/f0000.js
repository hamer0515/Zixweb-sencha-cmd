Ext.define('Zixweb.view.pzlr.f0000', {
	extend : 'Ext.form.Panel',
	alias : 'widget.f0000',

	border : false,
	fieldDefaults : {
		labelWidth : 150
	},
	layout : {
		type : 'vbox',
		align : 'center'
	},
	prev_jdbook : [],
	bodyPadding : 10,
	current_fl : 1,
	renderers : {
		fcg_date : function(v) {
			if (v) {
				return Ext.Date.format(v, 'Y-m-d');
			}
			return v;
		},
		fe_date : function(v) {
			if (v) {
				return Ext.Date.format(v, 'Y-m-d');
			}
			return v;
		},
		fhw_type : function(v) {
			if (v) {
				var store = Ext.data.StoreManager.lookup('component.FhwType');
				var index = store.findExact('id', v);
				return store.getAt(index).data.name;
			}
			return v;
		},
		fhyd_acct : function(v) {
			if (v) {
				var store = Ext.data.StoreManager.lookup('component.FhydAcct');
				var index = store.findExact('id', v);
				return store.getAt(index).data.name;
			}
			return v;
		},
		fio_date : function(v) {
			if (v) {
				return Ext.Date.format(v, 'Y-m-d');
			}
			return v;
		},
		ftx_date : function(v) {
			if (v) {
				return Ext.Date.format(v, 'Y-m-d');
			}
			return v;
		},
		fyp_acct : function(v) {
			if (v) {
				var store = Ext.data.StoreManager.lookup('component.FypAcct');
				var index = store.findExact('id', v);
				return store.getAt(index).data.name;
			}
			return v;
		},
		fyw_type : function(v) {
			if (v) {
				var store = Ext.data.StoreManager.lookup('component.FywType');
				var index = store.findExact('id', v);
				return store.getAt(index).data.name;
			}
			return v;
		}
	},
	editors : {
		period : "Ext.createByAlias('widget.datefield', {submitValue : false, format : 'Y-m-d'})",
		f_dcn : "Ext.createByAlias('widget.textfield', {submitValue :false})",
		f_rate : "Ext.createByAlias('widget.textfield', {submitValue :false})",
		f_ssn : "Ext.createByAlias('widget.textfield', {submitValue : false})",
		fc : "Ext.createByAlias('widget.textfield', {submitValue : false})",
		fcg_date : "Ext.createByAlias('widget.datefield', {submitValue : false, format : 'Y-m-d'})",
		fch_rate : "Ext.createByAlias('widget.textfield', {submitValue : false})",
		fch_ssn : "Ext.createByAlias('widget.textfield', {submitValue : false})",
		fe_date : "Ext.createByAlias('widget.datefield', {submitValue : false, format : 'Y-m-d'})",
		fhw_type : "Ext.createByAlias('widget.fhwtype', {submitValue : false})",
		fhyd_acct : "Ext.createByAlias('widget.fhydacct', {submitValue : false})",
		fio_date : "Ext.createByAlias('widget.datefield', {submitValue : false, format : 'Y-m-d'})",
		fm : "Ext.createByAlias('widget.textfield', {submitValue : false})",
		fs_rate : "Ext.createByAlias('widget.textfield', {submitValue : false})",
		ftx_date : "Ext.createByAlias('widget.datefield', {submitValue : false, format : 'Y-m-d'})",
		fyp_acct : "Ext.createByAlias('widget.fypacct', {submitValue : false})",
		fyw_type : "Ext.createByAlias('widget.fywtype', {submitValue : false})",
		amt : "Ext.createByAlias('widget.money', {submitValue : false})"
	},
	initComponent : function() {
		var form = this;
		this.fields = [];
		this.deleted = [];
		Ext.Ajax.request({
					async : false,
					url : 'base/book_headers',
					success : function(response) {
						form.headers = Ext.decode(response.responseText).success;
					},
					failure : function(response, opts) {
						Ext.MessageBox.show({
									title : '警告',
									msg : '加载科目信息出错，错误码:' + response.status,
									buttons : Ext.Msg.YES,
									icon : Ext.Msg.ERROR
								});
					}
				});
		Ext.Ajax.request({
					async : false,
					url : 'base/book_dim',
					success : function(response) {
						form.names = Ext.decode(response.responseText).success;
					},
					failure : function(response, opts) {
						Ext.MessageBox.show({
									title : '警告',
									msg : '加载科目核算项信息出错，错误码:' + response.status,
									buttons : Ext.Msg.YES,
									icon : Ext.Msg.ERROR
								});
					}
				});
		this.items = [{
					xtype : 'textarea',
					name : 'cause',
					fieldLabel : '添加特种调账单的原因',
					width : 990,
					allowBlank : false
				}, {
					xtype : 'fieldcontainer',
					width : 990,
					layout : 'hbox',
					items : [{
								xtype : 'datefield',
								fieldLabel : '会计期间',
								format : 'Y-m-d',
								name : 'period',
								width : 360,
								allowBlank : false
							}]

				}, {
					xtype : 'fieldcontainer',
					layout : 'hbox',
					items : [{
								xtype : 'books',
								margin : '0 10 0 0',
								width : 490,
								id : 'pzlrfitztzjbook',
								submitValue : false,
								set : [2],
								fieldLabel : '借方科目'
							}, {
								xtype : 'books',
								width : 490,
								submitValue : false,
								set : [2],
								fieldLabel : '贷方科目',
								id : 'pzlrfitztzdbook'
							}]

				}, {
					xtype : 'fieldcontainer',
					layout : 'hbox',
					items : [{
						xtype : 'button',
						text : '添加',
						margin : '0 20 0 0',
						handler : function(button) {
							var j_comp = Ext.getCmp('pzlrfitztzjbook');
							var d_comp = Ext.getCmp('pzlrfitztzdbook');
							var j = j_comp.getValue();
							var d = d_comp.getValue();
							// 没有选择借方科目或者贷方科目，不进行下面的操作
							if (!j || !d) {
								return;
							}
							// 借贷方科目不属于同一个帐套，不进行下面的操作
							var j_set = j_comp.store.getAt(j_comp.store
									.findExact('id', j)).data.set;
							var d_set = d_comp.store.getAt(d_comp.store
									.findExact('id', d)).data.set;
							if (j_set != d_set) {
								Ext.MessageBox.show({
											title : '警告',
											msg : '所选科目不属于同一帐套',
											buttons : Ext.Msg.YES,
											icon : Ext.Msg.WARNING
										});
								return;
							}

							var j_options = Ext.decode(form.headers[j]);
							var d_options = Ext.decode(form.headers[d]);
							var j_sourceConfig = {};
							var d_sourceConfig = {};
							for (var property in j_options.source) {
								j_options.source[property] = '';
								j_sourceConfig[property] = {};
								j_sourceConfig[property]["editor"] = eval(form.editors[property]);
								j_sourceConfig[property]["displayName"] = form.names[property];
								j_sourceConfig[property]["renderer"] = form.renderers[property];
							}
							for (var property in d_options.source) {
								d_options.source[property] = '';
								d_sourceConfig[property] = {};
								d_sourceConfig[property]["editor"] = eval(form.editors[property]);
								d_sourceConfig[property]["displayName"] = form.names[property];
								d_sourceConfig[property]["renderer"] = form.renderers[property];
							}
							var jbook = Ext.create('Ext.grid.property.Grid', {
										_type : j,
										title : "借方科目：" + j_options.book_name,
										width : 490,
										margin : '0 10 0 0',
										sourceConfig : j_sourceConfig,
										source : j_options.source,
										clicksToEdit : 1,
										disableSelection : true
									});
							// 禁用排序
							jbook.columns[0].sortable = false;
							jbook.columns[1].sortable = false;
							var dbook = Ext.create('Ext.grid.property.Grid', {
										_type : d,
										title : "贷方科目：" + d_options.book_name,
										width : 490,
										sourceConfig : d_sourceConfig,
										source : d_options.source,
										clicksToEdit : 1,
										disableSelection : true
									});
							// 禁用排序
							dbook.columns[0].sortable = false;
							dbook.columns[1].sortable = false;
							var beforechange = function(source, recordId,
									value, oldValue, eOpts) {
								var result = true;
								if (recordId === 'c' || recordId === 'fp'
										|| recordId === 'cust_proto') {
									Ext.Ajax.request({
										async : false,
										url : 'base/' + recordId,
										params : {
											name : value
										},
										success : function(response) {
											var v = Ext
													.decode(response.responseText).success;
											result = v;
										}
									});
								}
								return result;
							};
							jbook.on("beforepropertychange", beforechange);
							dbook.on("beforepropertychange", beforechange);
							form.fields.push([jbook, dbook, form.current_fl]);
							var header = Ext.createByAlias(
									'widget.fieldcontainer', {
										fl_id : form.current_fl,
										width : 990,
										layout : 'vbox',
										items : [{
											xtype : 'fieldcontainer',
											layout : 'hbox',
											items : [{
												xtype : 'displayfield',
												value : '分录'
														+ form.current_fl++
											}, {
												xtype : 'button',
												margin : '0 0 0 200',
												text : '删除',
												handler : function(button) {
													form.remove(header);
													form.deleted
															.push(header.fl_id);
												}
											}]
										}, {
											xtype : 'fieldcontainer',
											layout : 'hbox',
											items : [jbook, dbook]
										}]
									});
							form.insert(4, header)
						}
					}, {
						xtype : 'button',
						text : '提交',
						handler : function(button) {
							if (form.getForm().isValid()) {
								var data = form.check();
								if (typeof(data) === "boolean") {
									return;
								}
								Ext.MessageBox.confirm('提示', '没有发现错误，确定要提交吗?',
										function(optional) {
											if (optional === 'yes') {
												var value = form.getForm()
														.getValues();
												var sendData = {};
												sendData["jd_books"] = data;
												sendData["cause"] = value["cause"];
												sendData["period"] = value["period"];
												form.getForm()
														.setValues(sendData);
												form.getForm().submit({
													clientValidation : true,
													url : '/pzlr/f0000',
													params : {
														data : Ext.JSON
																.encode(sendData)
													},
													success : function(f,
															action) {
														var result = action.result.success;
														if (result) {
															if (result === 'forbidden') {
																Ext.MessageBox
																		.show({
																			title : '警告',
																			msg : '抱歉，没有特种调帐单录入权限',
																			buttons : Ext.Msg.YES,
																			icon : Ext.Msg.ERROR
																		});
																return;
															}
															Ext.MessageBox
																	.show({
																		title : '提示',
																		msg : '特种调账单添加成功',
																		closable : false,
																		buttons : Ext.Msg.YES,
																		icon : Ext.Msg.INFO,
																		fn : function() {
																			form
																					.getForm()
																					.reset();
																			form.current_fl = 1;
																			form.fields = [];
																			form.deleted = [];
																			var count = form.items.length;
																			for (var i = count
																					- 1; i > 3; i--) {
																				form
																						.remove(form.items.items[i]);
																			}
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

					}]

				}];
		this.check = function() {
			var fields = this.fields, deleted = this.deleted, data = {}, empty = true;

			for (var index in fields) {
				if (fields[index] == undefined) {
					continue;
				}
				var field = fields[index];
				var jbook = field[0].getSource();
				var dbook = field[1].getSource();
				var fl = field[2];
				if (deleted.indexOf(fl) != -1) {
					continue;
				}
				if (empty) {
					empty = false;
				}
				data[fl] = {};
				if (parseFloat(jbook.amt.replace(/\,/g, '')) != parseFloat(dbook.amt
						.replace(/\,/g, ''))) {
					Ext.MessageBox.alert('警告', '[分录' + fl + ']借贷方金额不一致');
					return false;
				}
				data[fl]["j_book"] = {};
				data[fl]["j_book"]["_type"] = field[0]["_type"];
				for (var f in jbook) {
					if (jbook[f] == '') {
						Ext.MessageBox.alert('警告', '[分录' + fl + '][借方科目]['
										+ form.names[f] + ']值为空');
						return false;
					}
					if (f === 'amt') {
						data[fl]["j_book"]['j'] = Ext.Number
								.correctFloat(parseFloat(jbook[f].replace(
										/\,/g, ''))
										* 100);
					} else if (f === 'e_date' || f == 'zjbd_date'
							|| f == 'tx_date') {
						// 借方日期对象转换为日期字符串
						data[fl]["j_book"][f] = jbook[f].pattern('yyyy-MM-dd');
					} else {
						data[fl]["j_book"][f] = jbook[f];
					}
				}
				data[fl]["d_book"] = {};
				data[fl]["d_book"]["_type"] = field[1]["_type"];
				for (var f in dbook) {
					if (dbook[f] == '') {
						Ext.MessageBox.alert('警告', '[分录' + fl + '][贷方科目]['
										+ form.names[f] + ']值为空');
						return false;
					}
					if (f === 'amt') {
						data[fl]["d_book"]['d'] = Ext.Number
								.correctFloat(parseFloat(dbook[f].replace(
										/\,/g, ''))
										* 100);
					} else if (f === 'e_date' || f == 'zjbd_date'
							|| f == 'tx_date') {
						// 贷方日期对象转换为日期字符串
						data[fl]["d_book"][f] = dbook[f].pattern('yyyy-MM-dd');
					} else {
						data[fl]["d_book"][f] = dbook[f];
					}
				}
			}
			if (empty) {
				Ext.MessageBox.alert('警告', '没有任何分录');
				return false;
			}
			return data;
		};
		this.callParent(arguments);
	}
});