// coded by Lovro Selic , C00lSch00l 2014, 2015
// version 1.07.02
console.log("Racing Shapes - coded by Lovro Selic , C00lSch00l 2014, 2015; version 1.07");

var hiscore = [100, 75, 50, 25, 15];
var hiscore_name = ['C00lSch00l', 'C00lSch00l', 'C00lSch00l', 'C00lSch00l', 'C00lSch00l'];
var gameID = "RS";

var Racer = function (name, shape, color, speed, position) {
    this.name = name;
    this.shape = shape;
    this.color = color;
    this.speed = speed;
    this.position = position;
};

var timeA, timeB;
var racersObj = [];
var howManyRacers = 8;
var shapes = ['circle', 'square', 'rectangle', 'triangle'];
var colorCollection = ['red', 'green', 'blue', 'yellow', 'black', 'white', 'brown', 'orange', 'grey', 'purple', 'pink', 'cyan'];
var inpField = "<form action =''><input type='text' id='odgovor' size='16' name='odgovor' /></form>";
var button = "<input type=button' id='submit' value='' title='Click here to submit answer or use Enter' />";
var timerFlag = false;

$(document).ready(function () {
    var gameType, score, NLaps, Solution;

    $("form").bind("keypress", function (e) {
        if (e.keyCode == 13) {
            return false;
        }
    });

    loadHS();
    hiScore();

    $("#help h3").click(function () {
        $("#colours").toggle(500, "swing");
    });

    $("#help2 h3").click(function () {
        $("#shape").toggle(500, "swing");
    });

    $("#start").click(function () {
        gameStart();
    });
    $("#race").click(function () {
        countDown();
    });
    $("#panel").on('keypress', '#odgovor', function (event) {
        if (event.which == 13) {
            event.preventDefault();
            checkResult();
        }
    });

    $("#panel").on('click', '#submit', function () {
        checkResult();
    });

    $("#laps").focusout(function () {
        var temp = $(this).val();
        $(this).val(validateInput(temp, 5, 25, 10));
    });
    $("#next").click(function () {
        nextRace();
    });
});

function hiScore() {
    var HS = "";
    for (var hs = 1; hs <= 5; hs++) {
        HS += hs + ". " + hiscore_name[hs - 1] + " " + pad(hiscore[hs - 1], 5) + "<br/>";
    }
    $("#hiscore").html(HS);
    saveHS();
    return;
}

function saveHS() {
    localStorage.setItem(gameID, 'OK');
    for (var xx = 0; xx < 5; xx++) {
        localStorage.setItem(gameID + "_HName" + xx, hiscore_name[xx]);
        localStorage.setItem(gameID + "_HScore" + xx, hiscore[xx]);
    }
}

function loadHS() {
    if (localStorage[gameID] === 'OK') {
        for (var zz = 0; zz < 5; zz++) {
            hiscore_name[zz] = localStorage.getItem(gameID + "_HName" + zz);
            hiscore[zz] = localStorage.getItem(gameID + "_HScore" + zz);
        }
    }
}

function checkScore(xxx) {
    var start = 4;
    while (xxx > hiscore[start] && start >= 0) {
        start--;
    }
    start++;
    if (start === 5) {
        return;
    } else {
        var yourName = prompt("You reached top 5 score. Enter your name (max 10 characters): ");
        if (yourName.length > 10) {
            yourName = yourName.substring(0, 10);
        } else if (yourName.length < 10) {
            var temp = 10 - yourName.length;
            var sub = stringFill("&nbsp", temp);
            yourName += sub;
        }
        hiscore.splice(start, 0, xxx);
        hiscore_name.splice(start, 0, yourName);
        hiscore.splice(5, 1);
        hiscore_name.splice(5, 1);
    }
    $("#setup")[0].scrollIntoView();
    return;
}

function stringFill(x, n) {
    var s = '';
    for (;;) {
        if (n & 1) s += x;
        n >>= 1;
        if (n) x += x;
        else break;
    }
    return s;
}

function pad(x) {
    var s = "\u0020\u0020\u0020\u0020\u0020" + x;
    return s.substring(s.length - 5);
}

