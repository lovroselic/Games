<?php include_once '../PHP/cache.php'; ?>
<!DOCTYPE html>
<html>
    <head>
        <?php include_once '../Include/meta-games.php'; ?>
        <?php include_once '../Include/includes.php'; ?>
        <link href="/CSS/mazyx.css" rel="stylesheet" type="text/css">

        <title>Mazyx</title>
        <?php include_once '../Include/IE_patch.php'; ?>
        <script src="mazyx.js" type="text/javascript"></script>
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
            <div id ="SC"></div>
            <a href="/Games/" title="Return to games' index"><img alt="Amaziacs" class="fr logo" src="/Images/Eyes.png" width="100" height="100"></a>
            <h1 id="title"></h1>
            <p>Help escape Coolie from the cursed tower full of dangerous monsters.</p>
            <p id="buttons">
                <input type='button' id='toggleHelp' value='Show/Hide Instructions'>
                <input type='button' id='toggleAbout' value='About'>
            </p>
            <div id="help" class="section">
                <fieldset>
                    <legend>
                        Instructions:
                    </legend>
                    <p>Use cursor keys to navigate the maze. Collect all items to open the passage to the lower level.</p>
                    <p>Press 'P' to set poison trap. Poison is dangerous to Coolie as well.</p>
                    <p>Press 'B' to set the bomb. Bomb will explode in 2.5 seconds obliterating every living creature in the vicinity, and making holes in the maze.</p>
                    <p>Coolie is invisible to the monsters when waiting on the stairwell.</p>
                </fieldset>
            </div>
            <div id="about" class="section">
                <fieldset>
                    <legend>
                        About:
                    </legend>
                    <p>Mazyx is roughly inspired by the legendary 80's maze games such as <a href='https://en.wikipedia.org/wiki/Pac-Man' target='_blank'>Pacman</a>,
                        <a href='https://en.wikipedia.org/wiki/Wizard_of_Wor' target='_blank'>Wizard of Wor</a> and similar. No didactic value (except fun) was intended.</p>
                    <p>
                        Source of graphics are various free resource sites. No copyrighted images (except Coolie) were intendedly used in the making of the game. Code is written in JavaScript using JQuery framework.
                    </p>
                </fieldset>
            </div>

            <p class="version cb" id="version"></p>
        </div>

        <div id="game" class="winTrans"></div>
        <div id="temp" class="hidden"></div>

        <div class="cb" style ="margin-top: 768px"></div>
        <div id="foot">
            <?php include_once '../Include/footer.php'; ?>
        </div>
    </body>
</html>