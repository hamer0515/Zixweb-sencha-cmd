Ext.define('Zixweb.view.fhydbook.detail.ysamt_c_fhyd', {
			extend : 'Zixweb.view.Panel',
			alias : 'widget.book_detail_ysamt_c_fhyd',
			hasExporBtn : true,
			_url : 'book/detail/ysamt_c_fhyd',
			_fields : ['fc', 'ftx_date', 'fyw_type', 'period', 'j', 'd'],
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
									xtype : 'fyw_type'
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
									'value' : "fyw_type",
									'name' : " 业务类型"
								}]
					}],
			initComponent : function() {
				var me = this, columns;
				me._columns = columns = {
					fc : Ext.columns.fc,
					ftx_date : Ext.columns.ftx_date,
					fyw_type : Ext.columns.fyw_type,
					period : Ext.columns.period,
					j : Ext.columns.j,
					d : Ext.columns.d
				};
				me._gcolumns = [columns.fc, columns.ftx_date, columns.fyw_type,
						columns.period, columns.j, columns.d];
				me.callParent(arguments);
			}
		});
