<?php include_once '../PHP/cache.php'; ?>
<!DOCTYPE html>
<html>
    <head>
        <?php include_once '../Include/meta-games.php'; ?>
        <?php include_once '../Include/includes.php'; ?>
        <link href="/CSS/GR2_style.css" rel="stylesheet" type="text/css">

        <meta charset="UTF-8">
        <title>GhostRun II</title>
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
            <div id="load">
            </div>
            <a href="/Games/" title="Return to games' index"><img alt="GhostRun" class="fr logo" src="/Images/Eyes.png" width="20" height="20"></a>
            <div id="SC"></div>
            <h1 id="title"></h1>
            <p>Ghosty has become rich in his previous adventures in Princess' castle (<a
                    href="/Games/CastleHaunt.php">CastleHunt</a>) and ancient tombs (<a href="/Games/Anxys.php">Anxys</a>).
                And as he wanted to enjoy the fruits of his greed in peace, the greedy wizard appeared. YOU!</p>
            <p>Your goal is to steal Ghosty's treasure and avoid his nasty friends. As you are a wizard, you can spit green
                pools of acid to confuse and delay monsters, but doing so costs energy. Running around in frantic panic also
                costs energy, so take care. Study your enemy carefully, they are not the same. Some are smarter than others
                ... but they are bound to their rules.</p>
            <p>Check instructions to learn more.</p>

            <div id="debug">
                <div class="setup_container smallsection" id="selector">
                    <fieldset>
                        <legend>
                            Version:
                        </legend>
                        ENGINE: <span id="engine_version"></span><br>
                        GRID: <span id="grid_version"></span><br>
                        MAZE: <span id="maze_version"></span><br>
                        AI: <span id="ai_version"></span><br>
                        Prototype LIB: <span id="lib_version"></span><br>

                    </fieldset>
                </div>
                <div>
                    <div class="setup_container smallsection">
                        <fieldset>
                            <legend>
                                Walls:
                            </legend>
                            <select id="walltexture">
                            </select>
                            <br />
                            <br />
                            <div class="bordered"><canvas id="wallcanvas" width="240" height="60"></canvas></div>
                        </fieldset>
                    </div>
                    <div class="setup_container smallsection">
                        <fieldset>
                            <legend>
                                Floor:
                            </legend>
                            <select id="floortexture">
                            </select>
                            <br />
                            <br />
                            <div class="bordered"><canvas id="floorcanvas" width="240" height="60"></canvas></div>
                        </fieldset>
                    </div>
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
                    <p>Use cursor keys to navigate wizard. If unguided, the wizard will turn randomly.</p>
                    <p>Use Control key to release green pools of acid.</p>
                    <p>Collect all gold bars to clear the level.</p>
                </fieldset>
            </div>
            <div id="about" class="section">
                <fieldset>
                    <legend>
                        About:
                    </legend>
                    <image src="https://www.c64-wiki.com/images/7/7f/Radar_Rat_Race_Start.png" alt="Radar Rat Race"
                           class="fl pic" title="Radar Rat Race">
                    <p> GhostRun is a clone of <a href="https://www.c64-wiki.com/wiki/Radar_Rat_Race"
                                                  target="_blank">Radar Rat Race</a>, released in 1982 for Commodore VIC-20 and C64. It was
                        the very first game I every played on my C64. It was hard and frantic and I
                        kind of hated it. </p>
                    <p>In this clone I wanted to keep most of the features of the original intact. The main goal was to
                        design a distinct personalities for antagonists.</p>
                    <p>Source of graphics are various free resource sites. No copyrighted images were intendedly used in
                        the making of the game. Code is written in JavaScript using JQuery framework.</p>
                    <p>Version II is mostly the same as Version I. Main changes are under the hood. It runs much faster
                        on completely reworked ENGINE and GRID. All mazes generated are now random. The game has no
                        ending, levels above 10 are similar to difficulty but are no harder than 10.</p>
                </fieldset>
            </div>


            <p class="version cb" id="version"></p>
        </div>

        <div id="game" class="winTrans"></div>
        <div id="bottom" class="cb" style="/*margin-top: 888px*/"></div>
        <div id="temp" class="hidden"></div>
        <div id="temp2" class="hidden"></div>

        <div id="spacer"></div>
        <!-- JS -->
        <script src='/JS/LIB//Prototype_3_01.js'></script>
        <script src='/JS/LIB//ENGINE_3_03.js'></script>
        <script src='/JS/LIB//GRID_3_03.js'></script>
        <script src='/JS/LIB//AI_1_01.js'></script>
        <script src='/JS/LIB//MAZE_3_03.js'></script>
        <script src='/JS/LIB//IndexArrayManagers_1_01.js'></script>
        <script src='/JS/LIB//assets_GhostRun2.js'></script>-
        <script src='/JS/LIB//MAP_GhostRun2.js'></script>
        <script src='/JS/LIB//speech_1_00.js'></script>
        <script src='/JS/LIB//score_1_04.js'></script>
        <script src="/Games//GhostRun2.js"></script>

        <div id="foot">
            <?php include_once '../Include/footer.php'; ?>
        </div>
    </body>
</html>