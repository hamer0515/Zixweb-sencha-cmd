Ext.define('Zixweb.view.zjdz.bfjdetail', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.zjdzbfjdetail',
	border : false,

	initComponent : function() {
		var bfjdetail = this;
		var tpl = new Ext.XTemplate(
				'<tpl for=".">',
				'<table width="98%" id="zjdzbfj_{acct_id}_{zjbd_date}" border="0" cellspacing="1" cellpadding="0" align="center"  bgcolor="#C8DCF0" class="live_1_table">',
				'<tr align="center" class="ice_one_td" >',
				'<td width="15%" colspan="1">',
				'资金变动日期： {zjbd_date}',
				'<td width="15%" colspan="2">银行账户：',
				'{b_acct}</td>',
				'</td><td width="15%" colspan="2"><input type="button" id="remarkButton" value="备注信息"  /></td></tr>',
				'<tr align="center" class="live_1_table_tr" >',
				'<td width="10%">资金变动类型</td>', '<td >科目</td>', '<td >借方 </td>',
				'<td >贷方 </td>', '<td width="20%">备注</td>', '</tr>',
				'{[this.gentrs(values)]}', '</table>', '</tpl>', {
					gentrs : function(json) {
						var data = '';
						var num = 1;
						for (var i = 0; i <= json.l; i++) {
							var key = json.t_ids[i];
							var row = json.data[key];
							data += '<tr bgcolor="#ffffff" align="center">';
							if (key === '未知入款') {
								var wzckamt = json.data['未知入款'].ch_j || '0.00';
								data += '<td rowspan="3" width="10%" >'
										+ '未知入款' + '</td>';
								data += '<tr class="ice_one_td">'
										+ '<td width="15%">银行存款变化</td>'
										+ '<td width="15%" class="ice_one_data">';

								data += '<input type="text"  id="j_amt_c_'
										+ num + '" name="未知入款_j" value="'
										+ wzckamt + '' + '"/>';

								data += '</td><td width="15%" class="ice_one_data">';

								data += '<input type="text" disabled="true" id="d_amt_c_'
										+ num++
										+ '" name="未知入款_d" value="0.00"/>';

								data += '</td><td rowspan="2" width="20%"  >'
										+ '<textarea rows="2" id="memo_c_'
										+ i
										+ '" name="未知入款_memo" style=" height:100%;">'
										+ json.data[key].memo
										+ '</textarea></td>';

								data += '</tr>'
										+ '<tr class="ice_one_td">'
										+ '<td width="15%">银行长款</td>'
										+ '<td width="15%" class="ice_one_data">'
										+ json.data['未知入款'].lc[0]
										+ '</td><td width="15%" class="ice_one_data">'
										+ json.data['未知入款'].lc[1]
										+ '</td></tr>';
								continue;
							}
							if (key === '未知出款') {
								var wzdkamt = json.data['未知出款'].ch_d || '0.00';

								data += '<td rowspan="3" width="10%" class="ice_one_td">'
										+ '未知出款' + '</td>';
								data += '<tr class="ice_one_td">'
										+ '<td width="15%">银行存款变化</td>'
										+ '<td width="15%" class="ice_one_data">';

								data += '<input type="text" disabled="true" id="j_amt_d_'
										+ num
										+ '" name="未知出款_j" value="0.00"/>';

								data += '</td><td width="15%" class="ice_one_data">';

								data += '<input type="text" id="d_amt_d_'
										+ num++ + '" name="未知出款_d" value="'
										+ wzdkamt + '"/>';

								data += '</td><td rowspan="2" width="20%"  >'
										+ '<textarea rows="2" id="memo_d_'
										+ i
										+ '" name="未知出款_memo" style=" height:100%;">'
										+ json.data[key].memo + '</textarea>';

								data += '</td></tr>'
										+ '<tr class="ice_one_td">'
										+ '<td width="15%">银行短款</td>'
										+ '<td width="15%" class="ice_one_data">'
										+ json.data['未知出款'].sc[0]
										+ '</td><td width="15%" class="ice_one_data">'
										+ json.data['未知出款'].sc[1]
										+ '</td></tr>';
								continue;
							}

							if (key === '其它') {
								continue;
							}

							if (key === '其它') {
								continue;
							}
							data += '<td rowspan="7" width="10%" >' + key
									+ '</td>';
							data += '<td width="15%" >应付银行-已核应付交易款</td>'
									+ '<td width="15%" class="ice_one_data"><font id="jb_yhyf_amt'
									+ num++
									+ '">'
									+ row.txamt_yhyf[0]
									+ '</font></td>'
									+ '<td width="15%"class="ice_one_data"><font id="db_yhyf_amt'
									+ num++ + '">' + row.txamt_yhyf[1]
									+ '</font></td>';
							if (key === '总计') {
								data += '<td rowspan="7" width="15%"  ></td>';
							} else {

								data += '<td rowspan="7" width="20%"  >'
										+ '<textarea  rows="8" id="memo_' + i
										+ '" name="' + key
										+ '_memo" style=" height:100%;">'
										+ json.data[key].memo
										+ '</textarea></td>';
							}

							data += '</tr>'
									+ '<tr class="ice_one_td" >'
									+ '<td width="15%" >应付银行-已核应付银行手续费</td>'
									+ '<td width="15%" class="ice_one_data"><font id="jf_yhyf_amt'
									+ num++
									+ '">'
									+ row.bfee_yhyf[0]
									+ '</font></td>'
									+ '<td width="15%" class="ice_one_data" ><font id="df_yhyf_amt'
									+ num++
									+ '">'
									+ row.bfee_yhyf[1]
									+ '</font></td></tr>'
									+ '<tr class="ice_one_td" >'
									+ '<td width="15%" >应收银行-已核应收交易款</td>'
									+ '<td width="15%" class="ice_one_data"><font id="jb_yhys_amt'
									+ num++
									+ '">'
									+ row.txamt_yhys[0]
									+ '</font></td>'
									+ '<td width="15%" class="ice_one_data"><font id="db_yhys_amt'
									+ num++
									+ '">'
									+ row.txamt_yhys[1]
									+ '</font></td></tr>'
									+ '<tr class="ice_one_td" >'
									+ '<td width="15%" >应收银行-已核应收银行手续费</td>'
									+ '<td width="15%" class="ice_one_data"><font id="jf_yhys_amt'
									+ num++
									+ '">'
									+ row.bfee_yhys[0]
									+ '</font></td>'
									+ '<td width="15%" class="ice_one_data"><font id="df_yhys_amt'
									+ num++ + '">' + row.bfee_yhys[1]
									+ '</font></td></tr>'
									+ '<tr class="ice_one_td">'
									+ '<td width="15%">银行存款变化</td>'
									+ '<td width="15%" class="ice_one_data">';

							if (i != json.l) {
								data += '<input type="text" id="j_amt_c_' + num
										+ '" name="' + key + '_j" value="'
										+ row.ch_j + '"/>';
							} else {
								if (key === '总计') {
									data += '<font class="specword">'
											+ row.ch_j + '</font>';
								} else {
									data += row.ch_j;
								}
							}
							data += '</td><td width="15%" class="ice_one_data">';
							if (i != json.l) {
								data += '<input type="text" id="d_amt_c_'
										+ num++ + '" name="' + key
										+ '_d" value="' + row.ch_d + '"/>';
							} else {
								if (key === '总计') {
									data += '<font class="specword">'
											+ row.ch_d + '</font>';
								} else {
									data += row.ch_d;
								}
							}
							data += '</td></tr>'
									+ '<tr class="ice_one_td">'
									+ '<td width="15%">银行短款</td>'
									+ '<td width="15%" class="ice_one_data">'
									+ row.sc[0]
									+ '</td><td width="15%" class="ice_one_data">'
									+ row.sc[1]
									+ '</td></tr><tr class="ice_one_td"><td width="15%">银行长款</td><td width="15%" class="ice_one_data">'
									+ row.lc[0]
									+ '</td><td width="15%" class="ice_one_data">'
									+ row.lc[1] + '</td></tr>';
						}

						for (var i in json.ch_bank) {
							if (i == 0) {
								data += '<tr id="row7" class="live_1_table_tr"><td width="15%" colspan="5">'
										+ json.ch_bank[i] + '</td></tr>';
								continue;
							}
							data += '<tr id="row7" class="ice_one_td">'
									+ '<td width="15%" colspan="2">'
									+ json.ch_bank[i]
									+ '</td>'
									+ '<td width="15%" colspan="3" class="ice_one_data"><font class="specword">'
									+ json.data[json.ch_bank[i]]
									+ '</font></td></tr>';
						}
						if (json.real_bank_ch == '') {
							json.real_bank_ch = '0.00'
						}
						data += '<tr class="ice_one_td" id="real_bank"><td width="15%" colspan="2" >'
								+ json.zjbd_date
								+ '实际存款余额</td>'
								+ '<td width="15%" colspan="3" class="ice_one_data"><input type="text" id="real_bank_ch" value="'
								+ json.real_bank_ch
								+ '" name="real_bank_ch"/></td></tr>';
						data += '<tr bgcolor="white"><td colspan="5">'
								+ '<input type="submit" id="checkbtn" value="计算长短款"/>'
								+ '<input type="button" id="checkdonebtn" value="对账完成"  /></td></tr>';
						return data;
					}
				});
		var store = new Ext.data.Store({
			fields : ['acct_id', 'b_acct', 'zjbd_date', 'l', 'records',
					'real_bank_ch', 't_ids', 'data', 'ch_bank'],
			proxy : {
				type : 'ajax',
				url : 'zjdz/bfjcheck'
			},
			listeners : {
				load : function(me, records, successful, eOpts) {
					if (!successful) {
						Ext.MessageBox.show({
									title : '警告',
									msg : '对账详细数据加载失败,请联系管理员',
									buttons : Ext.Msg.YES,
									icon : Ext.Msg.ERROR
								});
						return;
					}
					var jsonData = me.proxy.reader.jsonData.success;
					if (jsonData && jsonData === 'forbidden') {
						Ext.MessageBox.show({
									title : '警告',
									msg : '抱歉，没有对账详细数据访问权限',
									buttons : Ext.Msg.YES,
									icon : Ext.Msg.ERROR
								});
						return;
					}
					// 注册备注信息事件
					var remarkButton = Ext.get('remarkButton');
					if (remarkButton) {
						remarkButton.on('click', function(e, btn, eOpts) {
							var bfj_id = records[0].data.acct_id;
							var viewport = bfjdetail.up('viewport'), center = viewport
									.down('center'), id = 'bfjacctmemo_'
									+ bfj_id, cmp = Ext.getCmp(id), panel;
							if (!cmp) {
								cmp = Ext.widget('bfjacctmemo', {
											bfj_id : bfj_id
										});
								panel = center.add({
											closable : true,
											xtype : 'panel',
											items : cmp,
											id : id,
											title : records[0].data.b_acct
													+ '账户信息显示'
										});

							}
							if (panel) {
								panel.show();
							} else {
								center.setActiveTab(cmp);
							}
						}, self);
					}

					// input注册事件
					var id = 'zjdzbfj_' + records[0].data.acct_id + '_'
							+ records[0].data.zjbd_date;
					var tbl = Ext.get(id);
					var fields = tbl.select("input[type=text]");
					for (var i in fields.elements) {
						var field = Ext.get(fields.elements[i]
								.getAttribute('id'));
						field.on('click', function(e, t, eOpts) {
									var id = t.getAttribute('id');
									var t = id.split('_');
									var type = t.shift();
									if (type === 'j') {
										t.unshift('d');
										var d_id = t.join('_');
										var field = Ext.getDom(d_id);
										if (field.value !== '0.00') {
											Ext.MessageBox.confirm('提示',
													'清空贷方金额', function(opt) {
														if (opt === 'yes') {
															field.value = '0.00';
															Ext.getDom(id)
																	.focus();
														}
													});
										}
									} else if (type === 'd') {
										t.unshift('j');
										var j_id = t.join('_');
										var field = Ext.getDom(j_id);
										if (field.value !== '0.00') {
											Ext.MessageBox.confirm('提示',
													'清空借方金额', function(opt) {
														if (opt === 'yes') {
															field.value = '0.00';
															Ext.getDom(id)
																	.focus();
														}
													});
										}
									}
								});
						field.on('blur', function(e, t, eOpts) {
									var value = t.value.replace(',', '', 'g')
											.trim();
									if (!/^(-)?(([1-9]{1}\d*)|([0]{1}))(\.\d+)?$/
											.exec(value)) {
										value = 0;
									}
									t.value = Ext.util.Format.number(value,
											'0,0.00');
								});
					}
					// 注册计算长短款事件
					var checkbtn = Ext.get('checkbtn');
					if (checkbtn) {
						checkbtn.on('click', function(e, btn, eOpts) {
							var id = 'zjdzbfj_' + records[0].data.acct_id + '_'
									+ records[0].data.zjbd_date;
							var tbl = Ext.get(id);
							var fields = tbl.select("input[type=text]");
							var data = {};
							for (var i in fields.elements) {
								var field = fields.elements[i];
								var key = field.getAttribute('name');
								var value = field.value;
								data[key] = value;
							}
							var memos = tbl.select("textarea");
							for (var i in memos.elements) {
								var memo = memos.elements[i];
								var key = memo.getAttribute('name');
								var value = memo.value;
								data[key] = value;
							}
							data.zjbd_date = records[0].data.zjbd_date;
							data.acct_id = records[0].data.acct_id;
							// if (bfjdetail.checkjd(data)) {
							store.load({
										params : data
									});
								// }
							}, self);
					}
					// 注册对账完成事件
					var checkdonebtn = Ext.get('checkdonebtn');
					if (checkdonebtn) {
						checkdonebtn.on('click', function(e, btn, eOpts) {
							var real_ch_bank = Ext.get('real_bank_ch')
									.getValue().replace(',', '', 'g');
							var ch_bank_pre = records[0].data.data[records[0].data.ch_bank[3]]
									.replace(',', '', 'g');
							if (parseFloat(real_ch_bank) != parseFloat(ch_bank_pre)) {
								Ext.MessageBox.alert('警告', '实际银行存款变化与预期不一致');
								return;
							}
							var id = 'zjdzbfj_' + records[0].data.acct_id + '_'
									+ records[0].data.zjbd_date;
							var tbl = Ext.get(id);
							var data = records[0].data;
							for (var i in data.t_ids) {
								if (data.t_ids[i] === '总计') {
									continue;
								}
								var t_id = data.t_ids[i];
								var v = data.data[t_id];
								var j = 0, d = 0;
								// 判断长短款公式
								// txamt_yhys[0]+txamt_yhyf[0]+bfee_yhyf[0]+bfee_yhys[0]+sc[1]+lc[1]+ch_d
								var keys = ['txamt_yhys', 'txamt_yhyf',
										'bfee_yhyf', 'bfee_yhys'];
								for (var i in keys) {
									var key = keys[i];
									j += parseFloat(v[key][0].replace(',', '',
											'g'));
									d += parseFloat(v[key][1].replace(',', '',
											'g'));
								}
								var ls = ['lc', 'sc'];
								for (var i in ls) {
									var key = ls[i];
									j += parseFloat(v[key][1].replace(',', '',
											'g'));
									d += parseFloat(v[key][0].replace(',', '',
											'g'));
								}
								j += parseFloat(tbl.select("input[name=" + t_id
										+ "_d]").elements[0].value.replace(',',
										'', 'g'));
								d += parseFloat(tbl.select("input[name=" + t_id
										+ "_j]").elements[0].value.replace(',',
										'', 'g'));
								j = Ext.Number.correctFloat(j);
								d = Ext.Number.correctFloat(d);
								if (j != d) {
									Ext.MessageBox.alert('警告', '请先计算长短款');
									return;
								}
							}
							Ext.MessageBox.confirm('提示', '确定进行[对账成功]操作？',
									function(opt) {
										if (opt === 'yes') {
											var fields = tbl
													.select("input[type=text]");
											var data = {};
											for (var i in fields.elements) {
												var field = fields.elements[i];
												var key = field
														.getAttribute('name');
												var value = field.value;
												data[key] = value;
											}
											var memos = tbl.select("textarea");
											for (var i in memos.elements) {
												var memo = memos.elements[i];
												var key = memo
														.getAttribute('name');
												var value = memo.value;
												data[key] = value;
											}

											data.zjbd_date = records[0].data.zjbd_date;
											data.acct_id = records[0].data.acct_id;
											data.type = 1;
											Ext.Ajax.request({
												async : false,
												url : 'zjdz/bfjcheckdone',
												params : data,
												success : function(response) {
													valiStatus = Ext
															.decode(response.responseText).success;
													if (valiStatus) {
														if (valiStatus === 'forbidden') {
															Ext.MessageBox
																	.show({
																		title : '警告',
																		msg : '抱歉，没有对账完成操作权限',
																		buttons : Ext.Msg.YES,
																		icon : Ext.Msg.ERROR
																	});
															return;
														}
														Ext.MessageBox.alert(
																'提示', '处理成功',
																function() {
																	Ext
																			.getCmp('zjdz_bfj_detail')
																			.close();
																});
													} else {
														Ext.MessageBox.alert(
																'警告', '处理失败');
													}
												},
												failure : function(response,
														opts) {
													Ext.MessageBox.show({
														title : '警告',
														msg : '服务器端出错，错误码:'
																+ response.status,
														buttons : Ext.Msg.YES,
														icon : Ext.Msg.ERROR
													});
												}
											});
										}
									});
						}, self);
					}
				}
			}
		});
		this.store = store;
		var view = Ext.create('Ext.view.View', {
					store : store,
					tpl : tpl,
					itemSelector : 'table'
				});
		this.items = view;
		this.callParent(arguments);
	}
});
