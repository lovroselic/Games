<?php include_once '../PHP/cache.php'; ?>
<!DOCTYPE html>
<html>
    <head>
        <?php include_once '../Include/meta-games.php'; ?>
        <?php include_once '../Include/includes.php'; ?>
        <link href="/CSS/CastleHaunt.css" rel="stylesheet" type="text/css">

        <title>Anxys</title>
        <?php include_once '../Include/IE_patch.php'; ?>
        <script src="/JS/LIB/prototypeLIB_1_11.js" type="text/javascript"></script>
        <script src="/JS/LIB/score_1_01.js" type="text/javascript"></script>
        <script src="/JS/LIB/engine_1_50.js" type="text/javascript"></script>
        <script src="/JS/LIB/assets_anxys.js" type="text/javascript"></script>
        <script src="/JS/LIB/map_anxys.js" type="text/javascript"></script>
        <script src="/Games/anxys.js" type="text/javascript"></script>
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
            <p>You are a ghost. And as everybody knows ghost are greedy. So are you. You can not resist entering the ancient tombs to grab some treasure. So here we go ...</p>
            <p id="buttons">
                <input type='button' id='toggleHelp' value='Show/Hide Instructions'>
                <input type='button' id='toggleAbout' value='About'>
            </p>
            <div id="help" class="section">
                <fieldset>
                    <legend>
                        Instructions:
                    </legend>
                    <p>Use cursor keys to guide the ghost.</p>
                    <p>Shoot left and right using A and D key.</p>
                    <p>Press space to have a wish granted - once per level. There is only one thing for you to wish - for all your enemies to die.</p>
                    <p>Clear the stage within allocated time, or else ...</p>
                    <p>You might even get extra life when you reach certain score.</p>

                </fieldset>
            </div>
            <div id="about" class="section">
                <fieldset>
                    <legend>
                        About:
                    </legend>
                    <image src= "https://www.arcade-museum.com/images/118/1181242184109.png" alt="Tutankham" class="fl pic" title="Tutankham">
                    <p>Anxys is not hiding that it is a clone of <a href="https://www.arcade-museum.com/game_detail.php?game_id=10227" target="_blank">Tutanhham</a>, legendary console game from 1982.
                        The game ate a lot of my coins back in the day and had anxious and stressful gameplay - hence the name of my clone. The first four levels are almost verbatim copy of original. </p>
                    <p>Source of graphics are various free resource sites. No copyrighted images were intendedly used in the making of the game. Code is written in JavaScript using JQuery library.</p>

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