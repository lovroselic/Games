<?php include_once '../PHP/cache.php'; ?>
<!DOCTYPE html>
<html>

<head>

    <?php include_once '../Include/meta-games.php'; ?>
    <?php include_once '../Include/includes.php'; ?>
    <link href="/CSS/CM_style.css" rel="stylesheet" type="text/css">

    <title>Crawl Master</title>
    <?php include_once '../Include/IE_patch.php'; ?>
    <style>
    #goToTop {
        display: none
    }
    </style>
</head>

<body>
    <div id="head">
        <?php include_once '../Include/header.php'; ?>
    </div>
    
    <?php include_once '../Include/ad.php'; ?>

    <div id="gameResolutionAlert" class="hide_extraLarge hide_large">
        <h3>Resolution too low alert!</h3>
        <p>You are trying to run this game on a device which has insufficient resolution to display the game properly.
            Just so you know ...</p>
    </div>

    <div id="preload" class="hidden"></div>
    <div class="win" id="setup">
        <div id="load">
        </div>
        <a href="/Games/" title="Return to games' index"><img alt="Anxys" class="fr logo" src="/Images/Eyes.png" width="20" height="20"></a>
        <div id="SC"></div>
        <h1 id="title"></h1>
        <p>
            Long, long ago, brave knight entered the dungeon to search for the missing treasure. Never to return. What
            happend? Who can say. You? Would you investigate? Do you dare?
        </p>

        <div id="debug">
            <div class="setup_container smallsection" id="selector">
                <fieldset>
                    <legend>
                        Settings:
                    </legend>
                    ENGINE.INI.GRIDPIX:
                    <input name="gridsize" id="gridsize" type="text" size="2" maxlength="2" value="32" disabled="true">
                    <br />
                    CAMERA.FOV:
                    <input name="fov" id="fov" type="text" size="2" maxlength="2" value="70" disabled="true">
                    <br /><br />
                </fieldset>
                <fieldset>
                    <legend>
                        Version:
                    </legend>
                    ENGINE: <span id="engine_version"></span><br>
                    GRID: <span id="grid_version"></span><br>
                    MAZE: <span id="maze_version"></span><br>
                    RAYCAST: <span id="raycast_version"></span><br>
                    AI: <span id="ai_version"></span><br>
                    Prototype LIB: <span id="lib_version"></span><br>

                </fieldset>
            </div>
            <div class="setup_container smallsection">
                <fieldset>
                    <legend>
                        Resolution:
                    </legend>
                    ScreenWidth: <span id="screen_width"></span><br>
                    ScreenHeight: <span id="screen_height"></span><br>

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
                <div class="setup_container smallsection">
                    <fieldset>
                        <legend>
                            Ceiling:
                        </legend>
                        <select id="ceilingtexture">
                        </select>
                        <br />
                        <br />
                        <div class="bordered"><canvas id="ceilingcanvas" width="240" height="60"></canvas></div>
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
                <p><strong>Survival guide:</strong></p>
                <p>Running away is a legitimate strategy ...</p>
                <p>Game will be saved each time you descend on a new level for the first time.</p>
                <p>Use temple to heal and buy skills. But remember, healthcare is expensive ...</p>
                <p></p>

                <p><strong>KEYS:</strong></p>
                <p>Mouse to open doors and pick up items and interact with environment</p>
                <p>W ... move forward</p>
                <p>S ... move backward</p>
                <p>A ... strafe left</p>
                <p>D ... strafe right</p>
                <p>Q ... turn left</p>
                <p>E ... turn right</p>
                <p>CTRL ... cast magic.</p>
                <p>H ... use healing potion</p>
                <p>M ... use mana potion</p>
                <p>cursor left, right ... move scroll selection cursor</p>
                <p>ENTER ... cast selected scroll</p>
                <p>F4 ... pause/resume game</p>
                <p><strong>SCROLLS:</strong></p>
                <div>
                    <image src="https://www.c00lsch00l.eu/Games/AA/Light.png" alt="Light" class="fl pic" title="Light">
                        <p class="scroll_text">Magic lamp: inreased range of map revealing</p>
                        <p class="cb"></p>
                </div>
                <div>
                    <image src="https://www.c00lsch00l.eu/Games/AA/DrainMana.png" alt="DrainMana" class="fl pic"
                        title="DrainMana">
                        <p class="scroll_text">Drain Mana: drains mana from all creatures in the area. Also yours!</p>
                        <p class="cb"></p>
                </div>
                <div>
                    <image src="https://www.c00lsch00l.eu/Games/AA/Map.png" alt="Map" class="fl pic" title="Map">
                        <p class="scroll_text">Map: reveals the location of the temple or other important areas</p>
                        <p class="cb"></p>
                </div>
                <div>
                    <image src="https://www.c00lsch00l.eu/Games/AA/BoostWeapon.png" alt="BoostWeapon" class="fl pic"
                        title="BoostWeapon">
                        <p class="scroll_text">Increase the damage of your weapon for certain duration.</p>
                        <p class="cb"></p>
                </div>
                <div>
                    <image src="https://www.c00lsch00l.eu/Games/AA/BoostArmor.png" alt="BoostArmor" class="fl pic"
                        title="BoostArmor">
                        <p class="scroll_text">Increase your armor for certain duration..</p>
                        <p class="cb"></p>
                </div>
                <div>
                    <image src="https://www.c00lsch00l.eu/Games/AA/DestroyArmor.png" alt="DestroyArmor" class="fl pic"
                        title="DestroyArmor">
                        <p class="scroll_text">Decrease your opponent's armor in the certain range.</p>
                        <p class="cb"></p>
                </div>
                <div>
                    <image src="https://www.c00lsch00l.eu/Games/AA/DestroyWeapon.png" alt="DestroyWeapon" class="fl pic"
                        title="DestroyWeapon">
                        <p class="scroll_text">Decrease the damage of your opponent's weapons in the certain range.</p>
                        <p class="cb"></p>
                </div>
                <div>
                    <image src="https://www.c00lsch00l.eu/Games/AA/Cripple.png" alt="Cripple" class="fl pic"
                        title="Cripple">
                        <p class="scroll_text">Cripple: Decrease speed of the nearby monsters.</p>
                        <p class="cb"></p>
                </div>
                <div>
                    <image src="https://www.c00lsch00l.eu/Games/AA/Invisibility.png" alt="Invisibility" class="fl pic"
                        title="Invisibility">
                        <p class="scroll_text">Invisibility: I will let you figure this one by yourself..</p>
                        <p class="cb"></p>
                </div>
                <div>
                    <image src="https://www.c00lsch00l.eu/Games/AA/MagicBoost.png" alt="Magic Boost" class="fl pic"
                        title="Magic Boost">
                        <p class="scroll_text">Magic Boost: boost your magic abilities for a while</p>
                        <p class="cb"></p>
                </div>
                <div>
                    <image src="https://www.c00lsch00l.eu/Games/AA/Petrify.png" alt="Petrify" class="fl pic"
                        title="Petrify">
                        <p class="scroll_text">Petrify: petrifies all enemies in a certain range</p>
                        <p class="cb"></p>
                </div>
                <div>
                    <image src="https://www.c00lsch00l.eu/Games/AA/TeleportTemple.png" alt="Teleport to Temple"
                        class="fl pic" title="Teleport to Temple">
                        <p class="scroll_text">Teleport to the Temple: instant jump to the temple. Could also be on top
                            of some
                            scary monster ...</p>
                        <p class="cb"></p>
                </div>
                <div>
                    <image src="https://www.c00lsch00l.eu/Games/AA/Luck.png" alt="Luck" class="fl pic" title="Luck">
                        <p class="scroll_text">Hero's luck is temporarily increased. One of the game's mysteries.</p>
                        <p class="cb"></p>
                </div>
                <div>
                    <image src="https://www.c00lsch00l.eu/Games/AA/HalfLife.png" alt="HalfLife" class="fl pic"
                        title="HalfLife">
                        <p class="scroll_text">Monster's life energy in the certain range is halved.</p>
                        <p class="cb"></p>
                </div>
            </fieldset>

        </div>
        <div id="about" class="section">
            <fieldset>
                <legend>
                    About:
                </legend>
                <image src="https://www.c00lsch00l.eu/Images/DM_st.png" alt="Dungeon Master" class="fl pic"
                    title="Dungeon Master">
                    <p> 'Crawl Master' is inspired by two legendary games. Atari ST classic <a
                            href="https://en.wikipedia.org/wiki/Dungeon_Master_(video_game)" target="_blank">Dungeon
                            Master</a> from
                        1987, one of the first games to feature pseudo-3D first person perspective. The second is PC
                        classic <a href="https://en.wikipedia.org/wiki/Wolfenstein_3D" taget="_blank">Wolfenstein 3D</a>
                        from 1992, one of
                        the first games to combine texture mapping and ray casting to render the game world. </p>
                    <image src="https://www.c00lsch00l.eu/Images/Wolf3d_pc.png" alt="Wolfenstein 3D" class="fr pic"
                        title="Wolfenstein 3D">

                        <p>Crawl Master's engine is loosely based upon the <a
                                href="https://lodev.org/cgtutor/raycasting.html" target="_blank">published
                                interpretations</a> of Wolfenstein 3D C raycasting code. The latter was
                            heavily optimised to run efficiently in JavaScript Canvas and includes <a
                                href="https://stackoverflow.com/a/66972503/4154250" target="_blank">super fast custom
                                algorithm</a> for
                            painting decals. </p>
                        <p>Crawl Master features <a href="https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm"
                                target="_blank">Dijkstra's</a> and <a
                                href="https://en.wikipedia.org/wiki/A*_search_algorithm" target="_blank">A*</a>
                            algorithms for path finding and Monster AI and my own algorithm for procedural dungeon
                            generation.
                        </p>

            </fieldset>
        </div>

        <p class="version cb" id="version"></p>
    </div>

    <div id="game" class="winTrans"></div>
    <div id="bottom" class="cb" style="margin-top: 480px"></div>
    <div id="temp" class="hidden"></div>
    <div id="temp2" class="hidden"></div>
    <div id="spacer"></div>
    <!-- JS -->
    <script src='/JS/LIB//Prototype_LIB_3_00.js'></script>
    <script src='/JS/LIB//ENGINE_3_00.js'></script>
    <script src='/JS/LIB//GRID_3_00.js'></script>
    <script src='/JS/LIB//AI_1_00.js'></script>
    <script src='/JS/LIB//MAZE_3_00.js'></script>
    <script src='/JS/LIB//RAYCASTER_1_00.js'></script>
    <script src='/JS/LIB//assets_CrawlMaster.js'></script>
    <script src='/JS/LIB//MAP_CrawlMaster.js'></script>
    <script src='/JS/LIB//SaveGame_1_02.js'></script>
    <script src="/Games//CrawlMaster.js"></script>

    <div id="foot">
        <?php include_once '../Include/footer.php'; ?>
    </div>
</body>

</html>