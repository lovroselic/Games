// coded by Lovro Selic , C00lSch00l 2015
console.clear();
VERSION = "1.09";
console.log("Grammathlon V" + VERSION + " (c) 2015 C00lSch00l, coded by Lovro Selic");

//constants********************

MIN_fields = 7;
MAX_fields = 99;
DEFAULT_fields = 19;
MAX_players = 6;
MIN_players = 2;
DEFAULT_players = 4;
SUBJECT_probability = 30;
OBJECT_probability = 40;
PLACE_probability = 50;
WHERE_RIGHT = 8;
LEGEND_HEIGHT = 10;
LEGEND_WIDTH = 100;
SOURCE = "http://www.c00lsch00l.eu";
SPACE_LEFT = "0";
SPACE = ".";
LAST_DELAY = 5;

//***************************

var SND_Yes = new Audio("/Mp3/grammathlonYES.mp3");
var SND_No = new Audio("/Mp3/grammathlonNO.mp3");

var Field = function (id, adverb, verb, subject, typeIndex, time, content, situation, obj, place) {
    this.id = id;
    this.adverb = adverb;
    this.verb = verb;
    this.subject = subject;
    this.typeIndex = typeIndex;
    this.type = types[this.typeIndex];
    this.time = time;
    this.timeName = timeNames[this.time];
    this.situation = situation;
    this.obj = obj;
    this.place = place;
};

var Player = function (name, position, id, won) {
    this.name = name;
    this.position = position;
    this.id = id;
    this.won = won;
};

var timeNames = [];
var types = [];
var subjectsAll = [];
var fields = [];
var players = [];
var winners = [];
var playerColours = ['red', 'blue', 'green', 'yellow', 'grey', 'cyan'];
var typeText = ["Confirm", "Deny", "Ask a question"];
var round, whichPlayer, HMP, gameWin, HM, oldPosition, up;
var dieElement = "<div class='dice'><canvas></canvas></div>";
var yesButton = "<input type='image' id='YES' src='/Images/transparentPNG.png' title='Correct!' />";
var noButton = "<input type='image' id='NO' src='/Images/transparentPNG.png' title='Wrong!' />";

//
var weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
var months = ["January", "February", "March", "April", "June", "July", "August", "September", "October", "November", "December"];
var familyMembers = ["mother", "father", "sister", "brother", "son", "daughter", "aunt", "uncle", "grandmother", "grandfather", "cousin", "parents", "pet"];

//Adverbs

var adverbPresentSimple = ['always', 'frequently', 'never', 'normally', 'occasionally', 'often', 'rarely', 'regularly', 'seldom', 'sometimes', 'usually', 'from time to time'];
var adverbPresentCont = ['at the moment', 'these days', 'now', 'nowadays', 'at present', 'still', 'currently', 'always', 'forever', 'constantly', 'gradually', 'little by little', 'tonight', 'tomorrow', 'this weekend', 'later'];
var adverbPresentPerfect = ['not yet', 'just', 'already'];
var adverbPastCont = ['while', "from six to eight", "for half an hour", "for one hour"];
adverbPastCont = adverbPastCont.concat(createForAdverb(2, 8, "hours"));
adverbPastCont = adverbPastCont.concat(createForAdverb(2, 8, "days"));
adverbPastCont = adverbPastCont.concat(createFromAdverb(5));
var adverbPastSimple = ['yesterday', 'last week', "previous weekend", "in 1990", "last month"];
adverbPastSimple = adverbPastSimple.concat(addWord("last", weekDays));
adverbPastSimple = adverbPastSimple.concat(addWord("last", months));
adverbPastSimple = adverbPastSimple.concat(addWord("previous", weekDays));
adverbPastSimple = adverbPastSimple.concat(addWord("previous", months));
adverbPastSimple = adverbPastSimple.concat(createAdverb(2, 5, "days ago"));
adverbPastSimple = adverbPastSimple.concat(createAdverb(2, 5, "weeks ago"));
adverbPastSimple = adverbPastSimple.concat(createAdverb(2, 5, "years ago"));
var adverbWillFut = ['tomorrow', 'later', 'in September', 'in May', 'in July', 'next month', 'next week', 'next year', 'early', 'soon', 'later today', 'on Monday', 'on Sunday', 'in two hours', 'in twenty minutes', 'on Saturday afternoon', 'this year', "in 2145"];
adverbWillFut = adverbWillFut.concat(addWord("next", weekDays));
adverbWillFut = adverbWillFut.concat(addWord("next", months));
var adverbGTFut = adverbWillFut;
var adverbCollection = [];

