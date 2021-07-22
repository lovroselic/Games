/* 
 ConvertiX
 version 1.01
 by Lovro Selic (c) C00lSch00l 2015
 */

console.clear();

VERSION = "1.01";
console.log("ConvertiX V" + VERSION + " by Lovro Selic, (c) C00lSch00l 2015");
MIN_ROUNDS = 10;
MAX_ROUNDS = 100;
DEFAULT_ROUNDS = 10;
BOARD_MAX_HEIGHT = 400;
var buttonSubmit = "<input type=button' id='submit' value='' title='Click here to submit answer or use Enter' />";

Array.prototype.sum = function () {
    var x = this.length;
    var total = 0;
    for (var y = 0; y < x; y++) {
        total += parseFloat(this[y]);
    }
    return total || -1;
};

Array.prototype.average = function () {
    var sum = this.sum();
    var x = this.length;
    return sum / x || -1;
};

var convertix = {
    round: 0,
    right: 0,
    mercyless: true,
    start: function () {
        this.round = 0;
        this.right = 0;
    }
};

var timer = {
    A: 0,
    B: 0,
    collection: []
};

var unit = function (prefix, symbol, factor) {
    this.prefix = prefix;
    this.symbol = symbol;
    this.factor = factor;
};

var units = [
    new unit("", "", 0),
    new unit("deca", "da", 1),
    new unit("hecto", "h", 2),
    new unit("kilo", "k", 3),
    new unit("mega", "M", 6),
    new unit("giga", "G", 9),
    new unit("deci", "d", -1),
    new unit("centi", "c", -2),
    new unit("mili", "m", -3),
    new unit("micro", "μ", -6),
    new unit("nano", "n", -9)];

var measure = function (name, basic_unit, unit_name, typical) {
    this.name = name;
    this.unit = basic_unit;
    this.uname = unit_name;
    this.typical = typical;
};

var measures = [
    new measure("mass", "g", "gram", [0, 1, 3, -3, -6].sort(sortNumber)),
    new measure("volume", "l", "liter", [0, 2, -1, -2, -3, -6].sort(sortNumber)),
    new measure("length", "m", "meter", [0, 3, -2, -3, -6, -9].sort(sortNumber))];

function setUp() {
    var LNM = measures.length;
    for (var ix = 0; ix < LNM; ix++) {
        $("#select").append("<option value='" + ix + "'>" + measures[ix].name.toUpperCase() + "</option>");
    }
    addUnits();
}

function addUnits() {
    var x = parseInt($("#select").val(), 10);
    var TL = measures[x].typical.length;
    $("#unit").html("");
    for (var ix = 0; ix < TL; ix++) {
        var sym = searchUnits(measures[x].typical[ix]);
        $("#unit").append("<option value='" + sym + measures[x].unit + "'>" + sym + measures[x].unit + "</option>");
    }
}

function SearchObject(thisIsKnown, knownPropertyName, weSeekThisProperty) {
    var UL = units.length;
    for (var ix = 0; ix < UL; ix++) {
        if (thisIsKnown == units[ix][knownPropertyName])
            return units[ix][weSeekThisProperty];
    }
    return false;
}

function searchUnits(ind) {
    return SearchObject(ind, "factor", "symbol");
}

function searchFactor(ind) {
    return SearchObject(ind, "symbol", "factor");
}

