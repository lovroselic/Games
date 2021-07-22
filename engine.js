/////////////////////////////////////////////////
/*

to do:
 
known bugs: 
  
*/
/////////////////////misc/////////////////////////
(function() {
	function RND(start, end) {
		return Math.floor(Math.random() * (++end - start) + start);
	}

	function coinFlip() {
		var flip = RND(0, 1);
		if (flip) return true;
		return false;
	}
	function MAX(x, y) {
		if (x > y) {
			return x;
		} else return y;
	}
	function MIN(x, y) {
		if (x < y) {
			return x;
		} else return y;
	}
	window.MAX = MAX;
	window.MAX = MIN;
	window.RND = RND;
	window.coinFlip = coinFlip;
})();

/////////////debug vars: remove all in production/////////////////////

////////////////////////////////////////////////////////////////////

CanvasRenderingContext2D.prototype.roundRect = function(
	x,
	y,
	width,
	height,
	radius,
	fill,
	stroke
) {
	var cornerRadius = {
		upperLeft: 0,
		upperRight: 0,
		lowerLeft: 0,
		lowerRight: 0
	};
	if (typeof stroke == "undefined") {
		stroke = true;
	}
	if (typeof radius === "object") {
		for (var side in radius) {
			cornerRadius[side] = radius[side];
		}
	}
	this.beginPath();
	this.moveTo(x + cornerRadius.upperLeft, y);
	this.lineTo(x + width - cornerRadius.upperRight, y);
	this.quadraticCurveTo(x + width, y, x + width, y + cornerRadius.upperRight);
	this.lineTo(x + width, y + height - cornerRadius.lowerRight);
	this.quadraticCurveTo(
		x + width,
		y + height,
		x + width - cornerRadius.lowerRight,
		y + height
	);
	this.lineTo(x + cornerRadius.lowerLeft, y + height);
	this.quadraticCurveTo(x, y + height, x, y + height - cornerRadius.lowerLeft);
	this.lineTo(x, y + cornerRadius.upperLeft);
	this.quadraticCurveTo(x, y, x + cornerRadius.upperLeft, y);
	this.closePath();
	if (stroke) {
		this.stroke();
	}
	if (fill) {
		this.fill();
	}
};

/* collection of prototypes LS */

Array.prototype.clear = function() {
	if (!this) return false;
	this.splice(0, this.length);
};

Array.prototype.swap = function(x, y) {
	var TMP = this[x];
	this[x] = this[y];
	this[y] = TMP;
	return this;
};

Array.prototype.shuffle = function() {
	var i = this.length,
		j;
	while (--i > 0) {
		j = rnd(0, i);
		this.swap(i, j);
	}
	return this;

	function rnd(start, end) {
		return Math.floor(Math.random() * (++end - start) + start);
	}
};

Array.prototype.sum = function() {
	var x = this.length;
	var total = 0;
	for (var y = 0; y < x; y++) {
		total += this[y];
	}
	return total || -1;
};

Array.prototype.average = function() {
	var sum = this.sum();
	var x = this.length;
	return sum / x || -1;
};

Array.prototype.createPool = function(mx, N) {
	if (!this) return false;
	this.clear();
	var tempArray = [];
	for (var ix = 0; ix < mx; ix++) {
		tempArray[ix] = ix;
	}
	var top;
	for (var iy = 0; iy < N; iy++) {
		top = tempArray.length;
		var addx = rnd(0, top - 1);
		this[iy] = tempArray[addx];
		tempArray.splice(addx, 1);
	}
	return this;

	function rnd(start, end) {
		return Math.floor(Math.random() * (++end - start) + start);
	}
};

Array.prototype.compare = function(array) {
	if (!array) return false;
	var LN = this.length;
	if (LN !== array.length) return false;
	for (var x = 0; x < LN; x++) {
		if (this[x] !== array[x]) return false;
	}
	return true;
};

Array.prototype.remove = function(value) {
	var LN = this.length;
	for (var x = 0; x < LN; x++) {
		if (this[x] === value) {
			this.splice(x, 1);
			this.remove(value);
		}
	}
};

Array.prototype.chooseRandom = function() {
	var LN = this.length;
	var choose = rnd(1, LN) - 1;
	return this[choose];

	function rnd(start, end) {
		return Math.floor(Math.random() * (++end - start) + start);
	}
};

Array.prototype.removeRandom = function() {
	var LN = this.length;
	var choose = rnd(1, LN) - 1;
	return this.splice(choose, 1);

	function rnd(start, end) {
		return Math.floor(Math.random() * (++end - start) + start);
	}
};

String.prototype.fill = function(stringy, howMany) {
	var s = "";
	for (;;) {
		if (howMany & 1) s += stringy;
		howMany >>= 1;
		if (howMany) stringy += stringy;
		else break;
	}
	return s;
};

