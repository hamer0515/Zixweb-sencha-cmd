Ext.define('Zixweb.view.fhydbook.detail.yfamt_ch_fhyd', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.book_detail_yfamt_ch_fhyd',

	initComponent : function() {
		var me = this, columns, store, grid, exportBtn, form;
		columns = {
			fc : Ext.columns.fc,
			fyw_type : Ext.columns.fyw_type,
			ftx_date : Ext.columns.ftx_date,
			period : Ext.columns.period,
			j : Ext.columns.j,
			d : Ext.columns.d
		};

		store = Ext.create('widget.mystore', {
					_exportBtn : exportBtn = Ext.create('widget.exportbtn', {
								_url : 'book/detail/yfamt_ch_fhyd_excel',
								_grid : grid = new Ext.grid.Panel({
											store : store,
											columns : [columns.fc,
													columns.fyw_type,
													columns.ftx_date,
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
														fieldLabel : '客户编号',
														xtype : 'textfield',
														name : 'fc',
														width : 516
													}]
										}, {
											xtype : 'fieldcontainer',
											fieldLabel : '交易日期',
											layout : 'hbox',
											items : [{
														xtype : 'datefield',
														format : 'Y-m-d',
														name : 'ftx_date_from',
														margin : '0 10 0 0',
														width : 180
													}, {
														xtype : 'datefield',
														format : 'Y-m-d',
														name : 'ftx_date_to',
														margin : '0 10 0 0',
														width : 180
													}, {
														xtype : 'fywtype',
														name : 'fyw_type',
														marigin : '0 10 0 0',
														fieldLabel : '业务类型'
													}]
										}, {
											xtype : 'hsx',
											data : [{
														'value' : "fc",
														'name' : "客户编号"
													}, {
														'value' : "fyw_type",
														'name' : "业务类型"
													}, {
														'value' : "ftx_date",
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

					fields : ['fc', 'fyw_type', 'ftx_date', 'period', 'j', 'd'],

					proxy : {
						type : 'ajax',
						api : {
							read : 'book/detail/yfamt_ch_fhyd'
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
