Ext.define('Zixweb.view.book.detail.bfee_zqqr_zg', {
			extend : 'Zixweb.view.Panel',
			alias : 'widget.book_detail_bfee_zqqr_zg',
			hasExporBtn : true,
			_url : 'book/detail/bfee_zqqr_zg',
			_fields : ['fp', 'c', 'p', 'bi', 'tx_date', 'period', 'j', 'd'],
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
									xtype : 'bi',
									name : 'bi',
									fieldLabel : '银行接口编号'
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
									name : 'c',
									fieldLabel : '客户编号',
									width : 516
								}]
					}, {
						xtype : 'fieldcontainer',
						layout : 'hbox',
						items : [{
									xtype : 'textfield',
									name : 'fp',
									margin : '0 10 0 0',
									width : 516,
									fieldLabel : '周期确认规则'
								}, {
									xtype : 'product',
									name : 'p',
									width : 516,
									fieldLabel : '产品类型'
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
									'value' : "fp",
									'name' : "周期确认规则"
								}, {
									'value' : "bi",
									'name' : "银行接口编号"
								}, {
									'value' : "tx_date",
									'name' : "交易日期"
								}, {
									'value' : "period",
									'name' : "会计期间"
								}]
					}],
			initComponent : function() {
				var me = this, columns;
				me._columns = columns = {
					c : Ext.columns.c,
					p : Ext.columns.p,
					fp : Ext.columns.fp,
					bi : Ext.columns.bi,
					tx_date : Ext.columns.tx_date,
					period : Ext.columns.period,
					j : Ext.columns.j,
					d : Ext.columns.d
				};
				me._gcolumns = [columns.c, columns.p, columns.bi, columns.fp,
						columns.tx_date, columns.period, columns.j, columns.d];
				me.callParent(arguments);
			}
		});