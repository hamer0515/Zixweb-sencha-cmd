Ext.define('Zixweb.store.acct', {
			extend : 'Zixweb.store.CBase',

			proxy : {
				type : 'ajax',
				url : 'base/account'
			}

		});