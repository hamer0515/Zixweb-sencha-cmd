Ext.define('Zixweb.view.Panel', {
	extend : 'Ext.panel.Panel',
	/*
	 * _columns(object):科目汇总时候需要的列
	 * _gcolumns(array):科目初始化时候需要的列（科目汇总查询时为初始化的列定义，其他为grid列定义）
	 * _url:数据集和excel导出的url _items:表单元素的items hasExportBtn:是否有导出按钮
	 * _fields:数据集的列定义
	 * 
	 */

	initComponent : function() {
		var me = this, columns = me._columns, gcolumns = me._gcolumns, items = me._items, fields = me._fields, url = me._url, form, exportBtn, store, grid;
		// 判断有没有表格
		if (gcolumns) {
			grid = new Ext.grid.Panel({
						// 創建表格數據集
						store : store = Ext.create('widget.mystore', {
									_columns : columns,
									fields : fields,
									proxy : {
										type : 'ajax',
										api : {
											read : url
										},
										reader : {
											type : 'json',
											root : 'data',
											totalProperty : 'totalCount',
											successProperty : 'success'
										}
									}
								}),
						columns : gcolumns
					});
			// 添加底部分页工具栏
			grid.addDocked({
						xtype : 'pagingtoolbar',
						store : store,
						dock : 'bottom'
					});
			// 数据集中添加表格的引用
			Ext.apply(store, {
						_grid : grid
					});
		}
		// 有沒有表單
		if (items) {
			// 有没有导出excel按钮
			if (me.hasExporBtn) {
				exportBtn = Ext.create('widget.exportbtn', {
							_url : url + '_excel',
							_grid : grid,
							_widget : me.exportMode,
							_bid : me.bid
						});
				Ext.apply(store, {
							_exportBtn : exportBtn
						});
			};
			items.push({
						xtype : 'button',
						text : '查询',
						margin : '0 20 0 0',
						handler : function() {
							if (form.getForm().isValid()) {
								store.proxy.extraParams = form.getForm()
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
					}, exportBtn)
			form = Ext.create('widget.queryform', {
						items : items
					});
			Ext.apply(store, {
						_form : form
					});
		}
		me.items = [form, grid];
		me.callParent(arguments);
	}
});
