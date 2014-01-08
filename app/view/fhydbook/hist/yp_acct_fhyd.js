Ext.define('Zixweb.view.fhydbook.hist.yp_acct_fhyd', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.book_hist_yp_acct_fhyd',

	initComponent : function() {
		var me = this, columns, store, grid, exportBtn, form;
		store = Ext.create('widget.mystore', {
			_exportBtn : exportBtn = Ext.create('widget.exportbtn', {
						_widget : 'tablefields',
						_bid : me.bid,
						_url : 'book/hist/yp_acct_fhyd_excel',
						_grid : grid
					}),
			_form : form = Ext.create('widget.queryform', {
						items : [{
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
									xtype : 'ystypef',
									name : 'ys_type',
									fieldLabel : '原始凭证类型'
								}, {
									xtype : 'fieldcontainer',
									fieldLabel : '易宝出入账日期',
									layout : 'hbox',
									items : [{
												xtype : 'datefield',
												format : 'Y-m-d',
												name : 'fio_date_from',
												margin : '0 10 0 0',
												width : 180
											}, {
												xtype : 'datefield',
												format : 'Y-m-d',
												name : 'fio_date_to',
												margin : '0 10 0 0',
												width : 180
											}, {
												xtype : 'fypacct',
												name : 'fyp_acct',
												width : 516,
												fieldLabel : '易宝中间帐户号'
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
															width : 180,
															margin : '0 10 0 0'
														}]
											}]
								}, {
									xtype : 'button',
									text : '查询',
									margin : '0 20 0 0',
									handler : function() {
										if (form.getForm().isValid()) {
											store.proxy.extraParams = form
													.getForm().getValues();
											store.loadPage(1);
										}
									}
								}, {
									xtype : 'button',
									text : '重置',
									margin : '0 20 0 0',
									handler : function(button) {
										form.getForm().reset();
									}
								}, exportBtn]
					}),

			fields : ['id', 'fyp_acct', 'fio_date', 'period', 'j', 'd',
					'ys_id', 'ys_type'],

			proxy : {
				type : 'ajax',
				api : {
					read : 'book/hist/yp_acct_fhyd'
				},
				reader : {
					type : 'json',
					root : 'data',
					totalProperty : 'totalCount',
					successProperty : 'success'
				}
			}

		});
		grid = new Ext.grid.Panel({
					store : store,
					columns : [Ext.columns.id, Ext.columns.fyp_acct,
							Ext.columns.fio_date, Ext.columns.period,
							Ext.columns.j, Ext.columns.d,
							Ext.columns.book_detail_action]
				});
		exportBtn._grid = grid;
		// 添加底部分页工具栏
		grid.addDocked({
					xtype : 'pagingtoolbar',
					store : store,
					dock : 'bottom'
				});
		me.items = [form, grid];
		me.callParent(arguments);

	}
});