String.prototype.padLeft = function(LN, fill) {
	var s = "".fill(fill, LN) + this;
	return s.substring(s.length - LN);
};

String.prototype.padRight = function(LN, fill) {
	var s = this + "".fill(fill, LN);
	return s.substring(0, LN);
};

String.prototype.capitalize = function() {
	return this.charAt(0).toUpperCase() + this.substr(1).toLowerCase();
};
//////////////////engine.js/////////////////////////
var ENGINE = {
	init: function() {
		LAYER = {};
		SPRITE = {};
		$("#temp").append("<canvas id ='temp_canvas'></canvas>");
		LAYER.temp = $("#temp_canvas")[0].getContext("2d");
	},
	gameWindowId: "#game",
	gameWIDTH: 960,
	currentTOP: 0,
	addBOX: function(id, height, layers, alias) {
		if (id == null) return;
		if (height == null) return;
		layers = layers || 1;
		$(ENGINE.gameWindowId).append(
			"<div id ='" + id + "' style='position: relative'></div>"
		);
		if (layers === 1) {
			$("#" + id).append(
				"<canvas id='" +
					id +
					"_canvas' width='" +
					ENGINE.gameWIDTH +
					"' height='" +
					height +
					"'></canvas>"
			);
			var prop = alias.shift();
			LAYER[prop] = $("#" + id + "_canvas")[0].getContext("2d");
		} else {
			var canvasElement, prop;
			for (var x = 0; x < layers; x++) {
				canvasElement =
					"<canvas class='layer' id='" +
					id +
					"_canvas_" +
					x +
					"' width='" +
					ENGINE.gameWIDTH +
					"' height='" +
					height +
					"' style='z-index:" +
					x +
					"; top:" +
					ENGINE.currentTOP +
					"px'></canvas>";
				$("#" + id).append(canvasElement);
				prop = alias.shift();
				LAYER[prop] = $("#" + id + "_canvas_" + x)[0].getContext("2d");
			}
			ENGINE.currentTOP = ENGINE.currentTOP + height;
		}
	},
	spriteDraw: function(layer, X, Y, image) {
		var CTX = LAYER[layer];
		CTX.drawImage(image, X, Y);
	},
	clearLayer: function(layer) {
		var CTX = LAYER[layer];
		CTX.clearRect(0, 0, CTX.canvas.width, CTX.canvas.height);
	},
	fillLayer: function(layer, colour) {
		var CTX = LAYER[layer];
		CTX.fillStyle = colour;
		CTX.fillRect(0, 0, CTX.canvas.width, CTX.canvas.height);
	},
	tileToImage: function() {
		var image;
		for (var prop in World) {
			var LN = World[prop].length;
			if (LN) {
				for (var ix = 0; ix < LN; ix++) {
					image = $("#" + World[prop][ix].id)[0];
					SPRITE[World[prop][ix].name] = image;
				}
			}
		}
		//console.log(SPRITE);
	},
	rotateImage: function(image, degree, newName) {
		var CTX = LAYER.title;
		//var CTX = LAYER.temp
		var CW = image.width;
		var CH = image.height;
		var max = MAX(CW,CH);
		var min = MAX(CW,CH);
		CTX.canvas.width = max * 1.5;
		CTX.canvas.height = max * 1.5;
		ENGINE.fillLayer("title", "#000"); //visual debug
		CTX.save();
		CTX.translate(CW / 2, CH / 2);
		CTX.rotate(degree * Math.PI/180);
		CTX.drawImage(image, -min/2, -min/2);
		CTX.restore();
		
		//trim!!
		var imgDATA = CTX.getImageData(0,0,CTX.canvas.width, CTX.canvas.height);
		console.log(imgDATA);
			
		SPRITE[newName] = new Image();
		
		SPRITE[newName].crossOrigin =  "anonymous";
		SPRITE[newName].src = CTX.canvas.toDataURL("image/png");
	}
};

///////////////////////////////prg.js/////////////////////

