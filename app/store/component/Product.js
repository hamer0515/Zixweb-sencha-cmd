Ext.define('Zixweb.store.component.Product', {
			extend : 'Zixweb.store.component.CBase',

			proxy : {
				type : 'ajax',
				url : 'base/product'
			}
		});