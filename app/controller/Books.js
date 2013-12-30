Ext.define('Zixweb.controller.Books', {
			extend : 'Ext.app.Controller',
			views : ['book.AllBooks', 'book.ZyzjBooks', 'book.BfjBooks',
					'book.FhydBooks', 'book.hist.deposit_bfj',
					'book.hist.income_cfee', 'book.hist.income_in',
					'book.hist.cost_bfee', 'book.hist.cost_dfss',
					'book.hist.cost_bfee_zg', 'book.hist.cost_in',
					'book.hist.income_zhlx', 'book.hist.fee_jrjg',
					'book.hist.txamt_yhyf', 'book.hist.bamt_yhyf',
					'book.hist.bfee_yhyf', 'book.hist.txamt_dqr_byf',
					'book.hist.bfj_cust', 'book.hist.deposit_zyzj',
					'book.hist.txamt_dgd', 'book.hist.txamt_yhys',
					'book.hist.bamt_yhys', 'book.hist.bfee_yhys',
					'book.hist.blc', 'book.hist.blc_zyzj',
					'book.hist.bfee_cwwf', 'book.hist.bfee_zqqr_zg',
					'book.hist.bfee_zqqr', 'book.hist.txamt_dqr_oyf',
					'book.hist.cfee_dqhf', 'book.hist.lfee_psp',
					'book.hist.bsc', 'book.hist.bsc_zyzj', 'book.hist.bfee_rb',
					'book.hist.txamt_dqr_oys', 'book.hist.wlzj_ysbf',
					'book.hist.wlzj_yszy', 'book.hist.wlzj_yfbf',
					'book.hist.wlzj_yfzy', 'book.hist.adjust_qc',
					'book.hist.income_add', 'book.hist.bsc_jf',
					'fhydbook.hist.deposit_fhyd', 'fhydbook.hist.camt_fhyd',
					'fhydbook.hist.ypsc_fhyd', 'fhydbook.hist.camt_dgd_fhyd',
					'fhydbook.hist.yp_acct_fhyd',
					'fhydbook.hist.yufamt_ch_fhyd',
					'fhydbook.hist.nctxamt_dqr_oys_fhyd',
					'fhydbook.hist.tctxamt_dqr_oys_fhyd',
					'fhydbook.hist.cost_fee_fhyd',
					'fhydbook.hist.cost_ncss_fhyd', 'fhydbook.hist.ckrsp_fhyd',
					'fhydbook.hist.yplc_fhyd', 'fhydbook.hist.yfamt_m_fhyd',
					'fhydbook.hist.chamt_dgd_fhyd',
					'fhydbook.hist.yfamt_ch_fhyd',
					'fhydbook.hist.yfamt_dcch_fhyd',
					'fhydbook.hist.yusamt_c_fhyd',
					'fhydbook.hist.nctxamt_dqr_oyf_fhyd',
					'fhydbook.hist.tctxamt_dqr_oyf_fhyd',
					'fhydbook.hist.cost_tcss_fhyd',
					'fhydbook.hist.cost_dcch_fhyd',
					'fhydbook.hist.income_add_fhyd',
					'fhydbook.hist.income_main_fhyd',
					'fhydbook.detail.income_main_fhyd',
					'fhydbook.detail.income_add_fhyd',
					'fhydbook.detail.nctxamt_dqr_oys_fhyd',
					'fhydbook.detail.tctxamt_dqr_oys_fhyd',
					'fhydbook.detail.cost_fee_fhyd',
					'fhydbook.detail.cost_ncss_fhyd',
					'fhydbook.detail.ckrsp_fhyd', 'fhydbook.detail.yplc_fhyd',
					'fhydbook.detail.yfamt_m_fhyd',
					'fhydbook.detail.chamt_dgd_fhyd',
					'fhydbook.detail.yfamt_ch_fhyd',
					'fhydbook.detail.yfamt_dcch_fhyd',
					'fhydbook.detail.yusamt_c_fhyd',
					'fhydbook.detail.nctxamt_dqr_oyf_fhyd',
					'fhydbook.detail.tctxamt_dqr_oyf_fhyd',
					'fhydbook.detail.cost_tcss_fhyd',
					'fhydbook.detail.cost_dcch_fhyd', 'book.detail.bfee_rb',
					'book.detail.txamt_dqr_oys', 'book.detail.wlzj_ysbf',
					'book.detail.wlzj_yszy', 'book.detail.wlzj_yfbf',
					'book.detail.wlzj_yfzy', 'fhydbook.detail.deposit_fhyd',
					'fhydbook.detail.camt_fhyd', 'fhydbook.detail.ypsc_fhyd',
					'fhydbook.detail.camt_dgd_fhyd',
					'fhydbook.detail.yp_acct_fhyd',
					'fhydbook.detail.yufamt_ch_fhyd', 'book.detail.blc_zyzj',
					'book.detail.bfee_cwwf', 'book.detail.bfee_zqqr_zg',
					'book.detail.bfee_zqqr', 'book.detail.txamt_dqr_oyf',
					'book.detail.cfee_dqhf', 'book.detail.lfee_psp',
					'book.detail.bsc', 'book.detail.bsc_zyzj',
					'book.detail.deposit_bfj', 'book.detail.income_cfee',
					'book.detail.income_in', 'book.detail.cost_bfee',
					'book.detail.cost_dfss', 'book.detail.cost_bfee_zg',
					'book.detail.cost_in', 'book.detail.income_zhlx',
					'book.detail.fee_jrjg', 'book.detail.txamt_yhyf',
					'book.detail.bamt_yhyf', 'book.detail.bfee_yhyf',
					'book.detail.txamt_dqr_byf', 'book.detail.bfj_cust',
					'book.detail.deposit_zyzj', 'book.detail.txamt_dgd',
					'book.detail.txamt_yhys', 'book.detail.bamt_yhys',
					'book.detail.blc', 'book.detail.adjust_qc',
					'book.detail.income_add', 'book.detail.bsc_jf']
		});