//Verbs

var verbCollection = ['dance', 'play', 'sit', 'swim', 'walk', 'climb', 'eat', 'drink', 'drive', 'draw', 'clean', 'break', 'sleep', 'talk', 'shout', 'scream', 'ride', 'shoot', 'sing', 'type', 'write', 'run', 'stand', 'pick', 'kiss', 'cry', 'laugh', 'sneak', 'watch', 'count', 'chew', 'blink', 'work', 'fight', 'crawl', 'fly', 'jump', 'fix', 'bark', 'serve', "build", "read", "put", "ring", "make", "learn", "say", "bite", "meet", "pay", "hold", "hide", "wake", "take", "speak", "throw", "swing", "bring", "think", "wear", "tear", "teach", "go", "find", "hang", "blow", "dig", "catch", "dream", "cook", "ski", "comb", "come", "brush", "wash", "kick", "skate", "paint", "cut", "fall", "give", "hug"];

//Subjects

var subjectCollection = ['I', 'She', 'You', 'He', 'We', 'They', 'It'];
var subjectVar = ['a dog', 'dogs', 'a cat', 'cats', 'a boy', 'boys', 'a girl', 'girls', 'a man', 'men', 'a woman', 'women', "Bill's father", 'a friend', 'friends', "Peter's grandmother", "their brothers", "my mother's aunt", "this parrot", "that pirate", "six caterpillars", "those zebras", "snakes", "monkeys", "ten little bears", "yellow chickens", "a green lizard", "angry cows", "a cocky peacock", "the proud ostrich", "black gorillas", "orange flowers", "a sandy beach", "a pretty girl", "an ugly witch", "a lazy princess", "a handsome prince", "a wild horse", "a white tower", "the wicked stepmother", "Justin Bieber", "Michael Jackson", "Harry Potter", "Lord Voldemort", "Pipi Longstocking", "Kekec"];
subjectVar = subjectVar.concat(addWord("my", familyMembers));
subjectVar = subjectVar.concat(addWord("his", familyMembers));
subjectVar = subjectVar.concat(addWord("her", familyMembers));
subjectVar = subjectVar.concat(addWord("your", familyMembers));
subjectVar = subjectVar.concat(addWord("their", familyMembers));
var subjectCH_init = ['family', "nature", "vehicles", "food", "school", "buildings", "animals", "profession", "home", "clothes", "carnival"]; //select from theme
var subjectCH = addWord("Select from theme: ", subjectCH_init);

//Objects
var objectVar = subjectVar; //
var objectCH = subjectCH;

//Place

var placeVar = ["beach", "hills", "mountains", "home", "castle", "igloo", "ambulance", "truck", "spaceship", "submarine", "forest", "barn", "meadow", "village", "country", "town", "city", "moon", "Earth", "another planet", "bridge", "road", "river", "sea", "desert", "rainbow", "room", "tank", "school", "kitchen", "bathroom", "dining room", "sleeping room", "toilet", "graveyard", "playground", "jungle gym", "rocket", "coast"];
var placeCH_init = ["nature", "vehicles", "school", "buildings", "home"];
var placeCH = addWord("Select from theme: ", placeCH_init);

