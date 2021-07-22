<?php include_once '../PHP/cache.php'; ?>
<!DOCTYPE html>
<html>
    <head>
        <?php include_once '../Include/meta-games.php'; ?>
        <?php include_once '../Include/includes.php'; ?>
        <link href="/CSS/grammathlon.css" rel="stylesheet" type="text/css">
        <title>Grammathlon</title>
        <?php include_once '../Include/IE_patch.php'; ?>
        <script src="grammathlon.js" type="text/javascript"></script>
        <style>
            #goToTop {display:none}
        </style>
    </head>

    <body>
        <div id="head">
            <?php include_once '../Include/header.php'; ?>
        </div>

        <?php include_once '../Include/ad.php'; ?>

        <div id="gameResolutionAlert" class="hide_extraLarge hide_large hide_medium">
            <h3>Resolution too low alert!</h3>
            <p>You are trying to run this game on a device which has insufficient resolution to display the game properly. Just so you know ...</p>
        </div>
        <!-- -->
        <div class="win">
            <a href="/Games/" title="Return to games' index"><img alt="Grammathlon" class="fr logo" src="/Images/Eyes.png" width="100" height="100"></a>

            <h1>Grammathlon&reg </h1>
            <p>is cooperative or individual multiplayer board game, intended for practicing tenses and grammar. With the help of <a href="/CoolPool_ENG/cooltool_eng.php" target="_blank">CoolTool</a> it is also a gap-filling and word order game.</p>


        </div>

        <!-- -->


        <div id="setup">
            <p id="version" style="font-family: Consolas; font-size:12px"></p>
            <form action="">
                <fieldset id="panel1" class="coolback">
                    <legend><strong>Setup game</strong>

                    </legend>
                    <div class="setup_container"> <strong>Include:</strong>

                        <br/>
                        <input name="tense" id="present_simple" type="checkbox" checked="checked" />Present simple
                        <br/>
                        <input name="tense" id="present_continuous" type="checkbox" checked="checked" />Present continuous
                        <br/>
                        <input name="tense" id="present_perfect" type="checkbox" checked="checked" />Present perfect
                        <br/>
                        <input name="tense" id="past_simple" type="checkbox" checked="checked" />Past simple
                        <br/>
                        <input name="tense" id="past_continuous" type="checkbox" />Past continuous
                        <br/>
                        <input name="tense" id="will_future" type="checkbox" />Will future
                        <br/>
                        <input name="tense" id="going_to_future" type="checkbox" />Going to future
                        <br/>
                        <hr style ="width:100px"/>
                        <input id="select_all" type="button" value="Select all" />
                        <input id="select_none" type="button" value="Deselect all" />
                    </div>
                    <div class="setup_container"> <strong>Types:<br/></strong>

                        <div class="affirmative">
                            <input name="type" id="affirmative" type="checkbox" checked="checked" />Affirmative</div>
                        <br/>
                        <div class="negative">
                            <input name="type" id="negative" type="checkbox" checked="checked" />Negative</div>
                        <br/>
                        <div class="interrogative">
                            <input name="type" id="interrogative" type="checkbox" checked="checked" />Interrogative&nbsp</div>
                        <br/>
                    </div>
                    <div class="setup_container"> <strong>Subjects:<br/></strong>

                        <input name="col3" id="personal_pronouns" type="checkbox" checked="checked" />Personal pronouns
                        <br/>
                        <input name="col3" id="subjects" type="checkbox" checked="checked" />Various subjects (singular/plural)
                        <br/>
                        <br/> <strong>Include:<br/></strong>

                        <input name="col3" id="objects" type="checkbox" checked="checked" />Objects
                        <br/>
                        <input name="col3" id="places" type="checkbox" checked="checked" />Places
                        <br/>
                    </div>
                    <div class="setup_container"> <strong>Parameters:<br/></strong> Number of fields:
                        <input name="parameters" id="how_many_fields" type="text" size="1" value="10" />
                        <br/>Number of players:
                        <input name="parameters" id="players_number" type="text" size="1" value="4" />
                    </div>
                </fieldset>
                <div class="cb" id="buttonline">
                    <input type="button" value="Toggle setup display" id="hide_setup" title="Hides/show the setup panel" />
                    <input type="button" value="Generate board" id="generate" title="Generates playing board" />
                    <input type="button" value="Enroll players" id="enroll" disabled="disabled" title="Select player/group names" />
                    <input type="button" value="Start game" id="start_game" disabled="disabled" title="Start the game" />
                    <input type="button" value="RESET" id="reset" title="Reloads the browser window. Starts again." />
                    <input type="button" value="SAVE settings" id="save" title="Saves current game settings as default" />
                </div>
            </form>
        </div>

        <!-- -->

        <div id="stran"></div>
        <div id="message"></div>
        <div id="kocke">
            <input type="image" id="roll" src="/Sprite/BlackDie.png" title="Click to roll the dice" />
        </div>
        <div id="field" class="cb"></div>


        <div id="foot">
            <?php include_once '../Include/footer.php'; ?>
        </div>
    </body>
</html>