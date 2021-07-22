<?php include_once '../PHP/cache.php'; ?>
<!DOCTYPE html>
<html>
    <head>
        <?php include_once '../Include/meta-games.php'; ?>
        <?php include_once '../Include/includes.php'; ?>
        <link href="/CSS/amaziacs.css" rel="stylesheet" type="text/css">

        <title>AMAZIACS</title>
        <?php include_once '../Include/IE_patch.php'; ?>
        <script src="amaziacs.js" type="text/javascript"></script>
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

        <div class="win" id="setup">
            <div id="load"></div>
            <a href="/Games/" title="Return to games' index"><img alt="Amaziacs" class="fr logo" src="/Images/Eyes.png" width="100" height="100"></a>
            <h1>AmaziacS</h1>
            <h3><em>Amazing Maze Maniacs</em></h3>
            <p>
                Coolie wants to treat herself with something special. Help her collect EXACT amount of coins and buy her a treat.
            </p>
            <p id="buttons">
                <input type='button' id='toggleHelp' value='Show/Hide Instructions'>
                <input type='button' id='toggleSetup' value='Show/Hide Setup'>
            </p>
            <div id="help">
                <fieldset>
                    <legend>
                        Commands:
                    </legend>
                    <p>
                        <strong>HELP</strong> - display all commands known to Coolie.
                    </p>
                    <p>
                        <strong>LOOK</strong> - describes what is under Coolie.
                    </p>
                    <p>
                        <strong>PICK UP COIN</strong> - picks up any coin, which is under Coolie.
                    </p>
                    <p>
                        <strong>DROP</strong> [value] [denomination] COIN - drops specific coin from the inventory. Example: DROP 10 CENT COIN, DROP 2 EURO COIN, ...
                    </p>
                    <p>
                        <strong>MOVE</strong> [direction] - moves into specified direction for 1 space. Directions are LEFT; RIGHT, UP, DOWN: Example: MOVE RIGHT, ... or else use the cursor keys to move Coolie.
                    </p>
                    <p>
                        <strong>MOVE</strong> [how many] (of what) [direction] - where directions are the same as above, 'how many' is a word coresponding to nubers from 2 to 10, and <em>'what'</em> is a description (like spaces, steps, blocks, ... Coolie is
                        a smart girl and know a lot of them.). Example: MOVE FIVE SPACES DOWN.
                    </p>
                    <p>
                        <strong>BUY</strong> [what] - buy a desired treat. Don't forget the preposition. Reminder: you must have EXACT amount of money the rteat costs, no more and certainly not less. Example: BUY A BANANA.
                    </p>
                </fieldset>
            </div>
            <div id="setup2">
                <fieldset id="fieldset">
                    <legend><strong>Setup Game</strong>
                    </legend>
                    <div class="setup_container">
                        <strong>Maze:</strong>
                        <br/>
                        <input name="mazetype" id="mazetype" type="checkbox" />Single Solution (Perfect) Maze
                        <br/>
                        <input name="cursor" id="cursor" type="checkbox" checked/>Use cursor keys to move Coolie
                        <br/>
                        <input type="text" size="1" maxlength="1" id="addCorridors" value="5" /> Add Corridors for Imperfect Maze
                        <br/><br/>
                        <strong>Restart game to apply the new settings if you change them.</strong>
                    </div>
                </fieldset>
            </div>
            <p class="version cb" id="version"></p>
            <p class="version">Drawings by Mija Selič. Programming by Lovro Selič.</p>
        </div>
        <div id="preload" class="hidden"></div>
        <div id="game" class="winTrans"></div>
        <div id="temp" class="hidden"></div>


        <div id="foot">
            <?php include_once '../Include/footer.php'; ?>
        </div>
    </body>
</html>