Ext.define('Zixweb.view.zjdz.qddetail', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.zjdzqddetail',
	border : false,

	initComponent : function() {
		var qddetail = this;
		var tpl = new Ext.XTemplate(
				'<tpl for=".">'	,
				'<table width="98%" id="zjdzqd_{f_ch}_{zjbd_date}" border="0" cellspacing="1" cellpadding="0" align="center"  bgcolor="#C8DCF0" class="live_1_table">',
				'<tr align="center" class="ice_one_td" >',
				'<td width="15%" colspan="1">',
				'电话充值业务</td>',
				'<td width="15%" colspan="1">',
				'资金变动日期： {zjbd_date}</td>',
				'<td width="15%" colspan="1">渠道方编号：',
				'{fch_name}</td><td ></td></tr>',
				'<tr align="center" class="live_1_table_tr" >',
				 '<td >会计科目</td>', '<td >借方 </td>',
				'<td >贷方 </td>','<td >操作 </td>', '</tr>',
				'{[this.gentrs(values)]}', '</table>', '</tpl>', { 
					gentrs : function(json) {
						var data = '';
						var num = 1;
						for (var i = 0; i < json.l; i++) {
							var key = json.t_ids[i];
							var row = json.data[key];
							var j_amt = row[0] ;
							var d_amt = row[1] ;
							data += '<tr bgcolor="#ffffff" align="center">';
							
							data += '<td rowspan="1" width="15%" >预付账款-渠道方</td>';
									
							data += '<td width="15%" class="ice_one_data"><font id="j_amt'
									+ num++
									+ '">'
									+ j_amt
									+ '</font></td>'
									+ '<td width="15%"class="ice_one_data"><font id="d_amt'
									+ num++ + '">' + d_amt
									+ '</font></td>'
									+ '<td width="15%" colspan="1"><input type="button" id="bookdetailButton" value="详情"  /></td>'
									+ '</tr>';
						}
						if (json.real_ch_amt == '') {
							json.real_ch_amt = '0.00'
						}
						for (var i in json.ch_qd) {
							if (i == 0) {
								data += '<tr id="row7" class="live_1_table_tr"><td width="15%" colspan="5">'
										+ json.ch_qd[i] + '</td></tr>';
								continue;
							}
							if (i == 3) {
							    data += '<tr class="ice_one_td" id="real_ch"><td width="15%" colspan="2" >'
								+ json.ch_qd[i]
								+ '</td>'
								+ '<td width="15%" colspan="3" class="ice_one_data"><input type="text" id="real_ch_amt" value="'
								+ json.real_ch_amt
								+ '" name="real_ch_amt"/></td></tr>';
								continue;
						    }
							data += '<tr id="row7" class="ice_one_td">'
									+ '<td width="15%" colspan="2">'
									+ json.ch_qd[i]
									+ '</td>'
									+ '<td width="15%" colspan="3" class="ice_one_data"><font class="specword">'
									+ json.data[json.ch_qd[i]]
									+ '</font></td></tr>';
						}
						
						data += '<tr bgcolor="white"><td colspan="5">'
								+ '<input type="submit" id="checkbtn" value="计算长短款"/>'
								+ '<input type="button" id="checkdonebtn" value="对账完成"  /></td></tr>';
						return data;
					}
				});
		var store = new Ext.data.Store({
			fields : ['f_ch', 'fch_name', 'zjbd_date', 'l', 
					'real_ch_amt', 't_ids', 'data', 'ch_qd'],
			proxy : {
				type : 'ajax',
				url : 'zjdz/qdcheck'
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
					// 科目详细信息事件
					var bookdetailButton = Ext.get('bookdetailButton');
					if (bookdetailButton) {
						bookdetailButton.on('click', function(e, btn, eOpts) {
							var bfj_id = records[0].data.f_ch;
							var viewport = qddetail.up('viewport'), center = viewport
									.down('center'), id = 'book_hist_yufamt_ch_fhyd',   
								    cmp = Ext.getCmp(id), panel;
							if (!cmp) {
								cmp = Ext.widget('book_hist_yufamt_ch_fhyd');
								panel = center.add({
											closable : true,
											xtype : 'panel',
											items : cmp,
											id : id,
											title : '渠道方科目明细查询'
										});

							}
							if (cmp) {
								center.setActiveTab(cmp);
							}
							cmp.down('form').getForm().reset();
							cmp.down("datefield[name='period_from']").setValue(records[0].data.zjbd_date);
							cmp.down("datefield[name='period_to']").setValue(records[0].data.zjbd_date);
							cmp.down("fch[name='fch']").setValue(records[0].data.f_ch);
							cmp.down("gridpanel").store.loadPage(1);
										
							if (panel) {
								panel.show();
							} else {
								center.setActiveTab(cmp);
							}
						}, self);
					}
					
					// input注册事件
					var id = 'zjdzqd_' + records[0].data.f_ch + '_'
							+ records[0].data.zjbd_date;
					var tbl = Ext.get(id);
					var fields = tbl.select("input[type=text]");
					for (var i in fields.elements) {
						var field = Ext.get(fields.elements[i]
								.getAttribute('id'));
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
							var id = 'zjdzqd_' + records[0].data.f_ch + '_' + records[0].data.zjbd_date;
							var tbl = Ext.get(id);
							var fields = tbl.select("input[type=text]");
							var mydata = {};
							for (var i in fields.elements) {
								var field = fields.elements[i];
								var key = field.getAttribute('name');
								var value = field.value;
								mydata[key] = value;
							}
							mydata.zjbd_date = records[0].data.zjbd_date;
							mydata.f_ch = records[0].data.f_ch;
							store.load({
										params : mydata
									});
							}, self);
					}
					// 注册对账完成事件
					var checkdonebtn = Ext.get('checkdonebtn');
					if (checkdonebtn) {
						checkdonebtn.on('click', function(e, btn, eOpts) {
							var real_ch_amt = Ext.get('real_ch_amt')
									.getValue().replace(',', '', 'g');
							var ch_pre_amt = records[0].data.data[records[0].data.ch_qd[2]]
									.replace(',', '', 'g');
							var lc_amt = records[0].data.data[records[0].data.ch_qd[4]]
									.replace(',', '', 'g');
							var sc_amt = records[0].data.data[records[0].data.ch_qd[5]]
									.replace(',', '', 'g');
							if (parseFloat(real_ch_amt) != (parseFloat(ch_pre_amt) + parseFloat(lc_amt) - parseFloat(sc_amt))) {
								Ext.MessageBox.alert('警告', '实际余额不正确，请重新计算长短款。');
								return;
							}
							var id = 'zjdzqd_' + records[0].data.f_ch + '_'
									+ records[0].data.zjbd_date;
							var tbl = Ext.get(id);
							var data = records[0].data;
							
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

											data.zjbd_date = records[0].data.zjbd_date;
											data.f_ch = records[0].data.f_ch;
											Ext.Ajax.request({
												async : false,
												url : 'zjdz/qdcheckdone',
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
																			.getCmp('zjdz_qd_detail')
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
