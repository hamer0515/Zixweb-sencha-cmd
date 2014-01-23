Ext.define('Zixweb.view.fhydbook.detail.tctxamt_dqr_oyf_fhyd', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.book_detail_tctxamt_dqr_oyf_fhyd',

	initComponent : function() {
		var me = this, columns, store, grid, exportBtn, form;
		columns = {
			f_ssn : Ext.columns.f_ssn,
			fch : Ext.columns.fch,
			f_rate : Ext.columns.f_rate,
			fhw_type : Ext.columns.fhw_type,
			period : Ext.columns.period,
			ftx_date : Ext.columns.ftx_date,
			j : Ext.columns.j,
			d : Ext.columns.d
		};

		store = Ext.create('widget.mystore', {
					_exportBtn : exportBtn = Ext.create('widget.exportbtn', {
								_url : 'book/detail/tctxamt_dqr_oyf_fhyd_excel',
								_grid : grid = new Ext.grid.Panel({
											store : store,
											columns : [columns.f_ssn,
													columns.fch,
													columns.f_rate,
													columns.fhw_type,
													columns.period,
													columns.ftx_date,
													columns.j, columns.d]
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
														xtype : 'textfield',
														name : 'f_ssn',
														width : 516,
														fieldLabel : '唯一销卡编号'
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
														xtype : 'textfield',
														name : 'f_rate',
														width : 516,
														fieldLabel : '结算折扣率'
													}]
										}, {
											xtype : 'fieldcontainer',
											layout : 'hbox',
											items : [{
														fieldLabel : '货物类型',
														xtype : 'fhwtype',
														name : 'fhw_type',
														width : 516,
														margin : '0 10 0 0'
													}, {
														xtype : 'fch',
														name : 'fch',
														fieldLabel : '渠道方客户编号'
													}]
										}, {
											xtype : 'hsx',
											data : [{
														'value' : "f_ssn",
														'name' : "唯一销卡编号"
													}, {
														'value' : "f_rate",
														'name' : "结算折扣率"
													}, {
														'value' : "fhw_type",
														'name' : "货物类型"
													}, {
														'value' : "fch",
														'name' : "渠道方客户编号"
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
					fields : ['f_ssn', 'f_rate', 'fhw_type', 'fch', 'ftx_date',
							'period', 'j', 'd'],

					proxy : {
						type : 'ajax',
						api : {
							read : 'book/detail/tctxamt_dqr_oyf_fhyd'
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
