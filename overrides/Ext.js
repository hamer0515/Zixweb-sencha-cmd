Ext.define('overrides.Ext', {
			override : 'Ext',
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
			}
		});