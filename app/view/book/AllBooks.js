Ext.define('Zixweb.view.book.AllBooks', {
	extend : 'Ext.tree.Panel',
	alias : 'widget.bookall',
	useArrows : true,
	rootVisible : false,
	height : 'auto',
	disableSelection : true,
	border : false,

	initComponent : function() {

		Ext.apply(this, {
			store : new Ext.data.TreeStore({
						fields : ['text', 'j', 'd', 'url', 'success'],
						autoload : true,
						proxy : {
							type : 'ajax',
							url : 'book/all'
						},
						listeners : {
							load : function(thiz, records, successful, eOpts) {
								if (!successful) {
									Ext.MessageBox.show({
												title : '警告',
												msg : '总帐套数据加载失败,请联系管理员',
												buttons : Ext.Msg.YES,
												icon : Ext.Msg.ERROR
											});
									return;
								}
								var jsonData = thiz.proxy.reader.jsonData.success;
								if (jsonData && jsonData === 'forbidden') {
									Ext.MessageBox.show({
												title : '警告',
												msg : '抱歉，没有总帐套数据访问权限',
												buttons : Ext.Msg.YES,
												icon : Ext.Msg.ERROR
											});
								}
							}
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
							isDisabled : function(view, rowIdx, colIdx, item,
									record) {
								return !record.data.leaf;
							},
							handler : function(grid, rowIndex, colIndex) {
								var rec = grid.getStore().getAt(rowIndex);
								var viewport = grid.up('viewport'), center = viewport
										.down('center'), id = 'book_detail_'
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
										id : 'book_detail_' + rec.data.url,
										title : rec.data.text
												.substr(rec.data.text
														.indexOf("-")
														+ 1)
												+ '科目汇总'
									}).show();
									viewport.doLayout();
								}
							}
						}, {
							tooltip : '明细查询',
							handler : function(grid, rowIndex, colIndex) {
								var rec = grid.getStore().getAt(rowIndex);
								var viewport = grid.up('viewport'), center = viewport
										.down('center'), id = 'book_hist_'
										+ rec.data.url, cmp = Ext.getCmp(id);
								if (cmp) {
									center.setActiveTab(cmp);
								} else {
									center.add({
										closable : true,
										xtype : 'panel',
										items : {
											xtype : 'book_hist_' + rec.data.url
										},
										id : 'book_hist_' + rec.data.url,
										title : rec.data.text
												.substr(rec.data.text
														.indexOf("-")
														+ 1)
												+ '科目明细查询'
									}).show();
									viewport.doLayout();
								}
							},
							getClass : function(v, meta, rec) {
								if (rec.data.url) {
									return 'history';
								} else {
									return 'hide';
								}
							},
							isDisabled : function(view, rowIdx, colIdx, item,
									record) {
								return !record.data.url;
							}
						}]
					}]
		});
		this.callParent(arguments);
	}
});
