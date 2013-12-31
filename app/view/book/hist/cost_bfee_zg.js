Ext.define('Zixweb.view.book.hist.cost_bfee_zg', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.book_hist_cost_bfee_zg',

	initComponent : function() {
		var me = this, columns, store, grid, exportBtn, form;
		store = Ext.create('widget.mystore', {
			_exportBtn : exportBtn = Ext.create('widget.exportbtn', {
						_widget : 'tablefields',
						_bid : me.bid,
						_url : 'book/hist/cost_bfee_zg_excel',
						_grid : grid
					}),
			_form : form = Ext.create('widget.queryform', {
						items : [{
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
												xtype : 'bi',
												name : 'bi',
												margin : '0 10 0 0',
												fieldLabel : '银行接口编号'
											}, {
												xtype : 'textfield',
												name : 'fp',
												width : 516,
												fieldLabel : '周期确认规则'
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
												width : 516,
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
			fields : ['id', 'bi', 'c', 'p', 'fp', 'tx_date', 'period', 'j',
					'd', 'ys_id', 'ys_type'],

			proxy : {
				type : 'ajax',
				api : {
					read : 'book/hist/cost_bfee_zg'
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
					columns : [Ext.columns.id, Ext.columns.bi, Ext.columns.fp,
							Ext.columns.c, Ext.columns.p, Ext.columns.tx_date,
							Ext.columns.period, Ext.columns.j, Ext.columns.d,
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
