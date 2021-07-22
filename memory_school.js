// coded by Lovro Selic , C00lSch00l 2014, 2015
// version 1.06.01 
// Memory template

//Prototypes

Array.prototype.swap = function (x, y) {
    var TMP = this[x];
    this[x] = this[y];
    this[y] = TMP;
    return this;
};
Array.prototype.shuffle = function () {
    var i = this.length,
        j;
    while (--i > 0) {
        j = rnd(0, i);
        this.swap(i, j);
    }
    return this;
};

////////////////global//////////////////////////////

var MAX_ITEMS = 12;
var Source = "/CoolToolImages/";
var callSRC = ["A BOARD","A BOOK","A CHAIR","A CLASSROOM","A DESK","GLUE", "A LIGHT", "A PEN", "A PENCIL", "A SCHOOL","A BIN","A COMPUTER","A NOTEBOOK", "A RUBBER","A DOOR","A PAINTBRUSH","PAPER","A RULLER", "A SCHOOLBAG","A WINDOW"];
var call = [];
var response = [];

///////////////////////////////////////////////////////////////////

$(document).ready(function () {

    $("#play_again").click(function () {
        location.reload();
    });

    setUp();
    setBoard();
    var guesses = 0;
    var toGo = 12;
    $(".tile").click(function () {
        var clickedDiv = $(this);
        if (clickedDiv.hasClass("back")) {
            count++;
            if (count === 2) {
                if (!found) {
                    $("#" + clicked[0]).removeClass("cface");
                    $("#" + clicked[1]).removeClass("cface");
                    $("#" + clicked[0]).addClass("back");
                    $("#" + clicked[1]).addClass("back");
                    $("#" + clicked[0]).html("");
                    $("#" + clicked[1]).html("");
                }
                count = 0;
                clicked = [];
                inField = [];
            }
            if (count < 2) {
                clickedDiv.removeClass("back");
                clickedDiv.addClass("cface");
                X = clickedDiv.prop('id');
                clicked.push(X);
                X = X.slice(5);
                if (combinedArray[X].indexOf('#') === 0) {
                    var pictureElement = "<img src='" + Source + combinedArray[X].substring(1) + "' width='135' height='135' alt='loading image'/>";
                    clickedDiv.html(pictureElement);
                } else {
                    temp = call.indexOf(combinedArray[X]);
                    temp = response[temp];
                    clickedDiv.append("<p>" + combinedArray[X] + "</p>");

                }
                inField.push(combinedArray[X]);
                if (clicked.length === 2) {
                    firstClick = getIndex(inField[0]);
                    secondClick = getIndex(inField[1]);
                    guesses++;
                    $("#clicks").text("Guesses: " + guesses + "\xA0\xA0\xA0");
                    if (firstClick === secondClick) {
                        toGo--;
                        $("#togo").text("Pairs to find: " + toGo + "\xA0\xA0\xA0");
                        $("#" + clicked[0]).removeClass("cface");
                        $("#" + clicked[1]).removeClass("cface");
                        $("#" + clicked[0]).addClass("cguessed");
                        $("#" + clicked[1]).addClass("cguessed");
                        $("#" + clicked[0]).animate({
                            opacity: 0
                        }, 1200);
                        $("#" + clicked[1]).animate({
                            opacity: 0
                        }, 1200);
                        found = true;
                        $("#what").text("Last pair: CORRECT\xA0\xA0");
                        if (toGo === 0) {
                            $("#togo").hide();
                            $("#what").hide();
                            $('.inf').append("<strong>WELL DONE! YOU HAVE FOUND ALL THE PAIRS IN " + guesses + " GUESSES.</strong> Press 'F5' to play again.");
                            $('#upd').html("You have found all the pairs in " + guesses + " guesses.");
                            $('#welldone').show();
                            $('.tile').hide(1000);
                        }
                    } else {
                        $("#what").text("Last pair: WRONG");
                        found = false;
                    }
                }
            }
        }
    });

});

function setUp() {
    var CNT = callSRC.length;
    var pool = createArrayPool(CNT, MAX_ITEMS);
    for (var i = 0; i < MAX_ITEMS; i++) {
        call[i] = callSRC[pool[i]];
        response[i] = "#" + strip(callSRC[pool[i]]) + ".png";
    }
    combinedArray = [];
    combinedArray = call.concat(response);
    combinedArray.shuffle();
    count = -1;
    clicked = [];
    inField = [];
    return;
}

function setBoard() {
    for (var i = 0; i < 24; i++) {
        var output = "<div id='field" + i + "' class='tile back'><a href='#'></a></div>";
        $("#page ").append(output);
    }
    return;
}

function rnd(start, end) {
    return Math.floor(Math.random() * (++end - start) + start);
}

function getIndex(polje) {
    var idx = call.indexOf(polje);
    if (idx === -1) {
        idx = response.indexOf(polje);
    }
    return idx;
}

function createArrayPool(mx, N) {
    var tempArray = [];
    var listOfArrays = [];
    for (var ix = 0; ix < mx; ix++) {
        tempArray[ix] = ix;
    }
    var top;
    for (var iy = 0; iy < N; iy++) {
        top = tempArray.length;
        addx = rnd(0, top - 1);
        listOfArrays[iy] = tempArray[addx];
        tempArray.splice(addx, 1);
    }
    return listOfArrays;
}

function strip(stringy) {
    var idx = stringy.indexOf(" ");
    if (idx != -1) {
        stringy = stringy.substring(++idx);
    }
    return stringy;
}