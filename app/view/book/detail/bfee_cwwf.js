Ext.define('Zixweb.view.book.detail.bfee_cwwf', {
			extend : 'Zixweb.view.Panel',
			alias : 'widget.book_detail_bfee_cwwf',
			hasExporBtn : true,
			_url : 'book/detail/bfee_cwwf',
			_fields : ['bi', 'tx_date', 'period', 'j', 'd'],
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
									margin : '0 10 0 0',
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
								}]
					}, {
						xtype : 'hsx',
						data : [{
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
					bi : Ext.columns.bi,
					tx_date : Ext.columns.tx_date,
					period : Ext.columns.period,
					j : Ext.columns.j,
					d : Ext.columns.d
				};
				me._gcolumns = [columns.bi, columns.tx_date, columns.period,
						columns.j, columns.d];
				me.callParent(arguments);
			}
		});