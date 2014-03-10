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
						.getCmp(id), url = rec.data.url, cls;
				if (cmp) {
					center.setActiveTab(cmp);
				} else {
					// 原始凭证查询
					if (/^yF?\d{4}$/.test(url)) {
						cls = Ext.ClassManager.getNameByAlias('widget.'
								+ rec.data.url);
						if (cls) {
							cmp = Ext.create(cls);
						} else {
							cls = 'Zixweb.view.yspz.' + rec.data.url;
							Ext.asyncRequest('base/yspz_fields', {
										id : 'yspz_' + url.substr(1)
									}, function(response) {
										Ext.define(cls, {
											extend : 'Zixweb.view.yspz.Panel',
											_fields : Ext
													.decode(response.responseText)
										});
										cmp = Ext.create(cls);
									});
						}
					} else {
						cmp = Ext.widget(url);
					}
					// try {
					//
					// } catch (e) {
					// if (!isYspz) {
					// throw e;
					// } else {
					// Ext.asyncRequest('/base/yspz_fields', {
					// id : 'yspz_' + url.substr(1)
					// }, function(response) {
					// Ext.define(cls, {
					// extend : 'Zixweb.view.yspz.Panel',
					// _fields : Ext
					// .decode(response.responseText)
					// });
					// cmp = Ext.create(cls);
					// });
					// }
					// }
					center.add({
								closable : true,
								xtype : 'panel',
								items : cmp,
								id : id,
								title : rec.data.text
							}).show();
				}
			}
		});
		me.callParent(arguments);
	}
});