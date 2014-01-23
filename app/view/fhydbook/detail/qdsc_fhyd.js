Ext.define('Zixweb.view.fhydbook.detail.qdsc_fhyd', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.book_detail_qdsc_fhyd',

	initComponent : function() {
		var me = this, columns, store, grid, exportBtn, form;
		columns = {
			fyw_type : Ext.columns.fyw_type,
			fch : Ext.columns.fch,
			fe_date : Ext.columns.fe_date,
			period : Ext.columns.period,
			j : Ext.columns.j,
			d : Ext.columns.d
		};

		store = Ext.create('widget.mystore', {
					_exportBtn : exportBtn = Ext.create('widget.exportbtn', {
								_url : 'book/detail/qdsc_fhyd_excel',
								_grid : grid = new Ext.grid.Panel({
											store : store,
											columns : [columns.fyw_type,
													columns.fch,
													columns.fe_date,
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
														xtype : 'fywtype',
														name : 'fyw_type',
														width : 516,
														fieldLabel : '业务类型'
													}]
										}, {
											xtype : 'fieldcontainer',
											fieldLabel : '差错日期',
											layout : 'hbox',
											items : [{
														xtype : 'datefield',
														format : 'Y-m-d',
														name : 'fe_date_from',
														margin : '0 10 0 0',
														width : 180
													}, {
														xtype : 'datefield',
														format : 'Y-m-d',
														name : 'fe_date_to',
														margin : '0 10 0 0',
														width : 180
													}, {
														xtype : 'fch',
														name : 'fch',
														margin : '0 10 0 0',
														fieldLabel : '渠道方客户编号'
													}]
										}, {
											xtype : 'hsx',
											data : [{
														'value' : "fyw_type",
														'name' : "业务类型"
													}, {
														'value' : "fch",
														'name' : "渠道方客户编号"
													}, {
														'value' : "fe_date",
														'name' : "差错日期"
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

					fields : ['fyw_type', 'fch', 'fe_date', 'period', 'j', 'd'],

					proxy : {
						type : 'ajax',
						api : {
							read : 'book/detail/qdsc_fhyd'
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
