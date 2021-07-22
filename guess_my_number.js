// coded by Lovro Selic , C00lSch00l 2014
// version 1.04.005 

$(document).ready(function () {
    $("#begin").click(function () {
        $("#GB").prop("disabled", false);
        $("#guess").prop("disabled", false);
        $("#begin").prop("disabled", true);
		$("input[name='level']").prop("disabled", true);
        startNewGame();
    });
    $("#GB").click(function () {
        checkNumber();
    });
	$("#guess").keypress(function (event) {
        if (event.which == 13) {
            event.preventDefault();
            checkNumber();
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

function outp(data, tag) {
    $("#page").append("<" + tag + ">" + data + "</" + tag + ">");
}

function cls() {
    $("#page").html("");
}

function rnd(start, end) {
    return Math.floor(Math.random() * (++end - start) + start);
}

function maxn() {
    $level = $("input[name='level']");
    var loopLength = $level.length;
    for (var i = 0; i < loopLength; i++) {
        if ($level[i].checked === true) {
            lvl = $level[i].value;
        }
    }
    switch (lvl) {
        case "1":
            return 10;
        case "2":
            return 20;
        case "3":
            return 99;
        default:
            break;
    }
}

function startNewGame() {
	$("#page")[0].scrollIntoView();
    question = [];
    question[0] = 'Which number have I thought of?';
    question[1] = 'Which number is in my mind?';
    question[2] = 'Can you guess my number?';
    question[3] = 'Do you know which number is it?';
    question[4] = 'Do you have any idea which number is it?';
    question[5] = 'Try to guess it.';
    question[6] = 'How about you try to guess it?';
    question[7] = 'Go ahead, guess it.';
    question[8] = 'How about guessing it.';
    think = [];
    think[0] = 'I have thought of a number between 1 and ';
    think[1] = 'I am thinking of a number between 1 and ';
    think[2] = 'There is a number in my mind between 1 and ';
    think[3] = 'I have picked a number between 1 and ';
    think[4] = "There's this number I have in my mind between 1 and ";
    response = [];
    response[0] = 'No, no. My number is ';
    response[1] = 'Absolutely not. It is ';
    response[2] = 'No. The number I thought of is ';
    response[3] = 'Wrong. My number is ';
    response[4] = 'You are mistaken. My number is ';
    response[5] = 'Not true. My number is ';
    response[6] = 'You must be joking. It is ';
    response[7] = 'No, no, no. It is ';
    response[8] = 'Never. My number is ';
    response[9] = 'Your number is .... Wrong!. And my number is ';
    correct = [];
    correct[0] = 'Correct!';
    correct[1] = 'Bravo!';
    correct[2] = 'Well done!';
    correct[3] = 'That is right!';
    correct[4] = 'That is correct!';
    correct[5] = 'Excellent!';
    correct[6] = 'True!';
    correct[7] = 'Awesome!';
    correct[8] = 'Good job!';
    correct[9] = 'Great';
    correct[10] = 'Indeed it is.';
    correct[11] = 'Perfect!';
    correct[12] = 'Respect!';
    correct[13] = 'Top notch!';
    correct[14] = "Congratulations! You've nailed it!";
    cls();
    var line = think[rnd(1, think.length) - 1];
    line += maxn() + ". ";
    line += question[rnd(1, question.length) - 1];
    outp(line, "h3");
    myNumber = rnd(1, maxn());
    console.log(myNumber); //debug
    cnt = 1;
	$("#guess").focus();
}

function checkNumber() {
    userInput = document.getElementById('guess').value;
    line = cnt + ". ";
    line += "(" + userInput.toUpperCase() + "): ";
    if (!isNaN(userInput)) {
        line += "No numbers allowed. Please, spell the number correctly.";
        outp(line, "p");
        cnt++;
        scrollDown('page');
        return;
    }
    userInput = wordToNum(userInput);
    if (userInput === -1) {
        line += "I don't understand this. Please, check the spelling.";
        outp(line, "p");
        cnt++;
        scrollDown('page');
        return;
    }

    if (userInput == myNumber) {
        line += correct[rnd(1, correct.length) - 1];
        line += ' It took you ' + cnt;
        if (cnt === 1) {
            line += ' turn.';
        } else {
            line += ' turns.';
        }
        outp(line, "p");
        outp("Congratulations!", "h1");
		$("#GB").prop("disabled", true);
        $("#guess").prop("disabled", true);
        $("#begin").prop("disabled", false);
		$("input[name='level']").prop("disabled", false);
    } else if (userInput > myNumber) {
        line += response[rnd(1, response.length) - 1];
        line += ' LOWER.';
        outp(line, "p");
    } else {
        line += response[rnd(1, response.length) - 1];
        line += ' HIGHER.';
        outp(line, "p");
    }
    cnt++;
    scrollDown('page');
	$("#guess").val("");
}

function scrollDown(id) {
    var objDiv = document.getElementById(id);
    objDiv.scrollTop = objDiv.scrollHeight;
}