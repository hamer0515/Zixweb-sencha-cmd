Ext.define('Zixweb.view.zjdz.bfjgzcx', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.zjdzbfjgzcx',

	defaults : {
		border : false
	},

	initComponent : function() {
		var store = new Ext.data.Store({
					fields : ['e_date', 'bfj_acct', 'blc', 'bsc'],

					pageSize : 50,
					autoLoad : true,

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
					},
					listeners : {
						beforeload : function(store, operation, eOpts) {
							var form = Ext.getCmp('zjdzbfjform').getForm();
							var values = form.getValues();
							if (form.isValid()) {
								store.proxy.extraParams = values;
							} else {
								return false;
							}
						},
						load : function(thiz, records, successful, eOpts) {
							if (!successful) {
								Ext.MessageBox.show({
											title : '警告',
											msg : '对账列表数据加载失败,请联系管理员',
											buttons : Ext.Msg.YES,
											icon : Ext.Msg.ERROR
										});
								return;
							}
							var jsonData = thiz.proxy.reader.jsonData.success;
							if (jsonData && jsonData === 'forbidden') {
								Ext.MessageBox.show({
											title : '警告',
											msg : '抱歉，没有对账列表数据访问权限',
											buttons : Ext.Msg.YES,
											icon : Ext.Msg.ERROR
										});
							}
						}
					}
				});
		this.store = store;
		this.items = [{
					xtype : 'form',
					title : '查询',
					id : 'zjdzbfjform',
					bodyPadding : 5,
					collapsible : true,

					fieldDefaults : {
						labelWidth : 140
					},
					items : [{
								xtype : 'fieldcontainer',
								layout : 'hbox',
								items : [{
											xtype : 'bfjacct',
											name : 'bfj_acct',
											fieldLabel : '备付金银行账号'
										}]

							}, {
								xtype : 'fieldcontainer',
								fieldLabel : '差错日期',
								layout : 'hbox',
								items : [{
											xtype : 'datefield',
											format : 'Y-m-d',
											name : 'from',
											margin : '0 10 0 0',
											width : 180
										}, {
											xtype : 'datefield',
											format : 'Y-m-d',
											name : 'to',
											width : 180
										}]
							}, {
								xtype : 'button',
								text : '查询',
								margin : '0 20 0 0',
								handler : function() {
									store.loadPage(1);
								}
							}, {
								xtype : 'button',
								text : '重置',
								handler : function(button) {
									button.up('panel').getForm().reset();
								}
							}]
				}, {
					xtype : 'gridpanel',
					id : 'zjdzbfjgrid',

					store : this.store,
					dockedItems : [{
								xtype : 'pagingtoolbar',
								store : this.store,
								dock : 'bottom',
								displayInfo : true
							}],
					columns : [{
								text : "差错日期",
								dataIndex : 'e_date',
								sortable : false,
								flex : 1,
								renderer : Ext.util.Format
										.dateRenderer('Y-m-d')
							}, {
								text : "备付金银行账户",
								itemId : 'bfj_acct',
								dataIndex : 'bfj_acct',
								sortable : false,
								renderer : function(value, p, record) {
									var bfjacct = Ext.data.StoreManager
											.lookup('Zixweb.store.component.BfjAcct');
									var index = bfjacct.findExact('id', value);
									return bfjacct.getAt(index).data.name;
								},
								flex : 3
							}, {
								text : "长款余额",
								dataIndex : 'blc',
								sortable : false,
								flex : 1,
								renderer : function(value) {
									if (!value) {
										value = 0;
									}
									return Ext.util.Format.number(
											parseInt(value) / 100, '0,0.00');
								}
							}, {
								text : "短款余额",
								dataIndex : 'bsc',
								sortable : false,
								flex : 1,
								renderer : function(value) {
									if (!value) {
										value = 0;
									}
									return Ext.util.Format.number(
											parseInt(value) / 100, '0,0.00');
								}
							}, {
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
										var rec = grid.getStore()
												.getAt(rowIndex);
										var viewport = grid.up('viewport'), center = viewport
												.down('center'), id = 'book_hist_blc', cmp = Ext
												.getCmp(id), panel;
										if (!cmp) {
											cmp = Ext.widget('book_hist_blc');
											panel = center.add({
														closable : true,
														xtype : 'panel',
														items : cmp,
														id : 'book_hist_blc',
														title : '备份金银行长款科目明细查询'
													});
										}
										cmp.down('form').getForm().reset();
										cmp
												.down("datefield[name='e_date_from']")
												.setValue(rec.data.e_date);
										cmp.down("datefield[name='e_date_to']")
												.setValue(rec.data.e_date);
										cmp.down("bfjacct[name='bfj_acct']")
												.setValue(rec.data.bfj_acct);
										cmp.down("gridpanel").store.loadPage(1);
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
										var rec = grid.getStore()
												.getAt(rowIndex);
										var viewport = grid.up('viewport'), center = viewport
												.down('center'), id = 'book_hist_bsc', cmp = Ext
												.getCmp(id), panel;
										if (!cmp) {
											cmp = Ext.widget('book_hist_bsc');
											panel = center.add({
														closable : true,
														xtype : 'panel',
														items : cmp,
														id : 'book_hist_bsc',
														title : '备份金银行短款科目明细查询'
													});
										}
										if (cmp) {
											center.setActiveTab(cmp);
										}
										cmp.down('form').getForm().reset();
										cmp
												.down("datefield[name='e_date_from']")
												.setValue(rec.data.e_date);
										cmp.down("datefield[name='e_date_to']")
												.setValue(rec.data.e_date);
										cmp.down("bfjacct[name='bfj_acct']")
												.setValue(rec.data.bfj_acct);
										cmp.down("gridpanel").store.loadPage(1);
										if (panel) {
											panel.show();
										} else {
											center.setActiveTab(cmp);
										}
									}
								}

								]
							}]
				}];
		this.callParent(arguments);
	}
});