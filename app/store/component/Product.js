Ext.define('Zixweb.store.component.Product', {
			extend : 'Ext.data.Store',
			fields : ['id', 'name'],

			proxy : {
				type : 'ajax',
				url : 'base/product'
			}
		});