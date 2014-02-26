Ext.define('Zixweb.view.book.detail.txamt_yhyf', {
			extend : 'Zixweb.view.Panel',
			alias : 'widget.book_detail_txamt_yhyf',
			hasExporBtn : true,
			_url : 'book/detail/txamt_yhyf',
			_fields : ['bfj_acct', 'period', 'zjbd_date', 'zjbd_type', 'j', 'd'],
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
									xtype : 'bfjacct',
									name : 'bfj_acct',
									fieldLabel : '备付金帐号'
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
									fieldLabel : '资金变动类型'
								}]
					}, {
						xtype : 'hsx',
						data : [{
									'value' : "bfj_acct",
									'name' : "备付金银行账号"
								}, {
									'value' : "period",
									'name' : "会计期间"
								}, {
									'value' : "zjbd_date",
									'name' : "资金变动日期"
								}, {
									'value' : "zjbd_type",
									'name' : "资金变动类型"
								}]
					}],
			initComponent : function() {
				var me = this, columns;
				me._columns = columns = {
					bfj_acct : Ext.columns.bfj_acct,
					zjbd_type : Ext.columns.zjbd_type,
					zjbd_date : Ext.columns.zjbd_date,
					period : Ext.columns.period,
					j : Ext.columns.j,
					d : Ext.columns.d
				};
				me._gcolumns = [columns.bfj_acct, columns.period,
						columns.zjbd_date, columns.zjbd_type, columns.j,
						columns.d];
				me.callParent(arguments);
			}
		});
