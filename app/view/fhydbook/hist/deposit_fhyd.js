Ext.define('Zixweb.view.fhydbook.hist.deposit_fhyd', {
			extend : 'Zixweb.view.Panel',
			alias : 'widget.book_hist_deposit_fhyd',
			hasExporBtn : true,
			exportMode : 'widget',
			_url : 'book/hist/deposit_fhyd',
			_fields : ['id', 'fhyd_acct', 'period', 'j', 'd', 'ys_id',
					'ys_type'],
			_items : [{
						xtype : 'fieldcontainer',
						layout : 'hbox',
						items : [{
									xtype : 'fhyd_acct'
								}]

					}, {
						xtype : 'fieldcontainer',
						layout : 'hbox',
						items : [{
									xtype : 'idfield'
								}, {
									xtype : 'ysidfield'
								}]

					}, {
						xtype : 'fieldcontainer',
						layout : 'hbox',
						items : [{
									xtype : 'j_amt'
								}, {
									xtype : 'd_amt'
								}]
					}, {
						xtype : 'fieldcontainer',
						layout : 'hbox',
						items : [{
									xtype : 'period'
								}, {
									xtype : 'ystypef'
								}]
					}],

			initComponent : function() {
				var me = this;
				me._gcolumns = [Ext.columns.id, Ext.columns.fhyd_acct,
						Ext.columns.period, Ext.columns.j, Ext.columns.d,
						Ext.columns.ys_type, Ext.columns.book_detail_action];
				me.callParent(arguments);
			}
		});
