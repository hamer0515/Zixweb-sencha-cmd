Ext.define('Zixweb.view.yspz.yspzq.y0000', {
			extend : 'Zixweb.view.Panel',
			alias : 'widget.y0000',
			_url : 'yspzq/y0000',
			_fields : ['id', 'flag', 'crt_user', 'period', 'cause'],
			_items : [{
						xtype : 'fieldcontainer',
						layout : 'hbox',
						items : [{
									xtype : 'textfield',
									fieldLabel : 'ID',
									margin : '0 10 0 0',
									width : 516,
									name : 'id',
									vtype : "id"
								}, {
									xtype : 'textfield',
									fieldLabel : '录入员',
									width : 516,
									name : 'crt_user'
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
						layout : 'hbox',
						items : [{
									xtype : 'datefield',
									format : 'Y-m-d',
									name : 'ts_revoke',
									fieldLabel : '撤销时间',
									width : 325
								}]
					}, {
						xtype : 'period'
					}],
			initComponent : function() {
				var me = this;
				me._gcolumns = [Ext.columns.id, Ext.columns.period,
						Ext.columns.flag, Ext.columns.crt_user,
						Ext.columns.cause, Ext.columns.yspz_action];
				me.callParent(arguments);
			}
		});