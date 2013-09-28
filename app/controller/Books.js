Ext.define('Zixweb.controller.Books', {
			extend : 'Ext.app.Controller',
			views : ['book.AllBooks', 'book.ZyzjBooks', 'book.BfjBooks',
					'book.detail.deposit_bfj', 'book.hist.deposit_bfj'],

			init : function() {
			}
		});