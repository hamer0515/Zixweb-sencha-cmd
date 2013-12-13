Ext.define('overrides.Treepanel', {
			override : 'Ext.tree.Panel',
			listeners : {
				itemcollapse : function(node, eOpts) {
					if (!node.leaf) {
						node.collapseChildren(true);
					}
				}
			}
		});