<?php include_once '../PHP/cache.php'; ?>
<!DOCTYPE html>
<html>
    <head>
        <?php include_once '../Include/meta-games.php'; ?>
        <?php include_once '../Include/includes.php'; ?>
        <link href="/CSS/hangman.css" rel="stylesheet" type="text/css">
        <title>Hangman</title>
        <?php include_once '../Include/IE_patch.php'; ?>
        <script src="hangman.min.js" type="text/javascript"></script>
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

        <div class="win">
            <a href="/Games/" title="Return to games' index"><img alt="Hangman - guess the sentence" class="fr logo" src="/Images/Eyes.png" width="100" height="100"></a>

            <h1>Hangman</h1>

            <p>Hangman - is a guessing game. Computer will generate a sentence and your job is to find all the letters in it.
                The sentence is randomly generated so you can expect some funny texts such as <em>"YOUR MOTHER IS BARKING MADLY"</em>.
                If you miss seven letters Hangman will be hanged (no more forgiveness).</p>
            <p><strong>Easy:</strong> all first and last letters of the word, as well as those repeating, are revealed.<br>
                <strong>Medium:</strong> five random letters (and those repeating) are revealed.<br>
                <strong>Hard:</strong> nothing is revealed.</p>

        </div>
        <div class="win">
            <form action="">
                <fieldset id="L1">
                    <legend>Select difficulty</legend>
                    <input type="radio" name="level" value="easy" />Easy
                    <br />
                    <input type="radio" name="level" value="medium" checked="checked" />Medium
                    <br />
                    <input type="radio" name="level" value="hard" />Hard
                    <br />
                    <br />
                    <button type="button" name="start" id="start">Start Game</button>
                </fieldset>
            </form>
            <form action="">
                <fieldset id="L2">
                    <legend>Input</legend>
                    <label for="getLetter" style="font-size:20px">Which letter is next?<br></label>
                    <input type="text" id="getLetter" size="1" maxlength="1" name="getLetter" disabled>
                    <br />
                    <br />
                    <button type="button" name="guess" id="guess" disabled>Enter Letter</button>
                </fieldset>
            </form>
            <div id ="story">		
                <img src="/Images/hangman_title.png" width="440">		
            </div>
            <div id="forgive">
                <p id="lives">Forgiveness: </p> 
            </div>
            <br class="cb">
        </div>

        <div id="page" class="win">
            <p id="buildSentence">...</p>
            <p id="leftovers">Incorrect letters: </p>
            <p id="message">Message:</p>

        </div>

        <div id="foot">
            <?php include_once '../Include/footer.php'; ?>
        </div>
    </body>
</html>