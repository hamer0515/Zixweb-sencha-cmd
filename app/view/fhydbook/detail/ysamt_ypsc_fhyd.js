Ext.define('Zixweb.view.fhydbook.detail.ysamt_ypsc_fhyd', {
			extend : 'Zixweb.view.Panel',
			alias : 'widget.book_detail_ysamt_ypsc_fhyd',
			hasExporBtn : true,
			_url : 'book/detail/ysamt_ypsc_fhyd',
			_fields : ['fe_date', 'fyp_acct', 'fyw_type', 'period', 'j', 'd'],
			_items : [{
						xtype : 'fieldcontainer',
						layout : 'hbox',
						items : [{
									xtype : 'period_'
								}, {
									xtype : 'fyw_type'
								}]
					}, {
						xtype : 'fieldcontainer',
						layout : 'hbox',
						items : [{
									xtype : 'fe_date'
								}, {
									xtype : 'fypacct'
								}]
					}, {
						xtype : 'hsx',
						data : [{
									'value' : "fe_date",
									'name' : "差错日期"
								}, {
									'value' : "fyp_acct",
									'name' : "易宝中间账户号"
								}, {
									'value' : "period",
									'name' : "会计期间"
								}, {
									'value' : "fyw_type",
									'name' : " 业务类型"
								}]
					}],
			initComponent : function() {
				var me = this, columns;
				me._columns = columns = {
					fe_date : Ext.columns.fe_date,
					fyp_acct : Ext.columns.fyp_acct,
					fyw_type : Ext.columns.fyw_type,
					period : Ext.columns.period,
					j : Ext.columns.j,
					d : Ext.columns.d
				};
				me._gcolumns = [columns.fe_date, columns.fyp_acct,
						columns.fyw_type, columns.period, columns.j, columns.d];
				me.callParent(arguments);
			}
		});
