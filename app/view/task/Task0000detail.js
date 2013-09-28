Ext.define('Zixweb.view.task.Task0000detail', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.task0000detail',
	disableSelection : true,
	hideHeaders : true,
	height : 540,
	plugins : [{
		ptype : 'rowexpander',
		pluginId : 'rowexpander',
		expandOnEnter : false,
		expandOnDblClick : false,
		selectRowOnExpand : true,
		rowBodyTpl : new Ext.XTemplate(
				'<tpl if="isdetail">',
				"<table id='task0000_{shid}' width='95%' border='0' cellspacing='1' cellpadding='0' align='center' bgcolor='#C8DCF0' class='live_1_table'>",
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
				'<td class="ice_one">原始凭证填写原因</td>',
				'<td class="ice_two" colspan="3">',
				'<textarea rows="2" class="textarea" disabled="true">{cause}</textarea>',
				'</td>',
				'</tr>',
				'<tpl if="this.isRdonly(rdonly)">',
				'<tpl if="shstatus == 0">',
				'<tr bgcolor="#B4CFCF" align="center">',
				'<td class="ice_one-0" width="100%" colspan="4">',
				'<input type="button" id="task0000detail_pass_{shid}" value="通过" />',
				'<input type="button" id="task0000detail_deny_{shid}" value="拒绝" />',
				'</td></tr>',
				'</tpl></tpl>',
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
				"<td colspan='2' >核算项</td><td width='100px'>金额</td>",
				"</tr>",
				'<tpl if="xindex === 1">',
				'<tpl if="xcount === xindex">',
				"<tr bgcolor='#ffffff' align='center' >",
				"<td width='180px'></td>",
				"<td width='320px'></td>",
				"<td rowspan={[xcount]}>{parent.j_amt}</td>",
				"</tr>",
				'</tpl>',
				'</tpl>',
				'</tpl>',
				'<tpl if="xindex === 2">',
				"<tr bgcolor='#ffffff' align='center' >",
				"<td width='180px'>{key}</td>",
				"<td width='320px'>{value}</td>",
				"<td rowspan={[xcount]}>{parent.j_amt}</td>",
				"</tr>",
				'</tpl>',
				'<tpl if="xindex &gt; 2">',
				"<tr bgcolor='#ffffff' align='center' >",
				"<td width='180px'>{key}</td>",
				"<td width='320px'>{value}</td>",
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
				"<td colspan='2' >核算项</td><td width='100px'>金额</td>", "</tr>",
				'<tpl if="xindex === 1">', '<tpl if="xcount === xindex">',
				"<tr bgcolor='#ffffff' align='center' >",
				"<td width='180px'></td>", "<td width='320px'></td>",
				"<td rowspan={[xcount]}>{parent.d_amt}</td>", "</tr>",
				'</tpl>', '</tpl>', '</tpl>', '<tpl if="xindex === 2">',
				"<tr bgcolor='#ffffff' align='center' >",
				"<td width='180px'>{key}</td>",
				"<td width='320px'>{value}</td>",
				"<td rowspan={[xcount]}>{parent.d_amt}</td>", "</tr>",
				'</tpl>', '<tpl if="xindex &gt; 2">',
				"<tr bgcolor='#ffffff' align='center' >",
				"<td width='180px'>{key}</td>",
				"<td width='320px'>{value}</td>", "</tr>", '</tpl>', '</tpl>',
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
			fields : ['title', 'rdonly', 'cause', 'c_user', 'shid', 'shstatus',
					'period', 'shtype', 'properties', 'j_book', 'd_book',
					'isdetail', 'j_amt', 'd_amt', 'ts_c', 'v_ts', 'v_user'],
			proxy : {
				type : 'ajax',
				url : 'task0000/detail'
			},
			listeners : {
				load : function(thiz, records, successful, eOpts) {
					if (!successful) {
						Ext.MessageBox.show({
									title : '警告',
									msg : '凭证0000详细数据加载失败,请联系管理员',
									buttons : Ext.Msg.YES,
									icon : Ext.Msg.ERROR
								});
						return;
					}
					var jsonData = thiz.proxy.reader.jsonData.success;
					if (jsonData && jsonData === 'forbidden') {
						Ext.MessageBox.show({
									title : '警告',
									msg : '抱歉，没有凭证0000详细数据访问权限',
									buttons : Ext.Msg.YES,
									icon : Ext.Msg.ERROR
								});
						return;
					}
					var expander = grid.getPlugin('rowexpander');
					for (i = 0; i < grid.getStore().getCount(); i++) {
						expander.toggleRow(i, grid.getStore().getAt(i));
					}
					// button注册事件
					var id = 'task0000_' + records[0].data.shid;
					var tbl = Ext.get(id);
					var buttons = tbl.select("input[type=button]");
					for (var i in buttons.elements) {
						var button = Ext.get(buttons.elements[i]
								.getAttribute('id'));
						button.on('click', function(e, thiz, eOpts) {
							var arr = thiz.getAttribute('id').split('_');
							var id = arr.pop();
							var type = arr.pop();
							if (type === 'pass') {
								Ext.MessageBox.confirm('提示', '执行审核通过?',
										function(opt) {
											if (opt === 'yes') {
												Ext.Ajax.request({
													async : false,
													url : 'task0000/pass',
													params : {
														id : id
													},
													success : function(response) {
														var success = Ext
																.decode(response.responseText).success;
														if (success) {
															if (response === 'forbidden') {
																Ext.MessageBox
																		.show({
																			title : '警告',
																			msg : '抱歉，没有审核通过操作权限',
																			buttons : Ext.Msg.YES,
																			icon : Ext.Msg.ERROR
																		});
																return;
															}
															Ext.MessageBox
																	.alert(
																			'提示',
																			'操作成功');
															store.reload();
														} else {
															Ext.MessageBox
																	.alert(
																			'警告',
																			'操作失败');
														}
													},
													failure : function(
															response, opts) {
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
							} else if (type === 'deny') {
								Ext.MessageBox.confirm('提示', '执行审核拒绝?',
										function(opt) {
											if (opt === 'yes') {
												Ext.Ajax.request({
													async : false,
													url : 'task0000/deny',
													params : {
														id : id
													},
													success : function(response) {
														var success = Ext
																.decode(response.responseText).success;
														if (success) {
															if (response === 'forbidden') {
																Ext.MessageBox
																		.show({
																			title : '警告',
																			msg : '抱歉，没有审核拒绝操作权限',
																			buttons : Ext.Msg.YES,
																			icon : Ext.Msg.ERROR
																		});
																return;
															}
															Ext.MessageBox
																	.alert(
																			'提示',
																			'操作成功');
														} else {
															Ext.MessageBox
																	.alert(
																			'警告',
																			'操作失败');
														}
														store.reload();
													},
													failure : function(
															response, opts) {
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
							}
						});
					}
				}
			}
		});
		this.store = store;
		this.columns = [{
					text : "标题",
					dataIndex : 'title',
					width : '100%',
					sortable : false
				}];
		this.callParent(arguments);
	}
});