Ext.define('Zixweb.view.zjdz.bfjgzcx', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.zjdzbfjgzcx',

	initComponent : function() {
		var me = this, columns, store, grid, form;
		columns = {
			bfj_acct : Ext.columns.bfj_acct,
			zjbd_type : Ext.columns.zjbd_type,
			e_date : Ext.columns.e_date,
			period : Ext.columns.period,
			blc : Ext.columns.blc,
			bsc : Ext.columns.bsc,
			action : {
				xtype : 'actioncolumn',
				text : '明细',
				width : 80,
				align : 'center',
				items : [{
					tooltip : '长款余额',
					getClass : function(v, meta, rec) {
						return 'blcdetail';
					},
					handler : function(grid, rowIndex, colIndex) {
						var rec = grid.getStore().getAt(rowIndex);
						var center = grid.up('center'), id = 'book_hist_blc', cmp = Ext
								.getCmp(id), panel;
						if (!cmp) {
							cmp = Ext.widget('book_hist_blc');
							panel = center.add({
										closable : true,
										xtype : 'panel',
										items : cmp,
										id : id,
										title : '备份金银行长款科目明细查询'
									});
						}
						var form = cmp.down('form').getForm(), store = cmp
								.down("gridpanel").store;
						form.reset();
						cmp.down("datefield[name='e_date_from']")
								.setValue(rec.data.e_date);
						cmp.down("datefield[name='e_date_to']")
								.setValue(rec.data.e_date);
						cmp.down("datefield[name='period_from']")
								.setValue(rec.data.period);
						cmp.down("datefield[name='period_to']")
								.setValue(rec.data.period);
						cmp.down("bfjacct[name='bfj_acct']")
								.setValue(rec.data.bfj_acct);
						cmp.down("zjbdtype[name='zjbd_type']")
								.setValue(rec.data.zjbd_type);
						store.proxy.extraParams = form.getValues();
						store.loadPage(1);
						if (panel) {
							panel.show();
						} else {
							center.setActiveTab(cmp);
						}
					}

				}, {
					tooltip : '短款余额',
					getClass : function(v, meta, rec) {
						return 'bscdetail';
					},
					handler : function(grid, rowIndex, colIndex) {
						var rec = grid.getStore().getAt(rowIndex);
						var center = grid.up('center'), id = 'book_hist_bsc', cmp = Ext
								.getCmp(id), panel;
						if (!cmp) {
							cmp = Ext.widget('book_hist_bsc');
							panel = center.add({
										closable : true,
										xtype : 'panel',
										items : cmp,
										id : id,
										title : '备份金银行短款科目明细查询'
									});
						}
						var form = cmp.down('form').getForm(), store = cmp
								.down("gridpanel").store;
						form.reset();
						cmp.down("datefield[name='e_date_from']")
								.setValue(rec.data.e_date);
						cmp.down("datefield[name='e_date_to']")
								.setValue(rec.data.e_date);
						cmp.down("datefield[name='period_from']")
								.setValue(rec.data.period);
						cmp.down("datefield[name='period_to']")
								.setValue(rec.data.period);
						cmp.down("bfjacct[name='bfj_acct']")
								.setValue(rec.data.bfj_acct);
						cmp.down("zjbdtype[name='zjbd_type']")
								.setValue(rec.data.zjbd_type);
						store.proxy.extraParams = form.getValues();
						store.loadPage(1);
						if (panel) {
							panel.show();
						} else {
							center.setActiveTab(cmp);
						}
					}
				}]
			}
		};
		store = Ext.create('widget.mystore', {
			_grid : grid = new Ext.grid.Panel({
						store : store,
						columns : [columns.bfj_acct, columns.zjbd_type,
								columns.e_date, columns.period, columns.blc,
								columns.bsc, columns.action]
					}),
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
												'name' : "会计期间"
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
								}]
					}),
			fields : ['bfj_acct', 'zjbd_type', 'e_date', 'period', 'blc', 'bsc'],

			proxy : {
				type : 'ajax',
				api : {
					read : 'zjdz/bfjgzcx'
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
		store.loadPage(1);
		me.callParent(arguments);
	}
});