Ext.define('overrides.Paging', {
			override : 'Ext.toolbar.Paging',
			dock : 'bottom',
			plugins : [new Zixweb.view.component.plugins.PageComboResizer()],
			displayInfo : true
		});