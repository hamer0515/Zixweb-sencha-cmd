Ext.define('Zixweb.view.book.SumPanel', {
	extend : 'Zixweb.view.Panel',
	hasExporBtn : true,
	initComponent : function() {
		var me = this, cls = Ext.getClassName(me).split('.').pop(), columns = [], colarr = [], fields = [
				'period', 'j', 'd'], dims = me._dims || [], dimsarr = [], item, hsx = {
			xtype : 'hsx',
			data : []
		};
		for (var i = 0; i < dims.length; i++) {
			columns[dims[i]] = Ext.columns[dims[i]];
			if (!item) {
				item = {
					xtype : 'fieldcontainer',
					layout : 'hbox',
					items : []
				};
			}
			item.items.push({
						xtype : dims[i]
					});
			hsx.data.push(dims[i]);
			if (i % 2 == 1) {
				dimsarr.push(item);
				item = undefined
			}
		}
		if (item) {
			dimsarr.push(item);
			item = undefined
		}
		dimsarr.push(hsx);
		columns['period'] = Ext.columns.period;
		columns['j'] = Ext.columns.j;
		columns['d'] = Ext.columns.d;
		Ext.apply(me, {
					alias : 'widget.book_sum_' + cls,
					_url : 'book/sum/' + cls,
					_fields : fields.concat(dims),
					_items : dimsarr,
					_columns : columns
				});
		me.callParent(arguments);
	}
});
