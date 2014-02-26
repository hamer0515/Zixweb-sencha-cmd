Ext.define('Zixweb.view.book.detail.wlzj_yfzy', {
	extend : 'Zixweb.view.Panel',
	alias : 'widget.book_detail_wlzj_yfzy',
	hasExporBtn : true,
	_url : 'book/detail/wlzj_yfzy',
	_fields : ['wlzj_type', 'period', 'j', 'd'],
	_items : [{
				xtype : 'fieldcontainer',
				fieldLabel : '会计期间',
				layout : 'hbox',
				items : [{
							xtype : 'datefield',
							format : 'Y-m-d',
							name : 'period_from',
							margin : '0 10 0 0',

							width : 180
						}, {
							xtype : 'datefield',
							format : 'Y-m-d',
							name : 'period_to',
							margin : '0 10 0 0',

							width : 180
						}, {
							xtype : 'wlzjtype',
							name : 'wlzj_type',
							margin : '0 10 0 0',
							fieldLabel : '往来类型'
						}]
			}, {
				xtype : 'hsx',
				data : [{
							'value' : "wlzj_type",
							'name' : "往来类型"
						}, {
							'value' : "period",
							'name' : "会计期间"
						}]
			}],
	initComponent : function() {
		var me = this, columns;
		me._columns = columns = {
			wlzj_type : Ext.columns.wlzj_type,
			period : Ext.columns.period,
			j : Ext.columns.j,
			d : Ext.columns.d
		};
		me._gcolumns = [columns.wlzj_type, columns.period, columns.j, columns.d];
		me.callParent(arguments);
	}
});
