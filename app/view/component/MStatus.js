Ext.define('Zixweb.view.component.MStatus', {
			extend : 'Ext.form.ComboBox',
			alias : 'widget.mstatus',
			width : 516,
			queryMode : 'local',
			anyMatch : true,
			listeners : {
				blur : function(self, The, eOpts) {
					var value = self.getValue();
					var result = self.getStore().queryBy(function(record) {
								if (record.data.id == value) {
									return true;
								}
								return false;
							});
					if (result.length == 0) {
						self.setValue('');
					}
				}
			},
			initComponent : function() {
				this.store = new Ext.data.Store({
							fields : ['id', 'name'],
							data : [{
										id : 1,
										name : '可开始'
									}, {
										id : 2,
										name : '下载中'
									}, {
										id : 3,
										name : '可分配'
									}, {
										id : 4,
										name : '分配中'
									}, {
										id : 5,
										name : '可运行'
									}, {
										id : 6,
										name : '运行中'
									}, {
										id : 7,
										name : '运行成功'
									}, {
										id : -1,
										name : '下载失败'
									}, {
										id : -2,
										name : '分配失败'
									}, {
										id : -3,
										name : '运行失败'
									}]
						});
				this.valueField = 'id';
				this.displayField = 'name';
				this.callParent(arguments);
			}
		});