function decimalPlaces(num) {
    var match = ('' + num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
    if (!match) {
        return 0;
    }
    return Math.max(
            0, (match[1] ? match[1].length : 0) - (match[2] ? +match[2] : 0));
}

function disableSetup(bool) {
    var selection = $("#panel1").children();
    var IL = selection.length;
    for (var xx = 0; xx < IL; xx++) {
        $(selection[xx]).prop('disabled', bool);
    }
}

function game() {
    $("#board").addClass("win");
    $("#board").removeClass("vertical");
    $("#board").css('height', 'auto');
    $("#board").html("");
    disableSetup(true);
    convertix.start();

    if ($("#mercyless").prop("checked") === true) {
        convertix.mercyless = true;
    } else {
        convertix.mercyless = false;
    }
    newLine();
}

function newLine() {
    convertix.round++;
    var MSR_x = rnd(1, measures.length) - 1;
    var MSR = measures[MSR_x].unit;
    var maxMSR_x = measures[MSR_x].typical.length - 1;
    var UNT_x = rnd(0, maxMSR_x);
    var UNT_factor1 = measures[MSR_x].typical[UNT_x];
    var quiz = [];
    if (UNT_x < maxMSR_x) {
        quiz.push(UNT_x + 1);
    }
    if (convertix.mercyless && UNT_x + 1 < maxMSR_x) {
        quiz.push(UNT_x + 2);
    }
    if (UNT_x > 0) {
        quiz.push(UNT_x - 1);
    }
    if (convertix.mercyless && UNT_x > 1) {
        quiz.push(UNT_x - 2);
    }
    var UNT_factor2 = measures[MSR_x].typical[quiz[rnd(0, quiz.length - 1)]];
    var NMBR = createNumber();
    var txtWrite = "<p id='P" + convertix.round + "'><span class='shouldbe'>" + convertix.round + ". </span>" + NMBR + " " + searchUnits(UNT_factor1) + MSR + " = ";
    txtWrite += "<input type='text' maxlength='10' size='10' id='answer'/> ";
    txtWrite += searchUnits(UNT_factor2) + MSR + " " + buttonSubmit + "</p>";
    print(txtWrite);
    $("#answer").focus();
    var difference = UNT_factor1 - UNT_factor2;
    var result = NMBR * Math.pow(10, difference);
    var dec = decimalPlaces(NMBR);
    var adjust = dec - difference;
    if (difference >= dec) {
        result = parseInt(Math.round(result), 10);
    } else {
        result = result.toFixed(adjust);
    }
    convertix.result = result;
    timer.A = window.performance.now();
    var height = $("#board").css("height");
    height = cssToInt(height);
    if (height > BOARD_MAX_HEIGHT) {
        //cont here
        $("#board").addClass("vertical");
        $("#board").height(BOARD_MAX_HEIGHT);
    }
    $("#P" + convertix.round)[0].scrollIntoView();
}

function showHelp() {
    $("#board").addClass("win");
    $("#board").html("");
    var value = parseFloat($("#help_val").val());
    if (isNaN(value)) {

        $("#board").removeClass("win");
        alert("Please enter a number.");
        return;
    }
    var dec = decimalPlaces(value);
    var selectedUnit = $("#unit").val();
    var preText = value + " " + selectedUnit + " = ";
    var x = parseInt($("#select").val(), 10);
    var TL = measures[x].typical.length;
    var idx = selectedUnit.indexOf(measures[x].unit);
    var selectedSymbol = selectedUnit.substring(0, idx);
    var factor = searchFactor(selectedSymbol);
    for (var ix = 0; ix < TL; ix++) {
        var difference = factor - measures[x].typical[ix];
        var apText = value * Math.pow(10, difference);
        var adjust = dec - difference;
        if (difference >= dec) {
            apText = parseInt(Math.round(apText), 10);
        } else {
            apText = apText.toFixed(adjust);
        }
        apText += " " + searchUnits(measures[x].typical[ix]);
        apText += measures[x].unit;
        print(preText + apText);
    }
}

function createNumber() {
    var seed, exp, fix, test;
    do {
        seed = Math.random();
        if (convertix.mercyless) {
            exp = rnd(0, 4);
        } else {
            exp = rnd(1, 2);
        }
        if (convertix.mercyless) {
            fix = rnd(0, 3);
        } else {
            fix = rnd(0, 1);
        }
        seed = seed * Math.pow(10, exp);
        seed = seed.toFixed(fix);
        if (convertix.mercyless) {
            test = 0.001;
        } else {
            test = 0.1;
        }
    } while (seed < 0.1);
    return seed;
}

function checkResult() {
    timer.B = window.performance.now();
    var lapse = getTime();
    timer.collection.push(lapse);
    var userInput = $("#answer").val().toString(10);
    if (userInput === convertix.result.toString(10)) {
        $("#answer").replaceWith("<span class='right'>" + convertix.result.toString(10) + "</span>");
        $("#submit").remove();
        convertix.right++;
    } else {
        $("#answer").replaceWith("<span class='wrong'>" + userInput + "</span> ---> <span class='shouldbe'>" + convertix.result.toString(10) + "</span>");
        $("#submit").remove();
    }

    if (convertix.round >= convertix.how_many) {
        endGame();
    } else {
        newLine();
    }
}

function endGame() {
    disableSetup(false);
    var grade = convertix.right / convertix.round * 100;
    print("<br>");
    print("Your accuracy: " + grade + "%. " + getGrade(grade));
    print("<p id='last'>Your average response time: " + timer.collection.average().toFixed(1) + " seconds.</p>");
    $("#last")[0].scrollIntoView();
}

function getTime() {
    var lapse = (timer.B - timer.A) / 1000;
    lapse = lapse.toFixed(2);
    return lapse;
}

//Main
$(document).ready(function () {
    $("#version").html("ConvertiX version "+ VERSION);
    setUp();

    $("#select").click(function () {
        addUnits();
    });

    $("#help").click(function () {
        showHelp();
    });

    $("#how_many").focusout(function () {
        var temp = $(this).val();
        $(this).val(validateInput(temp, MIN_ROUNDS, MAX_ROUNDS, DEFAULT_ROUNDS));
    });

    $("#game").click(function () {
        convertix.how_many = $("#how_many").val();
        game();
    });

    $("#board").on("keypress", "#answer", function (a) {
        if (a.which == 13) {
            a.preventDefault();
            checkResult();
        }
    });

    $("#board").on("click", "#submit", function () {
        checkResult();
    });

});

//Library
function cssToInt(str) {
    var x = str.indexOf("px");
    var y = str.substring(0, x);
    return parseInt(y, 10);
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

function print(data) {
    outp(data, "p");

    function outp(data, tag) {
        $("#board").append("<" + tag + ">" + data + "</" + tag + ">");
    }
}

function rnd(start, end) {
    return Math.floor(Math.random() * (++end - start) + start);
}

function getGrade(a) {
    switch (true) {
        case (a === 100):
            return "Amazing! Perfect score.";
        case (a > 95):
            return "Excellent";
        case (a > 90):
            return "Very well done.";
        case (a > 80):
            return "Nice.";
        case (a >= 70):
            return "Hmmm. Play again and try to do better.";
        case (a < 70):
            return "This was not good. You should practice more.";
    }
}

function sortNumber(a, b) {
    return a - b;
}


