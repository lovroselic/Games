/*
 AmaziacS
 by Lovro Selic (c) C00lSch00l 2016
 */

console.clear();
VERSION = "1.04";
console.log("AmaziacS V " + VERSION + " by Lovro Selic, (c) C00lSch00l 2016");
//SOURCE = "http://www.c00lsch00l.eu/Games/AA/";
SOURCE = "/Games/AA/";
LOAD_W = 202;
LOAD_H = 22;
ROOM_WIDTH = 768;
ROOM_HEIGHT = 768;
MAX_MAZE_HEIGHT = 768;
MAX_MAZE_WIDTH = 768;
STATUS_HEIGHT = 420;
STATUS_WIDTH = 256;
QUERY_WIDTH = STATUS_WIDTH;
QUERY_HEIGHT = ROOM_HEIGHT - STATUS_HEIGHT - 6;
GAME_WIDTH = ROOM_WIDTH + STATUS_WIDTH + 4;
GRIDPX = 48;
MAX_MAZE_X = MAX_MAZE_WIDTH / GRIDPX;
MAX_MAZE_Y = MAX_MAZE_HEIGHT / GRIDPX;
MIN_MAZE_X = 10;
MIN_MAZE_Y = 10;
CONNECTIONS = 5;
MIN_CONNECTIONS = 1;
MAX_CONNECTIONS = 7;
COIN_PLACES = 10;
STATUS_INVENTORY_Y = 92;
STATUS_INVENTORY_COINS_Y = 130;
ANIMATION_INTERVAL = 40;

