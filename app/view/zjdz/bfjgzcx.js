Ext.define('Zixweb.view.zjdz.bfjgzcx', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.zjdzbfjgzcx',
	border : false,
	initComponent : function() {
		var mformat = function(value) {
			return Ext.util.Format.number(parseInt(value) / 100, '0,0.00');
		}
		var tpl = new Ext.XTemplate(
				'<tpl for=".">',
				'<table width="98%" border="0" cellspacing="1" cellpadding="0" align="center"  bgcolor="#C8DCF0" class="live_1_table">',
				'{[this.gentrs(values)]}', '</table>', '</tpl>', {
					gentrs : function(json) {
						var data = '';
						var bfjacct = Ext.data.StoreManager
								.lookup('Zixweb.store.component.BfjAcct');
						var zjbdtype = Ext.data.StoreManager
								.lookup('Zixweb.store.component.ZjbdType');
						data += '<tr bgcolor="#ffffff"   align="center" class="live_1_table_tr">'
								+ '<td  width="9%">银行账户</td>'
								+ '<td  width="11%">资金变动类型</td>'
								+ '<td  width="8%">科目</td>'
						for (var i in json.dates) {
							data += '<td  width="8%">' + json.dates[i]
									+ '</td>';
						}
						data += '<td  width="10%">7日前合计</td>'
								+ '<td  width="8%">总累计</td>' + '</tr>';
						for (var i in json.accts) {
							var acct = json.accts[i];
							var index = bfjacct.findExact('id', acct);
							var acct_name = bfjacct.getAt(index).data.name;
							data += '<tr class="ice_one_td">' + '<td rowspan="'
									+ json.acct_rowspan[acct] + '" ><BR>'
									+ acct_name + '</td>';
							for (var j in json.acct_zjbd_types[acct]) {
								var zjbd_type = json.acct_zjbd_types[acct][j];
								var zindex = zjbdtype
										.findExact('id', zjbd_type);
								var zjbd_type_name = zjbdtype.getAt(zindex).data.name;
								if (j > 0) {
									data += '<tr  id="row1"  class="ice_one_td">';
								}
								// 银行端款
								data += '<td rowspan="2" >' + zjbd_type_name
										+ '</td>' + '<td width="8%">短款</td>';
								for (var x in json.dates) {
									var date = json.dates[x];
									data += '<td class="ice_one_data"> '
											+ mformat(json.data[acct][zjbd_type][date].sc)
											+ '</td>';
								}
								data += '<td class="ice_one_data">'
										+ mformat(json.sum_week[acct][zjbd_type].sc)
										+ '</td>';
								data += '<td class="ice_one_data">'
										+ mformat(json.sum_total[acct][zjbd_type].sc)
										+ '</td></tr>';
								// 长款
								data += '<tr class="ice_one_td">'
										+ '<td >长款</td>';
								for (var x in json.dates) {
									var date = json.dates[x];
									data += '<td class="ice_one_data"> '
											+ mformat(json.data[acct][zjbd_type][date].lc)
											+ '</td>';
								}
								data += '<td class="ice_one_data">'
										+ mformat(json.sum_week[acct][zjbd_type].lc)
										+ '</td>';
								data += '<td class="ice_one_data">'
										+ mformat(json.sum_total[acct][zjbd_type].lc)
										+ '</td></tr>';
							}
							// 合计
							data += '<tr class="ice_one_td">'
									+ '<td rowspan="2">合计</td>'
									+ '<td >短款</td>';
							for (var x in json.dates) {
								var date = json.dates[x];
								data += '<td class="ice_one_data"> '
										+ mformat(json.heji[acct][date].sc)
										+ '</td>';
							}
							data += '<td class="ice_one_data">'
									+ mformat(json.sum_week[acct]['heji'].sc)
									+ '</td>' + '<td class="ice_one_data">'
									+ mformat(json.sum_total[acct]['heji'].sc)
									+ '</td></tr>';
							data += '<tr class="ice_one_td">'
									+ '<td width="8%">长款</td>';
							for (var x in json.dates) {
								var date = json.dates[x];
								data += '<td class="ice_one_data"> '
										+ mformat(json.heji[acct][date].lc)
										+ '</td>';
							}
							data += '<td class="ice_one_data">'
									+ mformat(json.sum_week[acct]['heji'].lc)
									+ '</td>' + '<td class="ice_one_data">'
									+ mformat(json.sum_total[acct]['heji'].lc)
									+ '</td></tr>';
						}
						// 总和计
						data += '<tr class="ice_one_td">'
								+ '<td rowspan="2" colspan="2">总合计</td>'
								+ '<td >短款</td>';
						for (var x in json.dates) {
							var date = json.dates[x];
							data += '<td class="ice_one_data"> '
									+ mformat(json.total_sum[date].sc)
									+ '</td>';
						}
						data += '<td class="ice_one_data">'
								+ mformat(json.total_sum.week.sc) + '</td>'
								+ '<td class="ice_one_data">'
								+ mformat(json.total_sum.total.sc)
								+ '</td></tr>';
						data += '<tr class="ice_one_td">' + '<td >长款</td>';
						for (var x in json.dates) {
							var date = json.dates[x];
							data += '<td class="ice_one_data"> '
									+ mformat(json.total_sum[date].lc)
									+ '</td>';
						}
						data += '<td class="ice_one_data">'
								+ mformat(json.total_sum.week.lc) + '</td>'
								+ '<td class="ice_one_data">'
								+ mformat(json.total_sum.total.lc);
						+'</td></tr>';
						return data;
					}
				});
		var store = new Ext.data.Store({
					fields : ['acct_zjbd_types', 'sum_total', 'total_sum',
							'accts', 'dates', 'data', 'heji', 'sum_week',
							'acct_rowspan'],

					autoLoad : true,
					proxy : {
						type : 'ajax',
						url : 'zjdz/bfjgzcx'
					},
					listeners : {
						load : function(thiz, records, successful, eOpts) {
							if (!successful) {
								Ext.MessageBox.show({
											title : '警告',
											msg : '数据加载失败,请联系管理员',
											buttons : Ext.Msg.YES,
											icon : Ext.Msg.ERROR
										});
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