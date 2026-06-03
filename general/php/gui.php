<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Elevator GUI</title>
        <link rel="stylesheet" href="../css/gui_style.css">
    </head>
    <body>
        <?php $call = ($_POST["called_to"] ?? "01"); $last = ($_POST["called_from"] ?? "01"); //get input from form post, or default to first floor
        ($call  > $last) ? ($dir = "UP") : (($call < $last ) ? ($dir = "DOWN") : ($dir = "HOLD")) //figure out the car's direction of travel?>
        <form method="post" id="buttons" target="_self" onclick="buttons.submit()"> <!-- Post a self-targeting form to take new input and generate last call -->
        <label id="3" class="car_buttons"><input type="radio" name="called_to" value=11 required /><img src="../images/gui/3unlit.png" width="100" alt="Floor 3" title="Call to Floor 3"></label><br/>
        <label id="2" class="car_buttons"><input type="radio" name="called_to" value=10 required /><img src="../images/gui/2unlit.png" width="100" alt="Floor 2" title="Call to Floor 2"></label><br/>
        <label id="1" class="car_buttons"><input type="radio" name="called_to" value=01 required /><img src="../images/gui/1unlit.png" width="100" alt="Floor 1" title="Call to Floor 1"></label><br/>
        <input type="hidden" name="called_from" value="<?php echo $call;?>" required /></form><br/><br/> <!-- current call passed to next page will be that page's last call -->
        <b>Called to: </b> <?php echo $call; ?><br/>
        <b>Called from: </b> <?php echo $last; ?><br/>
        <b>Direction: </b> <?php echo $dir; ?>
    </body>
</html>