Ext.define('Zixweb.controller.Books', {
			extend : 'Ext.app.Controller',
			views : ['book.BookPanel', 'book.DetailPanel', 'book.SumPanel',
					'book.AllBooks', 'book.ZyzjBooks', 'book.BfjBooks',
					'book.FhydBooks'

			// yeepay科目

			// 'book.detail.adjust_qc',
			//
			// 'book.detail.bamt_yhyf',
			//
			// 'book.detail.bamt_yhys',
			//
			// 'book.detail.bfee_cwwf',
			//
			// 'book.detail.bfee_rb',
			//
			// 'book.detail.bfee_yhyf',
			//
			// 'book.detail.bfee_yhys',
			//
			// 'book.detail.bfee_zqqr',
			//
			// 'book.detail.bfee_zqqr_zg',
			//
			// 'book.detail.bfj_cust',
			//
			// 'book.detail.blc',
			//
			// 'book.detail.blc_zyzj',
			//
			// 'book.detail.bsc',
			//
			// 'book.detail.bsc_jf',
			//
			// 'book.detail.bsc_zyzj',
			//
			// 'book.detail.cfee_dqhf',
			//
			// 'book.detail.cost_bfee',
			//
			// 'book.detail.cost_bfee_zg',
			//
			// 'book.detail.cost_dfss',
			//
			// 'book.detail.cost_in',
			// //
			// 'book.detail.deposit_bfj',
			//
			// 'book.detail.deposit_zyzj',
			//
			// 'book.detail.fee_jrjg',
			//
			// 'book.detail.income_add',
			//
			// 'book.detail.income_cfee',
			//
			// 'book.detail.income_in',
			//
			// 'book.detail.income_zhlx',
			//
			// 'book.detail.lfee_psp',
			//
			// 'book.detail.txamt_dgd',
			//
			// 'book.detail.txamt_dqr_byf',
			//
			// 'book.detail.txamt_dqr_oyf',
			//
			// 'book.detail.txamt_dqr_oys',
			//
			// 'book.detail.txamt_yhyf',
			//
			// 'book.detail.txamt_yhys',
			//
			// 'book.detail.wlzj_yfbf',
			//
			// 'book.detail.wlzj_yfzy',
			//
			// 'book.detail.wlzj_ysbf',
			//
			// 'book.detail.wlzj_yszy',

			// 富汇易达
			// 'fhydbook.hist.camt_dgd_fhyd',
			// 'fhydbook.detail.camt_dgd_fhyd',
			// 'fhydbook.hist.camt_fhyd', 'fhydbook.detail.camt_fhyd',
			// 'fhydbook.hist.chamt_dgd_fhyd',
			// 'fhydbook.detail.chamt_dgd_fhyd',
			// 'fhydbook.hist.cjgj_fhyd',
			// 'fhydbook.detail.cjgj_fhyd',
			// 'fhydbook.hist.ckrsp_fhyd', 'fhydbook.detail.ckrsp_fhyd',
			// 'fhydbook.hist.cost_add_fhyd',
			// 'fhydbook.detail.cost_add_fhyd',
			// 'fhydbook.hist.cost_dcch_fhyd',
			// 'fhydbook.detail.cost_dcch_fhyd',
			// 'fhydbook.hist.cost_fee_fhyd',
			// 'fhydbook.detail.cost_fee_fhyd',
			// 'fhydbook.hist.cost_ncss_fhyd',
			// 'fhydbook.detail.cost_ncss_fhyd',
			// 'fhydbook.hist.cost_tcss_fhyd',
			// 'fhydbook.detail.cost_tcss_fhyd',
			// 'fhydbook.hist.deposit_fhyd',
			// 'fhydbook.detail.deposit_fhyd',
			// 'fhydbook.hist.income_add_fhyd',
			// 'fhydbook.detail.income_add_fhyd',
			// 'fhydbook.hist.income_main_fhyd',
			// 'fhydbook.detail.income_main_fhyd',
			// 'fhydbook.hist.nctxamt_dqr_oyf_fhyd',
			// 'fhydbook.detail.nctxamt_dqr_oyf_fhyd',
			// 'fhydbook.hist.nctxamt_dqr_oys_fhyd',
			// 'fhydbook.detail.nctxamt_dqr_oys_fhyd',
			// 'fhydbook.hist.oyf_nctxamt_dqr_fhyd',
			// 'fhydbook.detail.oyf_nctxamt_dqr_fhyd',
			// 'fhydbook.hist.oyf_tctxamt_dqr_fhyd',
			// 'fhydbook.detail.oyf_tctxamt_dqr_fhyd',
			// 'fhydbook.hist.oys_nctxamt_dqr_fhyd',
			// 'fhydbook.detail.oys_nctxamt_dqr_fhyd',
			// 'fhydbook.hist.oys_tctxamt_dqr_fhyd',
			// 'fhydbook.detail.oys_tctxamt_dqr_fhyd',
			// 'fhydbook.hist.qdlc_fhyd', 'fhydbook.detail.qdlc_fhyd',
			// 'fhydbook.hist.qdsc_fhyd', 'fhydbook.detail.qdsc_fhyd',
			// 'fhydbook.hist.tctxamt_dqr_oyf_fhyd',
			// 'fhydbook.detail.tctxamt_dqr_oyf_fhyd',
			// 'fhydbook.hist.tctxamt_dqr_oys_fhyd',
			// 'fhydbook.detail.tctxamt_dqr_oys_fhyd',
			// 'fhydbook.hist.tkhd_fhyd', 'fhydbook.detail.tkhd_fhyd',
			// 'fhydbook.hist.wlzj_fhyd', 'fhydbook.detail.wlzj_fhyd',
			// 'fhydbook.hist.yfamt_ch_dgd_fhyd',
			// 'fhydbook.detail.yfamt_ch_dgd_fhyd',
			// 'fhydbook.hist.yfamt_ch_fhyd',
			// 'fhydbook.detail.yfamt_ch_fhyd',
			// 'fhydbook.hist.yfamt_ckrsp_fhyd',
			// 'fhydbook.detail.yfamt_ckrsp_fhyd',
			// 'fhydbook.hist.yfamt_dcch_fhyd',
			// 'fhydbook.detail.yfamt_dcch_fhyd',
			// 'fhydbook.hist.yfamt_m_fhyd',
			// 'fhydbook.detail.yfamt_m_fhyd',
			// 'fhydbook.hist.yfamt_qdlc_fhyd',
			// 'fhydbook.detail.yfamt_qdlc_fhyd',
			// 'fhydbook.hist.yfamt_yplc_fhyd',
			// 'fhydbook.detail.yfamt_yplc_fhyd',
			// 'fhydbook.hist.yplc_fhyd', 'fhydbook.detail.yplc_fhyd',
			// 'fhydbook.hist.ypsc_fhyd', 'fhydbook.detail.ypsc_fhyd',
			// 'fhydbook.hist.yp_acct_fhyd',
			// 'fhydbook.detail.yp_acct_fhyd',
			// 'fhydbook.hist.ysamt_c_dgd_fhyd',
			// 'fhydbook.detail.ysamt_c_dgd_fhyd',
			// 'fhydbook.hist.ysamt_c_fhyd',
			// 'fhydbook.detail.ysamt_c_fhyd',
			// 'fhydbook.hist.ysamt_qdsc_fhyd',
			// 'fhydbook.detail.ysamt_qdsc_fhyd',
			// 'fhydbook.hist.ysamt_ypsc_fhyd',
			// 'fhydbook.detail.ysamt_ypsc_fhyd'
			// 'fhydbook.hist.yufamt_ch_fhyd', 'fhydbook.detail.yufamt_ch_fhyd',
			// 'fhydbook.hist.yufamt_yp_fhyd', 'fhydbook.detail.yufamt_yp_fhyd',
			// 'fhydbook.hist.yusamt_c_fhyd', 'fhydbook.detail.yusamt_c_fhyd'
			]
		});
