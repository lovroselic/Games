<?php include_once '../PHP/cache.php'; ?>
<!DOCTYPE html>
<html>
    <head>
        <?php include_once '../Include/meta-games.php'; ?>
        <?php include_once '../Include/includes.php'; ?>
        <link rel="stylesheet" type="text/css" href="/CSS/gmn.css">
        <title>Guess My Number</title>
        <?php include_once '../Include/IE_patch.php'; ?>
        <script type="text/javascript" src ="guess_my_number.min.js"></script>
        <style>
            #goToTop {display:none}
        </style>
    </head>

    <body>
        <div id="head">
            <?php include_once '../Include/header.php'; ?>
        </div>

        <?php include_once '../Include/ad.php'; ?>

        <div id="gameResolutionAlert" class="hide_extraLarge hide_large hide_large hide_medium hide_small hide_extraSmall">
            <h3>Resolution too low alert!</h3>
            <p>You are trying to run this game on a device which has insufficient resolution to display the game properly. Just so you know ...</p>

        </div>

        <div class="win">
            <a href="/Games/" title="Return to games' index">
                <img class="fr logo" src="/Images/Eyes.png" alt="Guess my number - game - try to guess the number using words" width="100" height="100"></a>
            <h1>Guess My Number</h1>
            <p>The simplest of games ...  I, the Mighty Computer will think of a number and YOU will try to guess it. However, you must spell
                the number (like <em><span class="blue">seventeen</span>, <span class="blue">forty-two</span>, <span class="blue">sixty-seven</span></em>, ... <strong>mind those dashes!</strong>) instead of just typing in the numbers.</p>
            <p>Select the range and press "Start new game" and we will start. </p>
        </div>

        <div id="setup">
            <fieldset>
                <legend>Setup game:</legend>
                <table>
                    <tbody>
                    <th> Select the range:</th>
                    <th></th>
                    <tr>
                        <td>
                            <input type="radio" name="level" value="1">1-10<br>
                            <input type="radio" name="level" value="2">1-20<br>
                            <input type="radio" name="level" value="3" checked>1-99<br>
                        </td>
                        <td>
                            <input id="begin" type="button" value="Start a new game" />  
                        </td>
                        <td>
                            <label for="guess">Your Guess:</label>
                            <input type="text" id="guess" value="" size="16" disabled>
                        </td>
                        <td><input id="GB" type="button" value="Guess" disabled>  </td>
                    </tr>
                    </tbody>
                </table>
            </fieldset>
        </div>

        <div id="page" class="win" style="height:400px; overflow-y:scroll">

        </div>

        <div id="foot">
            <?php include_once '../Include/footer.php'; ?>
        </div>

    </body>
</html>