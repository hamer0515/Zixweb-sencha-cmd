Ext.define('Zixweb.store.component.YsType', {
			extend : 'Ext.data.Store',
			fields : ['id', 'name'],

			proxy : {
				type : 'ajax',
				url : 'base/ystype'
			}
		});