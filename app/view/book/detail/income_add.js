Ext.define('Zixweb.view.book.detail.income_add', {
			extend : 'Zixweb.view.Panel',
			alias : 'widget.book_detail_income_add',
			hasExporBtn : true,
			_url : 'book/detail/income_add',
			_fields : ['p', 'period', 'j', 'd'],
			_items : [{
						xtype : 'fieldcontainer',
						fieldLabel : '会计期间',
						layout : 'hbox',
						items : [{
									xtype : 'datefield',
									format : 'Y-m-d',
									name : 'period_from',
									margin : '0 10 0 0',
									allowBlank : true,
									width : 180
								}, {
									xtype : 'datefield',
									format : 'Y-m-d',
									name : 'period_to',
									margin : '0 10 0 0',
									allowBlank : true,
									width : 180
								}, {
									xtype : 'product',
									name : 'p',
									fieldLabel : '产品类型'
								}]
					}, {
						xtype : 'hsx',
						data : [{
									'value' : "p",
									'name' : "产品类型"
								}, {
									'value' : "period",
									'name' : "会计期间"
								}]
					}],
			initComponent : function() {
				var me = this, columns;
				me._columns = columns = {
					p : Ext.columns.p,
					period : Ext.columns.period,
					j : Ext.columns.j,
					d : Ext.columns.d
				};
				me._gcolumns = [columns.p, columns.period, columns.j, columns.d];
				me.callParent(arguments);
			}
		});
