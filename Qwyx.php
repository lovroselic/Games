<?php include_once '../PHP/cache.php'; ?>
<!DOCTYPE html>
<html>
    <head>
        <?php include_once '../Include/meta-games.php'; ?>
        <?php include_once '../Include/includes.php'; ?>
        <link href="/CSS/DotHunter.css" rel="stylesheet" type="text/css">

        <title>QWYX</title>
        <?php include_once '../Include/IE_patch.php'; ?>
        <script src="/JS/LIB/prototypeLIB_2_13.js" type="text/javascript"></script>
        <script src="/JS/LIB/score_1_04.js" type="text/javascript"></script>
        <script src="/JS/LIB/engine_2_51.js" type="text/javascript"></script>
        <script src="/JS/LIB/grid_2_00.js" type="text/javascript"></script>
        <script src="/JS/LIB/assets_Qwyx.js" type="text/javascript"></script>
        <script src="/Games/Qwyx.js" type="text/javascript"></script>
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
            <p>Capture at least 75% of the territory from the Qwyx, while avoiding Sparx and the Fuse. Remake of the legendary game from 1981.</p>
            <p id="buttons">
                <input type='button' id='toggleHelp' value='Show/Hide Instructions'>
                <input type='button' id='toggleAbout' value='About'>
            </p>
            <div id="help" class="section">
                <fieldset>
                    <legend>
                        Instructions:
                    </legend>
                    <p>Cursor key to move.</p>
                    <p>SHIFT - slow draw - double score</p>
                    <p>CTRL - fast draw</p>
                    <p>Split the two Qwyxes to increase bonus multiplier.</p>
                </fieldset>
            </div>
            <div id="about" class="section">
                <fieldset>
                    <legend>
                        About:
                    </legend>
                    <image src="https://upload.wikimedia.org/wikipedia/en/thumb/8/8d/Qixingame.png/220px-Qixingame.png" alt="Qix" class="fl pic" title="Qix">
                    <p> QWYX is a clone of <a href="https://en.wikipedia.org/wiki/Qix" target="_blank">Qix</a>, released in 1981; developed by Randy and Sandy Pfeiffer.</p>
                    <p>This clone tries to remains faithful to the original with some slight modifications.</p>
                    <p>Algorithm for finding the point on which Flood fill is to be performed, described in <a href = "https://gamedev.stackexchange.com/a/184932/109513" target="_blank">gamedev.stackexchange</a>.</p>

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