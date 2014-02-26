Ext.define('Zixweb.view.book.detail.income_zhlx', {
			extend : 'Zixweb.view.Panel',
			alias : 'widget.book_detail_income_zhlx',
			hasExporBtn : true,
			_url : 'book/detail/income_zhlx',
			_fields : ['acct', 'period', 'j', 'd'],
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
									xtype : 'acct',
									name : 'acct',
									fieldLabel : '银行账户号及开户行'
								}]
					}, {
						xtype : 'hsx',
						data : [{
									'value' : "acct",
									'name' : "银行账户号及开户行"
								}, {
									'value' : "period",
									'name' : "会计期间"
								}]
					}],
			initComponent : function() {
				var me = this, columns;
				me._columns = columns = {
					acct : Ext.columns.acct,
					period : Ext.columns.period,
					j : Ext.columns.j,
					d : Ext.columns.d
				};
				me._gcolumns = [columns.acct, columns.period, columns.j,
						columns.d];
				me.callParent(arguments);
			}
		});
