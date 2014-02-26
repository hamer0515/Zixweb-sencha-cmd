Ext.define('Zixweb.view.fhydbook.hist.ysamt_ypsc_fhyd', {
			extend : 'Zixweb.view.Panel',
			alias : 'widget.book_hist_ysamt_ypsc_fhyd',
			hasExporBtn : true,
			exportMode : 'widget',
			_url : 'book/hist/ysamt_ypsc_fhyd',
			_fields : ['id', 'fe_date', 'fyp_acct', 'fyw_type', 'period', 'j',
					'd', 'ys_id', 'ys_type'],
			_items : [{
						xtype : 'fe_date'
					}, {
						xtype : 'fieldcontainer',
						layout : 'hbox',
						items : [{
									xtype : 'fyp_acct'
								}, {
									xtype : 'fyw_type'
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
				me._gcolumns = [Ext.columns.id, Ext.columns.fe_date,
						Ext.columns.fyp_acct, Ext.columns.fyw_type,
						Ext.columns.period, Ext.columns.j, Ext.columns.d,
						Ext.columns.ys_type, Ext.columns.book_detail_action];
				me.callParent(arguments);
			}
		});
