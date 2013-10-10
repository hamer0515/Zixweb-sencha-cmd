Ext.define('Zixweb.view.pzlr.i0000', {
	extend : 'Ext.form.Panel',
	alias : 'widget.i0000',

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
		acct : function(v) {
			if (v) {
				var store = Ext.data.StoreManager
						.lookup('Zixweb.store.component.Acct');
				var index = store.findExact('id', v);
				return store.getAt(index).data.name;
			}
			return v;
		},
		bfj_acct : function(v) {
			if (v) {
				var store = Ext.data.StoreManager
						.lookup('Zixweb.store.component.BfjAcct');
				var index = store.findExact('id', v);
				return store.getAt(index).data.name;
			}
			return v;
		},
		zyzj_acct : function(v) {
			if (v) {
				var store = Ext.data.StoreManager
						.lookup('Zixweb.store.component.ZyzjAcct');
				var index = store.findExact('id', v);
				return store.getAt(index).data.name;
			}
			return v;
		},
		zjbd_type : function(v) {
			if (v) {
				var store = Ext.data.StoreManager
						.lookup('Zixweb.store.component.ZjbdType');
				var index = store.findExact('id', v);
				return store.getAt(index).data.name;
			}
			return v;
		},
		zjbd_date : function(v) {
			if (v) {
				return Ext.Date.format(v, 'Y-m-d');
			}
			return v;
		},
		tx_date : function(v) {
			if (v) {
				return Ext.Date.format(v, 'Y-m-d');
			}
			return v;
		},
		e_date : function(v) {
			if (v) {
				return Ext.Date.format(v, 'Y-m-d');
			}
			return v;
		},
		p : function(v) {
			if (v) {
				var store = Ext.data.StoreManager
						.lookup('Zixweb.store.component.Product');
				var index = store.findExact('id', v);
				return store.getAt(index).data.name;
			}
			return v;
		},
		bi : function(v) {
			if (v) {
				var store = Ext.data.StoreManager
						.lookup('Zixweb.store.component.Bi');
				var index = store.findExact('id', v);
				return store.getAt(index).data.name;
			}
			return v;
		}
	},
	editors : {
		cust_proto : "Ext.createByAlias('widget.textfield', {submitValue : false})",
		acct : "Ext.createByAlias('widget.acct', {submitValue : false})",
		bfj_acct : "Ext.createByAlias('widget.bfjacct', {submitValue : false})",
		zyzj_acct : "Ext.createByAlias('widget.zyzjacct', {submitValue : false})",
		zjbd_type : "Ext.createByAlias('widget.zjbdtype', {submitValue : false})",
		wlzj_type : "Ext.createByAlias('widget.wlzjtype', {submitValue : false})",
		zjbd_date : "Ext.createByAlias('widget.datefield', {submitValue : false, format : 'Y-m-d'})",
		tx_date : "Ext.createByAlias('widget.datefield', {submitValue : false, format : 'Y-m-d'})",
		e_date : "Ext.createByAlias('widget.datefield', {submitValue : false, format : 'Y-m-d'})",
		fp : "Ext.createByAlias('widget.textfield', {submitValue : false})",
		c : "Ext.createByAlias('widget.textfield', {submitValue : false})",
		p : "Ext.createByAlias('widget.product', {submitValue : false})",
		bi : "Ext.createByAlias('widget.bi', {submitValue : false})",
		amt : "Ext.createByAlias('widget.textfield', {submitValue : false, vtype : 'money'})"
	},
	names : {
		cust_proto : '客户协议编号',
		acct : '银行账户号及开户行',
		bfj_acct : '备付金银行账号',
		zyzj_acct : '自有资金银行账号',
		zjbd_type : '资金变动类型',
		wlzj_type : '往来类型',
		zjbd_date : '银行出入账日期',
		tx_date : '交易日期',
		e_date : '差错日期',
		fp : '周期确认规则',
		c : '客户编号',
		p : '产品类型',
		bi : '银行接口编号',
		amt : '金额'
	},
	hearders : {
		'1' : "{source : {zyzj_acct : '',zjbd_type : '',zjbd_date : '',amt : ''},book_name : '应付银行-已核应付银行款'}",
		'2' : "{source : {zyzj_acct : '',zjbd_type : '',zjbd_date : '',amt : ''},book_name : '应收银行-已核应收银行款'}",
		'3' : "{source : {bfj_acct : '',zjbd_type : '',zjbd_date : '',amt : ''},book_name : '应付银行-已核应付银行手续费'}",
		'4' : "{source : {bfj_acct : '',zjbd_type : '',zjbd_date : '',amt : ''},book_name : '应收银行-已核应收银行手续费'}",
		'5' : "{source : {c : '',amt : ''},book_name : '客户备付金-备付金'}",
		'6' : "{source : {bfj_acct : '',zjbd_type : '',e_date : '',amt : ''},book_name : '应付账款-银行-备份金银行长款'}",
		'7' : "{source : {zyzj_acct : '',e_date : '',amt : ''},book_name : '应付账款-银行-自有资金银行长款'}",
		'8' : "{source : {bi : '',tx_date : '',amt : ''},book_name : '应付账款-银行-财务外付银行手续费'}",
		'9' : "{source : {bfj_acct : '',zjbd_type : '',e_date : '',amt : ''},'book_name' : '应收账款-银行-备付金银行短款'}",
		'10' : "{source : {zyzj_acct : '',e_date : '',amt : ''},book_name : '应收账款-银行-自有资金银行短款'}",
		'11' : "{source : {c : '',cust_proto : '',tx_date : '',amt : ''},book_name : '应收账款-客户-定期划付客户手续费'}",
		'12' : "{source : {c : '',bi : '',p : '',amt : ''},book_name : '成本-银行手续费支出'}",
		'13' : "{source : {p : '',amt : ''},book_name : '成本-垫付损失'}",
		'14' : "{source : {bfj_acct : '',amt : ''},'book_name' : '银行存款-备付金存款'}",
		'15' : "{source : {zyzj_acct : '',amt : ''},'book_name' : '银行存款-自有资金存款'}",
		'16' : "{source : {acct : '',amt : '},book_name: '财务费用-金融机构手续费'}",
		'17' : "{source : {c : '',p : '',amt : ''},book_name : '收入-客户手续费收入'}",
		'18' : "{source : {acct : '',amt : ''},book_name : '财务费用-账户利息收入'}",
		'19' : "{source : {bi : '',tx_date : '',amt : ''},book_name : '应收银行-待勾兑应收交易款'}",
		'20' : "{source : {bi : '',tx_date : '',amt : ''},book_name : '其他应付款-待确认交易款'}",
		'21' : "{source : {bfj_acct : '',zjbd_type : '',zjbd_date : '',amt : ''},book_name : '应付银行-已核应付交易款'}",
		'22' : "{source : {bfj_acct : '',zjbd_type : '',zjbd_date : '',amt : ''},book_name : '应收银行-已核应收交易款'}",
		'23' : "{source : {amt : ''},book_name : '往来-应付备付'}",
		'24' : "{source : {amt : ''},book_name : '往来-应付自有'}",
		'25' : "{source : {amt : ''},book_name : '往来-应收备付'}",
		'26' : "{source : {amt : ''},book_name : '往来-应收自有'}",
		'27' : "{source : {c : '',cust_proto : '',tx_date : '',amt : ''},book_name : '应收账款-客户-分润方承担品牌费'}",
		'28' : "{source : {bi : '',tx_date : '',amt : ''},book_name : '其他应收款-待确认交易款'}",
		'29' : "{source : {bi : '',tx_date : '',amt : ''},book_name : '应付银行-待确认应付交易款'}",
		'30' : "{source : {c : '',p : '',bi : '',fp : '',tx_date : '',amt : ''},book_name : '应付账款-银行-暂估周期确认银行手续费'}",
		'31' : "{source : {bi : '',fp : '',tx_date : '',amt : ''},book_name : '应付账款-银行-周期确认银行手续费'}",
		'32' : "{source : {c : '',p : '',bi : '',fp : '',tx_date : '',amt : ''},book_name : '成本-暂估银行手续费'}",
		'33' : "{source : {c : '',p : '',amt : ''},book_name : '内部收入'}",
		'34' : "{source : {c : '',p : '',amt : ''},book_name : '内部成本'}"
	},
	initComponent : function() {
		var form = this;
		this.fields = [];
		this.deleted = [];
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
								id : 'pzlritztzjbook',
								submitValue : false,
								fieldLabel : '借方科目'
							}, {
								xtype : 'books',
								width : 490,
								submitValue : false,
								fieldLabel : '贷方科目',
								id : 'pzlritztzdbook'
							}]

				}, {
					xtype : 'fieldcontainer',
					layout : 'hbox',
					items : [{
						xtype : 'button',
						text : '添加',
						margin : '0 20 0 0',
						handler : function(button) {
							var j = Ext.getCmp('pzlritztzjbook').getValue();
							var d = Ext.getCmp('pzlritztzdbook').getValue();
							if (!j || !d) {
								return;
							}
							var j_options = Ext.decode(form.hearders[j]);
							var d_options = Ext.decode(form.hearders[d]);
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
										clicksToEdit : 2,
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
										clicksToEdit : 2,
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
											console.log('before result:' + v);
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
													url : '/pzlr/i0000',
													params : {
														data : Ext.JSON
																.encode(sendData)
													},
													success : function(form,
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
																			Ext
																					.getCmp('center_i0000')
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
										})
							}
						}

					}]

				}];
		this.check = function() {
			var fields = this.fields;
			var deleted = this.deleted;
			var data = {};
			var empty = true;

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
				if (parseFloat(jbook.amt) != parseFloat(dbook.amt)) {
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
						data[fl]["j_book"][f] = parseInt(parseFloat(jbook[f])
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
						data[fl]["d_book"][f] = parseInt(parseFloat(dbook[f])
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