Array.prototype.clear = function() {
  this.splice(0, this.length);
};
Array.prototype.compare = function(array) {
  if (!array)
    return false;
  var LN = this.length;
  if (LN !== array.length)
    return false;
  for (var x = 0; x < LN; x++) {
    if (this[x] != array[x])
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
};

var AMAZIACS = {
  start: function() {
    AMAZIACS.won = false;
    if ($("#cursor").prop("checked")) {
      $(document).keydown(AMAZIACS.checkKey);
    }
    //$(document).keydown(AMAZIACS.checkKey);
    AMAZIACS.started = new Date().getTime();
    Command.count = 0;
    $("#QUERY").html("");
    $("#QUERY").show();
    COOLIE.formChoices();
    Maze.create(MAX_MAZE_X, MAX_MAZE_Y);
    Maze.render();
    COOLIE.init();
    COOLIE.draw();
    Status.render();
    print("Welcome to AmaziacS.");
    print("Enter your command:");
    input();
  },
  frameDraw: function() {
    Maze.render();
    COOLIE.draw();
    Status.render();
    console.log("DEBUG at frameDraw():", COOLIE, "in pocket", COOLIE.calcInventoryValue());
  },
  win: function() {
    var line1 = "*********************<br>";
    var line2 = "<br>YOU HAVE WON THE GAME<br><br>";
    print("<span style='color: yellow'>" + line1 + line2 + line1 + "</span>");
    AMAZIACS.ended = new Date().getTime();
    var lapsed = (AMAZIACS.ended - AMAZIACS.started) / 60000;
    print("It took you " + lapsed.toFixed(1) + " minutes.");
    print("You typed " + Command.count + " commands.");
    print("Coolie made " + COOLIE.steps + " steps.");
    print("<br> <span style='color:red'>Click START for another round.</span>");
    AMAZIACS.won = true;
  },
  checkKey: function(e) {
    e = e || window.event;
    if (e.keyCode === 38) {
      //UP
      console.log("UP");
      Command.silent = true;
      Command.force("move up");

      e.preventDefault();
    } else if (e.keyCode === 40) {
      //DOWN
      console.log("DOWN");
      Command.silent = true;
      Command.force("move down");
      e.preventDefault();
    } else if (e.keyCode === 37) {
      //LEFT
      console.log("LEFT");
      Command.silent = true;
      Command.force("move left");
      e.preventDefault();
    } else if (e.keyCode === 39) {
      //RIGHT
      console.log("RIGHT");
      Command.silent = true;
      Command.force("move right");
      e.preventDefault();
    }
  }
};
var Status = {
  render: function() {
    Status.background();
    Status.title();
    Status.inventory();
    Status.want();
  },
  inventory: function() {
    var CTX = StatusScreen.ctx;
    CTX.textAlign = "left";
    CTX.fillStyle = "#00E000";
    CTX.shadowColor = "#00FF00";
    CTX.shadowOffsetX = 1;
    CTX.shadowOffsetY = 1;
    CTX.shadowBlur = 2;
    var x = 72;
    var y = STATUS_INVENTORY_Y;
    CTX.font = "16px Verdana";
    CTX.fillText("Coolie Inventory:", x, y);
    CTX.shadowColor = "#000";
    CTX.shadowOffsetX = 0;
    CTX.shadowOffsetY = 0;
    CTX.shadowBlur = 0;
    Sprite.drawStatus(10, 64, COOLIE.id);
    var CIL = COOLIE.inventory.length;
    if (CIL > 0) {
      for (var t = 0; t < CIL; t++) {
        Sprite.drawStatus(Status.coinGrid[t][0], Status.coinGrid[t][1], COOLIE.inventory[t].id);
      }
    }
  },
  want: function() {
    var CTX = StatusScreen.ctx;
    Sprite.drawStatus(10, 320, COOLIE.id);
    CTX.textAlign = "left";
    CTX.fillStyle = "#E000E0";
    CTX.shadowColor = "#FF00FF";
    CTX.shadowOffsetX = 1;
    CTX.shadowOffsetY = 1;
    CTX.shadowBlur = 2;
    var x = 72;
    var y = 350;
    CTX.font = "16px Verdana";
    CTX.fillText("Coolie wants:", x, y);
    CTX.fillStyle = "#F000F0";
    CTX.shadowColor = "#FF0000";
    CTX.font = "12px Verdana";
    CTX.fillText(COOLIE.choice[0].name.toUpperCase(), x, y + 24);
    CTX.fillText("which costs " + COOLIE.price.toFixed(2) + "€", x, y + 48);
    CTX.beginPath();
    CTX.lineWidth = 1;
    CTX.strokeStyle = "#0E0";
    CTX.shadowColor = "#00FF00";
    CTX.shadowOffsetX = 3;
    CTX.shadowOffsetY = 2;
    CTX.shadowBlur = 2;
    CTX.moveTo(20, STATUS_HEIGHT - 4);
    CTX.lineTo(STATUS_WIDTH - 20, STATUS_HEIGHT - 4);
    CTX.stroke();
    CTX.closePath();
  },
  title: function() {
    var CTX = StatusScreen.ctx;
    CTX.textAlign = "center";
    var grad = CTX.createLinearGradient(0, 0, STATUS_WIDTH, 0);
    grad.addColorStop("0", "orange");
    grad.addColorStop("0.1", "#ffc04d");
    grad.addColorStop("0.2", "orange");
    grad.addColorStop("0.3", "#ffc04d");
    grad.addColorStop("0.4", "orange");
    grad.addColorStop("0.5", "#ffc04d");
    grad.addColorStop("0.6", "orange");
    grad.addColorStop("0.7", "#ffc04d");
    grad.addColorStop("0.8", "orange");
    grad.addColorStop("0.7", "#ffc04d");
    grad.addColorStop("1", "orange");
    CTX.fillStyle = grad;
    var x = STATUS_WIDTH / 2;
    CTX.font = "10px Consolas";
    var y = 45;
    CTX.shadowColor = "yellow";
    CTX.shadowOffsetX = 1;
    CTX.shadowOffsetY = 1;
    CTX.shadowBlur = 2;
    CTX.fillText("Version " + VERSION, x, y);
    y = 57;
    CTX.fillText("Drawings: Mija Selič, Code: Lovro Selič", x, y);
    CTX.font = "20px Verdana";
    y = 30;
    CTX.shadowColor = "yellow";
    CTX.shadowOffsetX = 2;
    CTX.shadowOffsetY = 2;
    CTX.shadowBlur = 3;
    CTX.fillText("AmaziacS", x, y);
  },
  background: function() {
    var CTX = StatusScreen.ctx;
    CTX.fillStyle = "#000";
    CTX.fillRect(0, 0, STATUS_WIDTH, STATUS_HEIGHT);
  },
  coinGrid: [],
  makeCoinGrid: function() {
    var startX = 10;
    var startY = STATUS_INVENTORY_COINS_Y;
    var Yinc = 64;
    for (var q = 0; q < 4; q++) {
      Status.coinGrid.push([startX + q * 63, startY]);
    }
    for (var qq = 0; qq < 4; qq++) {
      Status.coinGrid.push([startX + qq * 63, startY + Yinc]);
    }
    for (var qqq = 0; qqq < 2; qqq++) {
      Status.coinGrid.push([startX + qqq * 63, startY + Yinc * 2]);
    }
  }
};
Status.makeCoinGrid();
var Coin = function(id, value, name) {
  this.value = value;
  this.id = id;
  this.name = name;
};
var coinCent1 = new Coin("1Cent", 0.01, "1 Cent Coin");
var coinCent10 = new Coin("10Cent", 0.10, "10 Cent Coin");
var coinCent2 = new Coin("2Cent", 0.02, "2 Cent Coin");
var coinCent20 = new Coin("20Cent", 0.20, "20 Cent Coin");
var coinCent5 = new Coin("5Cent", 0.05, "5 Cent Coin");
var coinCent50 = new Coin("50Cent", 0.50, "50 Cent Coin");
var coinEur1 = new Coin("1EUR", 1.00, "1 Euro Coin");
var coinEur2 = new Coin("2EUR", 2.00, "2 Euro Coin");
Coin.coins = [coinCent1, coinCent10, coinCent2, coinCent2, coinCent20, coinCent20, coinCent5, coinCent50, coinEur1, coinEur2];
var gameState = {
  imagesLoaded: false
};
var tileGraphics = [];
var RoomScreen = {};
var StatusScreen = {};
var Vector = function(x, y) {
  this.x = x;
  this.y = y;
};
var Pointer = function(x, y, vector) {
  this.x = x;
  this.y = y;
  this.vector = vector;
};
Vector.prototype.add = function(vector) {
  return new Vector(this.x + vector.x, this.y + vector.y);
};
Vector.prototype.mul = function(vector, num) {
  return new Vector(this.x + num * vector.x, this.y + num * vector.y);
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

var Directions = [
  [0, -1],
  [-1, 0],
  [1, 0],
  [0, 1]
];

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

var Corners = [
  [1, 1],
  [1, -1],
  [-1, 1],
  [-1, -1]
];

var Grid = function(block, avail) {
  this.block = block;
  this.avail = avail;
  this.cache = [];
};
var Command = {
  force: function(feed) {
    Command.store(feed.toLowerCase());
    Command.interpret();
    //Command.new();
  },
  get: function() {
    var commandLine = $("#Input").val();
    Command.silent = false;
    Command.print(commandLine);
    Command.store(commandLine.toLowerCase());
    Command.interpret();
    if (!AMAZIACS.won) {
      Command.new();
    }
  },
  interpret: function() {
    Command.count++;
    var firstCommand = Command.storage.shift();
    if (typeof Command.com[firstCommand] === "function") {
      Command.com[firstCommand]();
    } else {
      Command.syntaxError();
    }
  },
  syntaxError: function() {
    var ErrorMessages = ["This is not valid command.", "You want what?", "Try making sense.", "I don't understand you", "Just typing rubbish or what?", "Hmm?", "What do you want?", "This makes no sense", "Please try again, I don' understand.", "What??"];
    print(ErrorMessages.chooseRandom());
  },
  new: function() {
    input();
  },
  print: function(data) {
    $("#line").remove();
    print(">" + data.toUpperCase());
  },
  storage: [],
  store: function(data) {
    Command.storage.clear();
    var array = data.split(" ");
    array.remove("");
    Command.storage = array;
  },
  com: {
    help: function() {
      print("List of commands:");
      var forcedList = "HELP, MOVE, LOOK, PICK, DROP, BUY";
      print(forcedList);
    },
    move: function() {
      var direction = Command.storage.shift();
      if (direction === undefined) {
        print(["Moving nowhere ...", "Move where?", "Yes, but where?", "I will, but where ...", "Did you have a direction in mind?"].chooseRandom());
        return;
      }
      var whereTo = new Vector(COOLIE.x, COOLIE.y);
      var single = true;
      switch (direction) {
        case "up":
          whereTo = whereTo.add(UP);
          break;
        case "down":
          whereTo = whereTo.add(DOWN);
          break;
        case "left":
          whereTo = whereTo.add(LEFT);
          break;
        case "right":
          whereTo = whereTo.add(RIGHT);
          break;
        default:
          var value = wordToNum(direction);
          single = false;
          if (value > 10) {
            print(["Collie can not move so far in the single move.", "Try moving shorter distances at once.", "That's too far for Coolie."].chooseRandom());
            return;
          }
          if (value < 0) {
            whereTo = null;
            single = true;
            break;
          }
          var nextWord = Command.storage.shift();
          var finalDirection = Command.storage.shift();
          if (value == 1) {
            print("Use MOVE left,right, up, down; if you need to move single space away.");
            return;
          }
          if (nextWord != "spaces" && nextWord != "tiles" && nextWord != "squares" && nextWord != "fields" && nextWord != "steps" && nextWord != "blocks") {
            print("Move " + direction + " what?");
            return;
          }
          var OK;
          switch (finalDirection) {
            case "up":
              OK = checkPath(UP, value);
              if (OK) {
                whereTo = whereTo.mul(UP, value);
              } else
                whereTo = null;
              COOLIE.direction = UP;
              break;
            case "down":
              OK = checkPath(DOWN, value);
              if (OK) {
                whereTo = whereTo.mul(DOWN, value);
              } else
                whereTo = null;
              COOLIE.direction = DOWN;
              break;
            case "left":
              OK = checkPath(LEFT, value);
              if (OK) {
                whereTo = whereTo.mul(LEFT, value);
              } else
                whereTo = null;
              COOLIE.direction = LEFT;
              break;
            case "right":
              OK = checkPath(RIGHT, value);
              if (OK) {
                whereTo = whereTo.mul(RIGHT, value);
              } else
                whereTo = null;
              COOLIE.direction = RIGHT;
              break;
            default:
              whereTo = null;
          }
      }
      if (whereTo !== null && single) {
        if (Maze.isDot(whereTo.x, whereTo.y)) {
          COOLIE.x = whereTo.x;
          COOLIE.y = whereTo.y;
          AMAZIACS.frameDraw();

          console.log("Command.silent", Command.silent);
          if (!Command.silent) {
            print("Moving " + direction);
          }
          //print("Moving " + direction);
          COOLIE.steps++;
        } else {
          if (!Command.silent) {
            print(["Path blocked!", "But there is a wall there.", "I can't go " + direction + ".", "Impossible.", "Not possible."].chooseRandom());
          }
          //print(["Path blocked!", "But there is a wall there.", "I can't go " + direction + ".", "Impossible.", "Not possible."].chooseRandom());
        }
      } else if (whereTo !== null && single === false) {
        COOLIE.whereTo = whereTo;
        animateCoolie();
        print("Moving " + direction + " " + nextWord + " " + finalDirection);
        COOLIE.steps += value;
      } else {
        if (single) {
          print(["Move where?", "Never heard of this direction.", "I don't think so ...", "Move " + direction + " yourself."].chooseRandom());
          return;
        } else {
          print(["Coolie can't go through walls.", "The path is not clear.", "That would hurt Coolie's head."].chooseRandom());
          return;
        }
      }

      function checkPath(vector, len) {
        var wic = new Vector(COOLIE.x, COOLIE.y);
        var isWay = true;
        var test;
        for (var x = 0; x < len; x++) {
          wic = wic.add(vector);
          test = Maze.isDot(wic.x, wic.y);
          if (test === false) {
            isWay = false;
            break;
          }
        }
        return isWay;
      }

      function animateCoolie() {
        setTimeout(frameDraw, ANIMATION_INTERVAL);

        function frameDraw() {
          COOLIE.x += COOLIE.direction.x;
          COOLIE.y += COOLIE.direction.y;
          Maze.render();
          COOLIE.draw();
          if (COOLIE.x == COOLIE.whereTo.x && COOLIE.y == COOLIE.whereTo.y) {
            return;
          } else {
            requestAnimationFrame(animateCoolie);
          }
        }
      }
    },
    look: function() {
      var inv;
      if (Maze.matrix[COOLIE.x][COOLIE.y].cache.length === 1 && Maze.matrix[COOLIE.x][COOLIE.y].cache[0].hasOwnProperty("name")) {
        inv = Maze.matrix[COOLIE.x][COOLIE.y].cache[0].name;
      } else
        inv = "nothing";
      print("There is " + inv + " under Coolie.");
    },
    pick: function() {
      var preposition = Command.storage.shift();
      if (preposition !== "up") {
        print(["Please use preposition.", "You wan't to pick something UP?"].chooseRandom());
      } else {
        var object = Command.storage.shift();
        var add = Command.storage.shift();
        if (add !== undefined) {
          object += " " + add;
        }
        if (object !== "a coin" && object !== "the coin") {
          if (object == "coin") {
            print(["you want to pick up A coin perhaps?", "Please use articles."].chooseRandom());
          } else {
            print(["Pick up what?"].chooseRandom());
          }
        } else {
          if (Maze.matrix[COOLIE.x][COOLIE.y].cache.length === 1 && Maze.matrix[COOLIE.x][COOLIE.y].cache[0].hasOwnProperty("name")) {
            var picked = Maze.matrix[COOLIE.x][COOLIE.y].cache[0];
            COOLIE.inventory.push(Maze.matrix[COOLIE.x][COOLIE.y].cache.pop());
            print("Coolie picked up " + picked.name + ".");
            AMAZIACS.frameDraw();
          } else
            print(["There is nothing on the floor.", "There is nothing to pick up.", "I tried, but there is only dust on the floor.", "Coolie searches the floor ... but finds nothing.", "Coolie searches the floor ... but the floor is empty."].chooseRandom());
        }
      }
    },
    drop: function() {
      var value = Command.storage.shift() + " " + Command.storage.shift();
      var item = Command.storage.shift();
      if (value.indexOf("coin") > -1) {
        item = "coin";
        value = undefined;
      }
      if (item === undefined && value === "undefined undefined") {
        print(["Drop what?", "Be more specific."].chooseRandom());
        return;
      }
      if (item === "coin" && value === undefined) {
        if (COOLIE.inventory.length > 0) {
          print("Which coin would you like to drop?");
        } else {
          print(["You don't have any coins.", "But you are broke.", "You don't have anything.", "You seem to be pennyless ..."].chooseRandom());
        }
        return;
      }
      var isValuable = existCoin(value);
      if (isValuable < 0 && item === "coin") {
        print("There is no coin like this in this game.");
        return;
      }
      if (isValuable < 0 && item !== "coin") {
        print(["BLAH BLAH BLAH", "Really?", "I don't think so.", "Try to retype that ..."].chooseRandom());
        return;
      }
      if (COOLIE.inventory.length > 0) {
        var which = searchInventory(value);
        if (which < 0) {
          print("You don't have it");
        } else {
          if (item != "coin") {
            print("You want to to drop " + COOLIE.inventory[which].name + " what?");
            return;
          } else {
            if (Maze.matrix[COOLIE.x][COOLIE.y].cache.length > 0) {
              print(["There is already another coin in this place.", "There is no more space here for another coin."].chooseRandom());
              return;
            } else if ((COOLIE.x === Maze.entrance[0] && COOLIE.y === Maze.entrance[1]) || (COOLIE.x === Maze.exit[0] && COOLIE.y === Maze.exit[1])) {
              print(["Ok, but not here.", "This is not a good place for dropping coins."].chooseRandom());
            } else {
              print("Coolie dropped " + COOLIE.inventory[which].name + ".");
              dropCoin(which);
              AMAZIACS.frameDraw();
              return;
            }
          }
        }
      } else {
        if (item != "coin") {
          if (item === undefined) {
            item = value;
          }
          print("I don't know what '" + item + "' is, but you don't have it.");
          return;
        }
      }

      function dropCoin(which) {
        Maze.matrix[COOLIE.x][COOLIE.y].cache.push(COOLIE.inventory[which]);
        COOLIE.inventory.splice(which, 1);
      }

      function searchInventory(name) {
        var LEN = COOLIE.inventory.length;
        var found = false;
        for (var z = 0; z < LEN; z++) {
          var imeCelo = COOLIE.inventory[z].name.toLowerCase();
          var idx = imeCelo.indexOf("coin");
          var ime = imeCelo.substring(0, --idx);
          if (ime === name) {
            found = true;
            break;
          }
        }
        if (found) {
          return z;
        } else
          return -1;
      }

      function existCoin(name) {
        var LEN = Coin.coins.length;
        var found = false;
        for (var z = 0; z < LEN; z++) {
          var imeCelo = Coin.coins[z].name.toLowerCase();
          var idx = imeCelo.indexOf("coin");
          var ime = imeCelo.substring(0, --idx);
          if (ime === name) {
            found = true;
            break;
          }
        }
        if (found) {
          return z;
        } else
          return -1;
      }
    },
    buy: function() {
      var list = makeList();
      var what = Command.storage.shift() + " " + Command.storage.shift();
      var test = list.indexOf(what);
      var shop = shopList();
      var testShop = shop.indexOf(what);
      if (Maze.matrix[COOLIE.x][COOLIE.y].type != "EXIT") {
        print(["You must be in the shop to buy things.", "Go to the shop first.", "You are not in the shop."].chooseRandom());
        return;
      } else if (test < 0) {
        print(["We never sell this.", "It's not sold in this shop."].chooseRandom());
        return;
      } else if (testShop < 0) {
        print(["Not available in the shop this time."].chooseRandom());
        return;
      } else if (Maze.matrix[COOLIE.x][COOLIE.y].cache[0].name !== COOLIE.choice[0].name) {
        print(["You must go to the correct shelf."].chooseRandom());
      } else if (COOLIE.price > COOLIE.calcInventoryValue()) {
        print(["You are short on cash, buddy.", "Pick more money first.", "You don't have enough money."].chooseRandom());
      } else if (COOLIE.price < COOLIE.calcInventoryValue()) {
        print(["You have too much money.", "Make sure you have exact change first."].chooseRandom());
      } else {
        print("You have succesfully bought " + COOLIE.choice[0].name + ".");
        AMAZIACS.win();
      }

      function makeList() {
        var CL = Choices.length;
        var tempList = [];
        for (var x = 0; x < CL; x++) {
          tempList.push(Choices[x].name);
        }
        return tempList;
      }

      function shopList() {
        var tempList = [];
        for (var x = 0; x < 4; x++) {
          tempList.push(COOLIE.shop[x][0].name);
        }
        return tempList;
      }
    }
  }
};
var Sprite = {
  draw: function(X, Y, id) {
    var image = $("#" + id)[0];
    var CTX = RoomScreen.ctx;
    CTX.drawImage(image, X * GRIDPX, Y * GRIDPX);
  },
  drawStatus: function(X, Y, id) {
    var image = $("#" + id)[0];
    var CTX = StatusScreen.ctx;
    CTX.drawImage(image, X, Y);
  }
};
var COOLIE = {
  id: "Coolie2",
  init: function() {
    COOLIE.x = Maze.entrance[0];
    COOLIE.y = Maze.entrance[1];
    COOLIE.inventory = [];
    COOLIE.steps = 0;
  },
  draw: function() {
    Sprite.draw(COOLIE.x, COOLIE.y, COOLIE.id);
  },
  inventory: [],
  calcInventoryValue: function() {
    var LEN = COOLIE.inventory.length;
    var total = 0.00;
    if (LEN > 0) {
      for (var z = 0; z < LEN; z++) {
        total += parseFloat(COOLIE.inventory[z].value);
      }
    }
    return total.toFixed(2);
  },
  formChoices: function() {
    var tempChoices = [].concat(Choices);
    COOLIE.shop = [];
    COOLIE.choice = tempChoices.removeRandom();
    COOLIE.shop.push(COOLIE.choice);
    for (var x = 0; x < 7; x++) {
      COOLIE.shop.push(tempChoices.removeRandom());
    }
    var startP = 88;
    var endP = 410;
    COOLIE.price = rnd(startP, endP) / 100;
  },
  choice: {},
  shop: [],
  price: 0.00
};
var Maze = {
  deadEnds: [],
  init: function(X, Y) {
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
  createRoom: function(coord, type) {
    var x = coord[0];
    var y = coord[1];
    var ADL = AllDirections.length;
    for (var ix = 0; ix < ADL; ix++) {
      Maze.matrix[x + AllDirections[ix][0]][y + AllDirections[ix][1]].block = false;
      Maze.matrix[x + AllDirections[ix][0]][y + AllDirections[ix][1]].type = type;
      Maze.matrix[x + AllDirections[ix][0]][y + AllDirections[ix][1]].avail = false;
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
  isIn: function(tempX, tempY) {
    if (tempX < 0 || tempX >= Maze.maxX || tempY < 0 || tempY >= Maze.maxY) {
      return false;
    } else
      return true;
  },
  isFree: function(X, Y) {
    if (Maze.isIn(X, Y)) {
      if (Maze.matrix[X][Y].avail === true) {
        return true;
      } else
        return false;
    }
    return false;
  },
  startCoord: function() {
    var x = rnd(1, Maze.maxX - 2);
    var y = rnd(1, Maze.maxY - 2);
    if (flip()) {
      if (flip()) {
        x = 1;
      } else {
        x = Maze.maxX - 2;
      }
    } else {
      if (flip()) {
        y = 1;
      } else {
        y = Maze.maxY - 2;
      }
    }
    Maze.entrance = [x, y];
  },
  endCoord: function() {
    var x = Maze.maxX - Maze.entrance[0] - 1;
    var y = Maze.maxY - Maze.entrance[1] - 1;
    Maze.exit = [x, y];
  },
  create: function(X, Y) {
    Maze.init(X, Y);
    Maze.startCoord();
    Maze.createRoom(Maze.entrance, "ENTRANCE");
    Maze.endCoord();
    Maze.createRoom(Maze.exit, "EXIT");
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
    if ($("#mazetype").prop("checked") === false) {
      Maze.connect();
    }
    Maze.coinGrid();
    Maze.setShop();
  },
  seed: function() {
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
    return options[rnd(1, OLN) - 1];
  },
  dot: function(X, Y) {
    Maze.matrix[X][Y].block = false;
    Maze.matrix[X][Y].type = "CORRIDOR";
    Maze.matrix[X][Y].avail = false;
  },
  isDot: function(X, Y) {
    if (Maze.isIn(X, Y)) {
      if (Maze.matrix[X][Y].block === false) {
        return true;
      }
    }
    return false;
  },
  isBlock: function(X, Y) {
    if (Maze.isIn(X, Y)) {
      if (Maze.matrix[X][Y].block === true) {
        return true;
      }
    }
    return false;
  },
  dotExclude: function(X, Y) {
    if (Maze.isIn(X, Y)) {
      Maze.matrix[X][Y].avail = false;
    }
  },
  dotInclude: function(X, Y) {
    if (Maze.isIn(X, Y)) {
      Maze.matrix[X][Y].avail = true;
    }
  },
  corridor: function() {
    var start = Maze.seed();
    filterBorder();
    Maze.dotInclude(start[0], start[1]);
    var STACK = [start];
    var dirSTACK = [new Vector((start[0] - Maze.entrance[0]) / 2, (start[1] - Maze.entrance[1]) / 2)];
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
              var chance = rnd(1, CL) - 1;
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
          Maze.dotExclude(newX + shadow[s].x + moveDirection.x, newY + shadow[s].y + moveDirection.y);
        }
        var lateral = moveDirection.add(shadow[s]);
        if (Maze.isDot(tX + lateral.x, tY + lateral.y)) {
          Maze.dotExclude(tX, tY);
          Maze.dotExclude(tX + moveDirection.x, tY + moveDirection.y);
        }
        if (Maze.isDot(nextX + 2 * lateral.x + moveDirection.x, nextY + 2 * lateral.y + moveDirection.y)) {
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
  render: function() {
    drawBackground();
    renderMatrix();
    drawSigns();

    function drawBackground() {
      var CTX = RoomScreen.ctx;
      CTX.clearRect(0, 0, MAX_MAZE_WIDTH, MAX_MAZE_HEIGHT);
      var pattern = $("#StoneWall")[0];
      CTX.rect(0, 0, MAX_MAZE_WIDTH, MAX_MAZE_HEIGHT);
      var patF = CTX.createPattern(pattern, "repeat");
      CTX.fillStyle = patF;
      CTX.fill();
      CTX.rect(0, 0, MAX_MAZE_WIDTH, MAX_MAZE_HEIGHT);
      CTX.stroke();
    }

    function renderMatrix() {
      for (var x = 0; x < Maze.maxX; x++) {
        for (var y = 0; y < Maze.maxY; y++) {
          if (Maze.matrix[x][y].block === false) {
            drawTile(x, y);
          }
          if (Maze.matrix[x][y].cache.length === 1) {
            var tempId = Maze.matrix[x][y].cache[0].id;
            Sprite.draw(x, y, tempId);
          }
        }
      }
    }

    function drawTile(xGrid, yGrid) {
      var x = xGrid * GRIDPX;
      var y = yGrid * GRIDPX;
      var CTX = RoomScreen.ctx;
      var grad = CTX.createRadialGradient(x + GRIDPX / 2, y + GRIDPX / 2, GRIDPX / 2, x + GRIDPX / 2, y + GRIDPX / 2, GRIDPX / 4);
      grad.addColorStop(0, "#DDD ");
      grad.addColorStop(1, "#FFF ");
      CTX.fillStyle = grad;
      CTX.fillRect(x, y, GRIDPX, GRIDPX);
      CTX.beginPath();
      CTX.lineWidth = 1;
      CTX.strokeStyle = "#000";
      CTX.rect(x, y, GRIDPX, GRIDPX);
      CTX.stroke();
      CTX.closePath();
    }

    function drawText(xGrid, yGrid, text) {
      var x = xGrid * GRIDPX + GRIDPX / 5;
      var y = yGrid * GRIDPX + GRIDPX / 2 + 2;
      var CTX = RoomScreen.ctx;
      CTX.font = "10px Arial";
      CTX.fillStyle = 'black';
      CTX.fillText(text, x, y);
    }

    function drawSigns() {
      drawText(Maze.entrance[0], Maze.entrance[1], "HOME");
      drawText(Maze.exit[0], Maze.exit[1], "SHOP");
    }
  },
  stat: function() {
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
  makeExit: function() {
    var pointerCollection = [];
    var ADL = AllDirections.length - 1;
    var exitX = parseInt(Maze.exit[0], 10);
    var exitY = parseInt(Maze.exit[1], 10);
    for (var z = 0; z < ADL; z++) {
      var px = exitX + AllDirections[z][0];
      var py = exitY + AllDirections[z][1];
      var vectors = [
        [AllDirections[z][0], 0],
        [0, AllDirections[z][1]]
      ];
      var VL = vectors.length;
      for (var t = 0; t < VL; t++) {
        pointerCollection.push(new Pointer(px, py, new Vector(vectors[t][0], vectors[t][1])));
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
      var SLX = rnd(1, SL) - 1;
      Maze.dot(solutions[SLX][0], solutions[SLX][1]);
      Maze.hasSolution = true;
    }
  },
  hasHorizontalBridge: function(X, Y) {
    if (Maze.isBlock(X, Y)) {
      if (Maze.isDot(X - 1, Y) && Maze.isDot(X + 1, Y)) {
        if (Maze.isBlock(X, Y + 1) && Maze.isBlock(X, Y - 1)) {
          return true;
        }
      }
    }
    return false;
  },
  hasVerticalBridge: function(X, Y) {
    if (Maze.isBlock(X, Y)) {
      if (Maze.isBlock(X - 1, Y) && Maze.isBlock(X + 1, Y)) {
        if (Maze.isDot(X, Y + 1) && Maze.isDot(X, Y - 1)) {
          return true;
        }
      }
    }
    return false;
  },
  connect: function() {
    var inputPool = makePool();
    var connectionsCounter = 0;
    var setConnections = parseInt($("#addCorridors").val(), 10);
    while (connectionsCounter < setConnections) {
      var outputPool = [];
      var IPL = inputPool.length;
      for (var t = 0; t < IPL; t++) {
        var tempX = inputPool[t][0];
        var tempY = inputPool[t][1];
        if (Maze.hasHorizontalBridge(tempX, tempY) || Maze.hasVerticalBridge(tempX, tempY)) {
          outputPool.push([tempX, tempY]);
        }
      }
      var removeIndex = rnd(1, outputPool.length) - 1;
      var removed = outputPool.splice(removeIndex, 1);
      Maze.dot(removed[0][0], removed[0][1]);
      inputPool = outputPool;
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
  coinGrid: function() {
    var pool = makePoolForCoins();
    for (var q = 0; q < COIN_PLACES; q++) {
      var tempX = pool[q][0];
      var tempY = pool[q][1];
      Maze.matrix[tempX][tempY].cache.push(Coin.coins[q]);
    }
    return;

    function makePoolForCoins() {
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
        if (Maze.matrix[newPool[tx][0]][newPool[tx][1]].type != "CORRIDOR") {
          newPool[tx] = 0;
        }
      }
      newPool.remove(0);
      newPool.shuffle();
      var coinPlaces = Maze.deadEnds.concat(newPool);
      return coinPlaces.slice(0, COIN_PLACES);
    }
  },
  setShop: function() {
    COOLIE.shop.shuffle();
    var pool = [].concat(Corners);
    pool = pool.concat(Directions);
    var X = Maze.exit[0];
    var Y = Maze.exit[1];
    var tempX, tempY;
    var PL = pool.length;
    for (var x = 0; x < PL; x++) {
      tempX = X + pool[x][0];
      tempY = Y + pool[x][1];
      Maze.matrix[tempX][tempY].cache.push(COOLIE.shop[x][0]);
    }
    var HC = [].concat(HomeChoices);
    HC.shuffle();
    var CL = Corners.length;
    X = Maze.entrance[0];
    Y = Maze.entrance[1];
    for (x = 0; x < CL; x++) {
      tempX = X + Corners[x][0];
      tempY = Y + Corners[x][1];
      Maze.matrix[tempX][tempY].cache.push(HC[x]);
    }
  }
};

var Tile = function(id, x, y, type) {
  this.id = id;
  this.x = x;
  this.y = y;
  this.type = type;
};
var StoneWall = new Tile("StoneWall", 128, 128, "jpg");
var Coolie = new Tile("Coolie2", 48, 48, "png");
var Cent1 = new Tile("1Cent", 48, 48, "png");
var Cent10 = new Tile("10Cent", 48, 48, "png");
var Cent2 = new Tile("2Cent", 48, 48, "png");
var Cent20 = new Tile("20Cent", 48, 48, "png");
var Cent5 = new Tile("5Cent", 48, 48, "png");
var Cent50 = new Tile("50Cent", 48, 48, "png");
var Eur1 = new Tile("1EUR", 48, 48, "png");
var Eur2 = new Tile("2EUR", 48, 48, "png");
var Apple = new Tile("apple", 48, 48, "png");
var Banana = new Tile("banana", 48, 48, "png");
var Icecream = new Tile("icecream", 48, 48, "png");
var Mushroom = new Tile("mushroom", 48, 48, "png");
var Cake = new Tile("cake", 48, 48, "png");
var Panda = new Tile("panda", 48, 48, "png");
var Strawberry = new Tile("strawberry", 48, 48, "png");
var Pineapple = new Tile("pineapple", 48, 48, "png");
var Lemon = new Tile("lemon", 48, 48, "png");
var Pear = new Tile("pear", 48, 48, "png");
var Tomato = new Tile("tomato", 48, 48, "png");
var Orange = new Tile("orange", 48, 48, "png");
var Lollipop = new Tile("lollipop", 48, 48, "png");
var Pizza = new Tile("pizza", 48, 48, "png");
var Carrot = new Tile("carrot", 48, 48, "png");
var Clock = new Tile("clock", 48, 48, "png");
var Doll = new Tile("doll", 48, 48, "png");
var Ball = new Tile("ball", 48, 48, "png");
var Car = new Tile("car", 48, 48, "png");
var Tv = new Tile("tv", 48, 48, "png");
var Bed = new Tile("bed", 48, 48, "png");
var Teddy_Bear = new Tile("teddy-bear", 48, 48, "png");
var Table = new Tile("table", 48, 48, "png");
var Umbrella = new Tile("umbrella", 48, 48, "png");
var Chair = new Tile("chair", 48, 48, "png");

var World = {
  wall: [StoneWall],
  money: [Cent1, Cent2, Cent5, Cent10, Cent20, Cent50, Eur1, Eur2],
  sprite: [Coolie],
  item: [Apple, Banana, Icecream, Mushroom, Cake, Carrot, Pizza, Lollipop, Orange, Tomato, Pear, Lemon, Pineapple, Strawberry, Panda, Clock, Doll, Ball, Car, Tv, Umbrella],
  home: [Bed, Teddy_Bear, Table, Chair]
};
var Choice = function(name, tile) {
  this.name = name;
  this.tile = tile;
  this.id = this.tile.id;
};

var A_Bed = new Choice("a bed", Bed);
var A_Teddy_Bear = new Choice("a teddy bear", Teddy_Bear);
var A_Table = new Choice("a table", Table);
var A_Chair = new Choice("a chair", Chair);
var An_Apple = new Choice("an apple", Apple);
var A_Banana = new Choice("a banana", Banana);
var An_Icecream = new Choice("an icecream", Icecream);
var A_Mushroom = new Choice("a mushroom", Mushroom);
var A_Cake = new Choice("a cake", Cake);
var A_Carrot = new Choice("a carrot", Carrot);
var A_Pizza = new Choice("a pizza", Pizza);
var A_Lollipop = new Choice("a lollipop", Lollipop);
var An_Orange = new Choice("an orange", Orange);
var A_Tomato = new Choice("a tomato", Tomato);
var A_Pear = new Choice("a pear", Pear);
var A_Lemon = new Choice("a lemon", Lemon);
var A_Pineapple = new Choice("a pineapple", Pineapple);
var A_Strawberry = new Choice("a strawberry", Strawberry);
var A_Panda = new Choice("a panda", Panda);
var An_Umbrella = new Choice("an umbrella", Umbrella);
var A_Tv = new Choice("a tv", Tv);
var A_Car = new Choice("a car", Car);
var A_Ball = new Choice("a ball", Ball);
var A_Doll = new Choice("a doll", Doll);
var A_Clock = new Choice("a clock", Clock);

var Choices = [An_Apple, A_Banana, An_Icecream, A_Mushroom, A_Cake, A_Carrot, A_Pizza, A_Lollipop, An_Orange, A_Tomato, A_Pear, A_Lemon, A_Pineapple, A_Strawberry, A_Panda,
  A_Tv, A_Car, A_Ball, A_Doll, A_Clock, An_Umbrella
];
var HomeChoices = [A_Bed, A_Teddy_Bear, A_Table, A_Chair];

function setUp() {
  $("#version").html("AmaziacS V" + VERSION + " <span style='font-size:14px'>&copy</span> C00lSch00l 2016");
  setupDiv();

  $("#toggleSetup").click(function() {
    $("#fieldset").toggle(400);
  });

  $("#toggleHelp").click(function() {
    $("#help").toggle(400);
  });

  $("#addCorridors").focusout(function() {
    var temp = $(this).val();
    $(this).val(validateInput(temp, MIN_CONNECTIONS, MAX_CONNECTIONS, CONNECTIONS));
  });

  $("#mazetype").click(function() {
    if ($("#mazetype").prop("checked") === true) {
      $("#addCorridors").prop("disabled", true);
    } else {
      $("#addCorridors").prop("disabled", false);
    }
  });

  $("#QUERY").on('keypress', function(event) {
    if (event.which == 13) {
      event.preventDefault();
      Command.get();
    }
  });

}

function setupDiv() {
  $("#game").width(GAME_WIDTH);
  $("#game").append("<div class='gw' id ='ROOM'><canvas id='ROOM_canvas' width='" + ROOM_WIDTH + "' height='" + ROOM_HEIGHT + "'></canvas></div>");
  $("#game").append("<div class='gw' id ='STATUS'><canvas id='STATUS_canvas' width='" + STATUS_WIDTH + "' height='" + STATUS_HEIGHT + "'></canvas></div>");
  $("#game").append("<div id ='QUERY'></div>");
  $("#QUERY").height(QUERY_HEIGHT);
  $("#QUERY").width(QUERY_WIDTH);
  $("#temp").append("<canvas id ='temp_canvas'></canvas>");
  $("#load").append("<canvas id ='preload_canvas' width='" + LOAD_W + "' height='" + LOAD_H + "'></canvas>");
  RoomScreen.ctx = $("#ROOM_canvas")[0].getContext("2d");
  var CTX = RoomScreen.ctx;
  StatusScreen.ctx = $("#STATUS_canvas")[0].getContext("2d");
  gameState.ctx = $("#preload_canvas")[0].getContext("2d");
}

function preLoadImages() {

  function cnt() {
    count++;
    var percent = Math.floor((count / HMI) * 100);
    var CTX = gameState.ctx;
    CTX.clearRect(0, 0, LOAD_W, LOAD_H);
    CTX.beginPath();
    CTX.lineWidth = "1";
    CTX.strokeStyle = "black";
    CTX.rect(0, 0, LOAD_W, LOAD_H);
    CTX.stroke();
    CTX.fillStyle = "#999";
    CTX.fillRect(1, 1, Math.floor((LOAD_W - 2) * (percent / 100)), LOAD_H - 2);
    CTX.fillStyle = "black";
    CTX.font = "10px Verdana";
    CTX.fillText("Loading: " + percent + "%", LOAD_W * 0.1, LOAD_H * 0.62);
    if (count === HMI) {
      gameState.imagesLoaded = true;
      $("#buttons").prepend("<input type='button' id='startGame' value='START'>");
      $("#load").addClass("hidden");
    }
  }

  function getImgFileNames() {
    var fileNames = [];
    for (var prop in World) {
      var LN = World[prop].length;
      if (LN) {
        for (var ix = 0; ix < LN; ix++) {
          var name = SOURCE + World[prop][ix].id + "." + World[prop][ix].type;
          fileNames.push({
            id: World[prop][ix].id,
            filename: name
          });
        }
      }
    }
    return fileNames;
  }

  var count = 0;
  var fileNames = getImgFileNames();
  var HMI = fileNames.length;
  for (var ix = 0; ix < HMI; ix++) {
    tileGraphics[ix] = new Image();
    tileGraphics[ix].src = fileNames[ix].filename;
    $("#preload").append("<img id='" + fileNames[ix].id + "' src='" + fileNames[ix].filename + "'/>");
    tileGraphics[ix].onload = cnt();
  }
  return;
}

$(document).ready(function() {
  setUp();
  preLoadImages();

  $("#startGame").click(function() {
    AMAZIACS.start();
  });

});

function flip() {
  var x = rnd(0, 1);
  if (x === 1) {
    return true;
  } else {
    return false;
  }
}

function validateInput(set, min, max, def) {
  if (isNaN(set))
    return def;
  if (set < min)
    return min;
  if (set > max)
    return max;
  return set;
}

function rnd(start, end) {
  return Math.floor(Math.random() * (++end - start) + start);
}

function print(data) {
  outp(data, "p");

  function outp(data, tag) {
    $("#QUERY").append("<" + tag + ">" + data + "</" + tag + ">");
    $("#QUERY").children().last()[0].scrollIntoView();
  }
}

function input() {
  $("#QUERY").append("<span id='line'> ><input id='Input' type = 'text' value='' autofocus='autofocus' maxlength='32'></span>");
  $("#QUERY").children().last()[0].scrollIntoView();
  $("#Input").focus();
}

function wordToNum(text) {
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
}