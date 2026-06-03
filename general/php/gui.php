<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Elevator GUI</title>
        <link rel="stylesheet" href="../css/gui_style.css">
    </head>
    <body>
        <?php $call = $_POST["gui_init"];
        $call = $_POST["called_to"];
        $last = $_POST["called_from"];
        if($call  > $last) {$dir = "UP";}
        else if ($call < $last ) {$dir = "DOWN";}
        else {$dir = "HOLD";}?>
        <form method="post" id="buttons" target="_self" onclick="buttons.submit()">
        <label id="3" class="car_buttons"><input type="radio" name="called_to" value=11 required /><img src="../images/gui/3unlit.png" width="100" alt="Floor 3" title="Call to Floor 3"></label><br/>
        <label id="2" class="car_buttons"><input type="radio" name="called_to" value=10 required /><img src="../images/gui/2unlit.png" width="100" alt="Floor 2" title="Call to Floor 2"></label><br/>
        <label id="1" class="car_buttons"><input type="radio" name="called_to" value=01 required /><img src="../images/gui/1unlit.png" width="100" alt="Floor 1" title="Call to Floor 1"></label><br/>
        <input type="hidden" name="called_from" value="<?php echo $call;?>" required /></form><br/><br/>
        <b>Called to: </b> <?php echo $call; ?><br/>
        <b>Called from: </b> <?php echo $last; ?><br/>
        <b>Direction: </b> <?php echo $dir; ?>
    </body>
</html>