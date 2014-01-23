Ext.define('Zixweb.store.component.ZjbdType', {
			extend : 'Ext.data.Store',
			fields : ['id', 'name'],

			proxy : {
				type : 'ajax',
				url : 'base/zjbdtype'
			}
		});