var PRG = {
	VERSION: "0.01.03",
	NAME: "EngINe",
	SOURCE: "http://www.c00lsch00l.eu/Games/AA/",
	SRC_rel: "/Games/AA/",
	tileGraphics: [],
	INIT: function() {
		console.clear();
		console.log(
			PRG.NAME +
				" " +
				PRG.VERSION +
				" by Lovro Selic, (c) C00lSch00l 2017 on " +
				navigator.userAgent
		);
		PRG.isFirefox = navigator.userAgent.indexOf("Firefox");
		$("#title").html(PRG.NAME);
		$("#version").html(
			PRG.NAME +
				" V" +
				PRG.VERSION +
				" <span style='font-size:14px'>&copy</span> C00lSch00l 2017"
		);
		$("input#toggleAbout").val("About " + PRG.NAME);
		$("#about fieldset legend").append(" " + PRG.NAME + " ");
		$("#load").append(
			"<canvas id ='preload_canvas' width='" +
				INI.LOAD_W +
				"' height='" +
				INI.LOAD_H +
				"'></canvas>"
		);
		PRG.ctx = $("#preload_canvas")[0].getContext("2d");
		////////////////////////////////////
		ENGINE.init();
		$(ENGINE.gameWindowId).width(ENGINE.gameWIDTH + 4);
		ENGINE.addBOX("TITLE", INI.TITLE_HEIGHT, 1, ["title"]);
		ENGINE.addBOX("ROOM", INI.GAME_HEIGHT, 3, ["background", "ships", "text"]);
		console.log(LAYER);

		$("#temp").append("<canvas id ='temp_canvas'></canvas>");
	},
	setup: function() {
		$("#toggleHelp").click(function() {
			$("#help").toggle(400);
		});
		$("#toggleAbout").click(function() {
			$("#about").toggle(400);
		});
	},
	start: function() {
		console.log(PRG.NAME + " started.");
		GAME.start();
	},
	preLoadImages: function() {
		PRG.count = 0;
		var fileNames = getImgFileNames();
		PRG.HMI = fileNames.length;
		for (var ix = 0; ix < PRG.HMI; ix++) {
			PRG.tileGraphics[ix] = new Image();
			PRG.tileGraphics[ix].onload = cnt;
			//
			PRG.tileGraphics[ix].crossOrigin = 'Anonymous';
			PRG.tileGraphics[ix].src = fileNames[ix].filename;
			//
			$("#preload").append(
				"<img id='" + fileNames[ix].id + "' src='" + fileNames[ix].filename + "'/>"
			);
		}
		return;

		function cnt() {
			PRG.count++;
			drawLoadingGraph();

			if (PRG.count === PRG.HMI) {
				PRG.imagesLoaded = true;
				$("#buttons").prepend("<input type='button' id='startGame' value='START'>");
				$("#load").addClass("hidden");
				/* before start */
				ENGINE.tileToImage();
				/**/
				$("#startGame").on("click", PRG.start);
			}
		}

		function drawLoadingGraph() {
			var percent = Math.floor(PRG.count / PRG.HMI * 100);
			var CTX = PRG.ctx;
			CTX.clearRect(0, 0, INI.LOAD_W, INI.LOAD_H);
			CTX.beginPath();
			CTX.lineWidth = "1";
			CTX.strokeStyle = "black";
			CTX.rect(0, 0, INI.LOAD_W, INI.LOAD_H);
			CTX.closePath();
			CTX.stroke();
			CTX.fillStyle = "#999";
			CTX.fillRect(
				1,
				1,
				Math.floor((INI.LOAD_W - 2) * (percent / 100)),
				INI.LOAD_H - 2
			);
			CTX.fillStyle = "black";
			CTX.font = "10px Verdana";
			CTX.fillText(
				"Loading: " + percent + "%",
				INI.LOAD_W * 0.1,
				INI.LOAD_H * 0.62
			);
			return;
		}

		function getImgFileNames() {
			var fileNames = [];
			for (var prop in World) {
				var LN = World[prop].length;
				if (LN) {
					for (var ix = 0; ix < LN; ix++) {
						var name = PRG.SOURCE + World[prop][ix].id + "." + World[prop][ix].type;
						fileNames.push({
							id: World[prop][ix].id,
							filename: name
						});
					}
				}
			}
			return fileNames;
		}
	}
};

var CONST = {
	SPACE: "\u0020",
	NBS: "&nbsp",
	NEWLINE: "\n"
};
var INI = {
	LOAD_W: 202,
	LOAD_H: 22
};
INI.TITLE_HEIGHT = 128;
INI.GAME_HEIGHT = 768;
/////////////////////////////////////////score.js//////////////

