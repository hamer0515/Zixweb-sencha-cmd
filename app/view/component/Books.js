Ext.define('Zixweb.view.component.Books', {
			extend : 'Zixweb.view.component.base.ComboBox',
			alias : 'widget.books',
			_url : 'base/books',
			initComponent : function() {
				var me = this;
				Ext.apply(me, {
							_extraParams : {
								set : Ext.encode(me.set)
							}
						});
				me.callParent(arguments);
			}
		});
