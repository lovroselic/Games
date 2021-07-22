// coded by Lovro Selic , C00lSch00l 2014, 2015
// library version 1.14.00 sandbox

//CONSTANTS

var PRG = {
    VERSION: "1.14",
    NAME: "LS LIBRARY",
    SOURCE: "http://www.c00lsch00l.eu/Games/AA/",
    SRC_rel: "/Games/AA/",
    tileGraphics: [],
    INIT: function() {
        console.clear();
        console.log(PRG.NAME + " " + PRG.VERSION + " by Lovro Selic, (c) C00lSch00l 2016");
        $("#title").html(PRG.NAME);
        $("#version").html(PRG.NAME + " V" + PRG.VERSION + " <span style='font-size:14px'>&copy</span> C00lSch00l 2016");
        $("#load").append("<canvas id ='preload_canvas' width='" + INI.LOAD_W + "' height='" + INI.LOAD_H + "'></canvas>");
        PRG.ctx = $("#preload_canvas")[0].getContext("2d");
    },
    preLoadImages: function() {
        PRG.count = 0;
        var fileNames = getImgFileNames();
        console.log(fileNames);
        PRG.HMI = fileNames.length;
        for (var ix = 0; ix < PRG.HMI; ix++) {
            PRG.tileGraphics[ix] = new Image();
            PRG.tileGraphics[ix].onload = cnt;
            PRG.tileGraphics[ix].src = fileNames[ix].filename;
            $("#preload").append("<img id='" + fileNames[ix].id + "' src='" + fileNames[ix].filename + "'/>");
        }
        return;

        function cnt() {
            PRG.count++;
            drawLoadingGraph();
            //wait(100); //deBUG
            if (PRG.count === PRG.HMI) {
                PRG.imagesLoaded = true;
                $("#buttons").prepend("<input type='button' id='startGame' value='START'>");
                //$("#load").addClass("hidden");
                $("#startGame").on("click", gameState.start);
            }
        }

        function drawLoadingGraph() {
            var percent = Math.floor((PRG.count / PRG.HMI) * 100);
            var CTX = PRG.ctx;
            CTX.clearRect(0, 0, INI.LOAD_W, INI.LOAD_H);
            CTX.beginPath();
            CTX.lineWidth = "1";
            CTX.strokeStyle = "black";
            CTX.rect(0, 0, INI.LOAD_W, INI.LOAD_H);
            CTX.closePath();
            CTX.stroke();
            CTX.fillStyle = "#999";
            CTX.fillRect(1, 1, Math.floor((INI.LOAD_W - 2) * (percent / 100)), INI.LOAD_H - 2);
            CTX.fillStyle = "black";
            CTX.font = "10px Verdana";
            CTX.fillText("Loading: " + percent + "%", INI.LOAD_W * 0.1, INI.LOAD_H * 0.62);

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

/////////////////
PRG.INIT();
console.log(PRG);

var Tile = function(id, x, y, type) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.type = type;
};
var World = {}; //for preloading

////////////////////////
//PROTOTYPES - ARRAY, STRING

Array.prototype.clear = function() {
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

//createPool(mx, N); creates array of number from 0 to max, return not repeated random N numbers;

Array.prototype.createPool = function(mx, N) {
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
};
Array.prototype.compare = function(array) {
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
};
Array.prototype.removeRandom = function() {
    var LN = this.length;
    var choose = rnd(1, LN) - 1;
    return this.splice(choose, 1);
};

/////////////
String.prototype.fill = function(stringy, howMany) {
    var s = '';
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
//////////////////////Vectors

var Vector = function(x, y) {
    this.x = parseInt(x, 10);
    this.y = parseInt(y, 10);
};
Vector.prototype.cw = function() {
    var x = this.x;
    var y = this.y;
    var newX, newY;
    if (x !== 0) {
        newX = 0;
        newY = x * -1;
    } else {
        newX = y * -1;
        newY = 0;
    }
    var newVector = {
        x: newX,
        y: newY
    };
    return newVector;
};
//////////////////

var Inputs = {
    validate: function(id, min, max, def) {
        $("#" + id).focusout(function() {
            var temp = $(this).val();
            $(this).val(validateInput(temp, min, max, 4));
        });

        function validateInput(set, min, max, def) {
            if (isNaN(set)) return def;
            if (set < min) return min;
            if (set > max) return max;
            return set;
        }
    }
};

var Outputs = {
    output: "board",
    type: "p",
    setOutput: function(id) {
        this.output = id;
    },
    setType: function(tip) {
        this.type = tip;
    },
    out: function(data, tag) {
        $("#" + Outputs.output).append("<" + tag + ">" + data + "</" + tag + ">");
    },
    init: function(id, tip) {
        Outputs.setOutput(id);
        Outputs.setType(tip);
    }
};

function PRINT(data) {
    Outputs.out(data, Outputs.type);
}
/////

var CONVERT = {
    wordToNum: function(text) {
        text = text.toLowerCase();
        text = text.trim();
        var N = text.indexOf('ty');
        if (N < 0) {
            var P = text.indexOf('teen');
            if (P < 0) {
                var R = checkExceptions(text);
                if (R > 0) {
                    return R;
                } else {
                    return eniceToNum(text);
                }
            } else {
                var preTeen = text.slice(0, P);
                preTeen = teensToNum(preTeen);
                return preTeen;
            }
        } else {
            var M = text.indexOf('-');
            if (M < 0) {
                return deseticeToNum(text);
            } else {
                var begin = text.slice(0, M);
                var end = text.slice(M + 1);
                begin = deseticeToNum(begin);
                end = eniceToNum(end);
                if (begin < 0 || end < 0) {
                    return -1;
                } else {
                    return begin + end;
                }
            }
        }

        function deseticeToNum(desetica) {
            switch (desetica) {
                case 'twenty':
                    return 20;
                case 'thirty':
                    return 30;
                case 'forty':
                    return 40;
                case 'fifty':
                    return 50;
                case 'sixty':
                    return 60;
                case 'seventy':
                    return 70;
                case 'eighty':
                    return 80;
                case 'ninety':
                    return 90;
                default:
                    return -1;
            }
        }

        function eniceToNum(enica) {
            switch (enica) {
                case 'one':
                    return 1;
                case 'two':
                    return 2;
                case 'three':
                    return 3;
                case 'four':
                    return 4;
                case 'five':
                    return 5;
                case 'six':
                    return 6;
                case 'seven':
                    return 7;
                case 'eight':
                    return 8;
                case 'nine':
                    return 9;
                default:
                    return -1;
            }
        }

        function teensToNum(tinka) {
            switch (tinka) {
                case 'thir':
                    return 13;
                case 'four':
                    return 14;
                case 'fif':
                    return 15;
                case 'six':
                    return 16;
                case 'seven':
                    return 17;
                case 'eigh':
                    return 18;
                case 'nine':
                    return 19;
                default:
                    return -1;
            }
        }

        function checkExceptions(except) {
            switch (except) {
                case 'twelve':
                    return 12;
                case 'eleven':
                    return 11;
                case 'ten':
                    return 10;
                default:
                    return -1;
            }
        }
    },
    numToWord: function(N) {
        var enice = N % 10;
        var desetice = Math.floor(N / 10);
        if (N >= 20) {
            var ena = numToEnice(enice);
            var deset = numToDesetice(desetice);
            var result;
            if (ena === -1) {
                result = deset;
            } else {
                result = deset + "-" + ena;
            }
            return result;
        } else if (N <= 10) {
            if (desetice) {
                return numToDesetice(desetice);
            } else {
                return numToEnice(enice);
            }
        } else if (N === 11) {
            return "eleven";
        } else if (N === 12) {
            return "twelve";
        } else if (N > 12 && N < 20) {
            return numToTeen(N);
        }

        function numToEnice(enica) {
            switch (enica) {
                case 1:
                    return 'one';
                case 2:
                    return 'two';
                case 3:
                    return 'three';
                case 4:
                    return 'four';
                case 5:
                    return 'five';
                case 6:
                    return 'six';
                case 7:
                    return 'seven';
                case 8:
                    return 'eight';
                case 9:
                    return 'nine';
                default:
                    return -1;
            }
        }

        function numToDesetice(desetica) {
            switch (desetica) {
                case 1:
                    return 'ten';
                case 2:
                    return 'twenty';
                case 3:
                    return 'thirty';
                case 4:
                    return 'forty';
                case 5:
                    return 'fifty';
                case 6:
                    return 'sixty';
                case 7:
                    return 'seventy';
                case 8:
                    return 'eighty';
                case 9:
                    return 'ninety';
                default:
                    return -1;
            }
        }

        function numToTeen(teen) {
            switch (teen) {
                case 13:
                    return 'thirteen';
                case 14:
                    return 'fourteen';
                case 15:
                    return 'fifteen';
                case 16:
                    return 'sixteen';
                case 17:
                    return 'seventeen';
                case 18:
                    return 'eighteen';
                case 19:
                    return 'nineteen';
                default:
                    return -1;
            }
        }
    },
    numToOrd: function(enica) {
        switch (enica) {
            case 1:
                return 'first';
            case 2:
                return 'second';
            case 3:
                return 'third';
            case 4:
                return 'fourth';
            case 5:
                return 'fifth';
            case 6:
                return 'sixth';
            case 7:
                return 'seventh';
            case 8:
                return 'eighth';
            default:
                return -1;
        }
    },
    ordToNum: function(enica) {
        switch (enica) {
            case 'first':
                return 1;
            case 'second':
                return 2;
            case 'third':
                return 3;
            case 'fourth':
                return 4;
            case 'fifth':
                return 5;
            case 'sixth':
                return 6;
            case 'seventh':
                return 7;
            case 'eighth':
                return 8;
            default:
                return -1;
        }
    }
};

// SCORE//

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
            var yourName = prompt("You reached top " + SCORE.SCORE.depth + " score. Enter your name (max 10 characters): ");
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
        //$("#setup")[0].scrollIntoView(); //define
        return;
    },
    hiScore: function() {
        var HS = "";
        var tempVal;
        for (var hs = 1; hs <= SCORE.SCORE.depth; hs++) {
            HS += hs + ". " + SCORE.SCORE.name[hs - 1] + " " + SCORE.SCORE.value[hs - 1].toString().padLeft(5, CONST.SPACE) + "<br/>";
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
    getGrade: function(score) {
        switch (true) {
            case (score === 100):
                return "Amazing! Perfect score.";
            case (score > 95):
                return "Excellent";
            case (score > 90):
                return "Very well done.";
            case (score > 80):
                return "Nice.";
            case (score >= 70):
                return "Hmmm. Play again and try to do better.";
            case (score < 70):
                return "This was not good. You should practice more.";
        }
    },
    SCORE: {
        value: [200, 100, 50, 20, 10],
        name: ['C00lSch00l', 'C00lSch00l', 'C00lSch00l', 'C00lSch00l', 'C00lSch00l'],
        depth: 5,
        id: "TEST_Library"
    },
    dom: "<div id='hiscore ></div>"
};

////////////////////////////dice functions ///////////////////////////

var DICE = {
    draw: function(howMany) {
        var id = DICE.output;
        var dieElement = "<div class='dice'><canvas></canvas></div>";
        $("#" + id).html("");
        var sum = 0;
        for (var ix = 0; ix < howMany; ix++) {
            var temp = RND(1, 6);
            addDie(ix);
            drawFace(temp, "d" + ix);
            sum += temp;
        }
        return sum;

        function addDie(x) {
            $("#" + id).append(dieElement);
            $("#" + id + " div").last().attr("id", "X" + x);
            $("#X" + x + " canvas").attr("id", "d" + x);
            return;
        }

        function drawFace(x, id) {
            x--;
            var c = $("#" + id)[0];
            var cx = c.getContext("2d");
            img = new Image();
            //img.src = '/Sprite/dice6.sprite.png';
            img.src = 'http://www.c00lsch00l.eu/Sprite/dice6.sprite.png';
            var W = 120;
            img.onload = function() {
                cx.translate(W, 0);
                cx.rotate(Math.PI / 2);
                cx.clearRect(0, 0, W, W);
                cx.drawImage(img,
                    W * x, 0, W, W,
                    0, 0, W, W);
            };
            return;
        }
    },
    output: "board",
    setOutput: function(id) {
        DICE.output = id;
    }
};

//////////////////////////////////////////////////////////////////


//functions:
//wordToNum(string);
//numToWord(int);
//ordToNum(string);
//numToOrd(int);
//rnd(min, max);
//Inputs.validate(id, min, max, default);
//print(string); to 'id' element
//stringFill(string, howmany);
//padLeft; padRight(int, z, fill); returns number  as (z) character string preceded with fill-char; dependecy: stringFill;
//{saveHS(); saves HS to localStorage - used in checkScore()}
//loadHS(); loads HS from localStorage
//hiScore(); prints HS to 'id' element - in code,  AND !SAVES HS
//checkScore(score); checks number if qualified for HS, then updates HS; should follow by hiScore();
//shuffleArray(array);
//createArrayPool(max, N); creates array of number from 0 to max, return not repeated random N numbers;
//getGrade(score); returns grade - string according to score;
//RGBtoHex(r,g,b); returns HTML color code
//measure(); insert code and measure performance
//measureSpeed(function, ...args) measure performance
//var sumOfDots = drawDice(drawToId, numberOfDice);
//array.swap(x,y);
//array.shuffle(); dependency: swap
//array.createPool(max,N); fill array of number from 0 to max, return not repeated random N numbers - array should be predefined; dependency: clear;
//array.clear(); clears array



/////////////////////////// DEMO sandbox ////////

$(document).ready(function() {

    //print(CONVERT.wordToNum("sixty-seven"));

    //measureSpeed(DICE.draw,4);

    /*SCORE.loadHS();
    SCORE.hiScore();
    var test = prompt("score");
    SCORE.checkScore(test);
    SCORE.hiScore();*/

    console.log(DICE);
    var test = DICE.draw(3);
    PRINT(test);

    //PRG.preLoadImages();

    //print(RGBtoHex(0, 0, 14));

});

////////////////////////////////////////////////////// MISC ///////////////////////////////////////////


function RND(start, end) {
    return Math.floor(Math.random() * (++end - start) + start);
}

function sortNumber(a, b) {
    return a - b;
}

function RGBtoHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);

    function componentToHex(c) {
        var hex = c.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    }
}

//////////////////////////////////////////////////////////////////////

function measureSpeed(func) {
    var start = window.performance.now();
    var args = [];
    for (var i = 1; i < arguments.length; i++) {
        args[i - 1] = arguments[i];
    }
    func.apply(this, args);
    var end = window.performance.now();
    var lapse = (end - start).toFixed(3);
    console.log("It took: " + lapse + "ms");
    return "It took: " + lapse + "ms";
}
///////////////////////////////////////////////////////////

function wait(ms) {
    var start = new Date().getTime();
    var end = start;
    while (end < start + ms) {
        end = new Date().getTime();
    }
}
