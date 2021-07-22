<?php include_once '../PHP/cache.php'; ?>
<!DOCTYPE html>
<html>
    <head>
        <?php include_once '../Include/meta-games.php'; ?>
        <?php include_once '../Include/includes.php'; ?>
        <link href="/CSS/zmesanka.css" rel="stylesheet" type="text/css">
        <title>ArithmetiX</title>
        <?php include_once '../Include/IE_patch.php'; ?>
        <script src="zmesanka.min.js" type="text/javascript"></script>
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
                <img alt="Arithmetic math english game" class="fr logo" src="/Images/Eyes.png" width="100" height="100"></a>

            <h1>ArithmetiX</h1>

            <p>Train arithmetic operations: addition, substraction, multiplication and division. 
                It is not only math; you can practice English at the same time. Instead of numbers, you can play this game with words.
                For that check 'Convert numbers to text' - you can use it on operation or on result or both. 
                If you decide to use words instead of numbers, make sure your spelling is correct (like <em><span class="blue">seventeen</span>, <span class="blue">forty-two</span>, 
                    <span class="blue">sixty-seven</span></em>, ... <strong>mind those dashes!</strong>).</p>
            <p>Should the range up to 99 scare you, try up to 20 first.</p>

            <div id="setup">
                <form action="">
                    <fieldset>
                        <legend>Setup</legend>

                        <div class="setup_container">
                            <strong>Select types of arithmetic operations:</strong><br>
                            <input checked="checked" id="multiplication" name="oper" type="checkbox">Multiplication<br>
                            <input id="division" name="oper" type="checkbox">Division<br>
                            <input id="addition" name="oper" type="checkbox">Addition<br>
                            <input id="substraction" name="oper" type="checkbox">Substraction<br>
                        </div>

                        <div class="setup_container">
                            <strong>Convert numbers to text:</strong><br>
                            <input checked="checked" id="convert_none" name="conver" type="checkbox">None<br>
                            <input id="convert_operands" name="conver" type="checkbox">Operands<br>
                            <input id="convert_result" name="conver" type="checkbox">Result<br>
                        </div>

                        <div class="setup_container">
                            <strong>Select range:</strong><br>
                            <input id="to20" name="range" type="radio">1 - 20<br>
                            <input checked="checked" id="to99" name="range" type="radio">1 - 99<br>
                        </div>

                        <div class="setup_container">
                            <strong>Number of arithmetic operations (5-50): &nbsp;&nbsp;</strong> 
                            <input id="strac" maxlength="2" size="1" type="text" value="10">
                        </div>
                        <input id="start" type="button" value="Start new session" title="Click here to start new game."/>
                    </fieldset>
                </form>
                <br/>
            </div>
        </div>
        <div class="win" id="window">
            <p></p>
            <div id="board">				
                <table>
                    <colgroup>
                        <col width="4%">
                        <col width="24%">
                        <col width="10%">
                        <col width="24%">
                        <col width="4%">
                        <col width="34%">
                    </colgroup>

                    <thead>
                        <tr>
                            <td>No.</td>
                            <td>Operand</td>
                            <td>Operator</td>
                            <td>Operand</td>
                            <td>=</td>
                            <td>Result</td>
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