//Situation
var situationSimple = ['Repeated actions / Facts or generalizations / Scheduled events in the near future'];
var situationCont = ['Now / Longer actions in progress now / Near future / Repetition and irritation with "Always" / Limited present (trend)' ];
var situationPerf = ['Unspecified time before now / Effect on the present moment / Duration from the past until now'];
var situationPastCont = ['Interrupted action in the past / Specific time as an interruption / Parallel actions'];
var situationPast = ['Completed action in the past / A series of completed actions / Duration in past / Habits in the past / Past facts or generalizations'];
var situationWillFut = [' Action will happen in the future -  future facts or things we believe to be true about the future / At the moment of making a decision / Express a voluntary action / Express a promise'];
var situationGTFut = ['Action will happen in the future - future prediction based on evidence in the present / Decision was made before / Express a plan'];
var situationCollection = [];

/****************************************/

$(document).ready(function () {
    $("#version").html("Grammathlon v" + VERSION + " by Mija & Lovro Selič; &copy 2015 C00lSch00l");
	
    $("#how_many_fields").val(DEFAULT_fields);
    $("#players_number").val(DEFAULT_players);
    $("#reset").prop("value", "RESET");

    $("form").bind("keypress", function (e) {
        if (e.keyCode == 13) {
            return false;
        }
    });

    $("#select_all").click(function () {
        var includes = $("input[name='tense']");
        var IL = includes.length;
        for (var xx = 0; xx < IL; xx++) {
            $(includes[xx]).prop('checked', true);
        }
    });

    $("#select_none").click(function () {
        var includes = $("input[name='tense']");
        var IL = includes.length;
        for (var xx = 0; xx < IL; xx++) {
            $(includes[xx]).prop('checked', false);
        }
    });

    $("#hide_setup").click(function () {
        $("#panel1").toggle(400);
    });

    $("#how_many_fields").focusout(function () {
        var temp = $(this).val();
        $(this).val(validateInput(temp, MIN_fields, MAX_fields, DEFAULT_fields));
    });

    $("#players_number").focusout(function () {
        var temp = $(this).val();
        $(this).val(validateInput(temp, MIN_players, MAX_players, DEFAULT_players));
    });

    $("#generate").click(function () {
        $("#generate").prop("disabled", true);
        $("#enroll").prop("disabled", false);
        disableSetup();
        timeNames = [];
        types = [];
        subjectsAll = [];
        $("#field").html("");
        var ST = selectTense();
        if (!ST) {
            alert("At least one tense should be selected!");
            return;
        }
        var STY = selectType();
        if (!STY) {
            alert("At least one type should be selected!");
            return;
        }
        var STS = selectSubject();
        if (!STS) {
            alert("At least one type of subjects should be selected!");
            return;
        }
        defineFields($("#how_many_fields").val());
        drawFields();
        return;
    });

    $("#enroll").click(function () {
        enrollPlayers();
    });

    $("#start_game").click(function () {
        begin();
        nextPlayer();
    });

    $("body").on('click', "#roll", function () {
        playerRoll();
    });

    $("body").on('click', "#YES", function () {
		SND_Yes.play();
        $("#screen div").remove();
        $("#screen").append("<br/><strong>The answer was correct.</strong><br/>");
        $("#X1").hide(600, function () {
            $("#X1").remove();
            $("#screen").hide(1000, function () {
                nextPlayer();
            });
        });
    });

    $("body").on('click', "#NO", function () {
		SND_No.play();
        $("#screen div").remove();
        $("#screen").append("<br/><strong>The answer was not correct.</strong><br/>");
        var newId = "#F" + oldPosition;
        players[whichPlayer - 1].position = oldPosition;
        var where = whereIs(newId);
        $("#P" + whichPlayer).animate({
            left: where + 40 + whichPlayer % 2 * 40
        }, 1500);
        viewTo(newId);
        $("#screen").animate({
            left: where
        }, 1500, "swing", function () {
            $("#X1").hide(600, function () {
                $("#X1").remove();
                $("#screen").hide(1000, function () {
                    nextPlayer();
                });
            });
        });
    });

    $("#reset").click(function () {
        var R = confirm("Current game will be lost. Do you really really want to reset the program? Press 'OK' to reset or 'Cancel' to continue.");
        if (R) {
            location.reload();
        }
    });

    $("#save").click(function () {
        var tenses = [];
        var selection = $("input[name='tense']");
        var IL = selection.length;
        for (var xx = 0; xx < IL; xx++) {
            tenses.push($(selection[xx]).prop('checked'));
        }
        var types = [];
        selection = $("input[name='type']");
        IL = selection.length;
        for (var xxi = 0; xxi < IL; xxi++) {
            types.push($(selection[xxi]).prop('checked'));
        }
        var col3 = [];
        selection = $("input[name='col3']");
        IL = selection.length;
        for (var xxii = 0; xxii < IL; xxii++) {
            col3.push($(selection[xxii]).prop('checked'));
        }
        var parameters = [];
        selection = $("input[name='parameters']");
        IL = selection.length;
        for (var xxx = 0; xxx < IL; xxx++) {
            parameters.push($(selection[xxx]).val());
        }

        var setup = {
            tense: tenses,
            type: types,
            include: col3,
            parameter: parameters
        };
        localStorage.setItem("Grammathlon", JSON.stringify(setup));
        return;
    });

    //
    loadDefault();

});
/****************************************/
function loadDefault() {
    if (localStorage.Grammathlon) {
        var defaultSetup = JSON.parse(localStorage.Grammathlon);
        var cnt = defaultSetup.tense.length;
        var selection = $("input[name='tense']");
        for (var ix = 0; ix < cnt; ix++) {
            if (defaultSetup.tense[ix]) {
                $(selection[ix]).prop('checked', true);
            } else {
                $(selection[ix]).prop('checked', false);
            }
        }
        selection = $("input[name='type']");
        cnt = defaultSetup.type.length;
        for (var iix = 0; iix < cnt; iix++) {
            if (defaultSetup.type[iix]) {
                $(selection[iix]).prop('checked', true);
            } else {
                $(selection[iix]).prop('checked', false);
            }
        }
        selection = $("input[name='col3']");
        cnt = defaultSetup.include.length;
        for (var xx = 0; xx < cnt; xx++) {
            if (defaultSetup.include[xx]) {
                $(selection[xx]).prop('checked', true);
            } else {
                $(selection[xx]).prop('checked', false);
            }
        }
        selection = $("input[name='parameters']");
        cnt = defaultSetup.parameter.length;
        for (var zz = 0; zz < cnt; zz++) {
            $(selection[zz]).val(defaultSetup.parameter[zz]);
        }
    }
    return;
}

