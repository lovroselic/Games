// coded by Lovro Selic , (C) C00lSch00l 2014
//version 1.01.00
  
$(document).ready(function() {
	$("form").bind("keypress", function (e) {
        if (e.keyCode == 13) {
            return false;
        }
    });

    $("#start").click(function() {
        startUp();
    });
    $("#howmany").focusout(function() {
        var temp = $(this).val();
		$(this).val(validateInput(temp, 5, 25, 10));
    });
    $("#check").click(function() {
        checkAnswers();
    });

    function startUp() {
        $("#board table tbody").html("");
        $("#result").html("");
        $("#window").show();
        $("#buttons").fadeIn(400);
        $("#board").fadeIn(400);
		$("#board")[0].scrollIntoView(true);
        var hard = ['arise', 'arose', 'arisen', 'awake', 'awoke', 'awoken', 'bear', 'bore', 'born ', 'bend', 'bent', 'bent', 'bet', 'bet', 'bet ',
            'bid', 'bid', 'bid', 'bind', 'bound', 'bound', 'bleed', 'bled', 'bled', 'blow', 'blew', 'blown', 'breed', 'bred', 'bred', 'burst',
            'burst', 'burst', 'bust', 'bust', 'bust', 'cast', 'cast', 'cast', 'cling', 'clung', 'clung', 'creep', 'crept', 'crept', 'deal',
            'dealt ', 'dealt', 'dwell', 'dwelt', 'dwelt', 'flee', 'fled', 'fled', 'fling', 'flung', 'flung', 'forbid', 'forbade', 'forbidden',
            'foresee', 'foresaw', 'foreseen', 'foretell', 'foretold', 'foretold', 'forgive', 'forgave', 'forgiven', 'forsake', 'forsook',
            'forsaken', 'freeze', 'froze', 'frozen', 'frostbite', 'frostbit', 'frostbitten', 'grind', 'ground', 'ground', 'hang', 'hung',
            'hung', 'hit', 'hit', 'hit', 'hold', 'held', 'held', 'hurt', 'hurt', 'hurt', 'kneel', 'knelt', 'knelt', 'knit', 'knit', 'knit',
            'lay', 'laid', 'laid', 'lead', 'led', 'led', 'lean', 'leant', 'leant ', 'leap', 'leapt', ' leapt', 'lend', 'lent', 'lent', 'let',
            'let', 'let', 'lie', 'lay', 'lain', 'light', 'lit', 'lit ', 'mislead', 'misled', 'misled', 'mistake', 'mistook', 'mistaken',
            'misunderstand', 'misunderstood', 'misunderstood', 'outrun', 'outran', 'outrun', 'overcome', 'overcame', 'overcome', 'overdo',
            'overdid', 'overdone', 'overdraw', 'overdrew', 'overdrawn', 'override', 'overrode', 'overridden', 'overrun', 'overran', 'overrun',
            'overthrow', 'overthrew', 'overthrown', 'overwrite', 'overwrote', 'overwritten', 'partake', 'partook', 'partaken', 'plead', 'pled',
            'pled', 'prepay', 'prepaid', 'prepaid', 'prove', 'proved', 'proven', 'quit', 'quit', 'quit ', 'rebuild', 'rebuilt', 'rebuilt',
            'recast', 'recast', 'recast', 'redo', 'redid', 'redone', 'redraw', 'redrew', 'redrawn', 'regrow', 'regrew', 'regrown', 'rehang',
            'rehung', 'rehung', 'rehear', 'reheard', 'reheard', 'remake', 'remade', 'remade', 'repay', 'repaid', 'repaid', 'reread', 'reread',
            'reread', 'rerun', 'reran', 'rerun', 'resell', 'resold', 'resold', 'resend', 'resent', 'resent', 'reset', 'reset', 'reset',
            'retake', 'retook', 'retaken', 'retell', 'retold', 'retold', 'rethink', 'rethought', 'rethought', 'rewind', 'rewound', 'rewound',
            'rewrite', 'rewrote', 'rewritten', 'rid', 'rid', 'rid', 'rise', 'rose', 'risen', 'saw', 'sawed', 'sawn', 'seek', 'sought', 'sought',
            'set', 'set', 'set', 'sew', 'sewed', 'sewn ', 'shake', 'shook', 'shaken', 'shave', 'shaved', 'shaven', 'shed', 'shed', 'shed',
            'shine', 'shone', 'shone ', 'shoot', 'shot', 'shot', 'shrink', 'shrank', 'shrunk', 'shut', 'shut', 'shut', 'sink', 'sank', 'sunk',
            'slay', 'slew', 'slain', 'slide', 'slid', 'slid', 'sling', 'slung', 'slung', 'slit', 'slit', 'slit', 'smell', 'smelt', 'smelt ',
            'sow', 'sowed', 'sown', 'speed', 'sped', 'sped', 'spell', 'spelt', 'spelt ', 'spill', 'spilt', 'spilt ', 'spin', 'spun', 'spun',
            'split', 'split', 'split', 'spoil', 'spoilt', ' spoilt', 'spread', 'spread', 'spread', 'spring', 'sprang', 'sprung', 'stick',
            'stuck', 'stuck', 'sting', 'stung', 'stung', 'string', 'strung', 'strung', 'strive', 'strove', 'striven ', 'swear', 'swore',
            'sworn', 'sweep', 'swept', 'swept', 'swell', 'swelled', 'swollen', 'swing', 'swung', 'swung', 'tear', 'tore', 'torn', 'thrust',
            'thrust', 'thrust', 'tread', 'trod', 'trodden', 'unbend', 'unbent', 'unbent', 'unbind', 'unbound', 'unbound', 'undertake',
            'undertook', 'undertaken', 'underwrite', 'underwrote', 'underwritten', 'undo', 'undid', 'undone', 'unfreeze', 'unfroze', 'unfrozen',
            'unwind', 'unwound', 'unwound', 'upset', 'upset', 'upset', 'wed', 'wed', 'wed', 'weep', 'wept', 'wept', 'wind', 'wound', 'wound',
            'withdraw', 'withdrew', 'withdrawn', 'withhold', 'withheld', 'withheld', 'withstand', 'withstood', 'withstood'
        ];
        var easy = ['begin', 'began', 'begun', 'break', 'broke', 'broken', 'bring', 'brought', 'brought', 'build', 'built', 'built', 'burn',
            'burnt', 'burnt ', 'write', 'wrote', 'written', 'win', 'won', 'won', 'think', 'thought', 'thought', 'sell', 'sold', 'sold', 'send',
            'sent', 'sent', 'buy', 'bought', 'bought', 'catch', 'caught', 'caught', 'choose', 'chose', 'chosen', 'drink', 'drank', 'drunk',
            'drive', 'drove', 'driven', 'feel', 'felt', 'felt', 'fight', 'fought', 'fought', 'find', 'found', 'found', 'grow', 'grew', 'grown',
            'give', 'gave', 'given', 'go', 'went', 'gone', 'get', 'got', 'gotten', 'cost', 'cost', 'cost', 'fly', 'flew', 'flown', 'cut', 'cut',
            'cut', 'do', 'did', 'done', 'draw', 'drew', 'drawn', 'have', 'had', 'had', 'keep', 'kept', 'kept', 'know', 'knew', 'known', 'leave',
            'left', 'left', 'lose', 'lost', 'lost', 'make', 'made', 'made', 'mean', 'meant', 'meant', 'meet', 'met', 'met', 'pay', 'paid',
            'paid', 'put', 'put', 'put', 'ring', 'rang', 'rung', 'take', 'took', 'taken', 'teach', 'taught', 'taught', 'tell', 'told', 'told',
            'throw', 'threw', 'thrown', 'swim', 'swam', 'swum', 'spend', 'spent', 'spent', 'eat', 'ate', 'eaten', 'dig', 'dug', 'dug', 'dream',
            'dreamt', 'dreamt', 'fall', 'fell', 'fallen', 'feed', 'fed', 'fed', 'hear', 'heard', 'heard', 'hide', 'hid', 'hidden', 'learn',
            'learnt', 'learnt ', 'run', 'ran', 'run', 'say', 'said', 'said', 'see', 'saw', 'seen', 'sit', 'sat', 'sat', 'show', 'showed',
            'shown', 'wear', 'wore', 'worn', 'sing', 'sang', 'sung', 'beat', 'beat', 'beaten', 'become', 'became', 'become', 'bite', 'bit',
            'bitten', 'come', 'came', 'come', 'forget', 'forgot', 'forgotten', 'read', 'read', 'read', 'ride', 'rode', 'ridden', 'sleep',
            'slept', 'slept', 'speak', 'spoke', 'spoken', 'stand ', 'stood', 'stood', 'steal', 'stole', 'stolen', 'understand', 'understood',
            'understood', 'wake', 'woke', 'woken'
        ];
        verbs = easy;
        $level = $("input[name='level']");
        if ($level[1].checked === true) {
            verbs = verbs.concat(hard);
        }
        var loopLength = verbs.length;
        var simpleVerb = [];
        var pastVerb = [];
        var participleVerb = [];
        for (var i = 0; i < loopLength; i += 3) {
            simpleVerb.push(verbs[i].trim());
            pastVerb.push(verbs[i + 1].trim());
            participleVerb.push(verbs[i + 2].trim());
        }
        complexArray = [simpleVerb, pastVerb, participleVerb];
        howMany = $("#howmany").val();
        var maxVerb = simpleVerb.length;
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
        which = rnd(1, 3);
    } else {
        which = 1;
    }
    var tempLine = "";
    for (var iy = 1; iy <= 3; iy++) {
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
    var loopLength = howMany * 2;
    var correctAnswers = 0;
    var thisID = "";
    var colY, rowX, solution, typedIn, score;
    for (var ix = 0; ix < loopLength; ix++) {
        thisID = $answers[ix].id;
        rowX = Math.floor(ix / 2) + 1;
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

function validateInput(set, min, max, def) {
    if (isNaN(set)) return def;
    if (set < min) return min;
    if (set > max) return max;
    return set;
}