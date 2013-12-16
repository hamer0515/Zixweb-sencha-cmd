Ext.define('Zixweb.controller.Component', {
			extend : 'Ext.app.Controller',
			stores : ['component.Acct', 'component.BfjAcct', 'component.Bi',
					'component.ZyzjAcct', 'component.Status',
					'component.MStatus', 'component.JStatus',
					'component.ZjbdType', 'component.Product',
					'component.YsType', 'component.ZQQRStatus',
					'component.WlzjType', 'component.FhwType',
					'component.FypAcct', 'component.FhydAcct',
					'component.FywType'],
			views : ['component.Acct', 'component.BfjAcct', 'component.Bi',
					'component.ZyzjAcct', 'component.Status',
					'component.RStatus', 'component.MStatus',
					'component.ZjbdType', 'component.SHStatus',
					'component.SHType', 'component.Books', 'component.Product',
					'component.YsType', 'component.ZQQRStatus',
					'component.HSX', 'component.WlzjType', 'component.FhwType',
					'component.FypAcct', 'component.FhydAcct',
					'component.FywType', 'component.YsTypeF',
					'component.plugins.PageComboResizer', 'component.Money',
					'component.Fields', 'component.AcctStatus']

		});