var SCORE = {
	checkScore: function(xxx) {
		xxx = parseInt(xxx, 10);
		var start = SCORE.SCORE.depth - 1;
		while (xxx > SCORE.SCORE.value[start] && start >= 0) {
			start--;
		}
		start++;
		if (start === SCORE.SCORE.depth) {
			return;
		} else {
			var yourName = prompt(
				"You reached top " +
					SCORE.SCORE.depth +
					" score. Enter your name (max 10 characters): "
			);
			if (yourName.length > 10) {
				yourName = yourName.substring(0, 10);
			} else if (yourName.length < 10) {
				var temp = 10 - yourName.length;
				var sub = "".fill("&nbsp", temp);
				yourName += sub;
			}
			SCORE.SCORE.value.splice(start, 0, xxx);
			SCORE.SCORE.name.splice(start, 0, yourName);
			SCORE.SCORE.value.splice(SCORE.SCORE.depth, 1);
			SCORE.SCORE.name.splice(SCORE.SCORE.depth, 1);
		}
		return;
	},
	hiScore: function() {
		var HS = "";
		var tempVal;
		for (var hs = 1; hs <= SCORE.SCORE.depth; hs++) {
			HS +=
				hs.toString().padLeft(2, "0") +
				". " +
				SCORE.SCORE.name[hs - 1] +
				" " +
				SCORE.SCORE.value[hs - 1].toString().padLeft(7, "\u0020") +
				"<br/>";
		}
		$("#hiscore").html(HS);
		SCORE.saveHS();
		return;
	},
	saveHS: function() {
		localStorage.setItem(SCORE.SCORE.id, JSON.stringify(SCORE.SCORE));
		return;
	},
	loadHS: function() {
		if (localStorage[SCORE.SCORE.id]) {
			SCORE.SCORE = JSON.parse(localStorage[SCORE.SCORE.id]);
		}
	},
	SCORE: {
		value: [50000, 20000, 10000, 5000, 1000, 200, 100, 50, 20, 10],
		name: [
			"C00lSch00l",
			"C00lSch00l",
			"C00lSch00l",
			"C00lSch00l",
			"C00lSch00l",
			"C00lSch00l",
			"C00lSch00l",
			"C00lSch00l",
			"C00lSch00l",
			"C00lSch00l"
		],
		depth: 10,
		id: "ENGINE"
	},
	dom: "<div id='hiscore'></div>",
	init: function(id) {
		var appTo;
		if (!id) {
			appTo = "body";
		} else appTo = "#" + id;
		$(appTo).append(SCORE.dom);
	}
};

////////////////////end of score.js/////////////////////////

///////////////Preloading////////////////////

var Tile = function(id, x, y, type, name) {
	this.id = id;
	this.x = x;
	this.y = y;
	this.type = type;
	this.name = name;
};
var Coolie = new Tile("Coolie2", 48, 48, "png", "coolie");
var Invader = new Tile("invader", 48, 38, "png", "invader");
var World = {
	sprite: [Coolie, Invader]
};
/////

//////////////
var GAME = {
	start: function() {
		//ENGINE.tileToImage();

		/* test */
		TITLE.render();

		ENGINE.fillLayer("background", "#000");

		ENGINE.spriteDraw("background", 10, 10, SPRITE.coolie);
		ENGINE.spriteDraw("ships", 100, 100, SPRITE.invader);
		ENGINE.spriteDraw("text", 60, 20, SPRITE.coolie);
		ENGINE.spriteDraw("ships", 150, 150, SPRITE.invader);
		
		ENGINE.rotateImage(SPRITE.invader, 30, "invader_30");
		ENGINE.spriteDraw("ships", 100, 150, SPRITE.invader_30);
		console.log(SPRITE);
	}
};
var TITLE = {
	render: function() {
		TITLE.background();
		TITLE.title();
	},
	title: function() {
		var CTX = LAYER.title;
		var grad = CTX.createLinearGradient(8, 100, 128, 128);
		grad.addColorStop("0", "#000000");
		grad.addColorStop("0.2", "#00ee00");
		grad.addColorStop("0.5", "#00ff00");
		grad.addColorStop("0.8", "#eef442");
		grad.addColorStop("1.0", "#b2f441");
		CTX.fillStyle = grad;
		CTX.font = "40px Consolas";
		CTX.shadowColor = "#ccff66";
		CTX.shadowOffsetX = 1;
		CTX.shadowOffsetY = 1;
		CTX.shadowBlur = 2;
		var x = 30;
		var y = 40;
		CTX.fillText(PRG.NAME, x, y);
		CTX.font = "12px Consolas";
		CTX.shadowOffsetX = 1;
		CTX.shadowOffsetY = 1;
		CTX.shadowBlur = 1;
		y = 70;
		CTX.fillText("Version " + PRG.VERSION, x, y);
		y = 86;
		CTX.fillText("by Lovro Selič", x, y);
		y = 108;
		CTX.font = "14px Consolas";
		CTX.fillText(String.fromCharCode(169) + " C00lSch00l 2017", x, y);
	},
	background: function() {
		var CTX = LAYER.title;
		CTX.fillStyle = "#000";
		CTX.roundRect(
			0,
			0,
			ENGINE.gameWIDTH,
			INI.TITLE_HEIGHT,
			{
				upperLeft: 10,
				upperRight: 10,
				lowerLeft: 10,
				lowerRight: 10
			},
			true,
			true
		);
	}
};

////////////////
$(document).ready(function() {
	PRG.INIT();
	PRG.setup();
	PRG.preLoadImages();
	SCORE.init("SC");
	SCORE.loadHS();
	SCORE.hiScore();
});
