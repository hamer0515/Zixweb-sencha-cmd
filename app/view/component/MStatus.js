Ext.define('Zixweb.view.component.MStatus', {
			extend : 'Ext.form.ComboBox',
			alias : 'widget.mstatus',
			width : 516,
			queryMode : 'local',
			anyMatch : true,
			listeners : {
				blur : function(me, The, eOpts) {
					var value = me.getValue();
					var result = me.getStore().queryBy(function(record) {
								if (record.data.id == value) {
									return true;
								}
								return false;
							});
					if (result.length == 0) {
						me.setValue('');
					}
				}
			},
			valueField : 'id',
			displayField : 'name',
			initComponent : function() {
				var me = this;
				me.store = new Ext.data.Store({
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

				me.callParent(arguments);
			}
		});
