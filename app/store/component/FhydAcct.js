Ext.define('Zixweb.store.component.FhydAcct', {
			extend : 'Ext.data.Store',
			fields : ['id', 'name'],

			proxy : {
				type : 'ajax',
				url : 'base/fhydacct'
			}
		});
