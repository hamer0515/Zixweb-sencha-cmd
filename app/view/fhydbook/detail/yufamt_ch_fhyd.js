Ext.define('Zixweb.view.fhydbook.detail.yufamt_ch_fhyd', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.book_detail_yufamt_ch_fhyd',

	initComponent : function() {
		var me = this, columns, store, grid, exportBtn, form;
		columns = {
			fyw_type : Ext.columns.fyw_type,
			fch : Ext.columns.fch,
			period : Ext.columns.period,
			j : Ext.columns.j,
			d : Ext.columns.d
		};

		store = Ext.create('widget.mystore', {
					_exportBtn : exportBtn = Ext.create('widget.exportbtn', {
								_url : 'book/detail/yufamt_ch_fhyd_excel',
								_grid : grid = new Ext.grid.Panel({
											store : store,
											columns : [columns.fyw_type,
													columns.fch, columns.period,
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
													}]
										}, {
											xtype : 'fieldcontainer',
											layout : 'hbox',
											items : [{
														xtype : 'fch',
														name : 'fch',
                                                        margin : '0 10 0 0',
														fieldLabel : '渠道方客户编号'
													}, {
														xtype : 'fywtype',
														name : 'fyw_type',
														width : 516,
														fieldLabel : '业务类型'
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

					fields : ['fyw_type', 'fch', 'period', 'j', 'd'],

					proxy : {
						type : 'ajax',
						api : {
							read : 'book/detail/yufamt_ch_fhyd'
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
