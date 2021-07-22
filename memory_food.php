<?php include_once '../PHP/cache.php'; ?>
<!DOCTYPE html>
<html>
    <head>
        <?php include_once '../Include/meta-games.php'; ?>
        <?php include_once '../Include/includes.php'; ?>
        <link href="/CSS/memory_items.css" rel="stylesheet" type="text/css">

        <title>MEMORY - FOOD</title>
        <?php include_once '../Include/IE_patch.php'; ?>
        <script src="/JS/jquery-2.1.1.min.js" type="text/javascript"></script>
        <script src="memory_food.js" type="text/javascript"></script>
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

        <div class="win"> <a href="/Games/" title="Return to games' index">
                <img alt="Memory with colours - game" class="fr logo" src="http://www.c00lsch00l.eu/Images/Eyes.png" width="100" height="100"/></a>

            <h1>Memory - Food</h1>

            <p>Find the pairs; each picture has its matching word. The theme of this game is food.</p>
            <p><a href="/CoolPool_ENG/cooltool_eng.php" target="_blank">CoolTool card catalogue</a> was used as a basis for words used in the game.</p>
            <form action="">
                <input checked id="pronounce" name="Pronounce" type="checkbox" value="clickpronounce">Pronounce food names.<br>
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