function disableSetup() {
    var selection = $("#panel1");
    var IL = selection.length;
    for (var xx = 0; xx < IL; xx++) {
        $(selection[xx]).prop('disabled', true);
    }
}

function playerRoll() {
    $("#roll").prop("disabled", true);
    var rolled = drawDice();
    oldPosition = players[whichPlayer - 1].position;
    var newPosition = oldPosition + rolled;
    players[whichPlayer - 1].position = newPosition;
    var newId;
    if (newPosition <= HM) {
        newId = "#F" + newPosition;
    } else {
        newId = "#f_finish";
        gameWin = true;
        players[whichPlayer - 1].won = true;
        players[whichPlayer - 1].position = "FINISH";
    }
    var where = whereIs(newId);
    $("#P" + whichPlayer).animate({
        left: where + 40 + whichPlayer % 2 * 40
    }, 1500);
    viewTo(newId);
    $("#screen").remove();
    $("#field").append("<div id='screen'></div>");
    $("#screen").css("top", up);
    $("#screen").css("left", where);
    refreshPlayerPanel(newId);
    boldIt(whichPlayer);
    $("#message")[0].scrollIntoView();
    $("#screen").append("<strong>Player: " + players[whichPlayer - 1].name + "</strong><br/>");
    if (!players[whichPlayer - 1].won) {
        $("#screen").append("Station: " + newPosition + "<br/>");
        $("#screen").append("Subject: " + fields[newPosition].subject.toUpperCase() + "<br/>");
        $("#screen").append("Verb: " + fields[newPosition].verb.toUpperCase() + "<br/>");
        $("#screen").append("Adverb of time: " + fields[newPosition].adverb.toUpperCase() + "<br/>");
        if ($("#objects").prop("checked") === true) {
            $("#screen").append("Object: " + fields[newPosition].obj.toUpperCase() + "<br/>");
        }
        if ($("#places").prop("checked") === true) {
            $("#screen").append("Place: " + fields[newPosition].place.toUpperCase() + "<br/>");
        }
        $("#screen").append("Type: " + fields[newPosition].type.toUpperCase() + "/" + typeText[fields[newPosition].typeIndex].toUpperCase() + "<br/>");
        $("#screen").append("<span><br/><strong>Situation: </strong>" + fields[newPosition].situation + "</br></span><br/>");
        var text = "Player <strong>" + players[whichPlayer - 1].name + "</strong> please answer.";
        $("#message").html(text);
        $("#screen").append("<div></div>");
        $("#screen div").append(yesButton);
        $("#screen div").append(noButton);
        $("#screen").append("<em><strong>GameMaster selects Correct or Wrong</em></strong>");
    } else {
        $("#screen").css("left", where);
        $("#screen").append("Station: FINISH <br/>");
        $("#screen").append("<strong>Player " + players[whichPlayer - 1].name + "</strong> joined the game winners.<br/>");
        $("#screen").append("The game will conclude at the end <br/>of the last player's move.<br/>");
        $("#screen").append("<br/>The game will continue after " + LAST_DELAY + " seconds.<br/>");
        winners.push(players[whichPlayer - 1].name);
        setTimeout(function () {
            $("#screen").hide(1000, function () {
                nextPlayer();
            });
        }, LAST_DELAY * 1000);
    }
    return;
}

