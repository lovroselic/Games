<?php include_once '../PHP/cache.php'; ?>
<!DOCTYPE html>
<html>
    <head>
        <?php include_once '../Include/meta-games.php'; ?>
        <?php include_once '../Include/includes.php'; ?>
        <link href="/CSS/grammory.css" rel="stylesheet" type="text/css">

        <title>Grammory</title>
        <?php include_once '../Include/IE_patch.php'; ?>
        <script src="/JS/LIB/prototypeLIB_1_02.js" type="text/javascript"></script>
        <script src="/JS/LIB/grammaLIB_1_01.js" type="text/javascript"></script>
        <script src="/JS/LIB/wordNumConvert_1_00.js" type="text/javascript"></script>    
        <script src="/JS/grammory.js" type="text/javascript"></script>  
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


        <div class="win" id="setup">
            <a href="/Games/" title="Return to games' index"><img alt="scramblyx" class="fr logo" src="/Images/Eyes.png" width="20" height="20"></a>
            <div id="players">
                <div id="players_inner">
                </div>
            </div>

            <h1 id="title"></h1>
            <p>Grammory is a memory game with grammar. What fun! Instead of finding matching tiles, the goal is to find tiles with different parts of speech and form sentences from them. Check instructions to learn more or just start playing.</p>
            <div id="playerInput">
                <p>
                    <input type='button' id='addPlayer' value='Enroll Player'>
                    <input type='text' id='inputPlayer' value='enter player name here' class="wait">
                    <span>Enter name of 1 to <span id="nop"></span> players.</span>
                </p>
            </div>
            <p id="buttons">
                <input type='button' id='startGame' value='Start Grammory'>
                <input type='button' id='toggleSettings' value='Settings'>
                <input type='button' id='toggleHelp' value='Show/Hide Instructions'>
                <input type='button' id='toggleAbout' value='About'>
            </p>

            <div id="settings" class="section">
                <fieldset>
                    <legend>
                        Settings:
                    </legend>
                    <p>
                        Select game type:
                        <select id="gameType"></select>
                    </p>
                    <div>
                        <input type="checkbox" id="colorAdverb" checked>
                        <label for="colorAdverb">Use colored adverbs</label>
                    </div>
                    <div>
                        <input type="checkbox" id="comments" checked>
                        <label for="comments">Use comments</label>
                    </div>

                </fieldset>
            </div>
            <div id="help" class="section">
                <fieldset>
                    <legend>
                        Instructions:
                    </legend>
                    <p>Grammory is a memory game with grammar. Instead of finding matching tiles, the goal is to find tiles with different parts of speech so you can form your own sentences. Based on your selection (check settings) you need to find tree or four different
                        tiles. Subject (who), verb (what), adverb of time (when) and in advanced game also adverb of place (where).
                    </p>
                    <p>As no sentence is properly concluded without punctuation mark, don't forget to end it with the period!</p>
                    <p>Comments: when clicked on tile, the game will acknowledge the part of speech uncovered. Untick for more challenging game.</p>
                    <p>Coloured parts of speech: for easier memorisation, each part of speech is coloured. Untick for more challenging game. </p>

                </fieldset>
            </div>
            <div id="about" class="section">
                <fieldset>
                    <legend>
                        About:
                    </legend>
                    <p>Grammory is designed by Mija Selič and programmed by Lovro Selič.</p>
                </fieldset>
            </div>

            <p class="version cb" id="version"></p>
        </div>

        <div id="comm" class="win"></div>
        <div id="outer" class="winTrans">
            <div id="game" class="winTrans"></div>
            <div id="overlay" class="winTrans">
                <canvas id="overCanvas"></canvas>
            </div>
        </div>
        <div id="spacer"></div>


        <div id="foot">
            <?php include_once '../Include/footer.php'; ?>
        </div>
    </body>
</html>