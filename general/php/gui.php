<!DOCTYPE html>
<html lang="en">
    <head>
        <title>Elevator GUI</title>
        
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="This is the gui mechanism for our project" />
        <meta http-equiv="author" content="Fergus Page" />
        <meta name="robots" content="noindex nofollow" />
        <meta http-equiv="pragma" content="no-cache" />

        <link rel="stylesheet" href="../css/elevator/gui_style.css">
    </head>
    <body>

        <?php
        //handle car controller calls via gui and track the car's movement
        //handle the floor controller calls via gui - these override the car calls, but for floor calls to be active, the directional button (floor) must be clicked
        //same gui handles both floor controller calls and car controller calls - when using the floor buttons the car buttons are indicators, and when using the car buttons, the floor buttons are indicators
        //form submits on click, so only one selection is possible per iteration, which excludes conflict cases between the car and floor control sets
        //floor call buttons only handle adjacent-floor calls

        $call = ($_POST["called_to"] ?? 1); //get input from form post, or default to first floor
        $last = ($_POST["called_from"] ?? 1); //get last floor from post or initialize to first floor
        $dir_button = ($_POST["dir_button"] ?? 0); //get input from floor buttons or default to car operation
        ($call  > $last) ? ($dir = "UP") : (($call < $last ) ? ($dir = "DOWN") : ($dir = "HOLD")); //figure out the car's direction of travel

        ($call == 3) ? ($floor3 = "../resources/references/imgs/gui/3lit.png") : ($floor3 = "../resources/references/imgs/3unlit.png"); //show call to 3rd? - car control
        ($call == 2) ? ($floor2 = "../resources/references/imgs/gui/2lit.png") : ($floor2 = "../resources/references/imgs/2unlit.png"); //show call to 2nd? - car control
        ($call == 1) ? ($floor1 = "../resources/references/imgs/gui/1lit.png") : ($floor1 = "../resources/references/imgs/gui/1unlit.png"); //show call to 1st? - car control
        
        (($dir_button == 1) && ($last == 3)) ?? (($call = 3) && ($dir = "HOLD"));   //going up from third goes nowhere, hold
        (($dir_button == 1) && ($last == 2)) ?? (($call = 3) && ($dir = "UP"));     //going up from second goes to third
        (($dir_button == 1) && ($last == 1)) ?? (($call = 2) && ($dir = "UP"));     //going up from first goes to second
        (($dir_button == 2) && ($last == 3)) ?? (($call = 2) && ($dir = "DOWN"));   //going down from third goes to second
        (($dir_button == 2) && ($last == 2)) ?? (($call = 1) && ($dir = "DOWN"));   //going down from second goes to first
        (($dir_button == 2) && ($last == 1)) ?? (($call = 1) && ($dir = "HOLD"));   //going down from first goes nowhere, hold


        ($dir === "UP") ? ($up_ind = "../resources/references/imgs/gui/uplit.png") : ($up_ind = "../resources/references/imgs/gui/upunlit.png"); //show upward-going call - floor control
        ($dir === "DOWN") ? ($down_ind = "../resources/references/imgs/gui/downlit.png") : ($down_ind = "../resources/references/imgs/gui/downunlit.png"); //show downward-going call - floor control($dir === "HOLD") ?? (($up_ind = "../images/gui/upunlit.png") && ($down_ind = "../images/gui/downunlit.png")); //stop the car at the floor it was called up to
        ?>

        <form method="post" id="buttons" target="_self" onclick="buttons.submit()" onsubmit="button.submit()">  <!-- Post a self-targeting form to take new input and generate last call -->
            <div class="grid">
                <div class="col">
                    <label><input type="radio" name="called_to" value=3 hidden required/><img src=<?php echo $floor3?> width="100" alt="Floor 3" title="Call to Floor 3"></label><br/> <!-- 3, please -->
                    <label><input type="radio" name="called_to" value=2 hidden required/><img src=<?php echo $floor2?> width="100" alt="Floor 2" title="Call to Floor 2"></label><br/> <!-- 2, please -->
                    <label><input type="radio" name="called_to" value=1 hidden required/><img src=<?php echo $floor1?> width="100" alt="Floor 1" title="Call to Floor 1"></label><br/> <!-- 1, please -->
                    <input type="hidden" name="called_from" value="<?php echo $call;?>" required/> <!-- current call passed to next page will be that page's last call -->
                </div>
                <div class="col">
                    <label><input type="radio" name="dir_button" value=1 hidden required/><img src=<?php echo $up_ind?> width="100" alt="Up Button" title="Going Up"></label><br/>  <!-- up indicator -->
                    <label><input type="radio" name="dir_button" value=2 hidden required/><img src=<?php echo $down_ind?> width="100" alt="Down Button" title="Going Down"></label> <!-- down indicator -->
                    <br/><br/><br/><b>Called to: </b> <?php echo $call;?><br/><b>Called from: </b> <?php echo $last;?><br/><b>Direction: </b> <?php echo $dir;?>  <!-- report -->
                </div>
            </div>
        </form>
    </body>
</html>