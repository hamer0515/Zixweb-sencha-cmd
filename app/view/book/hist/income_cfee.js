Ext.define('Zixweb.view.book.hist.income_cfee', {
			extend : 'Zixweb.view.Panel',
			alias : 'widget.book_hist_income_cfee',
			hasExporBtn : true,
			exportMode : 'widget',
			_url : 'book/hist/income_cfee',
			_fields : ['id', 'c', 'p', 'period', 'j', 'd', 'ys_id', 'ys_type'],
			_items : [{
						xtype : 'period'
					}, {
						xtype : 'fieldcontainer',
						layout : 'hbox',
						items : [{
									xtype : 'ystype',
									name : 'ys_type',
									fieldLabel : '原始凭证类型'
								}]
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
									vtype : 'id'
								}]

					}, {
						xtype : 'fieldcontainer',
						layout : 'hbox',
						items : [{
									xtype : 'textfield',
									name : 'c',
									width : 516,
									margin : '0 10 0 0',
									fieldLabel : '客户编号'
								}, {
									xtype : 'product',
									name : 'p',
									margin : '0 10 0 0',
									fieldLabel : '产品类型'
								}]
					}, {
						xtype : 'fieldcontainer',
						layout : 'hbox',
						items : [{
									xtype : 'fieldcontainer',
									layout : 'hbox',
									fieldLabel : '借方金额',
									items : [{
												xtype : 'money',
												name : 'j_from',
												margin : '0 10 0 0',
												width : 180
											}, {
												xtype : 'money',
												name : 'j_to',
												width : 180,
												margin : '0 10 0 0'
											}]
								}, {
									xtype : 'fieldcontainer',
									layout : 'hbox',
									fieldLabel : '贷方金额',
									items : [{
												xtype : 'money',
												name : 'd_from',
												margin : '0 10 0 0',
												width : 180
											}, {
												xtype : 'money',
												name : 'd_to',
												width : 180
											}]
								}]
					}],
			initComponent : function() {
				var me = this;
				me._gcolumns = [Ext.columns.id, Ext.columns.c, Ext.columns.p,
						Ext.columns.period, Ext.columns.j, Ext.columns.d,
						Ext.columns.ys_type, Ext.columns.book_detail_action];
				me.callParent(arguments);
			}
		});
