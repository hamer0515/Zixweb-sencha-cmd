Ext.define('Zixweb.view.book.detail.bfj_cust', {
			extend : 'Zixweb.view.Panel',
			alias : 'widget.book_detail_bfj_cust',
			hasExporBtn : true,
			_url : 'book/detail/bfj_cust',
			_fields : ['c', 'period', 'j', 'd'],
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
									xtype : 'textfield',
									name : 'c',
									width : 516,
									fieldLabel : '客户编号'
								}]
					}, {
						xtype : 'hsx',
						data : [{
									'value' : "c",
									'name' : "客户编号"
								}, {
									'value' : "period",
									'name' : "会计期间"
								}]
					}],
			initComponent : function() {
				var me = this, columns;
				me._columns = columns = {
					c : Ext.columns.c,
					period : Ext.columns.period,
					j : Ext.columns.j,
					d : Ext.columns.d
				};
				me._gcolumns = [columns.c, columns.period, columns.j, columns.d];
				me.callParent(arguments);
			}
		});
