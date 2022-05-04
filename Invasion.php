<?php include_once '../PHP/cache.php'; ?>
<!DOCTYPE html>
<html>
    <head>
        <?php include_once '../Include/meta-games.php'; ?>
        <?php include_once '../Include/includes.php'; ?>
        <link href="/CSS/Invasion.css" rel="stylesheet" type="text/css">

        <meta charset="UTF-8">
        <title>Invasion</title>
        <?php include_once '../Include/IE_patch.php'; ?>
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

        <div id="preload" class="hidden"></div>
        <div class="win" id="setup">
            <div id="load"></div>
            <a href="/Games/" title="Return to games' index"><img alt="Invasion" class="fr logo" src="/Images/Eyes.png" width="20" height="20"></a>
            <div id="SC"></div>
            <h1 id="title"></h1>
            <p>You are a ruler of a mighty country set to bring the democracy and prosperity to a small and unassuming
                country. Of course you are not the bad guy here. Why do you ask?</p>

            <div id="debug">
                <div class="setup_container smallsection" id="selector">
                    <fieldset>
                        <legend>
                            Version:
                        </legend>
                        ENGINE: <span id="engine_version"></span><br>
                        GRID: <span id="grid_version"></span><br>
                        TERRAIN: <span id="terrain_version"></span><br>
                        Prototype LIB: <span id="lib_version"></span><br>
                        IndexArray Managers: <span id="IA_version"></span><br>
                        Speech: <span id="speech_version"></span><br>
                    </fieldset>
                </div>
            </div>

            <p class="cb" id="buttons">
                <input type='button' id='pause' value='Pause Game [F4]' disabled="disabled">
                <input type='button' id='toggleHelp' value='Show/Hide Instructions'>
                <input type='button' id='toggleAbout' value='About'>
            </p>
            <div id="help" class="section">
                <fieldset>
                    <legend>
                        Instructions:
                    </legend>
                    <p>Real gamer never reads instructions ...</p>
                    <p>Cursor left, right: deccelerate, accelerate</p>
                    <p>Cursor down, up: set cannon angle</p>
                    <p>Q, A: increase, decrease canon load</p>
                    <p>CTRL: shoot</p>
                    <p>Survival guide:
                    <ul>
                        <li>Chemical weapons are hidden in the huts, don't just ram them.</li>
                        <li>Don't let boxes fall into enemy's hands. Your survival depends on them.</li>
                        <li>Enemy bombers are very accurate, don't let them guess your future position.</li>
                    </ul>
                    </p>
                </fieldset>
            </div>
            <div id="about" class="section">
                <fieldset>
                    <legend>
                        About:
                    </legend>
                    <image
                        src="https://www.mobygames.com/images/shots/l/560425-paratrooper-commodore-64-screenshot-the-game-begins.jpg"
                        alt="Paratroopers" class="fl pic" title="Paratroopers">
                    <p>Invasion is loosely based on C64 game <a href="https://www.mobygames.com/game/paratrooper_"
                                                                target="_blank">Paratroopers</a> from 1982 and
                        my first game I ever wrote in assembler in 1984, but is sadly lost.</p>
                    <p>
                        For Invasion I created random terrain generator using <a
                            href="https://en.wikipedia.org/wiki/Perlin_noise" target="_blank">Perlin noise</a>,
                        and on the fly assembly of different prerotated tank parts. Initial sprite load is thus
                        fairly sparse.
                    </p>
                </fieldset>
            </div>


            <p class="version cb" id="version"></p>
            <p id="conv" style="font-weight: bold">Sprite conversion in progress ... just a sec or two ...</p>
        </div>

        <div id="game" class="winTrans"></div>
        <div id="bottom" class="cb" style="margin-top: 720px"></div>
        <div id="temp" class="hidden"></div>
        <div id="temp2" class="hidden"></div>

        <div id="spacer"></div>
        <!-- JS -->
        <script src='/JS/LIB//Prototype_3_04.js'></script>
        <script src='/JS/LIB//ENGINE_3_10.js'></script>
        <script src='/JS/LIB//GRID_3_04.js'></script>
        <script src='/JS/LIB//TERRAIN_1_00.js'></script>
        <script src='/JS/LIB//IndexArrayManagers_1_03.js'></script>
        <script src='/JS/LIB//speech_1_01.js'></script>
        <script src='/JS/LIB//score_1_04.js'></script>
        <script src='/JS/LIB//assets_Invasion.js'></script>
        <script src='/JS/LIB//MAP_Invasion.js'></script>
        <script src="/Games//Invasion.js"></script>


        <div id="foot">
            <?php include_once '../Include/footer.php'; ?>
        </div>
    </body>
</html>