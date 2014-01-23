Ext.define('Zixweb.store.component.FywType', {
			extend : 'Ext.data.Store',
			fields : ['id', 'name'],

			proxy : {
				type : 'ajax',
				url : 'base/fywtype'
			}
		});
