Ext.define('Zixweb.store.bfj_acct', {
			extend : 'Zixweb.store.CBase',

			proxy : {
				type : 'ajax',
				url : 'base/bfjacct'
			}
		});