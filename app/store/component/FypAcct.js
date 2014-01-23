Ext.define('Zixweb.store.component.FypAcct', {
			extend : 'Ext.data.Store',
			fields : ['id', 'name'],

			proxy : {
				type : 'ajax',
				url : 'base/fypacct'
			}
		});
