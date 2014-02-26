Ext.define('Zixweb.view.book.hist.income_add', {
			extend : 'Zixweb.view.Panel',
			alias : 'widget.book_hist_income_add',
			hasExporBtn : true,
			exportMode : 'widget',
			_url : 'book/hist/income_add',
			_fields : ['id', 'p', 'period', 'j', 'd', 'ys_id', 'ys_type'],
			_items : [{
						xtype : 'period'
					}, {
						xtype : 'fieldcontainer',
						layout : 'hbox',
						items : [{
									xtype : 'textfield',
									name : 'id',
									margin : '0 10 0 0',
									width : 516,
									vtype : 'id',
									fieldLabel : 'ID'
								}, {
									xtype : 'textfield',
									fieldLabel : '原始凭证ID',
									width : 516,
									name : 'ys_id',
									vtype : "money"
								}]

					}, {
						xtype : 'fieldcontainer',
						layout : 'hbox',
						items : [{
									xtype : 'product',
									name : 'p',
									margin : '0 10 0 0',
									fieldLabel : '产品类型'
								}, {
									xtype : 'ystype',
									name : 'ys_type',
									fieldLabel : '原始凭证类型'
								}]
					}, {
						xtype : 'fieldcontainer',
						layout : 'hbox',
						items : [{
									xtype : 'fieldcontainer',
									layout : 'hbox',
									fieldLabel : '借方金额',
									items : [{
												xtype : 'textfield',
												name : 'j_from',
												margin : '0 10 0 0',
												width : 180,
												vtype : "money"
											}, {
												xtype : 'textfield',
												name : 'j_to',
												width : 180,
												margin : '0 10 0 0',
												vtype : "money"
											}]
								}, {
									xtype : 'fieldcontainer',
									layout : 'hbox',
									fieldLabel : '贷方金额',
									items : [{
												xtype : 'textfield',
												name : 'd_from',
												margin : '0 10 0 0',
												width : 180,
												vtype : "money"
											}, {
												xtype : 'textfield',
												name : 'd_to',
												width : 180,
												vtype : "money"
											}]
								}]
					}],
			initComponent : function() {
				var me = this;
				me._gcolumns = [Ext.columns.id, Ext.columns.p,
						Ext.columns.period, Ext.columns.j, Ext.columns.d,
						Ext.columns.ys_type, Ext.columns.book_detail_action];
				me.callParent(arguments);
			}
		});