function endGame() {
    $("#RTG").hide();
    $("#next").prop("disabled", true);
    $("#start").prop("disabled", false);
    $("#message").html("<span class='shoudlbe'>Congratulations. You managed to get " + score + " points.</span>");
    checkScore(score);
    hiScore();
    $("input[name='quest']").prop("disabled", false);
    $("#laps").prop("disabled", false);
    return;
}

function nextRace() {
    $("#next").prop("disabled", true);
    $("#message").html("");
    $("#count").hide();
    hideRacers();
    getReady();
    Solution = askQuestion();
    $("#race").prop("disabled", false);
    return;
}

function hideRacers() {
    for (var xi = 1; xi <= howManyRacers; xi++) {
        var id = "#R" + xi;
        $(id).remove();
    }
    return;
}

function trimInput(INP) {
    INP = INP.trim().toLowerCase();
    var ind = INP.indexOf(" ");
    if (ind != -1) {
        var subS1 = INP.substring(0, ind);
        var subS2 = INP.substring(ind);
        INP = subS1.trim() + " " + subS2.trim();
    }
    return INP;
}

function checkResult() {
    var d = new Date();
    timeB = d.getTime();
	if (timerFlag){
		var diff = Math.floor((timeB - timeA) / 1000);
	} else {
		var diff = 1;
	}
    var userInput = $("#odgovor").val();
    userInput = trimInput(userInput);
    if (userInput === Solution) {
        $("#answer form").hide();
        $("#submit").hide();
        $("#answer p").append("<span class='right'>" + Solution + ".</span>");
        $("#message").html("<span class='right'>Excellent!</span>");
        score += 10 + Math.floor(score / 4) + Math.floor(score / diff);
        $("#score").text(score);
    } else {
        $("#answer form").hide();
        $("#submit").hide();
        $("#answer p").append("<span class='wrong'>" + userInput + "</span>");
        $("#answer p").append("&nbsp <span class='shouldbe'>" + Solution + ".</span>");
        $("#message").html("<span style='color:red'>Wrong!</span>");
        score -= 5;
        if (score < 0) score = 0;
        $("#score").text(score);
    }
    NLaps--;
    $("#togo").text(NLaps);
    if (!NLaps) {
        endGame();
        return;
    }
    $("#next").prop("disabled", false);
    $("#panel")[0].scrollIntoView();
    return;
}

function gameStart() {
    $("#panel")[0].scrollIntoView();
    $("#RTG").show();
    $("#message").html("");
    $("input[name='quest']").prop("disabled", true);
    $("#start").prop("disabled", true);
    $("#laps").prop("disabled", true);
    $("#race").prop("disabled", false);
    gameType = determineGameType();
    score = 0;
    $("#score").text(score);
    NLaps = parseInt($("#laps").val(), 10);
    $("#togo").text(NLaps);
    hideRacers();
    getReady();
    Solution = askQuestion();
    return;
}

function askQuestion() {
    var LL = gameType.length;
    if (LL > 1) {
        solution = gameType[rnd(0, LL - 1)]();
    } else {
        solution = gameType[0]();
    }
    return solution;
}

function getReady() {
    prepareRacers(howManyRacers);
    setSpeed();
    determinePosition();
    return;
}

function determineGameType() {
    var $quest = $("input[name='quest']");
    var tipIger = [findShape, findPosition];
    if ($quest[0].checked === true) {
        tipIger.splice(0, 1);
    } else if ($quest[1].checked === true) {
        tipIger.splice(1, 1);
    }
    return tipIger;
}

function createPossible(colorCollection, shapes) {
    var temp = [];
    var field;
    for (var i = 0; i < colorCollection.length; i++) {
        for (var j = 0; j < shapes.length; j++) {
            field = colorCollection[i] + "_" + shapes[j];
            temp.push(field);
        }
    }
    return temp;
}

