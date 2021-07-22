// coded by Lovro Selic , C00lSch00l 2015
// version 1.03

var dieElement = "<div class='dice'><canvas></canvas></div>";
var answerElement = "<div id='enter'>Enter the sum of all the dots: <input id='inp' type='text'/></div>";
var hiscore = [200, 100, 50, 20, 10];
var hiscore_name = ['C00lSch00l', 'C00lSch00l', 'C00lSch00l', 'C00lSch00l', 'C00lSch00l'];
var Round, maxRound, solution, score, timeA, timeB, myBlink, myWink;
var sizeWink = 5;
var direction = 1;
var winkCC = 100;
var winkDir = 1;

$(document).ready(function () {
    loadHS();
    hiScore();

    $("form").bind("keypress", function (e) {
        if (e.keyCode === 13) {
            return false;
        }
    });

    $("#randomize").click(function () {
        if (this.checked) {
            $("#dice").prop("disabled", true);
        } else {
            $("#dice").prop("disabled", false);
        }
    });

    $("#dice").focusout(function () {
        var temp = $(this).val();
        $(this).val(validateInput(temp, 2, 6, 3));
    });

    $("#rounds").focusout(function () {
        var temp = $(this).val();
        $(this).val(validateInput(temp, 5, 25, 10));
    });

    $("#start").click(function () {
        disableSetup();
        maxRound = $("#rounds").val();
        $("#roll").prop("disabled", false);
        Round = 1;
        $("#roundCounter").html(Round);
        $("#score_container").html("Score: <span id='score'></span>");
        score = 0;
        $("#score").html(score);
        $("#enter").hide();
        myBlink = setInterval(blink, 2000);
    });

    $("#roll").click(function () {
        $("#roll").prop("disabled", true);
        clearInterval(myBlink);
        myWink = setInterval(wink, 300);
        cycle();
    });

    $("#message").on('keypress', '#inp', function (event) {
        if (event.which === 13) {
            event.preventDefault();
            checkResult();
        }
    });
});

////////////////////////////////////////

function checkResult() {
    myBlink = setInterval(blink, 2000);
    clearInterval(myWink);
    var d = new Date();
    timeB = d.getTime();
    var diff = Math.floor((timeB - timeA) / 1000);
    var userInput = $("#inp").val();
    userInput = userInput.trim().toUpperCase();
    var temp = solution;
    solution = numToWord(solution).toUpperCase();
    if (solution === userInput) {
        $("#inp").replaceWith("<span class='right'>" + solution + "</span>");
        score += 10 + temp + Math.floor(score / diff);
        $("#score").html(score);
    } else {
        $("#inp").replaceWith("<span class='wrong'>" + userInput + "</span>" + " <span class='shouldbe'>" + solution + "</span>");
        score -= 5;
        if (score < 0) score = 0;
        $("#score").html(score);
    }
    Round++;
    if (Round > maxRound) {
        endGame();
    } else {
        $("#roll").prop("disabled", false);
    }
}

function cycle() {
    var N;
    $("#roundCounter").html(Round);
    $("#message")[0].scrollIntoView(true);
    if ($("#randomize").prop("checked") === true) {
        N = rnd(2, 6);
    } else {
        N = parseInt($("#dice").val(), 10);
    }
    solution = drawDice(N);
    $("#answers").html(answerElement);
    $("#inp").focus();
    var d = new Date();
    timeA = d.getTime();
}

function disableSetup() {
    $("#score_container").show();
    $("#message").show();
    $("#dice").prop("disabled", true);
    $("#randomize").prop("disabled", true);
    $("#rounds").prop("disabled", true);
    $("#start").prop("disabled", true);
}

function enableSetup() {
    $("#dice").prop("disabled", false);
    $("#randomize").prop("disabled", false);
    $("#rounds").prop("disabled", false);
    $("#start").prop("disabled", false);
}

function endGame() {
    clearInterval(myBlink);
    $("#score_container").html("<span class='shouldbe'>Congratulations. You managed to get " + score + " points.</span>");
    checkScore(score);
    hiScore();
    enableSetup();
}

function drawDice(howMany) {
    $("#board").html("");
    var sum = 0;
    for (var ix = 0; ix < howMany; ix++) {
        var temp = rnd(1, 6);
        addDie(ix);
        drawFace(temp, "d" + ix);
        sum += temp;
    }
    return sum;
}

function addDie(x) {
    $("#board").append(dieElement);
    $("#board div").last().attr("id", "X" + x);
    $("#X" + x + " canvas").attr("id", "d" + x);
    return;
}

function drawFace(x, id) {
    x--;
    var c = $("#" + id)[0];
    var cx = c.getContext("2d");
    img = new Image();
    img.src = '/Sprite/dice6.sprite.png';
    //img.src = 'https://www.c00lsch00l.eu/Sprite/dice6.sprite.png';
    var W = 120;
    img.onload = function () {
        cx.translate(W, 0);
        cx.rotate(Math.PI / 2);
        cx.clearRect(0, 0, W, W);
        cx.drawImage(img,
        W * x, 0, W, W,
        0, 0, W, W);
    };
    return;
}

/////////////////////////////////////////////////////

function rnd(start, end) {
    return Math.floor(Math.random() * (++end - start) + start);
}

function numToWord(N) {
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
}

function hiScore() {
    var HS = "";
    for (var hs = 1; hs <= 5; hs++) {
        HS += hs + ". " + hiscore_name[hs - 1] + " " + pad(hiscore[hs - 1]) + "<br/>";
    }
    $("#hiscore").html(HS);
    saveHS();
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

function saveHS() {
    localStorage.setItem('DA', 'OK');
    for (var xx = 0; xx < 5; xx++) {
        localStorage.setItem("DA_HName" + xx, hiscore_name[xx]);
        localStorage.setItem("DA_HScore" + xx, hiscore[xx]);
    }
}

function loadHS() {
    if (localStorage.DA === 'OK') {
        for (var zz = 0; zz < 5; zz++) {
            hiscore_name[zz] = localStorage.getItem("DA_HName" + zz);
            hiscore[zz] = localStorage.getItem("DA_HScore" + zz);
        }
    }
}

function validateInput(set, min, max, def) {
    if (isNaN(set)) return def;
    if (set < min) return min;
    if (set > max) return max;
    return set;
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

function blink() {
    $("#roll").animate({
        width: "125px",
        height: "94px"
    }, 300);
    $("#roll").animate({
        width: "100px",
        height: "75px"
    }, 300);
    return;
}

function wink() {
    //set css box-shadow
    sizeWink += direction;
    if (sizeWink >= 13 || sizeWink <= 3) {
        direction = direction * -1;
    }
    winkCC += 16 * winkDir;
    if (winkCC >= 244 || winkCC <= 63) {
        winkDir = winkDir * -1;
    }
    var winkColor = RGBtoHex(0, 0, winkCC);
    var cssTXT = "2px 0px 20px " + sizeWink + "px " + winkColor;
    $("#inp").css("box-shadow", cssTXT);
    return;
}

function RGBtoHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);

    function componentToHex(c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }
}
