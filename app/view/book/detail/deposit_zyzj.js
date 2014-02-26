Ext.define('Zixweb.view.book.detail.deposit_zyzj', {
	extend : 'Zixweb.view.Panel',
	alias : 'widget.book_detail_deposit_zyzj',
	hasExporBtn : true,
	_url : 'book/detail/deposit_zyzj',
	_fields : ['zyzj_acct', 'period', 'j', 'd'],
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
				xtype : 'hsx',
				data : [{
							'value' : "zyzj_acct",
							'name' : "自有资金帐号"
						}, {
							'value' : "period",
							'name' : "会计期间"
						}]
			}],
	initComponent : function() {
		var me = this, columns;
		me._columns = columns = {
			zyzj_acct : Ext.columns.zyzj_acct,
			period : Ext.columns.period,
			j : Ext.columns.j,
			d : Ext.columns.d
		};
		me._gcolumns = [columns.zyzj_acct, columns.period, columns.j, columns.d];
		me.callParent(arguments);
	}
});