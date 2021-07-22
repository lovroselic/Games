<?php include_once '../PHP/cache.php'; ?>
<!DOCTYPE html>
<html>
    <head>
        <?php include_once '../Include/meta-games.php'; ?>
        <?php include_once '../Include/includes.php'; ?>
        <link href="/CSS/CastleHaunt.css" rel="stylesheet" type="text/css">

        <title>CastleHaunt</title>
        <?php include_once '../Include/IE_patch.php'; ?>
        <script src="/JS/LIB/prototypeLIB_1_07.js" type="text/javascript"></script>
        <script src="/JS/LIB/score_1_01.js" type="text/javascript"></script>
        <script src="/JS/LIB/engine_1_45.js" type="text/javascript"></script>
        <script src="/JS/LIB/assets_castleHaunt.js" type="text/javascript"></script>
        <script src="/JS/LIB/map_castleHaunt.js" type="text/javascript"></script>
        <script src="/Games/castleHaunt.js" type="text/javascript"></script>
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
            <p>The Princess's castle has been overrun with ghost, zombies and whatnot. You might be the last friendly ghost around. But the Princess is still up to something. You better enter the castle and find what she wants.</p>
            <p id="buttons">
                <input type='button' id='toggleHelp' value='Show/Hide Instructions'>
                <input type='button' id='toggleAbout' value='About'>
            </p>
            <div id="help" class="section">
                <fieldset>
                    <legend>
                        Instructions:
                    </legend>
                    <p><strong>Movement</strong>: cursor keys.</p>
                    <p><strong>SPACE</strong>: pick up things, open/unlock door, search containers</p>
                    <p><strong>A, D</strong>: move inventory selector left, right (choose right key to unlock door)</p>
                    <p><strong>RETURN</strong>: drop selected item or use selected item</p>
                    <p><strong>CTRL + direction</strong>: SHOOT deadly yellow 'ghost repelling' magic orbs</p>
                    <p></p>
                    <p><strong>Survival hints</strong>:</p>
                    <p>In this game, a cake is healthier than apple.</p>
                    <p>The more pouches for storing deadly yellow 'ghost repelling' magic orbs you have (used), the more orbs you can carry.</p>
                    <p>Avoid deadly red 'hero repelling' magic orbs. They are not healthy.</p>
                    <p>You can shoot diagonally.</p>
                    <p>Killing all creatures is not always the best strategy.</p>
                    <p>Killing all creatures is sometimes the best strategy.</p>
                    <p>There are potions that will make you faster.</p>
                    <p>Bombs are not dangerous to you.</p>
                    <p>I wonder what 'time runes' might do ...</p>
                    <p>Smart inventory management might save your life.</p>

                </fieldset>
            </div>
            <div id="about" class="section">
                <fieldset>
                    <legend>
                        About:
                    </legend>
                    <img src= "https://upload.wikimedia.org/wikipedia/en/f/fa/Atic_Atac_gameplay.png" alt="atic atac" class="fl pic" title="Atic Atac">
                    <p>When I first saw <a href="https://en.wikipedia.org/wiki/Atic_Atac" target="_blank">Atic Atac</a> in 1983 I was a kid and I was mightily impressed. Remember, those were the times of Space Invaders and Pacman. Atic Atac was a revolution. But since I had C64 and not ZX Spectrum I have actually never played Atic Atac by myself ... However, it have been my desire to be someday able to program such a game and 35 years later my wish has came true.
                    </p>
                    <p>While CastleHaunt is obviously a clone of Atic Atac, some game elements have been changed so CastlaHaunt has its own flavour. The castle interior is also a shrine/museum of some famous 80' and 90' computer games. Or else the Princess is one fanatical gamer.</p>
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