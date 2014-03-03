Ext.define('Zixweb.view.book.BookPanel', {
	extend : 'Ext.tree.Panel',
	useArrows : true,
	rootVisible : false,
	disableSelection : true,
	border : false,
	deferRowRender : true,

	initComponent : function() {
		var me = this;
		Ext.apply(me, {
			store : Ext.create('Ext.data.TreeStore', {
						fields : ['text', 'j', 'd', 'url', 'success', 'bid'],
						autoload : true,
						proxy : {
							type : 'ajax',
							url : me._url
						}
					}),
			columns : [{
						xtype : 'treecolumn',
						text : '科目',
						flex : 2,
						dataIndex : 'text'
					}, {
						text : '轧差借方余额',
						flex : 1,
						dataIndex : 'j',
						renderer : function(value) {
							return Ext.util.Format.number(
									parseInt(value) / 100, '0,0.00');
						}
					}, {
						text : '轧差贷方余额',
						flex : 1,
						dataIndex : 'd',
						renderer : function(value) {
							return Ext.util.Format.number(
									parseInt(value) / 100, '0,0.00');
						}
					}, {
						xtype : 'actioncolumn',
						text : '操作',
						width : 80,
						align : 'center',
						items : [{
							tooltip : '汇总',
							getClass : function(v, meta, rec) {
								if (rec.data.url) {
									return 'sum';
								} else {
									return 'hide';
								}
							},
							handler : function(grid, rowIndex, colIndex) {
								var rec = grid.getStore().getAt(rowIndex), center = grid
										.up('center'), id = 'book_sum_'
										+ rec.data.url, cmp = Ext.getCmp(id);
								if (cmp) {
									center.setActiveTab(cmp);
								} else {
									cls = 'Zixweb.view.book.sum.'
											+ rec.data.url;
									try {
										cmp = Ext.create(cls);
									} catch (e) {
										Ext.asyncRequest('base/dimbyid', {
													id : rec.data.bid
												}, function(response) {
													Ext.define(cls, {
														extend : 'Zixweb.view.book.SumPanel',
														_dims : Ext
																.decode(response.responseText)
													});
													cmp = Ext.create(cls);
												});
									}
									center.add({
										closable : true,
										xtype : 'panel',
										items : cmp,
										id : id,
										title : rec.data.text
												.substr(rec.data.text
														.indexOf("-")
														+ 1)
												+ '科目汇总'
									}).show();
								}
							}
						}, {
							tooltip : '明细查询',
							handler : function(grid, rowIndex, colIndex) {
								var rec = grid.getStore().getAt(rowIndex), center = grid
										.up('center'), id = 'book_detail_'
										+ rec.data.url, cmp = Ext.getCmp(id), cls;
								if (cmp) {
									center.setActiveTab(cmp);
								} else {
									cls = 'Zixweb.view.book.detail.'
											+ rec.data.url;
									try {
										cmp = Ext.create(cls);
									} catch (e) {
										Ext.Ajax.request({
											async : false,
											url : 'base/dimbyid',
											params : {
												id : rec.data.bid
											},
											success : function(response) {
												Ext.define(cls, {
													extend : 'Zixweb.view.book.DetailPanel',
													_dims : Ext
															.decode(response.responseText)
												});
												cmp = Ext.create(cls);
											}
										});
									}
									center.add({
										closable : true,
										xtype : 'panel',
										items : cmp,
										id : id,
										title : rec.data.text
												.substr(rec.data.text
														.indexOf("-")
														+ 1)
												+ '科目明细查询'
									}).show();
								}
							},
							getClass : function(v, meta, rec) {
								if (rec.data.url) {
									return 'detail';
								} else {
									return 'hide';
								}
							}
						}]
					}]
		});
		me.callParent(arguments);
	}
});
