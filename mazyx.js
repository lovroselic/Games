/////////////////////////////////////////////////
/*
 
 to do:
  
 known bugs: 
    
 */
/////////////////////misc/////////////////////////
(function () {
    function RND(start, end) {
        return Math.floor(Math.random() * (++end - start) + start);
    }

    function coinFlip() {
        var flip = RND(0, 1);
        if (flip)
            return true;
        return false;
    }
    window.RND = RND;
    window.coinFlip = coinFlip;
})();

/////////////debug vars: remove all in production/////////////////////

var DEBUG = {
    printArray: function (arr) {
        for (var c = 0; c < arr.length; c++) {
            console.log(arr[c]);
        }
    }
};
//DEBUG.MAX = 0;
//DEBUG.CHEAT = true;
//DEBUG.INVINCIBLE = true;
//DEBUG.INVINCIBLE = false;
//DEBUG.CHEAT = false;
//DEBUG.LEVEL = 18;
//DEBUG.LEVEL = 20;

////////////////////////////////////////////////////////////////////

CanvasRenderingContext2D.prototype.roundRect = function (
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
    if (typeof stroke === "undefined") {
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

Array.prototype.clear = function () {
    if (!this)
        return false;
    this.splice(0, this.length);
};

Array.prototype.swap = function (x, y) {
    var TMP = this[x];
    this[x] = this[y];
    this[y] = TMP;
    return this;
};

Array.prototype.shuffle = function () {
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

Array.prototype.sum = function () {
    var x = this.length;
    var total = 0;
    for (var y = 0; y < x; y++) {
        total += this[y];
    }
    return total || -1;
};

Array.prototype.average = function () {
    var sum = this.sum();
    var x = this.length;
    return sum / x || -1;
};

Array.prototype.createPool = function (mx, N) {
    if (!this)
        return false;
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

Array.prototype.compare = function (array) {
    if (!array)
        return false;
    var LN = this.length;
    if (LN !== array.length)
        return false;
    for (var x = 0; x < LN; x++) {
        if (this[x] !== array[x])
            return false;
    }
    return true;
};

Array.prototype.remove = function (value) {
    var LN = this.length;
    for (var x = 0; x < LN; x++) {
        if (this[x] === value) {
            this.splice(x, 1);
            this.remove(value);
        }
    }
};

Array.prototype.chooseRandom = function () {
    var LN = this.length;
    var choose = rnd(1, LN) - 1;
    return this[choose];

    function rnd(start, end) {
        return Math.floor(Math.random() * (++end - start) + start);
    }
};

Array.prototype.removeRandom = function () {
    var LN = this.length;
    var choose = rnd(1, LN) - 1;
    return this.splice(choose, 1);

    function rnd(start, end) {
        return Math.floor(Math.random() * (++end - start) + start);
    }
};

String.prototype.fill = function (stringy, howMany) {
    var s = "";
    for (; ; ) {
        if (howMany & 1)
            s += stringy;
        howMany >>= 1;
        if (howMany)
            stringy += stringy;
        else
            break;
    }
    return s;
};

String.prototype.padLeft = function (LN, fill) {
    var s = "".fill(fill, LN) + this;
    return s.substring(s.length - LN);
};

String.prototype.padRight = function (LN, fill) {
    var s = this + "".fill(fill, LN);
    return s.substring(0, LN);
};

String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.substr(1).toLowerCase();
};

///////////////////////////////prg.js/////////////////////
var RoomScreen0 = {};
var RoomScreen1 = {};
var RoomScreen2 = {};
var TitleScreen = {};
var PRG = {
    VERSION: "1.00",
    NAME: "MazyX",
    SOURCE: "/Games/AA/",
    tileGraphics: [],
    INIT: function () {
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
                " by Lovro Selič <span style='font-size:14px'>&copy</span> C00lSch00l 2017"
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
        $("#game").width(INI.GAME_WIDTH);
        $("#game").append(
                "<div id ='TITLE'><canvas id='TITLE_canvas' width='" +
                INI.ROOM_WIDTH +
                "' height='" +
                INI.TITLE_HEIGHT +
                "'></canvas></div>"
                );
        $("#game").append("<div id ='ROOM'></div>");
        $("#ROOM").append(
                "<canvas class='layer' id='ROOM_canvas0' width='" +
                INI.ROOM_WIDTH +
                "' height='" +
                INI.ROOM_HEIGHT +
                "' style='z-index:0'></canvas>"
                );
        $("#ROOM").append(
                "<canvas class='layer' id='ROOM_canvas1' width='" +
                INI.ROOM_WIDTH +
                "' height='" +
                INI.ROOM_HEIGHT +
                "' style='z-index:1'></canvas>"
                );
        $("#ROOM").append(
                "<canvas class='layer' id='ROOM_canvas2' width='" +
                INI.ROOM_WIDTH +
                "' height='" +
                INI.ROOM_HEIGHT +
                "' style='z-index:2'></canvas>"
                );

        RoomScreen0.ctx = $("#ROOM_canvas0")[0].getContext("2d");
        RoomScreen1.ctx = $("#ROOM_canvas1")[0].getContext("2d");
        RoomScreen2.ctx = $("#ROOM_canvas2")[0].getContext("2d");
        TitleScreen.ctx = $("#TITLE_canvas")[0].getContext("2d");
        $("#temp").append("<canvas id ='temp_canvas'></canvas>");
    },
    setup: function () {
        $("#toggleHelp").click(function () {
            $("#help").toggle(400);
        });
        $("#toggleAbout").click(function () {
            $("#about").toggle(400);
        });
    },
    start: function () {
        console.log(PRG.NAME + " started.");
        COOLIE.reset();
        GAME.start();
    },
    preLoadImages: function () {
        PRG.count = 0;
        var fileNames = getImgFileNames();
        PRG.HMI = fileNames.length;
        for (var ix = 0; ix < PRG.HMI; ix++) {
            PRG.tileGraphics[ix] = new Image();
            PRG.tileGraphics[ix].onload = cnt;
            PRG.tileGraphics[ix].src = fileNames[ix].filename;
            $("#preload").append(
                    "<img id='" +
                    fileNames[ix].id +
                    "' src='" +
                    fileNames[ix].filename +
                    "'/>"
                    );
        }
        return;

        function cnt() {
            PRG.count++;
            drawLoadingGraph();

            if (PRG.count === PRG.HMI) {
                PRG.imagesLoaded = true;
                $("#buttons").prepend(
                        "<input type='button' id='startGame' value='START'>"
                        );
                $("#load").addClass("hidden");
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
                        var name =
                                PRG.SOURCE + World[prop][ix].id + "." + World[prop][ix].type;
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
/////////////////////////////////////////score.js//////////////

var SCORE = {
    checkScore: function (xxx) {
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
    hiScore: function () {
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
    saveHS: function () {
        localStorage.setItem(SCORE.SCORE.id, JSON.stringify(SCORE.SCORE));
        return;
    },
    loadHS: function () {
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
        id: "MAZYX"
    },
    dom: "<div id='hiscore'></div>",
    init: function (id) {
        var appTo;
        if (!id) {
            appTo = "body";
        } else
            appTo = "#" + id;
        $(appTo).append(SCORE.dom);
    }
};

////////////////////end of score.js/////////////////////////

//////////////INI for maze.js///////////////
INI.ROOM_WIDTH = 960;
INI.ROOM_HEIGHT = 768;
INI.TITLE_HEIGHT = 128;
INI.MAX_MAZE_HEIGHT = 768;
INI.MAX_MAZE_WIDTH = 960;
INI.GAME_WIDTH = INI.ROOM_WIDTH + 4;
INI.GRIDPX = 48;
INI.MAX_MAZE_X = INI.MAX_MAZE_WIDTH / INI.GRIDPX;
INI.MAX_MAZE_Y = INI.MAX_MAZE_HEIGHT / INI.GRIDPX;
INI.ANIMATION_INTERVAL = 32;
INI.GHOST_PPF = 2;
INI.GHOST_SPEEDUP = 64;
INI.HISTORY_LENGTH = 8;
INI.BOMB_FUSE = 2500;
INI.BOMB_EXPLOSION = 1000;
INI.MAX_LEVEL = 20;

var Tile = function (id, x, y, type) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.type = type;
};

///////////////Preloading////////////////////
var BrickWall = new Tile("BrickWall", 128, 128, "jpg");
var BrickWall2 = new Tile("BrickWall2", 225, 225, "jpg");
var BrickWall3 = new Tile("BrickWall3", 200, 200, "jpg");
var BrickWall4 = new Tile("BrickWall4", 128, 72, "jpg");
var BrokenRuin = new Tile("BrokenRuin", 128, 128, "jpg");
var CastleWall = new Tile("CastleWall", 128, 128, "jpg");
var DungeonFloor = new Tile("DungeonFloor", 64, 64, "jpg");
var DungeonFloor2 = new Tile("DungeonFloor2", 256, 256, "jpg");
var DungeonWall = new Tile("DungeonWall", 236, 236, "jpg");
var DungeonWall2 = new Tile("DungeonWall2", 214, 214, "jpg");
var DungeonWall3 = new Tile("DungeonWall3", 128, 128, "jpg");
var Grass = new Tile("Grass", 200, 200, "jpg");
var Gravel = new Tile("Gravel", 200, 200, "jpg");
var HedgeWall = new Tile("HedgeWall", 200, 200, "jpg");
var MorgueFloor = new Tile("MorgueFloor", 128, 128, "jpg");
var OldWall = new Tile("OldWall", 200, 200, "jpg");
var Pavement = new Tile("Pavement", 200, 200, "jpg");
var Pavement2 = new Tile("Pavement2", 200, 200, "jpg");
var RockFloor = new Tile("RockFloor", 128, 128, "jpg");
var SlateWall = new Tile("SlateWall", 256, 256, "jpg");
var StoneFloor = new Tile("StoneFloor", 256, 171, "jpg");
var StoneFloor2 = new Tile("StoneFloor2", 256, 171, "jpg");
var StoneFloor3 = new Tile("StoneFloor3", 256, 171, "jpg");
var StoneFloor4 = new Tile("StoneFloor4", 256, 171, "jpg");
var StoneWall = new Tile("StoneWall", 128, 128, "jpg");
var StoneWall2 = new Tile("StoneWall2", 128, 128, "jpg");
var StrangeWall = new Tile("StrangeWall", 128, 128, "jpg");
var ThachFloor = new Tile("ThatchFloor", 200, 200, "jpg");
var WhiteWall = new Tile("WhiteWall", 217, 118, "jpg");
var YellowBrick = new Tile("YellowBrick", 200, 200, "jpg");
var RockFloor48 = new Tile("RockFloor48", 48, 48, "jpg");
var Coolie = new Tile("Coolie2", 48, 48, "png");
var Tile1 = new Tile("Tile1_48", 48, 48, "png");
var Tile2 = new Tile("Tile2_48", 48, 48, "png");
var Tile3 = new Tile("Tile3_48", 48, 48, "png");
var Tile4 = new Tile("Tile4_48", 48, 48, "png");
var Tile5 = new Tile("Tile5_48", 48, 48, "png");

var Lantern = new Tile("lantern", 32, 48, "png");
var Apple = new Tile("apple2", 48, 48, "png");
var Pear = new Tile("pear2", 48, 48, "png");
var Pineapple = new Tile("pineapple2", 48, 48, "png");
var Watermelon = new Tile("watermelon2", 48, 48, "png");
var Banana = new Tile("banana2", 48, 48, "png");
var Ring = new Tile("ring", 48, 42, "png");
var Acorn = new Tile("acorn", 48, 41, "png");
var Necklace = new Tile("necklace", 39, 48, "png");
var Mushroom = new Tile("mushroom2", 33, 48, "png");
var Candle = new Tile("candle", 15, 48, "png");
var Strawberry = new Tile("strawberry2", 48, 45, "png");
var Orange = new Tile("orange2", 48, 45, "png");
var Crown = new Tile("crown", 48, 42, "png");
var Coin = new Tile("goldCoin", 48, 47, "png");
var Stairs_closed = new Tile("stairs_closed", 48, 24, "png");
var Stairs_open = new Tile("stairs_open", 48, 24, "png");
var Stairs_entrance = new Tile("stairs_entrance", 48, 48, "png");
var Ghost_left = new Tile("ghost_left", 48, 44, "png");
var Ghost_right = new Tile("ghost_right", 48, 44, "png");
var Snail_left = new Tile("snail_left", 48, 33, "png");
var Snail_right = new Tile("snail_right", 48, 33, "png");
var Witch_right = new Tile("witch_right", 48, 39, "png");
var Witch_left = new Tile("witch_left", 48, 39, "png");
var CoolieGhost = new Tile("fly2", 48, 48, "png");
var CoolieDead = new Tile("grave", 46, 48, "png");
var WowLeft = new Tile("wow_left", 48, 48, "png");
var WowRight = new Tile("wow_right", 48, 48, "png");
var BeastLeft = new Tile("beast_left", 31, 48, "png");
var BeastRight = new Tile("beast_right", 31, 48, "png");
var PacLeft = new Tile("pac_left", 48, 48, "png");
var PacRight = new Tile("pac_right", 48, 48, "png");
var InvRight = new Tile("invader", 48, 38, "png");
var InvLeft = new Tile("invader", 48, 38, "png");
var DragonRight = new Tile("dragon_right", 48, 38, "png");
var DragonLeft = new Tile("dragon_left", 48, 38, "png");
var WaspRight = new Tile("wasp_right", 48, 31, "png");
var WaspLeft = new Tile("wasp_left", 48, 31, "png");
var Bomb = new Tile("bomb", 48, 44, "png");
var Bomb0 = new Tile("bomb0", 48, 44, "png");
var Bomb2 = new Tile("bomb2", 48, 44, "png");
var Explosion = new Tile("explosion", 48, 45, "png");
var Poison = new Tile("Poison", 17, 48, "png");
var Splash = new Tile("green", 46, 48, "png");

var World = {
    wall: [
        BrickWall,
        BrickWall2,
        BrickWall3,
        BrickWall4,
        DungeonWall,
        DungeonWall2,
        DungeonWall3,
        WhiteWall,
        CastleWall,
        HedgeWall,
        OldWall,
        SlateWall,
        StoneWall,
        StoneWall2,
        StrangeWall
    ],
    wall2: [
        MorgueFloor,
        DungeonFloor,
        DungeonFloor2,
        StoneFloor,
        BrokenRuin,
        StoneFloor2,
        StoneFloor3,
        StoneFloor4,
        Grass,
        Gravel,
        Pavement,
        Pavement2,
        RockFloor,
        ThachFloor,
        YellowBrick
    ],
    floor: [RockFloor48, Tile1, Tile2, Tile3, Tile4, Tile5],
    item: [
        Lantern,
        Apple,
        Pear,
        Pineapple,
        Watermelon,
        Banana,
        Ring,
        Acorn,
        Necklace,
        Mushroom,
        Candle,
        Strawberry,
        Orange,
        Crown,
        Coin
    ],
    furniture: [Stairs_closed, Stairs_open, Stairs_entrance],
    monster: [
        Ghost_left,
        Ghost_right,
        Snail_left,
        Snail_right,
        Witch_right,
        Witch_left,
        WowLeft,
        WowRight,
        BeastLeft,
        BeastRight,
        PacLeft,
        PacRight,
        InvRight,
        InvLeft,
        DragonRight,
        DragonLeft,
        WaspRight,
        WaspLeft
    ],
    sprite: [Coolie, CoolieGhost, CoolieDead],
    action: [Bomb, Poison, Splash, Explosion, Bomb0, Bomb2]
};

/*******************maze.js************************************/
var Vector = function (x, y) {
    this.x = x;
    this.y = y;
};
var Pointer = function (x, y, vector) {
    this.x = x;
    this.y = y;
    this.vector = vector;
};
Vector.prototype.add = function (vector) {
    return new Vector(this.x + vector.x, this.y + vector.y);
};
Vector.prototype.mul = function (vector, num) {
    return new Vector(this.x + num * vector.x, this.y + num * vector.y);
};
Vector.prototype.distance = function (vector) {
    var distance = Math.abs(this.x - vector.x) + Math.abs(this.y - vector.y);
    return distance;
};
Vector.prototype.mirror = function () {
    var nx, ny;
    if (this.x) {
        nx = -this.x;
    } else {
        nx = 0;
    }
    if (this.y) {
        ny = -this.y;
    } else {
        ny = 0;
    }
    return new Vector(nx, ny);
};
var UP = new Vector(0, -1);
var DOWN = new Vector(0, 1);
var LEFT = new Vector(-1, 0);
var RIGHT = new Vector(1, 0);
var AllDirections = [
    [-1, -1],
    [0, -1],
    [1, -1],
    [-1, 0],
    [1, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
    [0, 0]
];

var Directions = [[0, -1], [-1, 0], [1, 0], [0, 1]];

var addDir = [
    [-1, -2],
    [1, -2],
    [-2, -1],
    [2, -1],
    [-2, 1],
    [2, 1],
    [-1, 2],
    [1, 2]
];

var Corners = [[1, 1], [1, -1], [-1, 1], [-1, -1]];

var Grid = function (block, avail) {
    this.block = block;
    this.avail = avail;
    this.cache = [];
    this.door = function (tile, open) {
        this.tile = tile;
        this.open = open;
    };
};

var Maze = {
    pattern: {},
    deadEnds: [],
    init: function (X, Y) {
        var grid = [];
        for (var x = 0; x < X; x++) {
            grid[x] = [];
            for (var y = 0; y < Y; y++) {
                grid[x][y] = new Grid(true, true);
            }
        }
        Maze.matrix = grid;
        Maze.maxX = X;
        Maze.maxY = Y;
        Maze.deadEnds.clear();
        Maze.Tiles = 0;
        Maze.density = 1;
        Maze.hasSolution = false;
    },
    createRoom: function (coord, type) {
        var x = coord[0];
        var y = coord[1];
        var ADL = AllDirections.length;
        for (var ix = 0; ix < ADL; ix++) {
            Maze.matrix[x + AllDirections[ix][0]][
                    y + AllDirections[ix][1]
            ].block = false;
            Maze.matrix[x + AllDirections[ix][0]][
                    y + AllDirections[ix][1]
            ].type = type;
            Maze.matrix[x + AllDirections[ix][0]][
                    y + AllDirections[ix][1]
            ].avail = false;
            var tempX = x + 2 * AllDirections[ix][0];
            var tempY = y + 2 * AllDirections[ix][1];
            if (Maze.isIn(tempX, tempY)) {
                Maze.matrix[tempX][tempY].avail = false;
            }
        }
        ADL = addDir.length;
        for (var i = 0; i < ADL; i++) {
            var tX = x + addDir[i][0];
            var tY = y + addDir[i][1];
            if (Maze.isIn(tX, tY)) {
                Maze.matrix[tX][tY].avail = false;
            }
        }
    },
    isIn: function (tempX, tempY) {
        if (tempX < 0 || tempX >= Maze.maxX || tempY < 0 || tempY >= Maze.maxY) {
            return false;
        } else
            return true;
    },
    isFree: function (X, Y) {
        if (Maze.isIn(X, Y)) {
            if (Maze.matrix[X][Y].avail === true) {
                return true;
            } else
                return false;
        }
        return false;
    },
    startCoord: function () {
        var x = RND(1, Maze.maxX - 2);
        var y = RND(1, Maze.maxY - 2);
        if (coinFlip()) {
            if (coinFlip()) {
                x = 1;
            } else {
                x = Maze.maxX - 2;
            }
        } else {
            if (coinFlip()) {
                y = 1;
            } else {
                y = Maze.maxY - 2;
            }
        }
        Maze.entrance = [x, y];
    },
    endCoord: function () {
        var x = Maze.maxX - Maze.entrance[0] - 1;
        var y = Maze.maxY - Maze.entrance[1] - 1;
        Maze.exit = [x, y];
    },
    createStaircase: function () {
        Maze.matrix[Maze.entrance[0]][Maze.entrance[1]].door = {
            tile: Stairs_entrance,
            open: false
        };
        Maze.matrix[Maze.exit[0]][Maze.exit[1]].door = {
            tile: Stairs_closed,
            open: false
        };
    },
    create: function (X, Y) {
        Maze.init(X, Y);
        Maze.startCoord();
        Maze.createRoom(Maze.entrance, "ENTRANCE");
        Maze.endCoord();
        Maze.createRoom(Maze.exit, "EXIT");
        Maze.createStaircase();
        Maze.corridor();
        Maze.stat();
        var density = parseFloat(Maze.density);
        if (density < 0.4 || Maze.deadEnds.length < 5) {
            Maze.create(X, Y);
            return;
        }
        Maze.makeExit();
        if (Maze.hasSolution === false) {
            Maze.create(X, Y);
            return;
        }
        if (Maze.addCorridors > 0) {
            Maze.connect();
        }
        Maze.itemGrid(Maze.itemN);
        var CTX = RoomScreen0.ctx;
        var wallPattern = $("#" + Maze.wallPattern)[0];
        Maze.pattern.wall = CTX.createPattern(wallPattern, "repeat");
        var corridorPattern = $("#" + Maze.corridorPattern)[0];
        Maze.pattern.corridor = CTX.createPattern(corridorPattern, "repeat");
    },
    seed: function () {
        var options = [];
        for (var t = 0; t < 4; t++) {
            var x = Maze.entrance[0] + 2 * Directions[t][0];
            var y = Maze.entrance[1] + 2 * Directions[t][1];
            if (!Maze.isIn(x, y))
                continue;
            options.push([x, y]);
        }
        var badStarts = [
            [Maze.maxX - 2, Maze.maxY - 2],
            [1, 1],
            [Maze.maxX - 2, 1],
            [Maze.maxX - 1, 1],
            [Maze.maxX - 2, 0],
            [1, Maze.maxY - 2],
            [1, Maze.maxY - 1],
            [0, Maze.maxY - 2],
            [0, 1],
            [1, 0],
            [Maze.maxX - 1, Maze.maxY - 2],
            [Maze.maxX - 2, Maze.maxY - 1]
        ];
        var OLN = options.length;
        var remove = [];
        for (var n = 0; n < OLN; n++) {
            for (var m = 0; m < badStarts.length; m++) {
                if (options[n].compare(badStarts[m])) {
                    remove.push(n);
                    break;
                }
            }
        }
        for (var xx = 0; xx < remove.length; xx++) {
            var removed = options.splice(remove[xx], 1);
        }
        OLN = options.length;
        return options[RND(1, OLN) - 1];
    },
    dot: function (X, Y) {
        Maze.matrix[X][Y].block = false;
        Maze.matrix[X][Y].type = "CORRIDOR";
        Maze.matrix[X][Y].avail = false;
    },
    isDot: function (X, Y) {
        if (Maze.isIn(X, Y)) {
            if (Maze.matrix[X][Y].block === false) {
                return true;
            }
        }
        return false;
    },
    isEntrance: function (X, Y) {
        if (Maze.isIn(X, Y)) {
            if (Maze.matrix[X][Y].type === "ENTRANCE") {
                return true;
            }
        }
        return false;
    },
    isBlock: function (X, Y) {
        if (Maze.isIn(X, Y)) {
            if (Maze.matrix[X][Y].block === true) {
                return true;
            }
        }
        return false;
    },
    dotExclude: function (X, Y) {
        if (Maze.isIn(X, Y)) {
            Maze.matrix[X][Y].avail = false;
        }
    },
    dotInclude: function (X, Y) {
        if (Maze.isIn(X, Y)) {
            Maze.matrix[X][Y].avail = true;
        }
    },
    corridor: function () {
        var start = Maze.seed();
        filterBorder();
        Maze.dotInclude(start[0], start[1]);
        var STACK = [start];
        var dirSTACK = [
            new Vector(
                    (start[0] - Maze.entrance[0]) / 2,
                    (start[1] - Maze.entrance[1]) / 2
                    )
        ];
        var next, nextX, nextY, candidates, CL, moveDirection;
        while (STACK.length > 0) {
            next = STACK.pop();
            var storedDirection = dirSTACK.pop();
            nextX = next[0];
            nextY = next[1];
            var forkX = nextX - storedDirection.x;
            var forkY = nextY - storedDirection.y;
            blockLateral(nextX, nextY, storedDirection);
            blockForward(forkX, forkY, storedDirection);
            if (Maze.isFree(nextX, nextY)) {
                while (true) {
                    if (Maze.isFree(nextX, nextY)) {
                        moveDirection = moveDirection || storedDirection;
                        Maze.dot(nextX, nextY);
                        candidates = searchNext(nextX, nextY);
                        CL = candidates.length;
                        if (CL === 0) {
                            Maze.deadEnds.push([nextX, nextY]);
                            break;
                        } else if (CL > 1) {
                            var chance = RND(1, CL) - 1;
                            var chosen = candidates.splice(chance, 1);
                            CL = candidates.length;
                            for (var t = 0; t < CL; t++) {
                                var pop = candidates.pop();
                                STACK.push(pop);
                                dirSTACK.push(new Vector(pop[0] - nextX, pop[1] - nextY));
                            }
                            candidates = chosen;
                        }
                        var newX = candidates[0][0];
                        var newY = candidates[0][1];
                        moveDirection = new Vector(newX - nextX, newY - nextY);
                        blockForward(newX, newY, moveDirection);
                        blockForward(nextX, nextY, moveDirection);
                        blockLateral(newX, newY, moveDirection);
                        nextX = newX;
                        nextY = newY;
                    } else
                        break;
                }
            }
        }

        function blockForward(newX, newY, moveDirection) {
            var possible = [];
            if (moveDirection.x !== 0) {
                possible.push([newX + 2 * moveDirection.x, newY]);
                possible.push([newX + 2 * moveDirection.x, newY - 1]);
                possible.push([newX + 2 * moveDirection.x, newY + 1]);
                for (var ttx = 0; ttx < 3; ttx++) {
                    if (Maze.isDot(possible[ttx][0], possible[ttx][1])) {
                        Maze.dotExclude(newX + moveDirection.x, newY);
                        Maze.dotExclude(newX + moveDirection.x, newY + 1);
                        Maze.dotExclude(newX + moveDirection.x, newY - 1);
                    }
                }
            } else if (moveDirection.y !== 0) {
                possible.push([newX, newY + 2 * moveDirection.y]);
                possible.push([newX - 1, newY + 2 * moveDirection.y]);
                possible.push([newX + 1, newY + 2 * moveDirection.y]);
                for (var tt = 0; tt < 3; tt++) {
                    if (Maze.isDot(possible[tt][0], possible[tt][1])) {
                        Maze.dotExclude(newX, newY + moveDirection.y);
                        Maze.dotExclude(newX + 1, newY + moveDirection.y);
                        Maze.dotExclude(newX - 1, newY + moveDirection.y);
                    }
                }
            }
        }

        function blockLateral(newX, newY, moveDirection) {
            var shadow = [new Vector(), new Vector()];
            if (moveDirection.x !== 0) {
                shadow[0].x = -moveDirection.x;
                shadow[1].x = -moveDirection.x;
                shadow[0].y = 1;
                shadow[1].y = -1;
            } else if (moveDirection.y !== 0) {
                shadow[0].y = -moveDirection.y;
                shadow[1].y = -moveDirection.y;
                shadow[0].x = 1;
                shadow[1].x = -1;
            }
            var SHL = shadow.length;
            for (var s = 0; s < SHL; s++) {
                var tX = newX + shadow[s].x + moveDirection.x;
                var tY = newY + shadow[s].y + moveDirection.y;
                if (Maze.isDot(newX + shadow[s].x, newY + shadow[s].y)) {
                    Maze.dotExclude(
                            newX + shadow[s].x + moveDirection.x,
                            newY + shadow[s].y + moveDirection.y
                            );
                }
                var lateral = moveDirection.add(shadow[s]);
                if (Maze.isDot(tX + lateral.x, tY + lateral.y)) {
                    Maze.dotExclude(tX, tY);
                    Maze.dotExclude(tX + moveDirection.x, tY + moveDirection.y);
                }
                if (
                        Maze.isDot(
                                nextX + 2 * lateral.x + moveDirection.x,
                                nextY + 2 * lateral.y + moveDirection.y
                                )
                        ) {
                    Maze.dotExclude(nextX + lateral.x, nextY + lateral.y);
                }
            }
        }

        function searchNext(X, Y) {
            var candidatesCollection = [];
            for (var t = 0; t < 4; t++) {
                var tempX = X + Directions[t][0];
                var tempY = Y + Directions[t][1];
                if (Maze.matrix[tempX][tempY].avail) {
                    candidatesCollection.push([tempX, tempY]);
                }
            }
            return candidatesCollection;
        }

        function filterBorder() {
            for (var x = 0; x < Maze.maxX; x++) {
                Maze.matrix[x][0].avail = false;
                Maze.matrix[x][Maze.maxY - 1].avail = false;
            }
            for (var y = 0; y < Maze.maxY; y++) {
                Maze.matrix[0][y].avail = false;
                Maze.matrix[Maze.maxX - 1][y].avail = false;
            }
        }
    },
    renderBackground: function () {
        var CTX = RoomScreen0.ctx;
        drawBackground();
        function drawBackground() {
            CTX.rect(0, 0, INI.MAX_MAZE_WIDTH, INI.MAX_MAZE_HEIGHT);
            CTX.fillStyle = Maze.pattern.wall;
            CTX.fill();
            CTX.rect(0, 0, INI.MAX_MAZE_WIDTH, INI.MAX_MAZE_HEIGHT);
            CTX.stroke();
        }
    },
    renderStairs: function () {
        var CTX = RoomScreen0.ctx;
        Sprite.draw(
                CTX,
                Maze.entrance[0],
                Maze.entrance[1],
                Maze.matrix[Maze.entrance[0]][Maze.entrance[1]].door.tile
                );
        Sprite.draw(
                CTX,
                Maze.exit[0],
                Maze.exit[1],
                Maze.matrix[Maze.exit[0]][Maze.exit[1]].door.tile
                );
    },
    renderCorridors: function () {
        var CTX = RoomScreen0.ctx;
        for (var x = 0; x < Maze.maxX; x++) {
            for (var y = 0; y < Maze.maxY; y++) {
                if (Maze.matrix[x][y].block === false) {
                    drawTilePattern(x, y);
                }
            }
        }

        function drawTilePattern(xGrid, yGrid) {
            var x = xGrid * INI.GRIDPX;
            var y = yGrid * INI.GRIDPX;
            CTX.fillStyle = Maze.pattern.corridor;
            CTX.fillRect(x, y, INI.GRIDPX, INI.GRIDPX);
        }
    },
    renderItems: function () {
        var CTX = RoomScreen1.ctx;
        for (var x = 0; x < Maze.maxX; x++) {
            for (var y = 0; y < Maze.maxY; y++) {
                if (Maze.matrix[x][y].cache.length === 1) {
                    var tempTile = Maze.matrix[x][y].cache[0];
                    Sprite.draw(CTX, x, y, tempTile);
                }
            }
        }
    },
    render: function () {
        Maze.renderBackground();
        Maze.renderCorridors();
        Maze.renderStairs();
        Maze.clearLayer(1);
        Maze.renderItems();
    },
    clearLayer: function (L) {
        var CTXname = "RoomScreen" + L.toString();
        var CTX = window[CTXname].ctx;
        CTX.clearRect(0, 0, INI.ROOM_WIDTH, INI.ROOM_HEIGHT);
    },
    stat: function () {
        for (var x = 0; x < Maze.maxX; x++) {
            for (var y = 0; y < Maze.maxY; y++) {
                if (Maze.matrix[x][y].block === false) {
                    Maze.Tiles++;
                }
            }
        }
        var density = Maze.Tiles / (Maze.maxX * Maze.maxY);
        Maze.density = density.toFixed(3);
    },
    makeExit: function () {
        var pointerCollection = [];
        var ADL = AllDirections.length - 1;
        var exitX = parseInt(Maze.exit[0], 10);
        var exitY = parseInt(Maze.exit[1], 10);
        for (var z = 0; z < ADL; z++) {
            var px = exitX + AllDirections[z][0];
            var py = exitY + AllDirections[z][1];
            var vectors = [[AllDirections[z][0], 0], [0, AllDirections[z][1]]];
            var VL = vectors.length;
            for (var t = 0; t < VL; t++) {
                pointerCollection.push(
                        new Pointer(px, py, new Vector(vectors[t][0], vectors[t][1]))
                        );
            }
        }
        var solutions = [];
        var PCL = pointerCollection.length;
        var CX, CY, SX, SY;
        for (var g = 0; g < PCL; g++) {
            var vct = pointerCollection[g].vector;
            if (vct.x === 0 && vct.y === 0)
                continue;
            CX = pointerCollection[g].x + vct.x;
            SX = pointerCollection[g].x + 2 * vct.x;
            CY = pointerCollection[g].y + vct.y;
            SY = pointerCollection[g].y + 2 * vct.y;
            if (Maze.isDot(SX, SY)) {
                solutions.push([CX, CY]);
            }
        }
        var SL = solutions.length;
        if (SL > 0) {
            var SLX = RND(1, SL) - 1;
            Maze.dot(solutions[SLX][0], solutions[SLX][1]);
            Maze.hasSolution = true;
        }
    },
    hasHorizontalBridge: function (X, Y) {
        if (Maze.isBlock(X, Y)) {
            if (Maze.isDot(X - 1, Y) && Maze.isDot(X + 1, Y)) {
                if (Maze.isBlock(X, Y + 1) && Maze.isBlock(X, Y - 1)) {
                    return true;
                }
            }
        }
        return false;
    },
    hasVerticalBridge: function (X, Y) {
        if (Maze.isBlock(X, Y)) {
            if (Maze.isBlock(X - 1, Y) && Maze.isBlock(X + 1, Y)) {
                if (Maze.isDot(X, Y + 1) && Maze.isDot(X, Y - 1)) {
                    return true;
                }
            }
        }
        return false;
    },
    connect: function () {
        var inputPool = makePool();
        var connectionsCounter = 0;
        var setConnections = parseInt(Maze.addCorridors, 10);
        while (connectionsCounter < setConnections) {
            var outputPool = [];
            var IPL = inputPool.length;
            for (var t = 0; t < IPL; t++) {
                var tempX = inputPool[t][0];
                var tempY = inputPool[t][1];
                if (
                        Maze.hasHorizontalBridge(tempX, tempY) ||
                        Maze.hasVerticalBridge(tempX, tempY)
                        ) {
                    outputPool.push([tempX, tempY]);
                }
            }
            if (outputPool.length === 0)
                break;
            var removeIndex = RND(1, outputPool.length) - 1;
            var removed = outputPool.splice(removeIndex, 1);
            Maze.dot(removed[0][0], removed[0][1]);
            connectionsCounter++;
        }

        function makePool() {
            var pool = [];
            for (var x = 2; x < Maze.maxX - 2; x++) {
                for (var y = 2; y < Maze.maxY - 2; y++) {
                    pool.push([x, y]);
                }
            }
            return pool;
        }
    },
    itemGrid: function (N) {
        var M =
                N +
                GAME.levels["L" + GAME.level].poison +
                GAME.levels["L" + GAME.level].bomb;
        var pool = makePoolForItems(M);
        MonsterAI.startingPoints = [].concat(pool);
        var itemPool = [].concat(World.item).concat(World.item);
        itemPool.shuffle();
        var itemPool2 = itemPool.slice(0, N);
        if (GAME.levels["L" + GAME.level].poison) {
            for (var a = 0; a < GAME.levels["L" + GAME.level].poison; a++) {
                itemPool2.push(Poison);
            }
        }
        if (GAME.levels["L" + GAME.level].bomb) {
            for (var b = 0; b < GAME.levels["L" + GAME.level].bomb; b++) {
                itemPool2.push(Bomb0);
            }
        }
        for (var q = 0; q < M; q++) {
            var tempX = pool[q][0];
            var tempY = pool[q][1];
            Maze.matrix[tempX][tempY].cache.push(itemPool2[q]);
        }
        return;

        function makePoolForItems(N) {
            var pool = [];
            for (var x = 1; x < Maze.maxX - 1; x += 2) {
                for (var y = 1; y < Maze.maxY - 1; y += 2) {
                    pool.push([x, y]);
                }
            }
            var PL = pool.length;
            var newPool = [];
            for (var t = 0; t < PL; t++) {
                var tempX = pool[t][0];
                var tempY = pool[t][1];
                if (Maze.isDot(tempX, tempY)) {
                    newPool.push([tempX, tempY]);
                }
            }
            var NPL = newPool.length;
            for (var tt = 0; tt < NPL; tt++) {
                for (var m = 0; m < Maze.deadEnds.length; m++) {
                    if (newPool[tt].compare(Maze.deadEnds[m])) {
                        newPool[tt] = 0;
                        break;
                    }
                }
            }
            newPool.remove(0);
            NPL = newPool.length;
            for (var tx = 0; tx < NPL; tx++) {
                if (Maze.matrix[newPool[tx][0]][newPool[tx][1]].type !== "CORRIDOR") {
                    newPool[tx] = 0;
                }
            }
            newPool.remove(0);
            newPool.shuffle();
            var itemPlaces = Maze.deadEnds.concat(newPool);
            return itemPlaces.slice(0, N);
        }
    }
};
/********************************end of maze.js**************************************/

var Monster = function (tile_L, tile_R, speed, iq, sight, type, smell, score) {
    this.tile_L = tile_L;
    this.tile_R = tile_R;
    this.tiles = [tile_L, tile_R];
    this.tileDraw = this.tiles[RND(0, 1)];
    this.speed = speed;
    this.iq = iq;
    this.sight = sight;
    this.orientation = LEFT;
    this.x = 0;
    this.y = 0;
    this.type = type;
    this.smell = smell;
    this.score = score;
};

var GHOST = new Monster(Ghost_left, Ghost_right, 17, 2, 5, "Ghost", 2, 100);
var WITCH = new Monster(Witch_left, Witch_right, 15, 3, 6, "Witch", 3, 200);
var SNAIL = new Monster(Snail_left, Snail_right, 22, 1, 3, "Snail", 8, 50);
var NEMESIS = new Monster(WowLeft, WowRight, 4, 3, 12, "Nemesis", 12, 1000);
var BEAST = new Monster(BeastLeft, BeastRight, 10, 3, 9, "Beast", 5, 300);
var PAC = new Monster(PacLeft, PacRight, 14, 2, 7, "Pacman", 7, 150);
var INVADER = new Monster(InvLeft, InvRight, 15, 1, 7, "Invader", 8, 125);
var WASP = new Monster(WaspLeft, WaspRight, 11, 2, 10, "Wasp", 12, 250);
var DRAGON = new Monster(DragonLeft, DragonRight, 8, 3, 10, "Dragon", 12, 500);

var GAME = {
    start: function () {
        $(document).off("keydown", GAME.checkKey);
        $(document).keydown(GAME.checkKey);
        GAME.level = 1;
        /****************/
        if (DEBUG.CHEAT) {
            GAME.level = DEBUG.LEVEL;
        }
        /****************/
        GAME.score = 0;
        GAME.lives = 4;
        GAME.stopAnimation = false;
        GAME.initLevel();
        GAME.frame = {};
        GAME.frame.start = null;
        GAME.firstFrameDraw();
        GAME.run();
    },
    stop: function () {
        console.log(PRG.NAME, " stopped.");
        GAME.stopAnimation = true;
        $(document).off("keydown", GAME.checkKey);
    },
    frameDraw: function () {
        TITLE.render();
        Maze.clearLayer(2);
        COOLIE.draw();
        MonsterAI.drawMonsters();
    },
    firstFrameDraw: function () {
        Maze.render();
        TITLE.render();
        COOLIE.draw();
        MonsterAI.drawMonsters();
    },
    lastFrame: function () {
        var ctx = RoomScreen2.ctx;
        TITLE.render();
        Maze.clearLayer(2);
        MonsterAI.drawMonsters();
        Sprite.draw(ctx, COOLIE.x, COOLIE.y, CoolieDead);
    },
    winFrame: function () {
        TITLE.render();
    },
    checkKey: function (e) {
        e = e || window.event;
        switch (e.keyCode) {
            case 38:
                COOLIE.move(UP);
                e.preventDefault();
                break;
            case 40:
                COOLIE.move(DOWN);
                e.preventDefault();
                break;
            case 37:
                COOLIE.move(LEFT);
                e.preventDefault();
                break;
            case 39:
                COOLIE.move(RIGHT);
                e.preventDefault();
                break;
            case 80:
                COOLIE.dropPoison();
                e.preventDefault();
                break;
            case 66:
                COOLIE.dropBomb();
                e.preventDefault();
                break;
        }
    },
    preventKey: function (e) {
        e = e || window.event;
        switch (e.keyCode) {
            case 38:
            case 40:
            case 37:
            case 39:
                e.preventDefault();
                break;
        }
    },
    levels: {
        L1: {
            name: "The Entrance",
            addCorridors: 18,
            corridorPattern: "Tile5_48",
            wallPattern: "StoneWall",
            itemN: 12,
            monsters: [GHOST, WITCH],
            time: 60,
            poison: 1,
            bomb: 1
        },
        L2: {
            name: "Three is a Crowd",
            addCorridors: 18,
            corridorPattern: "Tile4_48",
            wallPattern: "BrickWall",
            itemN: 13,
            monsters: [GHOST, SNAIL, WITCH],
            poison: 1,
            bomb: 1,
            time: 50
        },
        L3: {
            name: "Four Is a Company",
            addCorridors: 18,
            corridorPattern: "YellowBrick",
            wallPattern: "BrickWall2",
            itemN: 13,
            monsters: [GHOST, GHOST, SNAIL, WITCH],
            poison: 1,
            bomb: 1,
            time: 60
        },
        L4: {
            name: "Snail Time",
            addCorridors: 18,
            corridorPattern: "Tile5_48",
            wallPattern: "BrickWall3",
            itemN: 13,
            monsters: [SNAIL, SNAIL, SNAIL, SNAIL],
            poison: 1,
            bomb: 1,
            time: 100
        },
        L5: {
            name: "Enchanted",
            addCorridors: 18,
            corridorPattern: "Tile3_48",
            wallPattern: "BrickWall4",
            itemN: 12,
            monsters: [WITCH, WITCH, WITCH, GHOST],
            poison: 1,
            bomb: 1,
            time: 60
        },
        L6: {
            name: "Where is PacMan?",
            addCorridors: 18,
            corridorPattern: "DungeonFloor2",
            wallPattern: "BrickWall2",
            itemN: 12,
            monsters: [PAC, PAC, PAC, PAC],
            poison: 0,
            bomb: 3,
            time: 60
        },
        L7: {
            name: "Number of Beasts",
            addCorridors: 18,
            corridorPattern: "MorgueFloor",
            wallPattern: "BrickWall",
            itemN: 12,
            monsters: [BEAST, BEAST, BEAST, GHOST],
            poison: 2,
            bomb: 2,
            time: 60
        },
        L8: {
            name: "Ghost Town",
            addCorridors: 18,
            corridorPattern: "Pavement",
            wallPattern: "BrickWall4",
            itemN: 12,
            monsters: [GHOST, GHOST, GHOST, GHOST, GHOST],
            poison: 1,
            bomb: 1,
            time: 60
        },
        L9: {
            name: "That Brown Level",
            addCorridors: 17,
            corridorPattern: "Pavement2",
            wallPattern: "DungeonWall",
            itemN: 13,
            monsters: [GHOST, BEAST, PAC, WITCH, GHOST],
            poison: 1,
            bomb: 1,
            time: 60
        },
        L10: {
            name: "The Usual Gang",
            addCorridors: 18,
            corridorPattern: "Tile5_48",
            wallPattern: "DungeonWall2",
            itemN: 14,
            monsters: [GHOST, WITCH, SNAIL, BEAST, PAC, SNAIL],
            poison: 2,
            bomb: 2,
            time: 80
        },
        L11: {
            name: "New Kids in Town",
            addCorridors: 17,
            corridorPattern: "RockFloor",
            wallPattern: "DungeonWall3",
            itemN: 15,
            monsters: [INVADER, WASP, DRAGON, INVADER],
            poison: 1,
            bomb: 3,
            time: 50
        },
        L12: {
            name: "The Cold Quarters",
            addCorridors: 16,
            corridorPattern: "StoneFloor",
            wallPattern: "SlateWall",
            itemN: 12,
            monsters: [INVADER, WASP, DRAGON, WITCH],
            poison: 2,
            bomb: 2,
            time: 60
        },
        L13: {
            name: "Level 13",
            addCorridors: 18,
            corridorPattern: "StoneFloor3",
            wallPattern: "StrangeWall",
            itemN: 15,
            monsters: [DRAGON, WITCH, BEAST, GHOST, INVADER],
            poison: 2,
            bomb: 2,
            time: 66
        },
        L14: {
            name: "Almost all",
            addCorridors: 18,
            corridorPattern: "StoneFloor4",
            wallPattern: "WhiteWall",
            itemN: 11,
            monsters: [DRAGON, WITCH, BEAST, GHOST, INVADER, SNAIL],
            poison: 2,
            bomb: 3,
            time: 80
        },
        L15: {
            name: "Invader's Last Stand",
            addCorridors: 18,
            corridorPattern: "StoneFloor3",
            wallPattern: "StoneWall",
            itemN: 15,
            monsters: [INVADER, INVADER, INVADER, INVADER, INVADER, INVADER],
            poison: 1,
            bomb: 3,
            time: 60
        },
        L16: {
            name: "Wasp's Nest",
            addCorridors: 18,
            corridorPattern: "YellowBrick",
            wallPattern: "BrokenRuin",
            itemN: 12,
            monsters: [WASP, WASP, WASP, WASP, WASP],
            poison: 2,
            bomb: 3,
            time: 70
        },
        L17: {
            name: "Dragon's Lair",
            addCorridors: 18,
            corridorPattern: "Tile4_48",
            wallPattern: "OldWall",
            itemN: 11,
            monsters: [DRAGON, DRAGON, WITCH, DRAGON],
            poison: 2,
            bomb: 3,
            time: 60
        },
        L18: {
            name: "Wizards of Wor",
            addCorridors: 18,
            corridorPattern: "Tile5_48",
            wallPattern: "Grass",
            itemN: 12,
            monsters: [NEMESIS, NEMESIS, DRAGON, WITCH],
            poison: 3,
            bomb: 2,
            time: 100
        },
        L19: {
            name: "Hell, inc.",
            addCorridors: 18,
            corridorPattern: "Tile3_48",
            wallPattern: "Gravel",
            itemN: 10,
            monsters: [NEMESIS, NEMESIS, DRAGON, DRAGON],
            poison: 3,
            bomb: 3,
            time: 100
        },
        L20: {
            name: "Prepare to Die",
            addCorridors: 18,
            corridorPattern: "RockFloor48",
            wallPattern: "DungeonFloor2",
            itemN: 11,
            monsters: [DRAGON, WITCH, BEAST, GHOST, INVADER, NEMESIS, WASP],
            poison: 4,
            bomb: 3,
            time: 100
        }
    },
    createLevel: function (level) {
        Maze.addCorridors = GAME.levels["L" + level].addCorridors;
        Maze.corridorPattern = GAME.levels["L" + level].corridorPattern;
        Maze.wallPattern = GAME.levels["L" + level].wallPattern;
        Maze.itemN = GAME.levels["L" + level].itemN;
        Maze.itemsLeft =
                Maze.itemN +
                GAME.levels["L" + level].poison +
                GAME.levels["L" + level].bomb;
        Maze.create(INI.MAX_MAZE_X, INI.MAX_MAZE_Y);
    },
    initLevel: function () {
        GAME.createLevel(GAME.level);
        MonsterAI.init();
        COOLIE.initLife();
        GAME.frameDraw();
        GAME.startedAt = Date.now();
        GAME.nemesisReleased = false;
    },
    run: function () {
        if (!GAME.frame.start)
            GAME.frame.start = Date.now();
        var current = Date.now();
        GAME.frame.delta = current - GAME.frame.start;
        if (GAME.frame.delta > INI.ANIMATION_INTERVAL) {
            MonsterAI.moveMonsters();
            GAME.frameDraw();
            GAME.frame.start = null;
        }
        if (!COOLIE.ghost) {
            if (COOLIE.dead) {
                COOLIE.reincarnation();
            }
        }
        if (GAME.stopAnimation) {
            return;
        } else {
            requestAnimationFrame(GAME.run);
        }
    },
    nextLevel: function () {
        console.log("GAME.nextLevel()");
        GAME.level++;
        GAME.nemesisReleased = false;
        GAME.stopAnimation = false;
        if (GAME.level > INI.MAX_LEVEL) {
            COOLIE.win();
            return;
        }
        if (GAME.level % 5 === 0)
            GAME.lives++;
        GAME.initLevel();
        GAME.firstFrameDraw();
        GAME.run();
    },
    timeLeft: function () {
        var now = (Date.now() - GAME.startedAt) / 1000;
        var timeLeft;
        if (GAME.level > INI.MAX_LEVEL) {
            timeLeft = 999;
        } else {
            timeLeft = GAME.levels["L" + GAME.level].time - parseInt(now, 10);
        }
        if (timeLeft < 0) {
            timeLeft = 0;
            GAME.releaseNemesis();
        }
        return timeLeft;
    },
    releaseNemesis: function () {
        if (!GAME.nemesisReleased) {
            console.log("level ", GAME.level);
            console.log("NEMESIS released");
            GAME.nemesisReleased = true;
            MonsterAI.birthMonster(NEMESIS);
        }
    }
};
/*****************************************************************************/
var TITLE = {
    poison: function () {
        var CTX = TitleScreen.ctx;
        CTX.color = "white";
        CTX.fillStyle = "#FFF";
        CTX.font = "28px Consolas";
        CTX.shadowColor = "#333333";
        CTX.shadowOffsetX = 1;
        CTX.shadowOffsetY = 1;
        CTX.shadowBlur = 1;
        var y = 112;
        var x = 560;
        CTX.fillText(
                "Poison: " +
                COOLIE.poison.toString().padLeft(2, "0") +
                "  Bombs: " +
                COOLIE.bombs.toString().padLeft(2, "0"),
                x,
                y
                );
    },
    timer: function () {
        var CTX = TitleScreen.ctx;
        CTX.color = "white";
        CTX.fillStyle = "#FFF";
        CTX.font = "28px Consolas";
        CTX.shadowColor = "#333333";
        CTX.shadowOffsetX = 1;
        CTX.shadowOffsetY = 1;
        CTX.shadowBlur = 1;
        var y = 78;
        var x = 560;
        var now = (Date.now() - GAME.startedAt) / 1000;
        var timeLeft = GAME.timeLeft();
        CTX.fillText("TIME: " + timeLeft.toString().padLeft(3, "0"), x, y);
    },
    level: function () {
        var CTX = TitleScreen.ctx;
        CTX.color = "white";
        CTX.fillStyle = "#FFF";
        CTX.font = "22px Consolas";
        CTX.shadowColor = "#333333";
        CTX.shadowOffsetX = 1;
        CTX.shadowOffsetY = 1;
        CTX.shadowBlur = 1;
        var y = 44;
        var x = 560;
        var levelName;
        if (GAME.level > INI.MAX_LEVEL) {
            levelName = "GAME WON";
        } else {
            levelName = GAME.levels["L" + GAME.level].name;
        }
        CTX.fillText(
                "LEVEL: " + GAME.level.toString().padLeft(2, "0") + " - " + levelName,
                x,
                y
                );
    },
    bigText: function (text) {
        //console.log("text:", text);
        var fs = 120;
        var x = INI.ROOM_WIDTH / 2;
        var y = INI.ROOM_HEIGHT / 2;
        var CTX = RoomScreen2.ctx;
        CTX.fillStyle = "#FFF";
        CTX.font = fs + "px Consolas";
        CTX.shadowColor = "#333333";
        CTX.shadowOffsetX = 3;
        CTX.shadowOffsetY = 3;
        CTX.shadowBlur = 3;
        CTX.textAlign = "center";
        CTX.fillText(text, x, y);
        //console.log("CTX", CTX);
    },
    gameOver: function () {
        TITLE.bigText("GAME OVER");
    },
    gameWon: function () {
        TITLE.bigText("COOLIE WINS!");
    },
    render: function () {
        TITLE.background();
        TITLE.title();
        TITLE.score();
        TITLE.lives();
        TITLE.level();
        TITLE.timer();
        TITLE.poison();
    },
    background: function () {
        var CTX = TitleScreen.ctx;
        CTX.fillStyle = "#000";
        CTX.roundRect(
                0,
                0,
                INI.ROOM_WIDTH,
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
    },
    lives: function () {
        var CTX = TitleScreen.ctx;
        CTX.color = "white";
        CTX.fillStyle = "#FFF";
        CTX.font = "30px Consolas";
        CTX.shadowColor = "#333333";
        CTX.shadowOffsetX = 1;
        CTX.shadowOffsetY = 1;
        CTX.shadowBlur = 1;
        var y = 100;
        var x = 220;
        CTX.fillText("LIVES: ", x, y);
        x = 336;
        y = 68;
        var dx = 50;
        var displayLives = GAME.lives;
        if (displayLives > 4)
            displayLives = 4;
        for (var ix = 0; ix < displayLives; ix++) {
            Sprite.drawAt(x + ix * dx, y, Coolie);
        }
    },
    score: function () {
        var CTX = TitleScreen.ctx;
        var x = 220;
        var y = 50;
        CTX.color = "white";
        CTX.fillStyle = "#FFF";
        CTX.font = "30px Consolas";
        CTX.shadowColor = "#333333";
        CTX.shadowOffsetX = 1;
        CTX.shadowOffsetY = 1;
        CTX.shadowBlur = 1;
        var score = GAME.score.toString().padLeft(8, "0");
        CTX.fillText("SCORE: " + score, x, y);
    },
    title: function () {
        var CTX = TitleScreen.ctx;
        var grad = CTX.createLinearGradient(30, 40, 128, 128);
        grad.addColorStop("0", "#000000");
        grad.addColorStop("0.2", "#00ee00");
        grad.addColorStop("0.5", "#00ff00");
        grad.addColorStop("0.8", "#00ee00");
        grad.addColorStop("1.0", "#004400");
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
    }
};
/*****************************************************************************/
var Sprite = {
    draw: function (CTX, X, Y, tile) {
        var image = $("#" + tile.id)[0];
        var corx = Math.floor((INI.GRIDPX - tile.x) / 2);
        var cory = Math.floor((INI.GRIDPX - tile.y) / 2);
        CTX.drawImage(image, X * INI.GRIDPX + corx, Y * INI.GRIDPX + cory);
    },
    drawAt: function (X, Y, tile) {
        var image = $("#" + tile.id)[0];
        var CTX = TitleScreen.ctx;
        CTX.drawImage(image, X, Y);
    },
    drawAtRoom: function (X, Y, tile) {
        var image = $("#" + tile.id)[0];
        var CTX = RoomScreen2.ctx;
        CTX.drawImage(image, X, Y);
    }
};
var COOLIE = {
    id: "Coolie2",
    poison: 0,
    bombs: 0,
    initLife: function () {
        COOLIE.x = Maze.entrance[0];
        COOLIE.y = Maze.entrance[1];
        COOLIE.dead = false;
        COOLIE.ghost = false;
    },
    reset: function () {
        COOLIE.poison = 0;
        COOLIE.bombs = 0;
    },
    draw: function () {
        var CTX = RoomScreen2.ctx;
        if (!COOLIE.ghost) {
            Sprite.draw(CTX, COOLIE.x, COOLIE.y, Coolie);
        } else {
            Sprite.drawAtRoom(COOLIE.ghostX, COOLIE.ghostY, CoolieGhost);
        }
    },
    move: function (dir) {
        var whereTo = new Vector(COOLIE.x, COOLIE.y);
        whereTo = whereTo.add(dir);
        if (Maze.isDot(whereTo.x, whereTo.y)) {
            COOLIE.x = whereTo.x;
            COOLIE.y = whereTo.y;
            var cache = Maze.matrix[COOLIE.x][COOLIE.y].cache[0];
            if (cache) {
                if (cache.id === "bomb2")
                    return;
                if (cache.id === "Poison")
                    COOLIE.poison++;
                if (cache.id === "bomb0")
                    COOLIE.bombs++;
                if (cache.id === "green") {
                    COOLIE.dead = true;
                    Maze.matrix[COOLIE.x][COOLIE.y].cache.clear();
                    Maze.clearLayer(1);
                    Maze.renderItems();
                    return;
                }
                if (cache.id === "explosion") {
                    COOLIE.dead = true;
                    return;
                }
                GAME.score += 10;
                Maze.matrix[COOLIE.x][COOLIE.y].cache.clear();
                Maze.clearLayer(1);
                Maze.renderItems();
                Maze.itemsLeft--;
                if (Maze.itemsLeft <= 0) {
                    console.log("All picked");
                    Maze.matrix[Maze.exit[0]][Maze.exit[1]].door = {
                        tile: Stairs_open,
                        open: true
                    };
                    Maze.renderStairs();
                }
            }
            var LN = MonsterAI.monsters.length;
            if (!COOLIE.dead) {
                for (var z = LN - 1; z >= 0; z--) {
                    if (
                            COOLIE.x === MonsterAI.monsters[z].x &&
                            COOLIE.y === MonsterAI.monsters[z].y
                            ) {
                        COOLIE.dead = true;
                        console.log("Coolie stumbled into ", MonsterAI.monsters[z].type);
                        MonsterAI.removeMonster(z);
                    }
                }
            }
            GAME.frameDraw();
            if (
                    COOLIE.x === Maze.exit[0] &&
                    COOLIE.y === Maze.exit[1] &&
                    Maze.matrix[Maze.exit[0]][Maze.exit[1]].door.open
                    ) {
                console.log("LEVEL down");
                GAME.stopAnimation = true;
                GAME.score += GAME.level * GAME.level * 100;
                GAME.score += GAME.level * GAME.timeLeft();
                GAME.nextLevel();
            }
        }
    },
    reincarnation: function () {
        GAME.lives--;
        if (DEBUG.INVINCIBLE)
            GAME.lives++; //DEBUG
        if (GAME.lives < 0) {
            COOLIE.death();
        }
        $(document).off("keydown", GAME.checkKey);
        $(document).keydown(GAME.preventKey);
        COOLIE.ghost = true;
        COOLIE.ghostX = COOLIE.x * INI.GRIDPX;
        COOLIE.ghostY = COOLIE.y * INI.GRIDPX;
        COOLIE.x = 0;
        COOLIE.y = 0;
        COOLIE.PPT = Math.floor(COOLIE.ghostY / INI.GHOST_SPEEDUP) || 1;
    },
    incarnate: function () {
        COOLIE.initLife();
        GAME.startedAt = Date.now();
        $(document).off("keydown", GAME.preventKey);
        $(document).keydown(GAME.checkKey);
        GAME.nemesisReleased = false;
    },
    death: function () {
        console.log("COOLIE final DEATH.");
        GAME.stopAnimation = true;
        GAME.lastFrame();
        GAME.stop();
        TITLE.gameOver();
        SCORE.checkScore(GAME.score);
        SCORE.hiScore();
        console.log(PRG.NAME + " stopped completely.");
    },
    win: function () {
        console.log("COOLIE won the game");
        GAME.winFrame();
        GAME.stop();
        setTimeout(function () {
            Maze.clearLayer(2);
            MonsterAI.drawMonsters();
            TITLE.gameWon();
            SCORE.checkScore(GAME.score);
            SCORE.hiScore();
            console.log(PRG.NAME + " stopped completely.");
        }, INI.ANIMATION_INTERVAL * 2);
    },
    dropPoison: function () {
        if (COOLIE.poison < 1) {
            return;
        }
        if (
                Maze.matrix[COOLIE.x][COOLIE.y].cache.length === 0 &&
                typeof Maze.matrix[COOLIE.x][COOLIE.y].door !== "object"
                ) {
            Maze.matrix[COOLIE.x][COOLIE.y].cache.push(Splash);
            Maze.clearLayer(1);
            Maze.renderItems();
            COOLIE.poison--;
        }
    },
    dropBomb: function () {
        if (COOLIE.bombs < 1) {
            return;
        }
        if (
                Maze.matrix[COOLIE.x][COOLIE.y].cache.length === 0 &&
                typeof Maze.matrix[COOLIE.x][COOLIE.y].door !== "object"
                ) {
            Maze.matrix[COOLIE.x][COOLIE.y].cache.push(Bomb2);
            Maze.clearLayer(1);
            Maze.renderItems();
            COOLIE.bombs--;
            var tempX = COOLIE.x;
            var tempY = COOLIE.y;
            setTimeout(function () {
                COOLIE.bombExplode(tempX, tempY);
            }, INI.BOMB_FUSE);
        }
    },
    bombExplode: function (x, y) {
        Maze.matrix[x][y].cache.clear();
        Maze.matrix[x][y].cache.push(Explosion);
        Maze.clearLayer(1);
        Maze.renderItems();
        COOLIE.explosion(x, y);
        setTimeout(function () {
            COOLIE.explosionVanish(x, y);
        }, INI.BOMB_EXPLOSION);
    },
    explosion: function (x, y) {
        var ADL = AllDirections.length;
        for (var z = 0; z < ADL; z++) {
            var newX = x + AllDirections[z][0];
            var newY = y + AllDirections[z][1];
            if (Maze.isBlock(newX, newY)) {
                Maze.dot(newX, newY);
            } else {
                if (COOLIE.x === newX && COOLIE.y === newY) {
                    COOLIE.dead = true;
                    console.log("COOLIE died in the blast!");
                }
                var LN = MonsterAI.monsters.length;
                for (var q = LN - 1; q >= 0; q--) {
                    if (
                            MonsterAI.monsters[q].x === newX &&
                            MonsterAI.monsters[q].y === newY
                            ) {
                        console.log(MonsterAI.monsters[q].type + " died in the blast.");
                        MonsterAI.removeMonster(q);
                    }
                }
            }
        }
        Maze.render();
    },
    explosionVanish: function (x, y) {
        Maze.matrix[x][y].cache.clear();
        Maze.clearLayer(1);
        Maze.renderItems();
    }
};

var MonsterAI = {
    init: function () {
        MonsterAI.monsters = [];
        MonsterAI.placeMonsters();
    },
    initEach: function (z) {
        MonsterAI.monsters[z].hasPurpose = false;
        MonsterAI.monsters[z].hasSight = false;
        MonsterAI.monsters[z].hasSmell = false;
        MonsterAI.monsters[z].directionStack = [];
        MonsterAI.monsters[z].lastSight = [];
        MonsterAI.monsters[z].huntVectorSee = [];
        MonsterAI.monsters[z].huntVectorSmell = [];
        MonsterAI.monsters[z].deadEnd = [];
        MonsterAI.monsters[z].history = [];
    },
    placeMonsters: function () {
        var LN = GAME.levels["L" + GAME.level].monsters.length;
        for (var z = 0; z < LN; z++) {
            MonsterAI.monsters[z] = new Monster(
                    GAME.levels["L" + GAME.level].monsters[z].tile_L,
                    GAME.levels["L" + GAME.level].monsters[z].tile_R,
                    GAME.levels["L" + GAME.level].monsters[z].speed,
                    GAME.levels["L" + GAME.level].monsters[z].iq,
                    GAME.levels["L" + GAME.level].monsters[z].sight,
                    GAME.levels["L" + GAME.level].monsters[z].type,
                    GAME.levels["L" + GAME.level].monsters[z].smell,
                    GAME.levels["L" + GAME.level].monsters[z].score
                    );
            MonsterAI.monsters[z].x = MonsterAI.startingPoints[z][0];
            MonsterAI.monsters[z].y = MonsterAI.startingPoints[z][1];
            MonsterAI.monsters[z].tileDraw = MonsterAI.monsters[z].tiles[RND(0, 1)];
            MonsterAI.monsters[z].waitForMove = MonsterAI.monsters[z].speed;
            MonsterAI.initEach(z);
        }
    },
    birthMonster: function (monsterClass) {
        MonsterAI.monsters.push(
                new Monster(
                        monsterClass.tile_L,
                        monsterClass.tile_R,
                        monsterClass.speed,
                        monsterClass.iq,
                        monsterClass.sight,
                        monsterClass.type,
                        monsterClass.smell,
                        monsterClass.score
                        )
                );
        var z = MonsterAI.monsters.length;
        z--;
        MonsterAI.monsters[z].x = Maze.entrance[0];
        MonsterAI.monsters[z].y = Maze.entrance[1];
        MonsterAI.monsters[z].tileDraw = MonsterAI.monsters[z].tiles[RND(0, 1)];
        MonsterAI.monsters[z].waitForMove = MonsterAI.monsters[z].speed;
        MonsterAI.initEach(z);
    },
    drawMonsters: function () {
        var CTX = RoomScreen2.ctx;
        var LN = MonsterAI.monsters.length;
        for (var z = 0; z < LN; z++) {
            Sprite.draw(
                    CTX,
                    MonsterAI.monsters[z].x,
                    MonsterAI.monsters[z].y,
                    MonsterAI.monsters[z].tileDraw
                    );
        }
    },
    moveMonsters: function () {
        if (COOLIE.ghost) {
            COOLIE.ghostY -= COOLIE.PPT;
            COOLIE.ghostX -= INI.GHOST_PPF;
            if (COOLIE.ghostY <= 0 || COOLIE.ghostX <= 0) {
                COOLIE.incarnate();
            }
            if (
                    Maze.matrix[Maze.exit[0]][Maze.exit[1]].door.open &&
                    Maze.itemsLeft > 0
                    ) {
                Maze.matrix[Maze.exit[0]][Maze.exit[1]].door = {
                    tile: Stairs_closed,
                    open: false
                };
                Maze.renderStairs();
            }
        }
        var LN = MonsterAI.monsters.length;
        for (var z = LN - 1; z >= 0; z--) {
            var monsterLocation = new Vector(
                    MonsterAI.monsters[z].x,
                    MonsterAI.monsters[z].y
                    );
            var CoolieLocation = new Vector(COOLIE.x, COOLIE.y);
            var smelling = MonsterAI.smellCoolie(MonsterAI.monsters[z], z);
            var smellingAbs = MonsterAI.smellCoolieAbs(MonsterAI.monsters[z], z);
            if (smelling) {
                MonsterAI.monsters[z].hasPurpose = true;
                MonsterAI.monsters[z].hasSmell = true;
                MonsterAI.monsters[z].huntVectorSmell.clear();
                MonsterAI.monsters[z].huntVectorSmell.push(smelling);
                MonsterAI.monsters[z].smellingDistance = monsterLocation.distance(
                        CoolieLocation
                        );
            }
            var seeing = MonsterAI.seeCoolie(MonsterAI.monsters[z], z);
            if (seeing) {
                MonsterAI.monsters[z].hasPurpose = true;
                MonsterAI.monsters[z].hasSight = true;
                MonsterAI.monsters[z].huntVectorSee.clear();
                MonsterAI.monsters[z].huntVectorSee.push(seeing);
                MonsterAI.monsters[z].lastSight.clear();
                MonsterAI.monsters[z].lastSight.push(CoolieLocation);
            }
            MonsterAI.monsters[z].waitForMove -= 1;
            if (MonsterAI.monsters[z].waitForMove > 0)
                continue;
            MonsterAI.monsters[z].waitForMove = MonsterAI.monsters[z].speed;
            var dir = MonsterAI.getDirections(MonsterAI.monsters[z]);
            var NewDir;
            var DRLEN = dir.length;
            var chosen;

            if (COOLIE.dead) {
                MonsterAI.monsters[z].hasPurpose = false;
                MonsterAI.monsters[z].lastSight.clear();
                MonsterAI.monsters[z].huntVectorSee.clear();
            }

            if (!MonsterAI.monsters[z].hasPurpose) {
                if (MonsterAI.monsters[z].directionStack.length) {
                    if (NewDir)
                        NewDir.clear();
                    if (DRLEN > 1) {
                        NewDir = MonsterAI.removeVector(
                                dir,
                                MonsterAI.monsters[z].directionStack[0].mirror()
                                );
                        switch (MonsterAI.monsters[z].iq) {
                            case 1:
                                if (
                                        MonsterAI.testDirection(
                                                MonsterAI.monsters[z],
                                                MonsterAI.monsters[z].directionStack[0]
                                                )
                                        ) {
                                    NewDir.push([99, MonsterAI.monsters[z].directionStack[0]]);
                                    NewDir.push([99, MonsterAI.monsters[z].directionStack[0]]);
                                }
                                break;
                            case 2:
                                break;
                            case 3:
                                var add = MonsterAI.getMaxPath(NewDir);
                                NewDir.push([99, add]);
                                break;
                        }
                    }
                    if (NewDir && NewDir.length) {
                        chosen = NewDir[RND(0, NewDir.length - 1)][1];
                    } else {
                        chosen = dir[0][1];
                    }
                    MonsterAI.monsters[z].history.clear();
                    MonsterAI.commitMove(MonsterAI.monsters[z], chosen, z);
                    continue;
                } else {
                    if (MonsterAI.monsters[z].iq > 1) {
                        chosen = MonsterAI.getMaxPath(dir);
                    } else {
                        chosen = dir[RND(0, dir.length - 1)][1];
                    }
                    MonsterAI.monsters[z].history.clear();
                    MonsterAI.commitMove(MonsterAI.monsters[z], chosen, z);
                    continue;
                }
            } else {
                if (seeing) {
                    MonsterAI.monsters[z].history.clear();
                    MonsterAI.commitMove(MonsterAI.monsters[z], seeing, z);
                    continue;
                } else {
                    MonsterAI.monsters[z].hasSight = false;
                }

                if (MonsterAI.monsters[z].huntVectorSee[0]) {
                    if (
                            MonsterAI.monsters[z].x === MonsterAI.monsters[z].lastSight[0].x &&
                            MonsterAI.monsters[z].y === MonsterAI.monsters[z].lastSight[0].y
                            ) {
                        MonsterAI.monsters[z].lastSight.clear();
                        MonsterAI.monsters[z].huntVectorSee.clear();
                        MonsterAI.monsters[z].hasPurpose = false;
                        MonsterAI.monsters[z].waitForMove = 1;
                        continue;
                    } else {
                        MonsterAI.monsters[z].directionStack.clear();
                        MonsterAI.monsters[z].history.clear();
                        MonsterAI.commitMove(
                                MonsterAI.monsters[z],
                                MonsterAI.monsters[z].huntVectorSee[0],
                                z
                                );
                        continue;
                    }
                }
                if (!smelling) {
                    MonsterAI.monsters[z].hasSmell = false;
                    MonsterAI.monsters[z].hasPurpose = false;
                    MonsterAI.monsters[z].waitForMove = 1;
                    continue;
                }
                if (dir.length === 1) {
                    MonsterAI.monsters[z].history.clear();
                    MonsterAI.commitMove(MonsterAI.monsters[z], dir[0][1], z);
                    MonsterAI.monsters[z].deadEnd.push(dir[0][1]);
                    continue;
                }
                if (dir.length >= 2) {
                    if (MonsterAI.monsters[z].deadEnd[0]) {
                        NewDir = MonsterAI.removeVector(
                                dir,
                                MonsterAI.monsters[z].deadEnd[0].mirror()
                                );
                        if (NewDir.length === 1) {
                            MonsterAI.monsters[z].history.clear();
                            MonsterAI.commitMove(MonsterAI.monsters[z], dir[0][1], z);
                            continue;
                        }
                    } else {
                        NewDir = dir;
                    }
                }
                var SX = Math.abs(smellingAbs.x);
                var SY = Math.abs(smellingAbs.y);
                var perfectDir = [];
                var tempVector = [];
                tempVector[0] = new Vector(smelling.x, 0);
                tempVector[1] = new Vector(0, smelling.y);

                if (SX > SY) {
                    if (MonsterAI.searchVector(NewDir, tempVector[0])) {
                        perfectDir.push(tempVector[0]);
                    }
                    if (MonsterAI.searchVector(NewDir, tempVector[1])) {
                        perfectDir.push(tempVector[1]);
                    }
                } else if (SX === SY) {
                    var i = RND(0, 1);
                    if (MonsterAI.searchVector(NewDir, tempVector[i])) {
                        perfectDir.push(tempVector[i]);
                    }
                    i = Math.abs(i - 1);
                    if (MonsterAI.searchVector(NewDir, tempVector[i])) {
                        perfectDir.push(tempVector[i]);
                    }
                } else {
                    if (MonsterAI.searchVector(NewDir, tempVector[1])) {
                        perfectDir.push(tempVector[1]);
                    }
                    if (MonsterAI.searchVector(NewDir, tempVector[0])) {
                        perfectDir.push(tempVector[0]);
                    }
                }
                if (perfectDir.length) {
                    if (MonsterAI.monsters[z].iq > 1) {
                        MonsterAI.monsters[z].deadEnd.clear();
                        MonsterAI.commitMove(MonsterAI.monsters[z], perfectDir[0], z);
                        continue;
                    } else {
                        MonsterAI.monsters[z].deadEnd.clear();
                        MonsterAI.commitMove(
                                MonsterAI.monsters[z],
                                perfectDir[RND(0, perfectDir.length - 1)],
                                z
                                );
                        continue;
                    }
                } else {
                    var smer;
                    switch (MonsterAI.monsters[z].iq) {
                        case 1:
                            smer = dir[RND(0, NewDir.length - 1)][1];
                            break;
                        case 2:
                            smer = dir[RND(0, NewDir.length - 1)][1];
                            break;
                        case 3:
                            if (MonsterAI.monsters[z].history.length >= INI.HISTORY_LENGTH) {
                                smer = MonsterAI.getMinPath(dir);
                                MonsterAI.monsters[z].history.clear();
                                break;
                            }
                            smer = dir[RND(0, NewDir.length - 1)][1];
                            break;
                    }
                    MonsterAI.monsters[z].deadEnd.clear();
                    MonsterAI.commitMove(MonsterAI.monsters[z], smer, z);
                    continue;
                }
            }
        } //end of for loop for each monster
    },
    commitMove: function (monster, chosen, Z) {
        monster.previousX = monster.x; //DEBUG
        monster.previousY = monster.Y; //DEBUG
        if (
                monster.x + chosen.x === Maze.entrance[0] &&
                monster.y + chosen.y === Maze.entrance[1]
                ) {
            MonsterAI.clearVectors(Z);
            return;
        }
        monster.x += chosen.x;
        monster.y += chosen.y;
        MonsterAI.setSpriteFace(monster, chosen);
        monster.directionStack.clear();
        monster.directionStack.push(chosen);
        monster.history.push(chosen);
        MonsterAI.checkCollision(monster, Z);
        /* special debug */
        if (Maze.isBlock(monster.x, monster.y)) {
            console.log("FATAL ERROR", monster.type, Z);
            console.log(MonsterAI.monsters[Z]);
            GAME.frameDraw();
            GAME.stop();
        }
        /*****************************/
    },
    checkCollision: function (monster, Z) {
        var cache = Maze.matrix[monster.x][monster.y].cache[0];
        if (cache) {
            if (cache.id === "green") {
                console.log(monster.type, " fell into poison");
                Maze.matrix[monster.x][monster.y].cache.clear();
                MonsterAI.removeMonster(Z);
            }
            if (cache.id === "explosion") {
                console.log(monster.type, " fell into explosion");
                MonsterAI.removeMonster(Z);
            }
        }
        if (!COOLIE.dead) {
            if (monster.x === COOLIE.x && monster.y === COOLIE.y) {
                COOLIE.dead = true;
                console.log(monster.type, " killed Coolie");
                MonsterAI.removeMonster(Z);
            }
        }
    },
    removeMonster: function (Z) {
        console.log(MonsterAI.monsters[Z].type, " instance is removed.");
        GAME.score += MonsterAI.monsters[Z].score;
        if (
                MonsterAI.monsters[Z].x === Maze.entrance[0] &&
                MonsterAI.monsters[Z].y === Maze.entrance[1]
                ) {
            MonsterAI.monsters.splice(Z, 1);
            return;
        }
        if (
                MonsterAI.monsters[Z].x === Maze.exit[0] &&
                MonsterAI.monsters[Z].y === Maze.exit[1]
                ) {
            MonsterAI.monsters.splice(Z, 1);
            return;
        }
        if (
                Maze.matrix[MonsterAI.monsters[Z].x][MonsterAI.monsters[Z].y].cache
                .length === 0
                ) {
            Maze.matrix[MonsterAI.monsters[Z].x][MonsterAI.monsters[Z].y].cache.push(
                    Coin
                    );
            Maze.itemsLeft++;
        }
        MonsterAI.monsters.splice(Z, 1);
        Maze.clearLayer(1);
        Maze.renderItems();
    },
    searchVector: function (dir, vct) {
        for (var i = 0; i < dir.length; i++) {
            if (dir[i][1].x === vct.x && dir[i][1].y === vct.y) {
                return true;
            }
        }
        return false;
    },
    removeVector: function (dir, vct) {
        for (var i = 0; i < dir.length; i++) {
            if (dir[i][1].x === vct.x && dir[i][1].y === vct.y) {
                dir.splice(i, 1);
                break;
            }
        }
        return dir;
    },
    setSpriteFace: function (monster, dir) {
        var X = dir.x;
        if (X === -1) {
            monster.tileDraw = monster.tiles[0];
        }
        if (X === 1) {
            monster.tileDraw = monster.tiles[1];
        }
        return;
    },
    getMaxPath: function (dir) {
        var idx = 0;
        for (var i = 1; i < dir.length; i++) {
            if (dir[i][0] > dir[idx][0]) {
                idx = i;
            }
        }
        return dir[idx][1];
    },
    getMinPath: function (dir) {
        var idx = 0;
        for (var i = 1; i < dir.length; i++) {
            if (dir[i][0] < dir[idx][0]) {
                idx = i;
            }
        }
        return dir[idx][1];
    },
    getPathLength: function (dir) {
        var LEN = dir[0][0];
        var idx = 0;
        for (var i = 1; i < dir.length; i++) {
            if (dir[i][0] > dir[idx][0]) {
                LEN = dir[i][0];
                idx = i;
            }
        }
        return LEN;
    },
    testDirection: function (monster, vct) {
        var testX = monster.x + vct.x;
        var testY = monster.y + vct.y;
        return Maze.isDot(testX, testY);
    },
    getDirections: function (monster) {
        var dir = [];
        for (var jj = 0; jj < Directions.length; jj++) {
            var nx, ny;
            var SL = 0;
            for (var ii = 1; ii <= monster.sight; ii++) {
                nx = monster.x + ii * Directions[jj][0];
                ny = monster.y + ii * Directions[jj][1];
                if (nx < 0 || nx >= INI.MAX_MAZE_X)
                    break;
                if (ny < 0 || ny >= INI.MAX_MAZE_Y)
                    break;
                if (Maze.isBlock(nx, ny)) {
                    break;
                }
                if (nx === Maze.entrance[0] && ny === Maze.entrance[1]) {
                    break;
                }
                SL++;
            }
            var tempV = new Vector(Directions[jj][0], Directions[jj][1]);
            if (SL)
                dir.push([SL, tempV]);
        }
        return dir;
    },
    smellCoolie: function (monster, z) {
        if (MonsterAI.invisibleCoolie()) {
            MonsterAI.clearVectors(z);
            return;
        }
        if (Math.abs(monster.x - COOLIE.x) > monster.smell)
            return false;
        if (Math.abs(monster.y - COOLIE.y) > monster.smell)
            return false;
        var vx = (COOLIE.x - monster.x) / Math.abs(COOLIE.x - monster.x) || 0;
        var vy = (COOLIE.y - monster.y) / Math.abs(COOLIE.y - monster.y) || 0;
        return new Vector(vx, vy);
    },
    smellCoolieAbs: function (monster, z) {
        if (MonsterAI.invisibleCoolie()) {
            MonsterAI.clearVectors(z);
            return;
        }
        if (Math.abs(monster.x - COOLIE.x) > monster.smell)
            return false;
        if (Math.abs(monster.y - COOLIE.y) > monster.smell)
            return false;
        var vx = COOLIE.x - monster.x;
        var vy = COOLIE.y - monster.y;
        return new Vector(vx, vy);
    },
    invisibleCoolie: function (monster, z) {
        if (COOLIE.x === Maze.entrance[0] && COOLIE.y === Maze.entrance[1])
            return true;
    },
    clearVectors: function (z) {
        MonsterAI.monsters[z].hasPurpose = false;
        MonsterAI.monsters[z].hasSight = false;
        MonsterAI.monsters[z].hasSmell = false;
        MonsterAI.monsters[z].lastSight.clear();
        MonsterAI.monsters[z].huntVectorSee.clear();
        MonsterAI.monsters[z].huntVectorSmell.clear();
    },
    seeCoolie: function (monster, z) {
        if (MonsterAI.invisibleCoolie()) {
            MonsterAI.clearVectors(z);
            return;
        }
        if (Math.abs(monster.x - COOLIE.x) > monster.sight)
            return false;
        if (Math.abs(monster.y - COOLIE.y) > monster.sight)
            return false;
        for (var jj = 0; jj < Directions.length; jj++) {
            var nx, ny;
            for (var ii = 0; ii <= monster.sight; ii++) {
                nx = monster.x + ii * Directions[jj][0];
                ny = monster.y + ii * Directions[jj][1];
                if (nx === COOLIE.x && ny === COOLIE.y) {
                    return new Vector(Directions[jj][0], Directions[jj][1]);
                }
                if (Maze.isBlock(nx, ny)) {
                    break;
                }
                if (nx === Maze.entrance[0] && ny === Maze.entrance[1]) {
                    break;
                }
            }
        }
        return false;
    }
};

$(document).ready(function () {
    PRG.INIT();
    PRG.setup();
    PRG.preLoadImages();
    SCORE.init("SC");
    SCORE.loadHS();
    SCORE.hiScore();
});