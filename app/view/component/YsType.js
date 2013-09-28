Ext.define('Zixweb.view.component.YsType', {
			extend : 'Ext.form.ComboBox',
			alias : 'widget.ystype',
			width : 490,
			queryMode : 'local',
			anyMatch : true,
			store : 'Zixweb.store.component.YsType',

			initComponent : function() {
				this.valueField = 'id';
				this.displayField = 'name';
				this.callParent(arguments);
			}
		});
