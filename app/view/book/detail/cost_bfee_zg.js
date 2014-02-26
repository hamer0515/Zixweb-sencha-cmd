Ext.define('Zixweb.view.book.detail.cost_bfee_zg', {
			extend : 'Zixweb.view.Panel',
			alias : 'widget.book_detail_cost_bfee_zg',
			hasExporBtn : true,
			_url : 'book/detail/cost_bfee_zg',
			_fields : ['bi', 'c', 'p', 'fp', 'tx_date', 'period', 'j', 'd'],
			_items : [{
						xtype : 'fieldcontainer',
						fieldLabel : '会计期间',
						layout : 'hbox',
						items : [{
									xtype : 'datefield',
									format : 'Y-m-d',
									name : 'period_from',
									margin : '0 10 0 0',
									width : 180
								}, {
									xtype : 'datefield',
									format : 'Y-m-d',
									name : 'period_to',
									margin : '0 10 0 0',
									width : 180
								}, {
									xtype : 'product',
									name : 'p',
									width : 516,
									fieldLabel : '产品类型'
								}]
					}, {
						xtype : 'fieldcontainer',
						fieldLabel : '交易日期',
						layout : 'hbox',
						items : [{
									xtype : 'datefield',
									format : 'Y-m-d',
									name : 'tx_date_from',
									margin : '0 10 0 0',
									width : 180
								}, {
									xtype : 'datefield',
									format : 'Y-m-d',
									name : 'tx_date_to',
									margin : '0 10 0 0',
									width : 180
								}, {
									xtype : 'textfield',
									name : 'fp',
									width : 516,
									fieldLabel : '周期确认规则'
								}]
					}, {
						xtype : 'fieldcontainer',
						layout : 'hbox',
						items : [{
									fieldLabel : '客户编号',
									xtype : 'textfield',
									name : 'c',
									width : 516,
									margin : '0 10 0 0'
								}, {
									xtype : 'bi',
									name : 'bi',
									fieldLabel : '银行接口编号'
								}]
					}, {
						xtype : 'hsx',
						data : [{
									'value' : "c",
									'name' : "客户编号"
								}, {
									'value' : "p",
									'name' : "产品类型"
								}, {
									'value' : "bi",
									'name' : "银行接口编号"
								}, {
									'value' : "fp",
									'name' : "周期确认规则"
								}, {
									'value' : "period",
									'name' : "会计期间"
								}, {
									'value' : "tx_date",
									'name' : "交易日期"
								}]
					}],
			initComponent : function() {
				var me = this, columns;
				me._columns = columns = {
					c : Ext.columns.c,
					p : Ext.columns.p,
					bi : Ext.columns.bi,
					fp : Ext.columns.fp,
					period : Ext.columns.period,
					tx_date : Ext.columns.tx_date,
					j : Ext.columns.j,
					d : Ext.columns.d
				};
				me._gcolumns = [columns.bi, columns.c, columns.p, columns.fp,
						columns.tx_date, columns.period, columns.j];
				me.callParent(arguments);
			}
		});
