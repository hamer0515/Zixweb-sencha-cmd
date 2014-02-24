Ext.define('Zixweb.store.component.Bi', {
			extend : 'Zixweb.store.component.CBase',

			proxy : {
				type : 'ajax',
				url : 'base/bi_dict'
			}

		});