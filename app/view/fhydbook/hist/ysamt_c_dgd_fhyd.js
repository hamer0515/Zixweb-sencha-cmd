Ext.define('Zixweb.view.fhydbook.hist.ysamt_c_dgd_fhyd', {
			extend : 'Zixweb.view.Panel',
			alias : 'widget.book_hist_ysamt_c_dgd_fhyd',
			hasExporBtn : true,
			exportMode : 'widget',
			_url : 'book/hist/ysamt_c_dgd_fhyd',
			_fields : ['id', 'fc', 'fhw_type', 'ftx_date', 'period', 'j', 'd',
					'ys_id', 'ys_type'],
			_items : [{
						xtype : 'fc'
					}, {
						xtype : 'fieldcontainer',
						layout : 'hbox',
						items : [{
									xtype : 'ftx_date'
								}, {
									xtype : 'fhw_type'
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
				me._gcolumns = [Ext.columns.id, Ext.columns.fc,
						Ext.columns.fhw_type, Ext.columns.ftx_date,
						Ext.columns.period, Ext.columns.j, Ext.columns.d,
						Ext.columns.ys_type, Ext.columns.book_detail_action];
				me.callParent(arguments);
			}
		});
