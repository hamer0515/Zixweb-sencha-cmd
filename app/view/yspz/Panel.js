Ext.define('Zixweb.view.yspz.Panel', {
	extend : 'Zixweb.view.Panel',
	_gridconfig : {
		features : [{
					ftype : 'summary',
					dock : 'bottom'
				}]
	},
	initComponent : function() {
		var me = this, cls = Ext.getClassName(me).split('.').pop(), gcolumns = [
				{
					text : "ID",
					dataIndex : 'id',
					width : 80,
					locked : true,
					summaryRenderer : function() {
						return '合计：';
					}
				}], colarr = [], items = [{
					xtype : 'fieldcontainer',
					layout : 'hbox',
					items : [{
								xtype : 'idfield'
							}, {
								xtype : 'crt_user'
							}]
				}, {
					xtype : 'fieldcontainer',
					layout : 'hbox',
					items : [{
								xtype : 'flag'
							}, {
								xtype : 'revoke_user'
							}]
				}, {
					xtype : 'fieldcontainer',
					layout : 'hbox',
					items : [{
								xtype : 'period'
							}, {
								xtype : 'ts_revoke'
							}]
				}], fields = me._fields, _fields = ['id', 'flag', 'period'], _fieldsarr = [], item, itemsarr = [], counter = 0, gcolumn;
		for (var i in fields) {
			if (i == 'period') {
				continue;
			}
			counter++;
			var type = fields[i][1], label = fields[i][0], cmp, cls_ = '';
			_fieldsarr.push(i);
			if (!item) {
				item = {
					xtype : 'fieldcontainer',
					layout : {
						type : 'hbox'
					},
					items : []
				};
			}
			cls_ = Ext.ClassManager.getNameByAlias('widget.' + i);
			if (cls_) {
				cmp = Ext.create(cls_, {
							name : i,
							fieldLabel : label
						});
			} else {
				if (type == 'date') {
					Ext.define('Zixweb.view.yspz.' + i, {
								extend : 'Zixweb.view.component.base.DateField',
								alias : 'widget.' + i
							});
				} else if (type == 'money') {
					Ext.define('Zixweb.view.yspz.' + i, {
								extend : 'Zixweb.view.component.base.MoneyField',
								alias : 'widget.' + i
							});
				} else if (type == 'number') {
					Ext.define('Zixweb.view.yspz.' + i, {
								extend : 'Zixweb.view.component.base.Number',
								alias : 'widget.' + i
							});
				} else if (type == 'text') {
					Ext.define('Zixweb.view.yspz.' + i, {
								extend : 'Zixweb.view.component.base.TextField',
								alias : 'widget.' + i
							});
				} else {
					Ext.define('Zixweb.view.yspz.' + i, {
								extend : Ext.getClassName(Ext.ClassManager
										.getByAlias('widget.' + type)),
								alias : 'widget.' + i
							});
				}
				cmp = Ext.widget(i, {
							name : i,
							fieldLabel : label
						});
			}
			if (type == 'date') {
				gcolumn = {
					text : label,
					dataIndex : i
				};
			} else if (type == 'money') {
				gcolumn = {
					text : label,
					dataIndex : i,
					renderer : function(value) {
						return Ext.util.Format.number(parseInt(value || 0)
										/ 100, '0,0.00');
					},
					summaryType : function(records) {
						var i = 0, length = records.length, total = 0, record;
						for (; i < length; ++i) {
							record = records[i];
							total += parseInt(record.data[i]);
						}
						return total;
					},
					summaryRenderer : function(value) {
						if (!value) {
							value = 0;
						}
						return Ext.util.Format.number(parseInt(value) / 100,
								'0,0.00');
					}
				};
			} else if (type == 'number' || type == 'text') {
				gcolumn = {
					text : label,
					dataIndex : i
				}
			} else {
				gcolumn = {
					text : label,
					dataIndex : i,
					renderer : Ext.data.StoreManager.lookup(type).$render
				};
			}
			if (counter < 4) {
				gcolumn.locked = true;
			}
			gcolumn.width = label.split('').length * 18;
			gcolumns.push(gcolumn);
			item.items.push(cmp);
			if (counter % 2 == 0) {
				itemsarr.push(item);
				item = undefined;
			}
		}
		if (item) {
			itemsarr.push(item);
			item = undefined;
		}
		console.log(cls.substr(1));
		Ext.apply(me, {
					alias : 'widget.' + cls,
					_url : 'yspzq/' + cls,
					_ys_type : cls.substr(1),
					_fields : _fieldsarr.concat(_fields),
					_items : itemsarr.concat(items),
					_gcolumns : gcolumns.concat(Ext.columns.yspz)
				});
		me.callParent(arguments);
	}
});
