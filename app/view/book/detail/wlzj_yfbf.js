Ext.define('Zixweb.view.book.detail.wlzj_yfbf', {
			extend : 'Zixweb.view.Panel',
			alias : 'widget.book_detail_wlzj_yfbf',
			hasExporBtn : true,
			_url : 'book/detail/wlzj_yfbf',
			_fields : ['period', 'j', 'd'],
			_items : [{
						xtype : 'fieldcontainer',
						fieldLabel : '会计期间',
						layout : 'hbox',
						items : [{
									xtype : 'datefield',
									format : 'Y-m-d',
									name : 'period_from',
									margin : '0 10 0 0',

									width : 180
								}, {
									xtype : 'datefield',
									format : 'Y-m-d',
									name : 'period_to',
									margin : '0 10 0 0',

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
