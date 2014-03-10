Ext.define('Zixweb.view.zjdz.qd', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.zjdzqd',

	initComponent : function() {
		var me = this, store, grid, form;
		store = Ext.create('widget.mystore', {
					fields : ['fch', 'zjdz_date'],

					autoLoad : true,

					proxy : {
						type : 'ajax',
						api : {
							read : 'zjdz/qd'
						},
						reader : {
							type : 'json',
							root : 'data',
							totalProperty : 'totalCount',
							successProperty : 'success'
						}
					}
				});
		form = Ext.create('widget.queryform', {
					items : [{
								xtype : 'fieldcontainer',
								fieldLabel : '资金对账日期',
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
								xtype : 'fieldcontainer',
								layout : 'hbox',
								items : [{
											xtype : 'fch',
											name : 'fch',
											fieldLabel : '渠道方编号'
										}]

							}, {
								xtype : 'button',
								text : '查询',
								margin : '0 20 0 0',
								handler : function() {
									store.proxy.extraParams = form.getForm()
											.getValues();
									store.loadPage(1);
								}
							}, {
								xtype : 'button',
								text : '重置',
								margin : '0 20 0 0',
								handler : function(button) {
									form.getForm().reset();
								}
							}]
				});
		grid = new Ext.grid.Panel({
			store : store,
			columns : [{
						text : "渠道方编号",
						dataIndex : 'fch',
						// renderer : function(value, p, record) {
						// var f_ch =
						// Ext.data.StoreManager.lookup('component.Fch');
						// var index = f_ch.findExact('id', value);
						// if (index == -1) {
						// meta.style = 'color:red';
						// }
						// return index == -1 ? '无效的数据(' + value + ')' : f_ch
						// .getAt(index).data.name;
						// },
						flex : 3
					}, {
						text : "资金对账日期",
						dataIndex : 'zjdz_date',
						flex : 1,
						renderer : Ext.util.Format.dateRenderer('Y年m月d日')
					}, {
						xtype : 'actioncolumn',
						text : '操作',
						width : 80,
						align : 'center',
						items : [{
							tooltip : '对账',
							getClass : function(v, meta, rec) {
								return 'reconciliation';
							},
							handler : function(grid, rowIndex, colIndex) {
								var rec = grid.getStore().getAt(rowIndex);
								var center = grid.up('center'), id = 'zjdz_qd_detail', cmp = Ext
										.getCmp(id);
								if (cmp) {
									center.setActiveTab(cmp);
								} else {
									// var fch = Ext.data.StoreManager
									// .lookup('Fch');
									// var index = fch.findExact('id',
									// rec.data.fch);
									// var fch_name =
									// fch.getAt(index).data.name;
									var zjdzqddetail = Ext
											.createByAlias('widget.zjdzqddetail');
									zjdzqddetail.store.load({
												params : {
													tag : 1,
													zjbd_date : rec.data.zjdz_date,
													f_ch : rec.data.fch
												}
											});
									center.add({
										closable : true,
										xtype : 'panel',
										items : zjdzqddetail,
										id : id,
										title : fch_name + '渠道编号'
												+ rec.data.zjdz_date + '日资金对账'
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