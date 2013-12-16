Ext.define('Zixweb.controller.Task', {
			extend : 'Ext.app.Controller',
			views : [
					// 易宝帐套
					'task.Task0000', 'task.Task0000detail', 'task.Taskpzcx',
					'task.Taskpzcxdetail', 'task.Taskmy',

					// 富汇易达帐套
					'task.TaskF0000', 'task.TaskF0000detail', 'task.TaskFpzcx',
					'task.TaskFpzcxdetail', 'task.TaskFmy']

		});