Ext.define('Zixweb.store.component.Acct', {
			extend : 'Zixweb.store.component.CBase',

			proxy : {
				type : 'ajax',
				url : 'base/account'
			}

		});