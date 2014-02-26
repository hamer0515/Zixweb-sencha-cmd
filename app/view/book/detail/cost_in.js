Ext.define('Zixweb.view.book.detail.cost_in', {
			extend : 'Zixweb.view.Panel',
			alias : 'widget.book_detail_cost_in',
			hasExporBtn : true,
			_url : 'book/detail/cost_in',
			_fields : ['c', 'p', 'period', 'j', 'd'],
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
									xtype : 'product',
									name : 'p',
									fieldLabel : '产品类型'
								}]
					}, {
						xtype : 'fieldcontainer',
						layout : 'hbox',
						items : {
							fieldLabel : '客户编号',
							xtype : 'textfield',
							name : 'c',
							width : 516,
							margin : '0 10 0 0'
						}
					}, {
						xtype : 'hsx',
						data : [{
									'value' : "c",
									'name' : "客户编号"
								}, {
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
					c : Ext.columns.c,
					p : Ext.columns.p,
					period : Ext.columns.period,
					j : Ext.columns.j,
					d : Ext.columns.d
				};
				me._gcolumns = [columns.c, columns.p, columns.period,
						columns.j, columns.d];
				me.callParent(arguments);
			}
		});
