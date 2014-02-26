Ext.define('Zixweb.view.book.detail.bsc_zyzj', {
			extend : 'Zixweb.view.Panel',
			alias : 'widget.book_detail_bsc_zyzj',
			hasExporBtn : true,
			_url : 'book/detail/bsc_zyzj',
			_fields : ['zyzj_acct', 'e_date', 'period', 'j', 'd'],
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
									xtype : 'zyzjacct',
									name : 'zyzj_acct',
									fieldLabel : '自有资金帐号'
								}]
					}, {
						xtype : 'hsx',
						data : [{
									'value' : "zyzj_acct",
									'name' : "自有资金帐号"
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
					zyzj_acct : Ext.columns.zyzj_acct,
					e_date : Ext.columns.e_date,
					period : Ext.columns.period,
					j : Ext.columns.j,
					d : Ext.columns.d
				};
				me._gcolumns = [columns.zyzj_acct, columns.e_date,
						columns.period, columns.j, columns.d];
				me.callParent(arguments);
			}
		});