function finalView() {
    var text = "Game has concluded.";
    $("#message").html(text);
    viewTo("#f_finish");
    $("#screen").remove();
    $("#field").append("<div id='screen'></div>");
    var where = whereIs("#f_finish");
    $("#screen").css("top", up);
    $("#screen").css("left", where + 8);
    $("#screen").append("<span style='text-decoration: underline; font-size: 15px'>After " + round + " rounds:</span><br/><br/>");
    $("#screen").append("<strong>Winners:</strong><br/>");
    var WL = winners.length;
    for (var i = 0; i < WL; i++) {
        $("#screen").append(winners[i] + " <br/>");
    }
    $("#screen").append("<strong>Runners up:</strong><br/>");
    var losers = [];
    for (var ix = 0; ix < HMP; ix++) {
        if (!players[ix].won) {
            losers.push(players[ix]);
        }
    }
    plySort(losers);
    var LL = losers.length;
    for (var ic = 0; ic < LL; ic++) {
        $("#screen").append(losers[ic].name + " at station " + losers[ic].position + " <br/>");
    }
    $("#reset").prop("value", "RESTART");
    return;
}

function plySort(myArray) {
    var ARL = myArray.length - 1;
    if (ARL === 0) return;
    var swapped;
    do {
        swapped = false;
        for (var xx = 0; xx < ARL; xx++) {
            if (myArray[xx].position < myArray[xx + 1].position) {
                myArray.swap(xx, xx + 1);
                swapped = true;
            }
        }
    } while (swapped);
}

Array.prototype.swap = function (x, y) {
    var TMP = this[x];
    this[x] = this[y];
    this[y] = TMP;
    return this;
};

function nextPlayer() {
    whichPlayer++;
    if (whichPlayer > HMP) {
        whichPlayer = 1;
        round++;
        if (gameWin) {
            finalView();
            return;
        }
    }
    var newId = viewToCurrent();
    refreshPlayerPanel(newId);
    $("#message")[0].scrollIntoView();
    boldIt(whichPlayer);
    var text = "Player <strong>" + players[whichPlayer - 1].name + "</strong> please roll the die.";
    $("#message").html(text);
    $("#roll").prop("disabled", false);
    return;
}

