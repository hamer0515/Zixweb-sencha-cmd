Ext.define('Zixweb.view.book.hist.bfee_zqqr_zg', {
			extend : 'Zixweb.view.Panel',
			alias : 'widget.book_hist_bfee_zqqr_zg',
			hasExporBtn : true,
			exportMode : 'widget',
			_url : 'book/hist/bfee_zqqr_zg',
			_fields : ['id', 'c', 'p', 'fp', 'period', 'bi', 'tx_date', 'j',
					'd', 'ys_id', 'ys_type'],
			_items : [{
						xtype : 'period'
					}, {
						xtype : 'fieldcontainer',
						fieldLabel : '交易日期',
						layout : 'hbox',
						items : [{
									xtype : 'datefield',
									format : 'Y-m-d',
									name : 'tx_date_from',
									margin : '0 10 0 0',
									width : 180
								}, {
									xtype : 'datefield',
									format : 'Y-m-d',
									name : 'tx_date_to',
									margin : '0 10 0 0',
									width : 180
								}, {
									xtype : 'textfield',
									name : 'c',
									fieldLabel : '客户id',
									width : 516
								}]
					}, {
						xtype : 'fieldcontainer',
						layout : 'hbox',
						items : [{
									xtype : 'textfield',
									name : 'fp',
									margin : '0 10 0 0',
									width : 516,
									fieldLabel : '周期确认规则'
								}, {
									xtype : 'product',
									name : 'p',
									width : 516,
									fieldLabel : '产品类型ID'
								}]
					}, {
						xtype : 'fieldcontainer',
						layout : 'hbox',
						items : [{
									xtype : 'textfield',
									name : 'id',
									margin : '0 10 0 0',
									width : 516,
									fieldLabel : 'ID',
									vtype : 'id'
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
									xtype : 'bi',
									name : 'bi',
									margin : '0 10 0 0',
									fieldLabel : '银行接口编号'
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
						Ext.columns.fp, Ext.columns.bi, Ext.columns.tx_date,
						Ext.columns.period, Ext.columns.j, Ext.columns.d,
						Ext.columns.ys_type, Ext.columns.book_detail_action]
				me.callParent(arguments);
			}
		});