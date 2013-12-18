Ext.define('Zixweb.view.book.detail.blc', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.book_detail_blc',

	initComponent : function() {
		var me = this, columns, store, grid, exportBtn, form;
		columns = {
			bfj_acct : Ext.columns.bfj_acct,
			zjbd_type : Ext.columns.zjbd_type,
			e_date : Ext.columns.e_date,
			period : Ext.columns.period,
			j : Ext.columns.j,
			d : Ext.columns.d
		};
		store =Ext.create('widget.mystore', {
					_exportBtn : exportBtn = Ext.create('widget.exportbtn', {
								_url : 'book/detail/blc_excel',
								_grid : grid = new Ext.grid.Panel({
											store : store,
											columns : [columns.bfj_acct,
													columns.zjbd_type,
													columns.e_date,
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
														margin : '0 10 0 0',
														width : 180
													}, {
														xtype : 'bfjacct',
														name : 'bfj_acct',
														fieldLabel : '备付金帐号'
													}]
										}, {
											xtype : 'fieldcontainer',
											fieldLabel : '差错日期',
											layout : 'hbox',
											items : [{
														xtype : 'datefield',
														format : 'Y-m-d',
														name : 'e_date_from',
														margin : '0 10 0 0',
														width : 180
													}, {
														xtype : 'datefield',
														format : 'Y-m-d',
														name : 'e_date_to',
														margin : '0 10 0 0',
														width : 180
													}, {
														xtype : 'zjbdtype',
														name : 'zjbd_type',
														fieldLabel : '资金变动类型'
													}]
										}, {
											xtype : 'hsx',
											data : [{
														'value' : "bfj_acct",
														'name' : "备付金帐号"
													}, {
														'value' : "zjbd_type",
														'name' : "资金变动类型"
													}, {
														'value' : "e_date",
														'name' : "差错日期"
													}, {
														'value' : "period",
														'name' : "期间日期"
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
					fields : ['bfj_acct', 'zjbd_type', 'e_date', 'period', 'j',
							'd'],

					proxy : {
						type : 'ajax',
						api : {
							read : 'book/detail/blc'
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