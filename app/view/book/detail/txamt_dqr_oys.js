Ext.define('Zixweb.view.book.detail.txamt_dqr_oys', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.book_detail_txamt_dqr_oys',

	initComponent : function() {
		var me = this, columns, store, grid, exportBtn, form;
		columns = {
			bi : Ext.columns.bi,
			tx_date : Ext.columns.tx_date,
			period : Ext.columns.period,
			j : Ext.columns.j,
			d : Ext.columns.d
		};
		store = Ext.create('widget.mystore', {
					_exportBtn : exportBtn = Ext.create('widget.exportbtn', {
								_url : 'book/detail/txamt_dqr_oys_excel',
								_grid : grid = new Ext.grid.Panel({
											store : store,
											columns : [columns.bi,
													columns.tx_date,
													columns.period, columns.j,
													columns.d]
										})
							}),
					_grid : grid,
					_columns : columns,
					_form : form = Ext.create('widget.queryform', {
								items : [{
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
														width : 180
													}]
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
														xtype : 'bi',
														name : 'bi',
														fieldLabel : '银行接口编号'
													}]
										}, {
											xtype : 'hsx',
											data : [{
														'value' : "bi",
														'name' : "银行接口编号"
													}, {
														'value' : "tx_date",
														'name' : "交易日期"
													}, {
														'value' : "period",
														'name' : "会计期间"
													}]
										}, {
											xtype : 'button',
											text : '查询',
											margin : '0 20 0 0',
											handler : function() {
												if (form.getForm().isValid()) {
													store.proxy.extraParams = form
															.getForm()
															.getValues();
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
					fields : ['bi', 'tx_date', 'period', 'j', 'd'],

					proxy : {
						type : 'ajax',
						api : {
							read : 'book/detail/txamt_dqr_oys'
						},
						reader : {
							type : 'json',
							root : 'data',
							totalProperty : 'totalCount',
							successProperty : 'success'
						}
					}
				});
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
