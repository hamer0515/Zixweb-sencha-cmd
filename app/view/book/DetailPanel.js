Ext.define('Zixweb.view.book.DetailPanel', {
	extend : 'Zixweb.view.Panel',
	hasExporBtn : true,
	exportMode : 'widget',
	initComponent : function() {
		var me = this, cls = Ext.getClassName(me).split('.').pop(), gcolumns = [
				Ext.columns.period, Ext.columns.j, Ext.columns.d,
				Ext.columns.ys_type, Ext.columns.book_detail_action], colarr = [Ext.columns.id], items = [
				{
					xtype : 'fieldcontainer',
					layout : 'hbox',
					items : [{
								xtype : 'idfield'
							}, {
								xtype : 'ysidfield'
							}]

				}, {
					xtype : 'fieldcontainer',
					layout : 'hbox',
					items : [{
								xtype : 'j_amt'
							}, {
								xtype : 'd_amt'
							}]
				}, {
					xtype : 'fieldcontainer',
					layout : 'hbox',
					items : [{
								xtype : 'period'
							}, {
								xtype : 'ys_type',
								_extraParams : {
									entity : me._entity
								}
							}]
				}], fields = ['id', 'period', 'j', 'd', 'ys_id', 'ys_type'], dims = me._dims
				|| [], dimsarr = [], item;
		for (var i = 0; i < dims.length; i++) {
			colarr.push(Ext.columns[dims[i]]);
			if (!item) {
				item = {
					xtype : 'fieldcontainer',
					layout : 'hbox',
					items : []
				};
			}
			item.items.push({
						xtype : dims[i]
					})
			if (i % 2 == 1) {
				dimsarr.push(item);
				item = undefined
			}
		}
		if (item) {
			dimsarr.push(item);
			item = undefined
		}
		Ext.apply(me, {
					alias : 'widget.book_detail_' + cls,
					_url : 'book/detail/' + cls,
					_fields : fields.concat(dims),
					_items : dimsarr.concat(items),
					_gcolumns : colarr.concat(gcolumns)
				})
		me.callParent(arguments);
	}
});
