<?php include_once '../PHP/cache.php'; ?>
<!DOCTYPE html>
<html>
    <head>
        <?php include_once '../Include/meta-games.php'; ?>
        <?php include_once '../Include/includes.php'; ?>
        <link href="/CSS/DotHunter.css" rel="stylesheet" type="text/css">

        <title>DOT-HUNTER</title>
        <?php include_once '../Include/IE_patch.php'; ?>
        <script src="/JS/LIB/prototypeLIB_2_11.js" type="text/javascript"></script>
        <script src="/JS/LIB/score_1_04.js" type="text/javascript"></script>
        <script src="/JS/LIB/engine_2_45.js" type="text/javascript"></script>
        <script src="/JS/LIB/assets_DotHunter.js" type="text/javascript"></script>
        <script src="/JS/LIB/speech_1_00.js" type="text/javascript"></script>
        <script src="/JS/LIB/maze_2_80.js" type="text/javascript"></script>
        <script src="/Games/DotHunter.js" type="text/javascript"></script>
        <style>#goToTop {display:none}</style>
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

        <div id="preload" class="hidden"></div>
        <div class="win" id="setup">
            <div id="load">
            </div>
            <a href="/Games/" title="Return to games' index"><img alt="Return" class="fr logo" src="/Images/Eyes.png" width="20" height="20"></a>
            <div id="SC"></div>
            <h1 id="title"></h1>
            <p>Rat has this amazing feeling thar he needs to eat all the dots he sees. It's pity that this nasty ghosts are being such an annoyance. 
                Luckily there is some cheese in the maze. And eating cheese makes feel the Rat as a dragon. Fierce an powerful. And the ghosts seems to be afraid. Sometimes. Take care.</p>
            <p id="buttons">
                <input type='button' id='toggleHelp' value='Show/Hide Instructions'>
                <input type='button' id='toggleAbout' value='About'>
            </p>
            <div id="help" class="section">
                <fieldset>
                    <legend>
                        Instructions:
                    </legend>
                    <p>Collect all the dots in the maze. The cheese would make the rat feel like a dragon ... Use cursor keys to navigate the maze.</p>
                </fieldset>
            </div>
            <div id="about" class="section">
                <fieldset>
                    <legend>
                        About:
                    </legend>
                    <image src="https://upload.wikimedia.org/wikipedia/en/5/59/Pac-man.png" alt="Pac-Man" class="fl pic" title="Pac-Man">
                    <p> Dot Hunter is a clone of <a href="https://en.wikipedia.org/wiki/Pac-Man" target="_blank">Pac-Man</a>, released in 1980. </p>
                    <p>The version tries to capture most of the Pac-Man rules (and also some bugs ...), but to make it more challenging to code,
                        it features procedural random mazes, constructed in a way that follows the rules of classic Pac-Man maze.</p>
                    <p>Features <a href="https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm" target="_blank">Dijkstra's</a> and <a href="https://en.wikipedia.org/wiki/A*_search_algorithm" target="_blank">A*</a>
                        algorithms for path finding and my own algorithm for procedural dungeon generation.
                    </p>

                </fieldset>
            </div>

            <p class="version cb" id="version"></p>
        </div>

        <div id="game" class="winTrans"></div>
        <div id="bottom" class="cb" style="margin-top: 720px"></div>
        <div id="temp" class="hidden"></div>
        <div id="temp2" class="hidden"></div>


        <div id="foot">
            <?php include_once '../Include/footer.php'; ?>
        </div>
    </body>
</html>