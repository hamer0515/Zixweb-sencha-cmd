Ext.define('Zixweb.view.fhydbook.detail.cost_ncss_fhyd', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.book_detail_cost_ncss_fhyd',

	initComponent : function() {
		var me = this, columns, store, grid, exportBtn, form;
		columns = {
			fc : Ext.columns.fc,
			period : Ext.columns.period,
			fhw_type : Ext.columns.fhw_type,
			f_ssn : Ext.columns.f_ssn,
			j : Ext.columns.j,
			d : Ext.columns.d
		};

		store = Ext.create('widget.mystore', {
					_exportBtn : exportBtn = Ext.create('widget.exportbtn', {
								_url : 'book/detail/cost_ncss_fhyd_excel',
								_grid : grid = new Ext.grid.Panel({
											store : store,
											columns : [columns.fc,
													columns.period,
													columns.fhw_type,
													columns.f_ssn, columns.j,
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
														name : 'fc',
														width : 516,
														fieldLabel : '客户编号'
													}]
										}, {
											xtype : 'fieldcontainer',
											layout : 'hbox',
											items : [{
														xtype : 'fhwtype',
														name : 'fhw_type',
														width : 516,
														margin : '0 10 0 0',
														fieldLabel : ' 货物类型'
													}, {
														xtype : 'textfield',
														name : 'f_ssn',
														width : 516,
														fieldLabel : '唯一销卡编号'
													}]
										}, {
											xtype : 'hsx',
											data : [{
														'value' : "fc",
														'name' : "客户编号"
													}, {
														'value' : "period",
														'name' : "会计期间"
													}, {
														'value' : "fhw_type",
														'name' : " 货物类型"
													}, {
														'value' : "f_ssn",
														'name' : "唯一销卡编号"
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

					fields : ['fc', 'period', 'fhw_type', 'f_ssn', 'j', 'd'],

					proxy : {
						type : 'ajax',
						api : {
							read : 'book/detail/cost_ncss_fhyd'
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
