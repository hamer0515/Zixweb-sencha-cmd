Ext.define('Zixweb.view.component.ExportBtn', {
	extend : 'Ext.button.Button',
	alias : 'widget.exportbtn',
	text : '导出Excel',
	disabled : true,
	initComponent : function() {
		var me = this, grid = me._grid, url = me._url, widget = me._widget, bid = me._bid;
		me.handler = function() {
			var count = this._grid.store.getTotalCount();
			if (count == 0) {
				return;
			} else if (count > 10000) {
				Ext.MessageBox.show({
							title : '警告',
							msg : '数据量超过上限10000条',
							buttons : Ext.Msg.YES,
							icon : Ext.Msg.WARNING
						});
				return;
			}
			if (widget) {
				Ext.widget(widget, {
							modal : true,
							params : this._grid.store.proxy.extraParams,
							url : url,
							bid : bid,
							resizable : false
						});
			} else {
				var params = this._grid.store.proxy.extraParams;
				var columns = this._grid.headerCt.gridDataColumns;
				var h = {
					headers : []
				};
				for (var i in columns) {
					var c = columns[i];
					if (!c.dataIndex) {
						continue;
					}
					h[c.dataIndex] = c.text;
					h.headers.push(c.dataIndex);
				}
				params.header = Ext.encode(h);
				Ext.Ajax.request({
							async : false,
							url : url,
							params : params,
							success : function(response, opts) {
								Ext
										.downloadURL('base/excel?file='
												+ Ext
														.decode(response.responseText).file);
							}
						});
			};
		}
		me.callParent(arguments);
	}
});
