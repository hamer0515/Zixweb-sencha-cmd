Ext.define('Zixweb.view.fhydbook.detail.deposit_fhyd', {
	extend : 'Zixweb.view.Panel',
	alias : 'widget.book_detail_deposit_fhyd',
	hasExporBtn : true,
	_url : 'book/detail/deposit_fhyd',
	_fields : ['fhyd_acct', 'period', 'j', 'd'],
	_items : [{
				xtype : 'fieldcontainer',
				layout : 'hbox',
				items : [{
							xtype : 'period_'
						}, {
							xtype : 'fhyd_acct'
						}]
			}, {
				xtype : 'hsx',
				data : [{
							'value' : "fhyd_acct",
							'name' : "富汇易达帐号"
						}, {
							'value' : "period",
							'name' : "会计期间"
						}]
			}],
	initComponent : function() {
		var me = this, columns;
		me._columns = columns = {
			fhyd_acct : Ext.columns.fhyd_acct,
			period : Ext.columns.period,
			j : Ext.columns.j,
			d : Ext.columns.d
		};
		me._gcolumns = [columns.fhyd_acct, columns.period, columns.j, columns.d];
		me.callParent(arguments);
	}
});
