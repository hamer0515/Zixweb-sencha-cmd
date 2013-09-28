Ext.define('Zixweb.Application', {
			name : 'Zixweb',
			minHeight : 768,
			minWidth : 1024,
			extend : 'Ext.app.Application',

			views : [
			// TODO: add views here
			],

			controllers : ['Login', 'Index', 'Component', 'Roles', 'Users',
					'Routes', 'Books', 'Pzlr', 'Task', 'Yspz', 'Zjdz', 'Zqqr'
			// TODO: add controllers here
			],

			stores : [
			// TODO: add stores here
			]
		});
