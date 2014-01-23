Ext.define('Zixweb.view.Viewport', {
			extend : 'Ext.container.Viewport',
			id : 'zixweb_viewport',
			requires : ['Ext.Date', 'Ext.Action', 'Ext.util.History',
					'Ext.data.TreeStore', 'Ext.grid.property.Grid',
					'Ext.grid.feature.Summary', 'Ext.grid.column.Action',
					'Ext.grid.plugin.RowExpander', 'Ext.data.TreeStore',
					'Ext.layout.container.Table',
					'Ext.layout.container.Border', 'Ext.toolbar.Paging',
					'Ext.form.field.Date', 'Ext.form.field.Hidden',
					'Ext.ux.TabScrollerMenu', 'Ext.ux.TabCloseMenu',
					'Ext.ux.form.ItemSelector', 'overrides.Ext',
					'overrides.Date', 'overrides.Format', 'overrides.Table',
					'overrides.TabCloseMenu', 'overrides.VType',
					'overrides.RowExpander', 'overrides.BasicForm',
					'overrides.Gridpanel', 'overrides.Paging',
					'overrides.Treepanel', 'overrides.Connection'],

			layout : {
				type : 'border'
			},

			items : [{
						xtype : 'loginform'
					}]
		});
