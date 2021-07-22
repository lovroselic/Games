<?php include_once '../PHP/cache.php'; ?>
<!DOCTYPE html>
<html>
    <head>
        <?php include_once '../Include/meta-games.php'; ?>
        <?php include_once '../Include/includes.php'; ?>
        <link href="/CSS/racing_shapes.css" rel="stylesheet" type="text/css">
        <title>Racing Shapes</title>
        <?php include_once '../Include/IE_patch.php'; ?>
        <script src="racing_shapes.min.js" type="text/javascript"></script>
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
            <a href="/Games/" title="Return to games' index"><img alt="Racing shapes english game" class="fr logo" src="/Images/Eyes.png" width="100" height="100"></a>

            <h1>Racing Shapes</h1>

            <p>Welcome to the most thrilling race on the internet - 912 pixel dash across the screen. Main actors: triangles, squares, circles and rectangles of 
                different colours. Report their results and learn about colours, shapes and ordinals. Ready, steady , GO! </p>
            <p>Select the type of the game: report the position of the given shape, or report which shape of which colour came at given position (for example: 
                <em>yellow circle, black square;</em>  
                always colour first, then the shape). Select more races to get more points and rule the top 5 leader-board.</p>

            <div id="setup">
                <form action="">
                    <fieldset>
                        <legend>Setup</legend>

                        <div class="setup_container">
                            <strong>Game type:</strong><br>
                            <input name="quest" type="radio">Find the position<br>
                            <input name="quest" type="radio">Find the shape and colour<br>
                            <input checked="checked" name="quest" type="radio">Random<br>
                        </div>

                        <div class="setup_container">
                            <strong>Number of races (5-25): &nbsp;&nbsp;</strong> 
                            <input id="laps" maxlength="2" size="1" type="text" value="10">&nbsp;&nbsp;&nbsp;&nbsp;
                        </div><input id="start" type="button" value="Start new game">
                        <div id="hiscore"></div>



                        <div id="help2" class="cb">
                            <h3>Shape help (click to toggle visibility)</h3>

                            <div id="shape">
                                <div class="cd2 black square">
                                    <p id="sq">SQUARE</p>
                                </div>

                                <div class="cd2 black circle">
                                    <p id="circ">CIRCLE</p>
                                </div>

                                <div class="cd2 black rectangle">
                                    <p>RECTANGLE</p>
                                </div>

                                <div class="cd2 black_triangle triangle">
                                    <p id="tri">TRIANGLE</p>
                                </div>
                            </div>
                        </div>
                        <div  id="help">
                            <h3>Colour help (click to toggle visibility)</h3>

                            <div id="colours">
                                <div class="cd red">
                                    <p>RED</p>
                                </div>

                                <div class="cd blue">
                                    <p>BLUE</p>
                                </div>

                                <div class="cd yellow">
                                    <p>YELLOW</p>
                                </div>

                                <div class="cd white">
                                    <p>WHITE</p>
                                </div>

                                <div class="cd orange">
                                    <p>ORANGE</p>
                                </div>

                                <div class="cd grey">
                                    <p>GREY</p>
                                </div>

                                <div class="cd cyan">
                                    <p>CYAN</p>
                                </div>

                                <div class="cd pink">
                                    <p>PINK</p>
                                </div>

                                <div class="cd purple">
                                    <p>PURPLE</p>
                                </div>

                                <div class="cd black">
                                    <p style="color:white">BLACK</p>
                                </div>

                                <div class="cd green">
                                    <p>GREEN</p>
                                </div>

                                <div class="cd brown">
                                    <p>BROWN</p>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                </form>
            </div>
        </div>

        <div class="win" id="panel">
            <input disabled="true" id="race" type="button" value="Start race">
            <input disabled="true" id="next" type="button" value="Next race"> 

            <div id="RTG">
                <p>Races to go: <span id="togo"></span></p>
            </div>

            <div id="result">            
                <p><strong>Score: <span id="score"></span></strong></p>
            </div>

            <div class="cb" id="question"></div>

            <div id="answer"></div>

            <div class="cb" id="message"></div>
        </div>

        <div class="win" id="board">
            <div id="count">
                Start in <span>5</span> seconds.
            </div>

            <div class="left-line"></div>

            <div class="right-line"></div>
        </div>

        <div id="foot">
            <?php include_once '../Include/footer.php'; ?>
        </div>
    </body>
</html>