function begin() {
    $("#start_game").prop("value", "Start game");
    $("#start_game").prop("disabled", true);
    round = 1;
    whichPlayer = 0;
    gameWin = false;
    for (var xx = 1; xx <= HMP; xx++) {
        var Pid = "P" + xx;
        drawPlayer(Pid);
    }
    $("#kocke").show();
    switch (HMP) {
        case 2:
            up = -75;
            break;
        case 3:
            up = -100;
            break;
        case 4:
            up = -130;
            break;
        case 5:
            up = -175;
            break;
        case 6:
            up = -220;
            break;
    }
    $("#screen").css("top", up);
    return;
}

function enrollPlayers() {
    $("#enroll").prop("disabled", true);
    players = [];
    HMP = parseInt($("#players_number").val(), 10);
    for (var ix = 0; ix < HMP; ix++) {
        var tempName;
        do {
            tempName = prompt("Player " + (ix + 1) + " enter your name:");
            if (tempName) {
                tempName = tempName.trim();
            }
        } while (tempName === null || tempName.length < 1);
        tempName = tempName.substring(0, 10);
        players[ix] = new Player(tempName, 0, "P" + (ix + 1), false);
    }
    refreshPlayerPanel();
    $("#start_game").prop("disabled", false);
    $("#start_game").prop("value", "START GAME");
    return;
}

function refreshPlayerPanel(newId) {
    $("#player_panel").remove();
    $("#field").append("<div id='player_panel'></div>");
    $("#player_panel").css("top", up);
    newId = newId || "#F0";
    var where = whereIs(newId);
    $("#player_panel").css("left", where + WHERE_RIGHT);
    var LL = players.length;
    var canvas = [];
    var ctx = [];
    round = round || 0;
    var appTXT = "<span style='text-decoration: underline'>Round: " + round + "</span><br>";
    $("#player_panel").append(appTXT);
    for (var ix = 0; ix < LL; ix++) {
        var Position = pad(players[ix].position, 2);
        if (players[ix].position === "FINISH") {
            var last = parseInt(HM, 10) + 1;
            Position = pad(last, 2);
        }
        appTXT = "<span id='PP" + ix + "'>" + (ix + 1) + ". " + padRight(players[ix].name, 10) + " at station " + Position;
        appTXT += "</span><div class='legend'><canvas width='" + LEGEND_WIDTH + "' height='" + LEGEND_HEIGHT + "' id='LL" + ix + "'></canvas></div><br/>";
        $("#player_panel").append(appTXT);
        canvas.push($("#LL" + ix)[0]);
        ctx.push(canvas[ix].getContext("2d"));
        ctx[ix].beginPath();
        ctx[ix].lineWidth = "1";
        ctx[ix].strokeStyle = "black";
        ctx[ix].rect(0, 0, LEGEND_WIDTH, LEGEND_HEIGHT);
        ctx[ix].stroke();
        var ratio = players[ix].position / (parseInt(HM, 10) + 1);
        if (players[ix].position === "FINISH") {
            ratio = 1;
        }
        ctx[ix].fillStyle = playerColours[ix];
        var pos = Math.floor(ratio * (LEGEND_WIDTH - 2));
        ctx[ix].fillRect(1, 1, pos, LEGEND_HEIGHT - 2);
    }
    return;
}

function boldIt(whichPlayer) {
    var tempPlayer = whichPlayer - 1;
    $("#PP" + tempPlayer).addClass("bold");
    tempPlayer--;
    if (tempPlayer < 0) tempPlayer += HMP;
    $("#PP" + tempPlayer).removeClass("bold");
    return;
}

function idToIndex(id) {
    return parseInt(id.substring(2), 10);
}

function viewTo(id) {
    var where = whereIs(id);
    $("#field").animate({
        scrollLeft: where - 36
    }, 1500);
    return where;
}

function viewToCurrent() {
    var curId = "#F" + players[whichPlayer - 1].position;
    viewTo(curId);
    return curId;
}

function whereIs(id) {
    var offset = $(id).offset();
    var where = 0;
    if (offset) {
        where = parseInt(offset.left, 10);
    }
    where += $("#field").scrollLeft();
    return where;
}

