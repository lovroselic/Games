// coded by Lovro Selic , C00lSch00l 2014
console.clear();
VERSION = "1.05";
console.log("Memory V" + VERSION + " (c) 2014, 2016 C00lSch00l, coded by Lovro Selic");

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

var MAX_ITEMS = 15;

///////////////////////////////////////////////////////////////////

$(document).ready(function () {
    $("#version").html("Memory - Numbers v" + VERSION + " &copy 2014 C00lSch00l");
    $("#play_again").click(function () {
        location.reload();
    });
	setUp();
    setBoard();
    var guesses = 0;
    var toGo = 15;
    $(".tile").click(function () {
        clickedDiv = $(this);
        if (clickedDiv.hasClass("back")) {

            count++;
            if (count === 2) {
                if (!found) {
                    $("#" + clicked[0]).removeClass("face");
                    $("#" + clicked[1]).removeClass("face");
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
                clickedDiv.addClass("face");
                X = clickedDiv.prop('id');
                clicked.push(X); //clicked ids
                X = X.slice(5);
                clickedDiv.append("<p>" + combinedArray[X] + "</p>");
                if ($("#hint").prop("checked")) {
                    $('span').removeClass("black");
                    $('span').addClass("red");
                } else {
                    $('span').removeClass("red");
                    $('span').addClass("black");
                }
                inField.push(combinedArray[X]); //value of clicked tiles
                if (clicked.length === 2) {
                    firstClick = getIndex(inField[0]);
                    secondClick = getIndex(inField[1]);
                    guesses++;
                    $("#clicks").text("Guesses: " + guesses + "\xA0\xA0\xA0");
                    if (firstClick === secondClick) { //correct guess
                        toGo--;
                        $("#togo").text("Pairs to find: " + toGo + "\xA0\xA0\xA0");
                        $("#" + clicked[0]).removeClass("face");
                        $("#" + clicked[1]).removeClass("face");
                        $("#" + clicked[0]).addClass("guessed");
                        $("#" + clicked[1]).addClass("guessed");
                        $("#" + clicked[0]).animate({
                            opacity: 0
                        }, 1000);
                        $("#" + clicked[1]).animate({
                            opacity: 0
                        }, 1000);
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
    call = ['THIR<span>TEEN</span>', 'THIR<span>TY</span>', 'FOUR<span>TEEN</span>', 'FOUR<span>TY</span>', 'FIF<span>TEEN</span>', 'FIF<span>TY</span>', 'SIX<span>TEEN</span>', 'SIX<span>TY</span>', 'SEVEN<span>TEEN</span>', 'SEVEN<span>TY</span>', 'EIGH<span>TEEN</span>', 'EIGH<span>TY</span>', 'NINE<span>TEEN</span>', 'NINE<span>TY</span>', 'TWELVE'];
    response = [13, 30, 14, 40, 15, 50, 16, 60, 17, 70, 18, 80, 19, 90, 12];
    combinedArray = [];
    combinedArray = call.concat(response);
    combinedArray.shuffle();
    count = -1;
    clicked = [];
    inField = [];
}

outp = function (data, tag) {
    $("#page").append("<" + tag + ">" + data + "</" + tag + ">");
};

function setBoard() {
    for (var i = 0; i < 30; i++) {
        output = "<div id='field" + i + "' class='tile back'><a href='#'></a></div>";
        $("#page").append(output);
    }
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