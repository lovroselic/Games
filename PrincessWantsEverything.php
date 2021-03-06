<?php include_once '../PHP/cache.php'; ?>
<!DOCTYPE html>
<html>
    <head>
        <?php include_once '../Include/meta-games.php'; ?>
        <?php include_once '../Include/includes.php'; ?>
        <link href="/CSS/PWE.css" rel="stylesheet" type="text/css">

        <title>Princess Wants Everything</title>
        <?php include_once '../Include/IE_patch.php'; ?>
        <script src="PWE.js" type="text/javascript"></script>
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

        <div id="preload"></div>

        <div class="win" id="setup">
            <div id="load"></div>
            <a href="/Games/" title="Return to games' index"><img alt="Amaziacs" class="fr logo" src="/Images/Eyes.png" width="100" height="100"></a>
            <h1 id="title"></h1>
            <p>
                Coolie is on a vacation in a strange castle, owned by a spoiled and annoying princess. Explore the secrets of the castle and its inhabitants. 
                Princess is known to have been stealing from her subjects, but still ... you might be inclined to help her, because
                ... it's fun!
            </p>
            <p id="buttons">
                <input type='button' id='toggleHelp' value='Show/Hide Instructions'>
                <input type='button' id='toggleAbout' value='About'>
            </p>
            <div id="help" class="section">
                <fieldset>
                    <legend>
                        Commands:
                    </legend>
                    <p>
                        Move Coolie using the cursor keys.
                        <br/>Type the commands to interact with the world.
                    </p>
                    <p>
                        <strong>HELP:</strong> displays list of available commands Coolie understands.
                    </p>
                    <p>
                        <strong>LOOK:</strong> shows description of your surroundings.
                    </p>
                    <p>
                        <strong>OPEN:</strong> for example 'OPEN THE DOOR'.
                    </p>
                    <p>
                        <strong>TAKE:</strong> allows you to take items; for example 'TAKE THE SWORD'.
                    </p>
                    <p>
                        <strong>INVENTORY:</strong> description of items names in Coolie's pockets.
                    </p>
                    <p>
                        <strong>DROP:</strong> allows Coolie to drop items, when her pockets are full. For example 'DROP THE SWORD'.
                    </p>
                    <p>
                        <strong>GIVE:</strong> allows Coolie to give items to the inhabitants of the castle. For example 'GIVE THE SWORD TO THE PRINCESS'.
                    </p>
                    <p>
                        <strong>TALK:</strong> Coolie can talk to the inhabitants of the castle. For example 'TALK TO THE PRINCESS'.
                    </p>
                    <p>
                        <strong>SEARCH:</strong> you can search through some containers. For example 'SEARCH THE CHEST'.
                    </p>
                    <p>
                        <strong>EXAMINE:</strong> same as SEARCH.
                    </p>
                </fieldset>
            </div>
            <div id="about" class="section">
                <fieldset>
                    <legend>
                        About:
                    </legend>
                    <p>
                        <span class="prg_name"></span> is a game, designed not only to immerse the child in a mysterious world of exploration and logical thinking, but also to pratice spelling and names of colours, animals, items, ... and of course the use of
                        preposition 'the'.
                    </p>
                    <p>
                        Gameplay is roughly inspired by classic <a href="https://en.wikipedia.org/wiki/Commodore_64" target="_blank">C64</a> and <a href="https://en.wikipedia.org/wiki/ZX_Spectrum" target="_blank">ZX Spectrum</a> games, such as <a href="https://en.wikipedia.org/wiki/Atic_Atac"
                                                                                                                                                                                                        target="_blank">Atic Atac</a>, <a href="http://tolkiengateway.net/wiki/The_Hobbit_(1982_video_game)" target="_blank">the Hobbit</a>, <a href="http://www.c64-wiki.com/index.php/Spy_vs_Spy" target="_blank">Spy vs. Spy</a> which are honoured
                        in some of the ingame graphics.
                    </p>
                    <p>
                        Source of graphics are various free resource sites. No copyrighted images (except Coolie) were used in the making of the game. Code is written in JavaScript using JQuery framework.
                    </p>
                    <p>
                        No frogs or princesses were hurt in the making of the game.
                    </p>
                </fieldset>
            </div>

            <p class="version cb" id="version"></p>
        </div>
        <div id="game" class="winTrans"></div>
        <div id="temp" class="hidden"></div>

        <div id="foot">
            <?php include_once '../Include/footer.php'; ?>
        </div>
    </body>
</html>