Ext.define('Zixweb.store.component.Routes', {
			extend : 'Ext.data.TreeStore',
			fields : ['text', 'route_id'],
			proxy : {
				type : 'ajax',
				url : 'base/routes'
			}
		});