
oex_jumper = {
	overlays: [],
	
	show: function() {
		oex_jumper.overlays = [];
		
		var overlay = document.createElement('div');
		overlay.style.cssText = "position: absolute; padding-left: 0.5em; padding-right: 0.5em; background-color: rgba(0, 255, 0, 0.9); border-radius: 1em; box-shadow: 0.2em 0.2em 0.5em rgba(128, 128, 128, 0.5); z-index: 10000;";
		
		var nodes = document.querySelectorAll('[id]');
		var length = nodes.length;
		for(var i=0; i<length; i++) {
			var e = nodes[i];
			var parent = e.offsetParent; //|| e.parentElement;
			if(!parent)
				continue;
			
			var insert = overlay.cloneNode(false);
			var top = e.offsetTop, left = e.offsetLeft;
			// tables break it
			for(var obj = e.offsetParent; obj != null && (obj.tagName == 'TABLE' || obj.tagName == 'TD'); obj = obj.offsetParent) {
				top += obj.offsetTop;
				left += obj.offsetLeft;
			}
			insert.style.top = top;
			insert.style.left = left;
			insert.innerHTML = '<a style="color: blue; text-decoration: none; border: 0px;" href="#' + e.id + '">#' + e.id + '</a>';
			insert.firstChild.addEventListener('click', oex_jumper.hide, false);
			
			parent.appendChild(insert);
			oex_jumper.overlays.push(insert);
		}
	},
	
	hide: function() {
		var length = oex_jumper.overlays.length;
		for(var i=0; i<length; ++i) {
			var e = oex_jumper.overlays[i];
			e.parentNode.removeChild(e);
		}
		oex_jumper.overlays = [];
	}

};

opera.extension.addEventListener('message', function(event) {
	if(event.data == document.URL.replace(/#.*/, '')) {
		if(!oex_jumper.overlays.length)
			oex_jumper.show();
		else
			oex_jumper.hide();
	}
}, false);
