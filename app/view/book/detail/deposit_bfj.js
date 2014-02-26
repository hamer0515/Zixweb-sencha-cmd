Ext.define('Zixweb.view.book.detail.deposit_bfj', {
			extend : 'Zixweb.view.Panel',
			alias : 'widget.book_detail_deposit_bfj',
			hasExporBtn : true,
			_url : 'book/detail/deposit_bfj',
			_fields : ['bfj_acct', 'period', 'j', 'd'],
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
						xtype : 'hsx',
						data : [{
									'value' : "bfj_acct",
									'name' : "备付金帐号"
								}, {
									'value' : "period",
									'name' : "会计期间"
								}]
					}],
			initComponent : function() {
				var me = this, columns;
				me._columns = columns = {
					bfj_acct : Ext.columns.bfj_acct,
					period : Ext.columns.period,
					j : Ext.columns.j,
					d : Ext.columns.d
				};
				me._gcolumns = [columns.bfj_acct, columns.period, columns.j,
						columns.d]
				me.callParent(arguments);
			}
		});