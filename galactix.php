<?php include_once '../PHP/cache.php'; ?>
<!DOCTYPE html>
<html>
    <head>
        <?php include_once '../Include/meta-games.php'; ?>
        <?php include_once '../Include/includes.php'; ?>
        <link href="/CSS/galactix.css" rel="stylesheet" type="text/css">

        <title>GalactiX</title>
        <?php include_once '../Include/IE_patch.php'; ?>
        <script src="galactix.js" type="text/javascript"></script>
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
            <div id ="SC"></div>
            <h1 id="title"></h1>
            <p style="font-family: 'Emulogic'; font-size: 13px">Alien invasion is imminent. Protect the Earth!</p>
            <p id="buttons">
                <input type='button' id='toggleHelp' value='Show/Hide Instructions'>
                <input type='button' id='toggleAbout' value='About'>
            </p>
            <div id="help" class="section">
                <fieldset>
                    <legend>
                        Instructions:
                    </legend>
                    <p>Use cursor keys to move the ship and CTRL to fire. </p>
                    <p>As you defeat wave after wave of aliens, your ship will be upgraded with better weapons ...</p>

                </fieldset>
            </div>
            <div id="about" class="section">
                <fieldset>
                    <legend>
                        About:
                    </legend>
                    <img src= "https://upload.wikimedia.org/wikipedia/en/2/20/SpaceInvaders-Gameplay.gif" alt="Space Invaders" class="fl pic" title="Space Invaders" width='100'>
                    <p>GalactiX is inspired by legendary arcade games from 70' and 80' such as <a href="https://en.wikipedia.org/wiki/Space_Invaders" target="_blank">Space Invaders</a>
                        and <a href="https://en.wikipedia.org/wiki/Galaxian" target="_blank">Galaxian</a>. Wave 1 uses some original characters from Space Invaders out of respect for this revolutionary game from 1978.
                    </p>
                    <p>Source of graphics are various free resource sites. No copyrighted images were intendedly used in the making of the game. Code is written in JavaScript using JQuery framework.</p>
                </fieldset>
            </div>

            <p class="version cb" id="version"></p>
        </div>

        <div id="game" class="winTrans"></div>
        <div id="bottom" class="cb" style ="margin-top: 720px"></div>
        <div id="temp" class="hidden"></div>
        <div id="temp2" class="hidden"></div>


        <div id="foot">
            <?php include_once '../Include/footer.php'; ?>
        </div>
    </body>
</html>