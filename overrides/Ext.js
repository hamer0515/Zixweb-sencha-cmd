Ext.define('overrides.Ext', {
	override : 'Ext',
	downloadURL : function(url) {
		var hiddenIFrameID = 'hiddenDownloader', iframe = document
				.getElementById(hiddenIFrameID);
		if (iframe === null) {
			iframe = document.createElement('iframe');
			iframe.id = hiddenIFrameID;
			iframe.style.display = 'none';
			document.body.appendChild(iframe);
		}
		iframe.src = url;
	},
	hsx : ['fir', 'sec', 'thi', 'fou', 'fiv', 'six', 'sev', 'eig'],
	columns : {
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
					var rec = grid.getStore().getAt(rowIndex);
					var viewport = grid.up('viewport'), center = viewport
							.down('center'), id = 'yspzq_detail_'
							+ rec.data.ys_type + rec.data.ys_id, cmp = Ext
							.getCmp(id);
					var yspzqdetail = Ext.createByAlias('widget.yspzqdetail');
					yspzqdetail.store.load({
								params : {
									ys_type : rec.data.ys_type,
									ys_id : rec.data.ys_id
								}
							});
					if (cmp) {
						center.setActiveTab(cmp);
					} else {
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
		id : {
			text : "ID",
			dataIndex : 'id',
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
			renderer : function(value, meta, record) {
				var acct = Ext.data.StoreManager.lookup('component.Acct');
				var index = acct.findExact('id', value);
				if (index == -1) {
					meta.style = 'color:red';
				}
				return index == -1
						? '无效的数据(' + value + ')'
						: acct.getAt(index).data.name;
			},
			flex : 1
		},
		p : {
			text : "产品类型",
			dataIndex : 'p',
			renderer : function(value, meta, record) {
				var product = Ext.data.StoreManager.lookup('component.Product');
				var index = product.findExact('id', value);
				if (index == -1) {
					meta.style = 'color:red';
				}
				return index == -1 ? '无效的数据(' + value + ')' : product
						.getAt(index).data.name;
			},
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
		bi : {
			text : "银行接口编号",
			dataIndex : 'bi',
			renderer : function(value, meta, record) {
				var bi = Ext.data.StoreManager.lookup('component.Bi');
				var index = bi.findExact('id', value);
				if (index == -1) {
					meta.style = 'color:red';
				}
				return index == -1
						? '无效的数据(' + value + ')'
						: bi.getAt(index).data.name;
			},
			flex : 1
		},
		zyzj_acct : {
			text : "自有资金帐号",
			dataIndex : 'zyzj_acct',
			renderer : function(value, meta, record) {
				var zyzjacct = Ext.data.StoreManager
						.lookup('component.ZyzjAcct');
				var index = zyzjacct.findExact('id', value);
				if (index == -1) {
					meta.style = 'color:red';
				}
				return index == -1 ? '无效的数据(' + value + ')' : zyzjacct
						.getAt(index).data.name;
			},
			flex : 1
		},
		wlzj_type : {
			text : "往来类型",
			dataIndex : 'wlzj_type',
			renderer : function(value, meta, record) {
				var wlzjtype = Ext.data.StoreManager
						.lookup('component.WlzjType');
				var index = wlzjtype.findExact('id', value);
				if (index == -1) {
					meta.style = 'color:red';
				}
				return index == -1 ? '无效的数据(' + value + ')' : wlzjtype
						.getAt(index).data.name;
			},
			flex : 1
		},
		bfj_acct : {
			text : "备付金帐号",
			dataIndex : 'bfj_acct',
			renderer : function(value, meta, record) {
				var bfjacct = Ext.data.StoreManager.lookup('component.BfjAcct');
				var index = bfjacct.findExact('id', value);
				if (index == -1) {
					meta.style = 'color:red';
				}
				return index == -1 ? '无效的数据(' + value + ')' : bfjacct
						.getAt(index).data.name;
			},
			flex : 1
		},
		zjbd_type : {
			text : "资金变动类型",
			dataIndex : 'zjbd_type',
			renderer : function(value, meta, record) {
				var zjbdtype = Ext.data.StoreManager
						.lookup('component.ZjbdType');
				var index = zjbdtype.findExact('id', value);
				if (index == -1) {
					meta.style = 'color:red';
				}
				return index == -1 ? '无效的数据(' + value + ')' : zjbdtype
						.getAt(index).data.name;
			},
			flex : 1
		},
		j : {
			text : "借方金额",
			dataIndex : 'j',
			flex : 1,
			renderer : function(value) {
				return Ext.util.Format.number(parseInt(value) / 100, '0,0.00');
			}
		},
		d : {
			text : "贷方金额",
			dataIndex : 'd',
			flex : 1,
			renderer : function(value) {
				return Ext.util.Format.number(parseInt(value) / 100, '0,0.00');
			}
		}
	}
});