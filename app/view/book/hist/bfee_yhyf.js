Ext.define('Zixweb.view.book.hist.bfee_yhyf', {
			extend : 'Zixweb.view.Panel',
			alias : 'widget.book_hist_bfee_yhyf',
			hasExporBtn : true,
			exportMode : 'widget',
			_url : 'book/hist/bfee_yhyf',
			_fields : ['id', 'bfj_acct', 'zjbd_date', 'zjbd_type', 'period',
					'j', 'd', 'ys_id', 'ys_type'],
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
									vtype : 'id'
								}]

					}, {
						xtype : 'fieldcontainer',
						fieldLabel : '银行出入账日期',
						layout : 'hbox',
						items : [{
									xtype : 'datefield',
									format : 'Y-m-d',
									name : 'zjbd_date_from',
									margin : '0 10 0 0',
									width : 180
								}, {
									xtype : 'datefield',
									format : 'Y-m-d',
									name : 'zjbd_date_to',
									margin : '0 10 0 0',
									width : 180
								}, {
									xtype : 'zjbdtype',
									name : 'zjbd_type',
									fieldLabel : '资金变动类型'
								}]
					}, {
						xtype : 'fieldcontainer',
						layout : 'hbox',
						items : [{
									xtype : 'bfjacct',
									name : 'bfj_acct',
									margin : '0 10 0 0',
									fieldLabel : '备付金账号'
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
				me._gcolumns = [Ext.columns.id, Ext.columns.bfj_acct,
						Ext.columns.zjbd_type, Ext.columns.zjbd_date,
						Ext.columns.period, Ext.columns.j, Ext.columns.d,
						Ext.columns.ys_type, Ext.columns.book_detail_action];
				me.callParent(arguments);
			}
		});
