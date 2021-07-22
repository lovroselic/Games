<?php include_once '../PHP/cache.php'; ?>
<!DOCTYPE html>
<html>
    <head>
        <?php include_once '../Include/meta-games.php'; ?>
        <?php include_once '../Include/includes.php'; ?>
        <link href="/CSS/CastleHaunt.css" rel="stylesheet" type="text/css">

        <title>GhostRun</title>
        <?php include_once '../Include/IE_patch.php'; ?>
        <script src="/JS/LIB/prototypeLIB_2_10.js" type="text/javascript"></script>
        <script src="/JS/LIB/score_1_04.js" type="text/javascript"></script>
        <script src="/JS/LIB/engine_2_41.js" type="text/javascript"></script>
        <script src="/JS/LIB/assets_ghostrun.js" type="text/javascript"></script>
        <script src="/JS/LIB/map_ghostrun.js" type="text/javascript"></script>
        <script src="/JS/LIB/maze_2_71.js" type="text/javascript"></script>
        <script src="/JS/LIB/speech_1_00.js" type="text/javascript"></script>
        <script src="/Games/GhostRun.js" type="text/javascript"></script>
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
            <a href="/Games/" title="Return to games' index"><img alt="Anxys" class="fr logo" src="/Images/Eyes.png" width="20" height="20"></a>
            <div id="SC"></div>
            <h1 id="title"></h1>
            <p>Ghosty has become rich in his previous adventures in Princess' castle (<a href="/Games/CastleHaunt.php">CastleHunt</a>) and ancient tombs (<a href="/Games/Anxys.php">Anxys</a>). And as he wanted to enjoy the fruits of his greed in peace, the greedy wizard appeared. YOU!</p>
            <p>Your goal is to steal Ghosty's treasure and avoid his nasty friends. As you are a wizard, you can spit green pools of acid to confuse and delay monsters, but doing so costs energy. Running around in frantic panic also costs energy, so take care. Study your enemy carefully, they are not the same. Some are smarter than others ... but they are bound to their rules.</p>
            <p>Check instructions to learn more.</p>
            <p id="buttons">
                <input type='button' id='toggleHelp' value='Show/Hide Instructions'>
                <input type='button' id='toggleAbout' value='About'>
            </p>
            <div id="help" class="section">
                <fieldset>
                    <legend>
                        Instructions:
                    </legend>
                    <p>Use cursor keys to navigate wizard.</p>
                    <p>Use Control key to release green pools of acid.</p>
                    <p>Collect all gold bars to clear the level.</p>
                </fieldset>
            </div>
            <div id="about" class="section">
                <fieldset>
                    <legend>
                        About:
                    </legend>
                    <image src="https://www.c64-wiki.com/images/7/7f/Radar_Rat_Race_Start.png" alt="Radar Rat Race" class="fl pic" title="Radar Rat Race">
                    <p> GhostRun is a clone of <a href="https://www.c64-wiki.com/wiki/Radar_Rat_Race" target="_blank">Radar Rat Race</a>, released in 1982 for Commodore VIC-20 and C64. It was the very first game I every played on my C64. It was hard and frantic and I
                        kind of hated it. </p>
                    <p>In this clone I wanted to keep most of the features of the original intact. The main goal was to design a distinct personalities for antagonists.</p>
                    <p>Source of graphics are various free resource sites. No copyrighted images were intendedly used in the making of the game. Code is written in JavaScript using JQuery framework.</p>

                </fieldset>
            </div>

            <p class="version cb" id="version"></p>
        </div>

        <div id="game" class="winTrans"></div>
        <div id="bottom" class="cb" style="/*margin-top: 888px*/"></div>
        <div id="temp" class="hidden"></div>
        <div id="temp2" class="hidden"></div>

        <div id="spacer"></div>

        <div id="foot">
            <?php include_once '../Include/footer.php'; ?>
        </div>
    </body>
</html>