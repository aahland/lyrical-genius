export const manifest = {
	appDir: "_app",
	assets: new Set(["images/logoMobile.png","robots.txt","sounds/correct.wav","sounds/wrong.wav"]),
	mimeTypes: {".png":"image/png",".txt":"text/plain",".wav":"audio/wav"},
	_: {
		entry: {"file":"start-be8b959f.js","js":["start-be8b959f.js","chunks/vendor-88422b5e.js"],"css":[]},
		nodes: [
			() => import('./nodes/0.js'),
			() => import('./nodes/1.js'),
			() => import('./nodes/2.js')
		],
		routes: [
			{
				type: 'page',
				id: "",
				pattern: /^\/$/,
				names: [],
				types: [],
				path: "/",
				shadow: null,
				a: [0,2],
				b: [1]
			}
		],
		validators: async () => {
			
			return {  };
		}
	}
};
