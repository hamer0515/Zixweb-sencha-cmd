Ext.define('Zixweb.controller.Task', {
			extend : 'Ext.app.Controller',
			views : [
					// 易宝帐套
					'Zixweb.view.task.Task0000',
					'Zixweb.view.task.Task0000detail',
					'Zixweb.view.task.Taskpzcx',
					'Zixweb.view.task.Taskpzcxdetail',
					'Zixweb.view.task.Taskmy',

					// 富汇易达帐套
					'Zixweb.view.task.TaskF0000',
					'Zixweb.view.task.TaskF0000detail',
					'Zixweb.view.task.TaskFpzcx',
					'Zixweb.view.task.TaskFpzcxdetail',
					'Zixweb.view.task.TaskFmy']

		});