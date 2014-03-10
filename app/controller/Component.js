Ext.define('Zixweb.controller.Component', {
			extend : 'Ext.app.Controller',
			stores : [/* 转义用数据集基类 */'CBase', 'acct', 'bfj_acct', 'bi', 'zyzj_acct',
					'Status', 'RStatus', 'MStatus', 'JStatus', 'zjbd_type', 'p',
					'YsType', 'ZQQRStatus', 'wlzj_type', 'fhw_type', 'fyp_acct', 'fhyd_acct',
					'fyw_type'],
			views : [
					// 基类
					'component.base.ComboBox', 'component.base.DateField', 'component.base.Money', 'component.base.MoneyField',
					'component.base.MyStore', 'component.base.Number', 'component.base.QueryForm', 'component.base.TextField', 
					
					// 帐套共有核算项
					'component.hsx.period',
					
					// 易宝支付核算项
					'component.hsx.acct', 'component.hsx.bfj_acct','component.hsx.bi', 'component.hsx.c',
					'component.hsx.cust_proto','component.hsx.e_date',
					'component.hsx.p','component.hsx.tx_date','component.hsx.wlzj_type', 'component.hsx.yw_type',
					'component.hsx.zjbd_date','component.hsx.zjbd_type','component.hsx.zyzj_acct',
					
					// 富汇易达核算项
					'component.hsx.f_agm', 'component.hsx.f_dcn', 'component.hsx.f_ssn',
					'component.hsx.fc', 'component.hsx.fcg_date', 'component.hsx.fch',
					'component.hsx.fe_date', 'component.hsx.fhw_type',
					'component.hsx.fhyd_acct', 'component.hsx.fm', 'component.hsx.fp', 'component.hsx.ftx_date',
					'component.hsx.fyp_acct', 'component.hsx.fyw_type',
					
					// 原始凭证控件
					'component.ts_revoke', 'component.revoke_user', 'component.flag',
					'component.period', 'component.j', 'component.d','component.crt_user',
					'component.ID', 'component.YSID', 
					'component.Status',
					'component.MStatus', 
					'component.SHStatus', 'component.SHType',
					'component.Books', 'component.YsType',
					'component.ZQQRStatus', 'component.HSX',
					'component.plugins.PageComboResizer', 
					'component.Fields', 'component.AcctStatus',
					'component.ExportBtn']

		});