Ext.define('Zixweb.store.RStatus', {
			extend : 'Zixweb.store.CBase',
			data : [{
						id : '0',
						name : '未撤销'
					}, {
						id : '1',
						name : '已撤销'
					}, {
						id : '2',
						name : '撤销申请中'
					}]

		});