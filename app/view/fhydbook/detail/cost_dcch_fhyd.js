Ext.define('Zixweb.view.fhydbook.detail.cost_dcch_fhyd', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.book_detail_cost_dcch_fhyd',

	initComponent : function() {
		var me = this, columns, store, grid, exportBtn, form;
		columns = {
			fm : Ext.columns.fm,
			fyw_type : Ext.columns.fyw_type,
			f_dcn : Ext.columns.f_dcn,
			period : Ext.columns.period,
			j : Ext.columns.j,
			d : Ext.columns.d
		};

		store = Ext.create('widget.mystore', {
					_exportBtn : exportBtn = Ext.create('widget.exportbtn', {
								_url : 'book/detail/cost_dcch_fhyd_excel',
								_grid : grid = new Ext.grid.Panel({
											store : store,
											columns : [columns.fm,
													columns.fyw_type,
													columns.f_dcn,
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
														xtype : 'textfield',
														name : 'fm',
														width : 516,
														fieldLabel : '商户编号'
													}]
										}, {
											xtype : 'fieldcontainer',
											layout : 'hbox',
											items : [{
														fieldLabel : '业务类型',
														xtype : 'fywtype',
														name : 'fyw_type',
														width : 516,
														margin : '0 10 0 0'
													}, {
														xtype : 'textfield',
														name : 'f_dcn',
														width : 516,
														fieldLabel : '代充通道编号'
													}]
										}, {
											xtype : 'hsx',
											data : [{
														'value' : "fm",
														'name' : "商户编号"
													}, {
														'value' : "fyw_type",
														'name' : "业务类型"
													}, {
														'value' : "f_dcn",
														'name' : "代充通道编号"
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
					fields : ['fm', 'fyw_type', 'f_dcn', 'period', 'j', 'd'],

					proxy : {
						type : 'ajax',
						api : {
							read : 'book/detail/cost_dcch_fhyd'
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
