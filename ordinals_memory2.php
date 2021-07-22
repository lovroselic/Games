<?php include_once '../PHP/cache.php'; ?>
<!DOCTYPE html>
<html>
    <head>
        <?php include_once '../Include/meta-games.php'; ?>
        <?php include_once '../Include/includes.php'; ?>
        <link rel="stylesheet" type="text/css" href="/CSS/ordinals2.css">
        <title>Memory - Ordinals</title>
        <?php include_once '../Include/IE_patch.php'; ?>
        <script type="text/javascript" src ="memory_ord2.js"></script>
        <style>
            #goToTop {display:none}
        </style>
    </head>

    <body>
        <div id="head">
            <?php include_once '../Include/header.php'; ?>
        </div>

        <?php include_once '../Include/ad.php'; ?>

        <div id="gameResolutionAlert" class="hide_extraLarge hide_large">
            <h3>Resolution too low alert!</h3>
            <p>You are trying to run this game on a device which has insufficient resolution to display the game properly. Just so you know ...</p>   
        </div>



        <div class="win">
            <a href="/Games/" title="Return to games' index">
                <img class="fr logo" src="/Images/Eyes.png" alt="Memory with ordinals - game" width="100" height="100"></a>
            <h1>Memory - Ordinals Part 2</h1>
            <p>Find the pairs; each ordinal has its matching word ('21st - TWENTY-FIRST', 'THIRTIETH - 30th'). 
                This variant focuses on some numbers from 13 to 99. </p>
            <p id="version" style="font-family: Consolas; font-size:12px"></p>
        </div>

        <div class="inf">
            <p id ="clicks">Guesses: 0 &nbsp &nbsp &nbsp</p>
            <p id ="togo">Pairs to find: 12&nbsp &nbsp &nbsp</p>
            <p id ="what"></p>
        </div>

        <div id="page" class="win">
            <div id="welldone" style="display:none">
                <h1 style="text-align:center">Well Done!</h1>
                <h2 style="text-align:center" id="upd">YOU FOUND ALL PAIRS IN GUESSES</h2>
                <h3 style="text-align:center">Press 'F5' or <input id="play_again" type="button" value="Play again"/> to play again.</h3>
            </div>
        </div>

        <div id="foot">
            <?php include_once '../Include/footer.php'; ?>
        </div>

    </body>
</html>