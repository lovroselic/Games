<?php include_once '../PHP/cache.php'; ?>
<!DOCTYPE html>
<html>
    <head>
        <?php include_once '../Include/meta-games.php'; ?>
        <?php include_once '../Include/includes.php'; ?>
        <link href="/CSS/scramblyx.css" rel="stylesheet" type="text/css">

        <title>ScramblyX</title>
        <?php include_once '../Include/IE_patch.php'; ?>
        <script src="/JS/LIB/prototypeLIB_1_02_01.js" type="text/javascript"></script>
        <script src="/JS/LIB/score_1_01.js" type="text/javascript"></script>
        <script src="/JS/LIB/engine_1_30.js" type="text/javascript"></script>
        <script src="/JS/LIB/assets_scramblyx.js" type="text/javascript"></script>
        <script src="/JS/LIB/levels_scramblyx.js" type="text/javascript"></script>
        <script src="/Games/scramblyx.js" type="text/javascript"></script>
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
            <a href="/Games/" title="Return to games' index"><img alt="scramblyx" class="fr logo" src="/Images/Eyes.png" width="20" height="20"></a>
            <div id="SC"></div>
            <h1 id="title"></h1>
            <p>Only the brave fighter pilot can stop the Nazi invasion. Is that you?</p>
            <p id="buttons">
                <input type='button' id='toggleHelp' value='Show/Hide Instructions'>
                <input type='button' id='toggleAbout' value='About'>
            </p>
            <div id="help" class="section">
                <fieldset>
                    <legend>
                        Instructions:
                    </legend>
                    <p>Cursor UP/DOWN: tilt plane angle to ascend/descend.</p>
                    <p>Cursor RIGHT: start plane's engine. </p>
                    <p>Cursor LEFT/RIGHT adjust plane's position/relative speed on screen.</p>
                    <p>CTRL: fire cannon. </p>
                    <p>SPACE: drop bombs</p>
                    <p>Land on the airport at the end of the level. Don't use too steep angle or the plane will crash.</p>

                </fieldset>
            </div>
            <div id="about" class="section">
                <fieldset>
                    <legend>
                        About:
                    </legend>
                    <img src= "https://www.arcade-museum.com/images/118/1181242158130.png" alt="Scramble" class="fl pic" title="Scramble" width='100'>
                    <p>ScramblyX is roughly inspired by legendary 80' games such as (of course) <a href="https://en.wikipedia.org/wiki/Scramble_(video_game)" target = "_blank">Scramble</a>, <a href="https://en.wikipedia.org/wiki/Blue_Max_(video_game)" target = "_blank">Blue Max</a> and <a href="https://en.wikipedia.org/wiki/Fort_Apocalypse" target = "_blank">Fort Apocalypse</a>.
                    </p>
                    <p>Source of graphics are various free resource sites. No copyrighted images were intendedly used in the making of the game. Code is written in JavaScript using JQuery framework.</p>
                </fieldset>
            </div>

            <p class="version cb" id="version"></p>
        </div>

        <div id="game" class="winTrans"></div>
        <div id="bottom" class="cb" style="margin-top: 720px"></div>
        <div id="temp" class="hidden"></div>
        <div id="temp2" class="hidden"></div>
        <div id="spacer"></div>

        <div id="foot">
            <?php include_once '../Include/footer.php'; ?>
        </div>
    </body>
</html>