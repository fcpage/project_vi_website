<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Elevator GUI</title>
        <meta name="description" content="This is the gui mechanism for our project" />
        <meta http-equiv="author" content="Fergus Page" />
        <meta name="robots" content="noindex nofollow" />
        <meta http-equiv="pragma" content="no-cache" />
        <link rel="stylesheet" href="../css/gui_style.css">
    </head>

    <body>
        <?php
        $call = ($_POST["called_to"] ?? "01"); $last = ($_POST["called_from"] ?? "01"); //get input from form post, or default to first floor
        ($call  > $last) ? ($dir = "UP") : (($call < $last ) ? ($dir = "DOWN") : ($dir = "HOLD")); //figure out the car's direction of travel
        ($call == 11) ? ($floor3="../images/gui/3lit.png") : ($floor3="../images/gui/3unlit.png"); //show call to 3rd?
        ($call == 10) ? ($floor2="../images/gui/2lit.png") : ($floor2="../images/gui/2unlit.png"); //show call to 2nd?
        ($call == 01) ? ($floor1="../images/gui/1lit.png") : ($floor1="../images/gui/1unlit.png"); //show call to 1st?
        ($dir === "UP") ? ($upind="../images/gui/uplit.png") : ($upind="../images/gui/upunlit.png"); //going up?
        ($dir === "DOWN") ? ($downind="../images/gui/downlit.png") : ($downind="../images/gui/downunlit.png");?> <!-- going down? -->

        <div class="grid"><div class="col"><form method="post" id="buttons" target="_self" onclick="buttons.submit()"> <!-- Post a self-targeting form to take new input and generate last call -->
        <label><input type="radio" name="called_to" value=11 hidden required/><img src=<?php echo $floor3?> width="100" alt="Floor 3" title="Call to Floor 3"></label><br/> <!-- 3, please -->
        <label><input type="radio" name="called_to" value=10 hidden required/><img src=<?php echo $floor2?> width="100" alt="Floor 2" title="Call to Floor 2"></label><br/> <!-- 2, please -->
        <label><input type="radio" name="called_to" value=01 hidden required/><img src=<?php echo $floor1?> width="100" alt="Floor 1" title="Call to Floor 1"></label><br/> <!-- 1, please -->
        <input type="hidden" name="called_from" value="<?php echo $call;?>" required/></form></div><div class="col"> <!-- current call passed to next page will be that page's last call -->
        <img src=<?php echo $upind?> width="100" alt="Up Arrow" title="Going Up"><br/> <!-- up indicator -->
        <img src=<?php echo $downind?> width="100" alt="Down Arrow" title="Going Down"><br/> <br/> <!-- down indicator -->
        <br/><b>Called to: </b> <?php echo $call;?><br/><b>Called from: </b> <?php echo $last;?><br/><b>Direction: </b> <?php echo $dir;?></div></div> <!-- report -->

    </body>
</html>