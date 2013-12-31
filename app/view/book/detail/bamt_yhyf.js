Ext.define('Zixweb.view.book.detail.bamt_yhyf', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.book_detail_bamt_yhyf',

	initComponent : function() {
		var me = this, columns, store, grid, exportBtn, form;
		columns = {
			zyzj_acct : Ext.columns.zyzj_acct,
			period : Ext.columns.period,
			zjbd_type : Ext.columns.zjbd_type,
			zjbd_date : Ext.columns.zjbd_date,
			j : Ext.columns.j,
			d : Ext.columns.d
		};

		store =Ext.create('widget.mystore', {
			_exportBtn : exportBtn = Ext.create('widget.exportbtn', {
						_url : 'book/detail/bamt_yhyf_excel',
						_grid : grid = new Ext.grid.Panel({
									store : store,
									columns : [columns.zyzj_acct,
											columns.period, columns.zjbd_date,
											columns.zjbd_type, columns.j,
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
												xtype : 'zyzjacct',
												name : 'zyzj_acct',
												margin : '0 10 0 0',
												fieldLabel : '自有资金银行账号'
											}]
								}, {
									xtype : 'fieldcontainer',
									fieldLabel : '资金变动日期',
									layout : 'hbox',
									items : [{
												xtype : 'datefield',
												format : 'Y-m-d',
												name : 'zjbd_date_from',
												margin : '0 10 0 0',
												width : 180
											}, {
												xtype : 'datefield',
												format : 'Y-m-d',
												name : 'zjbd_date_to',
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
												'value' : "zyzj_acct",
												'name' : "自有资金银行账号"
											}, {
												'value' : "period",
												'name' : "会计期间"
											}, {
												'value' : "zjbd_date",
												'name' : "资金变动日期"
											}, {
												'value' : "zjbd_type",
												'name' : "资金变动类型"
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
			fields : ['zyzj_acct', 'period', 'zjbd_date', 'zjbd_type', 'j', 'd'],

			proxy : {
				type : 'ajax',
				api : {
					read : 'book/detail/bamt_yhyf'
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
