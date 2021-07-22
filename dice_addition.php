<?php include_once '../PHP/cache.php'; ?>
<!DOCTYPE html>
<html>
    <head>
        <?php include_once '../Include/meta-games.php'; ?>
        <?php include_once '../Include/includes.php'; ?>
        <link href="/CSS/dice_addition.css" rel="stylesheet" type="text/css">
        <title>Dice Addition</title>
        <?php include_once '../Include/IE_patch.php'; ?>
        <script src="dice.js" type="text/javascript"></script>
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
            <a href="/Games/" title="Return to games' index">
                <img alt="Dice addition math english game" class="fr logo" src="/Images/Eyes.png" width="100" height="100"></a>

            <h1>Dice Addition</h1>

            <p>Add all of the dots on the dice and spell the result (twenty-one not 21, for example). The quicker your answer, the more points you score. 
                More dice and more rounds also increases your score. </p>

            <div id="setup">
                <form action="">
                    <fieldset>
                        <legend>Setup</legend>
                        <div class="setup_container"> <strong>Number of dice used (2-6): &nbsp;&nbsp;</strong> 
                            <input id="dice" maxlength="2" size="1" type="text" value="3" />&nbsp;&nbsp;&nbsp;&nbsp;
                            <br/>
                            <input id="randomize" name="d_rand" type="checkbox" />Randomize
                            <br/>
                        </div>
                        <div class="setup_container"> <strong>How many rounds (5-25): &nbsp;&nbsp;</strong> 
                            <input id="rounds" maxlength="2" size="1" type="text" value="10" />&nbsp;&nbsp;&nbsp;&nbsp;</div>
                        <div id="hiscore"></div>
                        <input id="start" type="button" value="Start new game" />
                    </fieldset>
                </form>
            </div>
        </div>		

        <div class="nowin" id="score_container">Score: <span id="score"></span></div>
        <div class="nowin" id="message">Click the die to roll the dice:
            <br/>
            <input type="image" id="roll" src="/Sprite/BlackDie.png" title="Click to roll the dice" />
            <p>Round: <span id="roundCounter"></span></p>
            <div id="answers"></div>
        </div>
        <div class="nowin" id="board"></div>

        <div id="foot">
            <?php include_once '../Include/footer.php'; ?>
        </div>
    </body>
</html>