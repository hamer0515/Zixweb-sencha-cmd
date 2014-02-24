Ext.define('Zixweb.view.West', {
	extend : 'Ext.tree.Panel',
	alias : 'widget.west',
	width : 200,
	autoShow : true,
	disableSelection : true,
	rootVisible : false,
	cls : 'x-unselectable',
	collapseMode : 'header',

	initComponent : function() {
		var me = this;
		me.store = new Ext.data.TreeStore({
					fields : ['text', 'url'],

					autoLoad : true,

					proxy : {
						type : 'ajax',
						url : 'login/menu'
					}
				});
		me.on("itemclick", function(view, rec) {
			if (rec.data.leaf) {
				var viewport = view.up('viewport'), center = viewport
						.down('center'), id = 'center_' + rec.data.url, cmp = Ext
						.getCmp(id);
				if (cmp) {
					center.setActiveTab(cmp);
				} else {
					center.add({
								closable : true,
								xtype : 'panel',
								items : {
									xtype : rec.data.url
								},
								id : id,
								title : rec.data.text
							}).show();
				}
			}
		}, me);
		me.callParent(arguments);
	}
});