Ext.define('Zixweb.view.book.detail.bsc', {
			extend : 'Zixweb.view.Panel',
			alias : 'widget.book_detail_bsc',
			hasExporBtn : true,
			_url : 'book/detail/bsc',
			_fields : ['bfj_acct', 'zjbd_type', 'e_date', 'period', 'j', 'd'],
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
						fieldLabel : '差错日期',
						layout : 'hbox',
						items : [{
									xtype : 'datefield',
									format : 'Y-m-d',
									name : 'e_date_from',
									margin : '0 10 0 0',
									width : 180
								}, {
									xtype : 'datefield',
									format : 'Y-m-d',
									name : 'e_date_to',
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
									'name' : "备付金帐号"
								}, {
									'value' : "zjbd_type",
									'name' : "资金变动类型"
								}, {
									'value' : "e_date",
									'name' : "差错日期"
								}, {
									'value' : "period",
									'name' : "会计期间"
								}]
					}],
			initComponent : function() {
				var me = this, columns;
				me._columns = columns = {
					bfj_acct : Ext.columns.bfj_acct,
					zjbd_type : Ext.columns.zjbd_type,
					e_date : Ext.columns.e_date,
					period : Ext.columns.period,
					j : Ext.columns.j,
					d : Ext.columns.d
				};
				me._gcolumns = [columns.bfj_acct, columns.zjbd_type,
						columns.e_date, columns.period, columns.j, columns.d];
				me.callParent(arguments);
			}
		});
