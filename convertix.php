<?php include_once '../PHP/cache.php'; ?>
<!DOCTYPE html>
<html>
    <head>
        <?php include_once '../Include/meta-games.php'; ?>
        <?php include_once '../Include/includes.php'; ?>
        <link href="/CSS/convertix.min.css" rel="stylesheet" type="text/css">

        <title>ConvertiX</title>
        <?php include_once '../Include/IE_patch.php'; ?>
        <script src="convertix.min.js" type="text/javascript"></script>
        <style>
            #goToTop {display:none}
        </style>
    </head>

    <body>
        <div id="head">
            <?php include_once '../Include/header.php'; ?>
        </div>

        <?php include_once '../Include/ad.php'; ?>

        <div id="setup" class="win">
            <a href="/Games/" title="Return to games' index"><img alt="Racing shapes english game" class="fr logo" src="/Images/Eyes.png" width="100" height="100"></a>
            <h1>ConvertiX</h1>
            
            <p>Practice your unit conversion skills. Uncheck 'Merciless' if you find the game too challenging.</p>
            <p>Press 'Help' to refresh your knowledge.</p>
            <p> Press 'Game' to start the challenge ... </p>
            <p id ="version" class="version"></p>
            <div class="setup_container" id="panel1">
                <input type="button" id="help" value="HELP" />
                <select id="select"></select>
                <input type="text" id="help_val" value="1" maxlength="10" size="10" title="Use decimal point!" />
                <select id="unit"></select>
                <br>
                <br>
                <hr>
                <hr>
                <br>
                <input type="button" id="game" value="GAME" />&nbsp How many rounds:
                <input type="text" id="how_many" value="10" maxlength="3" size="2" />&nbsp
                <input type="checkbox" name="mercyless" id="mercyless" checked="checked" title='Uncheck if you find the game too challenging'/>  Merciless
            </div>
            <div class="setup_container"></div>
            <br class="cb">
        </div>
        <div id="board"></div>

        <div id="foot">
            <?php include_once '../Include/footer.php'; ?>
        </div>
    </body>
</html>