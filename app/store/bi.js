Ext.define('Zixweb.store.bi', {
			extend : 'Zixweb.store.CBase',

			proxy : {
				type : 'ajax',
				url : 'base/bi_dict'
			}

		});