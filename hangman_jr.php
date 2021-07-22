<?php include_once '../PHP/cache.php'; ?>
<!DOCTYPE html>
<html>
    <head>
        <?php include_once '../Include/meta-games.php'; ?>
        <?php include_once '../Include/includes.php'; ?>
        <link href="/CSS/hangman_jr.css" rel="stylesheet" type="text/css">
        <title>Hangman Junior</title>
        <?php include_once '../Include/IE_patch.php'; ?>
        <script src="hangman_jr.js" type="text/javascript"></script>
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

        <div class="win"> <a href="/Games/" title="Return to games' index"><img alt="Hangman - guess the sentence" class="fr logo" src="/Images/Eyes.png" width="100" height="100"></a>

            <h1>Hangman Junior</h1>

            <p>Hangman JR - is a word guessing game with helpful illustrations. Choose from the selection of themes (animals, food, clothes, ...), guess the word and finally fill in the correct definite or indefinite article (or maybe there is none?) to win the game and save the Hangman.</p>
            <p><a href="/CoolPool_ENG/cooltool_eng.php" target="_blank">CoolTool card catalogue</a> was used as a basis for words used in the game.</p>
        </div>
        <div class="win">
            <div>
                <fieldset id="L1">
                    <legend>Select theme</legend>
                    <select id="theme">
                    </select>
                    <br />
                    <button type="button" name="start" id="start">Start Game</button>
                </fieldset>
            </div>
            <div>
                <fieldset id="L2">
                    <legend>Input</legend>
                    <label for="getLetter" style="font-size:20px">Which letter is next?
                        <br/>
                    </label>
                    <input type="text" id="getLetter" size="1" maxlength="1" name="getLetter" disabled/>
                    <br />
                    <br />
                    <button type="button" name="guess" id="guess" disabled>Enter Letter</button>
                </fieldset>
            </div>
            <div id="story">
                <img src="/Images/Hangman_JR_title.png" width="440" />
            </div>
            <div id="forgive">
                <p id="lives">Forgiveness:</p>
            </div>
            <br class="cb" />
        </div>
        <div id="page" class="win">
            <div id="the_picture"></div>
            <form action="" id="build">
                <p id="buildSentence">...</p>
            </form>
            <p id="leftovers">Incorrect letters:</p>
            <p id="message">Message:</p>
            <p class="cb"></p>
        </div>

        <div id="foot">
            <?php include_once '../Include/footer.php'; ?>
        </div>
    </body>
</html>