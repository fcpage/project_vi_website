<?php
//handle car controller calls via gui and track the car's movement
//handle the floor controller calls via gui - these override the car calls, but for floor calls to be active, the directional button (floor) must be clicked
//same gui handles both floor controller calls and car controller calls - when using the floor buttons the car buttons are indicators, and when using the car buttons, the floor buttons are indicators
//form submits on click, so only one selection is possible per iteration, which excludes conflict cases between the car and floor control sets
//floor call buttons only handle adjacent-floor calls
session_start();

//initialize session
empty($_SESSION["F3"]) ?? $_SESSION["F3"] = "./downunlit.png";
empty($_SESSION["F2up_ind"]) ?? $_SESSION["F2up_ind"] = "./upunlit.png";
empty($_SESSION["F2down_ind"]) ?? $_SESSION["F2down_ind"] = "./downunlit.png";
empty($_SESSION["F1"]) ?? $_SESSION["F1"] = "./upunlit.png";
empty($_SESSION["CF3"]) ?? $_SESSION["CF3"] = "./3unlit.png";
empty($_SESSION["CF2"]) ?? $_SESSION["CF2"] = "./2unlit.png";
empty($_SESSION["CF1"]) ?? $_SESSION["CF1"] = "./1unlit.png";
empty($_SESSION["called_to"]) ?? $_SESSION["called_to"] = "C1";


$call = ($_POST["called_to"] ?? "1"); //get input from form post, or default to first floor
$last = ($_SESSION["current"] ?? "1"); //get last floor from post or initialize to first floor
($call  > $last) ? ($dir = "UP") : (($call < $last ) ? ($dir = "DOWN") : ($dir = "HOLD")); //figure out the car's direction of travel

//Set elevator car indicators
($call == "C3") ? ($_SESSION["CF3"] = "./3lit.png") : ($_SESSION["floor3"] = "./3unlit.png"); //show call to 3rd - car control
($call == "C2") ? ($_SESSION["CF2"] = "./2lit.png") : ($_SESSION["floor2"] = "./2unlit.png"); //show call to 2nd - car control
($call == "C1") ? ($_SESSION["CF1"] = "./1lit.png") : ($_SESSION["floor1"] = "./1unlit.png"); //show call to 1st - car control

//Set floor indicators
//If car is stationary somewhere, and ready to be called
if ($call == "3FD") {
    $_SESSION["F3"] = "./downlit.png";
    $_SESSION["F2up_ind"] = "./upunlit.png";
    $_SESSION["F2down_ind"] = "./downunlit.png";
    $_SESSION["F1"] = "./upunlit.png";
} elseif ($call == "2FU") {
    $_SESSION["F3"] = "./downunlit.png";
    $_SESSION["F2up_ind"] = "./uplit.png";
    $_SESSION["F2down_ind"] = "./downunlit.png";
    $_SESSION["F1"] = "./upunlit.png";
} elseif ($call == "2FD") {
    $_SESSION["F3"] = "./downunlit.png";
    $_SESSION["F2up_ind"] = "./upunlit.png";
    $_SESSION["F2down_ind"] = "./downlit.png";
    $_SESSION["F1"] = "./upunlit.png";
} elseif ($call == "1FU") {
    $_SESSION["F3"] = "./downunlit.png";
    $_SESSION["F2up_ind"] = "./upunlit.png";
    $_SESSION["F2down_ind"] = "./downunlit.png";
    $_SESSION["F1"] = "./uplit.png";
}

//FIX BELOW
(($dir_button == 0) ?? ($dir = "HOLD"));   //default
(($_SESSION["called_to"] == 1) && ($last == 3)) ?? (($_SESSION["called_to"] = 3) && ($dir = "HOLD"));   //going up from third goes nowhere, hold
(($_SESSION["called_to"] == 1) && ($last == 2)) ?? (($_SESSION["called_to"] = 3) && ($dir = "UP"));     //going up from second goes to third
(($_SESSION["called_to"] == 1) && ($last == 1)) ?? (($_SESSION["called_to"] = 2) && ($dir = "UP"));     //going up from first goes to second
(($_SESSION["called_to"] == 2) && ($last == 3)) ?? (($_SESSION["called_to"] = 2) && ($dir = "DOWN"));   //going down from third goes to second
(($_SESSION["called_to"] == 2) && ($last == 2)) ?? (($_SESSION["called_to"] = 1) && ($dir = "DOWN"));   //going down from second goes to first
(($_SESSION["called_to"] == 2) && ($last == 1)) ?? (($_SESSION["called_to"] = 1) && ($dir = "HOLD"));   //going down from first goes nowhere, hold

//database operations
?>

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

        <link rel="stylesheet" href="../../../css/elevator/gui_style.css">
    </head>
    <body>
        <div class="UI">
            <b>Called to: </b> <?php echo $call;?><br/>
            <b>Called from: </b> <?php echo $last;?><br/>
            <b>Direction: </b> <?php echo $dir;?>  <!-- report -->
        </div>
        <form method="post" id="buttons" target="_self" action="<?php echo $_SERVER['PHP_SELF']; ?>" onclick="buttons.submit()">  <!-- Post a self-targeting form to take new input and generate last call -->
            //Send data to the controller nodes
        </form>
    </body>
</html>