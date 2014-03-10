Ext.define('Zixweb.store.p', {
			extend : 'Zixweb.store.CBase',

			proxy : {
				type : 'ajax',
				url : 'base/product'
			}
		});