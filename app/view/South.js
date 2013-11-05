Ext.define('Zixweb.view.South', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.south',
	layout : 'fit',
	autoShow : true,

	initComponent : function() {
		this.items = {
			xtype : 'displayfield',
			value : "<center>Copyright © 2013 YeePay.com All rights reserved. <center>"
		};
		this.callParent(arguments);
	}
});