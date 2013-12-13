Ext.define('Zixweb.view.Viewport', {
			extend : 'Ext.container.Viewport',
			requires : ['Ext.data.TreeStore', 'Ext.layout.container.Border',
					'Ext.Date', 'Ext.layout.container.Table',
					'Ext.toolbar.Paging', 'Ext.grid.plugin.RowExpander',
					'Ext.grid.column.Action', 'Ext.form.field.Date',
					'Ext.form.field.Hidden', 'Ext.grid.property.Grid',
					'Ext.ux.TabScrollerMenu', 'Ext.ux.TabCloseMenu',
					'Ext.ux.form.ItemSelector', 'overrides.Date',
					'overrides.Format', 'overrides.Table',
					'overrides.TabCloseMenu', 'overrides.VType',
					'overrides.RowExpander', 'overrides.BasicForm',
					'overrides.Gridpanel', 'overrides.Ext', 'overrides.Paging',
					'overrides.Treepanel'],

			layout : {
				type : 'border'
			},

			items : [{
						xtype : 'loginform'
					}]
		});
