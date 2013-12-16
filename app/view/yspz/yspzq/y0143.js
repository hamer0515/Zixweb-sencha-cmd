Ext.define('Zixweb.view.yspz.yspzq.y0143', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.y0143',
	prefix : 'yspzq_y0143',
	url : 'y0143',

	defaults : {
		border : false
	},

	initComponent : function() {
		var panel = this;

		var store = new Ext.data.Store({
			fields : ['id', 'flag', 'clear_date', 'bi', 'p', 'tx_amt', 'period'],

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

					var form = Ext.getCmp(panel.prefix + '_form').getForm();
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
									msg : '原始凭证0143数据加载失败,请联系管理员',
									buttons : Ext.Msg.YES,
									icon : Ext.Msg.ERROR
								});
						return;
					}
					var jsonData = thiz.proxy.reader.jsonData.success;
					if (jsonData && jsonData === 'forbidden') {
						Ext.MessageBox.show({
									title : '警告',
									msg : '抱歉，没有原始凭证0143数据访问权限',
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
											xtype : 'bi',
											fieldLabel : '银行接口编号',
											margin : '0 10 0 0',
											width : 516,
											name : 'bi'
										}, {
											xtype : 'product',
											fieldLabel : '产品类型',
											name : 'p'
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
												id : panel.prefix
														+ '_period_to'
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
											width : 516
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
								text : "期间日期",
								dataIndex : 'period',
								itemId : 'period',
								sortable : false,
								flex : 2,
								renderer : Ext.util.Format
										.dateRenderer('Y年m月d日')
							}, {
								text : "银行清算日期",
								dataIndex : 'clear_date',
								itemId : 'clear_date',
								sortable : false,
								flex : 2,
								renderer : Ext.util.Format
										.dateRenderer('Y年m月d日')
							}, {
								text : "产品类型",
								itemId : 'p',
								dataIndex : 'p',
								sortable : false,
								renderer : function(value, p, record) {
									var product = Ext.data.StoreManager
											.lookup('component.Product');
									var index = product.findExact('id', value);
									return product.getAt(index).data.name;
								},
								flex : 1
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
								flex : 3
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
								flex : 2,
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
										var rec = grid.getStore()
												.getAt(rowIndex);
										var viewport = grid.up('viewport'), center = viewport
												.down('center'), id = 'yspzq_detail_0143'
												+ rec.data.id, cmp = Ext
												.getCmp(id);
										var yspzqdetail = Ext
												.createByAlias('widget.yspzqdetail');
										yspzqdetail.store.load({
													params : {
														ys_type : '0143',
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
												id : 'yspzq_detail_0143'
														+ rec.data.id,
												title : '凭证0143' + '编号'
														+ rec.data.id + '详细信息'
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
										var rec = grid.getStore()
												.getAt(rowIndex);
										Ext.widget('yspzrevoke_cause', {
													modal : true,
													resizable : false,
													ys_type : '0143',
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
