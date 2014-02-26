Ext.define('Zixweb.view.book.detail.lfee_psp', {
			extend : 'Zixweb.view.Panel',
			alias : 'widget.book_detail_lfee_psp',
			hasExporBtn : true,
			_url : 'book/detail/lfee_psp',
			_fields : ['c', 'cust_proto', 'tx_date', 'period', 'j', 'd'],
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
									xtype : 'textfield',
									name : 'c',
									width : 516,
									fieldLabel : '客户编号'
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
									name : 'cust_proto',
									width : 516,
									fieldLabel : '客户协议编号'
								}]
					}, {
						xtype : 'hsx',
						data : [{
									'value' : "c",
									'name' : "客户编号"
								}, {
									'value' : "cust_proto",
									'name' : "客户协议编号"
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
					cust_proto : Ext.columns.cust_proto,
					tx_date : Ext.columns.tx_date,
					period : Ext.columns.period,
					j : Ext.columns.j,
					d : Ext.columns.d
				};
				me._gcolumns = [columns.c, columns.cust_proto, columns.tx_date,
						columns.period, columns.j, columns.d];
				me.callParent(arguments);
			}
		});