function defineFields(N) {
    fields = [];
    N++;
    fields[0] = new Field("F0");
    for (var m = 1; m < N; m++) {
        fields[m] = new Field("F" + m);
        if (toss(SUBJECT_probability) && $("#subjects").prop("checked") === true) {
            fields[m].subject = subjectCH[rnd(0, subjectCH.length - 1)];
        } else {
            fields[m].subject = subjectsAll[rnd(0, subjectsAll.length - 1)];
        }
        fields[m].time = rnd(0, timeNames.length - 1);
        fields[m].timeName = timeNames[fields[m].time];
        fields[m].verb = verbCollection[rnd(0, verbCollection.length - 1)];
        fields[m].adverb = adverbCollection[fields[m].time][rnd(0, adverbCollection[fields[m].time].length - 1)];
        fields[m].situation = situationCollection[fields[m].time]; //
        fields[m].typeIndex = rnd(0, types.length - 1);
        fields[m].type = types[fields[m].typeIndex];
        if (toss(OBJECT_probability)) {
            fields[m].obj = objectCH[rnd(0, objectCH.length - 1)];
        } else {
            fields[m].obj = objectVar[rnd(0, objectVar.length - 1)];
        }
        if (toss(PLACE_probability)) {
            fields[m].place = placeCH[rnd(0, placeCH.length - 1)];
        } else {
            fields[m].place = placeVar[rnd(0, placeVar.length - 1)];
        }
    }
    fields[fields.length] = new Field("FINISH");
    console.log("fields", fields);
}

function selectTense() {
    var count = 0;
    if ($("#present_simple").prop("checked") === true) {
        timeNames.push("present simple");
        adverbCollection.push(adverbPresentSimple);
        situationCollection.push(situationSimple[0]);
        count++;
    }
    if ($("#present_continuous").prop("checked") === true) {
        timeNames.push("present continuous");
        adverbCollection.push(adverbPresentCont);
        situationCollection.push(situationCont[0]);
        count++;
    }
    if ($("#present_perfect").prop("checked") === true) {
        timeNames.push("present perfect");
        adverbCollection.push(adverbPresentPerfect);
        situationCollection.push(situationPerf[0]);
        count++;
    }
    if ($("#past_simple").prop("checked") === true) {
        timeNames.push("past simple");
        adverbCollection.push(adverbPastSimple);
        situationCollection.push(situationPast[0]);
        count++;
    }
    if ($("#past_continuous").prop("checked") === true) {
        timeNames.push("past continuous");
        adverbCollection.push(adverbPastCont);
        situationCollection.push(situationPastCont[0]);
        count++;
    }
    if ($("#will_future").prop("checked") === true) {
        timeNames.push("future simple (will future)");
        adverbCollection.push(adverbWillFut);
        situationCollection.push(situationWillFut[0]);
        count++;
    }
    if ($("#going_to_future").prop("checked") === true) {
        timeNames.push("going to future");
        adverbCollection.push(adverbGTFut);
        situationCollection.push(situationGTFut[0]);
        count++;
    }
    return count;
}

function selectType() {
    var count = 0;
    if ($("#affirmative").prop("checked") === true) {
        types.push("affirmative");
        count++;
    }
    if ($("#negative").prop("checked") === true) {
        types.push("negative");
        count++;
    }
    if ($("#interrogative").prop("checked") === true) {
        types.push("interrogative");
        count++;
    }
    return count;
}

function selectSubject() {
    var count = 0;
    if ($("#personal_pronouns").prop("checked") === true) {
        subjectsAll = subjectsAll.concat(subjectCollection);
        count++;
    }
    if ($("#subjects").prop("checked") === true) {
        subjectsAll = subjectsAll.concat(subjectVar);
        count++;
    }
    return count;
}

