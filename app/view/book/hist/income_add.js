Ext.define('Zixweb.view.book.hist.income_add', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.book_hist_income_add',

	initComponent : function() {
		var me = this, columns, store, grid, exportBtn, form;
		store = Ext.create('widget.mystore', {
			_exportBtn : exportBtn = Ext.create('widget.exportbtn', {
						_widget : 'tablefields',
						_bid : me.bid,
						_url : 'book/hist/income_add_excel',
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
			fields : ['id', 'p', 'period', 'j', 'd', 'ys_id', 'ys_type'],

			proxy : {
				type : 'ajax',
				api : {
					read : 'book/hist/income_add'
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
					columns : [Ext.columns.id, Ext.columns.p,
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
