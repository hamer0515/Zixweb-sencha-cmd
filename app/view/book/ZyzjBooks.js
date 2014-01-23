Ext.define('Zixweb.view.book.ZyzjBooks', {
	extend : 'Ext.tree.Panel',
	alias : 'widget.bookzyzj',
	useArrows : true,
	rootVisible : false,
	height : 'auto',
	disableSelection : true,
	border : false,

	initComponent : function() {

		Ext.apply(this, {
			store : new Ext.data.TreeStore({
						fields : ['text', 'j', 'd', 'url', 'bid'],
						autoload : true,
						proxy : {
							type : 'ajax',
							url : 'book/zyzj'
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
									return 'detail';
								} else {
									return 'hide';
								}
							},
							handler : function(grid, rowIndex, colIndex) {
								var rec = grid.getStore().getAt(rowIndex);
								var center = grid.up('center'), id = 'book_detail_'
										+ rec.data.url, cmp = Ext.getCmp(id);
								if (cmp) {
									center.setActiveTab(cmp);
								} else {
									center.add({
										closable : true,
										xtype : 'panel',
										items : {
											xtype : 'book_detail_'
													+ rec.data.url
										},
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
								var rec = grid.getStore().getAt(rowIndex);
								var center = grid.up('center'), id = 'book_hist_'
										+ rec.data.url, cmp = Ext.getCmp(id);
								if (cmp) {
									center.setActiveTab(cmp);
								} else {
									center.add({
										closable : true,
										xtype : 'panel',
										items : {
											xtype : 'book_hist_' + rec.data.url,
											bid : rec.data.bid
										},
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
									return 'history';
								} else {
									return 'hide';
								}
							}
						}]
					}]
		});
		this.callParent(arguments);
	}
});
