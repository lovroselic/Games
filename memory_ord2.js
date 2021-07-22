// coded by Lovro Selic , C00lSch00l 2014
console.clear();
VERSION = "1.04";
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

///////////////////////////////////////////////////////////////////

$(document).ready(function () {
    $("#version").html("Memory - Ordinals II v" + VERSION + " &copy 2014 C00lSch00l");
    $("#play_again").click(function () {
        location.reload();
    });
	setUp();
    setBoard();
    var guesses = 0;
    var toGo = 12;
    $(".tile").click(function () {
        if ($(this).hasClass("back")) {
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
                $(this).removeClass("back");
                $(this).addClass("face");
                X = $(this).prop('id');
                clicked.push(X); //clicked ids
                X = X.slice(5);
                $(this).append("<p>" + combinedArray[X] + "</p>");
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
						$("#" + clicked[0]).animate({opacity:0},1000);
                        $("#" + clicked[1]).animate({opacity:0},1000);
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
    call = ['TWENTY-<br>FIRST', 'THIRTY-<br>SECOND', 'FORTY-<br>THIRD', 'THIRTEENTH', 'FOURTEENTH', 'TWENTIETH', 'THIRTIETH', 'FORTIETH', 
	'NINETIETH', 'SIXTIETH', 'SIXTEENTH', 'NINETEENTH'];
    response = ['21<span class="red">st</span>','32<span class="green">nd</span>','43<span class="blue">rd</span>',
	'13<span class="orange">th</span>','14<span class="orange">th</span>','20<span class="orange">th</span>',
	'30<span class="orange">th</span>','40<span class="orange">th</span>','90<span class="orange">th</span>',
	'60<span class="orange">th</span>','16<span class="orange">th</span>','19<span class="orange">th</span>'];
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
    for (var i = 0; i < 24; i++) {
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