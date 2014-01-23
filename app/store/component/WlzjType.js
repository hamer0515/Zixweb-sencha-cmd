Ext.define('Zixweb.store.component.WlzjType', {
			extend : 'Ext.data.Store',
			fields : ['id', 'name'],

			proxy : {
				type : 'ajax',
				url : 'base/wlzjtype'
			}
		});
