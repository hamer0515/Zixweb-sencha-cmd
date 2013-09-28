Ext.define('Zixweb.store.component.JStatus', {
			extend : 'Ext.data.Store',
			fields : ['id', 'name'],
			data : [{
						id : 1,
						name : '可运行'
					}, {
						id : 2,
						name : '运行中'
					}, {
						id : 3,
						name : '运行成功'
					}, {
						id : -1,
						name : '运行失败'
					}]
		});