Ext.define('Zixweb.view.yspz.revoke_cause', {
			extend : 'Ext.window.Window',
			alias : 'widget.yspzrevoke_cause',
			title : '原始凭证撤销',
			layout : 'fit',
			autoShow : true,

			initComponent : function() {
				this.items = [{
							xtype : 'form',
							id : 'yspzrevoke_causeform',
							url : 'yspz/revoke',
							border : false,
							fieldDefaults : {
								labelWidth : 110
							},
							bodyPadding : 5,
							items : [{
										xtype : 'displayfield',
										fieldLabel : '当前原始凭证类型',
										name : 'ys_type',
										value : this.ys_type
									}, {
										xtype : 'hiddenfield',
										value : this.ys_type,
										name : 'ys_type'
									}, {
										xtype : 'displayfield',
										fieldLabel : '当前原始凭证编号',
										name : 'ys_type',
										value : this.ys_id
									}, {
										xtype : 'hiddenfield',
										value : this.ys_id,
										name : 'ys_id'
									}, {
										xtype : 'displayfield',
										fieldLabel : '会计期间',
										name : 'period',
										value : this.period
									}, {
										xtype : 'hiddenfield',
										value : this.period,
										name : 'period'
									}, {
										xtype : 'textarea',
										name : 'revoke_cause',
										fieldLabel : '请填写撤销原因',
										allowBlank : false,
										width : 400
									}]
						}];

				this.buttons = [{
							text : '撤销',
							action : 'submit'
						}, {
							text : '取消',
							scope : this,
							handler : this.close
						}];

				this.callParent(arguments);
			}
		});