Ext.define('Zixweb.view.component.HSX', {
	extend : 'Ext.form.FieldContainer',
	alias : 'widget.hsx',
	layout : 'vbox',
	names : ['一', '二', '三', '四', '五', '六', '七'],
	submitNames : ['fir', 'sec', 'thi', 'fou', 'fiv', 'six', 'sev'],
	dimDict : {
		'f_agm' : '代理商编号',
		'f_dcn' : '代充通道编号',
		'f_ssn' : '唯一销卡编号',
		'fc' : '客户编号',
		'fcg_date' : '商品采购日期',
		'fch' : '渠道方编号',
		'fe_date' : '差错日期',
		'fhw_type' : '货物类型',
		'fhyd_acct' : '富汇易达银行账户号',
		'fm' : '商户编号',
		'ftx_date' : '交易日期',
		'fyp_acct' : '易宝中间账户号',
		'fyw_type' : '业务类型',
		// 'period' : '会计期间',
		'acct' : '资金账号，包括自有资金与备付金账号',
		'bfj_acct' : '备付金账号',
		'bi' : '银行接口编号',
		'c' : '客户编号',
		'cust_proto' : '客户协议',
		'e_date' : '差错日期',
		'fp' : '周期确认规则',
		'p' : '产品类型',
		'tx_date' : '交易日期',
		'wlzj_type' : '往来资金类型',
		'zjbd_date' : '资金变动日期',
		'zjbd_type' : '资金变动类型',
		'zyzj_acct' : '自有资金账号'
	},
	initComponent : function() {
		this.items = [];
		var panel = this;
		var data = [{
					'value' : "period",
					'name' : "会计期间"
				}];
		var items = this.data;
		if (items) {
			for (var i in items) {
				data.unshift({
							'value' : items[i],
							'name' : this.dimDict[items[i]]
						})
			}
		}
		var sta = new Ext.data.Store({
					fields : ['value', 'name'],
					data : data
				});
		var container;
		for (var i in data) {
			if (container == undefined) {
				container = Ext
						.decode("{xtype : 'fieldcontainer',layout : 'hbox',items : []}");
			}
			var item = {
				xtype : 'combobox',
				fieldLabel : '第' + this.names[i] + '核算项',
				store : new Ext.data.Store({
							fields : ['value', 'name'],
							data : data
						}),
				labelWidth : 140,
				queryMode : 'local',
				name : this.submitNames[i],
				anyMatch : true,
				margin : '0 10 0 0',
				width : 516,
				displayField : 'name',
				valueField : 'value',
				listeners : {
					change : function(me, newValue, oldValue, eOpts) {
						if (oldValue) {
							var index = sta.findExact('value', oldValue);
							if (index != -1) {
								var record = sta.getAt(index);
								var combos = panel.query('combobox');
								for (var i in combos) {
									if (combos[i] === me) {
										continue;
									}
									var s = combos[i].store;
									var ii = s.findExact('value', oldValue);
									if (ii == -1) {
										s.add(record);
										combos[i].bindStore(s);
									}
								}
							}
						}
						var i = me.store.findExact('value', newValue);
						if (i == -1) {
							me.setValue('');
							newValue = '';
							return;
						}
						var combos = panel.query('combobox');
						for (var i in combos) {
							if (combos[i] === me) {
								continue;
							}
							var s = combos[i].store;
							var i = s.findExact('value', newValue);
							if (i != -1) {
								s.removeAt(i);
								combos[i].bindStore(s);
							}
						}
					}
				}
			}
			container.items.push(item);
			if ((parseInt(i) + 1) % 2 == 0) {
				this.items.push(container);
				container = undefined;
			}
		}
		if (container != undefined) {
			this.items.push(container);
		}
		this.callParent(arguments);
	}
});