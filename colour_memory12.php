<?php include_once '../PHP/cache.php'; ?>
<!DOCTYPE html>
<html>
    <head>
        <?php include_once '../Include/meta-games.php'; ?>
        <?php include_once '../Include/includes.php'; ?>
        <link href="/CSS/memory.css" rel="stylesheet" type="text/css">
        <title>Memory - Colours</title>
        <?php include_once '../Include/IE_patch.php'; ?>
        <script src="memory_col12.min.js" type="text/javascript"></script>
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

        <div id="descript">
            <a href="/Games/" title="Return to games' index">
                <img alt="Memory with colours - game" class="fr logo" src="/Images/Eyes.png" width="100" height="100"></a>

            <h1>Memory - Colours</h1>

            <p>Find the pairs; each colour has its matching word. Beginners might want to have colour names coloured, while the masters will play without that help
                (just click the option). The names of colours will be pronounced if you leave the option checked. Both options can be changed during game.</p>

            <form action="">
                <input checked id="hint" name="Hint" type="checkbox" value="clickHint">The colour names are coloured.<br>
                <input checked id="pronounce" name="Pronounce" type="checkbox" value="clickpronounce">Pronounce colour names.<br>
            </form>
            <p id="version" style="font-family: Consolas; font-size:12px"></p>
        </div>


        <div class="inf">
            <p id="clicks">Guesses: 0 &nbsp; &nbsp; &nbsp;</p>

            <p id="togo">Pairs to find: 12&nbsp; &nbsp; &nbsp;</p>

            <p id="what"></p>
        </div>

        <div id="page" class="win">
            <div id="welldone" style="display:none">
                <h1>Well Done!</h1>
                <h2 id="upd" style="text-align:center">YOU FOUND ALL PAIRS IN GUESSES</h2>
                <h3 style="text-align:center">Press 'F5' or <input id="play_again" type="button" value="Play again"/> to play again.</h3>
            </div>
        </div>

        <div id="foot">
            <?php include_once '../Include/footer.php'; ?>
        </div>
    </body>
</html>