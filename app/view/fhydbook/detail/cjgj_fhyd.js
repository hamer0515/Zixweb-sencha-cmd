Ext.define('Zixweb.view.fhydbook.detail.cjgj_fhyd', {
			extend : 'Zixweb.view.Panel',
			alias : 'widget.book_detail_cjgj_fhyd',
			hasExporBtn : true,
			_url : 'book/detail/cjgj_fhyd',
			_fields : ['fc', 'fhw_type', 'period', 'j', 'd'],
			_items : [{
						xtype : 'period_'
					}, {
						xtype : 'fieldcontainer',
						layout : 'hbox',
						items : [{
									xtype : 'fc'
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
									'value' : "fhw_type",
									'name' : " 货物类型"
								}]
					}],
			initComponent : function() {
				var me = this, columns;
				me._columns = columns = {
					fc : Ext.columns.fc,
					fhw_type : Ext.columns.fhw_type,
					period : Ext.columns.period,
					j : Ext.columns.j,
					d : Ext.columns.d
				};
				me._gcolumns = [columns.fc, columns.fhw_type, columns.period,
						columns.j, columns.d];
				me.callParent(arguments);
			}
		});
