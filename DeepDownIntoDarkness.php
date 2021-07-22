<?php include_once '../PHP/cache.php'; ?>
<!DOCTYPE html>
<html>
    <head>
        <?php include_once '../Include/meta-games.php'; ?>
        <?php include_once '../Include/includes.php'; ?>
        <link href="/CSS/DDID.css" rel="stylesheet" type="text/css">

        <title>Deep Down Into The Darkness</title>
        <?php include_once '../Include/IE_patch.php'; ?>
        <script src="/JS/LIB/prototypeLIB_2_10.js" type="text/javascript"></script>
        <script src="/JS/LIB/score_1_04.js" type="text/javascript"></script>
        <script src="/JS/LIB/engine_2_40.js" type="text/javascript"></script>
        <script src="/JS/LIB/assets_DDID.js" type="text/javascript"></script>
        <script src="/JS/LIB/maze_2_71.js" type="text/javascript"></script>
        <script src="/JS/LIB/map_DDID.js" type="text/javascript"></script>
        <script src="/JS/LIB/SaveGame_1_01.js" type="text/javascript"></script>
        <script src="/Games/DeepDownIntoTheDarkness.js" type="text/javascript"></script>
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
            <a href="/Games/" title="Return to games' index"><img alt="Anxys" class="fr logo" src="/Images/Eyes.png" width="20" height="20"></a>
            <div id="SC"></div>
            <h1 id="title"></h1>
            <p>Are you brave enough? To descent? To descent deep down into the darkness and claim the legendary treasure? Yes? Let's see about that ...</p>
            Hero's name: <input type="text" id="HeroName" value="HERO" maxlength="10" />

            <p id="buttons">
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
                    <p>'Train' your hero to adapt to his environmental challenges.</p>
                    <p>Running away is always a possibility.</p>
                    <p>Game will save a checkpoint whenever you descend the stairs to a new level for the first time.</p>
                    <p></p>

                    <p><strong>KEYS:</strong></p>
                    <p>Use cursor keys to move.</p>
                    <p>CTRL ... cast magic.</p>
                    <p>H ... use healing potion</p>
                    <p>M ... use mana potion</p>
                    <p>A, D ... move scroll selection cursor</p>
                    <p>TAB ... level up</p>
                    <p>ENTER ... cast selected scroll</p>
                    <p>F4 ... pause/resume game</p>
                    <p><strong>SCROLLS:</strong></p>
                    <div>
                        <image src="/Games/AA/Light.png" alt="Light" class="fl pic" title="Light">
                        <p style="position: relative; top: 24px">Magic lamp</p>
                        <p class="cb"></p>
                    </div>
                    <div>
                        <image src="/Games/AA/DrainMana.png" alt="DrainMana" class="fl pic" title="DrainMana">
                        <p style="position: relative; top: 24px">Drain Mana: drains mana from all creatures in the area. Also yours!</p>
                        <p class="cb"></p>
                    </div>
                    <div>
                        <image src="/Games/AA/Map.png" alt="Map" class="fl pic" title="Map">
                        <p style="position: relative; top: 24px">Map: reveals the location of the temple or other important areas</p>
                        <p class="cb"></p>
                    </div>
                    <div>
                        <image src="/Games/AA/BoostWeapon.png" alt="BoostWeapon" class="fl pic" title="BoostWeapon">
                        <p style="position: relative; top: 24px">Increase the damage of your sword for the duration of the fight.</p>
                        <p class="cb"></p>
                    </div>
                    <div>
                        <image src="/Games/AA/BoostArmor.png" alt="BoostArmor" class="fl pic" title="BoostArmor">
                        <p style="position: relative; top: 24px">Increase your armor for the duration of the fight.</p>
                        <p class="cb"></p>
                    </div>
                    <div>
                        <image src="/Games/AA/DestroyArmor.png" alt="DestroyArmor" class="fl pic" title="DestroyArmor">
                        <p style="position: relative; top: 24px">Decrease your opponent's armor for the duration of the fight.</p>
                        <p class="cb"></p>
                    </div>
                    <div>
                        <image src="/Games/AA/DestroyWeapon.png" alt="DestroyWeapon" class="fl pic" title="DestroyWeapon">
                        <p style="position: relative; top: 24px">Decrease the damage of your opponent's sword for the duration of the fight.</p>
                        <p class="cb"></p>
                    </div>
                    <div>
                        <image src="/Games/AA/Cripple.png" alt="Cripple" class="fl pic" title="Cripple">
                        <p style="position: relative; top: 24px">Cripple: Drains agility and speed of the nearby monsters.</p>
                        <p class="cb"></p>
                    </div>
                    <div>
                        <image src="/Games/AA/Invisibility.png" alt="Invisibility" class="fl pic" title="Invisibility">
                        <p style="position: relative; top: 24px">Invisibility: I will let you figure this one by yourself..</p>
                        <p class="cb"></p>
                    </div>
                    <div>
                        <image src="/Games/AA/MagicBoost.png" alt="Magic Boost" class="fl pic" title="Magic Boost">
                        <p style="position: relative; top: 24px">Magic Boost: boost your magic abilities for a while</p>
                        <p class="cb"></p>
                    </div>
                    <div>
                        <image src="/Games/AA/Petrify.png" alt="Petrify" class="fl pic" title="Petrify">
                        <p style="position: relative; top: 24px">Petrify: petrifies all enemies in a certain range</p>
                        <p class="cb"></p>
                    </div>
                    <div>
                        <image src="/Games/AA/TeleportTemple.png" alt="Teleport to Temple" class="fl pic" title="Teleport to Temple">
                        <p style="position: relative; top: 24px">Teleport to the Temple: instant jump to the temple. Could also be on top of some scary monster ...</p>
                        <p class="cb"></p>
                    </div>
                    <div>
                        <image src="/Games/AA/Luck.png" alt="Luck" class="fl pic" title="Luck">
                        <p style="position: relative; top: 24px">Hero's luck is temporarily increased. One of the game's mysteries.</p>
                        <p class="cb"></p>
                    </div>
                    <div>
                        <image src="/Games/AA/HalfLife.png" alt="HalfLife" class="fl pic" title="HalfLife">
                        <p style="position: relative; top: 24px">Monster's life energy is halved.</p>
                        <p class="cb"></p>
                    </div>
                </fieldset>

            </div>
            <div id="about" class="section">
                <fieldset>
                    <legend>
                        About:
                    </legend>
                    <image src="/Images/SoF.png" alt="Sword of Fargoal" class="fl pic" title="Sword of Fargoal">
                    <p> 'Deep Down Into the Darkness' was inspired by C64 classic <a href="https://www.c64-wiki.com/wiki/Sword_of_Fargoal" target="_blank">Sword of Fargoal</a> from 1983, which was itself influenced by 1980 Unix game <a href="https://en.wikipedia.org/wiki/Rogue_(video_game)" target="_blank">Rogue</a>.</p>
                    <p>Features <a href="https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm" target="_blank">Dijkstra's</a> and <a href="https://en.wikipedia.org/wiki/A*_search_algorithm" target="_blank">A*</a>
                        algorithms for path finding and my own algorithm for procedural dungeon generation.
                    </p>
                </fieldset>
            </div>

            <p class="version cb" id="version"></p>
        </div>

        <div id="game" class="winTrans"></div>
        <div id="bottom" class="cb" style="margin-top: 720px"></div>
        <div id="temp" class="hidden"></div>
        <div id="temp2" class="hidden"></div>
        <div id="spacer"></div>

        <div id="foot">
            <?php include_once '../Include/footer.php'; ?>
        </div>
    </body>
</html><?php



