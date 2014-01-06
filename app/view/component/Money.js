Ext.define('Zixweb.view.component.Money', {
			extend : 'Ext.form.field.Text',
			alias : 'widget.money',
			labelWidth : 70,
			vtype : 'money',
			listeners : {
				blur : function(me, the, opts) {
					if (me.isValid()) {
						var v = me.value;
						if (v == undefined || v == '') {
							return;
						}
						var v = v.replace(/\,/g, '');
						me.setValue(Ext.util.Format.number(parseFloat(v),
								'0,0.00'));
					}
				}
			},
			getSubmitValue : function() {
				var v = this.callParent();
				return v.replace(/\,/g, '');
			}
		});