function countDown() {
	timerFlag = false;
    $("#board")[0].scrollIntoView();
    $("#race").prop("disabled", true);
    var sec = 5;
    $("#count").show();
    $('#count span').text(sec);
    var timer = setInterval(function () {
        $('#count span').text(sec--);
        if (sec == -1) {
            RACE();
            $("#odgovor").prop("disabled", false);
            $("#submit").prop("disabled", false);
            var myVar = setTimeout(function () {
                $("#odgovor").focus();
                var d = new Date();
                timeA = d.getTime();
				timerFlag = true;
            }, 6100);
            clearInterval(timer);
        }
    }, 1000);
    return;
}

function RACE() {
    for (var xi = 1; xi <= howManyRacers; xi++) {
        var id = "#R" + xi;
        $(id).animate({
            left: "+=912"
        }, racersObj[xi - 1].speed);
    }
    return;
}

function rnd(start, end) {
    return Math.floor(Math.random() * (++end - start) + start);
}

function setShape(id, shape, color) {
    var prepClass = color + " " + shape;
    var stringy = "<div id ='" + id + "' class='" + prepClass + "'></div>";
    $("#board").append(stringy);
    return;
}

function prepareRacers(num) {
    var pool = createPossible(colorCollection, shapes);
    for (var ix = 1; ix <= num; ix++) {
        racersObj[ix - 1] = new Racer("R" + ix);
        var poolLength = pool.length;
        var idx = rnd(0, poolLength - 1);
        var description = pool.splice(idx, 1);
        var ti = description[0].indexOf("_");
        var color = description[0].substring(0, ti);
        racersObj[ix - 1].color = color;
        var shape = description[0].substring(ti + 1);
        racersObj[ix - 1].shape = shape;
        if (shape === "triangle") {
            color = description[0];
        }
        var id = "R" + ix;
        setShape(id, shape, color);
    }
    return;
}

function setSpeed() {
    var tempSpeed = [];
    var speedPool = [];
    for (var xx = 10; xx < 31; xx++) {
        speedPool.push(xx);
    }
    for (var xy = 0; xy < howManyRacers; xy++) {
        var LL = speedPool.length;
        var sp = speedPool.splice(rnd(0, LL - 1), 1);
        tempSpeed.push(sp[0] * 200);
        racersObj[xy].speed = tempSpeed[xy];
    }
    return tempSpeed;
}

function determinePosition() {
    var tempSP = [];
    for (var ix = 0; ix < howManyRacers; ix++) {
        tempSP.push(racersObj[ix].speed);
    }
    tempSP.sort(sortNumber);
    for (var i = 0; i < howManyRacers; i++) {
        var where = tempSP.indexOf(racersObj[i].speed);
        racersObj[i].position = ++where;
    }
    return;
}

function sortNumber(a, b) {
    return a - b;
}

function numToOrd(enica) {
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
}

function ordToNum(enica) {
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

function findPosition() {
    var question = "<p>Tell me the finishing position of the ";
    var answerPretext = "<p>The ";
    var x = rnd(0, 7);
    question += racersObj[x].color;
    answerPretext += racersObj[x].color;
    question += " ";
    answerPretext += " ";
    question += racersObj[x].shape;
    answerPretext += racersObj[x].shape;
    answerPretext += " came </p>";
    question += ".</p>";
    $("#question").html(question);
    var answer = numToOrd(racersObj[x].position);
    answerPretext += inpField + button;
    $("#answer").html(answerPretext);
    $("#odgovor").prop("disabled", true);
    $("#submit").prop("disabled", true);
    return answer;
}

function findShape() {
    var question = "<p>Tell me which shape finishes ";
    var answerPretext = "<p>The ";
    var x = rnd(0, 7);
    question += numToOrd(racersObj[x].position);
    answerPretext += numToOrd(racersObj[x].position);
    answerPretext += " shape through finish line was the </p>";
    question += ".</p>";
    $("#question").html(question);
    var answer = racersObj[x].color;
    answer += " ";
    answer += racersObj[x].shape;
    answerPretext += inpField + button;
    $("#answer").html(answerPretext);
    $("#odgovor").prop("disabled", true);
    $("#submit").prop("disabled", true);
    return answer;
}

function validateInput(set, min, max, def) {
    if (isNaN(set)) return def;
    if (set < min) return min;
    if (set > max) return max;
    return set;
}