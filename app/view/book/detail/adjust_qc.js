Ext.define('Zixweb.view.book.detail.adjust_qc', {
			extend : 'Zixweb.view.Panel',
			alias : 'widget.book_detail_adjust_qc',
			hasExporBtn : true,
			_url : 'book/detail/adjust_qc',
			_fields : ['period', 'j', 'd'],
			_items : [{
						xtype : 'fieldcontainer',
						layout : 'hbox',
						fieldLabel : '会计期间',
						items : [{
									xtype : 'datefield',
									format : 'Y-m-d',
									name : 'period_from',
									margin : '0 10 0 0',
									width : 180
								}, {
									xtype : 'datefield',
									format : 'Y-m-d',
									margin : '0 10 0 0',
									name : 'period_to',
									width : 180
								}, {
									xtype : 'hsx',
									data : [{
												'value' : "period",
												'name' : "会计期间"
											}]
								}]
					}],
			initComponent : function() {
				var me = this, columns;
				me._columns = columns = {
					period : Ext.columns.period,
					j : Ext.columns.j,
					d : Ext.columns.d
				};
				me._gcolumns = [columns.period, columns.j, columns.d];
				me.callParent(arguments);
			}
		});
