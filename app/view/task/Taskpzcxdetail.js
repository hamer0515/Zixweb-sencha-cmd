Ext.define('Zixweb.view.task.Taskpzcxdetail', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.taskpzcxdetail',
	disableSelection : true,
	hideHeaders : true,

	plugins : [{
		ptype : 'rowexpander',
		pluginId : 'rowexpander',
		expandOnEnter : false,
		expandOnDblClick : false,
		selectRowOnExpand : true,
		rowBodyTpl : new Ext.XTemplate(
				'<tpl if="isverify">',
				"<table id='taskpzcx_{shid}' width='95%' border='0' cellspacing='1' cellpadding='0' align='center' bgcolor='#C8DCF0' class='live_1_table'>",
				'<tr bgcolor="#B4CFCF" align="center">',
				'<td class="ice_one" width="25%">审核编号</td>',
				'<td class="ice_two" width="25%">{shid}</td>',
				'<td class="ice_one" width="25%">审核状态</td>',
				'<td class="ice_two" width="25%">{shstatus:this.shstatus()}</td>',
				'</tr>',
				'<tr bgcolor="#B4CFCF" align="center">',
				'<td class="ice_one" width="25%">审核类型</td>',
				'<td class="ice_two" width="25%">{shtype:this.shtype()}</td>',
				'<td class="ice_one" width="25%">会计期间</td>',
				'<td class="ice_two" width="25%">{period}</td>',
				'</tr>',
				'<tr bgcolor="#B4CFCF" align="center">',
				'<td class="ice_one" width="25%">创建人</td>',
				'<td class="ice_two" width="25%">{c_user}</td>',
				'<td class="ice_one" width="25%">创建时间</td>',
				'<td class="ice_two" width="25%">{ts_c}</td>',
				'</tr>',
				'<tr bgcolor="#B4CFCF" align="center">',
				'<td class="ice_one" width="25%">审核人</td>',
				'<td class="ice_two" width="25%">{v_user}</td>',
				'<td class="ice_one" width="25%">审核时间</td>',
				'<td class="ice_two" width="25%">{v_ts}</td>',
				'</tr>',
				'<tr>',
				'<td class="ice_one">凭证撤销原因</td>',
				'<td class="ice_two" colspan="3">',
				'<textarea rows="2" class="textarea" disabled="true">{revoke_cause}</textarea>',
				'</td>',
				'</tr>',
				'<tpl if="this.isRdonly(rdonly)">',
				'<tpl if="shstatus == 0">',
				'<tr bgcolor="#B4CFCF" align="center">',
				'<td class="ice_one-0" width="100%" colspan="4">',
				'<input type="button" id="taskpzcxdetail_pass_{shid}" value="通过" />',
				'<input type="button" id="taskpzcxdetail_deny_{shid}" value="拒绝" />',
				'</td></tr>',
				'</tpl></tpl>',
				'</table>',
				'</tpl>',
				'<tpl if="isdetail">',
				'<input type="hidden" value="{ys_id}" id="ys_id">',
				'<input type="hidden" value="{ys_type}" id="ys_type">',
				'<input type="hidden" value="{period}" id="period">',
				"<table width='95%' border='0' cellspacing='1' cellpadding='0' align='center' bgcolor='#C8DCF0' class='live_1_table'>",
				'<tpl for="properties">',
				'<tpl if="xindex%2 == 1"><tr bgcolor="#B4CFCF" align="center"></tpl>',
				'<td class="ice_one" width="250px">{key}</td><td class="ice_two" width="350px">{value}</td>',
				'<tpl if="xindex%2 == 1"><tpl if="xindex == xcount"><td class="ice_one" ></td><td class="ice_two"></td></tpl></tpl>',
				'<tpl if="xindex%2 == 0">',
				'</tr></tpl>',
				'</tpl>',
				"<tpl if='ys_type === \"0000\"'>",
				'<tr>',
				'<td class="ice_one">原始凭证填写原因</td>',
				'<td class="ice_two" colspan="3">',
				'<textarea rows="2" class="textarea" disabled="true">{cause}</textarea>',
				'</td>',
				'</tr>',
				'</tpl>',
				"<tpl if='ys_type != \"0000\"'>",
				'<tr>',
				'<td class="ice_one">说明</td>',
				'<td class="ice_two" colspan="3">',
				'<textarea rows="2" class="textarea" disabled="true">{memo}</textarea>',
				'</td>',
				'</tr>',
				'</tpl>',
				'<tr>',
				'<td class="ice_one">撤销原因</td>',
				'<td class="ice_two" colspan="3">',
				'<textarea rows="2" class="textarea" disabled="true">{revoke_cause}</textarea>',
				'</td>',
				'</tr>',
				'</table>',
				'</tpl>',
				'<tpl if="!isdetail">',
				"<table width='500' border='0' cellspacing='1' cellpadding='0' align='center' bgcolor='#C8DCF0' class='live_1_table' style='float:left'>",
				'<tpl for="j_book">',
				'<tpl if="xindex === 1">',
				"<tr bgcolor='#ffffff' align='center' class='live_1_table_tr'>",
				"<td colspan='3' class='ice_one1'>{key}:{value}</td>",
				"</tr>",
				"<tr bgcolor='#e3f1f1' align='center'>",
				"<td colspan='2' >核算项</td><td  width='100px'>金额</td>",
				"</tr>",
				'<tpl if="xindex === 1">',
				'<tpl if="xcount === xindex">',
				"<tr  bgcolor='#ffffff'  align='center' >",
				"<td  width='180px'></td>",
				"<td  width='320px'></td>",
				"<td  rowspan={[xcount]}>{parent.j_amt}</td>",
				"</tr>",
				'</tpl>',
				'</tpl>',
				'</tpl>',
				'<tpl if="xindex === 2">',
				"<tr  bgcolor='#ffffff'  align='center' >",
				"<td  width='180px'>{key}</td>",
				"<td  width='320px'>{value}</td>",
				"<td  rowspan={[xcount]}>{parent.j_amt}</td>",
				"</tr>",
				'</tpl>',
				'<tpl if="xindex &gt; 2">',
				"<tr  bgcolor='#ffffff'  align='center' >",
				"<td  width='180px'>{key}</td>",
				"<td  width='320px'>{value}</td>",
				"</tr>",
				'</tpl>',
				'</tpl>',
				"</table>",
				"<table width='500' border='0' cellspacing='1' cellpadding='0' align='center' bgcolor='#C8DCF0' class='live_1_table' style='float:right'>",
				'<tpl for="d_book">',
				'<tpl if="xindex === 1">',
				"<tr bgcolor='#ffffff' align='center' class='live_1_table_tr'>",
				"<td colspan='3' class='ice_one1'>{key}:{value}</td>", "</tr>",
				"<tr bgcolor='#e3f1f1' align='center'>",
				"<td colspan='2' >核算项</td><td  width='100px'>金额</td>", "</tr>",
				'<tpl if="xindex === 1">', '<tpl if="xcount === xindex">',
				"<tr  bgcolor='#ffffff'  align='center' >",
				"<td  width='180px'></td>", "<td  width='320px'></td>",
				"<td  rowspan={[xcount]}>{parent.d_amt}</td>", "</tr>",
				'</tpl>', '</tpl>', '</tpl>', '<tpl if="xindex === 2">',
				"<tr  bgcolor='#ffffff'  align='center' >",
				"<td  width='180px'>{key}</td>",
				"<td  width='320px'>{value}</td>",
				"<td  rowspan={[xcount]}>{parent.d_amt}</td>", "</tr>",
				'</tpl>', '<tpl if="xindex &gt; 2">',
				"<tr  bgcolor='#ffffff'  align='center' >",
				"<td  width='180px'>{key}</td>",
				"<td  width='320px'>{value}</td>", "</tr>", '</tpl>', '</tpl>',
				"</table>", '</tpl>', {
					isRdonly : function(rdonly) {
						return rdonly !== 'rdonly';
					},
					shstatus : function(value) {
						var text = ['待审核', '审核通过', '审核未通过']
						return text[value];
					},
					shtype : function(value) {
						var text = ['特种调账单', '凭证撤销'];
						return text[parseInt(value) - 1];
					}
				})
	}],
	initComponent : function() {
		var grid = this;
		var store = new Ext.data.Store({
			fields : ['title', 'ys_type', 'cause', 'memo', 'revoke_flag',
					'revoke_cause', 'period', 'ys_id', 'properties', 'j_book',
					'd_book', 'isdetail', 'j_amt', 'd_amt', 'isverify',
					'c_user', 'shid', 'shstatus', 'shtype', 'ts_c', 'v_ts',
					'v_user', 'rdonly'],
			proxy : {
				type : 'ajax',
				url : 'taskpzcx/detail'
			},
			listeners : {
				load : function(me, records, successful, eOpts) {
					var expander = grid.getPlugin('rowexpander');
					for (i = 0; i < grid.getStore().getCount(); i++) {
						expander.toggleRow(i, grid.getStore().getAt(i));
					}
					// button注册事件
					var id = 'taskpzcx_' + records[0].data.shid;
					var tbl = Ext.get(id);
					var buttons = tbl.select("input[type=button]");
					for (var i in buttons.elements) {
						var button = Ext.get(buttons.elements[i]
								.getAttribute('id'));
						button.on('click', function(e, me, eOpts) {
							var arr = me.getAttribute('id').split('_');
							var id = arr.pop();
							var type = arr.pop();
							if (type === 'pass') {
								Ext.MessageBox.confirm('提示', '执行审核通过?',
										function(opt) {
											if (opt === 'yes') {
												Ext.Ajax.request({
													async : false,
													url : 'taskpzcx/pass',
													params : {
														id : id
													},
													success : function(response) {
														var res = Ext
																.decode(response.responseText);
														if (res.success) {
															Ext.MessageBox
																	.show({
																		title : '提示',
																		msg : '操作成功',
																		closable : false,
																		buttons : Ext.Msg.YES,
																		icon : Ext.Msg.INFO
																	});
															store.reload();
														} else {
															Ext.MessageBox
																	.show({
																		title : '错误',
																		msg : res.msg,
																		buttons : Ext.Msg.YES,
																		icon : Ext.Msg.ERROR
																	});
														}
													}
												});
											}
										});
							} else if (type === 'deny') {
								Ext.MessageBox.confirm('提示', '执行审核拒绝?',
										function(opt) {
											if (opt === 'yes') {
												Ext.Ajax.request({
													async : false,
													url : 'taskpzcx/deny',
													params : {
														id : id
													},
													success : function(response) {
														var res = Ext
																.decode(response.responseText);
														if (res.success) {
															Ext.MessageBox
																	.show({
																		title : '提示',
																		msg : '操作成功',
																		closable : false,
																		buttons : Ext.Msg.YES,
																		icon : Ext.Msg.INFO
																	});
															store.reload();
														} else {
															Ext.MessageBox
																	.show({
																		title : '错误',
																		msg : res.msg,
																		buttons : Ext.Msg.YES,
																		icon : Ext.Msg.ERROR
																	});
														}
													}
												});
											}
										});
							}
						});
					}
				}
			}
		});
		grid.store = store;
		grid.columns = [{
					text : "标题",
					dataIndex : 'title',
					width : '100%',
					sortable : false
				}];
		grid.callParent(arguments);
	}
});