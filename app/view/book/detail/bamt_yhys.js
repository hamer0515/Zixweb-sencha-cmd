Ext.define('Zixweb.view.book.detail.bamt_yhys', {
			extend : 'Zixweb.view.Panel',
			alias : 'widget.book_detail_bamt_yhys',
			hasExporBtn : true,
			_url : 'book/detail/bamt_yhys',
			_fields : ['zyzj_acct', 'zjbd_type', 'zjbd_date', 'period', 'j',
					'd'],
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
									xtype : 'zyzjacct',
									name : 'zyzj_acct',
									fieldLabel : '自有资金帐号'
								}]
					}, {
						xtype : 'fieldcontainer',
						fieldLabel : '资金变动日期',
						layout : 'hbox',
						items : [{
									xtype : 'datefield',
									format : 'Y-m-d',
									name : 'zjbd_date_from',
									margin : '0 10 0 0',
									width : 180
								}, {
									xtype : 'datefield',
									format : 'Y-m-d',
									name : 'zjbd_date_to',
									margin : '0 10 0 0',
									width : 180
								}, {
									xtype : 'zjbdtype',
									name : 'zjbd_type',
									margin : '0 10 0 0',
									fieldLabel : '资金变动类型'
								}]
					}, {
						xtype : 'hsx',
						data : [{
									'value' : "zyzj_acct",
									'name' : "自有资金帐号"
								}, {
									'value' : "zjbd_type",
									'name' : "资金变动类型"
								}, {
									'value' : "zjbd_date",
									'name' : "资金变动日期"
								}, {
									'value' : "period",
									'name' : "会计期间"
								}]
					}],
			initComponent : function() {
				var me = this, columns;
				me._columns = columns = {
					zyzj_acct : Ext.columns.zyzj_acct,
					zjbd_type : Ext.columns.zjbd_type,
					zjbd_date : Ext.columns.zjbd_date,
					period : Ext.columns.period,
					j : Ext.columns.j,
					d : Ext.columns.d
				};
				me._gcolumns = [columns.zyzj_acct, columns.zjbd_type,
						columns.zjbd_date, columns.period, columns.j, columns.d];
				me.callParent(arguments);
			}
		});