Ext.define('Zixweb.view.component.Acct', {
			extend : 'Zixweb.view.component.ComboBox',
			alias : 'widget.acct',
			name : 'acct',
			margin : '0 10 0 0',
			fieldLabel : '资金账号， 包括自有资金与备付金账号',
			_url : 'base/account'
		});
