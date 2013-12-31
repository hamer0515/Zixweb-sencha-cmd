Ext.define('Zixweb.view.yspz.yspzq.y0091', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.y0091',
	prefix : 'yspzq_y0091',
	url : 'y0091',

	defaults : {
		border : false
	},

	initComponent : function() {
		var panel = this;

		var store = new Ext.data.Store({
					fields : ['id', 'bi', 'bfj_acct_bj', 'clear_date',
							'tx_amt', 'flag', 'period'],

					pageSize : 50,
					remoteSort : true,

					proxy : {
						type : 'ajax',
						api : {
							read : 'yspzq/' + panel.url
						},
						reader : {
							type : 'json',
							root : 'data',
							totalProperty : 'totalCount',
							successProperty : 'success'
						}
					},
					listeners : {
						beforeload : function(store, operation, eOpts) {

							var form = Ext.getCmp(panel.prefix + '_form')
									.getForm();
							if (form.isValid()) {
								store.proxy.extraParams = form.getValues();
							} else {
								return false;
							}
						},
						load : function(thiz, records, successful, eOpts) {
							if (!successful) {
								Ext.MessageBox.show({
											title : '警告',
											msg : '原始凭证0091数据加载失败,请联系管理员',
											buttons : Ext.Msg.YES,
											icon : Ext.Msg.ERROR
										});
								return;
							}
							var jsonData = thiz.proxy.reader.jsonData.success;
							if (jsonData && jsonData === 'forbidden') {
								Ext.MessageBox.show({
											title : '警告',
											msg : '抱歉，没有原始凭证0091数据访问权限',
											buttons : Ext.Msg.YES,
											icon : Ext.Msg.ERROR
										});
							}
						}
					}
				});
		this.items = [{
			xtype : 'form',
			title : '查询',
			id : panel.prefix + '_form',
			collapsible : true,
			bodyPadding : 5,

			fieldDefaults : {
				labelWidth : 140
			},
			items : [{
						xtype : 'fieldcontainer',
						layout : 'hbox',
						items : [{
									xtype : 'textfield',
									fieldLabel : 'ID',
									width : 516,
									name : 'id',
									margin : '0 10 0 0',
									vtype : "id"
								}, {
									xtype : 'fieldcontainer',
									fieldLabel : '银行清算日期',
									layout : 'hbox',
									items : [{
												xtype : 'datefield',
												format : 'Y-m-d',
												name : 'clear_date_from',
												margin : '0 10 0 0',
												width : 180
											}, {
												xtype : 'datefield',
												format : 'Y-m-d',
												name : 'clear_date_to',
												width : 180
											}]
								}]
					}, {
						xtype : 'fieldcontainer',
						layout : 'hbox',
						items : [{
									xtype : 'bfjacct',
									fieldLabel : '本金备付金银行账号',
									margin : '0 10 0 0',
									name : 'bfj_acct_bj'
								}, {
									xtype : 'bi',
									fieldLabel : '银行接口编号',
									width : 516,
									name : 'bi'
								}]
					}, {
						xtype : 'fieldcontainer',
						layout : 'hbox',
						items : [{
									xtype : 'rstatus',
									fieldLabel : '撤销状态',
									margin : '0 10 0 0',
									name : 'flag'
								}, {
									xtype : 'textfield',
									fieldLabel : '撤销者',
									width : 516,
									name : 'revoke_user'
								}]
					}, {
						xtype : 'fieldcontainer',
						fieldLabel : '会计期间',
						layout : 'hbox',
						items : [{
									xtype : 'datefield',
									format : 'Y-m-d',
									name : 'period_from',
									margin : '0 10 0 0',
									allowBlank : false,
									verify : {
										id : panel.prefix + '_period_to'
									},
									vtype : 'dateinterval',
									width : 180
								}, {
									xtype : 'datefield',
									id : panel.prefix + '_period_to',
									format : 'Y-m-d',
									name : 'period_to',
									margin : '0 10 0 0',
									allowBlank : false,
									width : 180
								}, {
									xtype : 'datefield',
									format : 'Y-m-d',
									name : 'ts_revoke',
									fieldLabel : '撤销时间',
									width : 320
								}]
					}, {
						xtype : 'button',
						text : '查询',
						margin : '0 20 0 0',
						handler : function() {
							store.loadPage(1);
						}
					}, {
						xtype : 'button',
						text : '重置',
						handler : function(button) {
							button.up('panel').getForm().reset();
						}
					}]
		}, {

			xtype : 'gridpanel',

			store : store,
			dockedItems : [{
						xtype : 'pagingtoolbar',
						store : store
					}],
			columns : [{
						text : "ID",
						itemId : 'id',
						dataIndex : 'id',
						sortable : false,
						flex : 1
					}, {
						text : "会计期间",
						dataIndex : 'period',
						itemId : 'period',
						sortable : false,
						flex : 1,
						renderer : Ext.util.Format.dateRenderer('Y年m月d日')
					}, {
						text : "银行清算日期",
						dataIndex : 'clear_date',
						itemId : 'clear_date',
						sortable : false,
						flex : 1,
						renderer : Ext.util.Format.dateRenderer('Y年m月d日')
					}, {
						text : "本金备付金银行账号",
						itemId : 'bfj_acct_bj',
						dataIndex : 'bfj_acct_bj',
						sortable : false,
						renderer : function(value, p, record) {
							var bfjacct = Ext.data.StoreManager
									.lookup('component.BfjAcct');
							var index = bfjacct.findExact('id', value);
							return bfjacct.getAt(index).data.name;
						},
						flex : 2
					}, {
						text : "银行接口编号",
						itemId : 'bi',
						dataIndex : 'bi',
						sortable : false,
						renderer : function(value, p, record) {
							var bi = Ext.data.StoreManager
									.lookup('component.Bi');
							var index = bi.findExact('id', value);
							return bi.getAt(index).data.name;
						},
						flex : 1
					}, {
						text : "交易金额",
						dataIndex : 'tx_amt',
						width : 100,
						sortable : false,
						flex : 1,
						renderer : function(value) {
							return Ext.util.Format.number(
									parseInt(value) / 100, '0,0.00');
						}
					}, {
						text : "撤销状态",
						dataIndex : 'flag',
						sortable : false,
						flex : 1,
						renderer : function(value) {
							var text = ['未撤销', '已撤销', '撤销申请中'];
							return text[value];
						}
					}, {
						xtype : 'actioncolumn',
						text : '操作',
						width : 100,
						align : 'center',
						items : [{
							tooltip : '详细',
							getClass : function(v, meta, rec) {
								return 'detail';
							},
							handler : function(grid, rowIndex, colIndex) {
								var rec = grid.getStore().getAt(rowIndex);
								var viewport = grid.up('viewport'), center = viewport
										.down('center'), id = 'yspzq_detail_0091'
										+ rec.data.id, cmp = Ext.getCmp(id);
								var yspzqdetail = Ext
										.createByAlias('widget.yspzqdetail');
								yspzqdetail.store.load({
											params : {
												ys_type : '0091',
												ys_id : rec.data.id
											}
										});
								if (cmp) {
									center.setActiveTab(cmp);
								} else {
									center.add({
										closable : true,
										xtype : 'panel',
										items : yspzqdetail,
										id : 'yspzq_detail_0091' + rec.data.id,
										title : '凭证0091' + '编号' + rec.data.id
												+ '详细信息'
									}).show();
								}
								viewport.doLayout();
							}
						}, {
							tooltip : '撤销',
							getClass : function(v, meta, rec) {
								if (rec.data.flag == 0) {
									return 'revoke';
								}
								return 'none';
							},
							handler : function(grid, rowIndex, colIndex) {
								var rec = grid.getStore().getAt(rowIndex);
								Ext.widget('yspzrevoke_cause', {
											modal : true,
											resizable : false,
											ys_type : '0091',
											ys_id : rec.data.id,
											period : rec.data.period
										})
							}
						}]
					}]
		}];
		this.callParent(arguments);
	}
});
