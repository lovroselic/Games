//console.clear();
/////////////////////////////////////////////////
/*
 to do:
 
 known bugs: 
 */
////////////////////////////////////////////////////
var DEBUG = {
  INF_LIVES: false,
  INF_ENERGY: false,
  finishLevel: function () {
    MAP[GAME.level].gold.splice(1);
    GAME.PAINT.gold();
    ENGINE.VIEWPORT.changed = true;
  }
};
var INI = {
  HERO_SPEED: 8,
  ENEMY_DELAY: 3000,
  SCORE_GOLD: 10,
  MINI_PIX: 3,
  ENERGY_FACTOR: 10,
  SPLASH_FRAMES: 150,
  SPLASH_COST: 10,
  REPLAY_TIMEOUT: 4000,
  LEVEL_BONUS: 1000,
  LEVEL_FACTOR: 0.4,
  LAST_LEVEL: 10,
  RESTART_TITLE: 13000,
};
var PRG = {
  VERSION: "1.09",
  CSS: "color: #0F0",
  NAME: "GhostRun",
  YEAR: 2019,
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
        " <span style='font-size:14px'>&copy</span> C00lSch00l 2019"
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
      ENGINE.sideWIDTH = 960 - ENGINE.gameWIDTH;
      ENGINE.gameHEIGHT = 768;
      ENGINE.titleHEIGHT = 80;
      ENGINE.titleWIDTH = 960;
      ENGINE.bottomHEIGHT = 40;
      ENGINE.bottomWIDTH = 960;
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
        ["background", "splash", "actors", "explosion", "text", "animation","button", "click"],
        "side"
      );
      ENGINE.addBOX(
        "SIDE",
        ENGINE.sideWIDTH,
        ENGINE.gameHEIGHT,
        ["sideback", "score", "energy", "lives", "stage", "radar"],
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
        ["floor", "wall", "coord", "gold"],
        null
      );
      $("#LEVEL").addClass("hidden");
    }
    if (!PRG.showTitle){
      $("#startGame").addClass("hidden");
      var disableKeys = ["enter", "space"];
      for (let key in disableKeys) ENGINE.disableKey(key);
      GAME.start();
    } else {
      PRG.showTitle = false;
      GAME.restarted = true;
      TITLE.startTitle();
    }
  },
  showTitle: true
};
var HERO = {
  startInit: function () {
    HERO.spriteClass = "Wizard";
    HERO.asset = ASSET[HERO.spriteClass];
    HERO.actor = new ACTOR(
      HERO.spriteClass,
      HERO.x,
      HERO.y,
      "front",
      HERO.asset
    );
    HERO.dead = false;
  },
  init: function () {
    HERO.speed = INI.HERO_SPEED;
    HERO.slowed = false;
    HERO.dead = false;
    GRID.gridToSprite(MAP[GAME.level].start, HERO.actor);
    HERO.MoveState = new MoveState(MAP[GAME.level].start);
    HERO.MoveState.next(UP);
    ENGINE.VIEWPORT.check(HERO.actor);
    ENGINE.VIEWPORT.alignTo(HERO.actor);
    HERO.actor.orientation = "front";
    HERO.actor.refresh();
  },
  draw: function () {
    if (HERO.dead) return;
    ENGINE.spriteDraw(
      "actors",
      HERO.actor.vx,
      HERO.actor.vy,
      HERO.actor.sprite()
    );
    ENGINE.layersToClear.add("actors");
  },
  move: function () {
    if (HERO.dead) return;
    if (HERO.MoveState.moving) {
      GRID.translateMove(HERO, true, HeroOnFinish);
    } else {
      var dir = HERO.findNewDir();
      HERO.changeDirection(dir);
    }

    function HeroOnFinish() {
      if (DEBUG.INF_ENERGY) return;
      if (!HERO.slowed) HERO.energy--;
      if (HERO.energy <= 0 && !HERO.slowed) {
        HERO.energy = 0;
        HERO.speed /= 2;
        HERO.slowed = true;
      }
      TITLE.energy();
    }
  },
  changeDirection: function (dir) {
    let x = HERO.MoveState.endGrid.x + dir.x;
    let y = HERO.MoveState.endGrid.y + dir.y;
    if (!GRID.isBlock(x, y)) {
      HERO.MoveState.next(dir);
    }
  },
  tryToChangeDir: function (dir) {
    var back = HERO.MoveState.dir.mirror();
    if (GRID.same(back, dir)) {
      HERO.MoveState.flip();
      HERO.changeDirection(dir);
      return;
    }
    if (!HERO.MoveState.moving) {
      HERO.changeDirection(dir);
    }
  },
  findNewDir: function () {
    var dirs = GRID.getDirections(HERO.MoveState.endGrid);
    var cur = HERO.MoveState.dir.mirror();
    var curIndex = GRID.isGridIn(cur, dirs);
    if (curIndex !== -1) dirs.splice(curIndex, 1);
    if (dirs.length === 1) {
      return dirs[0];
    } else {
      var keep = GRID.isGridIn(HERO.MoveState.dir, dirs);
      if (keep !== -1) {
        return dirs[keep];
      } else {
        return dirs.chooseRandom();
      }
    }
  },
  touchGold: function () {
    const GL = MAP[GAME.level].gold.length;
    let hit;
    for (let q = GL - 1; q >= 0; q--) {
      hit = GRID.collision(HERO, MAP[GAME.level].gold[q]);
      if (hit) {
        GAME.score += INI.SCORE_GOLD;
        TITLE.score();
        MAP[GAME.level].gold.splice(q, 1);
        GAME.PAINT.gold();
        ENGINE.VIEWPORT.changed = true;
        AUDIO.Pick.play();
        break;
      }
    }
    if (MAP[GAME.level].gold.length === 0) {
      console.log("level cleared");
      GAME.levelEnd();
    }
  },
  splash: function () {
    if (HERO.dead) return;
    var grid = Grid.toClass(HERO.MoveState.homeGrid);
    var idx = grid.isInAt(SPLASH.pool);
    if (idx === -1) {
      if (HERO.energy > INI.SPLASH_COST) {
        SPLASH.pool.push(new Splash(grid, new ACTOR("Splash")));
        if (DEBUG.INF_ENERGY) return;
        HERO.energy -= INI.SPLASH_COST;
        TITLE.energy();
      }
    }
  },
  collideMonster: function () {
    if (HERO.dead) return;
    const MLN = ENEMY.pool.length;
    for (let q = 0; q < MLN; q++) {
      let enemy = ENEMY.pool[q];
      let hit = ENGINE.collision(HERO.actor, enemy.actor);
      if (hit) {
        if (!DEBUG.invincible) HERO.die();
        break;
      }
    }
  },
  die: function () {
    if (HERO.dead) return;
    AUDIO.Explosion.play();
    AUDIO.EvilLaughter.play();
    console.log("HERO died");
    HERO.dead = true;
    HERO.paintDeath();
    GAME.lives--;
    if (GAME.lives < 0 && !DEBUG.INF_LIVES) {
      console.log("GAME OVER");
      TITLE.gameOver();
      GAME.end();
    } else {
      console.log("continue level", GAME.level);
      setTimeout(ENGINE.GAME.ANIMATION.stop, 1000);
      setTimeout(GAME.levelContinue, INI.REPLAY_TIMEOUT);
    }
  },
  paintDeath: function () {
    ENGINE.clearLayerStack();
    ENGINE.spriteDraw("actors", HERO.actor.vx, HERO.actor.vy, SPRITE.skull);
    for (let q = 0; q < ENEMY.pool.length; q++) {
      ENEMY.pool[q].alignToViewport();
      ENGINE.spriteDraw(
        "actors",
        ENEMY.pool[q].actor.vx,
        ENEMY.pool[q].actor.vy,
        ENEMY.pool[q].actor.sprite()
      );
    }
    EXPLOSIONS.pool.push(
      new AnimationSPRITE(HERO.actor.x, HERO.actor.y, "ShipExp", 8)
    );
  }
};
var SPLASH = {
  pool: [],
  manage: function () {
    var SPL = SPLASH.pool.length;
    for (let q = SPL - 1; q >= 0; q--) {
      SPLASH.pool[q].life--;
      if (SPLASH.pool[q].life <= 0) {
        SPLASH.pool.splice(q, 1);
      } else {
        SPLASH.pool[q].alignToViewport();
      }
    }
  },
  draw: function () {
    var SPL = SPLASH.pool.length;
    if (SPL === 0) return;
    ENGINE.layersToClear.add("splash");
    var CTX = LAYER.splash;
    var alpha;
    for (let q = 0; q < SPL; q++) {
      alpha = 0.2 + SPLASH.pool[q].life / INI.SPLASH_FRAMES;
      CTX.save();
      CTX.globalAlpha = alpha;
      ENGINE.spriteDraw(
        "splash",
        SPLASH.pool[q].actor.vx,
        SPLASH.pool[q].actor.vy,
        SPRITE.Splash
      );
      CTX.restore();
    }
  }
};
class Splash {
  constructor(grid, actor) {
    this.grid = grid;
    this.actor = actor;
    this.life = INI.SPLASH_FRAMES;
    GRID.gridToSprite(this.grid, this.actor);
    this.alignToViewport();
  }
  alignToViewport() {
    ENGINE.VIEWPORT.alignTo(this.actor);
  }
}
var ENEMY = {
  AI: {
    Ghosty: {
      hunt: function (HERO) {
        return GRID.AI.follower.hunt(HERO);
      }
    },
    Death: {
      hunt: function (HERO) {
        return GRID.AI.advancer.hunt(HERO);
      }
    },
    Death2: {
      hunt: function (HERO) {
        return GRID.AI.advancer.hunt(HERO);
      }
    },
    ZombieGirl: {
      hunt: function (HERO, MS, tolerance) {
        return GRID.AI.shadower.hunt(HERO, MS, tolerance);
      }
    },
    Skeleton: {
      hunt: function (HERO, MS, tolerance) {
        return GRID.AI.shadower.hunt(HERO, MS, tolerance);
      }
    },
    Skeleton2: {
      hunt: function (HERO, MS, tolerance) {
        return GRID.AI.shadower.hunt(HERO, MS, tolerance);
      }
    },
    Skeleton3: {
      hunt: function (HERO, MS, tolerance) {
        return GRID.AI.shadower.hunt(HERO, MS, tolerance);
      }
    },
    Wanderer: {
      hunt: function (HERO, MS) {
        return GRID.AI.wanderer.hunt(HERO, MS);
      }
    },
    Puffy: {
      hunt: function (HERO, MS) {
        return GRID.AI.wanderer.hunt(HERO, MS);
      }
    },
    Snake: {
      hunt: function (HERO) {
        return GRID.AI.advancer.hunt(HERO);
      }
    }
  },
  move: function () {
    if (!ENEMY.started) return;
    if (HERO.dead) return;
    var visual;
    for (let q = 0; q < ENEMY.pool.length; q++) {
      var that = ENEMY.pool[q];
      if (that.captured) {
        that.viewDir = that.viewDir.ccw();
        that.actor.orientation = that.actor.getOrientation(that.viewDir);
        that.actor.animateMove(that.actor.orientation);
      } else if (that.released) {
        that.viewDir = null;
        that.actor.orientation = that.actor.getOrientation(that.MoveState.dir);
        that.actor.animateMove(that.actor.orientation);
      } else {
        if (that.MoveState.moving) {
          if (checkFreedom(q)) GRID.translateMove(that);
          continue;
        } else {
          visual = that.look();
          if (visual) {
            that.makeMove();
            continue;
          } else {
            if (that.dirStack && that.dirStack.length > 0) {
              that.makeMove();
            } else {
              var hunt = ENEMY.AI[that.name].hunt(
                HERO,
                that.MoveState,
                DEFINE_MONSTER[that.name].tolerance
              );

              var path;
              switch (hunt.type) {
                case "grid":
                  path = GRID.findPathToFirstCrossroad(
                    that.MoveState.homeGrid,
                    hunt.return,
                    MAP[GAME.level].DUNGEON,
                    that.MoveState.dir
                  );
                  if (path === null) {
                    path = GRID.findPath(
                      that.MoveState.homeGrid,
                      HERO.MoveState.homeGrid,
                      MAP[GAME.level].DUNGEON,
                      ENGINE.INI.MAX_PATH,
                      that.MoveState.dir
                    );
                  }

                  that.dirStack = path.stack;
                  break;
                case "path":
                  path = hunt.return;
                  that.dirStack = path;
                  break;
              }
            }
          }
        }
      }
    }

    function checkFreedom(q) {
      if (q > 0) {
        return !GRID.same(
          that.MoveState.homeGrid,
          ENEMY.pool[q - 1].MoveState.homeGrid
        );
      } else return true;
    }
  },
  started: false,
  pool: [],
  draw: function () {
    if (HERO.dead) return;
    ENGINE.layersToClear.add("actors");
    for (let q = 0; q < ENEMY.pool.length; q++) {
      ENEMY.pool[q].alignToViewport();
      ENGINE.spriteDraw(
        "actors",
        ENEMY.pool[q].actor.vx,
        ENEMY.pool[q].actor.vy,
        ENEMY.pool[q].actor.sprite()
      );
    }
  },
  init: function () {
    for (let q = 0; q < DEFINE[GAME.level].enemy.length; q++) {
      ENEMY.pool.push(
        new Monster(DEFINE[GAME.level].enemy[q], MAP[GAME.level].enemy[q])
      );
    }
  },
  collideSplash: function () {
    var SLN = SPLASH.pool.length;
    var enemy;
    var splash;
    for (let w = 0; w < ENEMY.pool.length; w++) {
      enemy = ENEMY.pool[w];
      if (enemy.released) {
        enemy.released = false;
      } else if (enemy.captured) {
        enemy.captured = false;
        enemy.released = true;
      }
      for (let q = 0; q < SLN; q++) {
        splash = SPLASH.pool[q];
        let hit = GRID.collision(enemy, splash.grid);
        if (hit) {
          enemy.captured = true;
          if (!enemy.viewDir) enemy.setViewDir();
          break;
        }
      }
    }
  }
};
class Monster {
  constructor(name, grid, actor) {
    this.name = name;
    this.grid = Grid.toClass(grid);
    this.actor = new ACTOR(this.name, 0, 0, "front", ASSET[this.name]);
    GRID.gridToSprite(this.grid, this.actor);
    this.alignToViewport();
    this.MoveState = new MoveState(this.grid, UP);
    this.dirStack = [];
    this.viewDir = null;
    this.captured = false;
    this.released = false;
    this.blind = DEFINE_MONSTER[this.name].blind;
    this.speed = DEFINE_MONSTER[this.name].speed;
  }
  alignToViewport() {
    ENGINE.VIEWPORT.alignTo(this.actor);
  }
  look() {
    if (this.blind) return null;
    var heroDir = this.MoveState.homeGrid.absDirection(HERO.MoveState.homeGrid);
    var dir = this.MoveState.homeGrid.direction(HERO.MoveState.homeGrid);
    if (dir.same(this.MoveState.dir.mirror())) return null;
    if (!heroDir.isOrto()) return null;
    var grid = this.MoveState.homeGrid.add(dir);
    var newStack = [];
    while (!grid.same(HERO.MoveState.homeGrid)) {
      if (!GRID.isBlock(grid.x, grid.y)) {
        newStack.push(dir);
        grid = grid.add(dir);
      } else return null;
    }
    newStack.push(dir);
    let len = GRID.findLengthToCrossroad(this.MoveState.homeGrid, newStack);
    if (len) newStack.splice(len);
    this.dirStack = newStack;
    return true;
  }
  makeMove() {
    this.MoveState.dir = this.dirStack.shift();
    this.MoveState.next(this.MoveState.dir);
  }
  setViewDir() {
    this.viewDir = this.MoveState.dir;
  }
}
var GAME = {
  abort: function () {
    ENGINE.GAME.stopAnimation = true;
    console.error("..... aborting GAME, DEBUG info:");
    console.log("HERO", HERO);
  },
  start: function () {
    ENGINE.hideMouse();
    GAME.extraLife = SCORE.extraLife.clone();
    ENGINE.GAME.start(); //INIT game loop
    ENGINE.KEY.on(); // keymapping active
    GAME.prepareForRestart(); //everything required for safe restart
    GAME.won = false;
    GAME.level = 1;
    GAME.score = 0;
    GAME.lives = 4;
    ENGINE.INI.ANIMATION_INTERVAL = 16;
    HERO.startInit();
    ENGINE.GAME.ANIMATION.waitThen(GAME.levelStart, 2);
  },
  prepareForRestart: function () {
    ENGINE.GAME.ANIMATION.stop();
    ENGINE.clearLayer("text");
    ENGINE.clearLayer("animation");
    ENGINE.clearLayer("button");
    ENGINE.clearLayer("click");
    ENGINE.clearLayer("bottomText");
    MAP = $.extend(true, {}, BACKUP_MAP);
  },
  levelExecute: function () {
    console.log("level", GAME.level, "executes");
    GAME.CI.reset();
    ENGINE.VIEWPORT.reset();
    HERO.init();
    ENEMY.pool.clear();
    ENEMY.init();
    SPLASH.pool.clear();
    EXPLOSIONS.pool.clear();
    GAME.firstFrameDraw(GAME.level);
    ENEMY.started = false;
    ENGINE.GAME.ANIMATION.STACK.push(GAME.countIn);
    ENGINE.GAME.ANIMATION.STACK.push(GAME.afterCountIn);
    ENGINE.GAME.ANIMATION.STACK.push(GAME.run);
    ENGINE.GAME.ANIMATION.queue();
  },
  afterCountIn: function () {
    //single frame
    ENGINE.clearLayer("text");
    setTimeout(() => (ENEMY.started = true), DEFINE[GAME.level].enemy_delay);
    ENGINE.GAME.ANIMATION.stop();
  },
  levelContinue: function () {
    console.log("LEVEL", GAME.level, "continues ...");
    HERO.energy = Math.max(
      Math.round(
        (MAP[GAME.level].gold.length / MAP[GAME.level].maxGold) *
          DEFINE[GAME.level].energy *
          INI.ENERGY_FACTOR
      ),
      HERO.energy
    );
    GAME.levelExecute();
  },
  levelStart: function () {
    console.log("starting level", GAME.level);
    HERO.energy = DEFINE[GAME.level].energy * INI.ENERGY_FACTOR;
    GAME.initLevel(GAME.level);
    GAME.levelExecute();
  },
  nextLevel: function () {
    GAME.level++;
    GAME.levelCompleted = false;
    console.log("creating next level: ", GAME.level);
    if (GAME.level > INI.LAST_LEVEL) {
      console.log("game have been won.");
      GAME.won = true;
      //add end game stuff
      TITLE.gameWon();
      GAME.level--;
      ENGINE.GAME.ANIMATION.stop();
      GAME.endAnimationStart();
      GAME.end();
    } else ENGINE.GAME.ANIMATION.waitThen(GAME.levelStart, 2);
  },
  endAnimationStart: function () {
    SPEECH.speak("Congratulations. You are super rich now.");
    TITLE.restartTitle();
    setTimeout(TITLE.music, INI.RESTART_TITLE);
    TITLE.WIZARD.init();
    ENGINE.GAME.ANIMATION.STACK.push(GAME.wizardDance);
  },
  wizardDance: function () {
    TITLE.WIZARD.move();
    TITLE.WIZARD.draw();
  },
  levelEnd: function () {
    console.log("level", GAME.level, "ended.");
    AUDIO.ClearLevel.play();
    SPEECH.speak("Good job!");
    GAME.levelCompleted = true;
    ENGINE.GAME.ANIMATION.STACK.push(
      ENGINE.KEY.waitFor.bind(null, GAME.nextLevel)
    );
    TITLE.endLevel();
    ENGINE.GAME.ANIMATION.stop();
  },
  initLevel: function (level) {
    if (MAP[level].unpacked) return;
    console.log("unpack maps ... setup level", level);

    MAP[level].DUNGEON = new FixedDungeon(
      MAP[level].width,
      MAP[level].height,
      GRID.map.unpack(MAP[level])
    );
    MAP[level].grid = MAP[level].DUNGEON.grid;
    MAP[level].pw = MAP[level].width * ENGINE.INI.GRIDPIX;
    MAP[level].ph = MAP[level].height * ENGINE.INI.GRIDPIX;
    MAP[level].maxGold = MAP[level].gold.length;
    ENGINE.VIEWPORT.setMax({ x: MAP[level].pw, y: MAP[level].ph });
    MAP[level].unpacked = true;
  },
  updateVieport: function () {
    if (!ENGINE.VIEWPORT.changed) return;
    // do required repaints
    ENGINE.VIEWPORT.change("floor", "background");
    ENGINE.VIEWPORT.change("gold", "background");
    //
    ENGINE.VIEWPORT.changed = false;
  },
  frameDraw: function () {
    ENGINE.clearLayerStack();
    GAME.updateVieport();
    EXPLOSIONS.draw();
    HERO.draw();
    ENEMY.draw();
    TITLE.radar();
    SPLASH.draw();
  },
  firstFrameDraw: function (level) {
    ENGINE.resizeBOX("LEVEL", MAP[level].pw, MAP[level].ph);
    GRID.repaint(
      MAP[level].grid,
      TEXTURE[MAP[level].floor],
      TEXTURE[MAP[level].background]
    );
    ENGINE.flattenLayers("wall", "floor");
    GAME.PAINT.gold();
    ENGINE.VIEWPORT.changed = true;
    GAME.updateVieport();
    TITLE.main();
    TITLE.score();
    ENGINE.clearLayer("actors");
    ENGINE.clearLayer("splash");
    ENGINE.clearLayer("explosion");
    HERO.draw();
    ENEMY.draw();
  },
  CI: {
    text: ["READY", "SET?", "GO!"],
    reset: function () {
      GAME.CI.start = null;
      GAME.CI.now = null;
    }
  },
  countIn: function () {
    if (!GAME.CI.start) GAME.CI.start = performance.now();
    var delta = Math.floor((performance.now() - GAME.CI.start) / 1000);
    if (delta >= 3) {
      ENGINE.GAME.stopAnimation = true;
    } else if (delta !== GAME.CI.now) {
      SPEECH.speak(GAME.CI.text[delta]);
      ENGINE.clearLayer("text");
      ENGINE.TEXT.centeredText(GAME.CI.text[delta], ENGINE.gameHEIGHT / 4);
      GAME.CI.now = delta;
    }
  },
  run: function () {
    //GAME.run() template
    if (ENGINE.GAME.stopAnimation) return;
    //do all game loop stuff here
    GAME.respond();
    HERO.move();
    HERO.touchGold();
    SPLASH.manage();
    ENEMY.move();
    ENEMY.collideSplash();
    HERO.collideMonster();
    //
    GAME.frameDraw();
  },
  respond: function () {
    //GAME.respond() template
    if (HERO.dead) return;
    var map = ENGINE.GAME.keymap;

    //fall throught section
    /*if (map[ENGINE.KEY.map.F9]) {
      console.log("finish level");
      DEBUG.finishLevel();
    }*/
    /*if (map[ENGINE.KEY.map.F8]) {
      console.log("kill ,,,,,");
      GAME.lives = 0;
    }*/

    if (map[ENGINE.KEY.map.A]) {
      ENGINE.GAME.keymap[ENGINE.KEY.map.A] = false; //NO repeat
    }
    if (map[ENGINE.KEY.map.D]) {
      ENGINE.GAME.keymap[ENGINE.KEY.map.D] = false; //NO repeat
    }

    if (map[ENGINE.KEY.map.ctrl]) {
      //console.log("CTRL");
      HERO.splash();
      AUDIO.Splash.play();
      ENGINE.GAME.keymap[ENGINE.KEY.map.ctrl] = false; //NO repeat
    }
    if (map[ENGINE.KEY.map.space]) {
      //console.log("SPACE");
      ENGINE.GAME.keymap[ENGINE.KEY.map.space] = false; //NO repeat
    }

    //single key section
    if (map[ENGINE.KEY.map.left]) {
      HERO.tryToChangeDir(LEFT);
      return;
    }
    if (map[ENGINE.KEY.map.right]) {
      HERO.tryToChangeDir(RIGHT);
      return;
    }
    if (map[ENGINE.KEY.map.up]) {
      HERO.tryToChangeDir(UP);
      return;
    }
    if (map[ENGINE.KEY.map.down]) {
      HERO.tryToChangeDir(DOWN);
      return;
    }

    return;
  },
  setup: function () {
    console.log("%cGAME SETUP started", PRG.CSS);
  },
  end: function () {
    console.log("GAME ENDED");
    ENGINE.showMouse();
    if (!GAME.won){
      AUDIO.Death.play();
      setTimeout(TITLE.startTitle, INI.RESTART_TITLE);
    } 
    GAME.checkScore();
  },
  checkScore: function () {
    setTimeout(function () {
      console.log(PRG.NAME, "stopped?", !ENGINE.GAME.running);
      SCORE.checkScore(GAME.score);
      SCORE.hiScore();
      TITLE.main();
      $("#startGame").removeClass("hidden");
      GAME.restarted = true;
    }, 1500);
  },
  PAINT: {
    gold: function () {
      ENGINE.clearLayer("gold");
      var LN = MAP[GAME.level].gold.length;
      for (let q = 0; q < LN; q++) {
        ENGINE.spriteToGrid("gold", MAP[GAME.level].gold[q], SPRITE.Gold);
      }
    },
    coord: function () {
      ENGINE.clearLayer("coord");
      for (let x = 0; x < MAP[GAME.level].width; x++) {
        for (let y = 0; y < MAP[GAME.level].height; y++) {
          if (!GRID.isBlock(x, y)) {
            let point = GRID.gridToCoord(new Grid(x, y));
            let text = `${x},${y}`;
            GRID.paintText(point, text, "coord");
          }
        }
      }
    }
  },
  generateTitleText: function () {
    let text = `${PRG.NAME} ${
      PRG.VERSION
    }, a game by Lovro Selic, ${"\u00A9"} C00lSch00l ${
      PRG.YEAR
    }. Title screen graphics by Trina Selic. Music: 'Determination' written and performed by LaughingSkull, ${"\u00A9"} 2007 Lovro Selic. `;
    text +=
      "     ENGINE, SPEECH and GAME code by Lovro Selic using JavaScript ES7. ";
    text = text.split("").join(String.fromCharCode(8202));
    return text;
  },
  setTitle: function () {
    const text = GAME.generateTitleText();
    const RD = new RenderData("Adore", 16, "#0E0", "bottomText");
    
    const SQ = new Square(
      0,
      0,
      LAYER.bottomText.canvas.width,
      LAYER.bottomText.canvas.height
    );
    GAME.movingText = new MovingText(text, 4, RD, SQ);
  },
  runTitle: function () {
    if (ENGINE.GAME.stopAnimation) return;
    GAME.movingText.process();
    GAME.titleFrameDraw();
  },
  titleFrameDraw: function () {
    GAME.movingText.draw();
  },
};
var TITLE = {
  WIZARD: {
    init: function () {
      TITLE.WIZARD.actor = new ACTOR(
        "Wizard",
        TITLE.WIZARD.left,
        TITLE.WIZARD.y,
        "right",
        ASSET.Wizard
      );
      TITLE.WIZARD.dir = new Vector(1, 0);
      TITLE.WIZARD.speed = 4;
    },
    move: function () {
      TITLE.WIZARD.actor.x += TITLE.WIZARD.dir.x * TITLE.WIZARD.speed;
      TITLE.WIZARD.actor.orientation = TITLE.WIZARD.actor.getOrientation(
        TITLE.WIZARD.dir
      );
      TITLE.WIZARD.actor.animateMove(TITLE.WIZARD.actor.orientation);
      if (TITLE.WIZARD.actor.x > TITLE.WIZARD.right) {
        TITLE.WIZARD.dir = new Vector(-1, 0);
      } else if (TITLE.WIZARD.actor.x < TITLE.WIZARD.left) {
        TITLE.WIZARD.dir = new Vector(1, 0);
      }
    },
    draw: function () {
      ENGINE.clearLayer("animation");
      ENGINE.spriteDraw(
        "animation",
        TITLE.WIZARD.actor.x,
        TITLE.WIZARD.actor.y,
        TITLE.WIZARD.actor.sprite()
      );
    },
    actor: null,
    left: null,
    right: null,
    x: null,
    y: null,
    dir: null,
    speed: null
  },
  stack: {},
  main: function () {
    TITLE.title();
    TITLE.bottom();
    TITLE.hiScore();
    TITLE.side();
    TITLE.score();
    TITLE.energy();
    TITLE.lives();
    TITLE.stage();
    TITLE.radar();
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
    grad.addColorStop("0", "#CCC");
    grad.addColorStop("0.1", "#EEE");
    grad.addColorStop("0.2", "#DDD");
    grad.addColorStop("0.3", "#AAA");
    grad.addColorStop("0.4", "#999");
    grad.addColorStop("0.5", "#666");
    grad.addColorStop("0.6", "#888");
    grad.addColorStop("0.7", "#AAA");
    grad.addColorStop("0.8", "#BBB");
    grad.addColorStop("0.9", "#EEE");
    grad.addColorStop("1", "#CCC");
    GAME.grad = grad;
    CTX.fillStyle = grad;
    CTX.shadowColor = "#cec967";
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
    CTX.textAlign = "center";
    var x = ENGINE.bottomWIDTH / 2;
    var y = ENGINE.bottomHEIGHT / 2;
    CTX.font = "10px Consolas";
    CTX.fillStyle = GAME.grad;
    CTX.shadowOffsetX = 2;
    CTX.shadowOffsetY = 2;
    CTX.shadowBlur = 5;
    CTX.shadowColor = "#cec967";
    CTX.fillText("Version " + PRG.VERSION + " by Lovro Selič", x, y);
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
  hiScore: function () {
    var CTX = LAYER.title;
    var fs = 16;
    CTX.font = fs + "px Garamond";
    CTX.fillStyle = GAME.grad;
    CTX.shadowColor = "yellow";
    CTX.shadowOffsetX = 1;
    CTX.shadowOffsetY = 1;
    CTX.shadowBlur = 2;
    CTX.textAlign = "left";
    var x = 700;
    var y = 32 + fs;
    var index = SCORE.SCORE.name[0].indexOf("&nbsp");
    var HS;
    if (index > 0) {
      HS = SCORE.SCORE.name[0].substring(
        0,
        SCORE.SCORE.name[0].indexOf("&nbsp")
      );
    } else {
      HS = SCORE.SCORE.name[0];
    }
    var text =
      "HISCORE: " +
      SCORE.SCORE.value[0].toString().padStart(6, "0") +
      " by " +
      HS;
    CTX.fillText(text, x, y);
  },
  side() {
    ENGINE.clearLayer("sideback");
    ENGINE.fillLayer("sideback", "#000");
  },
  score() {
    ENGINE.clearLayer("score");
    var CTX = LAYER.score;
    var fs = 16;
    CTX.font = fs + "px Emulogic";
    CTX.fillStyle = GAME.grad;
    CTX.shadowColor = "yellow";
    CTX.shadowOffsetX = 1;
    CTX.shadowOffsetY = 1;
    CTX.shadowBlur = 2;
    CTX.textAlign = "center";
    var x = ENGINE.sideWIDTH / 2;
    var y = 48;
    CTX.fillText("SCORE", x, y);
    CTX.fillStyle = "#FFF";
    CTX.shadowColor = "#DDD";
    CTX.shadowOffsetX = 1;
    CTX.shadowOffsetY = 1;
    CTX.shadowBlur = 1;
    y += fs + 4;
    CTX.fillText(GAME.score.toString().padStart(6, "0"), x, y);
    if (GAME.score >= GAME.extraLife[0]) {
      GAME.lives++;
      GAME.extraLife.shift();
      TITLE.lives();
    }
  },
  energy: function () {
    ENGINE.clearLayer("energy");
    var CTX = LAYER.energy;
    var fs = 16;
    CTX.font = fs + "px Emulogic";
    CTX.fillStyle = GAME.grad;
    CTX.shadowColor = "yellow";
    CTX.shadowOffsetX = 1;
    CTX.shadowOffsetY = 1;
    CTX.shadowBlur = 2;
    CTX.textAlign = "center";
    var x = ENGINE.sideWIDTH / 2;
    var y = 112;
    CTX.fillText("ENERGY", x, y);
    y += fs;
    var pad = 16;
    CTX.beginPath();
    CTX.lineWidth = "1";
    CTX.strokeStyle = "#DDD";
    var energyWidth = ENGINE.sideWIDTH - 2 * pad;
    CTX.rect(pad, y, energyWidth, 32);
    CTX.closePath();
    CTX.stroke();
    CTX.fillStyle = "#DDD";
    CTX.shadowColor = "transparent";
    CTX.shadowOffsetX = 0;
    CTX.shadowOffsetY = 0;
    CTX.shadowBlur = 0;
    var percent = HERO.energy / (DEFINE[GAME.level].energy * INI.ENERGY_FACTOR);
    if (percent < 0.2 && percent > 0.1) {
      CTX.fillStyle = "yellow";
    } else if (percent <= 0.1) {
      CTX.fillStyle = "red";
    }
    CTX.fillRect(pad + 1, y + 1, Math.round(energyWidth * percent) - 2, 30);
  },
  lives: function () {
    ENGINE.clearLayer("lives");
    var CTX = LAYER.lives;
    var fs = 16;
    CTX.font = fs + "px Emulogic";
    CTX.fillStyle = GAME.grad;
    CTX.shadowColor = "yellow";
    CTX.shadowOffsetX = 1;
    CTX.shadowOffsetY = 1;
    CTX.shadowBlur = 2;
    CTX.textAlign = "center";
    var x = ENGINE.sideWIDTH / 2;
    var y = 220;
    CTX.fillText("LIVES", x, y);
    y += fs + 32;
    CTX.shadowColor = "transparent";
    CTX.shadowOffsetX = 0;
    CTX.shadowOffsetY = 0;
    CTX.shadowBlur = 0;
    var spread = ENGINE.spreadAroundCenter(GAME.lives, x, 32);
    for (let q = 0; q < GAME.lives; q++) {
      ENGINE.spriteDraw("lives", spread[q], y, SPRITE.Wizard_front_0);
    }
  },
  stage: function () {
    ENGINE.clearLayer("stage");
    var CTX = LAYER.stage;
    var fs = 16;
    CTX.font = fs + "px Emulogic";
    CTX.fillStyle = GAME.grad;
    CTX.shadowColor = "yellow";
    CTX.shadowOffsetX = 1;
    CTX.shadowOffsetY = 1;
    CTX.shadowBlur = 2;
    CTX.textAlign = "center";
    var x = ENGINE.sideWIDTH / 2;
    var y = 344;
    CTX.fillText("STAGE", x, y);
    CTX.fillStyle = "#FFF";
    CTX.shadowColor = "#DDD";
    CTX.shadowOffsetX = 1;
    CTX.shadowOffsetY = 1;
    CTX.shadowBlur = 1;
    y += fs + 4;
    CTX.fillText(GAME.level.toString().padStart(2, "0"), x, y);
  },
  radar: function () {
    ENGINE.clearLayer("radar");
    var CTX = LAYER.radar;
    var fs = 16;
    CTX.font = fs + "px Emulogic";
    CTX.fillStyle = GAME.grad;
    CTX.shadowColor = "yellow";
    CTX.shadowOffsetX = 1;
    CTX.shadowOffsetY = 1;
    CTX.shadowBlur = 2;
    CTX.textAlign = "center";
    var x = ENGINE.sideWIDTH / 2;
    var y = 420;
    CTX.fillText("RADAR", x, y);

    var pad = 20;
    y += fs;
    CTX.beginPath();
    CTX.lineWidth = "1";
    CTX.strokeStyle = "#DDD";
    CTX.rect(pad, y, ENGINE.sideWIDTH - 2 * pad, 152);
    CTX.closePath();
    CTX.stroke();
    CTX.shadowColor = "transparent";
    CTX.shadowOffsetX = 0;
    CTX.shadowOffsetY = 0;
    CTX.shadowBlur = 0;
    var orx = pad + 1;
    var ory = y + 1;
    //draw hero
    CTX.fillStyle = "#00F"; //blue
    CTX.pixelAt(
      orx + HERO.MoveState.homeGrid.x * INI.MINI_PIX,
      ory + HERO.MoveState.homeGrid.y * INI.MINI_PIX,
      INI.MINI_PIX
    );
    //draw gold
    CTX.fillStyle = "yellow";
    for (let q = 0; q < MAP[GAME.level].gold.length; q++) {
      let grid = MAP[GAME.level].gold[q];
      CTX.pixelAt(
        orx + grid.x * INI.MINI_PIX,
        ory + grid.y * INI.MINI_PIX,
        INI.MINI_PIX
      );
    }
    //draw enemy
    CTX.fillStyle = "red";
    for (let q = 0; q < ENEMY.pool.length; q++) {
      CTX.pixelAt(
        orx + ENEMY.pool[q].MoveState.homeGrid.x * INI.MINI_PIX,
        ory + ENEMY.pool[q].MoveState.homeGrid.y * INI.MINI_PIX,
        INI.MINI_PIX
      );
    }
  },
  gameOver: function () {
    ENGINE.clearLayer("text");
    var CTX = LAYER.text;
    CTX.textAlign = "center";
    var x = ENGINE.gameWIDTH / 2;
    var y = ENGINE.gameHEIGHT / 2;
    var fs = 64;
    CTX.font = fs + "px Garamond";
    var txt = CTX.measureText("GAME OVER");
    var gx = x - txt.width / 2;
    var gy = y - fs;
    var grad = CTX.createLinearGradient(gx, gy + 10, gx, gy + fs);
    grad.addColorStop("0", "#DDD");
    grad.addColorStop("0.1", "#EEE");
    grad.addColorStop("0.2", "#DDD");
    grad.addColorStop("0.3", "#CCC");
    grad.addColorStop("0.4", "#BBB");
    grad.addColorStop("0.5", "#AAA");
    grad.addColorStop("0.6", "#BBB");
    grad.addColorStop("0.7", "#CCC");
    grad.addColorStop("0.8", "#DDD");
    grad.addColorStop("0.9", "#EEE");
    grad.addColorStop("1", "#DDD");
    CTX.fillStyle = grad;
    CTX.shadowColor = "#FFF";
    CTX.shadowOffsetX = 2;
    CTX.shadowOffsetY = 2;
    CTX.shadowBlur = 3;
    CTX.fillText("GAME OVER", x, y);
  },
  gameWon: function () {
    let CTX = LAYER.text;
    ENGINE.clearLayer("text");
    ENGINE.clearLayer("animation");
    let p = ENGINE.window(ENGINE.gameWIDTH / 2, 232);
    CTX.textAlign = "center";
    let fs = 32;
    CTX.font = fs + "px Arcade";
    let y = p.y + fs * 1.5;
    let x = ENGINE.gameWIDTH / 2;
    CTX.fillStyle = "#0D0";
    CTX.shadowColor = "#0F0";
    CTX.shadowOffsetX = 1;
    CTX.shadowOffsetY = 1;
    CTX.shadowBlur = 0;
    CTX.fillText("You won!", x, y);
    y += fs * 0.9;
    CTX.fillText("--------------------------", x, y);
    CTX.shadowColor = "#000";
    CTX.shadowOffsetX = 0;
    CTX.shadowOffsetY = 0;
    CTX.shadowBlur = 0;
    let delta = 54;
    y += delta;
    TITLE.WIZARD.y = y;
    TITLE.WIZARD.x = x;
    y += delta;
    let xS = ENGINE.spreadAroundCenter(5, x, delta);
    TITLE.WIZARD.left = xS[0];
    TITLE.WIZARD.right = xS[4];
    for (let q = 0; q < 5; q++) {
      ENGINE.spriteDraw("text", xS[q], y, SPRITE.GoldBarBig);
    }
  },
  endLevel: function () {
    let CTX = LAYER.text;
    let p = ENGINE.window(ENGINE.gameWIDTH / 2, 232);
    CTX.textAlign = "center";
    let fs = 16;
    CTX.font = fs + "px Adore";
    let y = p.y + fs * 3;
    let x = ENGINE.gameWIDTH / 2;
    CTX.fillStyle = "#CCC";
    CTX.shadowColor = "yellow";
    CTX.shadowOffsetX = 1;
    CTX.shadowOffsetY = 1;
    CTX.shadowBlur = 0;
    CTX.fillText(
      "Level " + GAME.level.toString().padStart(2, "0") + " complete",
      x,
      y
    );
    y += fs * 1.3;
    CTX.fillText("-----------------", x, y);
    y += fs * 1.3;
    CTX.fillText(
      "Time bonus: " + HERO.energy.toString().padStart(5, "0"),
      x,
      y
    );
    y += fs * 1.3;
    let bonus =
      INI.LEVEL_BONUS + (GAME.level - 1) * (INI.LEVEL_BONUS * INI.LEVEL_FACTOR);
    CTX.fillText("Stage bonus: " + bonus.toString().padStart(5, "0"), x, y);
    GAME.score += HERO.energy;
    GAME.score += bonus;
    TITLE.score();
    y += 3 * fs * 1.3;
    fs = 14;
    CTX.font = fs + "px Adore";
    CTX.fillText("Press ENTER to continue", x, y);
  },
  music: function () {
    AUDIO.Title.play();
  },
  startTitle: function(){
    if (AUDIO.Title) AUDIO.Title.play();
    ENGINE.clearLayer("text");
    ENGINE.clearLayer("animation");
    ENGINE.clearLayer("actors");
    ENGINE.clearLayer("explosion");
    
    TITLE.background();
    TITLE.side();
    ENGINE.draw("background", 0, 0, TEXTURE.GhostRun_cover);
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
    let x = 36;
    let y = 720;
    let w = 166;
    let h = 24;
    let startBA = new Area(x, y, w, h);
    let buttonColors = new ColorInfo("#F00", "#A00", "#222", "#666", 13);
    let musicColors = new ColorInfo("#0E0", "#090", "#222", "#666", 13);

    FORM.BUTTON.POOL.push(
      new Button("Start game", startBA, buttonColors, PRG.start)
    );
    const sg = localStorage.getItem(PRG.SG);
    x += 1.2 * w;
    let music = new Area(x, y, w, h);
    FORM.BUTTON.POOL.push(
      new Button("Play title music", music, musicColors, TITLE.music)
    );
    FORM.BUTTON.draw();
    $(ENGINE.topCanvas).mousemove(ENGINE.mouseOver);
    $(ENGINE.topCanvas).click(ENGINE.mouseClick);
  },
  restartTitle: function () {
    console.log("drestartTitle");
    TITLE.drawButtons();
  },
};

$(function () {
  PRG.INIT();
  SPEECH.init();
  PRG.setup();
  ENGINE.LOAD.preload();
  SCORE.init("SC", "GhostRun", 10, 2500);
  SCORE.loadHS();
  SCORE.hiScore();
  SCORE.extraLife = [
    10000,
    20000,
    30000,
    40000,
    50000,
    60000,
    70000,
    80000,
    90000,
    100000,
    Infinity
  ];
  BACKUP_MAP = $.extend(true, {}, MAP);
});
