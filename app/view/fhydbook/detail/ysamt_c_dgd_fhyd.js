Ext.define('Zixweb.view.fhydbook.detail.ysamt_c_dgd_fhyd', {
			extend : 'Zixweb.view.Panel',
			alias : 'widget.book_detail_ysamt_c_dgd_fhyd',
			hasExporBtn : true,
			_url : 'book/detail/ysamt_c_dgd_fhyd',
			_fields : ['fc', 'fhw_type', 'ftx_date', 'period', 'j', 'd'],
			_items : [{
						xtype : 'fieldcontainer',
						layout : 'hbox',
						items : [{
									xtype : 'period_'
								}, {
									xtype : 'fc'
								}]
					}, {
						xtype : 'fieldcontainer',
						layout : 'hbox',
						items : [{
									xtype : 'ftx_date'
								}, {
									xtype : 'fhw_type'
								}]
					}, {
						xtype : 'hsx',
						data : [{
									'value' : "fc",
									'name' : "客户编号"
								}, {
									'value' : "period",
									'name' : "会计期间"
								}, {
									'value' : "ftx_date",
									'name' : "交易日期"
								}, {
									'value' : "fhw_type",
									'name' : " 货物类型"
								}]
					}],
			initComponent : function() {
				var me = this, columns;
				me._columns = columns = {
					fc : Ext.columns.fc,
					ftx_date : Ext.columns.ftx_date,
					period : Ext.columns.period,
					fhw_type : Ext.columns.fhw_type,
					j : Ext.columns.j,
					d : Ext.columns.d
				};
				me._gcolumns = [columns.fc, columns.fhw_type, columns.ftx_date,
						columns.period, columns.j, columns.d];
				me.callParent(arguments);
			}
		});
