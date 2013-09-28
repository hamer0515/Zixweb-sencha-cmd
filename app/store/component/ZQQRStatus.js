Ext.define('Zixweb.store.component.ZQQRStatus', {
			extend : 'Ext.data.Store',
			fields : ['id', 'name'],
			data : [{
						id : -1,
						name : '无'
					}, {
						id : -2,
						name : '生成失败'
					}, {
						id : 1,
						name : '可生成'
					}, {
						id : 2,
						name : '生成中'
					}, {
						id : 3,
						name : '生成成功'
					}]
		});