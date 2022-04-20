export const manifest = {
	appDir: "_app",
	assets: new Set(["images/logoMobile.png","robots.txt","sounds/correct.wav","sounds/wrong.wav"]),
	mimeTypes: {".png":"image/png",".txt":"text/plain",".wav":"audio/wav"},
	_: {
		entry: {"file":"start-be8b959f.js","js":["start-be8b959f.js","chunks/vendor-88422b5e.js"],"css":[]},
		nodes: [
			() => import('./server/nodes/0.js'),
			() => import('./server/nodes/1.js')
		],
		routes: [
			
		],
		validators: async () => {
			
			return {  };
		}
	}
};
