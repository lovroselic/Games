"use strict";
//console.clear();
/////////////////////////////////////////////////
/*  
 
 to do:
 
 
 known bugs:
 
 */
////////////////////////////////////////////////////

var DEBUG = {
  frameCount: 0,
  fog: true,
  coord: false,
  level: false,
  viewMonsters: false,
};
var INI = {
  MIN_KILL_SPEED: 0.001,
  LAST_LEVEL: 12,
  GBpLVL: 10,
  CpLVL: 10,
  GBpDE: 2,
  CpCRD: 5,
  HPpLVL: 10,
  MPpCRD: 11,
  WpLVL: 2,
  CHpLVL: 6,
  LMPpLVL: 4,
  SCRpLVL: 12,
  Health_INC: 0.4,
  EXP_KEY: 50,
  MINI_PIX: 4,
  TEMPLE_TIMEOUT: 60,
  EXP: 400,
  MAGIC_EXP: 50,
  EXP_FACTOR: 1.5,
  MAGIC_EXP_FACTOR: 1.4,
  PTS_LVL: 3,
  LVL_HEALTH: 5,
  LVL_MANA: 10,
  MAGIC_FAIL: 1.5,
  MAGIC_POWER_COST: 2,
  ORB_MAX_RANGE: 10,
  ENEMY_COMMON: 3,
  ENEMY_START: 1,
  ENEMY_KEY_ADD: 2,
  ENEMY_END_ADD: 2,
  ENEMY_TEMPLE: 1,
  ENEMY_CORRIDOR: 25,
  ENEMY_OPENSPACE: 4,
  TRIGGER_WAKE: 11,
  TRIGGER_VISION: 9,
  SHOOT_TIMEOUT: 3000,
  INVISIBILITY_TIME: 30,
  MANA_DRAIN_RANGE: 6,
  MAP_RADIUS: 5,
  INITIATIVE_BONUS: 5,
  ATTACk_OFFSET: -1,
  AGILITY_TURN: 20,
  MAX_AGILITY_DELTA: 10,
  HERO_MAX_AGILITY_DELTA: -15,
  FIGHT_PANEL_WIDTH: 200,
  FLEE_AGILITY_DELTA: 5,
  POINTS_ON_START: 4,
  NEMESIS_RESPAWN: 1200,
  STALK_DISTANCE: 3,
  LAMP_PERSISTENCE: 99,
  PETRIFY_RANGE: 4,
  MAGIC_BOOST_TIME: 30,
  LUCK_TIME: 60,
  MAX_LUCK: 25,
  FINAL_GOLD: 100
};
var PRG = {
  VERSION: "1.00",
  CSS: "color: #80f709",
  NAME: "Deep Down Into the Darkness",
  YEAR: 2020,
  SG: "DDIDSG",
  INIT: function () {
    console.log("%c****************************", PRG.CSS);
    console.log(
      `%c${PRG.NAME} ${PRG.VERSION} by Lovro Selic, (c) C00lSch00l ${PRG.YEAR} on ˘${navigator.userAgent}`,
      PRG.CSS
      );
    $("#title").html(PRG.NAME);
    $("#version").html(
      PRG.NAME +
      " V" +
      PRG.VERSION +
      " <span style='font-size:14px'>&copy</span> C00lSch00l 2020"
      );
    $("input#toggleAbout").val("About " + PRG.NAME);
    $("#about fieldset legend").append(" " + PRG.NAME + " ");

    ENGINE.autostart = true;
    ENGINE.start = PRG.start;
    ENGINE.readyCall = GAME.setup;
    ENGINE.init();
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
    $(ENGINE.topCanvas).off("mousemove", ENGINE.mouseOver);
    $(ENGINE.topCanvas).off("click", ENGINE.mouseClick);
    $(ENGINE.topCanvas).css("cursor", "");
    console.log(AUDIO.Title);
    if (AUDIO.Title) {
      AUDIO.Title.pause();
      AUDIO.Title.currentTime = 0;
    }
    console.log(`%c${PRG.NAME} started.`, PRG.CSS);
    //add boxes
    if (!GAME.restarted) {
      console.log("%cAdding boxes, setting ENGINE ....", PRG.CSS);
      ENGINE.gameWIDTH = 768;
      ENGINE.sideWIDTH = 1024 - ENGINE.gameWIDTH;
      ENGINE.gameHEIGHT = 768;
      ENGINE.titleHEIGHT = 80;
      ENGINE.titleWIDTH = 1024;
      ENGINE.bottomHEIGHT = 40;
      ENGINE.bottomWIDTH = 1024;
      ENGINE.checkProximity = false;
      ENGINE.checkIntersection = false;
      ENGINE.setCollisionsafe(49);
      $("#bottom").css(
        "margin-top",
        ENGINE.gameHEIGHT + ENGINE.titleHEIGHT + ENGINE.bottomHEIGHT
        );
      $(ENGINE.gameWindowId).width(ENGINE.gameWIDTH + ENGINE.sideWIDTH + 4);
      ENGINE.addBOX(
        "TITLE",
        ENGINE.titleWIDTH,
        ENGINE.titleHEIGHT,
        ["title"],
        null
        );
      ENGINE.addBOX(
        "ROOM",
        ENGINE.gameWIDTH,
        ENGINE.gameHEIGHT,
        [
          "background",
          "coordview",
          "grave",
          "animation",
          "actors",
          "orbs",
          "explosion",
          "fogview",
          "text",
          "button",
          "click"
        ],
        "side"
        );
      ENGINE.addBOX(
        "SIDE",
        ENGINE.sideWIDTH,
        ENGINE.gameHEIGHT,
        ["sideback", "status", "map", "time"],
        "fside"
        );
      ENGINE.addBOX(
        "DOWN",
        ENGINE.bottomWIDTH,
        ENGINE.bottomHEIGHT,
        ["bottom", "bottomText"],
        null
        );

      ENGINE.addBOX(
        "LEVEL",
        ENGINE.gameWIDTH,
        ENGINE.gameHEIGHT,
        ["floor", "wall", "config", "fog", "coord"],
        null
        );
      if (!DEBUG.level)
        $("#LEVEL").addClass("hidden");
    }
    if (!PRG.showTitle) {
      if (GAME.restarted) {
        GAME.restartGame();
      }

      $("#startGame").addClass("hidden");
      $("#checkpoint").addClass("hidden");
      var disableKeys = ["enter", "space", "tab", "back", "F7"];
      for (let key in disableKeys)
        ENGINE.disableKey(key);
      GAME.start();
    } else {
      PRG.showTitle = false;
      GAME.restarted = true;
      TITLE.startTitle();
    }
  },
  checkpoint: function () {
    console.log(`%c${PRG.NAME} started from checkpoint.`, PRG.CSS);
    GAME.fromCheckpoint = true;
    PRG.start();
  },
  showTitle: true
};
class Gold {
  constructor(value, grid) {
    this.name = "Gold";
    this.value = Math.max(value, 1);
    this.grid = grid;
    this.static = false;
    if (value >= 100) {
      this.sprite = SPRITE.Gold;
    } else
      this.sprite = SPRITE.Coin;
  }
  exe() {
    HERO.gold += this.value;
    TEXTPOOL.pool.push(
      new TextSprite(
        this.value,
        GRID.gridToCoord(this.grid),
        "#DAA520",
        125,
        10
        )
      );
    TITLE.change();
    AUDIO.Pick.play();
  }
}
class Potion {
  constructor(type, grid) {
    this.name = "Potion";
    this.type = type;
    this.grid = grid;
    this.static = false;
    switch (type) {
      case "health":
        this.sprite = SPRITE.RedPotion;
        this.exe = () => {
          HERO.redPotion++;
          TITLE.change();
          AUDIO.Potion.play();
        };
        break;
      case "magic":
        this.sprite = SPRITE.BluePotion;
        this.exe = () => {
          HERO.bluePotion++;
          TITLE.change();
          AUDIO.Potion.play();
        };
        break;
    }
  }
}
class Chest {
  constructor(grid) {
    this.name = "Chest";
    this.grid = grid;
    this.sprite = SPRITE.Chest;
    this.static = true;
    let option = RND(1, 5);
    switch (option) {
      case 1:
      case 2:
        this.contains = new Gold(100, this.grid);
        break;
      case 3:
      case 4:
        let type = ["health", "magic"];
        this.contains = new Potion(type.chooseRandom(), this.grid);
        break;
      case 5:
        let boosts = ["health", "mana", "weapon", "armor", "magic"];
        this.contains = new Boost(boosts.chooseRandom(), this.grid);
        break;
    }
  }
  exe() {
    MAP[GAME.level].DUNGEON.chests.push(this.contains);
    AUDIO.Chest.play();
  }
}
class Boost {
  constructor(type, grid) {
    this.name = "Boost";
    this.type = type;
    this.grid = grid;
    this.static = false;
    switch (type) {
      case "health":
        this.sprite = SPRITE.Heart;
        this.exe = () => {
          HERO.maxHealth += INI.LVL_HEALTH;
          HERO.health = HERO.maxHealth;
          TITLE.change();
          AUDIO.PowerUp.play();
        };
        break;
      case "mana":
        this.sprite = SPRITE.Mana;
        this.exe = () => {
          HERO.maxMana += INI.LVL_MANA;
          HERO.mana = HERO.maxMana;
          TITLE.change();
          AUDIO.PowerUp.play();
        };
        break;
      case "weapon":
        this.sprite = SPRITE.Sword;
        this.exe = () => {
          HERO.weapon++;
          TITLE.change();
          AUDIO.PowerUp.play();
        };
        break;
      case "armor":
        this.sprite = SPRITE.Shield;
        this.exe = () => {
          HERO.armor++;
          TITLE.change();
          AUDIO.PowerUp.play();
        };
        break;
      case "magic":
        this.sprite = SPRITE.Magic;
        this.exe = () => {
          HERO.magic++;
          HERO.maxMana += Math.floor(INI.LVL_MANA / 2);
          TITLE.change();
          AUDIO.PowerUp.play();
        };
        break;
      case "agility":
        this.sprite = SPRITE.Agility;
        this.exe = () => {
          HERO.agility++;
          TITLE.change();
          AUDIO.PowerUp.play();
        };
        break;
    }
  }
}
class Lamp {
  constructor(grid) {
    this.grid = grid;
    this.sprite = SPRITE.Lamp;
  }
  exe() {
    if (!HERO.lamp) {
      HERO.visibility = 2;
      HERO.inventory.add(SPRITE.Lamp);
      TITLE.change();
      this.switchOn();
    } else {
      HERO.lamp.extend(INI.LAMP_PERSISTENCE);
    }
    AUDIO.Scroll.play();
  }
  switchOn() {
    HERO.lamp = new CountDown("Lamp", INI.LAMP_PERSISTENCE, this.switchOff);
  }
  switchOff() {
    HERO.visibility = 1;
    HERO.lamp = false;
    HERO.inventory.delete(SPRITE.Lamp);
    TITLE.change();
  }
}
class Scroll {
  constructor(grid, type, use) {
    this.name = "Scroll";
    this.class = "Scroll";
    this.type = type;
    this.id = this.name + this.type;
    this.sprite = SPRITE["SCR_" + type] || SPRITE.Scroll;
    this.grid = grid;
    this.static = false;
    this.use = use;
  }
  exe() {
    HERO.scrolls.add(this);
    AUDIO.Scroll.play();
  }
  action() {
    let POOL;
    switch (this.type) {
      case "HalfLife":
        GAME.TURN.enemy.health = Math.ceil(GAME.TURN.enemy.health / 2);
        CONSOLE.print(
          `<span class="blue">${HERO.name}</span> drained <span class="red">${GAME.TURN.enemy.title}'s</span> life.`
          );
        break;

      case "Luck":
        HERO.lucky();
        break;

      case "MagicBoost":
        if (HERO.magicCoat) {
          HERO.magicCoat.extend(INI.MAGIC_BOOST_TIME);
          return;
        }
        const N = inflate(HERO.magic);
        HERO.boostMagic(N);
        break;

      case "TeleportTemple":
        if (!MAP[GAME.level].DUNGEON.temple)
          return;
        GRID.teleportToGrid(HERO, MAP[GAME.level].DUNGEON.temple.add(UP), true);
        HERO.updView();
        break;

      case "Cripple":
        POOL = MAP[GAME.level].DUNGEON.ENEMY;
        for (let q = 0, PL = POOL.length; q < PL; q++) {
          let enemy = POOL[q];
          let distance = HERO.MoveState.endGrid.distanceDiagonal(
            enemy.MoveState.endGrid
            );
          if (distance <= INI.MANA_DRAIN_RANGE) {
            enemy.speed = 1;
            enemy.agility = drain(enemy.agility);
          }
        }
        break;

      case "Map":
        let grid;
        if (MAP[GAME.level].DUNGEON.mapAnchors.length) {
          grid = MAP[GAME.level].DUNGEON.mapAnchors.shift();
        } else
          grid = MAP[GAME.level].DUNGEON.getAnyGrid();
        MINIMAP.unveil(grid);
        TITLE.change();
        break;

      case "Light":
        let lamp = new Lamp(new Grid(0, 0));
        lamp.exe();
        break;

      case "Invisibility":
        HERO.invisible();
        break;

      case "DrainMana":
        HERO.mana = 0;
        TITLE.change();
        POOL = MAP[GAME.level].DUNGEON.ENEMY;
        for (let q = 0, PL = POOL.length; q < PL; q++) {
          let enemy = POOL[q];
          let distance = HERO.MoveState.endGrid.distanceDiagonal(
            enemy.MoveState.endGrid
            );
          if (distance <= INI.MANA_DRAIN_RANGE) {
            enemy.mana = 0;
          }
        }
        break;

      case "BoostWeapon":
        $("#hero_sword").css({color: "blue"});
        HERO.weapon = inflate(HERO.weapon);
        CONSOLE.print(
          `<span class="blue">${HERO.name}</span> applied magical sharpening oil to the sword.`
          );
        break;

      case "BoostArmor":
        $("#hero_shield").css({color: "blue"});
        HERO.armor = inflate(HERO.armor);
        CONSOLE.print(
          `<span class="blue">${HERO.name}</span> applied magic protection oil to the armor.`
          );
        break;

      case "DestroyArmor":
        $("#enemy_armor").css({color: "red"});
        GAME.TURN.enemy.armor = drain(GAME.TURN.enemy.armor);
        CONSOLE.print(
          `<span class="blue">${HERO.name}</span> magically lowered <span class="red">${GAME.TURN.enemy.title}'s</span> defense.`
          );
        break;

      case "DestroyWeapon":
        $("#enemy_weapon").css({color: "red"});
        GAME.TURN.enemy.weapon = drain(GAME.TURN.enemy.weapon);
        CONSOLE.print(
          `<span class="blue">${HERO.name}</span> magically drained <span class="red">${GAME.TURN.enemy.title}'s</span> weapons.`
          );
        break;

      case "Petrify":
        POOL = MAP[GAME.level].DUNGEON.ENEMY;
        for (let q = 0, PL = POOL.length; q < PL; q++) {
          let enemy = POOL[q];
          if (enemy.immunity)
            continue;
          let distance = HERO.MoveState.endGrid.distanceDiagonal(
            enemy.MoveState.endGrid
            );
          if (distance <= INI.PETRIFY_RANGE) {
            enemy.petrify();
          }
        }
        break;

      default:
        console.log("Scroll action ERROR!");
        break;
    }
    AUDIO.UseScroll.play();

    function drain(number) {
      let N = RND(Math.floor(0.333 * number), Math.ceil(0.666 * number));
      if (N === number)
        N = number - 1;
      return N;
    }
    function inflate(number) {
      let N = RND(Math.floor(1.2 * number), Math.ceil(1.5 * number));
      if (N === number)
        N = number + 1;
      return N;
    }
  }
}
var SCROLLS = [
  {type: "Light", use: "explore"},
  {type: "Invisibility", use: "explore"},
  {type: "Map", use: "explore"},
  {type: "DrainMana", use: "explore"},
  {type: "Cripple", use: "explore"},
  {type: "BoostWeapon", use: "fight"},
  {type: "BoostArmor", use: "fight"},
  {type: "DestroyArmor", use: "fight"},
  {type: "DestroyWeapon", use: "fight"},
  {type: "Petrify", use: "explore"},
  {type: "MagicBoost", use: "explore"},
  {type: "TeleportTemple", use: "explore"},
  {type: "Luck", use: "explore"},
  {type: "HalfLife", use: "fight"}
];
var HERO = {
  construct: function () {
    HERO.name = HERO.getName();
    HERO.gold = 0;
    HERO.redPotion = 0;
    HERO.bluePotion = 0;
    HERO.maxHealth = 8;
    HERO.health = HERO.maxHealth;
    HERO.maxMana = 13;
    HERO.mana = HERO.maxMana;
    HERO.armor = 1;
    HERO.weapon = 1;
    HERO.magic = 2;
    HERO.magicBoost = 0;
    HERO.agility = 1;
    HERO.inventory = new Set();
    HERO.scrolls = new Inventory();
    HERO.silverKey = false;
    HERO.goldKey = false;
    HERO.level = 0;
    HERO.experience = 0;
    HERO.expBuffer = 0;
    HERO.magicExpBuffer = 0;
    HERO.speed = 6;
    HERO.visibility = 1;
    HERO.dark = false;
    HERO.dead = false;
    HERO.cloak = false;
    HERO.magicCoat = false;
    HERO.lamp = false;
    HERO.points = 0;
    HERO.canEnterTemple = true;
    HERO.templeTimer = null;
    HERO.canLevelUp = false;
    HERO.spriteClass = "Knight";
    HERO.asset = ASSET[HERO.spriteClass];
    HERO.actor = new ACTOR(HERO.spriteClass, 0, 0, "front", HERO.asset);
    HERO.inFight = false;
    HERO.inTemple = false;
    HERO.maxDepth = 1;
    HERO.luck = 5;
    HERO.addLuck = 0;
  },
  getName: function () {
    let name = $("#HeroName").val();
    return name.toLowerCase().capitalize();
  },
  invisible: function () {
    HERO.dark = true;
    HERO.cloak = new CountDown(
      "Invisibility",
      INI.INVISIBILITY_TIME,
      HERO.visible
      );
    HERO.spriteClass = "KnightInvisible";
    HERO.setSpriteClass(HERO.spriteClass);
  },
  visible: function () {
    HERO.dark = false;
    HERO.cloak = false;
    HERO.spriteClass = "Knight";
    HERO.setSpriteClass(HERO.spriteClass);
  },
  boostMagic: function (N) {
    console.log("Boosting magic", N, INI.MAGIC_BOOST_TIME);
    HERO.magicBoost = N;
    TITLE.change();
    HERO.magicCoat = new CountDown(
      "Magic Coat",
      INI.MAGIC_BOOST_TIME,
      HERO.resetMagic
      );
    HERO.spriteClass = "KnightCoated";
    HERO.setSpriteClass(HERO.spriteClass);
  },
  resetMagic: function () {
    console.log("magic coat expired!");
    HERO.magicBoost = 0;
    HERO.magicCoat = false;
    TITLE.change();
    HERO.spriteClass = "Knight";
    HERO.setSpriteClass(HERO.spriteClass);
  },
  setSpriteClass: function (spriteClass) {
    HERO.asset = ASSET[spriteClass];
    HERO.actor.class = spriteClass;
    HERO.actor.asset = HERO.asset;
    HERO.actor.resetIndexes();
    HERO.actor.animateMove(HERO.actor.orientation);
  },
  init: function () {
    GRID.gridToSprite(MAP[GAME.level].DUNGEON[GAME.location], HERO.actor);
    HERO.MoveState = new MoveState(
      MAP[GAME.level].DUNGEON[GAME.location],
      DOWN
      );
    ENGINE.VIEWPORT.check(HERO.actor);
    ENGINE.VIEWPORT.alignTo(HERO.actor);
  },
  draw: function () {
    if (HERO.dead)
      return;
    ENGINE.spriteDraw(
      "actors",
      HERO.actor.vx,
      HERO.actor.vy,
      HERO.actor.sprite()
      );
    ENGINE.layersToClear.add("actors");
  },
  move: function () {
    if (HERO.dead)
      return;
    if (HERO.MoveState.moving) {
      GRID.translateMove(HERO, true, HeroOnFinish);
    }
    function HeroOnFinish() {
      TITLE.change();
      HERO.updView();
    }
  },
  changeDirection: function (dir) {
    if (HERO.MoveState.moving)
      return;
    let x = HERO.MoveState.endGrid.x + dir.x;
    let y = HERO.MoveState.endGrid.y + dir.y;
    if (!GRID.isBlock(x, y)) {
      HERO.MoveState.next(dir);
    }
  },
  interactLists: function () {
    let LIST = ["boosts", "chests", "gold", "potions", "lamps", "scrolls"];
    for (let outer = 0, LN = LIST.length; outer < LN; outer++) {
      let LL = MAP[GAME.level].DUNGEON[LIST[outer]].length;
      for (let list_index = 0; list_index < LL; list_index++) {
        let element = MAP[GAME.level].DUNGEON[LIST[outer]][list_index];
        let hit = GRID.collision(HERO, element.grid);
        if (hit) {
          if (element.static)
            HERO.MoveState.reverse();
          element.exe();
          ENGINE.VIEWPORT.changed = true;
          MAP[GAME.level].DUNGEON[LIST[outer]].splice(list_index, 1);
          GAME.PAINT.config();
          return;
        }
      }
    }
  },
  interactStatic: function () {
    let LIST = [
      "door",
      "gate",
      "entrance",
      "exit",
      "goldKey",
      "silverKey",
      "temple"
    ];
    let element;
    for (let q = 0, LN = LIST.length; q < LN; q++) {
      element = check(LIST[q]);
      if (element !== null)
        break;
    }
    if (element === null)
      return;
    let keyExp = getKeyExp();
    switch (element) {
      case "door":
        if (HERO.silverKey) {
          HERO.silverKey = false;
          HERO.incExp(keyExp);
          SpritePOOL.pool.push(
            new PartSprite(
              GRID.gridToCoord(MAP[GAME.level].DUNGEON.door),
              SPRITE.Door,
              SPRITE.Door.height,
              1
              )
            );
          MINIMAP.maps[GAME.level].map[
            GRID.gridToIndex(MAP[GAME.level].DUNGEON.door)
          ] = 1;
          MAP[GAME.level].DUNGEON.door = null;
          MAP[GAME.level].DUNGEON.setObstacles(
            MAP[GAME.level].DUNGEON.door,
            MAP[GAME.level].DUNGEON.gate
            );
          HERO.inventory.delete(SPRITE.silverKey);
          GAME.PAINT.config();
          TITLE.change();
          AUDIO.OpenGate.play();
          TEXTPOOL.pool.push(
            new TextSprite(
              (keyExp + "XP").toString(),
              GRID.gridToCoord(this.MoveState.homeGrid),
              "#00FF00",
              100
              )
            );
        } else {
          HERO.MoveState.reverse();
          AUDIO.ClosedDoor.play();
        }
        break;

      case "gate":
        if (HERO.goldKey) {
          HERO.goldKey = false;
          HERO.incExp(getKeyExp());
          SpritePOOL.pool.push(
            new PartSprite(
              GRID.gridToCoord(MAP[GAME.level].DUNGEON.gate),
              SPRITE.Gate,
              SPRITE.Gate.height,
              1
              )
            );
          MINIMAP.maps[GAME.level].map[
            GRID.gridToIndex(MAP[GAME.level].DUNGEON.gate)
          ] = 1;
          MAP[GAME.level].DUNGEON.gate = null;
          MAP[GAME.level].DUNGEON.setObstacles(
            MAP[GAME.level].DUNGEON.door,
            MAP[GAME.level].DUNGEON.gate
            );
          HERO.inventory.delete(SPRITE.goldKey);
          GAME.PAINT.config();
          TITLE.change();
          AUDIO.OpenGate.play();
          TEXTPOOL.pool.push(
            new TextSprite(
              (keyExp + "XP").toString(),
              GRID.gridToCoord(this.MoveState.homeGrid),
              "#00FF00",
              100
              )
            );
        } else {
          HERO.MoveState.reverse();
          AUDIO.ClosedDoor.play();
        }
        break;

      case "entrance":
        if (GAME.completed)
          return;
        if (GAME.level > 1) {
          if (ENGINE.GAME.keymap[ENGINE.KEY.map.tab]) {
            if (GAME.level === GAME.upperLimit) {
              const note = "Cave in. Upper floor inaccessible.";
              const point = GRID.gridToCoord(
                MAP[GAME.level].DUNGEON.entrance.add(UP)
                );
              TEXTPOOL.pool.push(new TextSprite(note, point));
            } else {
              HERO.usingStairs(-1);
              AUDIO.UpStairs.play();
            }
          }
        }
        break;

      case "exit":
        if (ENGINE.GAME.keymap[ENGINE.KEY.map.tab]) {
          HERO.usingStairs(1);
          AUDIO.DownStairs.play();
        }
        break;

      case "goldKey":
      case "silverKey":
        HERO[element] = true;
        MINIMAP.maps[GAME.level].map[
          GRID.gridToIndex(MAP[GAME.level].DUNGEON[element])
        ] = 1;
        MAP[GAME.level].DUNGEON[element] = null;
        GAME.PAINT.config();
        HERO.incExp(keyExp);
        HERO.inventory.add(SPRITE[element]);
        TITLE.change();
        AUDIO.Keys.play();
        TEXTPOOL.pool.push(
          new TextSprite(
            (keyExp + "XP").toString(),
            GRID.gridToCoord(this.MoveState.homeGrid),
            "#00FF00",
            100
            )
          );
        break;

      case "temple":
        if (HERO.canEnterTemple)
          GAME.visitTemple();
        break;
    }

    function check(instance) {
      let hit = GRID.collision(HERO, MAP[GAME.level].DUNGEON[instance]);
      if (hit) {
        return instance;
      } else
        return null;
    }
    function getKeyExp() {
      let exp = INI.EXP_KEY;
      for (let i = 1; i <= GAME.level - 1; i++) {
        exp *= INI.EXP_FACTOR;
      }
      return round10(exp);
    }
  },
  useManaPotion: function () {
    if (HERO.mana === HERO.maxMana)
      return;
    if (HERO.bluePotion > 0) {
      HERO.bluePotion--;
      HERO.incMana();
      AUDIO.Swallow.play();
    }
  },
  useHealingPotion: function () {
    if (HERO.health === HERO.maxHealth)
      return 0;
    if (HERO.redPotion > 0) {
      HERO.redPotion--;
      AUDIO.Swallow.play();
      return HERO.heal();
    }
  },
  heal: function () {
    if (HERO.dead)
      return;
    let addHealth = Math.round(INI.Health_INC * HERO.maxHealth);
    let realHealing = Math.min(addHealth, HERO.maxHealth - HERO.health);
    HERO.health += addHealth;
    let above = GRID.gridToCoord(HERO.MoveState.homeGrid.add(UP)).add(
      new Vector(0, 24)
      );
    TEXTPOOL.pool.push(
      new TextSprite(("+" + addHealth).toString(), above, "#DD0000", 50)
      );
    HERO.health = Math.min(HERO.health, HERO.maxHealth);
    TITLE.change();
    return realHealing;
  },
  incMana: function () {
    let above = GRID.gridToCoord(HERO.MoveState.homeGrid.add(UP)).add(
      new Vector(0, 24)
      );
    let addMana = Math.round(INI.Health_INC * HERO.maxMana);
    HERO.mana += addMana;
    TEXTPOOL.pool.push(
      new TextSprite(("+" + addMana).toString(), above, "#0000EE", 50)
      );
    HERO.mana = Math.min(HERO.mana, HERO.maxMana);
    TITLE.change();
  },
  decMana: function (dec) {
    HERO.mana -= dec;
    if (HERO.mana <= 0)
      HERO.mana = 0;
    TITLE.change();
  },
  updView: function () {
    ENGINE.VIEWPORT.changed = true;
    TITLE.change();
    let x = HERO.MoveState.endGrid.x - 1;
    let y = HERO.MoveState.endGrid.y - 1;
    let left = x * ENGINE.INI.GRIDPIX;
    let top = y * ENGINE.INI.GRIDPIX;
    ENGINE.cutManyGrids(LAYER.fog, new Point(left, top), 3);
    for (let q = x; q < x + 3; q++) {
      for (let w = y; w < y + 3; w++) {
        let temp = new Grid(q, w);
        MINIMAP.maps[GAME.level].map[GRID.gridToIndex(temp)] &= 127;
        MINIMAP.maps[GAME.level].map[GRID.gridToIndex(temp)] |= 64; //set fog info
      }
    }
    if (HERO.visibility !== 2)
      return;

    for (let q = 0; q < ENGINE.directions.length; q++) {
      let test = HERO.MoveState.endGrid.add(ENGINE.directions[q]);
      if (!GRID.gridIsBlock(test)) {
        test = test.add(ENGINE.directions[q]);
        ENGINE.cutGrid(LAYER.fog, GRID.gridToCoord(test));
        MINIMAP.maps[GAME.level].map[GRID.gridToIndex(test)] &= 127;
        MINIMAP.maps[GAME.level].map[GRID.gridToIndex(test)] |= 64; //set fog info
      }
    }
    var vectors = [new Vector(1, 1), new Vector(1, 0), new Vector(0, 1)];
    for (let q = 0; q < ENGINE.corners.length; q++) {
      let test = HERO.MoveState.endGrid.add(ENGINE.corners[q]);
      if (!GRID.gridIsBlock(test)) {
        for (let w = 0; w < vectors.length; w++) {
          let tVector = ENGINE.corners[q].mul(vectors[w]);
          let lightGrid = HERO.MoveState.endGrid.add(tVector);
          ENGINE.cutGrid(LAYER.fog, GRID.gridToCoord(lightGrid));
          MINIMAP.maps[GAME.level].map[GRID.gridToIndex(lightGrid)] &= 127;
          MINIMAP.maps[GAME.level].map[GRID.gridToIndex(lightGrid)] |= 64; //set fog info
        }
      }
    }
  },
  manage: function () {
    HERO.move();
    HERO.interactLists();
    HERO.interactStatic();
    HERO.collisionEnemy();
  },
  incExp: function (exp) {
    HERO.experience += exp;
    HERO.expBuffer += exp;
    if (HERO.expBuffer >= GAME.EXP) {
      HERO.expBuffer -= GAME.EXP;
      HERO.canLevelUp = true;
      GAME.EXP *= INI.EXP_FACTOR;
      GAME.EXP = Math.round(GAME.EXP);
      AUDIO.LevelUp.play();
    }
  },
  castMagic: function () {
    const dir = HERO.MoveState.dir;
    const cost = HERO.magic + INI.MAGIC_POWER_COST;
    if (cost > HERO.mana) {
      AUDIO.MagicFail.play();
      return;
    }
    if (success() && dir !== null) {
      const power = setPower();
      HERO.mana -= cost;
      TITLE.change();
      AUDIO.MagicCast.play();
      ORBS.pool.push(
        new Orb(HERO.MoveState.homeGrid, dir, power, HERO.magic, "friendly")
        );
    } else {
      HERO.decMana(1);
      AUDIO.MagicFail.play();
      EXPLOSIONS.pool.push(
        new AnimationSPRITE(HERO.actor.x, HERO.actor.y, "Fizzle_", 10)
        );
    }

    function success() {
      let prop = Math.round((HERO.magic / (HERO.magic + INI.MAGIC_FAIL)) * 100);
      return probable(prop);
    }
    function setPower() {
      const magic = HERO.magic + HERO.magicBoost;
      let bottom = Math.round(magic * 0.8);
      if (bottom === 0)
        bottom = 1;
      const power = RND(bottom, Math.round(magic * 1.2));
      return power;
    }
  },
  collisionEnemy: function () {
    let POOL = MAP[GAME.level].DUNGEON.ENEMY;
    for (let PL = POOL.length, q = PL - 1; q >= 0; q--) {
      let enemy = POOL[q];
      if (!enemy.visible)
        continue;
      let hitShape = ENGINE.collision(HERO.actor, enemy.actor);
      if (hitShape) {
        GAME.fight(enemy, true, q);
        break;
      }
    }
  },
  turn: function (enemy) {
    if (!GAME.TURN.fight_active)
      return;
    let damage = GAME.TURN.damage(HERO, enemy);
    if (damage > 0) {
      CONSOLE.print(
        `<span class="blue">${HERO.name}</span> hits and makes <span class="orange">${damage}</span> damage.`
        );
      enemy.health -= damage;
      if (enemy.health <= 0) {
        enemy.prepareForDeath();
        enemy.die();
      }
      enemy.health = Math.max(0, enemy.health);
      GAME.fightRefresh(enemy);
    } else {
      CONSOLE.print(`<span class="blue">${HERO.name}</span> misses.`);
    }
    return damage;
  },
  death: function () {
    console.log(`%cHERO died`, PRG.CSS);
    AUDIO.Death.play();
    HERO.dead = true;
    HERO.dark = true;
    ENGINE.spriteDraw("grave", HERO.actor.vx, HERO.actor.vy, SPRITE.Grave);
    ENGINE.TIMERS.stop();
    ENGINE.TEXT.setFS(60);
    ENGINE.TEXT.centeredText("THE END", 300);
    ENGINE.GAME.ANIMATION.next(GAME.postMortem);
    GAME.over();
  },
  usingStairs: function (delta) {
    GAME.prepareLevel = GAME.level + delta;
    if (GAME.prepareLevel === INI.LAST_LEVEL)
      GAME.completed = true;
    switch (delta) {
      case 1:
        GAME.location = "entrance";
        HERO.maxDepth = Math.max(HERO.maxDepth, GAME.prepareLevel);
        //save game
        if (MAP[GAME.prepareLevel].returning === undefined) {
          console.log(`%cSAVING CHECKPOINT!`, "color: violet");
          GAME.checkPointSaved = true;
          SAVE_GAME.save();
        }
        const idx = ENGINE.TIMERS.index("Nemesis");
        if (idx !== -1) {
          if (ENGINE.TIMERS.STACK[idx].kwargs.level < GAME.prepareLevel) {
            ENGINE.TIMERS.remove("Nemesis");
            GAME.levelTime = null;
          }
        }
        break;
      case - 1:
        GAME.location = "exit";
        break;
    }
    console.log("GAME waiting for all processes to complete ...");
    ENGINE.GAME.ANIMATION.next(GAME.coolDown);
  },
  lucky: function () {
    HERO.addLuck += HERO.luck;
    HERO.clover = new CountDown("Luck", INI.LUCK_TIME, HERO.unlucky);
  },
  unlucky: function () {
    HERO.addLuck -= HERO.luck;
  },
  die: function () {
    console.log("HERO dies in fight");
    GAME.TURN.fight_active = false;
    CONSOLE.print(`<span class="blue">${HERO.name} was killed.`);
    GAME.CLICK.endFight();
    HERO.dead = true;
  }
};
class Orb {
  constructor(grid, dir, power, range, type) {
    this.grid = Grid.toClass(grid);
    this.type = type;
    this.power = power;
    this.speed = 16;
    this.range = Math.min(range, INI.ORB_MAX_RANGE);
    let id;
    if (type === "friendly") {
      id = "MagicOrb";
    } else
      id = "RedMagic";
    this.actor = new ACTOR(id, 0, 0, "linear", ASSET[id]);
    GRID.gridToSprite(this.grid, this.actor);
    this.alignToViewport();
    this.MoveState = new MoveState(this.grid, dir);
    this.MoveState.next(dir);
  }
  alignToViewport() {
    ENGINE.VIEWPORT.alignTo(this.actor);
  }
  draw() {
    ENGINE.spriteDraw(
      "orbs",
      this.actor.vx,
      this.actor.vy,
      this.actor.sprite()
      );
  }
  fizzle() {
    EXPLOSIONS.pool.push(
      new AnimationSPRITE(this.actor.x, this.actor.y, "Fizzle_", 10)
      );
  }
}
var ORBS = {
  pool: [],
  draw: function () {
    let OPL = ORBS.pool.length;
    if (OPL === 0)
      return;
    ENGINE.layersToClear.add("orbs");
    for (let q = OPL - 1; q >= 0; q--) {
      ORBS.pool[q].draw();
    }
  },
  manage: function () {
    ORBS.move();
    ORBS.collide();
  },
  move: function () {
    let OPL = ORBS.pool.length;
    if (OPL === 0)
      return;
    for (let q = OPL - 1; q >= 0; q--) {
      let orb = ORBS.pool[q];
      if (orb.range <= 0) {
        orb.fizzle();
        ORBS.pool.splice(q, 1);
        continue;
      }
      if (orb.MoveState.moving) {
        GRID.translateMove(orb);
      } else {
        orb.MoveState.next(orb.MoveState.dir);
        orb.range--;
      }
    }
  },
  collide: function () {
    //to background
    let OPL = ORBS.pool.length;
    if (OPL === 0)
      return;
    for (let q = OPL - 1; q >= 0; q--) {
      let orb = ORBS.pool[q];
      if (GRID.gridIsBlock(orb.MoveState.homeGrid)) {
        EXPLOSIONS.pool.push(
          new AnimationSPRITE(orb.actor.x, orb.actor.y, "ShipExp", 8)
          );
        ORBS.pool.splice(q, 1);
        AUDIO.Explosion.play();
        continue; //next orb
      }
    }

    //to enemy
    OPL = ORBS.pool.length;
    if (OPL === 0)
      return;
    for (let q = OPL - 1; q >= 0; q--) {
      let orb = ORBS.pool[q];
      if (orb.type === "friendly") {
        let ENML = MAP[GAME.level].DUNGEON.ENEMY.length;
        for (let w = ENML - 1; w >= 0; w--) {
          let enemy = MAP[GAME.level].DUNGEON.ENEMY[w];
          let hit = ENGINE.collision(orb.actor, enemy.actor);
          if (hit) {
            HERO.magicExpBuffer++;
            if (HERO.magicExpBuffer >= GAME.MAGIC_EXP) {
              HERO.magicExpBuffer -= GAME.MAGIC_EXP;
              GAME.MAGIC_EXP *= INI.MAGIC_EXP_FACTOR;
              GAME.MAGIC_EXP = round10(GAME.MAGIC_EXP);
              HERO.maxMana += INI.LVL_MANA;
              HERO.magic++;
              AUDIO.LevelUp.play();
              TITLE.change();
            }
            let damage = orb.power - enemy.magicResistance;
            damage = Math.max(damage, 0);
            enemy.health -= damage;
            let above = GRID.gridToCoord(enemy.MoveState.homeGrid.add(UP)).add(
              new Vector(0, 24)
              );
            if (damage === 0) {
              TEXTPOOL.pool.push(
                new TextSprite("Resisted".toString(), above, "#AAA", 50)
                );
              EXPLOSIONS.pool.push(
                new AnimationSPRITE(orb.actor.x, orb.actor.y, "Fizzle_", 10)
                );
            } else if (enemy.health > 0) {
              TEXTPOOL.pool.push(
                new TextSprite(("-" + damage).toString(), above, "#FF0000", 50)
                );
              EXPLOSIONS.pool.push(
                new AnimationSPRITE(orb.actor.x, orb.actor.y, "AlienExp", 6)
                );
            } else {
              EXPLOSIONS.pool.push(
                new AnimationSPRITE(orb.actor.x, orb.actor.y, "ShipExp", 8)
                );
              if (LOG[enemy.title] === undefined) {
                LOG[enemy.title] = new Log();
              }
              LOG[enemy.title].magicKills++;
              enemy.die();
              MAP[GAME.level].DUNGEON.ENEMY.splice(w, 1);
            }
            ORBS.pool.splice(q, 1);
            AUDIO.Explosion.play();
            break;
          }
        }
      }
    }

    //to HERO
    OPL = ORBS.pool.length;
    if (OPL === 0)
      return;
    for (let q = OPL - 1; q >= 0; q--) {
      let orb = ORBS.pool[q];
      if (orb.type !== "friendly") {
        let hit = ENGINE.collision(orb.actor, HERO.actor);
        if (hit) {
          let resistance = Math.floor((HERO.magic + HERO.magicBoost) / 3);
          let damage = orb.power - resistance;
          damage = Math.max(damage, 0);
          HERO.health -= damage;
          HERO.health = Math.max(HERO.health, 0);
          TITLE.change();
          let above = GRID.gridToCoord(HERO.MoveState.homeGrid.add(UP)).add(
            new Vector(0, 22)
            );
          if (damage === 0) {
            TEXTPOOL.pool.push(
              new TextSprite("Resisted".toString(), above, "#AAA", 50)
              );
            EXPLOSIONS.pool.push(
              new AnimationSPRITE(orb.actor.x, orb.actor.y, "Fizzle_", 10)
              );
          } else if (HERO.health > 0) {
            TEXTPOOL.pool.push(
              new TextSprite(("-" + damage).toString(), above, "#FF0022", 50)
              );
            EXPLOSIONS.pool.push(
              new AnimationSPRITE(orb.actor.x, orb.actor.y, "AlienExp", 6)
              );
          } else {
            EXPLOSIONS.pool.push(
              new AnimationSPRITE(orb.actor.x, orb.actor.y, "ShipExp", 8)
              );
            console.log("HERO died from Orb collision");
            HERO.death();
          }
          ORBS.pool.splice(q, 1);
          AUDIO.Explosion.play();
        }
      }
    }
  }
};
var ENEMY = {
  draw: function () {
    let POOL = MAP[GAME.level].DUNGEON.ENEMY;
    for (let q = 0, PL = POOL.length; q < PL; q++) {
      let enemy = POOL[q];
      ENGINE.VIEWPORT.alignTo(enemy.actor);
      if (enemy.visible || DEBUG.viewMonsters) {
        ENGINE.spriteDraw(
          "actors",
          enemy.actor.vx,
          enemy.actor.vy,
          enemy.actor.sprite()
          );
      }
      ENGINE.layersToClear.add("actors");
    }
  },
  manage: function () {
    let POOL = MAP[GAME.level].DUNGEON.ENEMY;
    GRID.calcDistancesBFS_A(HERO.MoveState.homeGrid, MAP[GAME.level].DUNGEON);
    const nodeMap = MAP[GAME.level].DUNGEON.nodeMap;
    for (let PL = POOL.length, q = PL - 1; q >= 0; q--) {
      let enemy = POOL[q];
      if (enemy.petrified)
        continue;
      let distance = HERO.MoveState.endGrid.distanceDiagonal(
        enemy.MoveState.endGrid
        );
      if (enemy.MoveState.moving) {
        if (checkFreedom(q))
          GRID.translateMove(enemy);
        if (distance <= INI.TRIGGER_VISION)
          enemy.visible = enemy.isVisible();
        continue;
      }
      let path = [];
      let gDist = MAP[GAME.level].DUNGEON.gridDistance(enemy.MoveState.endGrid);
      if (enemy.awake) {
        if (distance > INI.TRIGGER_WAKE && enemy.strategy !== "hunt") {
          enemy.sleep();
          continue;
        }
        if (gDist > INI.TRIGGER_WAKE && enemy.strategy !== "hunt") {
          enemy.sleep();
          continue;
        }
        if (distance <= INI.TRIGGER_VISION)
          enemy.visible = enemy.isVisible();
        if (!HERO.dark && enemy.magic > 0) {
          const cost = enemy.magic + INI.MAGIC_POWER_COST;
          if (cost <= enemy.mana && distance <= enemy.magic) {
            if (
              distance <= INI.STALK_DISTANCE &&
              enemy.visible &&
              !enemy.canShoot
              ) {
              enemy.strategy = "stalk";
            } else
              enemy.strategy = "hunt";
            if (enemy.canShoot) {
              let direction = enemy.MoveState.endGrid.absDirection(
                HERO.MoveState.endGrid
                );
              if (direction.isOrto() || direction.isDiagonal()) {
                if (
                  GRID.vision(enemy.MoveState.endGrid, HERO.MoveState.endGrid)
                  ) {
                  enemy.mana -= cost;
                  ORBS.pool.push(
                    new Orb(
                      enemy.MoveState.homeGrid,
                      direction,
                      setPower(enemy),
                      enemy.magic,
                      "deadly"
                      )
                    );
                  enemy.casted();
                  continue;
                }
              }
            }
          } else {
            enemy.strategy = "hunt";
          }
        }
        if (enemy.dirStack.length > 0) {
          if (!HERO.dark && distance <= enemy.type.triggers.hunt) {
            enemy.strategy = "hunt";
            enemy.dirStack.clear();
            continue;
          } else {
            enemy.makeMove();
            continue;
          }
        } else {
          switch (enemy.strategy) {
            case "wander":
              if (!HERO.dark && distance <= enemy.type.triggers.hunt) {
                enemy.strategy = "hunt";
                break;
              }
              path = GRID.AI.wanderer.hunt(
                enemy.MoveState,
                MAP[GAME.level].DUNGEON.obstacles
                ).return;
              break;

            case "hunt":
              if (HERO.dark || distance >= enemy.type.triggers.wander) {
                enemy.strategy = "wander";
                break;
              }
              if (gDist === 0) {
                GAME.fight(enemy, false, q);
                continue;
              } else {
                path = [
                  MAP[GAME.level].DUNGEON.nextDirToGoal(enemy.MoveState.endGrid)
                ];
              }
              break;

            case "stalk":
              path = GRID.AI.keepTheDistance.hunt(
                enemy.MoveState,
                HERO.MoveState.endGrid,
                INI.STALK_DISTANCE
                ).return;
              break;

            case "goto":
              let node = GRID.findPath(
                enemy.MoveState.endGrid,
                enemy.guarding,
                MAP[GAME.level].DUNGEON
                );
              if (node === null) {
                enemy.strategy = "guard";
                break;
              }
              path = node.stack.slice(0, -1);
              if (path.length === 0)
                enemy.strategy = "guard";
              break;

            case "guard":
              path = GRID.AI.circle.hunt(enemy.MoveState, enemy.guarding)
                .return;
              break;

            default:
              console.log("%cmonster strategy ERROR!", "color: #F00");
              break;
          }
          if (path && path.length > 0) {
            enemy.dirStack = path;
            enemy.makeMove();
            continue;
          } else {
            continue;
          }
        }
      } else {
        if (distance <= INI.TRIGGER_WAKE) {
          if (gDist <= INI.TRIGGER_WAKE) {
            enemy.wake();
          }
        }
        continue;
      }
    }

    function checkFreedom(q) {
      for (let W = 0; W < q; W++) {
        if (MAP[GAME.level].DUNGEON.ENEMY[W].awake) {
          if (
            GRID.same(
              MAP[GAME.level].DUNGEON.ENEMY[q].MoveState.endGrid,
              MAP[GAME.level].DUNGEON.ENEMY[W].MoveState.endGrid
              )
            )
            return false;
        }
      }
      return true;
    }
    function setPower(enemy) {
      let bottom = Math.round(enemy.magic * 0.8);
      if (bottom === 0)
        bottom = 1;
      const power = RND(bottom, Math.round(enemy.magic * 1.2));
      return power;
    }
  }
};
var GAME = {
  CSS: "color: #0F0",
  abort: function () {
    ENGINE.GAME.stopAnimation = true;
    console.error("..... aborting GAME, DEBUG info:");
  },
  start: function () {
    console.log(`%c****************** GAME.start ******************`, GAME.CSS);
    $("#pause").prop("disabled", false);
    GAME.checkPointSaved = false;
    GAME.checkPointLoaded = false;
    GAME.upperLimit = 1;
    GAME.restarted = true;
    GAME.DISTANCE_WAKE = Math.floor(2 * Math.sqrt(INI.TRIGGER_WAKE ** 2 / 2));
    ENGINE.GAME.start(); //INIT game loop
    ENGINE.KEY.on(); // keymapping active
    CreateDungeon.init();
    GAME.prepareForRestart(); //everything required for safe restart
    GAME.level = 1;
    GAME.prepareLevel = 1;
    GAME.location = "entrance";
    ENGINE.INI.ANIMATION_INTERVAL = 16;
    HERO.construct();
    ENGINE.GAME.ANIMATION.waitThen(GAME.levelStart, 2);
    GAME.EXP = INI.EXP;
    GAME.MAGIC_EXP = INI.MAGIC_EXP;
    GAME.time = new Timer("Main");
    GAME.winningTime = null;
    GAME.levelTime = null;
    GAME.completed = false;
    //SG pointers
    SAVE_GAME.pointers = [
      "HERO.name",
      "HERO.gold",
      "HERO.redPotion",
      "HERO.bluePotion",
      "HERO.maxHealth",
      "HERO.health",
      "HERO.maxMana",
      "HERO.mana",
      "HERO.armor",
      "HERO.weapon",
      "HERO.magic",
      "HERO.agility",
      "HERO.silverKey",
      "HERO.goldKey",
      "HERO.maxDepth",
      "HERO.level",
      "HERO.experience",
      "HERO.expBuffer",
      "HERO.magicExpBuffer",
      "GAME.EXP",
      "GAME.MAGIC_EXP",
      "GAME.prepareLevel"
    ];
    SAVE_GAME.lists = ["HERO.scrolls"];
    SAVE_GAME.timers = ["Main"];
    SAVE_GAME.objects = [{obj: "LOG", class: "Log"}];

    if (GAME.fromCheckpoint) {
      console.log(`%c ... Loading from checkpoint ...`, GAME.CSS);
      SAVE_GAME.load();
      GAME.checkPointLoaded = true;
      GAME.upperLimit = GAME.prepareLevel;
      GAME.discardMaps();
    }
    GAME.level = GAME.prepareLevel;
  },
  prepareForRestart: function () {
    console.log("preparing game for start or safe restart ...");
    //everything required for safe restart
    ENGINE.GAME.ANIMATION.stop();
    ENGINE.clearLayer("text");
    ENGINE.clearLayer("animation");
    ENGINE.clearLayer("grave");
    ENGINE.clearLayer("actors");
    ENGINE.clearLayer("bottomText");
    ENGINE.clearLayer("button");
    ENGINE.clearLayer("click");
  },
  coolDown: function () {
    ENGINE.GAME.ANIMATION.stop();
    console.log("%c ...all processes completed", PRG.CSS);
    GAME.nextLevel();
  },
  spawnNemesis: function () {
    CreateDungeon.spawnNemesis(this.kwargs.level, this.kwargs.origin);
    AUDIO.EvilLaughter.play();
    MAP[GAME.level].nemesisSpawned++;
    let level = Math.min(
      INI.LAST_LEVEL,
      GAME.level + MAP[GAME.level].nemesisSpawned
      );
    GAME.levelTime = new CountDown(
      "Nemesis",
      INI.NEMESIS_RESPAWN,
      GAME.spawnNemesis,
      {level: level, origin: GAME.level}
    );
  },
  levelExecute: function () {
    console.log(`%cLevel ${GAME.level} executes ...`, GAME.CSS);
    ENGINE.VIEWPORT.reset();
    HERO.init();
    EXPLOSIONS.pool.clear();
    GAME.firstFrameDraw(GAME.level);
    if (GAME.checkPointSaved) {
      GAME.checkPointSaved = false;
      const note = "CHECKPOINT SAVED!";
      const point = GRID.gridToCoord(MAP[GAME.level].DUNGEON.entrance.add(UP));
      TEXTPOOL.pool.push(new TextSprite(note, point, "yellow", 150));
    }
    if (GAME.checkPointLoaded) {
      GAME.checkPointLoaded = false;
      const note = "LOADED FROM CHECKPOINT";
      const point = GRID.gridToCoord(MAP[GAME.level].DUNGEON.entrance.add(UP));
      TEXTPOOL.pool.push(new TextSprite(note, point, "yellow", 150));
    }
    if (GAME.levelTime === null) {
      GAME.levelTime = new CountDown(
        "Nemesis",
        INI.NEMESIS_RESPAWN,
        GAME.spawnNemesis,
        {level: GAME.level, origin: GAME.level}
      );
    }
    if (HERO.level === 0) {
      GAME.levelUp(INI.POINTS_ON_START);
    } else
      GAME.levelContinue();
  },
  levelContinue: function () {
    console.log("LEVEL", GAME.level, "continues ...");
    if (GAME.completed) {
      console.log("GAME has been won");
      GAME.winningTime = GAME.time.timeString();
      ENGINE.TIMERS.clear();
      ENGINE.GAME.ANIMATION.next(GAME.overLoop);
      GAME.won();
    } else if (!HERO.dead) {
      ENGINE.GAME.ANIMATION.next(GAME.run);
    } else
      HERO.death();
    ENGINE.hideMouse();
  },
  levelStart: function () {
    console.log(`%cStarting level ${GAME.level}`, GAME.CSS);
    GAME.initLevel(GAME.level);
    GAME.levelExecute();
  },
  nextLevel: function () {
    GAME.level = GAME.prepareLevel;
    console.log("creating next level: ", GAME.level);
    if (GAME.level > INI.LAST_LEVEL) {
      console.log("Game have been won or last level has been played.");
      //add end game stuff
    } else {
      console.log("Starting next level:", GAME.level);
      ENGINE.GAME.ANIMATION.waitThen(GAME.levelStart, 2);
    }
  },
  initLevel: function (level) {
    if (!MAP[level].dungeonExist) {
      if (!MAP[level].fixed) {
        CreateDungeon.create(level);
      } else {
        CreateDungeon.gridToDungeon(level);
      }

      MAP[level].pw = MAP[level].width * ENGINE.INI.GRIDPIX;
      MAP[level].ph = MAP[level].height * ENGINE.INI.GRIDPIX;
    } else
      MAP[level].returning = true;
    ENGINE.VIEWPORT.setMax({x: MAP[level].pw, y: MAP[level].ph});
    MINIMAP.create(level);
    MAP[level].nemesisSpawned = 0;
  },
  updateVieport: function () {
    if (!ENGINE.VIEWPORT.changed)
      return;
    // do required repaints
    ENGINE.VIEWPORT.change("floor", "background");
    ENGINE.VIEWPORT.change("config", "background");
    ENGINE.clearLayer("fogview");
    ENGINE.VIEWPORT.change("fog", "fogview");
    if (DEBUG.coord) {
      ENGINE.clearLayer("coordview");
      ENGINE.VIEWPORT.change("coord", "coordview");
    }
    ENGINE.VIEWPORT.changed = false;
  },
  frameDraw: function () {
    ENGINE.clearLayerStack();
    GAME.updateVieport();
    TEXTPOOL.draw("animation");
    SpritePOOL.draw("animation");
    EXPLOSIONS.draw();
    HERO.draw();
    ORBS.draw();
    TITLE.time();
    TITLE.status();
    ENEMY.draw();
  },
  postMortemFrameDraw: function () {
    ENGINE.clearLayerStack();
    GAME.updateVieport();
    EXPLOSIONS.draw();
    GAME.movingText.draw();
    ENEMY.draw();
  },
  wonFrameDraw: function () {
    ENGINE.clearLayerStack();
    GAME.updateVieport();
    GAME.movingText.draw();
    HERO.draw();
    TITLE.status();
  },
  titleFrameDraw: function () {
    GAME.movingText.draw();
  },
  firstFrameDraw: function (level) {
    ENGINE.resizeBOX("LEVEL", MAP[level].pw, MAP[level].ph);
    GRID.repaint(
      MAP[level].grid,
      TEXTURE[MAP[level].floor],
      TEXTURE[MAP[level].background]
      );
    ENGINE.flattenLayers("wall", "floor");
    GAME.PAINT.config();
    if (DEBUG.fog) {
      ENGINE.fill(LAYER.fog, TEXTURE.Fog);
      GAME.adjustFogToMap();
    }
    if (DEBUG.coord)
      GAME.PAINT.coord();
    ENGINE.VIEWPORT.changed = true;
    HERO.updView();
    GAME.updateVieport();
    TITLE.main();
    TITLE.time();
    TITLE.status();
    ENGINE.clearLayer("actors");
    ENGINE.clearLayer("explosion");
  },
  adjustFogToMap: function () {
    for (let x = 0; x < MAP[GAME.level].width; x++) {
      for (let y = 0; y < MAP[GAME.level].height; y++) {
        let grid = new Grid(x, y);
        if (MINIMAP.maps[GAME.level].map[GRID.gridToIndex(grid)] & 64) {
          ENGINE.cutGrid(LAYER.fog, GRID.gridToCoord(grid));
        }
      }
    }
  },
  run: function () {
    if (ENGINE.GAME.stopAnimation)
      return;
    GAME.respond();
    ORBS.manage();
    ENEMY.manage();
    HERO.manage();
    ENGINE.TIMERS.update();
    GAME.frameDraw();
  },
  runTitle: function () {
    if (ENGINE.GAME.stopAnimation)
      return;
    GAME.movingText.process();
    GAME.titleFrameDraw();
  },
  overLoop: function () {
    if (ENGINE.GAME.stopAnimation)
      return;
    GAME.respond();
    HERO.manage();
    GAME.movingText.process();
    GAME.wonFrameDraw();
  },
  postMortem: function () {
    if (ENGINE.GAME.stopAnimation)
      return;
    ENEMY.manage();
    GAME.movingText.process();
    GAME.postMortemFrameDraw();
  },
  respond: function () {
    //GAME.respond() template
    if (HERO.dead)
      return;
    var map = ENGINE.GAME.keymap;

    //fall throught section
    if (map[ENGINE.KEY.map.F4]) {
      $("#pause").trigger("click");
      ENGINE.TIMERS.display();
      ENGINE.GAME.keymap[ENGINE.KEY.map.F4] = false; //NO repeat
    }

    if (map[ENGINE.KEY.map.tab]) {
      if (GAME.completed)
        return;
      if (!HERO.canLevelUp)
        return;
      GAME.levelUp(INI.PTS_LVL);
      ENGINE.GAME.keymap[ENGINE.KEY.map.tab] = false; //NO repeat
    }
    if (map[ENGINE.KEY.map.A]) {
      if (GAME.completed)
        return;
      TITLE.stack.scrollIndex--;
      TITLE.stack.scrollIndex = Math.max(0, TITLE.stack.scrollIndex);
      TITLE.change();
      ENGINE.GAME.keymap[ENGINE.KEY.map.A] = false;
    }
    if (map[ENGINE.KEY.map.D]) {
      if (GAME.completed)
        return;
      TITLE.stack.scrollIndex++;
      TITLE.stack.scrollIndex = Math.min(
        HERO.scrolls.size() - 1,
        TITLE.stack.scrollIndex
        );
      TITLE.change();
      ENGINE.GAME.keymap[ENGINE.KEY.map.D] = false;
    }
    if (map[ENGINE.KEY.map.H]) {
      if (GAME.completed)
        return;
      HERO.useHealingPotion();
      ENGINE.GAME.keymap[ENGINE.KEY.map.H] = false; //NO repeat
    }
    if (map[ENGINE.KEY.map.M]) {
      if (GAME.completed)
        return;
      HERO.useManaPotion();
      ENGINE.GAME.keymap[ENGINE.KEY.map.M] = false; //NO repeat
    }
    if (map[ENGINE.KEY.map.ctrl]) {
      if (GAME.completed)
        return;
      HERO.castMagic();
      ENGINE.GAME.keymap[ENGINE.KEY.map.ctrl] = false; //NO repeat
    }
    if (map[ENGINE.KEY.map.enter]) {
      if (GAME.completed)
        return;
      if (HERO.scrolls.size() === 0)
        return;
      if (TITLE.stack.scrollIndex === -1)
        return;
      if (HERO.scrolls.info(TITLE.stack.scrollIndex, "use") === "fight")
        return;

      if (
        HERO.scrolls.info(TITLE.stack.scrollIndex, "type") ===
        "TeleportTemple" &&
        MAP[GAME.level].fixed
        )
        return;
      let scroll = HERO.scrolls.remove(TITLE.stack.scrollIndex);
      scroll.action();
      TITLE.change();
      ENGINE.GAME.keymap[ENGINE.KEY.map.enter] = false; //NO repeat
    }

    //single key section
    if (map[ENGINE.KEY.map.left]) {
      HERO.changeDirection(LEFT);
      return;
    }
    if (map[ENGINE.KEY.map.right]) {
      HERO.changeDirection(RIGHT);
      return;
    }
    if (map[ENGINE.KEY.map.up]) {
      HERO.changeDirection(UP);
      return;
    }
    if (map[ENGINE.KEY.map.down]) {
      HERO.changeDirection(DOWN);
      return;
    }
    return;
  },
  setup: function () {
    $("#pause").on("click", GAME.pause);
    const sg = localStorage.getItem(PRG.SG);
    if (sg) {
      $("#buttons").append(
        "<input type='button' id='checkpoint' value='Continue Game from CHECKPOINT'>"
        );
      $("#checkpoint").on("click", PRG.checkpoint);
    }
    console.log("%cGAME SETUP finished", PRG.CSS);
  },
  end: function () {
    console.log("%cGAME ENDED", "color: #FFF");
    console.log("");
    GAME.checkScore();
    GAME.fromCheckpoint = false;
  },
  PAINT: {
    coord: function (layer = "coord") {
      ENGINE.clearLayer(layer);
      for (let x = 0; x < MAP[GAME.level].width; x++) {
        for (let y = 0; y < MAP[GAME.level].height; y++) {
          if (!GRID.isBlock(x, y)) {
            let point = GRID.gridToCoord(new Grid(x, y));
            let text = `${x},${y}`;
            GRID.paintText(point, text, layer);
          }
        }
    }
    },
    config: function () {
      ENGINE.VIEWPORT.changed = true;
      ENGINE.clearLayer("config");
      let layer = "config";

      if (MAP[GAME.level].DUNGEON.entrance) {
        ENGINE.spriteToGrid(
          layer,
          MAP[GAME.level].DUNGEON.entrance,
          SPRITE.Entrance
          );
      }
      if (MAP[GAME.level].DUNGEON.exit) {
        ENGINE.spriteToGrid(layer, MAP[GAME.level].DUNGEON.exit, SPRITE.Exit);
      }
      if (MAP[GAME.level].DUNGEON.temple) {
        ENGINE.spriteToGrid(
          layer,
          MAP[GAME.level].DUNGEON.temple,
          SPRITE.temple
          );
      }

      if (MAP[GAME.level].DUNGEON.gate)
        ENGINE.spriteToGrid(layer, MAP[GAME.level].DUNGEON.gate, SPRITE.Gate);
      if (MAP[GAME.level].DUNGEON.door)
        ENGINE.spriteToGrid(layer, MAP[GAME.level].DUNGEON.door, SPRITE.Door);
      if (MAP[GAME.level].DUNGEON.goldKey)
        ENGINE.spriteToGrid(
          layer,
          MAP[GAME.level].DUNGEON.goldKey,
          SPRITE.goldKey
          );
      if (MAP[GAME.level].DUNGEON.silverKey)
        ENGINE.spriteToGrid(
          layer,
          MAP[GAME.level].DUNGEON.silverKey,
          SPRITE.silverKey
          );
      //paint if exists
      GAME.PAINT.gold(layer);
      GAME.PAINT.lamp(layer);
      GAME.PAINT.potion(layer);
      GAME.PAINT.boost(layer);
      GAME.PAINT.chest(layer);
      GAME.PAINT.scroll(layer);
    },
    gold: function (layer) {
      if (!MAP[GAME.level].DUNGEON.gold)
        return;
      for (let q = 0, GL = MAP[GAME.level].DUNGEON.gold.length; q < GL; q++) {
        let gold = MAP[GAME.level].DUNGEON.gold[q];
        ENGINE.spriteToGrid(layer, gold.grid, gold.sprite);
      }
    },
    lamp: function (layer) {
      if (!MAP[GAME.level].DUNGEON.lamps)
        return;
      for (let q = 0, GL = MAP[GAME.level].DUNGEON.lamps.length; q < GL; q++) {
        let lamp = MAP[GAME.level].DUNGEON.lamps[q];
        ENGINE.spriteToGrid(layer, lamp.grid, lamp.sprite);
      }
    },
    potion: function (layer) {
      if (!MAP[GAME.level].DUNGEON.potions)
        return;
      for (
        let q = 0, GL = MAP[GAME.level].DUNGEON.potions.length;
        q < GL;
        q++
        ) {
        let potion = MAP[GAME.level].DUNGEON.potions[q];
        ENGINE.spriteToGrid(layer, potion.grid, potion.sprite);
      }
    },
    boost: function (layer) {
      if (!MAP[GAME.level].DUNGEON.boosts)
        return;
      for (let q = 0, GL = MAP[GAME.level].DUNGEON.boosts.length; q < GL; q++) {
        let boost = MAP[GAME.level].DUNGEON.boosts[q];
        ENGINE.spriteToGrid(layer, boost.grid, boost.sprite);
      }
    },
    chest: function (layer) {
      if (!MAP[GAME.level].DUNGEON.chests)
        return;
      for (let q = 0, GL = MAP[GAME.level].DUNGEON.chests.length; q < GL; q++) {
        let chest = MAP[GAME.level].DUNGEON.chests[q];
        ENGINE.spriteToGrid(layer, chest.grid, chest.sprite);
      }
    },
    scroll: function (layer) {
      if (!MAP[GAME.level].DUNGEON.scrolls)
        return;
      for (
        let q = 0, GL = MAP[GAME.level].DUNGEON.scrolls.length;
        q < GL;
        q++
        ) {
        let scroll = MAP[GAME.level].DUNGEON.scrolls[q];
        ENGINE.spriteToGrid(layer, scroll.grid, scroll.sprite);
      }
    }
  },
  clickPause: function () {
    $("#pause").trigger("click");
    ENGINE.GAME.keymap[ENGINE.KEY.map.F4] = false;
  },
  pause: function () {
    console.log("%cGAME paused.", PRG.CSS);
    $("#pause").prop("value", "Resume Game [F4]");
    $("#pause").off("click", GAME.pause);
    $("#pause").on("click", GAME.resume);
    ENGINE.GAME.ANIMATION.next(
      ENGINE.KEY.waitFor.bind(null, GAME.clickPause, "F4")
      );

    ENGINE.TEXT.setFS(40);
    ENGINE.TEXT.centeredText("Game Paused", 300);
    ENGINE.TIMERS.stop();
  },
  resume: function () {
    console.log("%cGAME resumed.", PRG.CSS);
    $("#pause").prop("value", "Pause Game [F4]");
    $("#pause").off("click", GAME.resume);
    $("#pause").on("click", GAME.pause);
    ENGINE.clearLayer("text");
    ENGINE.TIMERS.start();
    GAME.levelContinue();
  },
  CLICK: {
    sacrificeGold: function () {
      HERO.gold -= 1000;
      HERO.points += 1;
      GAME.templeRefresh();
    },
    manageTemple: function () {
      GAME.CLICK.decPoint(this);
      GAME.templeRefresh();
    },
    manageCharacter: function () {
      GAME.CLICK.decPoint(this);
      GAME.heroRefresh();
    },
    decPoint: function (that) {
      HERO.points -= 1;
      let id = that.id;
      id = id.substr(id.lastIndexOf("_") + 1);
      if (id === "maxHealth") {
        HERO[id] += INI.LVL_HEALTH;
      } else if (id === "maxMana") {
        HERO[id] += INI.LVL_MANA;
      } else if (id === "magic") {
        HERO.magic++;
        HERO.maxMana += Math.floor(INI.LVL_MANA / 2);
      } else
        HERO[id]++;
    },
    endFight: function () {
      $("#form_continue").prop("disabled", false);
      $("#form_make_turn").prop("disabled", true);
      $("#form_flee").prop("disabled", true);
    },
    usePotion: function () {
      if (HERO.dead)
        return;
      let healed = HERO.useHealingPotion();
      GAME.fightRefresh();
      if (healed === 0) {
        CONSOLE.print(
          `<span class="blue">${HERO.name}</span> has full health already.`
          );
      } else {
        CONSOLE.print(`
        <span class="blue">${HERO.name}</span> heals ${healed} points.
        `);
      }
    },
    useScroll: function () {
      if (HERO.dead)
        return;
      const regex = /_([a-zA-Z]+)/;
      let type = regex.exec(this.id)[1];
      let temp = new Scroll(null, type, null);
      temp.action();
      HERO.scrolls.remove(HERO.scrolls.find("type", type));
      GAME.fightRefresh();
    }
  },
  levelUp: function (points) {
    $("#pause").prop("disabled", true);
    ENGINE.GAME.ANIMATION.stop();
    HERO.canLevelUp = false;
    let x = ENGINE.gameWIDTH / 4;
    let y = ENGINE.gameHEIGHT / 4;
    let w = ENGINE.gameWIDTH / 2 + 16;
    let h = ENGINE.gameHEIGHT / 2 - 50;
    HERO.level++;
    HERO.points = points;
    HERO.maxHealth += INI.LVL_HEALTH;
    HERO.maxMana += INI.LVL_MANA;
    const temp = character();

    function character() {
      const temp = new Form(HERO.name, x, y, w, h, FORM_WEDGE.HERO);
      FORM_WEDGE.hero();
      GAME.heroRefresh();
      return temp;
    }
  },
  visitTemple: function () {
    if (HERO.inFight)
      return;
    AUDIO.Temple.play();
    $("#pause").prop("disabled", true);
    ENGINE.GAME.ANIMATION.stop();
    let x = ENGINE.gameWIDTH / 4;
    let y = ENGINE.gameHEIGHT / 4;
    let w = ENGINE.gameWIDTH / 2 + 16;
    let h = ENGINE.gameHEIGHT / 2 + 32;
    const temp = temple();
    HERO.inTemple = true;

    function temple() {
      const temp = new Form("The Temple", x, y, w, h, FORM_WEDGE.TEMPLE);
      FORM_WEDGE.temple();
      GAME.templeRefresh();
      return temp;
    }
  },
  heroRefresh: function () {
    if (HERO.points > 0) {
      $("#form_done").prop("disabled", true);
      $(".skill").prop("disabled", false);
    } else {
      $("#form_done").prop("disabled", false);
      $(".skill").prop("disabled", true);
    }
    $("#hero_points").html(HERO.points);
    $("#hero_sword").html(HERO.weapon.toString().padStart(2, "0"));
    $("#hero_shield").html(HERO.armor.toString().padStart(2, "0"));
    $("#hero_agility").html(HERO.agility.toString().padStart(2, "0"));
    $("#hero_magic").html(HERO.magic.toString().padStart(2, "0"));
    HERO.health = HERO.maxHealth;
    HERO.mana = HERO.maxMana;
    TITLE.change();
    TITLE.status();
  },
  templeRefresh: function () {
    $("#hero_gold").html(HERO.gold);
    if (HERO.gold < 1000) {
      $("#form_sacrifice_gold").prop("disabled", true);
    } else
      $("#form_sacrifice_gold").prop("disabled", false);
    if (HERO.points === 0) {
      $(".skill").prop("disabled", true);
    } else
      $(".skill").prop("disabled", false);
    $("#hero_points").html(HERO.points);
    $("#hero_vitality").html(HERO.maxHealth.toString().padStart(2, "0"));
    $("#hero_mana").html(HERO.maxMana.toString().padStart(2, "0"));
    $("#hero_sword").html(HERO.weapon.toString().padStart(2, "0"));
    $("#hero_shield").html(HERO.armor.toString().padStart(2, "0"));
    $("#hero_agility").html(HERO.agility.toString().padStart(2, "0"));
    $("#hero_magic").html(HERO.magic.toString().padStart(2, "0"));
    HERO.health = HERO.maxHealth;
    HERO.mana = HERO.maxMana;
    TITLE.change();
    TITLE.status();
  },
  fightRefresh: function () {
    let enemy = GAME.TURN.enemy;
    $("#hero_sword").html(HERO.weapon.toString().padStart(2, "0"));
    $("#hero_shield").html(HERO.armor.toString().padStart(2, "0"));
    $("#hero_agility").html(HERO.agility.toString().padStart(2, "0"));

    if (LOG[enemy.title].kills >= 1) {
      $("#enemy_agility").html(enemy.agility.toString().padStart(2, "0"));
    } else
      $("#enemy_agility").html("??");
    if (LOG[enemy.title].kills >= 2) {
      $("#enemy_armor").html(enemy.armor.toString().padStart(2, "0"));
    } else
      $("#enemy_armor").html("??");
    if (LOG[enemy.title].kills >= 3) {
      $("#enemy_weapon").html(enemy.weapon.toString().padStart(2, "0"));
    } else
      $("#enemy_weapon").html("??");

    ENGINE.clearLayer("hero_health");
    ENGINE.clearLayer("enemy_health");
    ENGINE.statusBar(
      LAYER.hero_health,
      0,
      0,
      INI.FIGHT_PANEL_WIDTH / 2 - 10,
      20,
      HERO.health,
      HERO.maxHealth,
      "red"
      );
    ENGINE.statusBar(
      LAYER.enemy_health,
      0,
      0,
      INI.FIGHT_PANEL_WIDTH / 2 - 10,
      20,
      enemy.health,
      enemy.maxHealth,
      "orange"
      );

    $("#count_redPotion").html(HERO.redPotion.toString().padStart(2, "0"));

    if (HERO.redPotion > 0) {
      $("#redPotion").prop("disabled", false);
    } else {
      $("#redPotion").prop("disabled", true);
      //delete if none
      $("#redPotion").remove();
      $("#count_redPotion").remove();
    }

    scrollPanel();
    TITLE.forceChange();
    return;

    function scrollPanel() {
      let scrolls = [
        "BoostWeapon",
        "BoostArmor",
        "DestroyWeapon",
        "DestroyArmor",
        "HalfLife"
      ];
      scrolls.forEach((scroll) => {
        let count = HERO.scrolls.getCount("type", scroll);
        $(`#count_${scroll}`).html(count.toString().padStart(2, "0"));
        if (count === 0) {
          $(`#SCR_${scroll}`).prop("disabled", true);
          $(`#SCR_${scroll}`).remove();
          $(`#count_${scroll}`).remove();
        } else
          $(`#SCR_${scroll}`).prop("disabled", false);
      });
    }
  },
  leaveTemple: function () {
    HERO.inTemple = false;
    $("#pause").prop("disabled", false);
    HERO.canEnterTemple = false;
    $("#FORM").remove();
    HERO.templeTimer = new CountDown(
      "Temple",
      INI.TEMPLE_TIMEOUT,
      GAME.allowInTemple
      );
    GAME.levelContinue();
  },
  allowInTemple: function () {
    HERO.canEnterTemple = true;
  },
  endFight: function () {
    console.log("fight ends ...");
    $("#pause").prop("disabled", false);
    $("#FORM").remove();
    HERO.inFight = false;
    GAME.TURN.fight_active = false;
    HERO.weapon = GAME.TURN.HERO_weapon;
    HERO.armor = GAME.TURN.HERO_armor;
    GAME.levelContinue();
  },
  fleeFight: function () {
    let enemy = GAME.TURN.enemy;
    CONSOLE.print(`<span class="blue">${HERO.name}</span> tries to flee ...`);
    let delta = HERO.agility - enemy.agility;
    const top = 2 * INI.FLEE_AGILITY_DELTA;
    let chance;
    if (delta > top) {
      chance = top;
    } else {
      chance = RND(-top + delta, top);
    }
    let selectedDir = safeSpot();
    if (
      chance > 0 &&
      GAME.TURN.agility_accumulator > INI.AGILITY_TURN * -1 &&
      selectedDir !== null
      ) {
      CONSOLE.print(` ... and succeeds.`);
      HERO.MoveState.dir = selectedDir;
      GRID.blockMove(HERO, true);
      HERO.updView();
      GAME.CLICK.endFight();
    } else {
      CONSOLE.print(` ... and fails ...`);
      GAME.TURN.agility_accumulator += chance;
      enemy.turn();
      GAME.fightRefresh();
    }

    function safeSpot() {
      let obstacles = MAP[GAME.level].DUNGEON.obstacles.clone();
      obstacles.push(enemy.MoveState.homeGrid);
      let dirs = GRID.getDirections(HERO.MoveState.startGrid, obstacles);
      if (dirs.length === 0)
        return null;
      let selectedDir;
      let enemyDirIndex = enemy.MoveState.dir.isInAt(dirs);
      if (enemyDirIndex >= 0) {
        selectedDir = dirs[enemyDirIndex];
      } else {
        selectedDir = dirs.chooseRandom();
      }
      return selectedDir;
    }
  },
  charDone: function () {
    console.log("levelUp done");
    $("#pause").prop("disabled", false);
    $("#FORM").remove();
    GAME.levelContinue();
  },
  fight: function (enemy, initiative, index) {
    if (HERO.inTemple)
      return;
    if (HERO.inFight)
      return;
    if (HERO.dead)
      return;
    AUDIO.Fight.play();
    $("#pause").prop("disabled", true);
    if (!HERO.MoveState.moving)
      initiative = false;
    if (initiative) {
      initiative = 1;
    } else
      initiative = 0;
    HERO.inFight = true;
    ENGINE.GAME.ANIMATION.stop();
    let x = ENGINE.gameWIDTH / 4;
    let y = ENGINE.gameHEIGHT / 4 - 60;
    let w = ENGINE.gameWIDTH / 2 + 16;
    let h = ENGINE.gameHEIGHT / 2 + 32 + 168;
    INI.FIGHT_PANEL_WIDTH = w;
    GAME.TURN.enemy = enemy;
    kills();
    fight(enemy);
    CONSOLE.set("Console");
    GAME.TURN.agility_accumulator = 0;
    GAME.TURN.counter = 1;
    GAME.TURN.HERO_weapon = HERO.weapon;
    GAME.TURN.HERO_armor = HERO.armor;
    GAME.TURN.fight_active = true;
    GAME.TURN.enemyIndex = index;
    GAME.TURN.enemyDamage = 0;
    GAME.TURN.heroDamage = 0;

    let delta = HERO.agility - enemy.agility;
    if (delta + initiative * INI.INITIATIVE_BONUS >= 0) {
      CONSOLE.print(
        `<span class="blue">${HERO.name}</span> attacks <span class="red">${enemy.title}</span>.`
        );
    } else {
      CONSOLE.print(
        `<span class="red">${enemy.title}</span> attacks <span class="blue">${HERO.name}</span>.`
        );
      enemy.turn(enemy);
    }
    GAME.fightRefresh();
    return;

    function fight(enemy) {
      const temp = new Form("Fight!", x, y, w, h, FORM_WEDGE.FIGHT);
      FORM_WEDGE.fight(enemy);
      GAME.fightRefresh();
      return temp;
    }
    function kills() {
      if (LOG[enemy.title] === undefined) {
        LOG[enemy.title] = new Log();
      }
      return LOG[enemy.title].kills;
    }
  },
  turn: function () {
    if (!GAME.TURN.fight_active)
      return;
    GAME.TURN.setQuickResolve();
    let enemy = GAME.TURN.enemy;
    GAME.TURN.counter++;

    let delta = Math.min(HERO.agility - enemy.agility, INI.MAX_AGILITY_DELTA);
    if (delta < 0) {
      delta = Math.max(delta, INI.HERO_MAX_AGILITY_DELTA);
    }
    GAME.TURN.agility_accumulator += delta;
    let heroDamage = 0;
    let enemyDamage = 0;

    if (GAME.TURN.agility_accumulator > INI.AGILITY_TURN * -1) {
      enemyDamage = HERO.turn(enemy);
    } else {
      GAME.TURN.agility_accumulator += INI.AGILITY_TURN;
      CONSOLE.print(
        `<span class="blue">${HERO.name}</span> fell behind and missed turn.`
        );
    }
    if (!GAME.TURN.fight_active)
      return;
    if (GAME.TURN.agility_accumulator < INI.AGILITY_TURN) {
      heroDamage = enemy.turn();
    } else {
      GAME.TURN.agility_accumulator -= INI.AGILITY_TURN;
      CONSOLE.print(
        `<span class="red">${enemy.title}</span> fell behind and missed turn.`
        );
    }

    GAME.TURN.enemyDamage += Math.max(enemyDamage, 0);
    GAME.TURN.heroDamage += Math.max(heroDamage, 0);

    if (
      GAME.TURN.counter > 100 &&
      GAME.TURN.quickResolve &&
      GAME.TURN.slowFight()
      ) {
      let HeroTurnsToDie = Math.round(HERO.health / GAME.TURN.enemyKillSpeed());
      let enemyTurnsToDie = Math.round(
        enemy.health / GAME.TURN.heroKillSpeed()
        );

      CONSOLE.print("...");
      CONSOLE.print("...... and the battle goes on and on ....");
      CONSOLE.print("...... and the battle goes on and on ....");
      CONSOLE.print("...");

      if (HeroTurnsToDie < enemyTurnsToDie) {
        CONSOLE.print(
          `After long and hard battle, <span class="blue">${HERO.name}</span> fell down exhausted and defeated.`
          );
        let monsterHealthDecrease = Math.floor(
          enemyTurnsToDie * GAME.TURN.heroKillSpeed()
          );
        enemy.health -= monsterHealthDecrease;
        enemy.health = Math.max(enemy.health, 1);
        HERO.health = 0;
        HERO.die();
      } else {
        CONSOLE.print(
          `<span class="red">${enemy.title}</span> is too tired to block <span class="blue">${HERO.name}</span>'s attacks. <span class="blue">${HERO.name}</span> chops its head off.`
          );
        let healthDecrease = Math.floor(
          HeroTurnsToDie * GAME.TURN.enemyKillSpeed()
          );
        HERO.health -= healthDecrease;
        HERO.health = Math.max(HERO.health, 1);
        enemy.health = 0;
        enemy.prepareForDeath();
        enemy.die();
      }
      GAME.fightRefresh(enemy);
      TITLE.forceChange();
      return;
    }

    GAME.fightRefresh(enemy);
    TITLE.forceChange();
    if (GAME.TURN.fight_active && GAME.TURN.quickResolve) {
      return GAME.turn();
    } else
      return;
  },
  TURN: {
    counter: 0,
    agility_accumulator: 0,
    HERO_weapon: null,
    HERO_armor: null,
    fight_active: null,
    enemy: null,
    quickResolve: false,
    setQuickResolve: function () {
      if ($("#form_quick_resolve").prop("checked")) {
        GAME.TURN.quickResolve = true;
      } else
        GAME.TURN.quickResolve = false;
    },
    enemyIndex: null,
    damage: function (attacker, defender) {
      if (attacker.weapon === 0)
        return 0;
      let delta = attacker.weapon - defender.armor;
      let damage = RND(
        Math.min(INI.ATTACk_OFFSET, Math.floor(delta / 2)),
        Math.max(delta, 1)
        );
      return damage;
    },
    enemyDamage: 0,
    heroDamage: 0,
    heroKillSpeed: function () {
      return Math.max(
        GAME.TURN.enemyDamage / GAME.TURN.counter,
        INI.MIN_KILL_SPEED
        );
    },
    enemyKillSpeed: function () {
      return Math.max(
        GAME.TURN.heroDamage / GAME.TURN.counter,
        INI.MIN_KILL_SPEED
        );
    },
    slowFight: function () {
      return (
        GAME.TURN.enemyKillSpeed() < 0.5 && GAME.TURN.heroKillSpeed() < 0.5
        );
    }
  },
  paintRestartButtons: function () {
    $("#buttons").prepend(
      `<input type='button' id='Restart' value='Restart game'>`
      );
    $("#Restart").on("click", PRG.start);
    $("#pause").prop("disabled", true);
    const sg = localStorage.getItem(PRG.SG);
    if (sg) {
      $("#checkpoint").removeClass("hidden");
    }
  },
  won: function () {
    SAVE_GAME.delete(PRG.SG);
    GAME.paintRestartButtons();
    const text = GAME.generateWinningText();
    const RD = new RenderData("Arcade", 20, "#0F0", "bottomText");
    const SQ = new Square(
      0,
      0,
      LAYER.bottomText.canvas.width,
      LAYER.bottomText.canvas.height
      );
    GAME.movingText = new MovingText(text, 3, RD, SQ);
    GAME.end();
  },
  over: function () {
    GAME.paintRestartButtons();
    TITLE.restartTitle();
    const text = GAME.generateEndingText();
    const RD = new RenderData("Consolas", 12, "orange", "bottomText");
    const SQ = new Square(
      0,
      0,
      LAYER.bottomText.canvas.width,
      LAYER.bottomText.canvas.height
      );
    GAME.movingText = new MovingText(text, 2, RD, SQ);
    GAME.end();
  },
  setTitle: function () {
    const text = GAME.generateTitleText();
    const RD = new RenderData("Drip", 20, "#0E0", "bottomText");
    const SQ = new Square(
      0,
      0,
      LAYER.bottomText.canvas.width,
      LAYER.bottomText.canvas.height
      );
    GAME.movingText = new MovingText(text, 2, RD, SQ);
  },
  generateEndingText: function () {
    let text = `The brave ${HERO.name} entered the dungeons of Darkness, never to return again. The bones of the brave ${HERO.name} lies on the dusty dungeon floor together with the victims of ${HERO.name} ...    `;
    let victims = [];
    for (const log in LOG) {
      let kills = LOG[log].allKills();
      let victim = `${log}: ${kills}`;
      if (kills > 0)
        victims.push(victim);
    }
    text += victims.join(", ");
    text +=
      "    ...     Let them all rest in peace ... or at least until another hero enters the dungeon  ...    ";
    return text;
  },
  generateWinningText: function () {
    let text = `Congratulations ${HERO.name}! You entered the dungeons of Darkness and defeated Hell Rat in ${GAME.winningTime}. The eternity among the heaps of gold is now yours. Guard it with your life and kill all the other heros who will come to steal your gold. On your path to wealth you left behind the bones of:   `;
    let victims = [];
    for (const log in LOG) {
      let kills = LOG[log].allKills();
      let victim = `${log}: ${kills}`;
      if (kills > 0)
        victims.push(victim);
    }
    text += victims.join(", ");
    text += `     You concluded ${PRG.NAME} ${
      PRG.VERSION
      }, a game by Lovro Selic, ${"\u00A9"} C00lSch00l ${PRG.YEAR} on ˘${
      navigator.userAgent
      }. Now go outside and play with your friends. They might have been missing you by now ...          `;
    return text;
  },
  generateTitleText: function () {
    let text = `${PRG.NAME} ${
      PRG.VERSION
      }, a game by Lovro Selic, ${"\u00A9"} C00lSch00l ${
      PRG.YEAR
      }. Title screen graphics by Trina Selic. Music: 'Look Me In The Eye, Demon' written and performed by LaughingSkull, ${"\u00A9"} 2011 Lovro Selic. `;
    text +=
      "     ENGINE, MAZE and GAME code by Lovro Selic using JavaScript ES7. ";
    text = text.split("").join(String.fromCharCode(8202));
    return text;
  },
  restartGame: function () {
    $("#Restart").remove();
    console.log("%cGAME RESTARTED", "color: #FFA500");
    GAME.discardMaps();
    ENGINE.TIMERS.STACK.clear();
  },
  discardMaps: function () {
    MINIMAP.maps = {};
    MAP.clear();
    if (!GAME.fromCheckpoint)
      LOG = {};
  },
  checkScore: function () {
    SCORE.checkScore(HERO.experience, HERO.name);
    SCORE.hiScore();
  }
};
var MINIMAP = {
  key: "#00F",
  door: "#F00",
  wall: "#8B4513",
  path: "#000",
  hero: "#0F0",
  temple: "yellow",
  exit: "#FFF",
  maps: {},
  create: function (level) {
    console.log("MINIMAP creation - level:", level);
    if (MINIMAP.maps[GAME.level] === undefined) {
      MINIMAP.maps[GAME.level] = {};
      MINIMAP.maps[GAME.level].buffer = new ArrayBuffer(
        MAP[GAME.level].width * MAP[GAME.level].height
        );
      MINIMAP.maps[GAME.level].map = new Uint8Array(
        MINIMAP.maps[GAME.level].buffer
        );
      let index;
      for (let y = 0; y < MAP[GAME.level].height; y++) {
        for (let x = 0; x < MAP[GAME.level].width; x++) {
          index = x + y * MAP[GAME.level].width;
          if (GRID.isBlock(x, y)) {
            MINIMAP.maps[GAME.level].map[index] = 0b10000000;
          } else
            MINIMAP.maps[GAME.level].map[index] = 0b10000001;
        }
      }


      if (MAP[GAME.level].DUNGEON.door) {
        MINIMAP.maps[GAME.level].map[
          GRID.gridToIndex(MAP[GAME.level].DUNGEON.door)
        ] |= 2;
      }
      if (MAP[GAME.level].DUNGEON.gate) {
        MINIMAP.maps[GAME.level].map[
          GRID.gridToIndex(MAP[GAME.level].DUNGEON.gate)
        ] |= 2;
      }
      if (MAP[GAME.level].DUNGEON.silverKey) {
        MINIMAP.maps[GAME.level].map[
          GRID.gridToIndex(MAP[GAME.level].DUNGEON.silverKey)
        ] |= 4;
      }
      if (MAP[GAME.level].DUNGEON.goldKey) {
        MINIMAP.maps[GAME.level].map[
          GRID.gridToIndex(MAP[GAME.level].DUNGEON.goldKey)
        ] |= 4;
      }
      if (MAP[GAME.level].DUNGEON.entrance) {
        MINIMAP.maps[GAME.level].map[
          GRID.gridToIndex(MAP[GAME.level].DUNGEON.entrance)
        ] |= 8;
      }
      if (MAP[GAME.level].DUNGEON.exit) {
        MINIMAP.maps[GAME.level].map[
          GRID.gridToIndex(MAP[GAME.level].DUNGEON.exit)
        ] |= 8;
      }
      if (MAP[GAME.level].DUNGEON.temple) {
        MINIMAP.maps[GAME.level].map[
          GRID.gridToIndex(MAP[GAME.level].DUNGEON.temple)
        ] |= 16;
      }
    } else
      console.log(`MINIMAP to ${GAME.level} already exists`);
  },
  draw: function (x, y, CTX) {
    MINIMAP.maps[GAME.level].map.forEach((value, index) => {
      if (value < 128) {
        if (value & 16) {
          CTX.fillStyle = MINIMAP.temple;
        } else if (value & 8) {
          CTX.fillStyle = MINIMAP.exit;
        } else if (value & 4) {
          CTX.fillStyle = MINIMAP.key;
        } else if (value & 2) {
          CTX.fillStyle = MINIMAP.door;
        } else if (value & 1) {
          CTX.fillStyle = MINIMAP.path;
        } else {
          CTX.fillStyle = MINIMAP.wall;
        }
        let grid = GRID.indexToGrid(index);
        CTX.pixelAt(
          x + grid.x * INI.MINI_PIX,
          y + grid.y * INI.MINI_PIX,
          INI.MINI_PIX
          );
      }
      CTX.fillStyle = MINIMAP.hero;
      CTX.pixelAt(
        x + HERO.MoveState.homeGrid.x * INI.MINI_PIX,
        y + HERO.MoveState.homeGrid.y * INI.MINI_PIX,
        INI.MINI_PIX
        );
    });
  },
  unveil: function (grid, r = INI.MAP_RADIUS) {
    let startX = Math.max(grid.x - r, 0);
    let startY = Math.max(grid.y - r, 0);
    let maxX = Math.min(MAP[GAME.level].DUNGEON.maxX + 1, startX + 2 * r);
    let maxY = Math.min(MAP[GAME.level].DUNGEON.maxY + 1, startY + 2 * r);
    for (let y = startY; y <= maxY; y++) {
      for (let x = startX; x <= maxX; x++) {
        let index = x + y * MAP[GAME.level].width;
        MINIMAP.maps[GAME.level].map[index] &= 0b01111111;
      }
  }
  }
};
var TITLE = {
  stack: {
    scrollIndex: 0,
    scrollInRow: 3,
    scrollDelta: 72
  },
  change: function () {
    TITLE.STATUS.changed = true;
  },
  STATUS: {
    changed: true,
    layer: "status"
  },
  main: function () {
    TITLE.title();
    TITLE.bottom();
    TITLE.side();
  },
  title: function () {
    var CTX = LAYER.title;
    TITLE.background();
    var fs = 42;
    CTX.font = fs + "px Arcade";
    CTX.textAlign = "center";
    var txt = CTX.measureText(PRG.NAME);
    var x = ENGINE.titleWIDTH / 2;
    var y = fs + 10;
    var gx = x - txt.width / 2;
    var gy = y - fs;
    var grad = CTX.createLinearGradient(gx, gy + 10, gx, gy + fs);
    grad.addColorStop("0", "#0F0");
    grad.addColorStop("0.1", "#0E0");
    grad.addColorStop("0.2", "#0D0");
    grad.addColorStop("0.3", "#0C0");
    grad.addColorStop("0.4", "#0B0");
    grad.addColorStop("0.5", "#0A0");
    grad.addColorStop("0.6", "#090");
    grad.addColorStop("0.7", "#080");
    grad.addColorStop("0.8", "#070");
    grad.addColorStop("0.9", "#060");
    grad.addColorStop("1", "#050");
    GAME.grad = grad;
    CTX.fillStyle = grad;
    CTX.shadowColor = "#040";
    CTX.shadowOffsetX = 2;
    CTX.shadowOffsetY = 2;
    CTX.shadowBlur = 3;
    CTX.fillText(PRG.NAME, x, y);
  },
  background: function () {
    var CTX = LAYER.title;
    CTX.fillStyle = "#000";
    CTX.roundRect(
      0,
      0,
      ENGINE.titleWIDTH,
      ENGINE.titleHEIGHT,
      {
        upperLeft: 20,
        upperRight: 20,
        lowerLeft: 0,
        lowerRight: 0
      },
      true,
      true
      );
  },
  bottomBlank: function () {
    var CTX = LAYER.bottom;
    CTX.fillStyle = "#000";
    CTX.roundRect(
      0,
      0,
      ENGINE.bottomWIDTH,
      ENGINE.bottomHEIGHT,
      {
        upperLeft: 0,
        upperRight: 0,
        lowerLeft: 20,
        lowerRight: 20
      },
      true,
      true
      );
  },
  bottom: function () {
    var CTX = LAYER.bottom;
    CTX.fillStyle = "#000";
    CTX.roundRect(
      0,
      0,
      ENGINE.bottomWIDTH,
      ENGINE.bottomHEIGHT,
      {
        upperLeft: 0,
        upperRight: 0,
        lowerLeft: 20,
        lowerRight: 20
      },
      true,
      true
      );
    CTX = LAYER.bottomText;
    CTX.textAlign = "center";
    var x = ENGINE.bottomWIDTH / 2;
    var y = ENGINE.bottomHEIGHT / 2;
    CTX.font = "10px Consolas";
    CTX.fillStyle = GAME.grad;
    CTX.shadowOffsetX = 2;
    CTX.shadowOffsetY = 2;
    CTX.shadowBlur = 5;
    CTX.shadowColor = "#040";
    CTX.fillText("Version " + PRG.VERSION + " by Lovro Selič", x, y);
  },
  side() {
    ENGINE.clearLayer("sideback");
    ENGINE.fillLayer("sideback", "#000");
  },
  forceChange: function () {
    TITLE.change();
    TITLE.status();
  },
  status: function () {
    if (!TITLE.STATUS.changed)
      return;
    TITLE.STATUS.changed = false;
    ENGINE.clearLayer("status");
    TITLE.hero();
    TITLE.time();
    TITLE.health();
    TITLE.gold();
    TITLE.inv();
    TITLE.skills();
    TITLE.scrolls();
    TITLE.map();
  },
  scrolls: function () {
    TITLE.stack.scrollIndex = Math.min(
      TITLE.stack.scrollIndex,
      HERO.scrolls.size() - 1
      );
    let scrollSpread = ENGINE.spreadAroundCenter(
      TITLE.stack.scrollInRow,
      ENGINE.sideWIDTH / 2 - 16,
      TITLE.stack.scrollDelta
      );
    var CTX = LAYER[TITLE.STATUS.layer];
    CTX.save();
    ENGINE.resetShadow(CTX);
    let x = 16;
    let fs = 16;
    let y = TITLE.stack.y + 4;

    let LN = HERO.scrolls.size();
    let start = Math.max(
      0,
      TITLE.stack.scrollIndex - TITLE.stack.scrollInRow + 1
      );
    start = Math.min(start, LN - TITLE.stack.scrollInRow);
    if (start < 0)
      start = 0;
    let max = start + Math.min(TITLE.stack.scrollInRow, LN);
    for (let q = start; q < max; q++) {
      let scroll = HERO.scrolls.list[q];
      if (scroll.object.use === "explore") {
        CTX.globalAlpha = 1;
        CTX.strokeStyle = "#0F0";
      } else {
        CTX.globalAlpha = 0.3;
        CTX.strokeStyle = "#F00";
      }
      x = scrollSpread.shift();
      ENGINE.draw(TITLE.STATUS.layer, x, y, scroll.object.sprite);

      CTX.font = "10px Consolas";
      CTX.fillStyle = "#FFF";
      CTX.fillText(
        scroll.count.toString().padStart(2, "0"),
        x + 32,
        y + 18 + 4
        );

      if (q === TITLE.stack.scrollIndex) {
        CTX.globalAlpha = 0.5;
        CTX.lineWidth = "1";
        CTX.beginPath();
        CTX.rect(x - 14, y - 3, 60, 44);
        CTX.closePath();
        CTX.stroke();
      }
    }
    CTX.globalAlpha = 1;
    y += 2 * fs + 12;
    x = (ENGINE.sideWIDTH - SPRITE.LineTop.width) / 2;
    CTX.restore();
    ENGINE.draw(TITLE.STATUS.layer, x, y, SPRITE.LineBottom);
    y += SPRITE.LineBottom.height + 4;
    TITLE.stack.y = y;
  },
  map: function () {
    var CTX = LAYER.map;
    ENGINE.clearLayer("map");
    let y = TITLE.stack.y + 14;
    let x = 28;
    CTX.strokeStyle = "#FFF";
    CTX.beginPath();
    CTX.rect(x - 1, y - 1, 202, 202);
    CTX.closePath();
    CTX.stroke();
    CTX.fillStyle = "#444";
    CTX.fillRect(x, y, 200, 200);
    MINIMAP.draw(x, y, CTX);
  },
  statusBar: function (x, y, value, max, color) {
    var CTX = LAYER[TITLE.STATUS.layer];
    let h = 16;
    let w = 160;
    ENGINE.statusBar(CTX, x, y, w, h, value, max, color);
  },
  healthBar: function (x, y) {
    TITLE.statusBar(x, y, HERO.health, HERO.maxHealth, "#F00");
  },
  manaBar: function (x, y) {
    TITLE.statusBar(x, y, HERO.mana, HERO.maxMana, "#00F");
  },
  inv: function () {
    var CTX = LAYER[TITLE.STATUS.layer];
    let fs = 16;
    let y = TITLE.stack.y + fs + 4;
    let x;
    let NUM = 2;
    let delta = 80;
    let xS = ENGINE.spreadAroundCenter(NUM, ENGINE.sideWIDTH / 2, delta);
    x = xS.shift();
    ENGINE.spriteDraw(TITLE.STATUS.layer, x, y, SPRITE.RedPotion);
    x += SPRITE.RedPotion.width / 2 + 5;
    CTX.fillText(HERO.redPotion, x, y + 6);
    x = xS.shift();
    ENGINE.spriteDraw(TITLE.STATUS.layer, x, y, SPRITE.BluePotion);
    x += SPRITE.RedPotion.width / 2 + 5;
    CTX.fillText(HERO.bluePotion, x, y + 6);
    y += fs + 4;
    x = (ENGINE.sideWIDTH - SPRITE.LineTop.width) / 2;
    ENGINE.draw(TITLE.STATUS.layer, x, y, SPRITE.LineBottom);
    y += SPRITE.LineBottom.height;
    TITLE.stack.y = y;
  },
  gold: function () {
    var CTX = LAYER[TITLE.STATUS.layer];
    CTX.save();
    CTX.fillStyle = "#CFB53B";
    CTX.shadowColor = "#DAA520";
    let fs = 16;
    let y = TITLE.stack.y + 1.5 * fs;
    let x = 16;
    CTX.fillText("Gold:", x, y);
    CTX.fillText(HERO.gold.toString().padStart(6, "0"), TITLE.stack.tab, y);
    CTX.restore();
    y += fs;
    x = (ENGINE.sideWIDTH - SPRITE.LineTop.width) / 2;
    ENGINE.draw(TITLE.STATUS.layer, x, y, SPRITE.LineTop);
    y += SPRITE.LineBottom.height;
    TITLE.stack.y = y;
  },
  skills: function () {
    var CTX = LAYER[TITLE.STATUS.layer];
    CTX.fillStyle = "#AAA";
    CTX.shadowColor = "#666";
    let fs = 16;
    let y = TITLE.stack.y + 1.5 * fs;
    let x = 16;
    let pad1 = 80;
    let pad2 = 32;
    CTX.fillText("Sword:", x, y);
    x += pad1;
    CTX.fillText(HERO.weapon.toString().padStart(2, "0"), x, y);
    x += pad2;
    CTX.fillText("Shield:", x, y);
    x += pad1;
    CTX.fillText(HERO.armor.toString().padStart(2, "0"), x, y);
    y += 1.5 * fs;
    x = 16;
    CTX.fillText("Agility:", x, y);
    x += pad1;
    CTX.fillText(HERO.agility.toString().padStart(2, "0"), x, y);
    x += pad2;
    CTX.fillText("Magic:", x, y);
    x += pad1;
    if (HERO.magicBoost > 0) {
      CTX.fillStyle = "#0D0";
      CTX.shadowColor = "#0F0";
    }
    let magic = HERO.magic + HERO.magicBoost;
    CTX.fillText(magic.toString().padStart(2, "0"), x, y);
    //CTX.fillText(HERO.magic.toString().padStart(2, "0"), x, y);
    CTX.fillStyle = "#AAA";
    CTX.shadowColor = "#666";
    y += fs - 2;
    x = (ENGINE.sideWIDTH - SPRITE.LineTop.width) / 2;
    ENGINE.draw(TITLE.STATUS.layer, x, y, SPRITE.LineBottom);
    y += SPRITE.LineBottom.height + 2;
    TITLE.stack.y = y;
  },
  health: function () {
    var CTX = LAYER[TITLE.STATUS.layer];
    let fs = 16;
    let y = TITLE.stack.y + 1.5 * fs;
    let x = 16;
    CTX.font = fs + "px Times";
    CTX.fillStyle = "#AAA";
    CTX.shadowColor = "#666";
    CTX.shadowOffsetX = 1;
    CTX.shadowOffsetY = 1;
    CTX.shadowBlur = 1;
    if (HERO.canLevelUp) {
      CTX.fillStyle = "#0F0";
      CTX.shadowColor = "#0D0";
    }
    CTX.fillText("Level:", x, y);
    CTX.fillText(HERO.level.toString().padStart(2, "0"), 100, y);
    y += 1.5 * fs;
    CTX.fillText("Experience:", x, y);
    CTX.fillText(HERO.experience.toString().padStart(6, "0"), 100, y);
    if (HERO.canLevelUp) {
      CTX.fillStyle = "#00F";
      CTX.shadowColor = "#00D";
      CTX.font = "10px Arial";
      CTX.fillText("Press TAB for Level Up!", x + 116, y - 26);
    }

    CTX.font = fs + "px Times";
    CTX.fillStyle = "#AAA";
    CTX.shadowColor = "#666";

    y += 1.5 * fs;
    x = (ENGINE.sideWIDTH - SPRITE.LineTop.width) / 2;
    ENGINE.draw(TITLE.STATUS.layer, x, y, SPRITE.LineBottom);
    y += SPRITE.LineBottom.height + 1.5 * fs;
    x = 16;
    CTX.fillText("Health:", x, y);
    var bx, by;
    inc();
    TITLE.healthBar(bx, by);
    x = 16;
    y += 1.5 * fs;
    CTX.fillText("Mana:", x, y);
    inc();
    TITLE.manaBar(bx, by);
    y += 1.5 * fs;
    x = (ENGINE.sideWIDTH - SPRITE.LineTop.width) / 2;
    ENGINE.draw(TITLE.STATUS.layer, x, y, SPRITE.LineBottom);
    y += SPRITE.LineBottom.height;
    TITLE.stack.y = y;
    TITLE.stack.tab = bx;

    function inc() {
      const pad = 3;
      bx = x + 64;
      by = y - fs + pad;
    }
  },
  time: function () {
    var CTX = LAYER["time"];
    ENGINE.clearLayer("time");
    let fs = 14;
    CTX.font = fs + "px Times";
    CTX.fillStyle = "#0D0";
    CTX.shadowColor = "#0F0";
    CTX.shadowOffsetX = 0;
    CTX.shadowOffsetY = 0;
    CTX.shadowBlur = 0;
    CTX.fillText(GAME.time.timeString(), 180, 28);
  },
  hero: function () {
    let x = 48;
    let y = 20;
    let fs = 14;
    ENGINE.spriteDraw(TITLE.STATUS.layer, x, y, SPRITE.Knight_front_0);
    var CTX = LAYER[TITLE.STATUS.layer];
    x = 102;
    CTX.font = fs + "px Times";
    CTX.fillStyle = "#0A0";
    CTX.shadowColor = "#0F0";
    CTX.shadowOffsetX = 0;
    CTX.shadowOffsetY = 0;
    CTX.shadowBlur = 0;
    CTX.fillText(HERO.name, x, y);
    y += fs + 4;
    CTX.fillText(`Depth: ${GAME.level.toString().padStart(2, "0")}`, x, y);
    CTX.fillStyle = "#AAA";
    CTX.shadowColor = "#666";
    y = 26 + 32;
    x = (ENGINE.sideWIDTH - SPRITE.LineTop.width) / 2;
    ENGINE.draw(TITLE.STATUS.layer, x, y, SPRITE.LineTop);
    let delta = 48;
    let NUM = HERO.inventory.size;
    let xS = ENGINE.spreadAroundCenter(NUM, ENGINE.sideWIDTH / 2, delta);
    y += 32;
    fs = 16;
    HERO.inventory.forEach((sprite) => {
      ENGINE.spriteDraw(TITLE.STATUS.layer, xS.shift(), y, sprite);
    });
    y += fs;
    ENGINE.draw(TITLE.STATUS.layer, x, y, SPRITE.LineBottom);
    y += SPRITE.LineBottom.height;
    TITLE.stack.y = y;
  },
  music: function () {
    AUDIO.Title.play();
  },
  restartTitle: function () {
    if (AUDIO.Title)
      AUDIO.Title.play();
    TITLE.drawButtons();
  },
  startTitle: function () {
    TITLE.background();
    TITLE.side();
    ENGINE.draw("background", 0, 0, TEXTURE.DDID_Cover);
    TITLE.bottomBlank();
    $("#DOWN")[0].scrollIntoView();
    let cname = ENGINE.getCanvasName("ROOM");
    ENGINE.topCanvas = cname;
    TITLE.drawButtons();
    GAME.setTitle();
    ENGINE.GAME.start(); //INIT game loop
    ENGINE.GAME.ANIMATION.next(GAME.runTitle);
  },
  drawButtons() {
    ENGINE.clearLayer("button");
    FORM.BUTTON.POOL.clear();
    if (AUDIO.Title)
      AUDIO.Title.play();
    let x = 48;
    let y = 600;
    let w = 166;
    let h = 24;
    let startBA = new Area(x, y, w, h);
    let buttonColors = new ColorInfo("#F00", "#A00", "#222", "#666", 13);
    let musicColors = new ColorInfo("#0E0", "#090", "#222", "#666", 13);

    FORM.BUTTON.POOL.push(
      new Button("Start new game", startBA, buttonColors, PRG.start)
      );
    const sg = localStorage.getItem(PRG.SG);
    if (sg) {
      y += 1.5 * h;
      let resumeBA = new Area(x, y, w, h);
      FORM.BUTTON.POOL.push(
        new Button(
          "Resume from checkpoint",
          resumeBA,
          buttonColors,
          PRG.checkpoint
          )
        );
    }
    y += 1.5 * h;
    let music = new Area(x, y, w, h);
    FORM.BUTTON.POOL.push(
      new Button("Play title music", music, musicColors, TITLE.music)
      );
    FORM.BUTTON.draw();
    $(ENGINE.topCanvas).mousemove(ENGINE.mouseOver);
    $(ENGINE.topCanvas).click(ENGINE.mouseClick);
  }
};
class Monster {
  constructor(type, grid, go = false) {
    this.enemy = true;
    this.type = type;
    this.grid = Grid.toClass(grid);
    this.awake = false;
    this.actor = new ACTOR(
      this.type.name,
      0,
      0,
      "front",
      ASSET[this.type.name]
      );
    GRID.gridToSprite(this.grid, this.actor);
    this.alignToViewport();
    this.MoveState = new MoveState(this.grid, DOWN);
    this.dirStack = [];
    this.strategy = this.type.strategy;
    this.speed = this.type.speed;
    this.visible = false;
    this.health = this.type.health;
    this.weapon = this.type.weapon;
    this.armor = this.type.armor;
    this.maxHealth = this.type.health;
    this.mana = this.type.mana;
    this.magic = this.type.magic;
    this.magicResistance = this.type.magicResistance;
    this.agility = this.type.agility;
    this.exp = this.type.exp;
    this.gold = this.type.gold;
    this.title = this.type.title;
    this.inventory = this.type.inventory || null;
    this.guarding = null;
    this.petrified = false;
    this.casted(0);
    if (go)
      this.wake();
    this.luck = this.type.luck || 0;
    this.immunity = this.type.immunity || false;
  }
  alignToViewport() {
    ENGINE.VIEWPORT.alignTo(this.actor);
  }
  makeMove() {
    this.MoveState.dir = this.dirStack.shift();
    this.MoveState.next(this.MoveState.dir);
  }
  wake() {
    this.awake = true;
  }
  sleep() {
    this.awake = false;
    this.hide();
  }
  show() {
    this.visible = true;
  }
  hide() {
    this.visible = false;
  }
  isVisible() {
    let targetGrid = this.MoveState.closerGrid(HERO.MoveState);
    return GRID.vision(Grid.toClass(HERO.MoveState.homeGrid), targetGrid);
  }
  casted(add = 0) {
    this.canShoot = false;
    this.shootCoolDown(add);
  }
  shootCoolDown(add) {
    setTimeout(() => (this.canShoot = true), INI.SHOOT_TIMEOUT + add);
  }
  drop(grid) {
    let drop;
    let luck = HERO.luck + this.luck + HERO.addLuck;
    luck = Math.min(luck, INI.MAX_LUCK);
    if (this.inventory) {
      switch (this.inventory.type) {
        case "potion":
          drop = new Potion(this.inventory.value.chooseRandom(), grid);
          MAP[GAME.level].DUNGEON.potions.push(drop);
          break;

        case "boost":
          drop = new Boost(this.inventory.value.chooseRandom(), grid);
          MAP[GAME.level].DUNGEON.boosts.push(drop);
          break;

        case "key":
          MAP[GAME.level].DUNGEON[this.inventory.value] = grid;
          break;

        default:
          console.log("Monster dropping", this.inventory, "ERROR");
          break;
      }
    } else if (probable(luck)) {
      drop = SCROLLS.chooseRandom();
      MAP[GAME.level].DUNGEON.scrolls.push(
        new Scroll(grid, drop.type, drop.use)
        );
    } else {
      let factor = 1.0 + Math.floor((luck - HERO.luck) / HERO.luck) / 10;
      let value = Math.round(
        RND(Math.floor(this.gold / 2), this.gold) * factor
        );
      drop = new Gold(value, grid);
      MAP[GAME.level].DUNGEON.gold.push(drop);
    }
    ENGINE.VIEWPORT.changed = true;
    GAME.PAINT.config();
  }
  turn() {
    if (!GAME.TURN.fight_active)
      return;
    if (this.petrified)
      return;
    let damage = GAME.TURN.damage(this, HERO);
    if (damage > 0) {
      CONSOLE.print(
        `<span class="red">${this.type.title}</span> hits and makes <span class="red">${damage}</span> damage.`
        );
      HERO.health -= damage;
      HERO.health = Math.max(HERO.health, 0);
      if (HERO.health <= 0) {
        HERO.die();
      }
    } else {
      CONSOLE.print(`<span class="red">${this.title}</span> misses.`);
    }
    return damage;
  }
  prepareForDeath() {
    CONSOLE.print(`<span class="red">${this.title}</span> was killed.`);
    CONSOLE.print(
      `<span class="blue">${HERO.name} gets ${this.exp} XP.</span>`
      );
    GAME.TURN.fight_active = false;
    MAP[GAME.level].DUNGEON.ENEMY.splice(GAME.TURN.enemyIndex, 1);
    GAME.CLICK.endFight();
    LOG[this.title].kills++;
  }
  die() {
    HERO.incExp(this.exp);
    TITLE.change();
    this.drop(this.MoveState.homeGrid);
    TEXTPOOL.pool.push(
      new TextSprite(
        (this.exp + "XP").toString(),
        GRID.gridToCoord(this.MoveState.homeGrid),
        "#00FF00",
        100
        )
      );
  }
  petrify() {
    if (this.petrified)
      return;
    this.petrified = true;
    this.health = 1;
    this.weapon = 1;
    this.armor = 0;
    this.agility = 0;
    this.title = "Petrified monster";
    this.gold = 1;
    this.exp = 1;
    if (this.inventory !== null && this.inventory.type !== "key")
      this.inventory = null;
    this.magicResistance = 0;
    this.visible = true;

    const img = this.actor.sprite();
    const pre = "Petrified_";
    const petrifiedClass = pre + this.actor.name;
    if (!SPRITE[petrifiedClass]) {
      ENGINE.grayScaleImg(img, petrifiedClass);
    }
    this.actor.simplify(petrifiedClass);
  }
}
var LOG = {};
class Log {
  constructor(k, m) {
    this.kills = k || 0;
    this.magicKills = m || 0;
  }
  toClass(k, m) {
    return new Log(k, m);
  }
  adopt(obj) {
    this.kills = obj.kills;
    this.magicKills = obj.magicKills;
  }
  allKills() {
    return this.kills + this.magicKills;
  }
}

/////////////////

$(function () {
  PRG.INIT();
  PRG.setup();
  ENGINE.LOAD.preload();
  SCORE.init("SC", "DDID", 10, 1000);
  SCORE.refresh();
  const BACKUP_MAP = $.extend(true, {}, MAP);
  SAVE_GAME.setKey(PRG.SG);
});