function drawFields() {
    drawStart();
    HM = $("#how_many_fields").val();
    for (var ix = 1; ix <= HM; ix++) {
        var fieldElement = "<div class='fields' id='F" + ix + "'></div>";
        $("#field").append("<hr>");
        $("#field").append(fieldElement);
        var thisID = "#F" + ix;
        $(thisID).removeClass("affirmative");
        $(thisID).removeClass("negative");
        $(thisID).removeClass("interrogative");
        $(thisID).addClass(fields[ix].type);
        var addTXT = "<br/><br/><br/><br/>" + ix + ".<br/>" + fields[ix].subject.toUpperCase() + "<br/><em><strong>" + fields[ix].verb.toUpperCase() + "</strong></em><br/>" + fields[ix].adverb.toUpperCase();
        if ($("#objects").prop("checked") === true) {
            addTXT += "<br/><span class='lines'>" + fields[ix].obj.toUpperCase() + "</span>";
        }
        if ($("#places").prop("checked") === true) {
            addTXT += "<br/><span class='lines'><strong>" + fields[ix].place.toUpperCase() + "</strong></span>";
        }
        $(thisID).append(addTXT);
    }
    drawFinish();
    return;

    function drawStart() {
        $("#field").append("<div class='ends' id='F0'><span>START</span></div>");
    }

    function drawFinish() {
        $("#field").append("<hr>");
        $("#field").append("<div class='ends' id='f_finish'><span>FINISH</span></div>");
    }
}

function rnd(start, end) {
    return Math.floor(Math.random() * (++end - start) + start);
}

function validateInput(set, min, max, def) {
    if (isNaN(set)) return def;
    if (set < min) return min;
    if (set > max) return max;
    return set;
}

function drawPlayer(id) {
    var appTXT = "<div class='canvas' id='" + id + "' ><canvas width='40' height='40'></canvas></div>";
    var idN = id.substring(1);
    $("#field").append(appTXT);
    var canvas = $("#" + id + " canvas")[0];
    var ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.width / 2, canvas.width / 2 - 4, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fillStyle = playerColours[idN - 1];
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#003300';
    ctx.stroke();
    ctx.font = "12px Arial black";
    ctx.fillStyle = 'black';
    ctx.fillText(idN, canvas.width / 2 - 4, canvas.width / 2 + 4);
    return;
}

function drawFace(x, id) {
    x--;
    var c = $("#" + id)[0];
    var cx = c.getContext("2d");
    img = new Image();
    img.src = '/Sprite/dice6.sprite.png';
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

function drawDice() {
    var temp = rnd(1, 6);
    addDie(1);
    drawFace(temp, "d1");
    return temp;
}

function addDie(x) {
    $("#kocke").append(dieElement);
    $("#kocke div").last().attr("id", "X" + x);
    $("#X" + x + " canvas").attr("id", "d" + x);
    return;
}

function addWord(origin, arr) {
    var newArray = [];
    var LN = arr.length;
    for (var x = 0; x < LN; x++) {
        newArray[x] = origin + " " + arr[x];
    }
    return newArray;
}

function createAdverb(start, end, stringy) {
    var createdArr = [];
    for (var x = start; x <= end; x++) {
        createdArr.push(numToWord(x) + " " + stringy);
    }
    return createdArr;
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

function createForAdverb(start, end, stringy) {
    var createdArr = [];
    for (var x = start; x <= end; x++) {
        createdArr.push("for " + numToWord(x) + " " + stringy);
    }
    return createdArr;
}

function createFromAdverb(num) {
    var createdArr = [];
    for (var x = 0; x < num; x++) {
        var x1 = rnd(1, 11);
        var x2 = rnd(2, 12);
        if (x1 === x2) {
            x2++;
            if (x2 > 12) {
                x2--;
                x1--;
            }
        }
        var a = Math.min(x1, x2);
        var b = Math.max(x1, x2);
        createdArr.push("from " + numToWord(a) + " to " + numToWord(b));
    }
    return createdArr;
}

function toss(probability) {
    var x = rnd(1, 100);
    if (x > probability) {
        return false;
    } else {
        return true;
    }
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

function pad(x, z) {
    var s = stringFill(SPACE_LEFT, z) + x;
    return s.substring(s.length - z);
}

function padRight(x, z) {
    var s = x + stringFill(SPACE, z);
    return s.substring(0, z);
}