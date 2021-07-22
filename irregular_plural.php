<?php include_once '../PHP/cache.php'; ?>
<!DOCTYPE html>
<html>
    <head>
        <?php include_once '../Include/meta-games.php'; ?>
        <?php include_once '../Include/includes.php'; ?>
        <link href="/CSS/ip.css" rel="stylesheet" type="text/css">
        <title>Irregular Plural</title>
        <?php include_once '../Include/IE_patch.php'; ?>
        <script src="irregular_plural.js" type="text/javascript"></script>
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

            <h1>Irregular Plural</h1>

            <p>Practice irregular plural of nouns. Pay attention to the indefinite articles of singular nouns.
                <br/>Select difficulty: easy - common nouns, primary school level; less easy - less common nouns are included. Select <em>'include regular nouns'</em> if you want to mix in some regular plural nouns.
                <br/>Displayed noun: choose which noun is displayed, random of first.
                <br/>Correct solutions will be displayed if you make a mistake.
            </p>

            <div id="setup">
                <form action="">
                    <fieldset>
                        <legend>Setup</legend>Difficulty:
                        <input type="radio" name="level" value="easy" checked="checked" />Easy
                        <input type="radio" name="level" value="hard" />Less Easy
                        <br/>
                        <input type="checkbox" id="regular" name="regular" title="They are included in the pool from where nouns are randomly selected" />Include regular nouns
                        <br/>Fixed verb:
                        <input type="radio" name="fixed" value="first" />First
                        <input type="radio" name="fixed" value="random" checked="checked" />Random
                        <br/>How many nouns (5-20):
                        <input type="text" id="howmany" size="2" value="10" />
                        <input type="button" id="start" value="Start/New Set" />
                    </fieldset>
                </form>
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
                    </colgroup>
                    <thead>
                        <tr>
                            <td>No.</td>
                            <td>Singular</td>
                            <td>Plural</td>
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