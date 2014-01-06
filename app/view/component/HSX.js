Ext.define('Zixweb.view.component.HSX', {
	extend : 'Ext.form.FieldContainer',
	alias : 'widget.hsx',
	layout : 'vbox',
	names : ['一', '二', '三', '四', '五', '六', '七'],
	submitNames : ['fir', 'sec', 'thi', 'fou', 'fiv', 'six', 'sev'],
	items : [],
	initComponent : function() {
		var panel = this, items = panel.items, data = panel.data, sta = new Ext.data.Store(
				{
					fields : ['value', 'name'],
					data : data
				}), container;
		// this.items = [];
		// var panel = this;
		// var data = this.data;
		// var sta =
		// var container;
		for (var i in data) {
			if (container == undefined) {
				container = Ext
						.decode("{xtype : 'fieldcontainer',layout : 'hbox',items : []}");
			}
			var item = {
				xtype : 'combobox',
				fieldLabel : '第' + this.names[i] + '核算项',
				store : new Ext.data.Store({
							fields : ['value', 'name'],
							data : data
						}),
				labelWidth : 140,
				queryMode : 'local',
				name : this.submitNames[i],
				anyMatch : true,
				margin : '0 10 0 0',
				width : 516,
				displayField : 'name',
				valueField : 'value',
				listeners : {
					change : function(me, newValue, oldValue, eOpts) {
						if (oldValue) {
							var index = sta.findExact('value', oldValue);
							if (index != -1) {
								var record = sta.getAt(index);
								var combos = panel.query('combobox');
								for (var i in combos) {
									if (combos[i] === me) {
										continue;
									}
									var s = combos[i].store;
									var ii = s.findExact('value', oldValue);
									if (ii == -1) {
										s.add(record);
										combos[i].bindStore(s);
									}
								}
							}
						}
						var i = me.store.findExact('value', newValue);
						if (i == -1) {
							me.setValue('');
							newValue = '';
							return;
						}
						var combos = panel.query('combobox');
						for (var i in combos) {
							if (combos[i] === me) {
								continue;
							}
							var s = combos[i].store;
							var i = s.findExact('value', newValue);
							if (i != -1) {
								s.removeAt(i);
								combos[i].bindStore(s);
							}
						}
					}
				}
			}
			container.items.push(item);
			if ((parseInt(i) + 1) % 2 == 0) {
				items.push(container);
				container = undefined;
			}
		}
		if (container != undefined) {
			items.push(container);
		}
		panel.callParent(arguments);
	}
});
