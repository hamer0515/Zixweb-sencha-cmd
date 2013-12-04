Ext.define('overrides.Format', {
			override : 'Ext.util.Format',
			/**
			 * Returns a date rendering function that can be reused to apply a
			 * date format multiple times efficiently.
			 * 
			 * @param {String}
			 *            format Any valid date format string. Defaults to
			 *            {@link Ext.Date#defaultFormat}.
			 * @return {Function} The date formatting function
			 */
			dateRenderer : function(format) {
				return function(v) {
					var val = v.split('-')
					return Ext.util.Format.date(new Date(val[0], val[1] - 1,
									val[2]), format);
				};
			}
		});