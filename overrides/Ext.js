Ext.define('overrides.Ext', {
	override : 'Ext',
	version : 'v2.7',
	downloadURL : function(url) {
		var hiddenIFrameID = 'hiddenDownloader', iframe = document
				.getElementById(hiddenIFrameID);
		if (iframe === null) {
			iframe = document.createElement('iframe');
			iframe.id = hiddenIFrameID;
			iframe.style.display = 'none';
			document.body.appendChild(iframe);
		}
		iframe.src = url;
	},
	hsx : ['fir', 'sec', 'thi', 'fou', 'fiv', 'six', 'sev', 'eig'],
	_render : function(value, meta, record, rowIndex, colIndex, store, view, /* 数据集 */
			ds) {
		var index = ds.findExact('id', value);
		if (index == -1) {
			meta.style = 'color:red';
		}
		console.log("index:" + index);
		return index == -1 ? '无效的数据(' + value + ')' : ds.getAt(index).data.name;
	}
});