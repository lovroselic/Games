<?php include_once '../PHP/cache.php'; ?>
<!DOCTYPE html>
<html>
    <head>
        <?php include_once '../Include/meta-games.php'; ?>
        <?php include_once '../Include/includes.php'; ?>
        <link href="/CSS/iv.css" rel="stylesheet" type="text/css">
        <title>Irregular Verbs</title>
        <?php include_once '../Include/IE_patch.php'; ?>
        <script src="irregular_verbs.min.js" type="text/javascript"></script>
        <style>
            #goToTop {display:none}
        </style>
    </head>

    <body>
        <div id="head">
            <?php include_once '../Include/header.php'; ?>
        </div>

        <?php include_once '../Include/ad.php'; ?>

        <div class="win">
            <a href="/Games/" title="Return to games' index"><img alt="Practice irregular verbs" class="fr logo" src="/Images/Eyes.png" width="100" height="100"></a>

            <h1>Irregular Verbs</h1>

            <p>Practice irregular verbs.<br/> Select difficulty: easy - common verbs, primary school level; less easy - less common verbs are included (over 200 in total). <br/>
                Displayed verb: choose which verb is displayed, random of first.
            </p>

            <div id="setup">
                <fieldset>
                    <legend>Setup</legend>Difficulty:
                    <input type="radio" name="level" value="easy" checked="checked" />Easy
                    <input type="radio" name="level" value="hard" />Less Easy
                    <br/>Displayed verb:
                    <input type="radio" name="fixed" value="first" />First
                    <input type="radio" name="fixed" value="random" checked="checked" />Random
                    <br/>How many verbs (5-25):
                    <input type="text" id="howmany" size="2" value="10" />
                    <input type="button" id="start" value="Start/New set"/>
                    <br class="cb">

                </fieldset>
                <br/>
            </div>
        </div>
        
        <div class="win" id="window">
            <div id="buttons">
                <form action="">
                    <input type="button" id="check" value="Check answers" />
                </form>
                <br/>
            </div>
            <div id="board">
                <table>
                    <colgroup>
                        <col class="col1" />
                        <col class="col2" />
                        <col class="col2" />
                        <col class="col2" />
                    </colgroup>
                    <thead>
                        <tr>
                            <td>No.</td>
                            <td>Simple Present</td>
                            <td>Simple Past</td>
                            <td>Past Participle</td>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
            <div id="result"></div>
        </div>

        <div id="foot">
            <?php include_once '../Include/footer.php'; ?>
        </div>
    </body>
</html>