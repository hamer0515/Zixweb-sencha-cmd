Ext.define('Zixweb.store.component.FhwType', {
			extend : 'Ext.data.Store',
			fields : ['id', 'name'],

			proxy : {
				type : 'ajax',
				url : 'base/fhwtype'
			}
		});
