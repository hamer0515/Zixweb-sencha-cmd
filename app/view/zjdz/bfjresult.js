Ext.define('Zixweb.view.zjdz.bfjresult', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.zjdzbfjresult',

	initComponent : function() {
		var me = this, store, grid, form;
		store = Ext.create('widget.mystore', {
					_form : form = Ext.create('widget.queryform', {
								items : [{
											xtype : 'fieldcontainer',
											layout : 'hbox',
											items : [{
														xtype : 'bfjacct',
														name : 'bfj_acct',
														margin : '0 10 0 0',
														fieldLabel : '备付金账号'
													}, {
														xtype : 'rstatus',
														fieldLabel : '撤销状态',
														name : 'flag'
													}]

										}, {
											xtype : 'fieldcontainer',
											fieldLabel : '对账日期',
											layout : 'hbox',
											items : [{
														xtype : 'datefield',
														format : 'Y-m-d',
														name : 'dz_date_from',
														margin : '0 10 0 0',
														width : 180
													}, {
														xtype : 'datefield',
														format : 'Y-m-d',
														name : 'dz_date_to',
														margin : '0 10 0 0',
														width : 180
													}, {
														xtype : 'zjbdtype',
														name : 'zjbd_type',
														fieldLabel : '资金变动类型'
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
										}]
							}),
					fields : ['bfj_acct', 'dz_date', 'group', 'id', 'ys_type',
							'zjbd_type', 'flag'],

					proxy : {
						type : 'ajax',
						api : {
							read : 'zjdz/bfjresult'
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
			columns : [Ext.columns.bfj_acct, Ext.columns.dz_date,
					Ext.columns.group, Ext.columns.id, Ext.columns.ys_type,
					Ext.columns.zjbd_type, Ext.columns.flag, {
						xtype : 'actioncolumn',
						text : '操作',
						width : 80,
						align : 'center',
						items : [{
							tooltip : '详细',
							getClass : function(v, meta, rec) {
								return 'detail';
							},
							handler : function(grid, rowIndex, colIndex) {
								var yspzqdetail, rec = grid.getStore()
										.getAt(rowIndex), center = grid
										.up('center'), id = 'yspzq_detail_'
										+ rec.data.ys_type + rec.data.id, cmp = Ext
										.getCmp(id);
								if (cmp) {
									center.setActiveTab(cmp);
								} else {
									yspzqdetail = Ext
											.createByAlias('widget.yspzqdetail');
									yspzqdetail.store.load({
												params : {
													ys_type : rec.data.ys_type,
													ys_id : rec.data.id
												}
											});
									center.add({
										closable : true,
										xtype : 'panel',
										items : yspzqdetail,
										id : 'yspzq_detail_' + rec.data.ys_type
												+ rec.data.id,
										title : '凭证' + rec.data.ys_type
												+ '详细信息-' + rec.data.id
									}).show();
								}
							}
						}]
					}]
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