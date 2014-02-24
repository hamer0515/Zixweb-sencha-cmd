Ext.define('Zixweb.Application', {
	name : 'Zixweb',
	minHeight : 768,
	minWidth : 1024,
	extend : 'Ext.app.Application',

	controllers : ['Login', 'Index', 'Component', 'Roles', 'Users', 'Routes',
			'Books', 'Pzlr', 'Task', 'Yspz', 'Zjdz', 'Zqqr', 'Jcsjwh'],

	launch : function() {
		columns = {
			book_detail_action : {
				xtype : 'actioncolumn',
				text : '操作',
				width : 80,
				align : 'center',
				items : [{
					tooltip : '详细',
					getClass : function(v, meta, rec) {
						return 'detail';
					},
					handler : function(grid, rowIndex, colIndex) {
						var rec = grid.getStore().getAt(rowIndex), center = grid
								.up('center'), id = 'yspzq_detail_'
								+ rec.data.ys_type + rec.data.ys_id, cmp = Ext
								.getCmp(id);

						if (cmp) {
							center.setActiveTab(cmp);
						} else {
							var yspzqdetail = Ext
									.createByAlias('widget.yspzqdetail');
							yspzqdetail.store.load({
										params : {
											ys_type : rec.data.ys_type,
											ys_id : rec.data.ys_id
										}
									});
							center.add({
								closable : true,
								xtype : 'panel',
								items : yspzqdetail,
								id : 'yspzq_detail_' + rec.data.ys_type
										+ rec.data.ys_id,
								title : '凭证' + rec.data.ys_type + '详细信息-'
										+ rec.data.ys_id
							}).show();
						}
					}
				}]
			},
			flag : {
				text : "撤销状态",
				dataIndex : 'flag',
				width : 80,
				renderer : Ext.data.StoreManager.lookup('component.RStatus').$render
			},
			id : {
				text : "ID",
				dataIndex : 'id',
				width : 80
			},
			group : {
				text : "组ID",
				dataIndex : 'group',
				width : 80
			},
			ys_type : {
				text : "凭证类型",
				dataIndex : 'ys_type',
				width : 80
			},
			acct : {
				text : "银行账户号",
				dataIndex : 'acct',
				renderer : Ext.data.StoreManager.lookup('component.Acct').$render,
				flex : 1
			},
			p : {
				text : "产品类型",
				dataIndex : 'p',
				renderer : Ext.data.StoreManager.lookup('component.Product').$render,
				flex : 1
			},
			fp : {
				text : "周期确认规则",
				dataIndex : 'fp',
				flex : 1
			},
			c : {
				text : "客户编号",
				dataIndex : 'c',
				flex : 1
			},
			cust_proto : {
				text : "客户协议编号",
				dataIndex : 'cust_proto',
				flex : 1
			},
			e_date : {
				text : "差错日期",
				dataIndex : 'e_date',
				flex : 1,
				renderer : Ext.util.Format.dateRenderer('Y年m月d日')
			},
			tx_date : {
				text : "交易日期",
				dataIndex : 'tx_date',
				flex : 1,
				renderer : Ext.util.Format.dateRenderer('Y年m月d日')
			},
			zjbd_date : {
				text : "资金变动日期",
				dataIndex : 'zjbd_date',
				flex : 1,
				renderer : Ext.util.Format.dateRenderer('Y年m月d日')
			},
			period : {
				text : "会计期间",
				dataIndex : 'period',
				flex : 1,
				renderer : Ext.util.Format.dateRenderer('Y年m月d日')
			},
			dz_date : {
				text : "对账日期",
				dataIndex : 'dz_date',
				flex : 1,
				renderer : Ext.util.Format.dateRenderer('Y年m月d日')
			},
			bi : {
				text : "银行接口编号",
				dataIndex : 'bi',
				renderer : Ext.data.StoreManager.lookup('component.Bi').$render,
				flex : 1
			},
			zyzj_acct : {
				text : "自有资金帐号",
				dataIndex : 'zyzj_acct',
				renderer : Ext.data.StoreManager.lookup('component.ZyzjAcct').$render,
				flex : 1
			},
			wlzj_type : {
				text : "往来类型",
				dataIndex : 'wlzj_type',
				renderer : Ext.data.StoreManager.lookup('component.WlzjType').$render,
				flex : 1
			},
			bfj_acct : {
				text : "备付金帐号",
				dataIndex : 'bfj_acct',
				renderer : Ext.data.StoreManager.lookup('component.BfjAcct').$render,
				flex : 1
			},
			zjbd_type : {
				text : "资金变动类型",
				dataIndex : 'zjbd_type',
				renderer : Ext.data.StoreManager.lookup('component.ZjbdType').$render,
				flex : 1
			},
			j : {
				text : "借方金额",
				dataIndex : 'j',
				flex : 1,
				renderer : function(value) {
					return Ext.util.Format.number(parseInt(value) / 100,
							'0,0.00');
				}
			},
			d : {
				text : "贷方金额",
				dataIndex : 'd',
				flex : 1,
				renderer : function(value) {
					return Ext.util.Format.number(parseInt(value) / 100,
							'0,0.00');
				}
			},
			blc : {
				text : "长款余额",
				dataIndex : 'blc',
				flex : 1,
				renderer : function(value) {
					return Ext.util.Format.number(parseInt(value) / 100,
							'0,0.00');
				}
			},
			bsc : {
				text : "短款余额",
				dataIndex : 'bsc',
				flex : 1,
				renderer : function(value) {
					return Ext.util.Format.number(parseInt(value) / 100,
							'0,0.00');
				}
			},
			fyw_type : {
				text : "业务类型",
				dataIndex : "fyw_type",
				renderer : Ext.data.StoreManager.lookup('component.FywType').$render,
				flex : 1
			},
			fc : {
				text : "客户编号",
				dataIndex : 'fc',
				flex : 1
			},
			f_dcn : {
				text : "代充通道编号",
				dataIndex : "f_dcn",
				flex : 1
			},
			f_rate : {
				text : "结算折扣率",
				dataIndex : 'f_rate',
				flex : 1
			},
			f_ssn : {
				text : "唯一销卡编号",
				dataIndex : 'f_ssn',
				flex : 1
			},
			fcg_date : {
				text : "商品采购日期",
				dataIndex : 'fcg_date',
				flex : 1,
				renderer : Ext.util.Format.dateRenderer('Y年m月d日')
			},
			fch_rate : {
				text : "渠道结算折扣率",
				dataIndex : 'fch_rate',
				flex : 1
			},
			fch_ssn : {
				text : "渠道方销卡编号",
				dataIndex : 'fch_ssn',
				flex : 1
			},
			fe_date : {
				text : "差错日期",
				dataIndex : 'fe_date',
				flex : 1,
				renderer : Ext.util.Format.dateRenderer('Y年m月d日')
			},
			fhyd_acct : {
				text : "富汇易达账号",
				dataIndex : 'fhyd_acct',
				renderer : Ext.data.StoreManager.lookup('component.FhydAcct').$render,
				flex : 1
			},
			fio_date : {
				text : "易宝出入账日期",
				dataIndex : 'fio_date',
				flex : 1,
				renderer : Ext.util.Format.dateRenderer('Y年m月d日')
			},
			fm : {
				text : "商户编号",
				dataIndex : 'fm',
				flex : 1
			},
			fs_rate : {
				text : "销卡结算折扣率",
				dataIndex : "fs_rate",
				flex : 1
			},
			ftx_date : {
				text : "交易日期",
				dataIndex : 'ftx_date',
				flex : 1,
				renderer : Ext.util.Format.dateRenderer('Y年m月d日')
			},
			fyp_acct : {
				text : "富汇易达账号",
				dataIndex : 'fyp_acct',
				renderer : Ext.data.StoreManager.lookup('component.FypAcct').$render,
				flex : 1
			},
			fhw_type : {
				text : "货物类型",
				dataIndex : 'fhw_type',
				renderer : Ext.data.StoreManager.lookup('component.FhwType').$render,
				flex : 1
			}
		};
		Ext.apply(Ext, {
					columns : columns
				});
	}

});
