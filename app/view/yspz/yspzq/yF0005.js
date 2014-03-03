Ext.define('Zixweb.view.yspz.yspzq.yF0005', {
			extend : 'Zixweb.view.Panel',
			alias : 'widget.yF0005',
			_url : 'yspzq/yF0005',
			_fields : ['id', 'flag', 'period'],
			_items : [{
						xtype : 'fieldcontainer',
						layout : 'hbox',
						items : [{
									xtype : 'idfield'
								}, {
									xtype : 'flag'
								}]
					}, {
						xtype : 'fieldcontainer',
						layout : 'hbox',
						items : [{
									xtype : 'revoke_user'
								}, {
									xtype : 'ts_revoke'
								}]
					}, {
						xtype : 'period'
					}],

			initComponent : function() {
				var me = this, columns;
				me._gcolumns = [Ext.columns.id, Ext.columns.period,
						Ext.columns.flag, Ext.columns.yspz_action];
				me.callParent(arguments);
			}
		});
