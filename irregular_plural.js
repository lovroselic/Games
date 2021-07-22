// coded by Lovro Selic , (C) C00lSch00l 2015
//version 1.04b (forked from irregular verbs)

$(document).ready(function () {

    $("form").bind("keypress", function (e) {
        if (e.keyCode === 13) {
            return false;
        }
    });

    $("#start").click(function () {
        startUp();
    });

    $("#howmany").focusout(function () {
        var temp = $(this).val();
        $(this).val(validateInput(temp, 5, 20, 10));
    });

    $("#check").click(function () {
        checkAnswers();
    });

    function startUp() {
        $("#board table tbody").html("");
        $("#result").html("");
        $("#window").show();
        $("#buttons").fadeIn(400);
        $("#board").fadeIn(400);
        var hard = ['a calf', 'calves', 'a crisis', 'crises', 'a deer', 'deer', 'a dwarf', 'dwarves', 'a domino', 'dominoes', 'an elf', 'elves', 'a fly', 'flies', 'a hoof', 'hooves', 'a leaf', 'leaves', 'a moose', 'moose', 'a nucleus', 'nuclei', 'an octopus', 'octopi', 'a quiz', 'quizzes', 'a scarf', 'scarves', 'a sheep', 'sheep', 'a sheaf', 'sheaves', 'a series', 'series', 'a species', 'species', 'a spy', 'spies', 'a syllabus', 'syllabi', 'a thesis', 'theses', 'a thief', 'thieves', 'a try', 'tries', 'a waltz', 'waltzes', 'a wharf', 'wharves', 'a wife', 'wives', 'a woman', 'women', 'an analysis', 'analyses', 'an axis', 'axes', 'a means', 'means', 'an ox', 'oxen', 'a die', 'dice', 'a scissors', 'scissors', 'a synthesis', 'syntheses', 'a half', 'halves', 'a louse', 'lice', 'a loaf', 'loaves', 'an oasis', 'oases', 'a swine', 'swine', 'a vertex', 'vertices', 'a wolf', 'wolves', 'a cactus', 'cacti'];
        var easy = ['a baby', 'babies', 'a child', 'children', 'a city', 'cities', 'a copy', 'copies', 'a family', 'families', 'a fish', 'fish', 'a foot', 'feet', 'a knife', 'knives', 'a lady', 'ladies', 'a life', 'lives', 'a man', 'men', 'a mouse', 'mice', 'a party', 'parties', 'a shelf', 'shelves', 'a story', 'stories', 'a tomato', 'tomatoes', 'a potato', 'potatoes', 'a tooth', 'teeth', 'a volcano', 'volcanoes', 'a fireman', 'firemen', 'a goose', 'geese', 'a person', 'people', 'a policeman', 'policemen'];
        var regular = ['an apple', 'apples', 'a toy', 'toys', 'an ant', 'ants', 'a plant', 'plants', 'a book', 'books', 'a pencil', 'pencils', 'a bag', 'bags', 'a car', 'cars', 'an orange', 'oranges', 'a bear', 'bears', 'a cat', 'cats', 'a dog', 'dogs', 'a brother', 'brothers', 'a sister', 'sisters', 'a flower', 'flowers', 'a lesson', 'lessons', 'a game', 'games', 'a drink', 'drinks', 'a hat', 'hats', 'a ring', 'rings', 'a boot', 'boots', 'a shoe', 'shoes', 'a shirt', 'shirts', 'a belt', 'belts', 'a cake', 'cakes', 'a cookie', 'cookies', 'a plum', 'plums', 'a pumpkin', 'pumpkins', 'an egg', 'eggs', 'a pear', 'pears', 'an apricot', 'apricots', 'an onion', 'onions', 'a steak', 'steaks', 'a rose', 'roses', 'a mountain', 'mountains', 'a hill', 'hills', ' a flower', 'flowers', 'a lake', 'lakes', 'a river', 'rivers', 'a rock', 'rocks', 'a road', 'roads', 'a door', 'doors', 'a board', 'boards', 'a chair', 'chairs', 'a window', 'windows', 'a locker', 'lockers', 'a box', 'boxes', 'an office', 'offices', 'a toilet', 'toilets', 'a note', 'notes', 'a map', 'maps', 'a cloud', 'clouds', 'a hand', 'hands', 'an eye', 'eyes', 'a head', 'heads', 'an arm', 'arms', 'a face', 'faces', 'a cheek', 'cheeks', 'an owl', 'owls', 'a shark', 'sharks', 'a wasp', 'wasps', 'an alligator', 'alligators', 'a camel', 'camels', 'a frog', 'frogs', 'a worm', 'worms', 'an insect', 'insects', 'a princess', 'princesses', 'a train', 'trains', 'a violin', 'violins', 'a drum', 'drums', 'a mug', 'mugs', 'a fork', 'forks', 'a house', 'houses', 'a castle', 'castles', 'a teacher', 'teachers', 'a doctor', 'doctors'];
        console.log(hard.length);
        nouns = easy;
        howMany = $("#howmany").val();
        $level = $("input[name='level']");
        var factor = 0.4;
        if ($level[1].checked === true) {
            nouns = nouns.concat(hard);
            factor = 2;
        }
        if ($("#regular").prop("checked") === true) {
            var PL = regular.length / 2;
            console.log(PL);
            var HM = Math.floor(howMany * factor);
            var selection = createVerbArray(PL, HM);
            var selectedRegular = [];
            for (var j = 0; j < HM; j++) {
                selectedRegular.push(regular[selection[j] * 2]);
                selectedRegular.push(regular[selection[j] * 2 + 1]);
            }
            nouns = nouns.concat(selectedRegular);
            console.log(selectedRegular);
        }
        var loopLength = nouns.length;
        var singularNoun = [];
        var pluralNoun = [];
        for (var i = 0; i < loopLength; i += 2) {
            singularNoun.push(nouns[i].trim());
            pluralNoun.push(nouns[i + 1].trim());
        }
        complexArray = [singularNoun, pluralNoun];
        var maxVerb = singularNoun.length;
        problem = createVerbArray(maxVerb, howMany);
        setField(howMany);
    }
});

