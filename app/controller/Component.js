Ext.define('Zixweb.controller.Component', {
			extend : 'Ext.app.Controller',
			stores : ['Zixweb.store.component.Acct',
					'Zixweb.store.component.BfjAcct',
					'Zixweb.store.component.Bi',
					'Zixweb.store.component.ZyzjAcct',
					'Zixweb.store.component.Status',
					'Zixweb.store.component.MStatus',
					'Zixweb.store.component.JStatus',
					'Zixweb.store.component.ZjbdType',
					'Zixweb.store.component.Books',
					'Zixweb.store.component.Product',
					'Zixweb.store.component.YsType',
					'Zixweb.store.component.ZQQRStatus'],
			views : ['Zixweb.view.component.Acct',
					'Zixweb.view.component.BfjAcct',
					'Zixweb.view.component.Bi',
					'Zixweb.view.component.ZyzjAcct',
					'Zixweb.view.component.Status',
					'Zixweb.view.component.MStatus',
					'Zixweb.view.component.ZjbdType',
					'Zixweb.view.component.SHStatus',
					'Zixweb.view.component.SHType',
					'Zixweb.view.component.Books',
					'Zixweb.view.component.Product',
					'Zixweb.view.component.YsType',
					'Zixweb.view.component.ZQQRStatus',
					'Zixweb.view.component.HSX'],

			init : function() {
			}

		});