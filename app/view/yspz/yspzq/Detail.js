Ext.define('Zixweb.view.yspz.yspzq.Detail', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.yspzqdetail',
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
				'<input type="hidden" value="{ys_id}" id="ys_id">',
				'<input type="hidden" value="{ys_type}" id="ys_type">',
				'<input type="hidden" value="{period}" id="period">',
				"<table width='95%' border='0' cellspacing='1' cellpadding='0' align='center' bgcolor='#C8DCF0' class='live_1_table'>",
				'<tpl for="properties">',
				'{[this.gentrs(values)]}',
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
				"<tpl if='revoke_flag != 0'>",
				'<tr>',
				'<td class="ice_one">撤销原因</td>',
				'<td class="ice_two" colspan="3">',
				'<textarea rows="2" class="textarea" disabled="true">{revoke_cause}</textarea>',
				'</td>',
				'</tr>',
				'</tpl>',
				"<tpl if='revoke_flag == 0'>",
				'<tr><td class="ice_one-0" colspan="4">',
				'<input type="button" value="撤销" id="revoke_button"/>',
				'</td>',
				'</tr>',
				'</tpl>',
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
					gentrs : function(json) {
						var data = "";
						var xcount = json.length;
						for (var i = 0; i < xcount; i++) {
							if (json[i].value == null) {
								json[i].value = '';
							}
							var xindex = i + 1;
							if (xindex % 2 == 1) {
								data += "<tr bgcolor=\"#B4CFCF\" align=\"center\">";
							}
							data += "<td class=\"ice_one\" width=\"250px\">"
									+ json[i].key
									+ "</td><td class=\"ice_two\" width=\"350px\">"
									+ json[i].value + "</td>";
							if (xindex == xcount && xindex % 2 == 1) {
								data += "<td class=\"ice_one\" ></td><td class=\"ice_two\"></td>";
								xindex++;
							}
							if (xindex % 2 == 0) {
								data += "</tr>";
							}
						}
						return data;
					}
				})
	}],
	initComponent : function() {
		var grid = this;
		var store = new Ext.data.Store({
			fields : ['title', 'ys_type', 'cause', 'memo', 'revoke_flag',
					'revoke_cause', 'period', 'ys_id', 'properties', 'j_book',
					'd_book', 'isdetail', 'j_amt', 'd_amt'],
			proxy : {
				type : 'ajax',
				url : 'yspzq/detail'
			},
			listeners : {
				load : function(me, records, successful, eOpts) {
					if (!successful) {
						Ext.MessageBox.show({
									title : '警告',
									msg : '原始凭证详细数据加载失败,请联系管理员',
									buttons : Ext.Msg.YES,
									icon : Ext.Msg.ERROR
								});
						return;
					}
					var jsonData = me.proxy.reader.jsonData.success;
					if (jsonData && jsonData === 'forbidden') {
						Ext.MessageBox.show({
									title : '警告',
									msg : '抱歉，没有原始凭证详细数据访问权限',
									buttons : Ext.Msg.YES,
									icon : Ext.Msg.ERROR
								});
						return;
					}
					var expander = grid.getPlugin('rowexpander');
					for (i = 0; i < grid.getStore().getCount(); i++) {
						expander.toggleRow(i, grid.getStore().getAt(i));
					}
					var button = Ext.get('revoke_button');
					if (button) {
						button.on('click', function(e, btn, eOpts) {
									var ys_type = Ext.get('ys_type').getValue();
									var ys_id = Ext.get('ys_id').getValue();
									var period = Ext.get('period').getValue();
									Ext.widget('yspzrevoke_cause', {
												modal : true,
												resizable : false,
												ys_type : ys_type,
												ys_id : ys_id,
												period : period
											})
								}, self);
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