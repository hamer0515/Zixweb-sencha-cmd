Ext.define('overrides.Treepanel', {
	override : 'Ext.tree.Panel',
	listeners : {
		itemcollapse : function(node, eOpts) {
			if (!node.leaf) {
				node.collapseChildren(true);
			}
		},
		containercontextmenu : function(panel, e, eOpts) {
			e.stopEvent();
			Ext.create('Ext.menu.Menu', {
						items : [Ext.create('Ext.Action', {
											text : '展开所有',
											handler : function(widget, event) {
												panel.up('treepanel')
														.expandAll();
											}
										}), Ext.create('Ext.Action', {
											text : '折叠所有',
											handler : function(widget, event) {
												panel.up('treepanel')
														.collapseAll();
											}
										}), Ext.create('Ext.Action', {
											text : '刷新数据',
											handler : function(widget, event) {
												panel.up('treepanel').store
														.reload();
											}
										})]
					}).showAt(e.getXY());
			return false;
		}
	},
	viewConfig : {
		loadMask : true,
		listeners : {
			itemcontextmenu : function(view, rec, node, index, e) {
				e.stopEvent();
				Ext.create('Ext.menu.Menu', {
					items : [Ext.create('Ext.Action', {
										// icon :
										// '../shared/icons/fam/delete.gif',
										text : '展开所有',
										handler : function(widget, event) {
											view.up('treepanel').expandAll();
										}
									}), Ext.create('Ext.Action', {
										// icon :
										// '../shared/icons/fam/delete.gif',
										text : '折叠所有',
										handler : function(widget, event) {
											view.up('treepanel').collapseAll();
										}
									}), Ext.create('Ext.Action', {
										text : '刷新数据',
										handler : function(widget, event) {
											view.up('treepanel').store.reload();
										}
									})]
				}).showAt(e.getXY());
				return false;
			}
		}
	}
});