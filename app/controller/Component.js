Ext.define('Zixweb.controller.Component', {
			extend : 'Ext.app.Controller',
			stores : [/* 转义用数据集基类 */'component.CBase', 'component.Acct',
					'component.BfjAcct', 'component.Bi', 'component.ZyzjAcct',
					'component.Status', 'component.RStatus',
					'component.MStatus', 'component.JStatus',
					'component.ZjbdType', 'component.Product',
					'component.YsType', 'component.ZQQRStatus',
					'component.WlzjType', 'component.FhwType',
					'component.FypAcct', 'component.FhydAcct',
					'component.FywType'],
			views : [
					// 富汇易达核算项
					'component.FAgm', 'component.FDcn', 'component.FSsn',
					'component.Fc', 'component.FcgDate', 'component.Fch',
					'component.FeDate', 'component.FhwType',
					'component.FhydAcct', 'component.Fm', 'component.FtxDate',
					'component.FypAcct', 'component.FywType',

					'component.Period_', 'component.J_Amt', 'component.D_Amt',
					'component.ID', 'component.YSID', 'component.Acct',
					'component.BfjAcct', 'component.Bi', 'component.ZyzjAcct',
					'component.Status', 'component.RStatus',
					'component.MStatus', 'component.ZjbdType',
					'component.SHStatus', 'component.SHType',
					'component.Books', 'component.Product', 'component.YsType',
					'component.ZQQRStatus', 'component.HSX',
					'component.WlzjType', 'component.YsTypeF',
					'component.plugins.PageComboResizer', 'component.Money',
					'component.Fields', 'component.AcctStatus',
					'component.ExportBtn', 'component.MyStore',
					'component.QueryForm', 'component.Period']

		});