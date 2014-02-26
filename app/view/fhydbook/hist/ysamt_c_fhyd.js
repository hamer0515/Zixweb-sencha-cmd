Ext.define('Zixweb.view.fhydbook.hist.ysamt_c_fhyd', {
			extend : 'Zixweb.view.Panel',
			alias : 'widget.book_hist_ysamt_c_fhyd',
			hasExporBtn : true,
			exportMode : 'widget',
			_url : 'book/hist/ysamt_c_fhyd',
			_fields : ['id', 'fc', 'ftx_date', 'fyw_type', 'period', 'j', 'd',
					'ys_id', 'ys_type'],
			_items : [{
						xtype : 'ftx_date'
					}, {
						xtype : 'fieldcontainer',
						layout : 'hbox',
						items : [{
									xtype : 'fc'
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
				me._gcolumns = [Ext.columns.id, Ext.columns.fc,
						Ext.columns.ftx_date, Ext.columns.fyw_type,
						Ext.columns.period, Ext.columns.j, Ext.columns.d,
						Ext.columns.ys_type, Ext.columns.book_detail_action];
				me.callParent(arguments);
			}
		});
