// coded by Lovro Selic , C00lSch00l 2014
// version 1.00.04

var answer, correctAnswers;
var button = "<input type=button' id='submit' value='' title='Click here to submit answer or use Enter' />"

$(document).ready(function () {
    func20 = [postevanka20, deljenka20, sestevanka20, odstevanka20];
    func99 = [postevanka, deljenka, sestevanka, odstevanka];
    $("form").bind("keypress", function (e) {
        if (e.keyCode == 13) {
            return false;
        }
    });

    $("#start").click(function () {
        $("#board table tbody").html("");
        $("#result").html("");
        $("#window").show();
        $("#board").fadeIn(400);
        $("#board")[0].scrollIntoView(true);
        $("#start").prop("disabled", true);
        $("input[name='oper']").prop("disabled", true);
        $("input[name='conver']").prop("disabled", true);
        $("input[name='range']").prop("disabled", true);
        correctAnswers = 0;
        selectedOperation = [];
        testChecks();
        stRacGlobal = $("#strac").val();
        toGo = stRacGlobal;
        toGo--;
        answer = createLine(stRacGlobal - toGo);
    });
    $("#board").on('keypress', '#inp', function (event) {
        if (event.which == 13) {
            event.preventDefault();
            checkResult();
        }
    });
    $("#board").on('click', '#submit', function () {
        checkResult();
    });
    $("#convert_none ").click(function () {
        if (this.checked) {
            $('#convert_operands').prop('checked', false);
            $('#convert_result').prop('checked', false);
        }
    });
    $("#convert_operands ").click(function () {
        if (this.checked) {
            $('#convert_none').prop('checked', false);
        }
    });
    $("#convert_result ").click(function () {
        if (this.checked) {
            $('#convert_none').prop('checked', false);
        }
    });
    $("#strac").focusout(function () {
        var temp = $(this).val();
        if (isNaN(temp)) {
            $(this).val("10");
        }
        if (temp < 5) {
            $(this).val("5");
        }
        if (temp > 50) {
            $(this).val("50");
        }
    });
});

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

function testChecks() {
    $oper = $("input[name='oper']");
    var loopLength = $oper.length;
    var count = 0;
    var types = [];
    if ($("#to99").prop('checked') === true) {
        types = func99;
    } else {
        types = func20;
    }
    for (var i = 0; i < loopLength; i++) {
        if ($oper[i].checked === true) {
            count++;
            selectedOperation.push(types[i]);
        }
    }
    if (!count) {
        alert("At least one arithmetic operation must be selected.");
        return count;
    }
}


function createLine(N) {
    var $line = "";
    $line += "<tr><td>" + N + ". </td>";
    var NN = selectedOperation.length;
    var xN = rnd(1, NN);
    var data = selectedOperation[xN - 1]();
    if ($("#convert_operands").prop('checked') === true) {
        data[0] = numToWord(data[0]);
        data[1] = numToWord(data[1]);
    }
    $line += "<td>" + data[0] + "</td><td>" + data[2] + "</td><td>" + data[1] + "</td><td>=</td>";
    $line += "<td><input class='fill' id='inp'/>" + button + "</td></tr>";
    $("#board table tbody").append($line);
    $("#inp").focus();
    return data[3];
}

function postevanka() {
    var result = [];
    var x, y, z;
    x = rnd(1, 10);
    y = rnd(1, 10);
    if (x === 10 && y === 10) {
        x--;
    }
    z = x * y;
    result[0] = x;
    result[1] = y;
    result[2] = '*';
    result[3] = z;
    return result;
}

function postevanka20() {
    var result = [];
    var x, y, z;
    x = rnd(1, 6);
    z = Math.floor(20 / x);
    y = rnd(1, z);
    z = x * y;
    result[0] = x;
    result[1] = y;
    result[2] = '*';
    result[3] = z;
    return result;
}

function deljenka() {
    var result = [];
    var x, y, z;
    x = rnd(1, 10);
    y = rnd(1, 10);
    if (x === 10 && y === 10) {
        x--;
    }
    z = x * y;
    result[0] = z;
    result[1] = y;
    result[2] = '/';
    result[3] = x;
    return result;
}

function deljenka20() {
    var result = [];
    var x, y, z;
    x = rnd(1, 6);
    z = Math.floor(20 / x);
    y = rnd(1, z);
    z = x * y;
    result[0] = z;
    result[1] = y;
    result[2] = '/';
    result[3] = x;
    return result;
}

function sestevanka() {
    var result = [];
    var x, y, z;
    x = rnd(1, 85);
    y = rnd(1, 99 - x);
    z = x + y;
    result[0] = x;
    result[1] = y;
    result[2] = '+';
    result[3] = z;
    return result;
}

function sestevanka20() {
    var result = [];
    var x, y, z;
    x = rnd(1, 85);
    y = rnd(1, 20 - x);
    z = x + y;
    result[0] = x;
    result[1] = y;
    result[2] = '+';
    result[3] = z;
    return result;
}

function odstevanka() {
    var result = [];
    var x, y, z;
    x = rnd(1, 85);
    y = rnd(1, 99 - x);
    z = x + y;
    result[0] = z;
    result[1] = y;
    result[2] = '-';
    result[3] = x;
    return result;
}

function odstevanka20() {
    var result = [];
    var x, y, z;
    x = rnd(1, 17);
    y = rnd(1, 20 - x);
    z = x + y;
    result[0] = z;
    result[1] = y;
    result[2] = '-';
    result[3] = x;
    return result;
}

function rnd(start, end) {
    return Math.floor(Math.random() * (++end - start) + start);
}

function checkResult() {
    var userInput = $("#inp").val();
    var conv = $("#convert_result").prop('checked');
    if (conv) {
        answer = numToWord(answer);
        userInput = userInput.trim().toLowerCase();
    }
    if (userInput == answer) {
        $("#inp").replaceWith("<span class='right'>" + answer + "</span>");
        correctAnswers++;
    } else {
        $("#inp").replaceWith("<span class='wrong'>" + userInput + "</span>" + " --> <span class='shouldbe'>" + answer + "</span>");
    }
    $("#submit").remove();
    if (!toGo) {
        end();
        return;
    }
    toGo--;
    answer = createLine(stRacGlobal - toGo);
    return;
}

function end() {
    $("#start").prop("disabled", false);
    $("input[name='oper']").prop("disabled", false);
    $("input[name='conver']").prop("disabled", false);
    $("input[name='range']").prop("disabled", false);
    var score = Math.floor((correctAnswers / stRacGlobal) * 100);
    var grade = getGrade(score);
    $("#result").html("<p>Your result: " + score + "%. " + grade + "</p>");
}

function getGrade(score) {
    switch (true) {
        case (score == 100):
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
}