function rnd(start, end) {
    return Math.floor(Math.random() * (++end - start) + start);
}

function createVerbArray(mx, N) {
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

function setField(N) {
    for (var ix = 1; ix <= N; ix++) {
        line = "<tr><td>" + ix + ".</td>";
        line += setLine(ix);
        line += "</tr>";
        $("#board table tbody").append(line);
    }
}

function setLine(N) {
    $fixed = $("input[name='fixed']");
    if ($fixed[1].checked === true) {
        which = rnd(1, 2);
    } else {
        which = 1;
    }
    var tempLine = "";
    for (var iy = 1; iy <= 2; iy++) {
        if ((iy - which)) {
            tempLine += "<td><input class='fill' id='row" + N + "col" + iy + "' type='text'/></td>";
        } else {
            tempLine += "<td>" + complexArray[iy - 1][problem[N - 1]] + "</td>";
        }
    }
    return tempLine;
}

function checkAnswers() {
    var $answers = $("#board table tbody td input");
    var loopLength = howMany;
    var correctAnswers = 0;
    var thisID = "";
    var colY, rowX, solution, typedIn, score;
    for (var ix = 0; ix < loopLength; ix++) {
        thisID = $answers[ix].id;
        rowX = ix + 1;
        colY = thisID[thisID.indexOf('col') + 3];
        solution = complexArray[colY - 1][problem[rowX - 1]];
        typedIn = $("#" + thisID).val();
        typedIn = typedIn.trim();
        if (solution === typedIn) {
            $("#" + thisID).replaceWith("<span class='right'>" + solution + "</span>");
            correctAnswers++;
        } else {
            $("#" + thisID).replaceWith("<span class='wrong'>" + typedIn + "</span>" + ": <span class='shouldbe'>" + solution + "</span>");
        }
    }
    score = Math.floor((correctAnswers / loopLength) * 100);
    var grade = getGrade(score);
    $("#result").html("<p>Your result: " + score + "%. " + grade + "</p>");
}

function getGrade(score) {
    switch (true) {
        case (score === 100):
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

function validateInput(set, min, max, def) {
    if (isNaN(set))
        return def;
    if (set < min)
        return min;
    if (set > max)
        return max;
    return set;
}